# External Task: Document Architecture Consensus

Status: done
Requester: SolarScienceFoundation / SSF
Target repository: kueper-knowledge-graph
Created: 2026-07-08
Completed: 2026-07-08
Type: architecture-consensus-request

## Request

SSF needed a shared document architecture across the KUEPER ecosystem before building further document-based learning features.

Requested clarification:

- accepted KG responsibilities
- rejected KG responsibilities
- required fields for document references in KG/KXF
- how KG entities reference documents
- how SSF learning modules reference KG entities and source documents
- whether KXF exports should include document references

## Resolution

Implemented.

Created:

```text
docs/DOCUMENT-ARCHITECTURE.md
exports/document-references-0.1.json
```

Updated:

```text
docs/KXF-SPEC.md
exports/kxf-0.6.json
```

## Decision summary

KG owns canonical IDs, entity records, relations, mappings, registries, KXF contracts and document reference metadata.

KG does not own full document bodies by default. Fulltext remains with the owning source system, such as OTA or kueper.com.

Document references must at minimum include:

```text
id
type
system
title
status
contentOwner
metadataOwner
```

SSF should reference source documents through KG IDs such as:

```text
DOC:OTA:OTA-SCI-0083-2026-DE
PATH:OTA:OTA-SCI-0083-2026-DE:READ
```

and should not duplicate canonical document metadata locally.
