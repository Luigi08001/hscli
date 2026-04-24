/**
 * `hscli forms` — HubSpot Marketing Forms: list/get, definitions, submissions.
 */
import { Command } from "commander";
import { createClient } from "../../core/http.js";
import type { CliContext } from "../../core/output.js";
import { printResult } from "../../core/output.js";
import { encodePathSegment, maybeWrite, parseJsonPayload, parseNumberFlag } from "../crm/shared.js";
import { normalizeFormPayloadForV3, parseFormPayloadFormat } from "./legacy-v2.js";

export function registerForms(program: Command, getCtx: () => CliContext): void {
  const forms = program.command("forms").description("HubSpot Forms APIs");

  forms.command("list").option("--limit <n>", "Max records", "50").option("--after <cursor>", "Paging cursor").action(async (opts) => {
    const ctx = getCtx();
    const client = createClient(ctx.profile);
    const params = new URLSearchParams();
    params.set("limit", String(parseNumberFlag(opts.limit, "--limit")));
    if (opts.after) params.set("after", opts.after);
    const res = await client.request(`/marketing/v3/forms?${params.toString()}`);
    printResult(ctx, res);
  });

  forms.command("get").argument("<id>").action(async (id) => {
    const ctx = getCtx();
    const client = createClient(ctx.profile);
    const res = await client.request(`/marketing/v3/forms/${encodePathSegment(id, "id")}`);
    printResult(ctx, res);
  });

  forms.command("create")
    .requiredOption("--data <payload>", "JSON payload")
    .option("--source-format <format>", "Payload shape: auto|v2|v3", "auto")
    .action(async (opts) => {
      const ctx = getCtx();
      const client = createClient(ctx.profile);
      const body = normalizeFormPayloadForV3(parseJsonPayload(opts.data), parseFormPayloadFormat(opts.sourceFormat));
      const res = await maybeWrite(ctx, client, "POST", "/marketing/v3/forms", body);
      printResult(ctx, res);
    });

  forms.command("update")
    .argument("<id>")
    .requiredOption("--data <payload>", "JSON payload")
    .option("--source-format <format>", "Payload shape: auto|v2|v3", "auto")
    .action(async (id, opts) => {
      const ctx = getCtx();
      const client = createClient(ctx.profile);
      const body = normalizeFormPayloadForV3(parseJsonPayload(opts.data), parseFormPayloadFormat(opts.sourceFormat));
      const res = await maybeWrite(ctx, client, "PATCH", `/marketing/v3/forms/${encodePathSegment(id, "id")}`, body);
      printResult(ctx, res);
    });

  forms.command("translate-v2")
    .description("Convert a legacy /forms/v2/forms payload into /marketing/v3/forms shape")
    .requiredOption("--data <payload>", "Legacy forms/v2 JSON payload")
    .action(async (opts) => {
      const ctx = getCtx();
      const body = normalizeFormPayloadForV3(parseJsonPayload(opts.data), "v2");
      printResult(ctx, body);
    });
}
