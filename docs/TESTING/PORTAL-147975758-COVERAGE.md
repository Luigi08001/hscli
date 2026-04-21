# Portal Coverage Probe — 147975758 (EU1, free tier)

Generated: 2026-04-21T17:03:02.621Z  •  hubcli @ 21e72fd  •  profile: `default`

Probed 438 read-only endpoints of 1180 total HubSpot API endpoints (only GET + safe POST /search).

## Summary

| Category | Count | % |
|---|---:|---:|
| **PASS** | 153 | 34.9% |
| **AUTH** | 27 | 6.2% |
| **404** | 153 | 34.9% |
| **METHOD** | 1 | 0.2% |
| **400** | 24 | 5.5% |
| **429** | 1 | 0.2% |
| **5XX** | 13 | 3.0% |
| **SKIP-PARAM** | 66 | 15.1% |

## Legend

- **PASS** — 2xx, endpoint fully accessible on the portal
- **TIER** — 403 from a paid/enterprise feature; token is OK, portal plan isn't
- **AUTH** — 401/403 from missing scope on the Private App token
- **404** — endpoint exists but probe used a placeholder ID (substitution used `0` or similar)
- **METHOD** — 405, scrape metadata listed wrong verb
- **400** — bad request, typically missing required query parameter
- **429** — rate limit hit; retry count is in the detailed section
- **5XX** — HubSpot server error
- **SKIP-PARAM** — path has unresolved `{param}` (nested list discovery needed)
- **ERROR** — network/timeout

## Per-module breakdown

| Module | Probed | PASS | TIER | AUTH | 404 | METHOD | 400 | 429 | 5XX | SKIP-PARAM | ERROR |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| cms | 66 | 15 |  | 6 | 11 |  | 5 |  | 13 | 16 |  |
| crm_core | 135 | 69 |  | 5 | 42 |  | 3 | 1 |  | 15 |  |
| general | 128 | 34 |  | 5 | 75 | 1 | 7 |  |  | 6 |  |
| marketing | 43 | 10 |  | 1 | 6 |  | 6 |  |  | 20 |  |
| operations | 10 | 2 |  | 7 |  |  | 1 |  |  |  |  |
| sales | 12 | 5 |  |  | 1 |  | 2 |  |  | 4 |  |
| service | 23 | 8 |  | 2 | 10 |  |  |  |  | 3 |  |
| settings | 21 | 10 |  | 1 | 8 |  |  |  |  | 2 |  |

## Endpoints by category (non-PASS, up to 30 each)

### AUTH (27 endpoints)

- `GET /media-bridge/v1/{appId}/properties/{objectType}` → **403**  _{"status":"error","message":"This API can't be called using an OAuth access token. A valid developer API key must be provided in the `hapike_
- `GET /media-bridge/v1/{appId}/properties/{objectType}/groups/{groupName}` → **403**  _{"status":"error","message":"This API can't be called using an OAuth access token. A valid developer API key must be provided in the `hapike_
- `GET /media-bridge/v1/{appId}/properties/{objectType}/{propertyName}` → **403**  _{"status":"error","message":"This API can't be called using an OAuth access token. A valid developer API key must be provided in the `hapike_
- `GET /media-bridge/v1/{appId}/properties/{objectType}/groups` → **403**  _{"status":"error","message":"This API can't be called using an OAuth access token. A valid developer API key must be provided in the `hapike_
- `GET /media-bridge/v1/{appId}/schemas` → **403**  _{"status":"error","message":"This API can't be called using an OAuth access token. A valid developer API key must be provided in the `hapike_
- `GET /media-bridge/v1/{appId}/schemas/{objectType}` → **403**  _{"status":"error","message":"This API can't be called using an OAuth access token. A valid developer API key must be provided in the `hapike_
- `GET /crm/v3/exports/export/async/tasks/{taskId}/status` → **403**  _{"status":"error","message":"Permission to get export file cannot be granted for exportId 475549724882 and portalId 147975758","correlationI_
- `GET /crm/v3/extensions/calling/{appId}/settings` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you can find more details _
- `GET /crm/v3/extensions/calling/{appId}/settings/recording` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you can find more details _
- `GET /crm/v3/extensions/videoconferencing/settings/{appId}` → **403**  _{"status":"error","message":"The scope needed for this API call isn't available for public use. If you have questions, contact support or po_
- `GET /crm/v3/extensions/cards/dev/{appId}` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you can find more details _
- `GET /email/public/v1/smtpapi/tokens` → **403**  _{"status":"error","message":"This app hasn't been granted all required scopes to make this call. Read more about required scopes here: https_
- `GET /owners/v2/owners` → **401**  _{"status":"error","message":"Any of the listed authentication credentials are missing","correlationId":"019db0fe-af0b-77e8-80c2-454e99650402_
- `GET /webhooks/v3/{appId}/settings` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you can find more details _
- `GET /webhooks/v3/{appId}/subscriptions` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you can find more details _
- `GET /webhooks/v3/{appId}/subscriptions/{subscriptionId}` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you can find more details _
- `GET /marketing/v3/marketing-events/{appId}/settings` → **403**  _{"status":"error","message":"This API can't be called using an OAuth access token. A valid developer API key must be provided in the `hapike_
- `GET /automation/v4/actions/{appId}/{definitionId}` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you can find more details _
- `GET /automation/v4/actions/{appId}/{definitionId}/functions` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you can find more details _
- `GET /automation/v4/actions/{appId}` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you can find more details _
- `GET /automation/v4/actions/{appId}/{definitionId}/functions/{functionType}` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you can find more details _
- `GET /automation/v4/actions/{appId}/{definitionId}/functions/{functionType}/{functionId}` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you can find more details _
- `GET /automation/v4/actions/{appId}/{definitionId}/revisions/{revisionId}` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you can find more details _
- `GET /automation/v4/actions/{appId}/{definitionId}/revisions` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you can find more details _
- `GET /conversations/v3/custom-channels/` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you can find more details _
- `GET /conversations/v3/custom-channels/{channelId}` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you can find more details _
- `GET /business-units/v3/business-units/user/{userId}` → **403**  _{"status":"error","message":"This app hasn't been granted all required scopes to make this call. Read more about required scopes here: https_

### 404 (153 endpoints)

- `GET /cms/v3/blogs/posts/{objectId}/revisions/{revisionId}` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _
- `GET /cms/v3/pages/landing-pages/folders/{objectId}/revisions/{revisionId}` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _
- `GET /cms/v3/pages/landing-pages/{objectId}/revisions/{revisionId}` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _
- `GET /cms/v3/pages/site-pages/{objectId}/revisions/{revisionId}` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _
- `GET /cms/v3/source-code/{environment}/metadata/{path}` → **404**  _{"status":"error","message":"resource not found","correlationId":"019db0fe-7069-7247-b1c1-4ec6fabc18b4"}_
- `GET /cms/v3/source-code/{environment}/content/{path}` → **404**  _{"status":"error","message":"resource not found","correlationId":"019db0fe-70ad-7b6d-ba0f-38b24ddc901a"}_
- `GET /files/v3/files/import/from/url/async/tasks/{taskId}/status` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _
- `GET /files/v3/files/stat/{path}` → **404**  _{"status":"error","message":"No file or folder exists at path","correlationId":"019db0fe-7159-794e-ba35-5287ff02e779"}_
- `GET /files/v3/files/{fileId}/signed/url` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _
- `GET /media-bridge/v1/{appId}/settings/event/visibility` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _
- `GET /media-bridge/v1/{appId}/settings/oembed/domains` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _
- `GET /crm/object-schemas/v3/schemas` → **404**  _<!DOCTYPE html> <html lang=en><meta charset=utf-8><title>Error</title><style>*,*::before,*::after{box-sizing:border-box}html,body{margin:0px_
- `GET /crm/object-schemas/v3/schemas/{objectType}` → **404**  _<!DOCTYPE html> <html lang=en><meta charset=utf-8><title>Error</title><style>*,*::before,*::after{box-sizing:border-box}html,body{margin:0px_
- `GET /crm/objects/2025-09/{objectType}/{objectId}` → **404**  _{"status":"error","message":"Object not found. objectId is usually positive.","correlationId":"019db0fe-7688-753a-bad6-74699798afed","contex_
- `GET /crm/objects/2025-09/{objectType}/{objectId}/associations/{toObjectType}` → **404**  _{"status":"error","message":"Object not found. objectId is usually positive.","correlationId":"019db0fe-7765-78c1-9d8f-8040703abcba","contex_
- `GET /crm/objects/v3/{objectType}/{objectId}` → **404**  _{"status":"error","message":"Object not found. objectId is usually positive.","correlationId":"019db0fe-7891-7687-bfae-d4de54cdaac5","contex_
- `GET /crm/properties/2025-09/{objectType}/groups` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _
- `GET /crm/properties/2025-09/{objectType}` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _
- `GET /crm/properties/2025-09/{objectType}/{propertyName}` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _
- `GET /crm/properties/2025-09/{objectType}/groups/{groupName}` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _
- `GET /crm/v3/extensions/calling/{appId}/settings/channel/connection` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _
- `GET /crm/v3/extensions/cards/dev/sample/response` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _
- `GET /crm/v3/extensions/cards/dev/{appId}/{cardId}` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _
- `GET /crm/v3/limits/calculated/properties` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _
- `GET /crm/v3/limits/custom/object/types` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _
- `GET /crm/v3/limits/custom/properties` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _
- `GET /crm/v3/lists/{listId}/memberships` → **404**  _{"status":"error","message":"List does not exist with ID 0.","correlationId":"019db0fe-80b3-7ef8-880d-92692bebafac","context":{"listId":["0"_
- `GET /crm/v3/lists/{listId}` → **404**  _{"status":"error","message":"List does not exist with ID 0.","correlationId":"019db0fe-80b8-77a0-bb76-676917282ec9","context":{"listId":["0"_
- `GET /crm/v3/lists/{listId}/memberships/join/order` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _
- `GET /crm/v3/lists/{listId}/schedule/conversion` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _

_(+123 more)_

### METHOD (1 endpoints)

- `GET /reports/v2/events/batch` → **405**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 405 Method Not Allowed</title> </head> <body>_

### 400 (24 endpoints)

- `GET /cms/v3/site-search/search` → **400**  _{"status":"error","message":"Invalid input JSON on line -1, column -1: Cannot build PublicSearchRequest, some of required attributes are not_
- `GET /cms/v3/source-code/extract/async/tasks/{taskId}/status` → **400**  _{"status":"error","message":"Unable to parse value for path parameter: taskId","correlationId":"019db0fe-7005-764b-86b5-7baea5166ebb"}_
- `GET /files/v3/files/{fileId}` → **400**  _{"status":"error","message":"id must be > 0","correlationId":"019db0fe-71a1-7373-b522-86ba87d92178","context":{"id":["0"]},"category":"VALID_
- `GET /files/v3/folders/{folderId}` → **400**  _{"status":"error","message":"id must be > 0","correlationId":"019db0fe-727f-7a33-bd13-3bd131261230","context":{"id":["0"]},"category":"VALID_
- `GET /files/v3/folders/update/async/tasks/{taskId}/status` → **400**  _{"status":"error","message":"Provided ID could not be decoded.","correlationId":"019db0fe-727c-7f59-9d0c-70f4ad7d315c","context":{"id":["475_
- `GET /crm/v3/imports/{importId}` → **400**  _{"status":"error","message":"importId must be positive.","correlationId":"019db0fe-7ccc-790d-8052-e267f73fa52a","context":{"importId":["0"]}_
- `GET /crm/v3/imports/{importId}/errors` → **400**  _{"status":"error","message":"importId must be positive.","correlationId":"019db0fe-7d90-7a20-8896-bca4c7a8cfab","context":{"importId":["0"]}_
- `GET /crm/v3/lists/idmapping` → **400**  _{"status":"error","message":"Id {{ id }} can't be converted to java.lang.Integer","correlationId":"019db0fe-7ff1-7779-b143-54c1b1ba9ae7","co_
- `GET /contacts/v1/lists/listid/contacts/recent` → **400**  _{"status":"error","message":"Could not parse number from listId: listid","correlationId":"019db0fe-a3b1-7130-97e6-5c702de615b0","category":"_
- `GET /contacts/v1/lists/listid/contacts/all` → **400**  _{"status":"error","message":"Could not parse number from listId: listid","correlationId":"019db0fe-a3b9-725c-8c04-45c7e8c33d9d","category":"_
- `GET /email/public/v1/events/created/{id}` → **400**  _{"status":"error","message":"Unable to parse value for path parameter: created","correlationId":"019db0fe-a9b9-7192-848e-54d9f3673828"}_
- `GET /properties/v2/objecttype/groups` → **400**  _{"status":"error","message":"Unable to infer object type from: objecttype","correlationId":"019db0fe-b2cf-707c-b20e-f8c7a00d4e89"}_
- `GET /properties/v2/objecttype/groups/named/groupname` → **400**  _{"status":"error","message":"Unable to infer object type from: objecttype","correlationId":"019db0fe-b2dc-7b8e-aac0-b4bcdd56a940"}_
- `GET /properties/v2/objecttype/properties` → **400**  _{"status":"error","message":"Unable to infer object type from: objecttype","correlationId":"019db0fe-b2ed-70b4-840f-b7a939e87f9d"}_
- `GET /properties/v2/objecttype/properties/named/name` → **400**  _{"status":"error","message":"Unable to infer object type from: objecttype","correlationId":"019db0fe-b2fd-7ecd-9f8b-2bbc85d05c03"}_
- `GET /events/v3/events/` → **400**  _{"status":"error","message":"Must specify an eventType or objectType","correlationId":"019db0fe-b744-72ae-8ee7-e2b085ffd4da","category":"VAL_
- `GET /marketing/v3/emails/statistics/histogram` → **400**  _{"correlationId":"019db0fe-b882-797c-8112-53369f7d14ad","message":"Unable to parse value for query parameter: startTimestamp","status":"erro_
- `GET /marketing/v3/emails/statistics/list` → **400**  _{"correlationId":"019db0fe-b8eb-7074-8c81-4993608053d9","message":"Unable to parse value for query parameter: startTimestamp","status":"erro_
- `GET /marketing/v3/marketing-events/events/search` → **400**  _{"status":"error","message":"validation error","correlationId":"019db0fe-bbfc-7094-a5bb-dddcf562ae19","errors":["query param q may not be nu_
- `GET /marketing/v3/marketing-events/events/{externalEventId}` → **400**  _{"status":"error","message":"validation error","correlationId":"019db0fe-bc5b-7eb5-9cc2-f4445162924c","errors":["query param externalAccount_
- `GET /marketing/v3/marketing-events/{objectId}` → **400**  _{"status":"error","message":"Invalid value: '0' specified in objectId parameter. Should be a positive Long.","correlationId":"019db0fe-bced-_
- `GET /automation/v4/flows/email-campaigns` → **400**  _{"status":"error","message":"One or more flowId parameters are required for email campaign fetch.","correlationId":"019db0fe-c21f-78fa-ac5e-_
- `GET /automation/v4/sequences/` → **400**  _{"status":"error","message":"validation error","correlationId":"019db0fe-c2de-745f-aec1-dfc65d54db02","errors":["query param userId may not _
- `GET /automation/v4/sequences/{sequenceId}` → **400**  _{"status":"error","message":"validation error","correlationId":"019db0fe-c302-7a2e-8502-8ce6516102a7","errors":["query param userId may not _

### 429 (1 endpoints)

- `POST /crm/v3/objects/orders/search` → **429**  _{"status":"error","message":"You have reached your secondly limit.","errorType":"RATE_LIMIT","correlationId":"019db0fe-8af2-7952-8060-c696de_

### 5XX (13 endpoints)

- `GET /cms/v3/blogs/authors/{objectId}` → **500**  _{"correlationId":"019db0fe-6897-7d51-8679-49f68a662a27","message":"internal error","status":"error"}_
- `GET /cms/v3/blogs/posts/{objectId}/draft` → **500**  _{"correlationId":"019db0fe-696b-76f5-8b88-7fe072f0abf3","message":"internal error","status":"error"}_
- `GET /cms/v3/blogs/posts/{objectId}` → **500**  _{"correlationId":"019db0fe-698e-7ed8-ab50-d93dc98d5768","message":"internal error","status":"error"}_
- `GET /cms/v3/blogs/posts/{objectId}/revisions` → **500**  _{"correlationId":"019db0fe-698b-7140-8d2f-35fe7f7a824e","message":"internal error","status":"error"}_
- `GET /cms/v3/blogs/tags/{objectId}` → **500**  _{"correlationId":"019db0fe-6ab1-7ddd-aef4-7da6c9d7ebfa","message":"internal error","status":"error"}_
- `GET /cms/v3/pages/landing-pages/folders/{objectId}/revisions` → **500**  _{"correlationId":"019db0fe-6c82-72b3-a8b0-59d65c6d2a31","message":"internal error","status":"error"}_
- `GET /cms/v3/pages/landing-pages/folders/{objectId}` → **500**  _{"correlationId":"019db0fe-6c93-74f5-9fff-20cd98fdfe35","message":"internal error","status":"error"}_
- `GET /cms/v3/pages/landing-pages/{objectId}/draft` → **500**  _{"correlationId":"019db0fe-6d70-72b5-945d-bc0c0171f950","message":"internal error","status":"error"}_
- `GET /cms/v3/pages/landing-pages/{objectId}` → **500**  _{"correlationId":"019db0fe-6d82-7771-9c90-ccfaf18ecbed","message":"internal error","status":"error"}_
- `GET /cms/v3/pages/landing-pages/{objectId}/revisions` → **500**  _{"correlationId":"019db0fe-6dae-776b-b64f-beb1cdbe3d6a","message":"internal error","status":"error"}_
- `GET /cms/v3/pages/site-pages/{objectId}` → **500**  _{"correlationId":"019db0fe-6e6a-7a1c-8cf3-ba8a64c47757","message":"internal error","status":"error"}_
- `GET /cms/v3/pages/site-pages/{objectId}/draft` → **500**  _{"correlationId":"019db0fe-6ecc-721b-b7ef-549821ffcab5","message":"internal error","status":"error"}_
- `GET /cms/v3/pages/site-pages/{objectId}/revisions` → **500**  _{"correlationId":"019db0fe-6f53-7ae8-9910-6bda689fb6f5","message":"internal error","status":"error"}_

### SKIP-PARAM (66 endpoints)

- `GET /cms/v3/blog-settings/settings/{blogId}`  _unresolved: {blogId}_
- `GET /cms/v3/blog-settings/settings/{blogId}/revisions`  _unresolved: {blogId}_
- `GET /cms/v3/blog-settings/settings/{blogId}/revisions/{revisionId}`  _unresolved: {blogId}_
- `GET /cms/v3/hubdb/tables/{tableIdOrName}`  _unresolved: {tableIdOrName}_
- `GET /cms/v3/hubdb/tables/{tableIdOrName}/draft`  _unresolved: {tableIdOrName}_
- `GET /cms/v3/hubdb/tables/{tableIdOrName}/draft/export`  _unresolved: {tableIdOrName}_
- `GET /cms/v3/hubdb/tables/{tableIdOrName}/export`  _unresolved: {tableIdOrName}_
- `GET /cms/v3/hubdb/tables/{tableIdOrName}/rows`  _unresolved: {tableIdOrName}_
- `GET /cms/v3/hubdb/tables/{tableIdOrName}/rows/draft`  _unresolved: {tableIdOrName}_
- `GET /cms/v3/hubdb/tables/{tableIdOrName}/rows/{rowId}`  _unresolved: {tableIdOrName},{rowId}_
- `GET /cms/v3/hubdb/tables/{tableIdOrName}/rows/{rowId}/draft`  _unresolved: {tableIdOrName},{rowId}_
- `GET /cms/v3/site-search/indexed/data/{contentId}`  _unresolved: {contentId}_
- `GET /cms/v3/url-redirects/{urlRedirectId}`  _unresolved: {urlRedirectId}_
- `GET /files/v3/folders/{folderPath}`  _unresolved: {folderPath}_
- `GET /media-bridge/v1/{appId}/settings/object/definitions/{mediaType}`  _unresolved: {mediaType}_
- `GET /media-bridge/v1/{appId}/settings/oembed/domains/{oEmbedDomainId}`  _unresolved: {oEmbedDomainId}_
- `GET /crm/objects/v3/projects/{projectId}`  _unresolved: {projectId}_
- `GET /crm/v3/limits/associations/records/{fromObjectTypeId}/to`  _unresolved: {fromObjectTypeId}_
- `GET /crm/v3/limits/associations/records/{fromObjectTypeId}/{toObjectTypeId}`  _unresolved: {fromObjectTypeId},{toObjectTypeId}_
- `GET /crm/v3/lists/object/type/{id}/{objectTypeId}/name/{listName}`  _unresolved: {listName}_
- `GET /crm/v3/lists/records/{objectTypeId}/{recordId}/memberships`  _unresolved: {recordId}_
- `GET /crm/v3/objects/{0}/{410}`  _unresolved: {0},{410}_
- `POST /crm/v3/objects/{0}/{410}/search`  _unresolved: {0},{410}_
- `GET /crm/v3/objects/{0}/{410}/{courseId}`  _unresolved: {0},{410},{courseId}_
- `GET /crm/v3/objects/{0}/{420}`  _unresolved: {0},{420}_
- `POST /crm/v3/objects/{0}/{420}/search`  _unresolved: {0},{420}_
- `GET /crm/v3/objects/{0}/{420}/{listingId}`  _unresolved: {0},{420},{listingId}_
- `GET /crm/v3/property/validations/{objectTypeId}/{propertyName}/rule/type/{ruleType}`  _unresolved: {ruleType}_
- `GET /integrators/timeline/v3/events/{eventTemplateId}/{eventId}`  _unresolved: {eventTemplateId}_
- `GET /integrators/timeline/v3/events/{eventTemplateId}/{eventId}/detail`  _unresolved: {eventTemplateId}_

_(+36 more)_


## PASS endpoints (first 60)

- `GET /cms/v3/blogs/authors`
- `GET /cms/v3/audit-logs/`
- `GET /cms/v3/blog-settings/settings`
- `GET /cms/v3/blogs/posts`
- `GET /cms/v3/domains/`
- `GET /cms/v3/blogs/tags`
- `GET /cms/v3/domains/{domainId}`
- `GET /cms/v3/hubdb/tables/draft`
- `GET /cms/v3/hubdb/tables`
- `GET /cms/v3/pages/landing-pages`
- `GET /cms/v3/pages/landing-pages/folders`
- `GET /cms/v3/pages/site-pages`
- `GET /cms/v3/url-redirects/`
- `GET /files/v3/files/search`
- `GET /files/v3/folders/search`
- `GET /crm/associations/v4/definitions/configurations/{fromObjectType}/{toObjectType}`
- `GET /crm/associations/v4/definitions/configurations/all`
- `GET /crm/associations/v4/{fromObjectType}/{toObjectType}/labels`
- `GET /crm/objects/2025-09/{objectType}`
- `POST /crm/objects/2025-09/{objectType}/search`
- `GET /crm/objects/v3/projects`
- `POST /crm/objects/v3/projects/search`
- `GET /crm/objects/v3/{objectType}`
- `POST /crm/objects/v3/{objectType}/search`
- `GET /crm/v3/associations/{fromObjectType}/{toObjectType}/types`
- `GET /crm/v3/imports/`
- `GET /crm/v3/limits/associations/labels`
- `GET /crm/v3/limits/associations/records/from`
- `GET /crm/v3/limits/pipelines`
- `GET /crm/v3/limits/records`
- `GET /crm/v3/lists/`
- `GET /crm/v3/lists/folders`
- `POST /crm/v3/lists/search`
- `GET /crm/v3/objects/calls`
- `POST /crm/v3/objects/calls/search`
- `GET /crm/v3/objects/carts`
- `POST /crm/v3/objects/carts/search`
- `GET /crm/v3/objects/calls/{callId}`
- `GET /crm/v3/objects/communications`
- `POST /crm/v3/objects/communications/search`
- `GET /crm/v3/objects/companies`
- `POST /crm/v3/objects/companies/search`
- `GET /crm/v3/objects/contacts`
- `GET /crm/v3/objects/companies/{companyId}`
- `GET /crm/v3/objects/contacts/{contactId}`
- `POST /crm/v3/objects/contacts/search`
- `POST /crm/v3/objects/discounts/search`
- `GET /crm/v3/objects/discounts`
- `GET /crm/v3/objects/emails`
- `POST /crm/v3/objects/emails/search`
- `GET /crm/v3/objects/fees`
- `POST /crm/v3/objects/fees/search`
- `GET /crm/v3/objects/invoices`
- `POST /crm/v3/objects/invoices/search`
- `GET /crm/v3/objects/meetings`
- `POST /crm/v3/objects/meetings/search`
- `GET /crm/v3/objects/meetings/{meetingId}`
- `GET /crm/v3/objects/notes`
- `POST /crm/v3/objects/notes/search`
- `GET /crm/v3/objects/notes/{noteId}`

_(+93 more)_

