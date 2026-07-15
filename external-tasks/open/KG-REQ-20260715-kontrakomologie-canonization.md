# KG-REQ-20260715 — Kontrakomologie-Kanonisierung

ID: REQ:L3:PENDING
Requester: SYS:KUEPER:contracomology
Recipient: SYS:KUEPER:knowledge-graph
Request Type: schema_change + entity_canonization + entity_request
Priority: medium
Status: in_progress
Created: 2026-07-15
Curator: T.P.K.

## Purpose

Kanonisierung des am 2026-07-03 angelegten Gründungsclusters (11 Entitäten + 9 Relationen)
und Einarbeitung zweier Korrekturen aus der geklärten AVI-Herkunft. Entbindet den
`kg_pending`-Kurs „Drei Paradigmen" (Bach/Chopin/Wagner) im contracomology_ui.

## Entschiedene Kurator-Fragen

- D1 — Grundthese als CON:L0-Fundamentknoten: ja (bereits `CON:L0:zeit-these`).
- D2 — Zeitform auf L1: umgesetzt (`CON:L1:zeitform`).
- D3 — AVI-Punkt / Phasenübergang / AVI-Transformation: drei distinkte Entitäten.
- D4 — OEM-Schreibweise: „Omnizedent" (in `oem.yaml`).
- D5 — Paradigma-Nummerierung 1=Bach, 2=Chopin, 3=Wagner: beibehalten.
- D6 — AVI = „Axiomatisches Vakuum-Integral" (immer); Glossar-Fehlauflösung im Archiv zu korrigieren.
- D7 — Chopin A2 (Takt 212) ist der Phasenübergang, nicht der AVI-Punkt.
- D8 — Status `[W]` = „Werk-Setzung".

## Angeforderte Änderungen & Bearbeitungsstand

1. **[W] in beide Schemas** — ✅ erledigt (Commit `aed3c9c`, EXT-ECO-KG-20260714-001). D8-Bezeichnung „Werk-Setzung" bestätigt und im Glossar (`docs/signatur-schema.md`) präzisiert.
2. **Kanonisierung [W] → [R] (20 Datensätze)** — ⏸ AUSSTEHEND. Laut Request kurator-gegated („Zeitpunkt der Anhebung: Kurator bestätigt"). Nicht automatisch ausgeführt; wartet auf Freigabe.
3. **AVI-Herkunft-Korrektur** — ✅ erledigt: neuer Wurzelknoten `CON:L0:avi` (∅ Avi); `entities/concepts/avi-punkt.yaml` revidiert (geteilte Wurzel statt Trennung; „NICHT zu verwechseln"-Zeile entfernt; Chopin-A2-Beispiel entfernt, → Phasenübergang).
4. **Neue/geänderte Entitäten (Status [W])** — ✅ erledigt: `CON:L0:avi`, `CON:L1:avi-punkt` (revidiert), `CON:L1:phasenuebergang`, `CON:L1:avi-transformation`.
5. **Neue Relationen** — ✅ erledigt: `REL-KON-0010` (avi-transformation part_of oem), `REL-KON-0011` (phasenuebergang part_of avi-transformation).
6. **Nachrangig** — ⏸ Glossar-Korrektur „Astronomische Variation von Invarianten" → „Axiomatisches Vakuum-Integral" betrifft das Archiv-Repo → separate external-task (auf Freigabe). `ma-u`/`ma-ta-u`-Oppositionskante bleibt Prosa (neuer Relationstyp via ARC-0006 nötig).

## Offen für Kurator

- Freigabe für die [W] → [R]-Anhebung (Abschnitt 2) inkl. Zeitpunkt.
- Freigabe für die Archiv-external-task (Abschnitt 6, Glossar-Korrektur).
- Hinweis: Entity-YAMLs nutzen `domain/definition/created/curator`, `entity.schema.json` verlangt `domäne/beschreibung/erstellt/kurator` — bestehende Feldnamen-Inkonsistenz, separat zu klären.
