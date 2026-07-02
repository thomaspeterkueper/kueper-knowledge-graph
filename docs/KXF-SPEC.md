# KUEPER Exchange Format - KXF-SPEC

## Status

Draft productive, 2026-07-02

## Zweck

KXF ist das Austauschformat des KUEPER Knowledge Graph. Es exportiert kanonische Entitaeten, Dokument-Metadaten, Knowledge Domains, Prerequisites, Relationen, Lernmodule, Unlocks und Mappings fuer OTA, SSF, NOXIA und kueper.com.

Der Knowledge Graph bleibt die Single Source of Truth. Andere Systeme konsumieren KXF, definieren aber keine eigenen kanonischen Wissensobjekte.

## Versionen

| Version | Status | Inhalt |
|---|---|---|
| KXF-0.1 | draft_productive | Grundexport mit Entities, Documents, `KNOW:*`-Domains und Prerequisites |
| KXF-0.2 | draft_productive | niveaugebundene `KD:*:N*`-KnowledgeDomains und kanonische `REQUIRES`-Prerequisites |
| KXF-0.3 | draft_productive | explizite `Relation`-Records als Graph-Kanten |

## Top-Level-Struktur

```json
{
  "schema": "KXF-0.3",
  "name": "KUEPER Exchange Format",
  "master": "kueper-knowledge-graph",
  "status": "draft_productive",
  "principle": "single_source_of_truth",
  "version": "0.3",
  "updated": "2026-07-02",
  "records": {
    "entities": [],
    "documents": [],
    "knowledgeDomains": [],
    "prerequisites": [],
    "relations": [],
    "learningModules": [],
    "unlocks": [],
    "buildings": [],
    "mappings": []
  }
}
```

## Entity

Minimalfelder:

```json
{
  "id": "CON:L1:gravitation",
  "type": "Concept",
  "layer": "L1",
  "name": "Gravitation"
}
```

## Document

Dokumente werden als Metadatenobjekte gefuehrt. Volltexte bleiben im Quellsystem.

```json
{
  "id": "DOC:OTA:OTA-SCI-0083-2026-DE",
  "canonicalId": "OTA-SCI-0083-2026-DE",
  "type": "Document",
  "system": "SYS:KUEPER:ota",
  "title": "Transkrustaler Magmatismus am Mars",
  "language": "DE",
  "status": "Canonical",
  "contentOwnership": "OverTime Archive",
  "metadataOwner": "KUEPER Knowledge Graph"
}
```

## KnowledgeDomain

KXF-0.2 und hoeher verwenden niveaugebundene KnowledgeDomain-IDs.

```json
{
  "id": "KD:GEO-SEISM:N2",
  "type": "KnowledgeDomain",
  "layer": "L1",
  "code": "GEO-SEISM",
  "level": "N2",
  "title": "Seismologie - arbeitsfaehiges Grundverstaendnis",
  "parent": "KD:GEO:N1",
  "description": "Grundlagen seismischer Wellen, Messdaten und Interpretationslogik.",
  "aliases": ["GEO-SEISM N2", "Seismology N2"]
}
```

## Prerequisite

Prerequisites sind eigenstaendige Objekte, nicht nur Felder an Dokumenten.

```json
{
  "id": "REQ:DOC:OTA:OTA-SCI-0083-2026-DE:KD:GEO-SEISM:N2:READ",
  "type": "Prerequisite",
  "from": "DOC:OTA:OTA-SCI-0083-2026-DE",
  "relation": "REQUIRES",
  "to": "KD:GEO-SEISM:N2",
  "purpose": "read",
  "status": "canonical",
  "source": "KG-0002"
}
```

## Relation

Ab KXF-0.3 werden semantische Graph-Kanten als eigene Records exportiert.

```json
{
  "id": "REL:DOC:OTA:OTA-SCI-0083-2026-DE:REQUIRES:KD:GEO-SEISM:N2",
  "type": "Relation",
  "from": "DOC:OTA:OTA-SCI-0083-2026-DE",
  "relation": "REQUIRES",
  "to": "KD:GEO-SEISM:N2",
  "status": "canonical",
  "source": "KG-0003"
}
```

Relationen ersetzen spezialisierte Records nicht automatisch. Eine `Prerequisite` kann weiterhin existieren, waehrend dieselbe Verbindung zusaetzlich als `Relation` exportiert wird.

## Erlaubte Relationstypen ab KG-0003

| Relation | Quelle | Ziel |
|---|---|---|
| REQUIRES | Document, LearningModule, Project, Building | KnowledgeDomain, Unlock, LearningModule |
| TEACHES | LearningModule | KnowledgeDomain, Concept |
| COVERS | Document | KnowledgeDomain, Concept, Place |
| PARENT_OF | KnowledgeDomain | KnowledgeDomain |
| SATISFIES | LearningModule | Prerequisite |
| UNLOCKS | LearningModule, Unlock | Unlock, Building, Mechanic, Project |
| MAPS_TO | Legacy-ID, Mapping | Canonical-ID |
| OWNED_BY | Document, MetadataRecord | System, Repository, Organization |
| STORED_IN | Document | Repository, System |

## Legacy-Regel

`KNOW:*` bleibt fuer KXF-0.1 lesbar, ist in KXF-0.2 und hoeher aber Legacy.

Neue Prerequisites muessen auf `KD:*:N*` zeigen.

```text
Alt: REQ:OTA-SCI-0083-2026-DE:KNOW-GEO-SEISM:N2:READ
Neu: REQ:DOC:OTA:OTA-SCI-0083-2026-DE:KD:GEO-SEISM:N2:READ
```

## Validierungsregeln

1. Jeder Record besitzt `id` und `type`.
2. Jede KnowledgeDomain besitzt `code`, `level`, `title` und `description`.
3. Jede Prerequisite besitzt `from`, `relation`, `to` und `purpose`.
4. `Prerequisite.to` muss auf eine existierende `KnowledgeDomain` zeigen.
5. Neue Prerequisites duerfen nicht mehr auf `KNOW:*` zeigen.
6. Jede Relation besitzt `from`, `relation`, `to`, `status` und `source`.
7. `Relation.relation` muss aus dem erlaubten Relationstyp-Katalog stammen.
8. Dokumente speichern keinen Volltext, sondern nur Metadaten und Verweise.
9. Exporte muessen `schema`, `version` und `updated` enthalten.
