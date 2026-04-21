# Portal Write Probe — 147975758 (EU1, DEVELOPER_TEST)

Generated: 2026-04-21T18:27:03.009Z  •  hubcli @ c824207  •  profile: `default`  •  runSuffix: `yfx4s`  •  HUBCLI_DEV_APP_ID: `37336308`

Probed 742 write endpoints (POST non-search + PUT + PATCH + DELETE) of 1180 total HubSpot API endpoints.

## Summary

| Category | Count | % |
|---|---:|---:|
| **PASS** | 53 | 7.1% |
| **VALIDATION** | 142 | 19.1% |
| **AUTH** | 18 | 2.4% |
| **ZOMBIE** | 10 | 1.3% |
| **404** | 193 | 26.0% |
| **METHOD** | 179 | 24.1% |
| **5XX** | 2 | 0.3% |
| **SKIP-PARAM** | 103 | 13.9% |
| **SKIP-ARTIFACT** | 33 | 4.4% |

## Legend

- **PASS** — 2xx; write succeeded with our minimal body
- **CONFLICT** — 409; endpoint works, resource already exists (semantic PASS)
- **VALIDATION** — 400; endpoint reachable + authenticated, but our minimal body is incomplete. User must provide real data via `--data`. **Counts as headless-accessible.**
- **AUTH** — 401/403 (scope or auth issue, non-zombie)
- **ZOMBIE** — 403 with explicit "requires legacy hapikey" — HubSpot's dead developer auth style
- **TIER** — 403 paid-plan-only (Marketing Hub Pro+, Service Hub Pro, etc.)
- **404** — path not found (scrape stale OR portal missing feature)
- **METHOD** — 405; scrape metadata listed wrong verb
- **5XX / 429** — server-side error or rate limit
- **SKIP-PARAM** — unresolved `{param}`
- **SKIP-ARTIFACT** — scrape artifact placeholder
- **SKIP-UNSAFE** — intentionally skipped for safety (portal-wide destructive)

## Headless accessibility

- **Directly succeeding**: 53 / 742 (7.1%)
- **Reachable via hubcli** (PASS + CONFLICT + VALIDATION): 195 / 742 (26.3%)

The headless accessibility rate treats VALIDATION responses as "reachable" because they confirm the endpoint authenticates the call and HubSpot accepted the path — what's missing is just richer payload data which is the user's domain, not the CLI's.

## Per-method breakdown

| Method | Total | PASS | CONFLICT | VALIDATION | AUTH | ZOMBIE | TIER | 404 | METHOD | 400 | 429 | 5XX | SKIP-PARAM | SKIP-ARTIFACT | SKIP-UNSAFE | ERROR |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| POST | 472 | 21 |  | 97 | 5 | 4 |  | 123 | 158 |  |  | 2 | 31 | 25 |  |  |
| PUT | 71 | 2 |  | 14 | 2 | 1 |  | 30 | 8 |  |  |  | 11 |  |  |  |
| PATCH | 76 | 3 |  | 21 | 4 | 3 |  | 12 | 1 |  |  |  | 28 | 4 |  |  |
| DELETE | 123 | 27 |  | 10 | 7 | 2 |  | 28 | 12 |  |  |  | 33 | 4 |  |  |

## Per-module breakdown

| Module | Probed | PASS | CONFLICT | VALIDATION | AUTH | ZOMBIE | TIER | 404 | METHOD | 400 | 429 | 5XX | SKIP-PARAM | SKIP-ARTIFACT | SKIP-UNSAFE | ERROR |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| cms | 160 | 6 |  | 23 |  | 10 |  | 48 | 27 |  |  | 2 | 39 |  |  |  |
| crm_core | 301 | 33 |  | 56 | 7 |  |  | 50 | 113 |  |  |  | 25 | 16 |  |  |
| general | 126 | 2 |  | 30 | 6 |  |  | 65 | 17 |  |  |  | 6 |  |  |  |
| marketing | 74 | 7 |  | 21 |  |  |  | 20 | 6 |  |  |  | 19 |  |  |  |
| operations | 13 | 2 |  | 2 | 4 |  |  | 1 | 1 |  |  |  | 1 |  |  |  |
| sales | 27 | 1 |  | 4 |  |  |  | 2 | 9 |  |  |  | 2 | 9 |  |  |
| service | 30 | 1 |  | 4 | 1 |  |  |  | 6 |  |  |  | 10 | 8 |  |  |
| settings | 11 | 1 |  | 2 |  |  |  | 7 |  |  |  |  | 1 |  |  |  |

## Zombie endpoints (10) — require legacy hapikey

- `POST /media-bridge/v1/{appId}/properties/{objectType}` → **403**
- `POST /media-bridge/v1/{appId}/properties/{objectType}/groups` → **403**
- `DELETE /media-bridge/v1/{appId}/properties/{objectType}/groups/{groupName}` → **403**
- `PATCH /media-bridge/v1/{appId}/properties/{objectType}/groups/{groupName}` → **403**
- `DELETE /media-bridge/v1/{appId}/properties/{objectType}/{propertyName}` → **403**
- `PATCH /media-bridge/v1/{appId}/properties/{objectType}/{propertyName}` → **403**
- `PATCH /media-bridge/v1/{appId}/schemas/{objectType}` → **403**
- `POST /media-bridge/v1/{appId}/schemas/{objectType}/associations` → **403**
- `PUT /media-bridge/v1/{appId}/settings` → **403**
- `POST /media-bridge/v1/{appId}/settings/register` → **403**

## Tier-locked endpoints (0)


## First 40 VALIDATION (reachable, body-incomplete)

- `POST /cms/v3/blogs/authors` → **400**  _{"correlationId":"019db14a-de02-7b98-b947-29b795055b95","errorType":"AUTHOR_FULL_NAME_MISSING","message":"The author's d_
- `POST /cms/v3/blogs/posts` → **400**  _{"correlationId":"019db14a-e248-78dc-922b-472c83839c59","errorType":"PARENT_BLOG_DOES_NOT_EXIST","message":"Selected par_
- `POST /cms/v3/blogs/posts/clone` → **400**  _{"category":"VALIDATION_ERROR","correlationId":"019db14a-e348-7873-8d39-9063571daa5b","message":"Invalid input JSON on l_
- `POST /cms/v3/blogs/posts/schedule` → **400**  _{"category":"VALIDATION_ERROR","correlationId":"019db14a-e561-7ee5-bceb-2e9e9a70747a","message":"Invalid input JSON on l_
- `POST /cms/v3/hubdb/tables/{tableIdOrName}/draft/clone` → **400**  _{"status":"error","message":"Errors validating HubDbTableCloneRequestCore","correlationId":"019db14a-ead7-714b-a1c1-ae1d_
- `POST /cms/v3/hubdb/tables/{tableIdOrName}/draft/reset` → **400**  _{"status":"error","message":"Table is already locked for write operation.","correlationId":"019db14a-ebdd-7d98-99ba-32dd_
- `POST /cms/v3/hubdb/tables/{tableIdOrName}/rows/draft/batch/clone` → **400**  _{"status":"error","message":"Batch input provided should have at least one object.","correlationId":"019db14a-edf9-75e8-_
- `POST /cms/v3/hubdb/tables/{tableIdOrName}/rows/draft/batch/purge` → **400**  _{"status":"error","message":"Batch input provided should have at least one object.","correlationId":"019db14a-ee50-768e-_
- `POST /cms/v3/hubdb/tables/{tableIdOrName}/rows/draft/batch/replace` → **400**  _{"status":"error","message":"Batch input provided should have at least one object.","correlationId":"019db14a-eec3-7c85-_
- `DELETE /cms/v3/hubdb/tables/{tableIdOrName}/rows/{rowId}/draft` → **400**  _{"status":"error","message":"Row 0 to be hard deleted could not be found in table 2079915245","correlationId":"019db14a-_
- `POST /cms/v3/pages/landing-pages` → **400**  _{"correlationId":"019db14a-f0c7-70e1-a0d3-95b2e352293d","errorTokens":{"contentType":["LANDING_PAGE"]},"errorType":"CONT_
- `POST /cms/v3/pages/landing-pages/ab-test/end` → **400**  _{"category":"VALIDATION_ERROR","correlationId":"019db14a-f1ba-7052-8d7e-061f4a23aa87","message":"Invalid input JSON on l_
- `POST /cms/v3/pages/landing-pages/ab-test/rerun` → **400**  _{"category":"VALIDATION_ERROR","correlationId":"019db14a-f1d5-77d6-9013-9e4ed9d31bd6","message":"Invalid input JSON on l_
- `POST /cms/v3/pages/landing-pages/clone` → **400**  _{"category":"VALIDATION_ERROR","correlationId":"019db14a-f3a0-758d-b0b6-7459f006300e","message":"Invalid input JSON on l_
- `POST /cms/v3/pages/landing-pages/schedule` → **400**  _{"category":"VALIDATION_ERROR","correlationId":"019db14a-f6ee-71be-aac9-0adfff0e158e","message":"Invalid input JSON on l_
- `POST /cms/v3/pages/site-pages` → **400**  _{"correlationId":"019db14a-f81e-7930-9973-e68453d0cc71","errorTokens":{"contentType":["SITE_PAGE"]},"errorType":"CONTENT_
- `POST /cms/v3/pages/site-pages/ab-test/end` → **400**  _{"category":"VALIDATION_ERROR","correlationId":"019db14a-f83f-7cc9-9eb9-dcbea53e2b6b","message":"Invalid input JSON on l_
- `POST /cms/v3/pages/site-pages/ab-test/rerun` → **400**  _{"category":"VALIDATION_ERROR","correlationId":"019db14a-f903-79ce-8330-ceb826805ab1","message":"Invalid input JSON on l_
- `POST /cms/v3/pages/site-pages/clone` → **400**  _{"category":"VALIDATION_ERROR","correlationId":"019db14a-fa19-797f-9acc-36d72d99a6b6","message":"Invalid input JSON on l_
- `POST /cms/v3/pages/site-pages/schedule` → **400**  _{"category":"VALIDATION_ERROR","correlationId":"019db14a-fc24-7620-82b2-4abc5d73c3f1","message":"Invalid input JSON on l_
- `POST /cms/v3/source-code/extract/async` → **400**  _{"status":"error","message":"Invalid input JSON on line 1, column 2. Some required fields were not set: [path]","correla_
- `POST /cms/v3/url-redirects/` → **400**  _{"status":"error","message":"Invalid input JSON on line 1, column 2. Some required fields were not set: [routePrefix, de_
- `POST /files/v3/folders` → **400**  _{"status":"error","message":"Invalid input JSON on line 1, column 2. Some required fields were not set: [name]","correla_
- `POST /crm/associations/2025-09/{fromObjectType}/{toObjectType}/labels` → **400**  _{"status":"error","message":"Invalid input JSON on line 1, column 2. Some required fields were not set: [label, name]","_
- `PUT /crm/associations/2025-09/{fromObjectType}/{toObjectType}/labels` → **400**  _{"status":"error","message":"Invalid input JSON on line 1, column 2. Some required fields were not set: [label, associat_
- `PUT /crm/associations/v4/{fromObjectType}/{toObjectType}/labels` → **400**  _{"status":"error","message":"Invalid input JSON on line 1, column 2. Some required fields were not set: [label, associat_
- `POST /crm/objects/v3/projects` → **400**  _{"status":"error","message":"Error creating PROJECT. Some required properties were not set.","correlationId":"019db14b-1_
- `POST /crm/objects/v3/projects/merge` → **400**  _{"status":"error","message":"Invalid input JSON on line 1, column 2. Some required fields were not set: [primaryObjectId_
- `POST /crm/v3/exports/export/async` → **400**  _{"status":"error","message":"Invalid input JSON on line 1, column 2: Could not resolve subtype of [simple type, class co_
- `POST /crm/v3/extensions/calling/recordings/ready` → **400**  _{"status":"error","message":"Invalid input JSON on line 1, column 2. Some required fields were not set: [engagementId]",_
- `POST /crm/v3/imports/{importId}/cancel` → **400**  _{"status":"error","message":"importId must be positive.","correlationId":"019db14b-1fb4-753e-a0bc-edbb26359dc0","context_
- `POST /crm/v3/lists/` → **400**  _{"status":"error","message":"Invalid input JSON on line 1, column 2. Some required fields were not set: [name, objectTyp_
- `POST /crm/v3/lists/folders` → **400**  _{"status":"error","message":"Invalid input JSON on line 1, column 2. Some required fields were not set: [name]","correla_
- `POST /crm/v3/lists/idmapping` → **400**  _{"status":"error","message":"Invalid input JSON on line 1, column 1: Cannot deserialize value of type `java.util.HashSet_
- `PUT /crm/v3/lists/{listId}/memberships/add` → **400**  _{"status":"error","message":"Invalid input JSON on line 1, column 1: Cannot deserialize value of type `java.util.ArrayLi_
- `PUT /crm/v3/lists/{listId}/memberships/remove` → **400**  _{"status":"error","message":"Invalid input JSON on line 1, column 1: Cannot deserialize value of type `java.util.ArrayLi_
- `POST /crm/v3/objects/calls` → **400**  _{"status":"error","message":"Error creating CALL. Some required properties were not set.","correlationId":"019db14b-254b_
- `PATCH /crm/v3/objects/calls/{callId}` → **400**  _{"status":"error","message":"No properties found to update, please provide at least one.","correlationId":"019db14b-27c4_
- `POST /crm/v3/objects/carts` → **400**  _{"status":"error","message":"Property values were not valid: [{\"isValid\":false,\"message\":\"Property \\\"name\\\" doe_
- `PATCH /crm/v3/objects/carts/{cartId}` → **400**  _{"status":"error","message":"No properties found to update, please provide at least one.","correlationId":"019db14b-2a2f_

## First 40 AUTH (non-zombie auth failure)

- `DELETE /crm/v3/extensions/calling/{appId}/settings` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you ca_
- `PATCH /crm/v3/extensions/calling/{appId}/settings` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you ca_
- `POST /crm/v3/extensions/calling/{appId}/settings` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you ca_
- `PATCH /crm/v3/extensions/calling/{appId}/settings/recording` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you ca_
- `POST /crm/v3/extensions/calling/{appId}/settings/recording` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you ca_
- `DELETE /crm/v3/extensions/videoconferencing/settings/{appId}` → **403**  _{"status":"error","message":"The scope needed for this API call isn't available for public use. If you have questions, c_
- `PUT /crm/v3/extensions/videoconferencing/settings/{appId}` → **403**  _{"status":"error","message":"The scope needed for this API call isn't available for public use. If you have questions, c_
- `POST /email/public/v1/smtpapi/tokens` → **403**  _{"status":"error","message":"This app hasn't been granted all required scopes to make this call. Read more about require_
- `DELETE /webhooks/v3/{appId}/settings` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you ca_
- `POST /webhooks/v3/{appId}/subscriptions` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you ca_
- `PUT /webhooks/v3/{appId}/settings` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you ca_
- `DELETE /webhooks/v3/{appId}/subscriptions/{subscriptionId}` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you ca_
- `PATCH /webhooks/v3/{appId}/subscriptions/{subscriptionId}` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you ca_
- `DELETE /automation/v4/actions/{appId}/{definitionId}` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you ca_
- `DELETE /automation/v4/actions/{appId}/{definitionId}/functions/{functionType}` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you ca_
- `PATCH /automation/v4/actions/{appId}/{definitionId}` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you ca_
- `DELETE /automation/v4/actions/{appId}/{definitionId}/functions/{functionType}/{functionId}` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you ca_
- `POST /conversations/v3/custom-channels/` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you ca_

## First 40 404s

- `POST /cms/v3/blog-settings/settings/multi-language/create/language/variation` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 N_
- `POST /cms/v3/blog-settings/settings/multi-language/attach/to/lang-group` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 N_
- `POST /cms/v3/blog-settings/settings/multi-language/detach/from/lang-group` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 N_
- `PUT /cms/v3/blog-settings/settings/multi-language/set/new/lang/primary` → **404**  __
- `POST /cms/v3/blog-settings/settings/multi-language/update/languages` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 N_
- `POST /cms/v3/blogs/authors/multi-language/create/language/variation` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 N_
- `POST /cms/v3/blogs/authors/multi-language/attach/to/lang-group` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 N_
- `POST /cms/v3/blogs/authors/multi-language/detach/from/lang-group` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 N_
- `POST /cms/v3/blogs/authors/multi-language/update/languages` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 N_
- `PUT /cms/v3/blogs/authors/multi-language/set/new/lang/primary` → **404**  __
- `POST /cms/v3/blogs/posts/multi-language/attach/to/lang-group` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 N_
- `POST /cms/v3/blogs/posts/multi-language/create/language/variation` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 N_
- `POST /cms/v3/blogs/posts/multi-language/detach/from/lang-group` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 N_
- `PUT /cms/v3/blogs/posts/multi-language/set/new/lang/primary` → **404**  __
- `POST /cms/v3/blogs/posts/multi-language/update/languages` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 N_
- `POST /cms/v3/blogs/tags/multi-language/attach/to/lang-group` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 N_
- `POST /cms/v3/blogs/tags/multi-language/create/language/variation` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 N_
- `POST /cms/v3/blogs/tags/multi-language/detach/from/lang-group` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 N_
- `PUT /cms/v3/blogs/tags/multi-language/set/new/lang/primary` → **404**  __
- `POST /cms/v3/blogs/tags/multi-language/update/languages` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 N_
- `POST /cms/v3/hubdb/tables/{tableIdOrName}/rows/batch-read` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 N_
- `POST /cms/v3/hubdb/tables/{tableIdOrName}/rows/draft/batch-create` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 N_
- `POST /cms/v3/hubdb/tables/{tableIdOrName}/rows/draft/batch-read` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 N_
- `POST /cms/v3/hubdb/tables/{tableIdOrName}/rows/draft/batch-update` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 N_
- `PATCH /cms/v3/hubdb/tables/{tableIdOrName}/rows/{rowId}/draft` → **404**  _{"status":"error","message":"The HubDbTableRow 0 does not exist.","correlationId":"019db14a-ef9d-748_
- `PUT /cms/v3/hubdb/tables/{tableIdOrName}/rows/{rowId}/draft` → **404**  _{"status":"error","message":"Row with id: 0 is not present in table 2079915245 in portal: 147975758"_
- `POST /cms/v3/hubdb/tables/{tableIdOrName}/rows/{rowId}/draft/clone` → **404**  _{"status":"error","message":"Row with id: 0 is not present in table 2079915245 in portal: 147975758"_
- `POST /cms/v3/pages/landing-pages/ab-test/create/variation` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 N_
- `POST /cms/v3/pages/landing-pages/multi-language/attach/to/lang-group` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 N_
- `POST /cms/v3/pages/landing-pages/multi-language/detach/from/lang-group` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 N_
- `POST /cms/v3/pages/landing-pages/multi-language/create/language/variation` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 N_
- `PUT /cms/v3/pages/landing-pages/multi-language/set/new/lang/primary` → **404**  __
- `POST /cms/v3/pages/landing-pages/multi-language/update/languages` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 N_
- `POST /cms/v3/pages/site-pages/ab-test/create/variation` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 N_
- `POST /cms/v3/pages/site-pages/multi-language/attach/to/lang-group` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 N_
- `POST /cms/v3/pages/site-pages/multi-language/detach/from/lang-group` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 N_
- `POST /cms/v3/pages/site-pages/multi-language/create/language/variation` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 N_
- `PUT /cms/v3/pages/site-pages/multi-language/set/new/lang/primary` → **404**  __
- `POST /cms/v3/pages/site-pages/multi-language/update/languages` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 N_
- `DELETE /cms/v3/source-code/{environment}/content/{path}` → **404**  _{"status":"error","message":"resource not found","correlationId":"019db14a-fd54-7bc7-83bf-e1eb8792c8_

