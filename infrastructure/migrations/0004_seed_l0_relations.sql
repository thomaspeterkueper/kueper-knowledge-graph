-- KUEPER Knowledge Graph
-- 0004 seed L0 foundation relations
-- First technical graph edges for L0 foundation concepts.

insert into kg_relations (id, relation_type, source_id, target_id, status, visibility, source_path, data)
values
  (
    'REL:L0:000001',
    'supports',
    'CON:L0:information',
    'CON:L0:mathematik',
    'foundation',
    'public',
    'infrastructure/migrations/0004_seed_l0_relations.sql',
    '{"label":{"de":"unterstuetzt","en":"supports"},"description":{"de":"Information bildet eine Grundlage fuer formale Strukturen und mathematische Beschreibung.","en":"Information forms a basis for formal structures and mathematical description."}}'::jsonb
  ),
  (
    'REL:L0:000002',
    'describes',
    'CON:L0:mathematik',
    'CON:L0:energie',
    'foundation',
    'public',
    'infrastructure/migrations/0004_seed_l0_relations.sql',
    '{"label":{"de":"beschreibt","en":"describes"},"description":{"de":"Mathematik ermoeglicht die formale Beschreibung von Energie und ihrer Erhaltung.","en":"Mathematics enables formal description of energy and its conservation."}}'::jsonb
  ),
  (
    'REL:L0:000003',
    'interacts_with',
    'CON:L0:energie',
    'CON:L0:materie',
    'foundation',
    'public',
    'infrastructure/migrations/0004_seed_l0_relations.sql',
    '{"label":{"de":"wechselwirkt mit","en":"interacts with"},"description":{"de":"Energie und Materie sind in physikalischen Prozessen eng gekoppelt.","en":"Energy and matter are closely coupled in physical processes."}}'::jsonb
  ),
  (
    'REL:L0:000004',
    'contains',
    'CON:L0:raum',
    'CON:L0:materie',
    'foundation',
    'public',
    'infrastructure/migrations/0004_seed_l0_relations.sql',
    '{"label":{"de":"enthaelt","en":"contains"},"description":{"de":"Raum beschreibt Lage, Ausdehnung und Koexistenz von Materie.","en":"Space describes position, extension and coexistence of matter."}}'::jsonb
  ),
  (
    'REL:L0:000005',
    'orders',
    'CON:L0:zeit',
    'CON:L0:energie',
    'foundation',
    'public',
    'infrastructure/migrations/0004_seed_l0_relations.sql',
    '{"label":{"de":"ordnet","en":"orders"},"description":{"de":"Zeit ordnet Veraenderung und Dynamik, in denen Energie wirksam wird.","en":"Time orders change and dynamics in which energy becomes effective."}}'::jsonb
  ),
  (
    'REL:L0:000006',
    'encodes',
    'CON:L0:sprache',
    'CON:L0:information',
    'foundation',
    'public',
    'infrastructure/migrations/0004_seed_l0_relations.sql',
    '{"label":{"de":"kodiert","en":"encodes"},"description":{"de":"Sprache kodiert Information, Bedeutung und Beziehungen.","en":"Language encodes information, meaning and relations."}}'::jsonb
  ),
  (
    'REL:L0:000007',
    'processes',
    'CON:L0:bewusstsein',
    'CON:L0:information',
    'foundation',
    'restricted',
    'infrastructure/migrations/0004_seed_l0_relations.sql',
    '{"label":{"de":"verarbeitet","en":"processes"},"description":{"de":"Bewusstsein wird als Verarbeitung und Integration von Information modelliert.","en":"Consciousness is modeled as processing and integration of information."},"epistemicStatus":"theoretical"}'::jsonb
  ),
  (
    'REL:L0:000008',
    'emerges_from',
    'CON:L0:leben',
    'CON:L0:komplexitaet',
    'foundation',
    'public',
    'infrastructure/migrations/0004_seed_l0_relations.sql',
    '{"label":{"de":"emergiert aus","en":"emerges from"},"description":{"de":"Leben setzt organisierte Komplexitaet von Materie, Energie und Information voraus.","en":"Life presupposes organized complexity of matter, energy and information."}}'::jsonb
  )
on conflict (id) do update set
  relation_type = excluded.relation_type,
  source_id = excluded.source_id,
  target_id = excluded.target_id,
  status = excluded.status,
  visibility = excluded.visibility,
  source_path = excluded.source_path,
  data = excluded.data,
  updated_at = now(),
  indexed_at = now();
