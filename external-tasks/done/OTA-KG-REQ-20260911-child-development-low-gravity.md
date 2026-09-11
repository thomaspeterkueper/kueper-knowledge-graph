# OTA-KG-REQ-20260911 — Low-gravity child development registration

**Status:** done  
**From:** OTA  
**To:** KUEPER Knowledge Graph  
**Date:** 2026-09-11  
**Completed:** 2026-09-11

## Registriert

- `DOC:OTA:OTA-SCI-0086-2026-DE` — Schwangerschaft, Geburt und frühe Entwicklung in Mikro- und Teilgravitation
- `DOC:OTA:OTA-SCI-0087-2026-DE` — Kinder von Ceres — Entwicklung unter extremer Teilgravitation
- `DOC:OTA:OTA-SCI-0088-2026-DE` — Auf einem Raumfrachter geboren — Schwangerschaft, Geburt und Kindheit im mobilen Habitat

## Relationsentscheidung

Die vorgeschlagenen neuen Verben `SPECIALIZES`, `APPLIES`, `CONTEXTUALIZES` und `INFORM` wurden nicht als neue Relationstypen eingeführt, weil die vorhandene Ontologie die benötigte Semantik bereits ohne zusätzliche Überschneidungen ausdrücken kann:

- `OTA-SCI-0087` `EXPANDS` `OTA-SCI-0086`
- `OTA-SCI-0088` `EXPANDS` `OTA-SCI-0086`
- Kontext zu Kaelen und SSEP/Ceres wird vorläufig als `RELATED_TO` geführt und bleibt `draft_productive`, solange die Ziel-Dokumentidentitäten nicht im aktuellen Space-Reference-Shard registriert sind.
- `OTA-SCI-0086/0087/0088` werden zum Mars Medical Center über `RELATED_TO` angebunden; dadurch wird keine unbewiesene gerichtete technische Abhängigkeit behauptet.
- `OTA-SCI-0088` `REFERENCES` `OTA-TEC-0112-2026-DE` nur als derzeitige Frachterreferenz; ausdrücklich nicht als bestätigtes Geburtsschiff.

Die zusätzliche 0086→0119-Relation wurde nicht geraten, weil `OTA-TEC-0119-2026-DE` im aktuellen KG-Space-Reference-Shard noch nicht registriert ist.

## Offene Canon-ID

Für die bereits autorenseitig existierende Figur "Mädchen, das auf einem Raumfrachter geboren wurde" wurde entsprechend der Anforderung **keine neue Entität erfunden**. Eine Figurenrelation bleibt bis zur Canon-Rückmeldung des zuständigen Universumssystems offen.

## Epistemische Grenze

Keine Hypothese wurde als reale Mindestgravitation, feste biologische Schwelle oder sonstiges biologisches Gesetz kanonisiert.

## Implementation

- document registrations: `a72b74fadc55a1ef774120573770a9d5cc28373a`
- relations: `98362be852c15642bf0a2cbdfd9360159ea108d8`
