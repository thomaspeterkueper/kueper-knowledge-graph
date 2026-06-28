-- KUEPER Knowledge Graph
-- 0028 create import jobs table
-- Operational table for online import workflows.

create table if not exists kg_import_jobs (
  id uuid primary key default gen_random_uuid(),
  job_type text not null,
  status text not null default 'pending',
  source_name text,
  source_path text,
  target_collection text,
  default_visibility text not null default 'restricted',
  default_language text not null default 'LANG:L0:de',
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  indexed_at timestamptz not null default now()
);

create index if not exists idx_kg_import_jobs_job_type on kg_import_jobs(job_type);
create index if not exists idx_kg_import_jobs_status on kg_import_jobs(status);
create index if not exists idx_kg_import_jobs_created_at on kg_import_jobs(created_at desc);
create index if not exists idx_kg_import_jobs_data on kg_import_jobs using gin(data);

select
  'kg_import_jobs' as table_name,
  count(*) as row_count
from kg_import_jobs;
