-- KUEPER Knowledge Graph
-- 0029 evolution engine v0.1 (NOXIA-EVO-0001)
-- Controlled, non-automatic mechanism that turns KG knowledge into structured,
-- reasoned game-content candidates. No cron, no automation, no live changes:
-- every step is triggered manually. The engine is deliberately target-system
-- neutral (NOXIA today, potentially Dvārakā later) -- it produces candidates
-- that each target system reads in its own way via evo_target_interpretations.

-- Idempotent by construction (create table if not exists, on conflict do
-- nothing), like the other KG migrations.

create extension if not exists pgcrypto;

-- -----------------------------------------------------------------------------
-- 1. Target system (deliberately neutral: game, simulation, unspecified)
-- -----------------------------------------------------------------------------

create table if not exists evo_targets (
  id             uuid primary key default gen_random_uuid(),
  code           text not null unique,           -- 'noxia' | 'dvaraka' (aktuell nur 'noxia' geseedet)
  label          text,
  repo_ref       text,                           -- z.B. 'thomaspeterkueper/noxiagame'
  request_path   text,                           -- z.B. 'external-tasks/open/'
  request_prefix text,                           -- z.B. 'NOXIA-REQUEST'
  kind           text                            -- 'game' | 'simulation' | 'unspecified'
);

-- -----------------------------------------------------------------------------
-- 2. Allowed candidate types per target system
--    (no global enum, no free strings -- extensible without creeping inconsistency)
-- -----------------------------------------------------------------------------

create table if not exists evo_target_candidate_types (
  id          uuid primary key default gen_random_uuid(),
  target_id   uuid not null references evo_targets(id) on delete cascade,
  type_code   text not null,
  description text,
  unique (target_id, type_code)
);

create index if not exists idx_evo_target_candidate_types_target on evo_target_candidate_types(target_id);

-- -----------------------------------------------------------------------------
-- 3. Source
-- -----------------------------------------------------------------------------

create table if not exists evo_sources (
  id                uuid primary key default gen_random_uuid(),
  source_system     text,
  source_type       text,
  source_ref        text,
  source_revision   text,
  source_epistemics text,                        -- 'fact' | 'hypothesis' | 'extrapolation' | 'speculation'
  topic             text,
  content_snapshot  text,                        -- optional, vollständiger Inhalt statt verlustbehaftetem raw_content
  ingested_at       timestamptz not null default now()
);

create index if not exists idx_evo_sources_system_ref on evo_sources(source_system, source_ref);
create index if not exists idx_evo_sources_ingested_at on evo_sources(ingested_at desc);

-- -----------------------------------------------------------------------------
-- 4. General Candidate -- target-system neutral, the knowledge distillate
-- -----------------------------------------------------------------------------

create table if not exists evo_candidates (
  id         uuid primary key default gen_random_uuid(),
  source_id  uuid not null references evo_sources(id),
  title      text not null,
  summary    text,
  status     text not null default 'draft',      -- 'draft' | 'reviewed' | 'archived'
  created_at timestamptz not null default now()
);

create index if not exists idx_evo_candidates_source on evo_candidates(source_id);
create index if not exists idx_evo_candidates_status on evo_candidates(status);

-- -----------------------------------------------------------------------------
-- 5. Target Interpretation -- the mapping layer; one candidate can have
--    multiple interpretations (one per target system)
-- -----------------------------------------------------------------------------

create table if not exists evo_target_interpretations (
  id                uuid primary key default gen_random_uuid(),
  candidate_id      uuid not null references evo_candidates(id),
  target_id         uuid not null references evo_targets(id),
  candidate_type_id uuid not null references evo_target_candidate_types(id),
  title             text not null,
  description       text,
  status            text not null default 'draft',  -- 'draft' | 'reviewed' | 'accepted' | 'rejected'
  created_at        timestamptz not null default now()
);

create index if not exists idx_evo_interpretations_candidate on evo_target_interpretations(candidate_id);
create index if not exists idx_evo_interpretations_target on evo_target_interpretations(target_id);
create index if not exists idx_evo_interpretations_status on evo_target_interpretations(status);

-- -----------------------------------------------------------------------------
-- 6. Reasoning, attached to the interpretation (NOT to the general candidate,
--    e.g. canon_status must be judged per target system)
-- -----------------------------------------------------------------------------

create table if not exists evo_interpretation_reasoning (
  interpretation_id  uuid primary key references evo_target_interpretations(id) on delete cascade,
  trigger_summary    text,
  scientific_claim   text,
  extrapolation_delta text,
  historical_basis   text,      -- nullable; primär für narrativ-historische Targets (z.B. Dvārakā)
  fictional_delta    text,      -- nullable; dito
  canon_status       text,      -- nullable; 'open' | 'confirmed' | 'rejected'
                               -- NIEMALS automatisch von der Engine gesetzt, ausschließlich kuratorisch
  gameplay_benefit   text,
  affected_systems   text[] not null default '{}'
);

-- -----------------------------------------------------------------------------
-- 7. Request (output artifact)
-- -----------------------------------------------------------------------------

create table if not exists evo_requests (
  id                 uuid primary key default gen_random_uuid(),
  interpretation_id  uuid not null references evo_target_interpretations(id),
  request_code       text not null unique,          -- z.B. 'NOXIA-REQUEST-0001'
  file_path          text not null unique,          -- unique, um doppelte Artefakte bei Retry zu verhindern
  status             text not null default 'open',  -- 'open' | 'in_review' | 'merged' | 'rejected'
  created_at         timestamptz not null default now()
);

create index if not exists idx_evo_requests_interpretation on evo_requests(interpretation_id);
create index if not exists idx_evo_requests_status on evo_requests(status);

-- -----------------------------------------------------------------------------
-- Seed: exactly one target system ('noxia') plus its candidate types.
-- No Dvārakā row -- no real target system exists for it yet, no assumptions
-- should be canonized today. Fixed target id keeps the seed idempotent.
-- -----------------------------------------------------------------------------

insert into evo_targets (id, code, label, repo_ref, request_path, request_prefix, kind)
values (
  '10000000-0000-4000-8000-000000000001',
  'noxia',
  'NOXIA',
  'thomaspeterkueper/noxiagame',
  'external-tasks/open/',
  'NOXIA-REQUEST',
  'game'
)
on conflict (code) do nothing;

insert into evo_target_candidate_types (target_id, type_code, description)
select t.id, c.type_code, c.description
from (values
  ('technology', 'Technologie bzw. technisches Verfahren aus dem Quellwissen'),
  ('building',   'Gebäude oder bauliche Anlage'),
  ('material',   'Material oder Rohstoff'),
  ('process',    'Prozess, Ablauf oder Verfahrensschritt'),
  ('mechanic',   'Gameplay-Mechanik'),
  ('mission',    'Mission, Aufgabe oder Zielvorgabe')
) as c(type_code, description)
cross join evo_targets t
where t.code = 'noxia'
on conflict (target_id, type_code) do nothing;

-- -----------------------------------------------------------------------------
-- Verification
-- -----------------------------------------------------------------------------

select
  'evo_targets' as table_name,
  count(*) as row_count
from evo_targets;

select
  'evo_target_candidate_types' as table_name,
  count(*) as row_count
from evo_target_candidate_types;
