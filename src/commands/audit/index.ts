import { Command } from "commander";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
import type { CliContext } from "../../core/output.js";
import { CliError, printResult } from "../../core/output.js";

interface TraceEvent {
  ts?: string;
  requestId?: string;
  profile?: string;
  toolName?: string;
  method?: string;
  path?: string;
  status?: number;
  durationMs?: number;
  error?: string;
}

function getRevfleetHome(): string {
  return process.env.HSCLI_HOME?.trim() || join(homedir(), ".revfleet");
}

/**
 * Read all *.jsonl trace files from a given path (file or directory).
 * If no path given, default to scanning ~/.revfleet/ for any trace-*.jsonl.
 */
function readAllTraces(fileOrDir?: string): TraceEvent[] {
  const target = fileOrDir || getRevfleetHome();
  if (!existsSync(target)) {
    throw new CliError("AUDIT_NO_TRACES", `No trace file(s) found at: ${target}. Use \`hscli trace start\` to begin recording.`);
  }
  const stat = statSync(target);
  const files: string[] = [];
  if (stat.isDirectory()) {
    for (const f of readdirSync(target)) {
      if (f.startsWith("trace-") && f.endsWith(".jsonl")) files.push(join(target, f));
    }
  } else {
    files.push(target);
  }
  const events: TraceEvent[] = [];
  for (const f of files) {
    for (const line of readFileSync(f, "utf8").split("\n")) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      try {
        events.push(JSON.parse(trimmed) as TraceEvent);
      } catch { /* skip */ }
    }
  }
  return events;
}

function isWriteEvent(ev: TraceEvent): boolean {
  return Boolean(ev.method && ["POST", "PUT", "PATCH", "DELETE"].includes(ev.method));
}

function parseSince(spec: string): number {
  // "24h", "7d", "30m" — returns ms before now
  const match = /^(\d+)([mhd])$/.exec(spec.trim());
  if (!match) return 0;
  const n = Number(match[1]);
  const unit = match[2];
  const ms = unit === "m" ? 60_000 : unit === "h" ? 3_600_000 : 86_400_000;
  return n * ms;
}

function filterBySince(events: TraceEvent[], since?: string): TraceEvent[] {
  if (!since) return events;
  const cutoffMs = Date.now() - parseSince(since);
  return events.filter(e => {
    if (!e.ts) return false;
    return new Date(e.ts).getTime() >= cutoffMs;
  });
}

export function registerAudit(program: Command, getCtx: () => CliContext): void {
  const audit = program.command("audit").description("Operational audit over trace JSONL files. Answers 'who did what when' across every hscli / MCP request. Reads from a specific file or auto-scans ~/.revfleet/ for all recorded sessions.");

  audit
    .command("timeline")
    .description("Chronological event list across traces. Default: last 100 events from ~/.revfleet/*.jsonl.")
    .argument("[file-or-dir]", "Path to a trace file or directory (default: ~/.revfleet/)")
    .option("--since <spec>", "Only events in the last window: 15m, 24h, 7d")
    .option("--limit <n>", "Max events to show", "100")
    .option("--writes-only", "Only POST/PUT/PATCH/DELETE events")
    .action(async (fileOrDir, opts) => {
      const ctx = getCtx();
      const all = readAllTraces(fileOrDir);
      let events = filterBySince(all, opts.since);
      if (opts.writesOnly) events = events.filter(isWriteEvent);
      events.sort((a, b) => (a.ts ?? "").localeCompare(b.ts ?? ""));
      const limit = Number(opts.limit) || 100;
      printResult(ctx, {
        totalLoaded: all.length,
        afterFilters: events.length,
        showing: Math.min(events.length, limit),
        filters: {
          since: opts.since ?? "(none)",
          writesOnly: Boolean(opts.writesOnly),
        },
        events: events.slice(-limit),
      });
    });

  audit
    .command("who")
    .description("What has a given profile done? Reads across all traces and breaks down by method/path/status.")
    .argument("<profile>", "Profile name to audit")
    .option("--since <spec>", "Window: 15m, 24h, 7d")
    .option("--file <path>", "Single trace file (default: scan ~/.revfleet/)")
    .action(async (profile, opts) => {
      const ctx = getCtx();
      const events = filterBySince(readAllTraces(opts.file), opts.since).filter(e => e.profile === profile);

      const byMethod: Record<string, number> = {};
      const byStatus: Record<string, number> = {};
      const byPathRoot: Record<string, number> = {};
      for (const e of events) {
        byMethod[e.method ?? "?"] = (byMethod[e.method ?? "?"] || 0) + 1;
        byStatus[String(e.status ?? "err")] = (byStatus[String(e.status ?? "err")] || 0) + 1;
        const root = (e.path ?? "").split("/").filter(Boolean)[0] || "?";
        byPathRoot[root] = (byPathRoot[root] || 0) + 1;
      }
      const writes = events.filter(isWriteEvent);
      printResult(ctx, {
        profile,
        since: opts.since ?? "(all time)",
        totalEvents: events.length,
        reads: events.length - writes.length,
        writes: writes.length,
        byMethod,
        byStatus,
        byPathRoot,
        lastTen: events.slice(-10).map(e => ({ ts: e.ts, method: e.method, path: e.path, status: e.status })),
      });
    });

  audit
    .command("what")
    .description("Who touched a given path? Reads across traces, buckets by profile + toolName.")
    .argument("<path-pattern>", "Substring or full path (e.g. '/crm/v3/objects/contacts')")
    .option("--since <spec>", "Window: 15m, 24h, 7d")
    .option("--file <path>", "Single trace file")
    .action(async (pathPattern, opts) => {
      const ctx = getCtx();
      const events = filterBySince(readAllTraces(opts.file), opts.since)
        .filter(e => (e.path ?? "").includes(pathPattern));

      const byProfile: Record<string, number> = {};
      const byTool: Record<string, number> = {};
      const byMethod: Record<string, number> = {};
      for (const e of events) {
        byProfile[e.profile ?? "?"] = (byProfile[e.profile ?? "?"] || 0) + 1;
        if (e.toolName) byTool[e.toolName] = (byTool[e.toolName] || 0) + 1;
        byMethod[e.method ?? "?"] = (byMethod[e.method ?? "?"] || 0) + 1;
      }
      const writes = events.filter(isWriteEvent);
      printResult(ctx, {
        pathPattern,
        since: opts.since ?? "(all time)",
        totalHits: events.length,
        reads: events.length - writes.length,
        writes: writes.length,
        byProfile,
        byTool,
        byMethod,
        recentWrites: writes.slice(-10).map(e => ({ ts: e.ts, profile: e.profile, toolName: e.toolName, method: e.method, path: e.path, status: e.status })),
      });
    });

  audit
    .command("writes")
    .description("All write operations across traces — the most security-relevant audit view.")
    .option("--since <spec>", "Window: 15m, 24h, 7d")
    .option("--file <path>", "Single trace file")
    .option("--limit <n>", "Max writes to show", "100")
    .action(async (opts) => {
      const ctx = getCtx();
      const events = filterBySince(readAllTraces(opts.file), opts.since).filter(isWriteEvent);
      events.sort((a, b) => (a.ts ?? "").localeCompare(b.ts ?? ""));
      const limit = Number(opts.limit) || 100;
      const failed = events.filter(e => e.error || (e.status !== undefined && e.status >= 400));
      printResult(ctx, {
        since: opts.since ?? "(all time)",
        totalWrites: events.length,
        successfulWrites: events.length - failed.length,
        failedWrites: failed.length,
        showing: Math.min(events.length, limit),
        writes: events.slice(-limit).map(e => ({
          ts: e.ts,
          profile: e.profile,
          toolName: e.toolName,
          method: e.method,
          path: e.path,
          status: e.status,
          durationMs: e.durationMs,
        })),
      });
    });

  audit
    .command("by-tool")
    .description("Breakdown per MCP tool: which tool wrote how much, error rate, avg latency. Answers 'which agent is chatty/buggy'.")
    .option("--since <spec>", "Window: 15m, 24h, 7d")
    .option("--file <path>", "Single trace file")
    .action(async (opts) => {
      const ctx = getCtx();
      const events = filterBySince(readAllTraces(opts.file), opts.since).filter(e => e.toolName);
      const byTool = new Map<string, {
        calls: number;
        writes: number;
        errors: number;
        totalMs: number;
        maxMs: number;
      }>();
      for (const e of events) {
        const k = e.toolName!;
        if (!byTool.has(k)) byTool.set(k, { calls: 0, writes: 0, errors: 0, totalMs: 0, maxMs: 0 });
        const stats = byTool.get(k)!;
        stats.calls++;
        if (isWriteEvent(e)) stats.writes++;
        if (e.error || (e.status !== undefined && e.status >= 400)) stats.errors++;
        stats.totalMs += e.durationMs ?? 0;
        stats.maxMs = Math.max(stats.maxMs, e.durationMs ?? 0);
      }
      const breakdown = [...byTool.entries()]
        .map(([tool, s]) => ({
          tool,
          calls: s.calls,
          writes: s.writes,
          errors: s.errors,
          errorRate: s.calls > 0 ? Math.round((s.errors / s.calls) * 1000) / 10 + "%" : "0%",
          avgMs: Math.round(s.totalMs / s.calls),
          maxMs: s.maxMs,
        }))
        .sort((a, b) => b.calls - a.calls);
      printResult(ctx, {
        since: opts.since ?? "(all time)",
        totalMcpCalls: events.length,
        uniqueTools: breakdown.length,
        breakdown,
      });
    });
}
