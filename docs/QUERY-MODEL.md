# Query Model

## Status

Draft productive, 2026-07-08

## Purpose

The Query Model defines stable graph queries over KUEPER Knowledge Graph exports and public API routes.

It turns registry and relation data into named operations that consumers can call without knowing internal export layout.

## Initial queries

```text
findPrerequisites(documentId)
findLearningPath(documentId)
findDocumentsByKnowledgeDomain(kdId)
findModulesByCompetency(cmpId)
resolveApiRoute(path)
```

## API routes

```text
GET /api/query/prerequisites/{documentId}
GET /api/query/learning-path/{documentId}
GET /api/query/documents-by-knowledge-domain/{kdId}
GET /api/query/modules-by-competency/{cmpId}
GET /api/query/api-route?path=/api/ota/documents
```

## Response envelope

Query API responses use:

```json
{
  "ok": true,
  "schema": "KUEPER-QUERY-API-0.1",
  "query": "findPrerequisites",
  "data": {}
}
```

Errors use:

```json
{
  "ok": false,
  "schema": "KUEPER-QUERY-API-0.1",
  "query": "findPrerequisites",
  "error": {
    "code": "NOT_FOUND",
    "message": "..."
  }
}
```

## Source exports

Initial implementation reads from:

```text
exports/kxf-0.3.json
exports/kxf-learning-modules-0.1.json
exports/kxf-learning-paths-0.1.json
exports/api-registry-0.1.json
```

## Non-goals

- No write queries.
- No user-specific personalization.
- No graph database dependency.
- No replacement for canonical KXF exports.
