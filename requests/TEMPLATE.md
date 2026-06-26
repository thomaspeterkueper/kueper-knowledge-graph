# KB-REQUEST Template

```yaml
id: REQ:L3:000000
type: Request
layer: L3
requester: SYS:KUEPER:example
requestType: entity_request
purpose: >
  Warum wird diese Knowledge-Graph-Erweiterung benoetigt?
requestedContent:
  - Gewuenschte Entitaet, Relation, Mapping, Dokumentreferenz oder Exporterweiterung
priority: medium
blocking: >
  Welcher konkrete Schritt im anfragenden Projekt haengt daran?
suggestedIds:
  - Optionaler ID-Vorschlag, nicht kanonisch bis zur Annahme
targetExport: exports/kxf-0.1.json
status: open
created: YYYY-MM-DD
curator: T.P.K.
createdObjects: []
notes: ""
```

## Hinweise

- Der Requester darf Vorschlaege machen.
- Der Knowledge Graph entscheidet ueber kanonische IDs, Layer und Typen.
- Ein Request ist erst umgesetzt, wenn die erzeugten Objekte, Relationen oder Exporte im KG vorhanden sind.
