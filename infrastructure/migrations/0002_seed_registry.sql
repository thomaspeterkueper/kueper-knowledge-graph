-- KUEPER Knowledge Graph
-- 0002 seed registry
-- Seeds systems and domains into Supabase operational index.

-- -----------------------------------------------------------------------------
-- Systems
-- -----------------------------------------------------------------------------

insert into kg_systems (id, name, role, repo, domain_id, status, visibility, data)
values
  (
    'SYS:KUEPER:knowledge-graph',
    'KUEPER Knowledge Graph',
    'master_system',
    'thomaspeterkueper/kueper-knowledge-graph',
    'DOM:L3:kg-kueper-com',
    'planned_public_endpoint',
    'internal',
    '{"owns":["entities","relations","ids","mappings","taxonomies","kxf_exports","system_registry","domain_registry","legal_registry","media_registry"],"publicEndpointPlanned":"https://kg.kueper.com"}'::jsonb
  ),
  (
    'SYS:KUEPER:kueper-com',
    'kueper.com',
    'published_knowledge_source',
    'thomaspeterkueper/kueper.com',
    'DOM:L3:kueper-com',
    'active',
    'public',
    '{"consumes":["documents","entities","relations","media_assets","shared_site_records"]}'::jsonb
  ),
  (
    'SYS:KUEPER:ssf',
    'Solar Science Foundation',
    'learning_platform',
    'thomaspeterkueper/solarsciencefoundation',
    'DOM:L3:solarsciencefoundation-org',
    'active',
    'public',
    '{"consumes":["entities","relations","documents","learning_modules","media_assets","shared_site_records"],"produces":["learning_modules","quizzes","progress","certificates","noxia_unlocks"]}'::jsonb
  ),
  (
    'SYS:KUEPER:noxia',
    'NOXIA Game',
    'game_and_simulation',
    'thomaspeterkueper/noxiagame',
    'DOM:L3:noxia-vercel-app',
    'active',
    'public',
    '{"consumes":["entities","relations","research","unlocks","buildings","media_assets","shared_site_records"],"produces":["game_states","colonies","trade","production"]}'::jsonb
  ),
  (
    'SYS:KUEPER:ota',
    'OverTime Archive',
    'archive_model_and_fiction_layer',
    'thomaspeterkueper/overtime-archive',
    'DOM:L3:overtimearchive-org',
    'active',
    'public',
    '{"consumes":["entities","documents","models","media_assets","shared_site_records"],"produces":["hypotheses","archives","alternative_models","fictionalisations"]}'::jsonb
  ),
  (
    'SYS:KUEPER:zereya',
    'Zereya',
    'narrative_project',
    'TBD',
    'DOM:L3:zereya-de',
    'planned',
    'restricted',
    '{"consumes":["narrative_entities","media_assets","shared_site_records"],"defaultVisibility":"restricted"}'::jsonb
  ),
  (
    'SYS:KUEPER:contracosmology',
    'Contracosmology',
    'model_and_cosmology_project',
    'TBD',
    'DOM:L3:contracosmology-org',
    'planned',
    'restricted',
    '{"consumes":["models","documents","media_assets","shared_site_records"],"defaultVisibility":"restricted"}'::jsonb
  ),
  (
    'SYS:KUEPER:feli',
    'Feli',
    'childrens_book_project',
    'TBD',
    'DOM:L3:feli-project',
    'candidate',
    'restricted',
    '{"consumes":["narrative_entities","media_assets","shared_site_records"],"defaultVisibility":"restricted"}'::jsonb
  ),
  (
    'SYS:KUEPER:soma-retep',
    'Soma Retep',
    'science_fiction_project',
    'TBD',
    'DOM:L3:soma-retep-project',
    'candidate',
    'restricted',
    '{"consumes":["narrative_entities","models","media_assets","shared_site_records"],"defaultVisibility":"restricted"}'::jsonb
  ),
  (
    'SYS:KUEPER:omnizedenz',
    'Omnizedenz',
    'philosophy_and_model_project',
    'TBD',
    null,
    'candidate',
    'restricted',
    '{"consumes":["concepts","models","documents","media_assets"],"defaultVisibility":"restricted"}'::jsonb
  ),
  (
    'SYS:KUEPER:bayt-al-mira',
    'Bayt al-Mira',
    'historical_narrative_project',
    'TBD',
    null,
    'candidate',
    'restricted',
    '{"consumes":["narrative_entities","places","documents","media_assets"],"defaultVisibility":"restricted"}'::jsonb
  ),
  (
    'SYS:KUEPER:heimat-aus-staub',
    'Heimat aus Staub',
    'family_history_project',
    'TBD',
    null,
    'candidate',
    'private',
    '{"consumes":["documents","places","persons","media_assets"],"defaultVisibility":"private"}'::jsonb
  ),
  (
    'SYS:KUEPER:nichts-gefragt',
    'Nichts gefragt',
    'literary_narrative_project',
    'TBD',
    null,
    'candidate',
    'restricted',
    '{"consumes":["narrative_entities","documents","media_assets"],"defaultVisibility":"restricted"}'::jsonb
  )
on conflict (id) do update set
  name = excluded.name,
  role = excluded.role,
  repo = excluded.repo,
  domain_id = excluded.domain_id,
  status = excluded.status,
  visibility = excluded.visibility,
  data = excluded.data,
  updated_at = now(),
  indexed_at = now();

-- -----------------------------------------------------------------------------
-- Domains
-- -----------------------------------------------------------------------------

insert into kg_domains (id, domain, system_id, role, status, visibility, data)
values
  ('DOM:L3:kg-kueper-com', 'kg.kueper.com', 'SYS:KUEPER:knowledge-graph', 'canonical_public_kg_endpoint', 'planned', 'public', '{"publishes":["KXF","ecosystem_registry","system_registry","domain_registry","legal_registry","media_registry"]}'::jsonb),
  ('DOM:L3:kueper-com', 'kueper.com', 'SYS:KUEPER:kueper-com', 'published_knowledge_website', 'active', 'public', '{"consumes":["KXF","legal_registry","media_registry"]}'::jsonb),
  ('DOM:L3:solarsciencefoundation-org', 'solarsciencefoundation.org', 'SYS:KUEPER:ssf', 'learning_platform', 'active', 'public', '{"consumes":["KXF","legal_registry","media_registry"]}'::jsonb),
  ('DOM:L3:overtimearchive-org', 'overtimearchive.org', 'SYS:KUEPER:ota', 'archive_and_model_layer', 'active', 'public', '{"consumes":["KXF","legal_registry","media_registry"]}'::jsonb),
  ('DOM:L3:noxia-vercel-app', 'noxiagame.vercel.app', 'SYS:KUEPER:noxia', 'game_application', 'active', 'public', '{"consumes":["KXF","legal_registry","media_registry"]}'::jsonb),
  ('DOM:L3:zereya-de', 'zereya.de', 'SYS:KUEPER:zereya', 'narrative_project_site', 'planned', 'public', '{"consumes":["KXF","legal_registry","narrative_entities","media_registry"]}'::jsonb),
  ('DOM:L3:contracosmology-org', 'contracosmology.org', 'SYS:KUEPER:contracosmology', 'model_and_cosmology_project_site', 'planned', 'public', '{"consumes":["KXF","legal_registry","models","documents","media_registry"]}'::jsonb),
  ('DOM:L3:feli-project', 'TBD-feli', 'SYS:KUEPER:feli', 'childrens_book_project_site', 'candidate', 'internal', '{"domain":"TBD","consumes":["KXF","legal_registry","narrative_entities","media_registry"]}'::jsonb),
  ('DOM:L3:soma-retep-project', 'TBD-soma-retep', 'SYS:KUEPER:soma-retep', 'science_fiction_project_site', 'candidate', 'internal', '{"domain":"TBD","consumes":["KXF","legal_registry","narrative_entities","models","media_registry"]}'::jsonb)
on conflict (id) do update set
  domain = excluded.domain,
  system_id = excluded.system_id,
  role = excluded.role,
  status = excluded.status,
  visibility = excluded.visibility,
  data = excluded.data,
  updated_at = now(),
  indexed_at = now();
