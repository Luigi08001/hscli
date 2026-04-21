# Portal Coverage Probe — 147975758 (EU1, free tier)

Generated: 2026-04-21T18:45:30.921Z  •  hubcli @ 8f232fd  •  profile: `default`

Probed 438 read-only endpoints of 1180 total HubSpot API endpoints (only GET + safe POST /search).

## Summary

| Category | Count | % |
|---|---:|---:|
| **PASS** | 162 | 37.0% |
| **AUTH** | 27 | 6.2% |
| **404** | 151 | 34.5% |
| **METHOD** | 1 | 0.2% |
| **400** | 26 | 5.9% |
| **5XX** | 13 | 3.0% |
| **SKIP-PARAM** | 58 | 13.2% |

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
| cms | 66 | 21 |  | 6 | 11 |  | 5 |  | 13 | 10 |  |
| crm_core | 135 | 72 |  | 5 | 40 |  | 3 |  |  | 15 |  |
| general | 128 | 34 |  | 5 | 75 | 1 | 9 |  |  | 4 |  |
| marketing | 43 | 10 |  | 1 | 6 |  | 6 |  |  | 20 |  |
| operations | 10 | 2 |  | 7 |  |  | 1 |  |  |  |  |
| sales | 12 | 5 |  |  | 1 |  | 2 |  |  | 4 |  |
| service | 23 | 8 |  | 2 | 10 |  |  |  |  | 3 |  |
| settings | 21 | 10 |  | 1 | 8 |  |  |  |  | 2 |  |

## Endpoints by category (non-PASS, up to 30 each)

### AUTH (27 endpoints)

- `GET /media-bridge/v1/{appId}/properties/{objectType}` → **403**  _{"status":"error","message":"This API can't be called using an OAuth access token. A valid developer API key must be provided in the `hapike_
- `GET /media-bridge/v1/{appId}/properties/{objectType}/groups` → **403**  _{"status":"error","message":"This API can't be called using an OAuth access token. A valid developer API key must be provided in the `hapike_
- `GET /media-bridge/v1/{appId}/properties/{objectType}/groups/{groupName}` → **403**  _{"status":"error","message":"This API can't be called using an OAuth access token. A valid developer API key must be provided in the `hapike_
- `GET /media-bridge/v1/{appId}/properties/{objectType}/{propertyName}` → **403**  _{"status":"error","message":"This API can't be called using an OAuth access token. A valid developer API key must be provided in the `hapike_
- `GET /media-bridge/v1/{appId}/schemas/{objectType}` → **403**  _{"status":"error","message":"This API can't be called using an OAuth access token. A valid developer API key must be provided in the `hapike_
- `GET /media-bridge/v1/{appId}/schemas` → **403**  _{"status":"error","message":"This API can't be called using an OAuth access token. A valid developer API key must be provided in the `hapike_
- `GET /crm/v3/exports/export/async/tasks/{taskId}/status` → **403**  _{"status":"error","message":"Permission to get export file cannot be granted for exportId 478359352567 and portalId 147975758","correlationI_
- `GET /crm/v3/extensions/calling/{appId}/settings` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you can find more details _
- `GET /crm/v3/extensions/calling/{appId}/settings/recording` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you can find more details _
- `GET /crm/v3/extensions/videoconferencing/settings/{appId}` → **403**  _{"status":"error","message":"The scope needed for this API call isn't available for public use. If you have questions, contact support or po_
- `GET /crm/v3/extensions/cards/dev/{appId}` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you can find more details _
- `GET /email/public/v1/smtpapi/tokens` → **403**  _{"status":"error","message":"This app hasn't been granted all required scopes to make this call. Read more about required scopes here: https_
- `GET /owners/v2/owners` → **401**  _{"status":"error","message":"Any of the listed authentication credentials are missing","correlationId":"019db15c-8200-796b-947f-46cffa46e781_
- `GET /webhooks/v3/{appId}/settings` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you can find more details _
- `GET /webhooks/v3/{appId}/subscriptions/{subscriptionId}` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you can find more details _
- `GET /webhooks/v3/{appId}/subscriptions` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you can find more details _
- `GET /marketing/v3/marketing-events/{appId}/settings` → **403**  _{"status":"error","message":"This API can't be called using an OAuth access token. A valid developer API key must be provided in the `hapike_
- `GET /automation/v4/actions/{appId}` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you can find more details _
- `GET /automation/v4/actions/{appId}/{definitionId}` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you can find more details _
- `GET /automation/v4/actions/{appId}/{definitionId}/functions` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you can find more details _
- `GET /automation/v4/actions/{appId}/{definitionId}/functions/{functionType}` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you can find more details _
- `GET /automation/v4/actions/{appId}/{definitionId}/revisions` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you can find more details _
- `GET /automation/v4/actions/{appId}/{definitionId}/functions/{functionType}/{functionId}` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you can find more details _
- `GET /automation/v4/actions/{appId}/{definitionId}/revisions/{revisionId}` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you can find more details _
- `GET /conversations/v3/custom-channels/` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you can find more details _
- `GET /conversations/v3/custom-channels/{channelId}` → **401**  _{"status":"error","message":"Authentication credentials not found. This API supports OAuth 2.0 authentication and you can find more details _
- `GET /business-units/v3/business-units/user/{userId}` → **403**  _{"status":"error","message":"This app hasn't been granted all required scopes to make this call. Read more about required scopes here: https_

### 404 (151 endpoints)

- `GET /cms/v3/blogs/posts/{objectId}/revisions/{revisionId}` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _
- `GET /cms/v3/pages/landing-pages/folders/{objectId}/revisions/{revisionId}` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _
- `GET /cms/v3/pages/landing-pages/{objectId}/revisions/{revisionId}` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _
- `GET /cms/v3/pages/site-pages/{objectId}/revisions/{revisionId}` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _
- `GET /cms/v3/source-code/{environment}/content/{path}` → **404**  _{"status":"error","message":"resource not found","correlationId":"019db15c-43a0-72cd-aefc-ed26c712e1c7"}_
- `GET /cms/v3/source-code/{environment}/metadata/{path}` → **404**  _{"status":"error","message":"resource not found","correlationId":"019db15c-43ca-76ad-8f95-f09bddf041ee"}_
- `GET /files/v3/files/import/from/url/async/tasks/{taskId}/status` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _
- `GET /files/v3/files/stat/{path}` → **404**  _{"status":"error","message":"No file or folder exists at path","correlationId":"019db15c-44c8-7db8-a4a3-31aab4b6dd50"}_
- `GET /files/v3/files/{fileId}/signed/url` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _
- `GET /media-bridge/v1/{appId}/settings/event/visibility` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _
- `GET /media-bridge/v1/{appId}/settings/oembed/domains` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _
- `GET /crm/object-schemas/v3/schemas` → **404**  _<!DOCTYPE html> <html lang=en><meta charset=utf-8><title>Error</title><style>*,*::before,*::after{box-sizing:border-box}html,body{margin:0px_
- `GET /crm/object-schemas/v3/schemas/{objectType}` → **404**  _<!DOCTYPE html> <html lang=en><meta charset=utf-8><title>Error</title><style>*,*::before,*::after{box-sizing:border-box}html,body{margin:0px_
- `GET /crm/objects/2025-09/{objectType}/{objectId}/associations/{toObjectType}` → **404**  _{"status":"error","message":"Object not found. objectId is usually positive.","correlationId":"019db15c-4ab5-71bc-8688-fc83bb476ef8","contex_
- `GET /crm/objects/2025-09/{objectType}/{objectId}` → **404**  _{"status":"error","message":"Object not found. objectId is usually positive.","correlationId":"019db15c-4a8a-7c1f-832d-af6e4552e004","contex_
- `GET /crm/objects/v3/{objectType}/{objectId}` → **404**  _{"status":"error","message":"Object not found. objectId is usually positive.","correlationId":"019db15c-4bd3-7be5-b931-8d0cc79baee3","contex_
- `GET /crm/properties/2025-09/{objectType}` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _
- `GET /crm/properties/2025-09/{objectType}/groups/{groupName}` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _
- `GET /crm/properties/2025-09/{objectType}/{propertyName}` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _
- `GET /crm/properties/2025-09/{objectType}/groups` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _
- `GET /crm/v3/extensions/calling/{appId}/settings/channel/connection` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _
- `GET /crm/v3/extensions/cards/dev/sample/response` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _
- `GET /crm/v3/extensions/cards/dev/{appId}/{cardId}` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _
- `GET /crm/v3/limits/custom/object/types` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _
- `GET /crm/v3/limits/calculated/properties` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _
- `GET /crm/v3/limits/custom/properties` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _
- `GET /crm/v3/lists/{listId}/memberships/join/order` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _
- `GET /crm/v3/lists/{listId}/schedule/conversion` → **404**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 404 Not Found</title> </head> <body><h2>HTTP _
- `GET /crm/v3/object/library/enablement` → **404**  _<!DOCTYPE html> <html lang=en><meta charset=utf-8><title>Error</title><style>*,*::before,*::after{box-sizing:border-box}html,body{margin:0px_
- `GET /crm/v3/object/library/enablement/{objectTypeId}` → **404**  _<!DOCTYPE html> <html lang=en><meta charset=utf-8><title>Error</title><style>*,*::before,*::after{box-sizing:border-box}html,body{margin:0px_

_(+121 more)_

### METHOD (1 endpoints)

- `GET /reports/v2/events/batch` → **405**  _<html> <head> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/> <title>Error 405 Method Not Allowed</title> </head> <body>_

### 400 (26 endpoints)

- `GET /cms/v3/site-search/search` → **400**  _{"status":"error","message":"Invalid input JSON on line -1, column -1: Cannot build PublicSearchRequest, some of required attributes are not_
- `GET /cms/v3/source-code/extract/async/tasks/{taskId}/status` → **400**  _{"status":"error","message":"Unable to parse value for path parameter: taskId","correlationId":"019db15c-43a5-7f3b-bbf6-a26e76a81c78"}_
- `GET /files/v3/files/{fileId}` → **400**  _{"status":"error","message":"id must be > 0","correlationId":"019db15c-4595-7fd1-987e-db030ab58e87","context":{"id":["0"]},"category":"VALID_
- `GET /files/v3/folders/update/async/tasks/{taskId}/status` → **400**  _{"status":"error","message":"Provided ID could not be decoded.","correlationId":"019db15c-45d0-7ac4-bdde-1f8103fdb545","context":{"id":["478_
- `GET /files/v3/folders/{folderId}` → **400**  _{"status":"error","message":"id must be > 0","correlationId":"019db15c-4672-7834-97b9-3efa586b4fd3","context":{"id":["0"]},"category":"VALID_
- `GET /crm/v3/imports/{importId}` → **400**  _{"status":"error","message":"importId must be positive.","correlationId":"019db15c-50ce-729b-9a25-73cb1b330b08","context":{"importId":["0"]}_
- `GET /crm/v3/imports/{importId}/errors` → **400**  _{"status":"error","message":"importId must be positive.","correlationId":"019db15c-50e8-7468-8c72-685b5fa3df42","context":{"importId":["0"]}_
- `GET /crm/v3/lists/idmapping` → **400**  _{"status":"error","message":"Id {{ id }} can't be converted to java.lang.Integer","correlationId":"019db15c-53e6-7436-b904-5eecdc3f9a5a","co_
- `GET /automation/v3/performance/workflow/{workflowId}` → **400**  _{"status":"error","message":"Unable to parse value for path parameter: workflowId","correlationId":"019db15c-6f75-7808-a6b6-0cfcc3d66d12"}_
- `GET /automation/v3/workflows/{workflowId}` → **400**  _{"status":"error","message":"Unable to parse value for path parameter: workflowId","correlationId":"019db15c-6fd5-7e9f-a4ce-1166797fd394"}_
- `GET /contacts/v1/lists/listid/contacts/recent` → **400**  _{"status":"error","message":"Could not parse number from listId: listid","correlationId":"019db15c-76c3-7eec-97db-c07daa411200","category":"_
- `GET /contacts/v1/lists/listid/contacts/all` → **400**  _{"status":"error","message":"Could not parse number from listId: listid","correlationId":"019db15c-76c0-7dd2-b25b-7ccf4df99eef","category":"_
- `GET /email/public/v1/events/created/{id}` → **400**  _{"status":"error","message":"Unable to parse value for path parameter: created","correlationId":"019db15c-7cef-7a0b-954d-f0143d3ddf0b"}_
- `GET /properties/v2/objecttype/groups` → **400**  _{"status":"error","message":"Unable to infer object type from: objecttype","correlationId":"019db15c-8527-7930-ad1b-9fc4a432c5e9"}_
- `GET /properties/v2/objecttype/groups/named/groupname` → **400**  _{"status":"error","message":"Unable to infer object type from: objecttype","correlationId":"019db15c-8541-76bb-88d5-d1a075a80614"}_
- `GET /properties/v2/objecttype/properties` → **400**  _{"status":"error","message":"Unable to infer object type from: objecttype","correlationId":"019db15c-8601-75ba-9ba1-ea1a2dc5b5bb"}_
- `GET /properties/v2/objecttype/properties/named/name` → **400**  _{"status":"error","message":"Unable to infer object type from: objecttype","correlationId":"019db15c-860c-7599-a8a2-764ce7a841ef"}_
- `GET /events/v3/events/` → **400**  _{"status":"error","message":"Must specify an eventType or objectType","correlationId":"019db15c-8a19-7dc6-9179-8f363c2511f8","category":"VAL_
- `GET /marketing/v3/emails/statistics/list` → **400**  _{"correlationId":"019db15c-8b5e-7d73-a6e1-8f7525f9ffdc","message":"Unable to parse value for query parameter: startTimestamp","status":"erro_
- `GET /marketing/v3/emails/statistics/histogram` → **400**  _{"correlationId":"019db15c-8b66-78c9-855e-6e56776463d4","message":"Unable to parse value for query parameter: startTimestamp","status":"erro_
- `GET /marketing/v3/marketing-events/events/search` → **400**  _{"status":"error","message":"validation error","correlationId":"019db15c-8def-71f7-90b2-e98f4ac669a4","errors":["query param q may not be nu_
- `GET /marketing/v3/marketing-events/events/{externalEventId}` → **400**  _{"status":"error","message":"validation error","correlationId":"019db15c-8e39-782a-aa9a-490f53b70dbc","errors":["query param externalAccount_
- `GET /marketing/v3/marketing-events/{objectId}` → **400**  _{"status":"error","message":"Invalid value: '0' specified in objectId parameter. Should be a positive Long.","correlationId":"019db15c-8ec8-_
- `GET /automation/v4/flows/email-campaigns` → **400**  _{"status":"error","message":"One or more flowId parameters are required for email campaign fetch.","correlationId":"019db15c-9370-7ccc-800f-_
- `GET /automation/v4/sequences/` → **400**  _{"status":"error","message":"validation error","correlationId":"019db15c-94a2-7a85-a213-0e1934e11825","errors":["query param userId may not _
- `GET /automation/v4/sequences/{sequenceId}` → **400**  _{"status":"error","message":"validation error","correlationId":"019db15c-955c-71dd-a0a9-5ac106ff0a68","errors":["query param userId may not _

### 5XX (13 endpoints)

- `GET /cms/v3/blogs/authors/{objectId}` → **500**  _{"correlationId":"019db15c-3ad2-72ce-8894-a3ae278d2480","message":"internal error","status":"error"}_
- `GET /cms/v3/blogs/posts/{objectId}` → **500**  _{"correlationId":"019db15c-3bb5-7c1c-bee8-1722df8c2ddc","message":"internal error","status":"error"}_
- `GET /cms/v3/blogs/posts/{objectId}/draft` → **500**  _{"correlationId":"019db15c-3bcc-721b-b406-ca1719e975dd","message":"internal error","status":"error"}_
- `GET /cms/v3/blogs/posts/{objectId}/revisions` → **500**  _{"correlationId":"019db15c-3c1a-7aed-95e4-0c443e5dc6f9","message":"internal error","status":"error"}_
- `GET /cms/v3/blogs/tags/{objectId}` → **500**  _{"correlationId":"019db15c-3cc9-7949-a8bf-65176fb10a4a","message":"internal error","status":"error"}_
- `GET /cms/v3/pages/landing-pages/folders/{objectId}` → **500**  _{"correlationId":"019db15c-4064-746b-9d82-2c5cfe77e151","message":"internal error","status":"error"}_
- `GET /cms/v3/pages/landing-pages/folders/{objectId}/revisions` → **500**  _{"correlationId":"019db15c-4089-7dab-ad12-54e7764aaf13","message":"internal error","status":"error"}_
- `GET /cms/v3/pages/landing-pages/{objectId}` → **500**  _{"correlationId":"019db15c-40b1-7414-a3a9-e29102d004e8","message":"internal error","status":"error"}_
- `GET /cms/v3/pages/landing-pages/{objectId}/draft` → **500**  _{"correlationId":"019db15c-417b-7a6f-ac14-cb26fd335f5c","message":"internal error","status":"error"}_
- `GET /cms/v3/pages/landing-pages/{objectId}/revisions` → **500**  _{"correlationId":"019db15c-4189-7a3e-b7ce-50abecb4891e","message":"internal error","status":"error"}_
- `GET /cms/v3/pages/site-pages/{objectId}` → **500**  _{"correlationId":"019db15c-425d-7978-9463-892f398721cf","message":"internal error","status":"error"}_
- `GET /cms/v3/pages/site-pages/{objectId}/revisions` → **500**  _{"correlationId":"019db15c-4290-774b-8b97-29110016dbcf","message":"internal error","status":"error"}_
- `GET /cms/v3/pages/site-pages/{objectId}/draft` → **500**  _{"correlationId":"019db15c-4293-7776-a062-5f524c5ee60b","message":"internal error","status":"error"}_

### SKIP-PARAM (58 endpoints)

- `GET /cms/v3/blog-settings/settings/{blogId}`  _unresolved: {blogId}_
- `GET /cms/v3/blog-settings/settings/{blogId}/revisions`  _unresolved: {blogId}_
- `GET /cms/v3/blog-settings/settings/{blogId}/revisions/{revisionId}`  _unresolved: {blogId}_
- `GET /cms/v3/hubdb/tables/{tableIdOrName}/rows/{rowId}`  _unresolved: {rowId}_
- `GET /cms/v3/hubdb/tables/{tableIdOrName}/rows/{rowId}/draft`  _unresolved: {rowId}_
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
- `GET /crm/v3/objects/{0}/{410}`  _unresolved: <scrape-artifact>_
- `POST /crm/v3/objects/{0}/{410}/search`  _unresolved: <scrape-artifact>_
- `GET /crm/v3/objects/{0}/{410}/{courseId}`  _unresolved: <scrape-artifact>_
- `GET /crm/v3/objects/{0}/{420}`  _unresolved: <scrape-artifact>_
- `POST /crm/v3/objects/{0}/{420}/search`  _unresolved: <scrape-artifact>_
- `GET /crm/v3/objects/{0}/{420}/{listingId}`  _unresolved: <scrape-artifact>_
- `GET /crm/v3/property/validations/{objectTypeId}/{propertyName}/rule/type/{ruleType}`  _unresolved: {ruleType}_
- `GET /integrators/timeline/v3/events/{eventTemplateId}/{eventId}`  _unresolved: {eventTemplateId}_
- `GET /integrators/timeline/v3/events/{eventTemplateId}/{eventId}/detail`  _unresolved: {eventTemplateId}_
- `GET /integrators/timeline/v3/{appId}/event/templates/{eventTemplateId}`  _unresolved: {eventTemplateId}_
- `GET /contacts/v1/{contactbyUtk}/batch`  _unresolved: {contactbyUtk}_
- `GET /crm/associations/v1/associations/{objectIdHUBSPOTDEFINEDdefinition}/{id}`  _unresolved: {objectIdHUBSPOTDEFINEDdefinition}_
- `GET /oauth/v1/access-tokens/{token}`  _unresolved: {token}_
- `GET /oauth/v1/refresh-tokens/{token}`  _unresolved: {token}_
- `GET /communication/preferences/v3/status/email/{emailAddress}`  _unresolved: {emailAddress}_

_(+28 more)_


## PASS endpoints (first 60)

- `GET /cms/v3/blog-settings/settings`
- `GET /cms/v3/blogs/authors`
- `GET /cms/v3/audit-logs/`
- `GET /cms/v3/blogs/posts`
- `GET /cms/v3/blogs/tags`
- `GET /cms/v3/domains/`
- `GET /cms/v3/domains/{domainId}`
- `GET /cms/v3/hubdb/tables`
- `GET /cms/v3/hubdb/tables/draft`
- `GET /cms/v3/hubdb/tables/{tableIdOrName}`
- `GET /cms/v3/hubdb/tables/{tableIdOrName}/draft`
- `GET /cms/v3/hubdb/tables/{tableIdOrName}/draft/export`
- `GET /cms/v3/hubdb/tables/{tableIdOrName}/export`
- `GET /cms/v3/hubdb/tables/{tableIdOrName}/rows`
- `GET /cms/v3/hubdb/tables/{tableIdOrName}/rows/draft`
- `GET /cms/v3/pages/landing-pages/folders`
- `GET /cms/v3/pages/landing-pages`
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
- `GET /crm/v3/lists/`
- `GET /crm/v3/limits/pipelines`
- `GET /crm/v3/lists/folders`
- `GET /crm/v3/limits/records`
- `POST /crm/v3/lists/search`
- `GET /crm/v3/lists/{listId}`
- `GET /crm/v3/lists/{listId}/memberships`
- `GET /crm/v3/objects/calls`
- `POST /crm/v3/objects/calls/search`
- `GET /crm/v3/objects/calls/{callId}`
- `GET /crm/v3/objects/carts`
- `POST /crm/v3/objects/carts/search`
- `GET /crm/v3/objects/communications`
- `POST /crm/v3/objects/communications/search`
- `GET /crm/v3/objects/companies`
- `POST /crm/v3/objects/companies/search`
- `GET /crm/v3/objects/companies/{companyId}`
- `GET /crm/v3/objects/contacts`
- `POST /crm/v3/objects/contacts/search`
- `GET /crm/v3/objects/contacts/{contactId}`
- `GET /crm/v3/objects/discounts`
- `POST /crm/v3/objects/discounts/search`
- `GET /crm/v3/objects/emails`
- `POST /crm/v3/objects/emails/search`
- `GET /crm/v3/objects/fees`
- `GET /crm/v3/objects/invoices`

_(+102 more)_

