import { readFileSync } from "node:fs";
import type { HubSpotClient } from "../../core/http.js";
import { CliError } from "../../core/output.js";

const READONLY_PROPERTY_KEYS = new Set([
  "archived",
  "archivedAt",
  "calculated",
  "createdAt",
  "createdUserId",
  "hubspotDefined",
  "modificationMetadata",
  "referencedObjectType",
  "updatedAt",
  "updatedUserId",
]);

export type PropertyInput = Record<string, unknown>;

export interface NormalizedPropertyBatch {
  rawInputs: PropertyInput[];
  inputs: PropertyInput[];
  skippedReadonly: string[];
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function parseJsonInput(raw: string): unknown {
  const value = raw.trim();
  if (value.startsWith("@")) {
    const filePath = value.slice(1).trim();
    if (!filePath) {
      throw new CliError("INVALID_JSON_FILE", "--data @file requires a file path");
    }
    try {
      return JSON.parse(readFileSync(filePath, "utf8")) as unknown;
    } catch (err) {
      if (err instanceof SyntaxError) {
        throw new CliError("INVALID_JSON", `Invalid JSON payload in ${filePath}`);
      }
      throw err;
    }
  }
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    throw new CliError("INVALID_JSON", "Invalid JSON payload");
  }
}

function coercePropertyInputs(payload: unknown): PropertyInput[] {
  const unwrapped = isRecord(payload) && "data" in payload ? payload.data : payload;
  let inputs: unknown;
  if (Array.isArray(unwrapped)) {
    inputs = unwrapped;
  } else if (isRecord(unwrapped) && Array.isArray(unwrapped.inputs)) {
    inputs = unwrapped.inputs;
  } else if (isRecord(unwrapped) && Array.isArray(unwrapped.results)) {
    inputs = unwrapped.results;
  } else {
    throw new CliError("INVALID_PROPERTY_BATCH", "--data must be an array, { inputs: [...] }, a properties list dump with { results: [...] }, or hscli JSON output with data.results");
  }
  if (!Array.isArray(inputs) || inputs.length === 0) {
    throw new CliError("INVALID_PROPERTY_BATCH", "--data must include at least one property");
  }
  return inputs.map((input, index) => {
    if (!isRecord(input)) {
      throw new CliError("INVALID_PROPERTY_BATCH", `Property at index ${index} must be an object`);
    }
    return input;
  });
}

export function readPropertyInputs(raw: string): PropertyInput[] {
  return coercePropertyInputs(parseJsonInput(raw));
}

function isReadonlyProperty(input: PropertyInput): boolean {
  if (input.hubspotDefined === true) return true;
  const metadata = input.modificationMetadata;
  return isRecord(metadata) && metadata.readOnlyDefinition === true;
}

export function propertyName(input: PropertyInput, fallback: string): string {
  return typeof input.name === "string" && input.name.trim() ? input.name.trim() : fallback;
}

function normalizePropertyInput(input: PropertyInput): PropertyInput {
  const normalized: PropertyInput = {};
  for (const [key, value] of Object.entries(input)) {
    if (READONLY_PROPERTY_KEYS.has(key)) continue;
    normalized[key] = value;
  }
  return normalized;
}

export function normalizePropertyBatch(rawInputs: PropertyInput[], includeReadonly = false): NormalizedPropertyBatch {
  const skippedReadonly: string[] = [];
  const inputs: PropertyInput[] = [];

  for (const [index, input] of rawInputs.entries()) {
    if (!includeReadonly && isReadonlyProperty(input)) {
      skippedReadonly.push(propertyName(input, `<index:${index}>`));
      continue;
    }
    inputs.push(normalizePropertyInput(input));
  }

  return { rawInputs, inputs, skippedReadonly };
}

export function chunkInputs<T>(inputs: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < inputs.length; i += chunkSize) {
    chunks.push(inputs.slice(i, i + chunkSize));
  }
  return chunks;
}

export async function loadExistingPropertyNames(client: HubSpotClient, objectTypeSegment: string): Promise<Set<string>> {
  const res = await client.request(`/crm/v3/properties/${objectTypeSegment}`);
  if (!isRecord(res) || !Array.isArray(res.results)) return new Set();
  return new Set(
    res.results
      .filter(isRecord)
      .map((item) => item.name)
      .filter((name): name is string => typeof name === "string" && name.trim().length > 0),
  );
}
