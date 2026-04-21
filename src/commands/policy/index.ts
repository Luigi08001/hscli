import { Command } from "commander";
import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { CliContext } from "../../core/output.js";
import { CliError, printResult } from "../../core/output.js";
import { readPolicyFile, findMatchingRule } from "../../core/policy.js";

function getTemplatesDir(): string {
  // Templates ship alongside the built dist/. When running via `hscli` binary,
  // we need to walk up from the module's dist location to find the docs/ dir.
  // This only matters for installed npm package — in dev mode tsc outputs
  // into dist/ and the docs/ dir is at the repo root.
  const thisFile = fileURLToPath(import.meta.url);
  // dist/commands/policy/index.js → repo root
  const candidates = [
    resolve(dirname(thisFile), "../../../docs/policy-templates"),
    resolve(dirname(thisFile), "../../../../docs/policy-templates"),
    resolve(dirname(thisFile), "../../docs/policy-templates"),
  ];
  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate;
  }
  // Last resort — this will only fail at runtime if templates are missing
  return resolve(dirname(thisFile), "../../../docs/policy-templates");
}

function getPolicyPath(ctx: CliContext): string | undefined {
  return ctx.policyFile?.trim() || process.env.HSCLI_POLICY_FILE?.trim();
}

export function registerPolicy(program: Command, getCtx: () => CliContext): void {
  const policy = program.command("policy").description("Manage policy-as-code: audit the active policy, list/extract built-in templates, validate your own files.");

  policy
    .command("list")
    .description("Show the active policy (from --policy-file or HSCLI_POLICY_FILE). Parses + summarizes all rules by profile.")
    .action(async () => {
      const ctx = getCtx();
      const path = getPolicyPath(ctx);
      if (!path) {
        printResult(ctx, {
          active: false,
          message: "No policy file set. Pass --policy-file <path> or set HSCLI_POLICY_FILE env var.",
          suggestions: [
            "hscli policy templates         # list built-in templates",
            "hscli policy templates extract read-only --to ./policy.json",
          ],
        });
        return;
      }
      const config = readPolicyFile(path);
      const summary = {
        active: true,
        file: path,
        version: config.version ?? 1,
        profiles: Object.fromEntries(
          Object.entries(config.profiles ?? {}).map(([name, cfg]) => [
            name,
            {
              defaultAction: cfg.defaultAction ?? "allow",
              ruleCount: cfg.rules?.length ?? 0,
              ruleNames: (cfg.rules ?? []).map(r => r.name || "(unnamed)"),
              legacyFlags: {
                allowWrite: cfg.allowWrite,
                allowDelete: cfg.allowDelete,
                requireChangeTicket: cfg.requireChangeTicket,
              },
            },
          ]),
        ),
        hasDefaults: Boolean(config.defaults),
        blockedPrefixes: config.blockedMethodPathPrefixes,
      };
      printResult(ctx, summary);
    });

  policy
    .command("show-matching")
    .description("Print which policy rule (if any) would be applied to a hypothetical request. Useful for verifying rules before shipping.")
    .argument("<method>", "HTTP method: GET, POST, PATCH, PUT, DELETE")
    .argument("<path>", "Request path (e.g. /crm/v3/objects/contacts/123)")
    .option("--profile <name>", "Profile to evaluate against (defaults to the current --profile)")
    .action(async (method, requestPath, opts) => {
      const ctx = getCtx();
      const policyPath = getPolicyPath(ctx);
      if (!policyPath) {
        throw new CliError("NO_POLICY_FILE", "No policy file configured. Pass --policy-file or set HSCLI_POLICY_FILE.");
      }
      const config = readPolicyFile(policyPath);
      const profile = opts.profile || ctx.profile;
      const profileConfig = config.profiles?.[profile] ?? config.defaults ?? {};
      const matched = findMatchingRule(profileConfig, method, requestPath);
      if (matched) {
        printResult(ctx, {
          profile,
          request: { method, path: requestPath },
          matchedRule: matched,
          effectiveAction: matched.action ?? "allow",
        });
      } else {
        printResult(ctx, {
          profile,
          request: { method, path: requestPath },
          matchedRule: null,
          effectiveAction: profileConfig.defaultAction ?? "allow",
          note: "No rule matched. Falling back to the profile's defaultAction.",
        });
      }
    });

  policy
    .command("validate")
    .description("Parse + semantic-check a policy file without enforcing it.")
    .argument("[file]", "Policy file path (default: the active --policy-file / HSCLI_POLICY_FILE)")
    .action(async (fileArg) => {
      const ctx = getCtx();
      const path = fileArg || getPolicyPath(ctx);
      if (!path) {
        throw new CliError("NO_POLICY_FILE", "No file passed and no active policy configured.");
      }
      try {
        const config = readPolicyFile(path);
        const issues: string[] = [];
        const warnings: string[] = [];

        for (const [profileName, cfg] of Object.entries(config.profiles ?? {})) {
          for (const rule of cfg.rules ?? []) {
            if (!rule.match) warnings.push(`[${profileName}] rule '${rule.name ?? "(unnamed)"}' has no match criteria — will match everything`);
            if (rule.action && rule.action !== "allow" && rule.action !== "deny") issues.push(`[${profileName}] rule '${rule.name ?? "(unnamed)"}' has invalid action '${rule.action}' (must be 'allow' or 'deny')`);
            if (rule.window?.days && !/^[a-z]{3}(-[a-z]{3}|(,[a-z]{3})*)$/i.test(rule.window.days.trim())) {
              warnings.push(`[${profileName}] rule '${rule.name ?? "(unnamed)"}' has non-standard window.days syntax: '${rule.window.days}'`);
            }
            if (rule.window?.hours && !/^\d{1,2}-\d{1,2}$/.test(rule.window.hours)) {
              issues.push(`[${profileName}] rule '${rule.name ?? "(unnamed)"}' has invalid window.hours: '${rule.window.hours}' (must be 'HH-HH' 24h format)`);
            }
          }
        }

        printResult(ctx, {
          valid: issues.length === 0,
          file: path,
          version: config.version ?? 1,
          profileCount: Object.keys(config.profiles ?? {}).length,
          totalRules: Object.values(config.profiles ?? {}).reduce((s, c) => s + (c.rules?.length ?? 0), 0),
          issues,
          warnings,
        });
      } catch (err) {
        if (err instanceof CliError) throw err;
        throw new CliError("POLICY_PARSE_ERROR", err instanceof Error ? err.message : String(err));
      }
    });

  const templates = policy.command("templates").description("Built-in policy templates for common trust scenarios");

  templates
    .command("list")
    .description("List available built-in policy templates")
    .action(async () => {
      const ctx = getCtx();
      const dir = getTemplatesDir();
      if (!existsSync(dir)) {
        throw new CliError("TEMPLATES_DIR_MISSING", `Template directory not found: ${dir}`);
      }
      const files = readdirSync(dir).filter(f => f.endsWith(".json"));
      const templatesWithMeta = files.map(f => {
        try {
          const content = JSON.parse(readFileSync(join(dir, f), "utf8")) as { description?: string; version?: number };
          return { name: f.replace(/\.json$/, ""), version: content.version, description: content.description ?? "(no description)" };
        } catch {
          return { name: f.replace(/\.json$/, ""), version: undefined, description: "(failed to parse)" };
        }
      });
      printResult(ctx, {
        count: templatesWithMeta.length,
        templates: templatesWithMeta,
        note: "Use `hscli policy templates show <name>` to view; `hscli policy templates extract <name> --to <file>` to copy.",
      });
    });

  templates
    .command("show")
    .description("Print a template's content")
    .argument("<name>", "Template name (from `hscli policy templates list`)")
    .action(async (name) => {
      const ctx = getCtx();
      const path = join(getTemplatesDir(), `${name}.json`);
      if (!existsSync(path)) {
        throw new CliError("TEMPLATE_NOT_FOUND", `Template '${name}' not found. Available: ${readdirSync(getTemplatesDir()).filter(f => f.endsWith(".json")).map(f => f.replace(/\.json$/, "")).join(", ")}`);
      }
      const content = JSON.parse(readFileSync(path, "utf8"));
      printResult(ctx, content);
    });

  templates
    .command("extract")
    .description("Copy a built-in template to a local file for editing")
    .argument("<name>", "Template name")
    .requiredOption("--to <file>", "Destination file path")
    .action(async (name, opts) => {
      const ctx = getCtx();
      const srcPath = join(getTemplatesDir(), `${name}.json`);
      if (!existsSync(srcPath)) {
        throw new CliError("TEMPLATE_NOT_FOUND", `Template '${name}' not found.`);
      }
      const dest = String(opts.to);
      if (existsSync(dest)) {
        throw new CliError("DEST_FILE_EXISTS", `Destination file already exists: ${dest}. Delete it first or choose another path.`);
      }
      mkdirSync(dirname(dest), { recursive: true });
      const content = readFileSync(srcPath, "utf8");
      writeFileSync(dest, content, { encoding: "utf8", mode: 0o644 });
      printResult(ctx, {
        extracted: true,
        from: srcPath,
        to: dest,
        nextSteps: [
          `hscli policy validate ${dest}`,
          `hscli --policy-file ${dest} crm contacts list`,
          `export HSCLI_POLICY_FILE=${dest}`,
        ],
      });
    });
}
