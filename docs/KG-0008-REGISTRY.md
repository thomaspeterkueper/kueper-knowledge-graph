# KG-0008 - Registry and Resolution Layer

## Status

Draft productive, 2026-07-02; shard extension 2026-08-11

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

## Additive registry shards

Ab 2026-08-11 darf eine logische Registry aus einer Basisdatei und explizit in `exports/kxf-0.6.json` registrierten Shards bestehen.

```text
logical entity registry
    = entityRegistry
    + entityRegistryShards[]

logical relation registry
    = relationRegistry
    + relationRegistryShards[]

logical document reference registry
    = documentReferenceRegistry
    + documentReferenceRegistryShards[]
```

Die Baseregistries bleiben aus Rückwärtskompatibilitätsgründen bestehen. Neue fachlich geschlossene Erweiterungen dürfen als Shard ergänzt werden, wenn:

1. der Shard dasselbe Registry-Schema verwendet,
2. IDs über Basis und Shards eindeutig bleiben,
3. KXF den Shard explizit auflistet,
4. Consumer Basis und Shards als **eine logische Registry** behandeln,
5. ein Shard keine konkurrierende Source of Truth erzeugt, sondern nur kanonische Quellobjekte indexiert.

Ein Shard ist damit kein zweiter Graph. Er ist eine partitionierte Projektion derselben Registry.

## Rules

1. Registry records index canonical or legacy records; they do not create new domain truth by themselves.
2. Every canonical ID should be resolvable through the Entity Registry.
3. Every `SYS:KUEPER:*` ID should be resolvable through the System Registry.
4. Every exported relation should be resolvable through the Relation Registry.
5. Legacy records may be indexed, but must be marked as `legacy`, `internal` or `compatibility`.
6. Consumer-facing exports must declare their active contract where possible.
7. If registry shards are declared in KXF, resolver implementations must aggregate them with the corresponding base registry.
8. `canonicalId` and explicitly declared `aliases` may resolve to the same stable object ID.

## Files introduced

```text
exports/entity-registry-0.1.json
exports/system-registry-0.1.json
exports/relation-registry-0.1.json
exports/kxf-0.6.json
```

The shard extension adds no mandatory shard. It only defines how explicitly registered shards participate in resolution.
