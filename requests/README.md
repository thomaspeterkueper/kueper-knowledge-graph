# Requests Registry

## Zweck

Diese Registry sammelt Anfragen angeschlossener KUEPER-Systeme an den Knowledge Graph.

Andere Projekte duerfen Knowledge-Graph-Erweiterungen benoetigen, aber sie duerfen keine kanonischen Entitaeten, Relationen, IDs oder Mappings selbst definieren.

---

## Ordnerlogik

```text
requests/
  open/
  review/
  accepted/
  implemented/
  rejected/
  archived/
```

---

## ID-Format

```text
REQ:L3:000001
```

---

## Minimalregel

Jede Anfrage muss enthalten:

- ID
- Requester
- Request Type
- Purpose
- Requested Content
- Priority
- Blocking
- Status
- Created
- Curator

---

## Verantwortlichkeit

Der Requester beschreibt Bedarf und Zweck.

Der Knowledge Graph entscheidet ueber:

- kanonische ID
- Typ
- Layer
- Relation
- Mapping
- Export
- Annahme oder Ablehnung

---

## Ergebnis

Ein implementierter Request erzeugt oder veraendert mindestens eines der folgenden Dinge:

- Entitaet
- Relation
- Mapping
- Schema
- Export
- Systemeintrag
- Domaineintrag
- Projektvertrag
