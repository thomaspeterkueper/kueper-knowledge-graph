-- KUEPER Knowledge Graph — Evolution Engine v0.1
-- Request: KG-REQ-20260824-evolution-engine-schema
-- Ownership: KG stores source/candidate/interpretation/request state.
-- Target repositories remain authoritative for emitted target-specific artifacts.

create extension if not exists pgcrypto;

create table if not exists public.evo_targets (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  label text not null,
  repo_ref text not null,
  request_path text not null,
  request_prefix text not null,
  kind text not null check (kind in ('game', 'simulation', 'unspecified')),
  created_at timestamptz not null default now()
);

create table if not exists public.evo_target_candidate_types (
  id uuid primary key default gen_random_uuid(),
  target_id uuid not null references public.evo_targets(id) on delete cascade,
  type_code text not null,
  description text not null,
  created_at timestamptz not null default now(),
  unique (target_id, type_code)
);

create table if not exists public.evo_sources (
  id uuid primary key default gen_random_uuid(),
  source_system text not null,
  source_type text not null,
  source_ref text not null,
  source_revision text,
  source_epistemics text not null check (source_epistemics in ('fact', 'hypothesis', 'extrapolation', 'speculation')),
  topic text not null,
  content_snapshot text,
  ingested_at timestamptz not null default now()
);

create table if not exists public.evo_candidates (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references public.evo_sources(id) on delete cascade,
  title text not null,
  summary text not null,
  status text not null default 'draft' check (status in ('draft', 'reviewed', 'archived')),
  created_at timestamptz not null default now()
);

create table if not exists public.evo_target_interpretations (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid not null references public.evo_candidates(id) on delete cascade,
  target_id uuid not null references public.evo_targets(id) on delete cascade,
  candidate_type_id uuid not null references public.evo_target_candidate_types(id),
  title text not null,
  description text not null,
  status text not null default 'draft' check (status in ('draft', 'reviewed', 'accepted', 'rejected')),
  created_at timestamptz not null default now(),
  unique (candidate_id, target_id)
);

create table if not exists public.evo_interpretation_reasoning (
  interpretation_id uuid primary key references public.evo_target_interpretations(id) on delete cascade,
  trigger_summary text not null,
  scientific_claim text not null,
  extrapolation_delta text not null,
  historical_basis text,
  fictional_delta text,
  canon_status text check (canon_status is null or canon_status in ('open', 'confirmed', 'rejected')),
  gameplay_benefit text not null,
  affected_systems text[] not null default '{}'
);

create table if not exists public.evo_requests (
  id uuid primary key default gen_random_uuid(),
  interpretation_id uuid not null references public.evo_target_interpretations(id) on delete cascade,
  request_code text not null unique,
  file_path text not null unique,
  status text not null default 'open' check (status in ('open', 'in_review', 'merged', 'rejected')),
  created_at timestamptz not null default now(),
  unique (interpretation_id)
);

create index if not exists evo_sources_source_ref_idx on public.evo_sources(source_system, source_ref);
create index if not exists evo_candidates_source_id_idx on public.evo_candidates(source_id);
create index if not exists evo_target_interpretations_target_id_idx on public.evo_target_interpretations(target_id);
create index if not exists evo_requests_status_idx on public.evo_requests(status);

-- Internal curator/service-role data. These tables live in public for the existing
-- application client, but are deliberately not exposed to anon/authenticated.
alter table public.evo_targets enable row level security;
alter table public.evo_target_candidate_types enable row level security;
alter table public.evo_sources enable row level security;
alter table public.evo_candidates enable row level security;
alter table public.evo_target_interpretations enable row level security;
alter table public.evo_interpretation_reasoning enable row level security;
alter table public.evo_requests enable row level security;

revoke all on table public.evo_targets from anon, authenticated;
revoke all on table public.evo_target_candidate_types from anon, authenticated;
revoke all on table public.evo_sources from anon, authenticated;
revoke all on table public.evo_candidates from anon, authenticated;
revoke all on table public.evo_target_interpretations from anon, authenticated;
revoke all on table public.evo_interpretation_reasoning from anon, authenticated;
revoke all on table public.evo_requests from anon, authenticated;

-- Seed only the currently real target system. No Dvārakā target is canonicalized.
insert into public.evo_targets (code, label, repo_ref, request_path, request_prefix, kind)
values (
  'noxia',
  'NOXIA',
  'thomaspeterkueper/noxiagame',
  'external-tasks/open/',
  'NOXIA-REQUEST',
  'game'
)
on conflict (code) do update set
  label = excluded.label,
  repo_ref = excluded.repo_ref,
  request_path = excluded.request_path,
  request_prefix = excluded.request_prefix,
  kind = excluded.kind;

insert into public.evo_target_candidate_types (target_id, type_code, description)
select t.id, seed.type_code, seed.description
from public.evo_targets t
cross join (
  values
    ('technology', 'Technical capability or artifact candidate'),
    ('building', 'Built infrastructure candidate'),
    ('material', 'Material or resource candidate'),
    ('process', 'Process or production-chain candidate'),
    ('mechanic', 'Target-system mechanic candidate'),
    ('mission', 'Mission or objective candidate')
) as seed(type_code, description)
where t.code = 'noxia'
on conflict (target_id, type_code) do update set
  description = excluded.description;
