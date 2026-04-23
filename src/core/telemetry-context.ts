/**
 * Per-invocation telemetry context.
 *
 * The MCP wrapper sets `toolName` at handler entry so trace/audit events can be
 * attributed to the specific MCP tool that triggered the HTTP call. Using
 * AsyncLocalStorage (not process.env) because concurrent MCP invocations would
 * otherwise race on a process-global env var and mis-attribute telemetry.
 */
import { AsyncLocalStorage } from "node:async_hooks";

export interface TelemetryContext {
  toolName?: string;
}

const store = new AsyncLocalStorage<TelemetryContext>();

export function runWithTelemetryContext<T>(ctx: TelemetryContext, fn: () => T): T {
  return store.run(ctx, fn);
}

export function getTelemetryContext(): TelemetryContext | undefined {
  return store.getStore();
}
