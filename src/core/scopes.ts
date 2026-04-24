export type HubSpotScopeAccess = "read" | "write" | "read_write" | "other";
export type HubSpotScopeSensitivity = "standard" | "sensitive" | "highly_sensitive";

export interface HubSpotScopeDefinition {
  scope: string;
  category: string;
  access: HubSpotScopeAccess;
  sensitivity: HubSpotScopeSensitivity;
  deprecated: boolean;
  notes?: string;
}

export interface ScopeDiff {
  required: string[];
  granted: string[];
  missing: string[];
  present: string[];
  unknownGranted: string[];
  extraKnown: string[];
}

const SUPPLIED_UI_SCOPE_NAMES = [
  "crm.dealsplits.read_write",
  "crm.export",
  "crm.extensions_calling_transcripts.read",
  "crm.extensions_calling_transcripts.write",
  "crm.import",
  "crm.lists.read",
  "crm.lists.write",
  "crm.objects.appointments.read",
  "crm.objects.appointments.sensitive.read",
  "crm.objects.appointments.sensitive.write",
  "crm.objects.appointments.write",
  "crm.objects.carts.read",
  "crm.objects.carts.write",
  "crm.objects.commercepayments.read",
  "crm.objects.commercepayments.write",
  "crm.objects.companies.highly_sensitive.read",
  "crm.objects.companies.highly_sensitive.write",
  "crm.objects.companies.read",
  "crm.objects.companies.sensitive.read",
  "crm.objects.companies.sensitive.write",
  "crm.objects.companies.write",
  "crm.objects.contacts.highly_sensitive.read",
  "crm.objects.contacts.highly_sensitive.write",
  "crm.objects.contacts.read",
  "crm.objects.contacts.sensitive.read",
  "crm.objects.contacts.sensitive.write",
  "crm.objects.contacts.write",
  "crm.objects.courses.read",
  "crm.objects.courses.write",
  "crm.objects.custom.highly_sensitive.read",
  "crm.objects.custom.highly_sensitive.write",
  "crm.objects.custom.read",
  "crm.objects.custom.sensitive.read",
  "crm.objects.custom.sensitive.write",
  "crm.objects.custom.write",
  "crm.objects.deals.highly_sensitive.read",
  "crm.objects.deals.highly_sensitive.write",
  "crm.objects.deals.read",
  "crm.objects.deals.sensitive.read",
  "crm.objects.deals.sensitive.write",
  "crm.objects.deals.write",
  "crm.objects.feedback_submissions.read",
  "crm.objects.forecasts.read",
  "crm.objects.goals.read",
  "crm.objects.goals.write",
  "crm.objects.invoices.read",
  "crm.objects.invoices.write",
  "crm.objects.leads.read",
  "crm.objects.leads.write",
  "crm.objects.line_items.read",
  "crm.objects.line_items.write",
  "crm.objects.listings.read",
  "crm.objects.listings.write",
  "crm.objects.marketing_events.read",
  "crm.objects.marketing_events.write",
  "crm.objects.orders.read",
  "crm.objects.orders.write",
  "crm.objects.owners.read",
  "crm.objects.partner-clients.read",
  "crm.objects.partner-clients.write",
  "crm.objects.partner-services.read",
  "crm.objects.partner-services.write",
  "crm.objects.products.read",
  "crm.objects.products.write",
  "crm.objects.projects.read",
  "crm.objects.projects.write",
  "crm.objects.quotes.read",
  "crm.objects.quotes.write",
  "crm.objects.services.read",
  "crm.objects.services.write",
  "crm.objects.subscriptions.read",
  "crm.objects.subscriptions.write",
  "crm.objects.users.read",
  "crm.objects.users.write",
  "crm.pipelines.orders.read",
  "crm.pipelines.orders.write",
  "crm.schemas.appointments.read",
  "crm.schemas.appointments.write",
  "crm.schemas.carts.read",
  "crm.schemas.carts.write",
  "crm.schemas.commercepayments.read",
  "crm.schemas.commercepayments.write",
  "crm.schemas.companies.read",
  "crm.schemas.companies.write",
  "crm.schemas.contacts.read",
  "crm.schemas.contacts.write",
  "crm.schemas.courses.read",
  "crm.schemas.courses.write",
  "crm.schemas.custom.read",
  "crm.schemas.custom.write",
  "crm.schemas.deals.read",
  "crm.schemas.deals.write",
  "crm.schemas.forecasts.read",
  "crm.schemas.invoices.read",
  "crm.schemas.invoices.write",
  "crm.schemas.line_items.read",
  "crm.schemas.listings.read",
  "crm.schemas.listings.write",
  "crm.schemas.orders.read",
  "crm.schemas.orders.write",
  "crm.schemas.projects.read",
  "crm.schemas.projects.write",
  "crm.schemas.quotes.read",
  "crm.schemas.quotes.write",
  "crm.schemas.services.read",
  "crm.schemas.services.write",
  "crm.schemas.subscriptions.read",
  "crm.schemas.subscriptions.write",
  "cms.domains.read",
  "cms.domains.write",
  "cms.functions.read",
  "cms.functions.write",
  "cms.knowledge_base.articles.publish",
  "cms.knowledge_base.articles.read",
  "cms.knowledge_base.articles.write",
  "cms.knowledge_base.settings.read",
  "cms.knowledge_base.settings.write",
  "cms.membership.access_groups.read",
  "cms.membership.access_groups.write",
  "cms.performance.read",
  "automation",
  "automation.sequences.enrollments.write",
  "automation.sequences.read",
  "communication_preferences.read",
  "communication_preferences.read_write",
  "communication_preferences.statuses.batch.read",
  "communication_preferences.statuses.batch.write",
  "communication_preferences.write",
  "conversations.custom_channels.read",
  "conversations.custom_channels.write",
  "conversations.read",
  "conversations.visitor_identification.tokens.create",
  "conversations.write",
  "marketing.campaigns.read",
  "marketing.campaigns.revenue.read",
  "marketing.campaigns.write",
  "settings.billing.write",
  "settings.currencies.read",
  "settings.currencies.write",
  "settings.security.security_health.read",
  "settings.users.read",
  "settings.users.teams.read",
  "settings.users.teams.write",
  "settings.users.write",
  "tickets",
  "tickets.highly_sensitive",
  "tickets.sensitive",
  "account-info.security.read",
  "accounting",
  "actions",
  "analytics.behavioral_events.send",
  "behavioral_events.event_definitions.read_write",
  "business-intelligence",
  "business_units_view.read",
  "collector.graphql_query.execute",
  "collector.graphql_schema.read",
  "content",
  "ctas.read",
  "data_integration.data_source.file.read",
  "data_integration.data_source.file.write",
  "e-commerce",
  "external_integrations.forms.access",
  "files",
  "files.ui_hidden.read",
  "forms",
  "forms-uploaded-files",
  "hubdb",
  "integration-sync",
  "integrations.zoom-app.playbooks.read",
  "marketing-email",
  "mcp.users.read",
  "media_bridge.read",
  "media_bridge.write",
  "oauth",
  "origins.ip_ranges.webhook.read",
  "origins.ip_ranges.webhook.write",
  "record_images.signed_urls.read",
  "sales-email-read",
  "scheduler.meetings.meeting-link.read",
  "social",
  "tax_rates.read",
  "timeline",
  "transactional-email",
] as const;

const ENGAGEMENT_SCOPE_NAMES = [
  "crm.objects.calls.read",
  "crm.objects.calls.write",
  "crm.objects.emails.read",
  "crm.objects.emails.write",
  "crm.objects.meetings.read",
  "crm.objects.meetings.write",
  "crm.objects.notes.read",
  "crm.objects.notes.write",
  "crm.objects.tasks.read",
  "crm.objects.tasks.write",
] as const;

const SUPPLEMENTAL_SCOPE_NAMES = [
  "crm.schemas.products.read",
  "crm.schemas.products.write",
] as const;

export const HUBSPOT_SCOPE_NAMES = uniqueSorted([
  ...SUPPLIED_UI_SCOPE_NAMES,
  ...ENGAGEMENT_SCOPE_NAMES,
  ...SUPPLEMENTAL_SCOPE_NAMES,
]);

const DEPRECATED_SCOPES = new Set([
  "accounting",
  "actions",
  "e-commerce",
  "integration-sync",
]);

const SCOPE_NOTES: Record<string, string> = {
  "automation": "Required for Workflows v4 (/automation/v4/flows).",
  "forms": "Required for Marketing Forms v3.",
  "forms-uploaded-files": "Required to download files submitted through forms.",
  "sales-email-read": "Required to read one-to-one sales email engagement content.",
  "settings.users.teams.write": "Team writes may still depend on endpoint availability and account permissions.",
  "tickets": "Legacy broad tickets scope; granular ticket scopes may not appear in every private-app UI.",
};

export const HUBSPOT_SCOPE_CATALOG: HubSpotScopeDefinition[] = HUBSPOT_SCOPE_NAMES.map((scope) => ({
  scope,
  category: inferCategory(scope),
  access: inferAccess(scope),
  sensitivity: inferSensitivity(scope),
  deprecated: DEPRECATED_SCOPES.has(scope),
  ...(SCOPE_NOTES[scope] ? { notes: SCOPE_NOTES[scope] } : {}),
}));

export const HUBSPOT_SCOPE_PRESETS: Record<string, string[]> = {
  "track4": [
    "crm.lists.read",
    "crm.objects.companies.read",
    "crm.objects.contacts.read",
    "crm.objects.custom.read",
    "crm.objects.deals.read",
    "crm.objects.line_items.read",
    "crm.objects.owners.read",
    "crm.objects.products.read",
    "crm.objects.quotes.read",
    "crm.objects.subscriptions.read",
    "crm.schemas.companies.read",
    "crm.schemas.contacts.read",
    "crm.schemas.custom.read",
    "crm.schemas.deals.read",
    "crm.schemas.line_items.read",
    "crm.schemas.products.read",
    "crm.schemas.quotes.read",
    "crm.schemas.subscriptions.read",
    "content",
    "files",
    "settings.users.read",
    "settings.users.teams.read",
    "tickets",
  ],
  "real-mirror-read": [
    "automation",
    "crm.export",
    "crm.lists.read",
    "crm.objects.calls.read",
    "crm.objects.companies.read",
    "crm.objects.contacts.read",
    "crm.objects.custom.read",
    "crm.objects.deals.read",
    "crm.objects.emails.read",
    "crm.objects.feedback_submissions.read",
    "crm.objects.goals.read",
    "crm.objects.invoices.read",
    "crm.objects.leads.read",
    "crm.objects.line_items.read",
    "crm.objects.marketing_events.read",
    "crm.objects.meetings.read",
    "crm.objects.notes.read",
    "crm.objects.orders.read",
    "crm.objects.owners.read",
    "crm.objects.products.read",
    "crm.objects.quotes.read",
    "crm.objects.subscriptions.read",
    "crm.objects.tasks.read",
    "crm.schemas.companies.read",
    "crm.schemas.contacts.read",
    "crm.schemas.custom.read",
    "crm.schemas.deals.read",
    "crm.schemas.invoices.read",
    "crm.schemas.line_items.read",
    "crm.schemas.orders.read",
    "crm.schemas.products.read",
    "crm.schemas.quotes.read",
    "crm.schemas.subscriptions.read",
    "content",
    "files",
    "files.ui_hidden.read",
    "forms",
    "forms-uploaded-files",
    "sales-email-read",
    "settings.currencies.read",
    "settings.users.read",
    "settings.users.teams.read",
    "tickets",
  ],
  "real-mirror-write": [
    "automation",
    "crm.import",
    "crm.lists.write",
    "crm.objects.calls.write",
    "crm.objects.companies.write",
    "crm.objects.contacts.write",
    "crm.objects.custom.write",
    "crm.objects.deals.write",
    "crm.objects.emails.write",
    "crm.objects.goals.write",
    "crm.objects.invoices.write",
    "crm.objects.leads.write",
    "crm.objects.line_items.write",
    "crm.objects.marketing_events.write",
    "crm.objects.meetings.write",
    "crm.objects.notes.write",
    "crm.objects.orders.write",
    "crm.objects.products.write",
    "crm.objects.quotes.write",
    "crm.objects.subscriptions.write",
    "crm.objects.tasks.write",
    "crm.schemas.companies.write",
    "crm.schemas.contacts.write",
    "crm.schemas.custom.write",
    "crm.schemas.deals.write",
    "crm.schemas.invoices.write",
    "crm.schemas.orders.write",
    "crm.schemas.quotes.write",
    "crm.schemas.subscriptions.write",
    "content",
    "files",
    "forms",
    "settings.currencies.write",
    "settings.users.teams.write",
    "settings.users.write",
    "tickets",
  ],
};

export function listScopePresetNames(): string[] {
  return Object.keys(HUBSPOT_SCOPE_PRESETS).sort();
}

export function getScopeDefinition(scope: string): HubSpotScopeDefinition | undefined {
  const wanted = scope.trim().toLowerCase();
  return HUBSPOT_SCOPE_CATALOG.find((definition) => definition.scope.toLowerCase() === wanted);
}

export function parseScopeList(raw: string | string[] | undefined): string[] {
  if (Array.isArray(raw)) return uniqueSorted(raw);
  if (!raw) return [];
  return uniqueSorted(raw.split(/[\s,]+/));
}

export function resolveScopeSet(raw: string | undefined): { name: string; scopes: string[] } {
  const name = raw?.trim() || "real-mirror-read";
  const preset = HUBSPOT_SCOPE_PRESETS[name];
  if (preset) return { name, scopes: uniqueSorted(preset) };
  return { name: "custom", scopes: parseScopeList(name) };
}

export function diffScopes(required: string[], granted: string[]): ScopeDiff {
  const requiredSet = new Set(uniqueSorted(required));
  const grantedSet = new Set(uniqueSorted(granted));
  const catalogSet = new Set(HUBSPOT_SCOPE_NAMES.map((scope) => scope.toLowerCase()));
  return {
    required: [...requiredSet],
    granted: [...grantedSet],
    missing: [...requiredSet].filter((scope) => !grantedSet.has(scope)),
    present: [...requiredSet].filter((scope) => grantedSet.has(scope)),
    unknownGranted: [...grantedSet].filter((scope) => !catalogSet.has(scope)),
    extraKnown: [...grantedSet].filter((scope) => catalogSet.has(scope) && !requiredSet.has(scope)),
  };
}

function inferCategory(scope: string): string {
  if (scope.startsWith("crm.objects.")) return "crm.objects";
  if (scope.startsWith("crm.schemas.")) return "crm.schemas";
  if (scope.startsWith("crm.pipelines.")) return "crm.pipelines";
  if (scope.startsWith("cms.")) return "cms";
  if (scope.startsWith("automation.")) return "automation";
  if (scope.startsWith("communication_preferences.")) return "communication_preferences";
  if (scope.startsWith("conversations.")) return "conversations";
  if (scope.startsWith("marketing.")) return "marketing";
  if (scope.startsWith("settings.")) return "settings";
  if (scope.includes(".")) return scope.split(".")[0];
  return "platform";
}

function inferAccess(scope: string): HubSpotScopeAccess {
  if (scope.endsWith(".read_write") || scope.endsWith("_read_write")) return "read_write";
  if (scope.endsWith(".read") || scope.endsWith("_view.read") || scope.includes(".read.")) return "read";
  if (scope.endsWith(".write") || scope.endsWith(".publish") || scope.endsWith(".create") || scope.includes(".write.")) return "write";
  return "other";
}

function inferSensitivity(scope: string): HubSpotScopeSensitivity {
  if (scope.includes("highly_sensitive")) return "highly_sensitive";
  if (scope.includes("sensitive")) return "sensitive";
  return "standard";
}

function uniqueSorted(values: readonly string[]): string[] {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean))).sort();
}
