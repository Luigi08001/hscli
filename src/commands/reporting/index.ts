import { Command } from "commander";
import { createClient } from "../../core/http.js";
import type { CliContext } from "../../core/output.js";
import { printResult } from "../../core/output.js";
import { encodePathSegment, parseNumberFlag } from "../crm/shared.js";

export function registerReporting(program: Command, getCtx: () => CliContext): void {
  const reporting = program.command("reporting").description("HubSpot Reporting & Analytics");
  const dashboards = reporting.command("dashboards").description("Analytics dashboards");

  dashboards
    .command("list")
    .option("--limit <n>", "Max records", "100")
    .option("--after <cursor>", "Paging cursor")
    .action(async (opts) => {
      const ctx = getCtx();
      const client = createClient(ctx.profile);
      const params = new URLSearchParams();
      params.set("limit", String(parseNumberFlag(opts.limit, "--limit")));
      if (opts.after) params.set("after", opts.after);
      const res = await client.request(`/crm/v3/objects/feedback_submissions?${params.toString()}`);
      printResult(ctx, res);
    });

  // Analytics content endpoint (pages, blog posts performance)
  const content = reporting.command("content").description("Content analytics");

  content
    .command("pages")
    .option("--start <date>", "Start date (YYYY-MM-DD)")
    .option("--end <date>", "End date (YYYY-MM-DD)")
    .action(async (opts) => {
      const ctx = getCtx();
      const client = createClient(ctx.profile);
      const params = new URLSearchParams();
      if (opts.start) params.set("start", opts.start);
      if (opts.end) params.set("end", opts.end);
      const qs = params.toString();
      const res = await client.request(`/cms/v3/site-search/indexed-data/pages${qs ? `?${qs}` : ""}`);
      printResult(ctx, res);
    });

  dashboards.command("get").argument("<dashboardId>").action(async (dashboardId) => {
    const ctx = getCtx();
    const client = createClient(ctx.profile);
    const dashboardIdSegment = encodePathSegment(dashboardId, "dashboardId");
    const res = await client.request(`/crm/v3/objects/feedback_submissions/${dashboardIdSegment}`);
    printResult(ctx, res);
  });
}
