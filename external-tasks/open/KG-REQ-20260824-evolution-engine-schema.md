---
id: KG-REQ-20260824-evolution-engine-schema
title: NOXIA-EVO-0001 — Evolution Engine v0.1 (Schema + vier Kernfunktionen)
status: open
source: NOXIA
target: KG
created: 2026-08-24
requested_by: thomaspeterkueper
priority: medium
estimated_effort: medium
affects: [KG, NOXIA]
---

## Anlass

Für NOXIA soll ein kontrollierter, nicht-automatischer Mechanismus entstehen,
der KG-/OTA-Inhalte in strukturierte, begründete Spielinhalts-Kandidaten
überführt — ohne automatische Live-Änderungen am Spiel. In der Konzeption hat
sich gezeigt, dass die Engine bewusst zielsystem-neutral gebaut werden sollte:
sie erzeugt keine "NOXIA-Inhalte", sondern aus Wissen interpretierbare
Kandidaten, die pro Zielsystem (aktuell: NOXIA; potenziell später: Dvārakā,
ca. 1700 v. Chr., selbe Buchuniversumsfamilie) unterschiedlich gelesen werden
können. Beispiel: "bronzezeitliche Bewässerungssysteme" → NOXIA: closed-loop
water recycling / hydraulic infrastructure; Dvārakā: canals / cisterns /
ritual water access / harbour management. Eine Quelle, mehrere Lesarten.

Da Logik und Persistenz konzeptionell zum KG gehören (Schnittstelle zwischen
Wissen und Zielsystemen), soll die Umsetzung im `kueper-knowledge-graph`-Repo
erfolgen, nicht im NOXIA-Repo.

## Gewünschte Änderung

**Migration** `infrastructure/migrations/0029_evolution_engine.sql` (nächste
freie Nummer nach `0028_create_import_jobs.sql`), idempotent (DROP IF EXISTS
Guards, wie in bestehenden KG-Migrationen üblich), mit folgendem Schema:

```sql
-- 1. Zielsystem (bewusst neutral: Spiel, Simulation, unspezifiziert)
evo_targets
  id              uuid pk
  code            text unique        -- 'noxia' | 'dvaraka' (aktuell nur 'noxia' geseedet)
  label           text
  repo_ref        text
  request_path    text
  request_prefix  text
  kind            text               -- 'game' | 'simulation' | 'unspecified'

-- 2. erlaubte Kandidat-Typen pro Zielsystem (kein globales Enum, keine
--    freien Strings — Erweiterbarkeit ohne schleichende Inkonsistenz)
evo_target_candidate_types
  id            uuid pk
  target_id     uuid fk -> evo_targets
  type_code     text
  description   text
  unique(target_id, type_code)

-- 3. Quelle
evo_sources
  id                uuid pk
  source_system     text
  source_type       text
  source_ref        text
  source_revision   text
  source_epistemics text        -- 'fact' | 'hypothesis' | 'extrapolation' | 'speculation'
  topic             text
  content_snapshot  text        -- optional, vollständiger Inhalt statt verlustbehaftetem raw_content
  ingested_at       timestamptz default now()

-- 4. General Candidate — zielsystem-neutral, das Wissens-Destillat
evo_candidates
  id           uuid pk
  source_id    uuid fk -> evo_sources
  title        text
  summary      text
  status       text          -- 'draft' | 'reviewed' | 'archived'
  created_at   timestamptz default now()

-- 5. Target Interpretation — die Mapping-Schicht, ein Candidate kann
--    mehrere Interpretationen haben (eine pro Zielsystem)
evo_target_interpretations
  id                    uuid pk
  candidate_id          uuid fk -> evo_candidates
  target_id             uuid fk -> evo_targets
  candidate_type_id     uuid fk -> evo_target_candidate_types
  title                 text
  description           text
  status                text     -- 'draft' | 'reviewed' | 'accepted' | 'rejected'
  created_at            timestamptz default now()

-- 6. Begründung, an der Interpretation hängend (NICHT am General Candidate,
--    da z.B. canon_status pro Zielsystem unterschiedlich zu beurteilen ist)
evo_interpretation_reasoning
  interpretation_id    uuid pk fk -> evo_target_interpretations
  trigger_summary       text
  scientific_claim      text
  extrapolation_delta   text
  historical_basis      text    -- nullable; primär für narrativ-historische Targets (z.B. Dvārakā)
  fictional_delta        text    -- nullable; dito
  canon_status           text    -- nullable; 'open' | 'confirmed' | 'rejected' -- NIEMALS automatisch von der Engine gesetzt, ausschließlich kuratorisch
  gameplay_benefit       text
  affected_systems       text[]

-- 7. Request (Output-Artefakt)
evo_requests
  id                 uuid pk
  interpretation_id  uuid fk -> evo_target_interpretations
  request_code       text unique
  file_path          text unique   -- unique, um doppelte Artefakte bei Retry zu verhindern
  status             text          -- 'open' | 'in_review' | 'merged' | 'rejected'
  created_at         timestamptz default now()
```

Seed-Daten: ausschließlich `evo_targets` mit einer Zeile für `noxia`
(repo_ref `thomaspeterkueper/noxiagame`, request_path
`external-tasks/open/`, request_prefix `NOXIA-REQUEST`, kind `game`) plus
zugehörige `evo_target_candidate_types`: `technology`, `building`,
`material`, `process`, `mechanic`, `mission`. Keine Dvārakā-Zeile — dafür
existiert noch kein reales Zielsystem, keine Annahmen sollen heute
kanonisiert werden.

**Vier Kernfunktionen** (kein Cron, keine Automation, jeder Schritt manuell
getriggert):

1. `ingestSource()` → Zeile in `evo_sources`
2. `generateCandidate(sourceId)` → Zeile in `evo_candidates`, Status `draft`
3. `interpretForTarget(candidateId, targetId)` → Zeile in
   `evo_target_interpretations`; kann mehrfach pro Kandidat aufgerufen werden
4. `attachReasoning(interpretationId)` → Zeile in
   `evo_interpretation_reasoning`
5. `emitRequest(interpretationId)` → nur bei Interpretation-Status
   `accepted` (manuelle Freigabe zwischen 4 und 5); schreibt Markdown-Datei
   nach `<target.request_path>` im `target.repo_ref` (via GitHub Contents
   API, analog zum bestehenden KB-REQUEST-Muster) und legt `evo_requests`-
   Zeile an

Die erzeugte Request-Markdown-Datei folgt dem ADR-/Request-Format des
jeweiligen Zielrepos (siehe z.B. `NOXIA-RESOURCE-0001` bzw. dieses Dokument
als Vorlage für das Feldset: Anlass, Quelle, wissenschaftliche Aussage,
Extrapolationsanteil, Gameplay-Nutzen, betroffene Systeme).

## Begründung

Erweiterbarkeit ohne Schema-Umbau: `evo_targets` + `evo_target_candidate_types`
erlauben spätere Zielsysteme (z.B. Dvārakā), ohne bestehende Kandidaten oder
Interpretationen anzufassen. Die Trennung General Candidate / Target
Interpretation erlaubt, dieselbe Quelle für mehrere Zielsysteme
unterschiedlich zu lesen, ohne Redundanz auf Quellenebene. `canon_status` an
der Interpretation statt am Candidate verhindert, dass eine für ein
Zielsystem rein technische Aussage eine für ein anderes Zielsystem offene
Kanonfrage überschreibt oder vermischt.

## Betroffene Repositories

- `kueper-knowledge-graph` (Migration + Kernfunktionen)
- `noxiagame` (Empfänger der emittierten Requests unter `external-tasks/open/`, keine Code-Änderung dort in v0.1)

## Erwartetes Ergebnis

Migration 0029 liegt im KG-Repo, `evo_targets` ist mit genau einer Zeile
(`noxia`) plus zugehörigen Kandidat-Typen geseedet. Die vier (fünf,
inklusive Interpretationsschritt) Kernfunktionen existieren als isolierter,
testbarer Block ohne Berührung bestehender KG-Tabellen und ohne
automatischen Trigger. Ein manuell durchlaufener Testzyklus
(Quelle → Candidate → NOXIA-Interpretation → Reasoning → Accept → Request)
erzeugt eine gültige Markdown-Datei unter
`noxiagame/external-tasks/open/NOXIA-REQUEST-0001-<slug>.md`.

## Hinweise

Keine Dvārakā-Daten, keine Dvārakā-Typologie in diesem Schritt — Schema
trägt die Erweiterung, ohne dass heute etwas über ein noch nicht real
existierendes Zielsystem festgelegt wird. `canon_status` darf von keiner
Funktion der Engine automatisch gesetzt werden, ausschließlich kuratorisch
durch manuellen Eingriff.
