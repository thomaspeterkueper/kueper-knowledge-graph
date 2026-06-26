-- KUEPER Knowledge Graph
-- 0003 seed L0 foundation concepts

insert into kg_entities (id, type, layer, name, domain, status, visibility, source_path, data)
values
  (
    'CON:L0:information',
    'Concept',
    'L0',
    'Information',
    array['MET','INF','PHY'],
    'foundation',
    'public',
    'infrastructure/migrations/0003_seed_l0_foundation.sql',
    '{"title":{"de":"Information","en":"Information"},"description":{"de":"Grundlegende Unterscheidbarkeit, Struktur oder Darstellung von Zustaenden, Mustern und Beziehungen.","en":"Fundamental distinguishability, structure or representation of states, patterns and relations."},"foundationNode":true}'::jsonb
  ),
  (
    'CON:L0:mathematik',
    'Concept',
    'L0',
    'Mathematik',
    array['MAT'],
    'foundation',
    'public',
    'infrastructure/migrations/0003_seed_l0_foundation.sql',
    '{"title":{"de":"Mathematik","en":"Mathematics"},"description":{"de":"Formale Sprache fuer Mengen, Muster, Strukturen, Zahlen, Raeume und Beziehungen.","en":"Formal language for sets, patterns, structures, numbers, spaces and relations."},"foundationNode":true}'::jsonb
  ),
  (
    'CON:L0:energie',
    'Concept',
    'L0',
    'Energie',
    array['PHY'],
    'foundation',
    'public',
    'infrastructure/migrations/0003_seed_l0_foundation.sql',
    '{"title":{"de":"Energie","en":"Energy"},"description":{"de":"Grundlegende physikalische Erhaltungsgroesse und Faehigkeit, Veraenderung, Arbeit oder Wirkung hervorzubringen.","en":"Fundamental conserved physical quantity and capacity to produce change, work or effect."},"foundationNode":true}'::jsonb
  ),
  (
    'CON:L0:materie',
    'Concept',
    'L0',
    'Materie',
    array['PHY','CHE'],
    'foundation',
    'public',
    'infrastructure/migrations/0003_seed_l0_foundation.sql',
    '{"title":{"de":"Materie","en":"Matter"},"description":{"de":"Physische Substanz oder Traeger von Masse, Struktur und Wechselwirkung.","en":"Physical substance or carrier of mass, structure and interaction."},"foundationNode":true}'::jsonb
  ),
  (
    'CON:L0:raum',
    'Concept',
    'L0',
    'Raum',
    array['PHY','MET'],
    'foundation',
    'public',
    'infrastructure/migrations/0003_seed_l0_foundation.sql',
    '{"title":{"de":"Raum","en":"Space"},"description":{"de":"Ordnungsstruktur von Ausdehnung, Lage, Abstand und Koexistenz physischer oder modellierter Objekte.","en":"Ordering structure of extension, position, distance and coexistence of physical or modeled objects."},"foundationNode":true}'::jsonb
  ),
  (
    'CON:L0:zeit',
    'Concept',
    'L0',
    'Zeit',
    array['PHY','MET'],
    'foundation',
    'public',
    'infrastructure/migrations/0003_seed_l0_foundation.sql',
    '{"title":{"de":"Zeit","en":"Time"},"description":{"de":"Ordnungsdimension von Veraenderung, Dauer, Abfolge, Dynamik und Erinnerung.","en":"Ordering dimension of change, duration, sequence, dynamics and memory."},"foundationNode":true}'::jsonb
  ),
  (
    'CON:L0:leben',
    'Concept',
    'L0',
    'Leben',
    array['BIO','AST','MET'],
    'foundation',
    'public',
    'infrastructure/migrations/0003_seed_l0_foundation.sql',
    '{"title":{"de":"Leben","en":"Life"},"description":{"de":"Selbsterhaltende, organisierte und evolutionsfaehige Struktur von Materie und Information.","en":"Self-maintaining, organized and evolution-capable structure of matter and information."},"foundationNode":true}'::jsonb
  ),
  (
    'CON:L0:sprache',
    'Concept',
    'L0',
    'Sprache',
    array['LIN','MET','INF'],
    'foundation',
    'public',
    'infrastructure/migrations/0003_seed_l0_foundation.sql',
    '{"title":{"de":"Sprache","en":"Language"},"description":{"de":"System zur Kodierung, Uebertragung, Deutung und Speicherung von Bedeutung und Information.","en":"System for encoding, transmitting, interpreting and storing meaning and information."},"foundationNode":true}'::jsonb
  ),
  (
    'CON:L0:bewusstsein',
    'Concept',
    'L0',
    'Bewusstsein',
    array['PSY','NEU','MET'],
    'foundation',
    'restricted',
    'infrastructure/migrations/0003_seed_l0_foundation.sql',
    '{"title":{"de":"Bewusstsein","en":"Consciousness"},"description":{"de":"Erleben, Selbstbezug und integrierende Verarbeitung von Wahrnehmung, Information und Bedeutung.","en":"Experience, self-reference and integrative processing of perception, information and meaning."},"foundationNode":true,"epistemicStatus":"theoretical"}'::jsonb
  ),
  (
    'CON:L0:komplexitaet',
    'Concept',
    'L0',
    'Komplexitaet',
    array['SYS','MAT','MET'],
    'foundation',
    'public',
    'infrastructure/migrations/0003_seed_l0_foundation.sql',
    '{"title":{"de":"Komplexitaet","en":"Complexity"},"description":{"de":"Eigenschaft von Systemen, deren Verhalten aus vielen wechselwirkenden Teilen, Ebenen oder Regeln entsteht.","en":"Property of systems whose behavior emerges from many interacting parts, layers or rules."},"foundationNode":true}'::jsonb
  )
on conflict (id) do update set
  type = excluded.type,
  layer = excluded.layer,
  name = excluded.name,
  domain = excluded.domain,
  status = excluded.status,
  visibility = excluded.visibility,
  source_path = excluded.source_path,
  data = excluded.data,
  updated_at = now(),
  indexed_at = now();
