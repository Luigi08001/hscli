# CLAUDE.md — hubcli project rules

## hubcli vs HubSpot CLI (@hubspot/cli)

These are **two separate CLIs** that serve different purposes:

| | **hubcli** (this project) | **HubSpot CLI (`hs`)** |
|---|---|---|
| **Package** | `hubcli` (local) | `@hubspot/cli` (npm) |
| **Binary** | `hubcli` | `hs` |
| **Focus** | CRM data operations (CRUD, search, pipelines, properties, associations) | Developer tooling (projects, CMS, themes, UI extensions, serverless) |
| **Auth** | Private App Token (`pat-*`) stored in `~/.hubcli/auth.json` | Personal Access Key stored in `~/.hscli/config.yml` |
| **MCP** | Built-in MCP server (`hubcli mcp`) | No MCP support |
| **Write safety** | Dry-run by default, requires `--force` | Direct execution |

### Installing hubcli
```bash
# From source (development)
git clone <repo> && cd hubcli-main
npm install && npm run build
# Use directly:
node dist/cli.js <command>
# Or link globally:
npm link

# Auth with Private App Token
hubcli auth login --token "<pat-eu1-...>"
```

### Installing HubSpot CLI
```bash
npm install -g @hubspot/cli
# Or as dev dependency (used in this project):
npm install --save-dev @hubspot/cli

# Auth with Personal Access Key (generated in HubSpot UI)
hs account auth --pak="<personal-access-key>"
```

### When to use which
- **hubcli**: CRM record CRUD, bulk operations, search, pipelines, properties, associations, MCP integration
- **hs CLI**: HubSpot Projects (UI extensions, CRM cards), CMS content, themes, serverless functions, developer tooling

Both CLIs can coexist. hubcli uses `~/.hubcli/` for config; hs uses `~/.hscli/`.

## Build & Test
- Build: `npm run build` (TypeScript → dist/)
- Run CLI: `node --input-type=module -e "import { createProgram } from './dist/cli.js'; ..."`
- Run tests: `npx tsx --test tests/cli.test.ts` and `npx tsx --test tests/mcp.test.ts`

## HubSpot API Rules

### Error Threshold Rule
When performing bulk operations against the HubSpot API (batch creates, imports, seed scripts):
1. **Validate first**: Before creating records in bulk, create a single test record and confirm success.
2. **5-error hard stop**: If more than 5 errors occur on the same action type (same endpoint, same error code), STOP immediately. Do not continue retrying.
3. **Diagnose before retry**: Analyze the error response (field validation, rate limits, auth issues) and fix the root cause in code before attempting again.
4. **Rate limit awareness**: HubSpot enforces 10-second rolling limits (~100 req/10s for private apps). Use sequential processing with throttle pauses (1-2s per 5 records), not large parallel batches.
5. **Idempotent re-runs**: Seed scripts must check for existing records before creating duplicates.

### Record Owner Rule
When creating any CRM record (contacts, companies, deals, tickets, custom objects), **always ask for the record owner** before proceeding. Owner assignment is required for:
- Data quality and portal health
- Correct routing of notifications and tasks
- Accurate reporting and pipeline visibility
- Brand/team segmentation (e.g., LvnCLI → Louis, MCP_LVN → Gonzalo)

Never create records without an explicit owner. If bulk-creating records, confirm the owner assignment logic (per-brand, round-robin, etc.) with the user first.

### Missing Information Rule
When creating HubSpot objects (companies, custom objects, contacts), if required fields or configuration choices are ambiguous, **ask the user before proceeding**. Never guess at business-specific values like:
- Record owner (see Record Owner Rule above)
- Company details (industry, type, revenue)
- Custom object schemas (field names, types, associations)
- Pipeline stages and probabilities
- Property field types and options

## Architecture
- `src/core/` — shared modules (auth, http client, output, URLs, capabilities)
- `src/commands/` — CLI command registration
- `src/mcp/` — MCP server with tool registration
- `scripts/` — utility scripts (seed data, release checksums)
- All write operations require `--force` (CLI) or `force: true` (MCP), dry-run by default

## Portal Context
- Portal ID and uiDomain are cached in `~/.hubcli/auth.json` per profile
- URLs are enriched automatically in CLI and MCP responses
- EU portals use `app-eu1.hubspot.com`, US portals use `app.hubspot.com`
