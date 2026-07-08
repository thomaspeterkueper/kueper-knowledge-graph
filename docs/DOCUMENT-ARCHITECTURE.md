# Document Architecture Consensus

## Status

Implemented, 2026-07-08

## Origin

External task: `external-tasks/open/KG-REQ-20260708-document-architecture-consensus.md`

Requester: `SYS:KUEPER:ssf`

## Decision

Every information object has exactly one canonical owner. Other systems reference it or derive project-specific views from it.

The Knowledge Graph owns canonical identifiers, entity records, relation records, mappings, registries and KXF exports.

The Knowledge Graph does **not** own full document bodies unless a future decision explicitly assigns that role to KG.

## Accepted KG responsibilities

KG owns and exports:

- stable `DOC:*` identifiers
- document reference metadata
- source system and source repository references
- canonical document status
- language, type, version and publication metadata where available
- canonical URL or source URL references where available
- relations from documents to KnowledgeDomains, Concepts, Places, Models or Systems
- prerequisites attached to documents
- learning-path and archive-module references to documents
- registry entries that make document IDs resolvable

## Rejected KG responsibilities

KG does not own:

- full public article bodies
- OTA fulltext
- kueper.com page prose
- SSF lesson prose, exercises or progress state
- NOXIA runtime narrative or game state
- editorial layout of publication frontends

## Canonical document reference fields

A KG document reference should use these fields where known:

```text
id
canonicalId
type
system
title
documentType
language
status
version
canonicalUrl
sourceUrl
sourceRepository
sourcePath
contentOwner
metadataOwner
relatedEntities
relatedKnowledgeDomains
prerequisiteIds
markerProfile
summary
created
modified
```

Required minimum:

```text
id
type
system
title
status
contentOwner
metadataOwner
```

## Ownership matrix

| System | Owns full body? | KG role |
|---|---:|---|
| `SYS:KUEPER:ota` | yes | KG stores OTA document references, metadata, prerequisites and relations |
| `SYS:KUEPER:kueper-com` | yes | KG stores public/draft document references and mappings |
| `SYS:KUEPER:ssf` | no for source documents | SSF references KG documents and transforms them into modules, paths and exercises |
| `SYS:KUEPER:noxia` | no for source documents | NOXIA references KG/SSF objects for application and unlock logic |
| `SYS:KUEPER:contracomology` | no for source documents | Publication frontend resolving fulltext from OTA or kueper.com through KG references |

## How KG entities reference documents

Entities may reference documents in two ways:

1. explicit relation records, for example `COVERS`, `REQUIRES`, `TARGETS`, `OWNED_BY`, `STORED_IN`;
2. typed reference fields in consumer exports, for example `sourceDocuments`, `archiveDocuments`, `targetDocument`, `relatedEntities`.

For reading targets, the canonical pattern remains:

```text
PATH:<system>:<doc-id>:READ --TARGETS--> DOC:<system>:<doc-id>
```

## How SSF references documents

SSF learning modules and paths should reference documents through KG IDs only:

```text
DOC:OTA:OTA-SCI-0083-2026-DE
DOC:KUE:KUE-AST-0001-2026-DE
PATH:OTA:OTA-SCI-0083-2026-DE:READ
```

SSF should not duplicate canonical document metadata. It may cache UI-specific views, but the KG remains the source for canonical document IDs, prerequisites, document references and mappings.

## KXF rule

KXF exports may include document references and document metadata. KXF exports must not include full document bodies unless a future explicit decision changes the scope.

## Open questions

- Exact public canonical URLs for early OTA records are not always known yet.
- Some existing legacy `DOC:*` records have partial metadata and should be enriched over time.
- A future API may expose `document-references` directly, separate from `/api/ota/*`.
