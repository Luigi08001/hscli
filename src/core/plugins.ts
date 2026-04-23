/**
 * Plugin system for hscli.
 *
 * Plugins are discovered from:
 * 1. HSCLI_PLUGINS env var (comma-separated paths or package names) — always honored.
 * 2. node_modules packages with "hscli-plugin" in keywords — opt-in ONLY
 *    when HSCLI_PLUGIN_AUTO_DISCOVER is truthy. Auto-discovery is off by
 *    default because hscli holds bearer tokens; silently importing every
 *    package with a matching keyword is a supply-chain risk.
 *
 * Each plugin must export: register(program: Command, context: PluginContext)
 */
import { Command } from "commander";
import { readdirSync, readFileSync } from "node:fs";
import { resolve, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "./http.js";
import { CliError, printResult, printError, type CliContext } from "./output.js";
import { maybeWrite } from "../commands/crm/shared.js";
import type { HubSpotClient } from "./http.js";

/**
 * Context provided to plugins — gives access to core utilities
 * without requiring knowledge of internal import paths.
 */
export interface PluginContext {
  /** Get the current CLI context (profile, flags, etc). Call inside .action(), not at registration time. */
  getCtx: () => CliContext;
  /** Create an authenticated HubSpot API client for a profile. */
  createClient: (profile: string) => HubSpotClient;
  /** Print a successful result to stdout. */
  printResult: typeof printResult;
  /** Print an error to stderr. */
  printError: typeof printError;
  /** Structured CLI error constructor. */
  CliError: typeof CliError;
  /** Write-safe helper: enforces --dry-run, --force, and --policy-file gates. */
  maybeWrite: typeof maybeWrite;
}

/**
 * The contract a plugin package must satisfy.
 */
export interface HubcliPlugin {
  register(program: Command, context: PluginContext): void | Promise<void>;
}

/**
 * Discover plugin package names from node_modules with "hscli-plugin" keyword.
 */
function discoverFromNodeModules(): string[] {
  const pkgRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
  const nmDir = join(pkgRoot, "node_modules");
  try {
    return readdirSync(nmDir, { withFileTypes: true })
      .filter((d) => d.isDirectory() && !d.name.startsWith("."))
      .flatMap((d) => {
        // Handle scoped packages (@scope/pkg)
        if (d.name.startsWith("@")) {
          try {
            return readdirSync(join(nmDir, d.name), { withFileTypes: true })
              .filter((sd) => sd.isDirectory())
              .map((sd) => `${d.name}/${sd.name}`);
          } catch {
            return [];
          }
        }
        return [d.name];
      })
      .filter((name) => {
        try {
          const pj = JSON.parse(readFileSync(join(nmDir, name, "package.json"), "utf8"));
          return Array.isArray(pj.keywords) && pj.keywords.includes("hscli-plugin");
        } catch {
          return false;
        }
      });
  } catch {
    return [];
  }
}

/**
 * Discover plugin specifiers from HSCLI_PLUGINS env var.
 */
function discoverFromEnv(): string[] {
  const raw = process.env.HSCLI_PLUGINS?.trim();
  if (!raw) return [];
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
}

function isTruthy(value: string | undefined): boolean {
  if (!value) return false;
  const v = value.trim().toLowerCase();
  return v === "1" || v === "true" || v === "yes" || v === "on";
}

/**
 * Resolve a specifier to an importable path.
 */
function resolveSpecifier(specifier: string): string {
  if (specifier.startsWith(".") || specifier.startsWith("/")) {
    return resolve(process.cwd(), specifier);
  }
  return specifier;
}

/**
 * Load and register all discovered plugins.
 * Plugin failures are logged to stderr but never crash the CLI.
 */
export async function loadPlugins(program: Command, getCtx: () => CliContext): Promise<void> {
  const context: PluginContext = {
    getCtx,
    createClient,
    printResult,
    printError,
    CliError,
    maybeWrite,
  };

  const autoDiscover = isTruthy(process.env.HSCLI_PLUGIN_AUTO_DISCOVER);
  const envSpecifiers = discoverFromEnv();
  const autoSpecifiers = autoDiscover ? discoverFromNodeModules() : [];
  const specifiers = [...new Set([...envSpecifiers, ...autoSpecifiers])];
  if (specifiers.length === 0) return;

  if (autoDiscover && autoSpecifiers.length > 0) {
    // Security surface note: auto-discovery is opt-in. Print the set we're
    // about to load so a misconfigured node_modules can't silently
    // inject code paths that handle HubSpot tokens.
    console.error(
      `[plugin] auto-discovery enabled — loading ${autoSpecifiers.length} ` +
      `package(s) from node_modules with keyword "hscli-plugin": ${autoSpecifiers.join(", ")}. ` +
      `Prefer pinning via HSCLI_PLUGINS for production use.`,
    );
  }

  for (const raw of specifiers) {
    const specifier = resolveSpecifier(raw);
    try {
      const mod = await import(specifier);
      const plugin: HubcliPlugin = mod.default ?? mod;
      if (typeof plugin.register !== "function") {
        console.error(`[plugin] ${raw}: missing register() function, skipping`);
        continue;
      }
      await plugin.register(program, context);
    } catch (err) {
      console.error(`[plugin] Failed to load '${raw}': ${err instanceof Error ? err.message : String(err)}`);
    }
  }
}
