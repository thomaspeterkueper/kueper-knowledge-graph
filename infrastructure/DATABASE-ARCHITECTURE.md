# KUEPER Knowledge Graph - Database Architecture

## Zweck

Die Datenbank ist der operative Index des KUEPER Knowledge Graph.

Sie ersetzt nicht das Git-Repository als kanonische Quelle.

---

## Grundarchitektur

```text
Git Repository
  canonical JSON / Markdown / KXF
        |
        v
Import / Sync Pipeline
        |
        v
Supabase / PostgreSQL
  indexes, search, backlinks, graph traversal
        |
        v
kg.kueper.com
  curated APIs and exports
```

---

## Master-Regel

```text
Repo = Master
Supabase = Index
kg.kueper.com = API / Export Layer
```

Keine direkte manuelle Pflege kanonischer Wissensobjekte in Supabase.

Die Datenbank wird aus dem Repository synchronisiert.

---

## Aufgaben der Datenbank

Supabase verwaltet operativ:

- schnelle Suche
- Backlinks
- Graph-Traversal
- Sichtbarkeitsfilter
- API-Abfragen
- Importstatus
- Exportstatus
- Validierungsstatus
- Indizes fuer kg.kueper.com

---

## Nicht-Aufgaben der Datenbank

Supabase definiert nicht kanonisch:

- IDs
- Entitaeten
- Relationen
- Mappings
- KXF-Schemas
- Systemvertraege
- Governance-Regeln

Diese bleiben im Git-Repository.

---

## Projekt

```text
Supabase project id: ehuoafluxkmizvatmyzt
Project role: operational_kg_index
Canonical source: thomaspeterkueper/kueper-knowledge-graph
```

---

## Kernobjekte

Die erste Datenbankschicht enthaelt:

```text
kg_entities
kg_relations
kg_documents
kg_systems
kg_domains
kg_media_assets
kg_requests
kg_mappings
kg_exports
kg_import_log
```

---

## Sichtbarkeit

Alle zentralen Tabellen enthalten ein Sichtbarkeitsfeld:

```text
public
members
internal
restricted
private
```

Kuratierte Exporte duerfen nur Objekte ausgeben, die explizit fuer den Zielkontext zugelassen sind.

---

## JSONB-Regel

Kanonische Details werden zusaetzlich als `data jsonb` gespeichert.

Dadurch kann KXF wachsen, ohne dass jede kleine Schemaaenderung sofort eine Datenbankmigration erzwingt.

---

## Langfristige Perspektive

Die Datenbank ist fuer Jahrzehnte als operativer Such-, Index- und API-Layer gedacht.

Der dauerhafte kanonische Zustand bleibt versioniert im Repository.
