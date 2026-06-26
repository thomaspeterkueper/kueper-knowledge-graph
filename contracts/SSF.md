# Project Contract - Solar Science Foundation

## System

```text
SYS:KUEPER:ssf
```

## Rolle

Lernplattform und Vermittlungssystem.

## Darf

- Lernmodule erstellen
- Quiz erzeugen
- Fortschritt speichern
- Zertifikate erzeugen
- NOXIA-Unlocks aus Lernfortschritt ableiten
- KG-Entitaeten und Relationen didaktisch darstellen

## Darf nicht

- kanonische Entitaeten definieren
- kanonische Relationen definieren
- eigene wissenschaftliche IDs vergeben
- KXF-Felder eigenmaechtig erweitern
- NOXIA-Wissenschaft definieren

## Konsumiert

- entities
- relations
- documents
- learning_modules
- mappings
- KXF
- shared_site_records

## Request-Pflicht

Wenn SSF ein wissenschaftliches Objekt, eine Relation, ein Mapping oder ein Exportfeld benoetigt, das im KG fehlt, stellt SSF einen Request.

```text
SSF konsumiert Knowledgebase.
SSF erweitert Knowledgebase nicht selbst.
```
