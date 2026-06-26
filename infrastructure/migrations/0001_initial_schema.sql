-- KUEPER Knowledge Graph
-- Initial Supabase / PostgreSQL schema
-- Repo remains canonical master. Database is operational index.

create extension if not exists pgcrypto;

-- -----------------------------------------------------------------------------
-- Common enums
-- -----------------------------------------------------------------------------

do $$ begin
  create type kg_visibility as enum ('public', 'members', 'internal', 'restricted', 'private');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type kg_import_status as enum ('pending', 'imported', 'validated', 'failed', 'skipped');
exception
  when duplicate_object then null;
end $$;

-- -----------------------------------------------------------------------------
-- Entities
-- -----------------------------------------------------------------------------

create table if not exists kg_entities (
  id text primary key,
  type text not null,
  layer text,
  name text,
  domain text[],
  status text,
  visibility kg_visibility not null default 'restricted',
  source_path text,
  data jsonb not null default '{}'::jsonb,
  created_from_request text,
  updated_at timestamptz not null default now(),
  indexed_at timestamptz not null default now()
);

create index if not exists idx_kg_entities_type on kg_entities(type);
create index if not exists idx_kg_entities_layer on kg_entities(layer);
create index if not exists idx_kg_entities_visibility on kg_entities(visibility);
create index if not exists idx_kg_entities_domain on kg_entities using gin(domain);
create index if not exists idx_kg_entities_data on kg_entities using gin(data);

-- -----------------------------------------------------------------------------
-- Relations
-- -----------------------------------------------------------------------------

create table if not exists kg_relations (
  id text primary key,
  relation_type text not null,
  source_id text not null,
  target_id text not null,
  status text,
  visibility kg_visibility not null default 'restricted',
  source_path text,
  data jsonb not null default '{}'::jsonb,
  created_from_request text,
  updated_at timestamptz not null default now(),
  indexed_at timestamptz not null default now()
);

create index if not exists idx_kg_relations_type on kg_relations(relation_type);
create index if not exists idx_kg_relations_source on kg_relations(source_id);
create index if not exists idx_kg_relations_target on kg_relations(target_id);
create index if not exists idx_kg_relations_visibility on kg_relations(visibility);
create index if not exists idx_kg_relations_data on kg_relations using gin(data);

-- -----------------------------------------------------------------------------
-- Documents
-- -----------------------------------------------------------------------------

create table if not exists kg_documents (
  id text primary key,
  type text,
  title text,
  system_id text,
  repo text,
  path text,
  status text,
  visibility kg_visibility not null default 'restricted',
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  indexed_at timestamptz not null default now()
);

create index if not exists idx_kg_documents_system on kg_documents(system_id);
create index if not exists idx_kg_documents_visibility on kg_documents(visibility);
create index if not exists idx_kg_documents_data on kg_documents using gin(data);

-- -----------------------------------------------------------------------------
-- Systems and domains
-- -----------------------------------------------------------------------------

create table if not exists kg_systems (
  id text primary key,
  name text not null,
  role text,
  repo text,
  domain_id text,
  status text,
  visibility kg_visibility not null default 'internal',
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  indexed_at timestamptz not null default now()
);

create index if not exists idx_kg_systems_visibility on kg_systems(visibility);
create index if not exists idx_kg_systems_data on kg_systems using gin(data);

create table if not exists kg_domains (
  id text primary key,
  domain text not null unique,
  system_id text,
  role text,
  status text,
  visibility kg_visibility not null default 'public',
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  indexed_at timestamptz not null default now()
);

create index if not exists idx_kg_domains_system on kg_domains(system_id);
create index if not exists idx_kg_domains_visibility on kg_domains(visibility);
create index if not exists idx_kg_domains_data on kg_domains using gin(data);

-- -----------------------------------------------------------------------------
-- Media assets
-- -----------------------------------------------------------------------------

create table if not exists kg_media_assets (
  id text primary key,
  media_type text not null,
  title text,
  format text,
  visibility kg_visibility not null default 'restricted',
  source_storage text,
  source_path text,
  source_url text,
  rights jsonb not null default '{}'::jsonb,
  variants jsonb not null default '[]'::jsonb,
  relates_to text[] not null default '{}',
  used_by text[] not null default '{}',
  data jsonb not null default '{}'::jsonb,
  created_from_request text,
  updated_at timestamptz not null default now(),
  indexed_at timestamptz not null default now()
);

create index if not exists idx_kg_media_type on kg_media_assets(media_type);
create index if not exists idx_kg_media_visibility on kg_media_assets(visibility);
create index if not exists idx_kg_media_relates_to on kg_media_assets using gin(relates_to);
create index if not exists idx_kg_media_used_by on kg_media_assets using gin(used_by);
create index if not exists idx_kg_media_data on kg_media_assets using gin(data);

-- -----------------------------------------------------------------------------
-- Requests
-- -----------------------------------------------------------------------------

create table if not exists kg_requests (
  id text primary key,
  requester text not null,
  request_type text not null,
  purpose text,
  priority text,
  blocking text,
  status text not null default 'open',
  source_path text,
  requested_content text[],
  suggested_ids text[],
  target_export text,
  created_objects text[] not null default '{}',
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  indexed_at timestamptz not null default now()
);

create index if not exists idx_kg_requests_requester on kg_requests(requester);
create index if not exists idx_kg_requests_type on kg_requests(request_type);
create index if not exists idx_kg_requests_status on kg_requests(status);
create index if not exists idx_kg_requests_data on kg_requests using gin(data);

-- -----------------------------------------------------------------------------
-- Mappings
-- -----------------------------------------------------------------------------

create table if not exists kg_mappings (
  id text primary key,
  mapping_type text not null,
  source_id text not null,
  target_id text not null,
  source_system text,
  target_system text,
  status text,
  visibility kg_visibility not null default 'internal',
  data jsonb not null default '{}'::jsonb,
  created_from_request text,
  updated_at timestamptz not null default now(),
  indexed_at timestamptz not null default now()
);

create index if not exists idx_kg_mappings_type on kg_mappings(mapping_type);
create index if not exists idx_kg_mappings_source on kg_mappings(source_id);
create index if not exists idx_kg_mappings_target on kg_mappings(target_id);
create index if not exists idx_kg_mappings_systems on kg_mappings(source_system, target_system);
create index if not exists idx_kg_mappings_data on kg_mappings using gin(data);

-- -----------------------------------------------------------------------------
-- Exports
-- -----------------------------------------------------------------------------

create table if not exists kg_exports (
  id text primary key,
  schema_version text not null,
  export_type text not null,
  path text,
  status text,
  visibility kg_visibility not null default 'public',
  data jsonb not null default '{}'::jsonb,
  generated_at timestamptz,
  updated_at timestamptz not null default now(),
  indexed_at timestamptz not null default now()
);

create index if not exists idx_kg_exports_type on kg_exports(export_type);
create index if not exists idx_kg_exports_visibility on kg_exports(visibility);
create index if not exists idx_kg_exports_data on kg_exports using gin(data);

-- -----------------------------------------------------------------------------
-- Import log
-- -----------------------------------------------------------------------------

create table if not exists kg_import_log (
  id uuid primary key default gen_random_uuid(),
  source_path text not null,
  object_id text,
  object_type text,
  status kg_import_status not null default 'pending',
  message text,
  data jsonb not null default '{}'::jsonb,
  imported_at timestamptz not null default now()
);

create index if not exists idx_kg_import_log_source_path on kg_import_log(source_path);
create index if not exists idx_kg_import_log_object on kg_import_log(object_id, object_type);
create index if not exists idx_kg_import_log_status on kg_import_log(status);

-- -----------------------------------------------------------------------------
-- Public views
-- -----------------------------------------------------------------------------

create or replace view kg_public_entities as
select * from kg_entities where visibility = 'public';

create or replace view kg_public_documents as
select * from kg_documents where visibility = 'public';

create or replace view kg_public_domains as
select * from kg_domains where visibility = 'public';

create or replace view kg_public_media_assets as
select * from kg_media_assets where visibility = 'public';

create or replace view kg_public_exports as
select * from kg_exports where visibility = 'public';

-- -----------------------------------------------------------------------------
-- Row Level Security preparation
-- -----------------------------------------------------------------------------

alter table kg_entities enable row level security;
alter table kg_relations enable row level security;
alter table kg_documents enable row level security;
alter table kg_systems enable row level security;
alter table kg_domains enable row level security;
alter table kg_media_assets enable row level security;
alter table kg_requests enable row level security;
alter table kg_mappings enable row level security;
alter table kg_exports enable row level security;
alter table kg_import_log enable row level security;

-- Initial policy: authenticated/service contexts can read all indexed tables.
-- Public API should use curated views or server-side endpoints, not raw tables.

create policy if not exists "Authenticated read kg_entities" on kg_entities
  for select to authenticated using (true);
create policy if not exists "Authenticated read kg_relations" on kg_relations
  for select to authenticated using (true);
create policy if not exists "Authenticated read kg_documents" on kg_documents
  for select to authenticated using (true);
create policy if not exists "Authenticated read kg_systems" on kg_systems
  for select to authenticated using (true);
create policy if not exists "Authenticated read kg_domains" on kg_domains
  for select to authenticated using (true);
create policy if not exists "Authenticated read kg_media_assets" on kg_media_assets
  for select to authenticated using (true);
create policy if not exists "Authenticated read kg_requests" on kg_requests
  for select to authenticated using (true);
create policy if not exists "Authenticated read kg_mappings" on kg_mappings
  for select to authenticated using (true);
create policy if not exists "Authenticated read kg_exports" on kg_exports
  for select to authenticated using (true);
create policy if not exists "Authenticated read kg_import_log" on kg_import_log
  for select to authenticated using (true);
