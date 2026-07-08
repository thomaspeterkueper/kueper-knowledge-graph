# OTA API

## Status

Draft productive, 2026-07-08

## Purpose

The OTA API exposes selected KUEPER Knowledge Graph OTA metadata through stable public `/api/ota/*` routes.

The API does not expose OTA full text. OTA remains the owner of full document content. The Knowledge Graph exposes metadata, prerequisites and learning-path links.

## Envelope

All responses use the same envelope:

```json
{
  "ok": true,
  "schema": "KUEPER-OTA-API-0.1",
  "data": {}
}
```

Errors use:

```json
{
  "ok": false,
  "schema": "KUEPER-OTA-API-0.1",
  "error": {
    "code": "OTA_DOCUMENT_NOT_FOUND",
    "message": "No OTA document found for id: ..."
  }
}
```

## Routes

### `GET /api/ota`

Returns route index and API version.

### `GET /api/ota/documents`

Returns OTA document metadata records.

Optional query parameters:

```text
status
q
```

### `GET /api/ota/documents/{id}`

Returns one OTA document metadata record.

`id` may be either:

```text
DOC:OTA:OTA-SCI-0083-2026-DE
OTA-SCI-0083-2026-DE
```

### `GET /api/ota/documents/{id}/prerequisites`

Returns the OTA document and all linked prerequisite records. Each prerequisite includes its resolved KnowledgeDomain record where available.

### `GET /api/ota/documents/{id}/learning-path`

Returns the OTA document and the associated learning path, if available.

## Cache

Responses are public and may be cached:

```text
Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400
```

## Non-goals

- No OTA full text.
- No write API.
- No automatic creation of KnowledgeDomain or Prerequisite records.
- No private or user-specific state.

## Source exports

The implementation currently reads from:

```text
exports/kxf-0.3.json
exports/kxf-learning-paths-0.1.json
```

`kxf-0.3.json` is used because it contains OTA documents, KnowledgeDomain records and canonical Prerequisite records in one export.

## Consumers

Expected consumers:

```text
SYS:KUEPER:ota
SYS:KUEPER:ssf
SYS:KUEPER:noxia
external read-only clients
```
