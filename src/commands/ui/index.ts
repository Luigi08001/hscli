import { Command } from "commander";
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { detectHublet, getApiBaseUrl, getHscliHomeDir, getProfile, hasProfile, listProfiles } from "../../core/auth.js";
import type { CliContext } from "../../core/output.js";
import { printResult } from "../../core/output.js";
import { readPolicyFile } from "../../core/policy.js";
import { guidePayload, resolveGoal, type GuideGoal } from "../guide/index.js";

type UiChoice = "setup" | "migration" | "read" | "fetch" | "write" | "guardrails" | "scopes" | "hublet" | "quit";

const CHOICE_TO_GOAL: Partial<Record<UiChoice, GuideGoal>> = {
  setup: "setup",
  migration: "portal-migration",
  read: "read",
  fetch: "fetch",
  write: "write",
  guardrails: "guardrails",
};

const CHOICE_ALIASES: Record<string, UiChoice> = {
  "1": "setup",
  setup: "setup",
  "2": "migration",
  migration: "migration",
  migrate: "migration",
  "3": "read",
  read: "read",
  "4": "fetch",
  fetch: "fetch",
  get: "fetch",
  "5": "write",
  write: "write",
  "6": "guardrails",
  guardrails: "guardrails",
  safety: "guardrails",
  "7": "scopes",
  scopes: "scopes",
  scope: "scopes",
  "8": "hublet",
  hublet: "hublet",
  routing: "hublet",
  q: "quit",
  quit: "quit",
  exit: "quit",
};

interface ProfileSummary {
  profile: string;
  authenticated: boolean;
  role: string;
  portalId: string | null;
  hublet: string;
  apiBaseUrl: string;
  uiDomain: string | null;
  mode: string;
}

interface TraceSummary {
  active: boolean;
  mode: "session" | "file" | "off";
  scope: string;
  includeBodies: boolean;
  file: string | null;
  eventCount: number | null;
}

interface PolicySummary {
  active: boolean;
  path: string | null;
  status: string;
  ruleCount: number | null;
  requiresChangeTicket: boolean;
}

interface SafetySummary {
  label: string;
  profileMode: string;
  policy: PolicySummary;
  trace: TraceSummary;
  rateBudget: string;
}

interface HomeSummary {
  activeProfile: ProfileSummary;
  profiles: ProfileSummary[];
  safety: SafetySummary;
  recommendation: string;
}

export function registerUi(program: Command, getCtx: () => CliContext): void {
  const register = (name: string, description: string) => {
    program
      .command(name)
      .description(description)
      .option("--goal <goal>", "setup|portal-migration|read|fetch|write|guardrails|property-preflight|audit-trace|explore")
      .option("--no-interactive", "Render the terminal home without prompting")
      .action(async (opts) => {
        const ctx = getCtx();
        const summary = summarizeHome(ctx);
        const goal = opts.goal ? resolveGoal(opts.goal) : undefined;
        const selectedWorkflow = goal ? guidePayload(goal) : undefined;

        if (ctx.json) {
          printResult(ctx, {
            profile: summary.activeProfile,
            profiles: summary.profiles,
            safety: summary.safety,
            recommendation: summary.recommendation,
            workflow: selectedWorkflow ?? null,
            choices: terminalChoices(),
          });
          return;
        }

        output.write(renderHome(summary, selectedWorkflow));
        if (goal || opts.interactive === false || !input.isTTY) return;

        const choice = await askChoice();
        if (choice === "quit") return;
        output.write(renderChoice(choice));
      });
  };

  register("ui", "Interactive terminal home for hscli operator workflows");
  register("home", "Terminal home for hscli operator workflows (alias for ui)");
}

function summarizeProfile(profile: string): ProfileSummary {
  try {
    if (hasProfile(profile)) {
      const data = getProfile(profile);
      const hublet = detectHublet(data);
      return {
        profile,
        authenticated: true,
        role: inferProfileRole(profile),
        portalId: data.portalId ?? null,
        hublet: data.hublet ?? hublet ?? "na1",
        apiBaseUrl: data.apiDomain ? `https://${data.apiDomain}` : getApiBaseUrl(profile),
        uiDomain: data.uiDomain ?? (hublet ? `app-${hublet}.hubspot.com` : "app.hubspot.com"),
        mode: data.mode ?? "unset",
      };
    }
  } catch {
    // Fall through to the unauthenticated view. The detailed auth error
    // will surface when the user runs a real command.
  }

  return {
    profile,
    authenticated: false,
    role: inferProfileRole(profile),
    portalId: null,
    hublet: "unknown",
    apiBaseUrl: "https://api.hubapi.com",
    uiDomain: null,
    mode: "not configured",
  };
}

function summarizeHome(ctx: CliContext): HomeSummary {
  const activeProfile = summarizeProfile(ctx.profile);
  const profiles = summarizeProfiles(ctx.profile);
  const safety = summarizeSafety(ctx, activeProfile);
  return {
    activeProfile,
    profiles,
    safety,
    recommendation: recommendNextAction(activeProfile, profiles, safety),
  };
}

function summarizeProfiles(activeProfile: string): ProfileSummary[] {
  const names = new Set<string>([activeProfile]);
  try {
    for (const profile of listProfiles()) names.add(profile);
  } catch {
    // Auth errors are already reflected in the active profile summary.
  }
  return [...names].sort(sortProfiles(activeProfile)).map(summarizeProfile);
}

function sortProfiles(activeProfile: string): (a: string, b: string) => number {
  return (a, b) => {
    if (a === activeProfile) return -1;
    if (b === activeProfile) return 1;
    return a.localeCompare(b);
  };
}

function inferProfileRole(profile: string): string {
  const value = profile.toLowerCase();
  if (/(^|[-_])(live|prod|production|source)([-_]|$)/.test(value)) return "SOURCE";
  if (/(^|[-_])(sandbox|target|stage|staging|test|dev)([-_]|$)/.test(value)) return "TARGET";
  if (value === "default") return "CURRENT";
  return "PROFILE";
}

function summarizeSafety(ctx: CliContext, activeProfile: ProfileSummary): SafetySummary {
  const policy = summarizePolicy(ctx);
  const trace = summarizeTrace(ctx);
  return {
    label: safetyLabel(activeProfile, policy, trace),
    profileMode: activeProfile.mode,
    policy,
    trace,
    rateBudget: "unknown (run `hscli account api-usage`)",
  };
}

function safetyLabel(activeProfile: ProfileSummary, policy: PolicySummary, trace: TraceSummary): string {
  if (!activeProfile.authenticated) return "setup required";
  if (activeProfile.mode === "read-only") return "read-only";
  if (policy.active && trace.active) return "guarded writes";
  if (policy.active) return "policy active";
  if (trace.active) return "trace active";
  if (activeProfile.mode === "read-write") return "write-capable";
  return "unverified";
}

function summarizePolicy(ctx: CliContext): PolicySummary {
  const path = ctx.policyFile?.trim() || process.env.HSCLI_POLICY_FILE?.trim() || null;
  if (!path) {
    return { active: false, path: null, status: "off", ruleCount: null, requiresChangeTicket: false };
  }
  try {
    const policy = readPolicyFile(path);
    const profiles = Object.values(policy.profiles ?? {});
    const profileRuleCount = profiles.reduce((count, profile) => count + (profile.rules?.length ?? 0), 0);
    const defaultRules = policy.defaults?.rules?.length ?? 0;
    const allProfiles = [policy.defaults, ...profiles].filter(Boolean);
    const requiresChangeTicket = allProfiles.some((profile) =>
      Boolean(profile?.requireChangeTicket || profile?.rules?.some((rule) => rule.requireChangeTicket)),
    );
    return {
      active: true,
      path,
      status: "active",
      ruleCount: profileRuleCount + defaultRules,
      requiresChangeTicket,
    };
  } catch {
    return { active: true, path, status: "invalid", ruleCount: null, requiresChangeTicket: false };
  }
}

function summarizeTrace(ctx: CliContext): TraceSummary {
  const session = readTraceSession();
  if (session) {
    return {
      active: true,
      mode: "session",
      scope: typeof session.scope === "string" ? session.scope : "all",
      includeBodies: Boolean(session.includeBodies),
      file: typeof session.file === "string" ? session.file : null,
      eventCount: countTraceEvents(typeof session.file === "string" ? session.file : null),
    };
  }
  const file = ctx.telemetryFile?.trim() || process.env.HSCLI_TELEMETRY_FILE?.trim() || null;
  if (file) {
    return {
      active: true,
      mode: "file",
      scope: "all",
      includeBodies: false,
      file,
      eventCount: countTraceEvents(file),
    };
  }
  return { active: false, mode: "off", scope: "off", includeBodies: false, file: null, eventCount: null };
}

function readTraceSession(): Record<string, unknown> | null {
  const path = join(getHscliHomeDir(), "trace-session.json");
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, "utf8")) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function countTraceEvents(file: string | null): number | null {
  if (!file || !existsSync(file)) return null;
  try {
    const size = statSync(file).size;
    if (size === 0) return 0;
    if (size > 2_000_000) return null;
    return readFileSync(file, "utf8").split("\n").filter((line) => line.trim()).length;
  } catch {
    return null;
  }
}

function recommendNextAction(activeProfile: ProfileSummary, profiles: ProfileSummary[], safety: SafetySummary): string {
  if (!activeProfile.authenticated) return `hscli auth login --profile ${activeProfile.profile} --token-stdin --hublet eu1`;
  if (activeProfile.mode === "unset" || activeProfile.mode === "not configured") {
    return `hscli auth set-mode ${activeProfile.profile} read-only`;
  }
  if (activeProfile.role === "SOURCE" && activeProfile.mode !== "read-only") {
    return `hscli auth set-mode ${activeProfile.profile} read-only`;
  }
  if (!safety.policy.active) return "hscli policy templates extract read-only --to ./policy.json";
  if (!safety.trace.active) return "hscli trace start --scope all --include-bodies";
  if (!profiles.some((profile) => profile.role === "TARGET" && profile.authenticated)) {
    return "hscli auth login --profile sandbox --token-stdin --hublet eu1";
  }
  return "hscli /migration";
}

async function askChoice(): Promise<UiChoice> {
  const rl = createInterface({ input, output });
  try {
    const answer = await rl.question(dim("Select 1-8, or q to quit: "));
    return CHOICE_ALIASES[answer.trim().toLowerCase()] ?? "quit";
  } finally {
    rl.close();
  }
}

function renderChoice(choice: UiChoice): string {
  const goal = CHOICE_TO_GOAL[choice];
  if (goal) return renderWorkflow(guidePayload(goal));
  if (choice === "scopes") {
    return renderPanel("Scope Check", [
      "hscli doctor scopes diff --required real-mirror-read",
      "hscli doctor scopes presets",
      "hscli doctor scopes explain sales-email-read",
    ]);
  }
  if (choice === "hublet") {
    return renderPanel("Hublet Routing", [
      "hscli doctor hublet-check",
      "hscli auth set-hublet live eu1",
      "hscli --hublet eu1 --profile live account info",
    ]);
  }
  return "";
}

function renderHome(summary: HomeSummary, workflow?: Record<string, unknown>): string {
  const lines = [
    "",
    accent("hscli"),
    dim("HubSpot operator console"),
    "",
    renderSafetyBanner(summary.safety),
    "",
    renderProfiles(summary.profiles),
    "",
    renderStatus(summary.activeProfile),
    "",
    renderPanel("Recommended Next", [summary.recommendation]),
    "",
    renderPanel("Operator Workflows", terminalChoices()),
    workflow ? renderWorkflow(workflow) : "",
  ].filter(Boolean);
  return `${lines.join("\n")}\n`;
}

function renderSafetyBanner(safety: SafetySummary): string {
  const trace = safety.trace.active
    ? `${safety.trace.mode}:${safety.trace.scope}${safety.trace.includeBodies ? "+bodies" : ""}${safety.trace.eventCount === null ? "" : ` ${safety.trace.eventCount} events`}`
    : "off";
  const policy = safety.policy.active
    ? `${safety.policy.status}${safety.policy.requiresChangeTicket ? " ticket-required" : ""}`
    : "off";
  return renderPanel("Safety", [
    `Mode      ${safety.label}`,
    `Policy    ${policy}`,
    `Trace     ${trace}`,
    `API       ${safety.rateBudget}`,
  ]);
}

function renderProfiles(profiles: ProfileSummary[]): string {
  const rows = profiles.slice(0, 6).map((profile) => {
    const auth = profile.authenticated ? "ok" : "missing";
    return [
      profile.role.padEnd(7),
      profile.profile.padEnd(12),
      profile.hublet.padEnd(7),
      profile.mode.padEnd(12),
      auth.padEnd(8),
      `portal ${profile.portalId ?? "-"}`,
    ].join(" ");
  });
  if (profiles.length > 6) rows.push(`+${profiles.length - 6} more profile(s)`);
  return renderPanel("Profiles", rows);
}

function renderStatus(summary: ProfileSummary): string {
  const rows = [
    ["Profile", summary.profile],
    ["Role", summary.role],
    ["Auth", summary.authenticated ? "ok" : "missing"],
    ["Mode", summary.mode],
    ["Hublet", summary.hublet],
    ["API", summary.apiBaseUrl],
    ["UI", summary.uiDomain ?? "-"],
    ["Portal", summary.portalId ?? "-"],
  ];
  return renderPanel("Current Context", rows.map(([label, value]) => `${label.padEnd(8)} ${value}`));
}

function terminalChoices(): string[] {
  return [
    "1  /setup       auth, hublet routing, scopes, capabilities",
    "2  /migration   portal/schema migration sequence",
    "3  /read        source-portal read workflow",
    "4  /fetch       get records or metadata without mutation",
    "5  /write       target-portal write workflow",
    "6  /guardrails  read-only, policy, trace, scope checks",
    "7  scopes       compare token scopes to real-mirror-read",
    "8  hublet       verify or pin EU/AP/NA routing",
  ];
}

function renderWorkflow(workflow: Record<string, unknown>): string {
  const goal = String(workflow.goal ?? "workflow");
  const commands = Array.isArray(workflow.nextCommands)
    ? workflow.nextCommands.map(String)
    : [];
  const purpose = typeof workflow.purpose === "string" ? [workflow.purpose] : [];
  return renderPanel(`Workflow: ${goal}`, [...purpose, ...commands]);
}

function renderPanel(title: string, rows: string[]): string {
  const width = Math.max(title.length + 4, ...rows.map((row) => visibleLength(row) + 4), 44);
  const border = `+${"-".repeat(width - 2)}+`;
  const titlePadding = " ".repeat(Math.max(0, width - visibleLength(title) - 4));
  return [
    border,
    `| ${accent(title)}${titlePadding} |`,
    border,
    ...rows.map((row) => `| ${padVisible(row, width - 4)} |`),
    border,
  ].join("\n");
}

function accent(value: string): string {
  return color(value, "38;5;209");
}

function dim(value: string): string {
  return color(value, "2");
}

function color(value: string, code: string): string {
  if (!output.isTTY || process.env.NO_COLOR) return value;
  return `\u001b[${code}m${value}\u001b[0m`;
}

function visibleLength(value: string): number {
  const escape = String.fromCharCode(27);
  return value.replace(new RegExp(`${escape}\\[[0-9;]*m`, "g"), "").length;
}

function padVisible(value: string, width: number): string {
  return value + " ".repeat(Math.max(0, width - visibleLength(value)));
}
