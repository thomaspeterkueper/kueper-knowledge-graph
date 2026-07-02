# KG-0008 - Registry and Resolution Layer

## Status

Draft productive, 2026-07-02

## Purpose

KG-0008 introduces a registry and resolution layer for the KUEPER Knowledge Graph.

Until KG-0007, consumers could read exports, but they still had to know which export contained which ID. KG-0008 makes IDs resolvable through registry records.

## Core idea

```text
resolve(id) -> registry record -> source exports -> canonical record
```

The registry does not replace domain exports. It indexes them.

## Registry types

| Registry | File | Purpose |
|---|---|---|
| Entity Registry | exports/entity-registry-0.1.json | Resolves canonical IDs to type, status and exports |
| System Registry | exports/system-registry-0.1.json | Resolves SYS:KUEPER:* systems |
| Relation Registry | exports/relation-registry-0.1.json | Resolves relation records and relation types |
| KXF Registry View | exports/kxf-0.6.json | Combined registry-oriented KXF export |

## Resolution functions

The registry enables consumers to implement:

```text
resolve(id)
listExports(id)
listIncoming(id)
listOutgoing(id)
listRelations(id)
```

## Entity registry record

```json
{
  "id": "KD:GEO-SEISM:N2",
  "type": "KnowledgeDomain",
  "status": "canonical",
  "source": "KG-0002",
  "exports": ["exports/knowledge-domains-0.1.json", "exports/kxf-0.6.json"]
}
```

## System registry record

```json
{
  "id": "SYS:KUEPER:ssf",
  "type": "System",
  "name": "Solar Science Foundation",
  "role": "learning_platform",
  "consumes": ["exports/kxf-learning-modules-0.1.json"]
}
```

## Relation registry record

```json
{
  "id": "REL:DOC:OTA:OTA-SCI-0083-2026-DE:REQUIRES:KD:GEO-SEISM:N2",
  "type": "Relation",
  "from": "DOC:OTA:OTA-SCI-0083-2026-DE",
  "relation": "REQUIRES",
  "to": "KD:GEO-SEISM:N2",
  "status": "canonical"
}
```

## Rules

1. Registry records index canonical or legacy records; they do not create new domain truth by themselves.
2. Every canonical ID should be resolvable through the Entity Registry.
3. Every `SYS:KUEPER:*` ID should be resolvable through the System Registry.
4. Every exported relation should be resolvable through the Relation Registry.
5. Legacy records may be indexed, but must be marked as `legacy`, `internal` or `compatibility`.
6. Consumer-facing exports must declare their active contract where possible.

## Files introduced

```text
exports/entity-registry-0.1.json
exports/system-registry-0.1.json
exports/relation-registry-0.1.json
exports/kxf-0.6.json
```
