---
id: KG-REQ-20260824-evolution-engine-schema
title: NOXIA-EVO-0001 — Evolution Engine v0.1 (Schema + vier Kernfunktionen)
status: done
source: NOXIA
target: KG
created: 2026-08-24
completed: 2026-08-29
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
  code            text unique
  label           text
  repo_ref        text
  request_path    text
  request_prefix  text
  kind            text

-- 2. erlaubte Kandidat-Typen pro Zielsystem
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
  source_epistemics text
  topic             text
  content_snapshot  text
  ingested_at       timestamptz default now()

-- 4. General Candidate
evo_candidates
  id           uuid pk
  source_id    uuid fk -> evo_sources
  title        text
  summary      text
  status       text
  created_at   timestamptz default now()

-- 5. Target Interpretation
evo_target_interpretations
  id                    uuid pk
  candidate_id          uuid fk -> evo_candidates
  target_id             uuid fk -> evo_targets
  candidate_type_id     uuid fk -> evo_target_candidate_types
  title                 text
  description           text
  status                text
  created_at            timestamptz default now()

-- 6. Begründung
evo_interpretation_reasoning
  interpretation_id    uuid pk fk -> evo_target_interpretations
  trigger_summary       text
  scientific_claim      text
  extrapolation_delta   text
  historical_basis      text
  fictional_delta        text
  canon_status           text
  gameplay_benefit       text
  affected_systems       text[]

-- 7. Request (Output-Artefakt)
evo_requests
  id                 uuid pk
  interpretation_id  uuid fk -> evo_target_interpretations
  request_code       text unique
  file_path          text unique
  status             text
  created_at         timestamptz default now()
```

Seed-Daten: ausschließlich `evo_targets` mit einer Zeile für `noxia`
(repo_ref `thomaspeterkueper/noxiagame`, request_path
`external-tasks/open/`, request_prefix `NOXIA-REQUEST`, kind `game`) plus
zugehörige `evo_target_candidate_types`: `technology`, `building`,
`material`, `process`, `mechanic`, `mission`. Keine Dvārakā-Zeile.

**Kernfunktionen**:

1. `ingestSource()`
2. `generateCandidate(sourceId)`
3. `interpretForTarget(candidateId, targetId)`
4. `attachReasoning(interpretationId)`
5. `emitRequest(interpretationId)` nur nach manueller Freigabe

## Erwartetes Ergebnis

Migration 0029 liegt im KG-Repo, `evo_targets` ist mit genau einer Zeile
(`noxia`) plus zugehörigen Kandidat-Typen geseedet. Die Kernfunktionen liegen
als isolierter, testbarer Block ohne automatische Kanonisierung oder Trigger vor.
Ein deterministischer Acceptance-Test durchläuft Quelle → Candidate →
NOXIA-Interpretation → Reasoning → Accept → Request und prüft dabei explizit,
dass `canon_status` nicht automatisch gesetzt wird und `emitRequest()` vor
manueller Freigabe verweigert wird.

## Abschluss

Umgesetzt auf PR #28 (`ecosystem/task-45a8e2da`). Der Head
`46565cab7bd946e50db9d3f6a5f48e871d856dc6` enthält Migration, Engine und den
deterministischen End-to-End-Acceptance-Test. GitHub Actions `check` und der
Vercel-Feedback-Check sind für diesen Head erfolgreich abgeschlossen. Der
Task-Lifecycle wird deshalb auf `done` geschlossen; ein Merge wird dadurch
nicht vorweggenommen.
