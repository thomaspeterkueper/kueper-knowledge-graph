# KG-0015 - Query Model

## Status

Draft productive, 2026-07-09

## Purpose

KG-0015 defines stable query names over the KUEPER Knowledge Graph registries and exports.

The query model does not create new canonical entities. It defines repeatable read operations over existing records.

## Query families

| Query | Purpose | Primary source |
|---|---|---|
| `resolve(id)` | Resolve an ID to registry metadata | `entity-registry-0.1.json`, `system-registry-0.1.json`, `api-registry-0.1.json` |
| `findPrerequisites(documentId)` | Return prerequisite records for a document | `kxf-0.3.json` |
| `findLearningPath(documentId)` | Return the learning path for a document | `kxf-learning-paths-0.1.json` |
| `findDocumentsByKnowledgeDomain(kdId)` | Find documents requiring or covering a KnowledgeDomain | `relation-registry-0.1.json` |
| `findModulesByCompetency(cmpId)` | Find modules teaching a competency | `relation-registry-0.1.json` |
| `findRelations(id)` | Return incoming and outgoing relations for an ID | `relation-registry-0.1.json` |
| `resolveApiRoute(path)` | Resolve a public API route contract | `api-registry-0.1.json` |

## Envelope

Query APIs use a shared envelope:

```json
{
  "ok": true,
  "schema": "KUEPER-QUERY-API-0.1",
  "query": "resolve",
  "data": {}
}
```

Errors use:

```json
{
  "ok": false,
  "schema": "KUEPER-QUERY-API-0.1",
  "query": "resolve",
  "error": {
    "code": "ID_NOT_FOUND",
    "message": "..."
  }
}
```

## Implemented routes

```text
GET /api/query/resolve/{id}
GET /api/query/relations/{id}
GET /api/query/prerequisites/{documentId}
GET /api/query/learning-path/{documentId}
GET /api/query/documents-by-knowledge-domain/{kdId}
GET /api/query/modules-by-competency/{cmpId}
GET /api/query/api-route?path=/api/ota/documents
```

## Rules

1. Query results must be derived from registered KG exports.
2. Query routes must not mutate data.
3. Query routes must not invent fallback IDs.
4. Missing IDs return a structured error.
5. Public query routes must be listed in `exports/query-registry-0.1.json`.
6. Public query routes should also be listed in `exports/api-registry-0.1.json` once implemented.
