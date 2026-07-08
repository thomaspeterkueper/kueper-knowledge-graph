# Document API

## Status

Draft productive, 2026-07-08

## Purpose

The Document API exposes KG document references from `exports/document-references-0.1.json` through stable public read routes.

It does not expose full document bodies.

## Envelope

All responses use:

```json
{
  "ok": true,
  "schema": "KUEPER-DOCUMENT-API-0.1",
  "data": {}
}
```

Errors use:

```json
{
  "ok": false,
  "schema": "KUEPER-DOCUMENT-API-0.1",
  "error": {
    "code": "DOCUMENT_NOT_FOUND",
    "message": "No document reference found for id: ..."
  }
}
```

## Routes

### `GET /api/documents`

Lists KG document references.

Optional query parameters:

```text
system
status
type
q
```

### `GET /api/documents/{id}`

Returns one KG document reference.

`id` may be either a full `DOC:*` id or a canonical id, for example:

```text
DOC:OTA:OTA-SCI-0083-2026-DE
OTA-SCI-0083-2026-DE
DOC:KUE:LEGAL-IMPRINT-DE
LEGAL-IMPRINT-DE
```

## Source export

```text
exports/document-references-0.1.json
```

## Consumers

Expected consumers:

```text
SYS:KUEPER:ota
SYS:KUEPER:ssf
SYS:KUEPER:noxia
SYS:KUEPER:contracomology
external read-only clients
```

## Non-goals

- No full text delivery.
- No write API.
- No user-specific state.
- No replacement for source-system ownership.
