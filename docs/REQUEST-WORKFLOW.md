# KUEPER Knowledge Graph - Request Workflow

## Zweck

Der Request Workflow verhindert, dass angeschlossene Projekte eigene kanonische Wissensobjekte erfinden.

Alle Systeme duerfen Wissen, Mappings, Exporte oder Registry-Daten benoetigen.
Aber nur der KUEPER Knowledge Graph definiert kanonische IDs, Entitaeten, Relationen und Exporte.

---

## Grundregel

```text
Projekt konsumiert Knowledge Graph.
Projekt erweitert Knowledge Graph nicht selbst.
```

Wenn ein Projekt etwas benoetigt, das im KG fehlt, wird ein KG-Request gestellt.

---

## Request-ID

```text
REQ:L3:000001
REQ:L3:000002
REQ:L3:000003
```

Requests sind L3-Governance-Objekte. Sie sind keine Wissensobjekte.

---

## Request-Typen

| Typ | Zweck |
|---|---|
| entity_request | neue oder geaenderte Entitaet |
| relation_request | neue oder geaenderte Relation |
| mapping_request | Mapping zwischen System und KG |
| document_request | Dokumentknoten oder Dokumentreferenz |
| export_request | neues oder erweitertes Exportfeld |
| schema_request | Schemaerweiterung |
| system_request | neues System oder Projekt |
| domain_request | neue Domain oder Subdomain |
| legal_request | zentrale Website-Stammdaten |
| migration_request | Umstellung alter IDs oder Strukturen |

---

## Status

| Status | Bedeutung |
|---|---|
| open | eingereicht, noch nicht bewertet |
| review | in kuratorischer Pruefung |
| accepted | akzeptiert, noch nicht umgesetzt |
| implemented | umgesetzt und exportiert oder dokumentiert |
| rejected | abgelehnt mit Begruendung |
| superseded | durch neueren Request ersetzt |
| archived | historisch abgeschlossen |

---

## Pflichtfelder

```text
KB-REQUEST

ID:
REQ:L3:000001

Requester:
SYS:KUEPER:ssf

Request Type:
entity_request / relation_request / mapping_request / export_request / schema_request / system_request / domain_request / legal_request / migration_request

Purpose:
Warum wird die Aenderung benoetigt?

Requested Content:
Welche Entitaeten, Relationen, Dokumente, Mappings oder Exportfelder werden benoetigt?

Priority:
high / medium / low

Blocking:
Welcher konkrete Projektfortschritt haengt daran?

Suggested IDs:
Optionaler Vorschlag. Nicht kanonisch, bis vom KG akzeptiert.

Target Export:
Optionaler Ziel-Export, z. B. exports/kxf-0.1.json

Status:
open

Created:
YYYY-MM-DD

Curator:
T.P.K.
```

---

## Erlaubte Requester

Aktuelle Systeme:

```text
SYS:KUEPER:knowledge-graph
SYS:KUEPER:kueper-com
SYS:KUEPER:ssf
SYS:KUEPER:noxia
SYS:KUEPER:ota
```

Erweiterbare Projekt-/Domain-Kandidaten:

```text
SYS:KUEPER:zereya
SYS:KUEPER:contracosmology
SYS:KUEPER:feli
SYS:KUEPER:soma-retep
SYS:KUEPER:omnizedenz
```

---

## Governance-Regel

Ein Request darf Vorschlaege machen, aber keine kanonischen Objekte erzeugen.

Erst wenn der KG den Request akzeptiert, duerfen daraus Entitaeten, Relationen, Mappings oder Exporte entstehen.

---

## Herkunft neuer Objekte

Neue Objekte sollen, wo sinnvoll, ihren Ursprung dokumentieren:

```json
{
  "id": "CON:L1:regolith",
  "type": "Concept",
  "layer": "L1",
  "createdFromRequest": "REQ:L3:000042"
}
```

Dadurch bleibt nachvollziehbar:

- welches Projekt den Bedarf hatte
- welcher fachliche Zweck dahinterstand
- welcher Export oder welches Mapping dadurch entstanden ist
- warum eine Entitaet existiert

---

## Langfristige Regel

Der Request Workflow ist Teil des Projektwissens jedes KUEPER-Systems.

Jedes neue Projekt, jede neue Domain und jede spezielle Website konsumiert den Knowledge Graph und stellt Requests, statt eigene kanonische Wissensobjekte zu definieren.
