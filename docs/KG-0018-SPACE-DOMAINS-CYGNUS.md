# KG-0018 — Space-Domänen und CYGNUS-Dokumentidentität

Status: canonical
Datum: 2026-08-31
Owner: `SYS:KUEPER:knowledge-graph`

## Anlass

Das aktive OTA-Dossier `OTA-TEC-0082-2026-DE` deklariert den kanonischen Graph-Anker `DOC:OTA:OTA-TEC-0082-2026-DE` sowie die Wissensdomänen `KD:SPACE-ORBITAL-MECHANICS:N2` und `KD:SPACE-PROPULSION:N1`. Diese IDs waren im Knowledge Graph noch nicht registriert. Der Evidenzaudit `RES-20260831-TEC0082A` bestätigt die externe Prüfbarkeit der Ingenieursschicht, ohne die fiktionalen Setzungen des Dossiers zu kanonisieren oder zu verändern.

## Kanonische IDs

### Knowledge Domains

- `KD:SPACE:N1` — Raumfahrttechnik und Raumflugbetrieb — Orientierung
- `KD:SPACE-ORBITAL-MECHANICS:N2` — Orbitalmechanik — arbeitsfähiges Grundverständnis
- `KD:SPACE-PROPULSION:N1` — Raumfahrtantriebe — Orientierung

`KD:SPACE-ORBITAL-MECHANICS:N2` und `KD:SPACE-PROPULSION:N1` sind damit gültige Knowledge-Domain-IDs. `KD:SPACE:N1` ist ihre gemeinsame Elterndomäne.

### Document Reference

- `DOC:OTA:OTA-TEC-0082-2026-DE`
- canonicalId: `OTA-TEC-0082-2026-DE`
- content owner: `SYS:KUEPER:ota`
- metadata owner: `SYS:KUEPER:knowledge-graph`
- source repository: `thomaspeterkueper/overtime-archive.org`
- source path: `src/content/documents/OTA-TEC-0082-2026-DE.md`
- status: `canonical`

## Epistemische Grenze

Der Dokumentrecord bestätigt die Identität des OTA-Dossiers, nicht automatisch jede darin enthaltene Aussage. Die im Dossier markierten `[F]`, `[H]`, `[T]` und `[OFFEN]`-Anteile behalten ihren jeweiligen epistemischen Status.

Der Research-Kandidat `RES-20260831-TEC0082A` bleibt ein Evidenzartefakt und wird nicht selbst zum Weltkanon. Seine belastbaren Korrekturhinweise werden an den Content Owner `SYS:KUEPER:ota` geroutet.

## System-ID-Regel

Für OTA gilt im KUEPER-Ökosystem kanonisch `SYS:KUEPER:ota`. Historische oder lokale Aliase wie `SYS:OTA:overtimearchive` dürfen in Quellsystemen als Legacy-Alias geführt werden, aber nicht als kanonische System-ID des Graphen.
