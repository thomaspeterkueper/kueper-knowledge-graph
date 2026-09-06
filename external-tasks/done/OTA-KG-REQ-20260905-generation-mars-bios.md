# OTA-KG-REQ-20260905-generation-mars-bios

**Requester:** SYS:OTA:overtimearchive  
**Recipient:** SYS:KUEPER:knowledge-graph  
**Status:** done  
**Created:** 2026-09-05  
**Completed:** 2026-09-06  
**Type:** document_reference_registration / entity_alignment

## Ergebnis

Der Request wurde KG-seitig vollständig umgesetzt.

### Kanonische Figurenidentitäten

`ETYPE:Character` / Präfix `CHAR:` wurde im kanonischen Typvokabular ergänzt.

Im Shard `exports/entity-registry-generation-mars-0.1.json` sind registriert:

- `CHAR:NXU:kaelen`
- `CHAR:NXU:rashid`
- `CHAR:NXU:lena`
- `CHAR:NXU:keiko`

Die Records tragen nur stabile Identität. Zeitabhängige Biografiedaten verbleiben in States beziehungsweise den zuständigen Source-of-Truth-Systemen.

### Aktuelle OTA-Dokumentstände

In `exports/document-references-0.1.json` sind als aktuelle beziehungsweise produktive Stände registriert:

- `DOC:OTA:OTA-BIO-0014-2092-DE` → `CHAR:NXU:kaelen` (`ENTWURF` / `draft_productive`)
- `DOC:OTA:OTA-BIO-0035-2092-DE` → `CHAR:NXU:rashid` (`AKTIV` / `canonical`)
- `DOC:OTA:OTA-BIO-0036-2092-DE` → `CHAR:NXU:lena` (`AKTIV` / `canonical`)
- `DOC:OTA:OTA-BIO-0037-2092-DE` → `CHAR:NXU:keiko` (`AKTIV` / `canonical`)

Alle vier Einträge enthalten den exakten OTA-`sourcePath`.

### Archivierte Vorgänger

- `DOC:OTA:OTA-BIO-0006-2025-DE` → `supersededBy: DOC:OTA:OTA-BIO-0036-2092-DE`
- `DOC:OTA:OTA-BIO-0008-2025-DE` → `supersededBy: DOC:OTA:OTA-BIO-0035-2092-DE`
- `DOC:OTA:OTA-BIO-0010-2025-DE` → `supersededBy: DOC:OTA:OTA-BIO-0037-2092-DE`

Die Vorgänger bleiben als historische Dokumentreferenzen erhalten, sind aber für keine Figur mehr `currentForEntities`.

## KG-Commits

- Character entity type: `c1a11ec2fad0a720e00097c29e50ae7207f958f7`
- Generation-Mars character registry: `d2c34abcb92ff8f2de8b1fd6b3aa3acea903e787`
- Biography document references and supersession: `392daf2d52aba01cd3dbc70d2614f49ac0b9e97a`

## Rückgabe

OTA kann `EXT-NXU-OTA-20260830-001` nach Abgleich dieser IDs schließen. Eine separate Completion-Anforderung wird im OTA-Repository unter `external-tasks/open/` abgelegt.
