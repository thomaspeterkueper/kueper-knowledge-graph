#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const EXPORT = path.join(ROOT, 'exports', 'kxf-learning-modules-0.1.json');
const OPEN_REQ = path.join(ROOT, 'external-tasks', 'open', 'EXT-SSF-KG-20260829-noxia-unlock-learning-module-identities.md');
const DONE_REQ = path.join(ROOT, 'external-tasks', 'done', 'EXT-SSF-KG-20260829-noxia-unlock-learning-module-identities.md');
const REQUEST_ID = 'EXT-SSF-KG-20260829-noxia-unlock-learning-module-identities';

const modules = [
  {
    id: 'PHY-L1-000025', legacyId: 'LRN:SSF:PHY-1301', subject: 'PHY',
    title: 'Energieversorgung — Grundlagen', unlock: 'UNL:NOX:power-generation',
    requires: [], moduleUnlocks: ['BIO-L1-000002','PHY-L1-000027','ENG-L1-000007'],
    scope: ['Energie', 'Leistung', 'Energieumwandlung', 'Stromversorgung']
  },
  {
    id: 'ENG-L1-000005', legacyId: 'LRN:SSF:NOX-RESOURCE-EXTRACTION', subject: 'ENG',
    title: 'Rohstoffgewinnung — Prozesskette', unlock: 'UNL:NOX:resource-extraction',
    requires: [], moduleUnlocks: [],
    scope: ['Deposit', 'Entnahme und Abbau', 'Zerkleinerung', 'Trennung und Anreicherung', 'Aufbereitung', 'Ausbeute', 'Reinheit', 'Energiebedarf', 'Wasserbedarf', 'Reststoffe']
  },
  {
    id: 'CHE-L1-000015', legacyId: 'LRN:SSF:NOX-WATER-PROCESSING', subject: 'CHE',
    title: 'Wasseraufbereitung — Grundlagen', unlock: 'UNL:NOX:water-processing',
    requires: [], moduleUnlocks: ['BIO-L1-000002','ENG-L1-000009'],
    scope: ['Rohwasserqualität', 'Sedimentation', 'Filtration', 'Adsorption', 'Desinfektion', 'Membranverfahren', 'Umkehrosmose', 'Destillation', 'Recycling']
  },
  {
    id: 'PHY-L1-000026', legacyId: 'LRN:SSF:NOX-PRESSURE-SYSTEMS', subject: 'PHY',
    title: 'Drucksysteme und Druckhüllen', unlock: 'UNL:NOX:pressure-systems',
    requires: [], moduleUnlocks: ['ENG-L1-000006','BIO-L1-000002'],
    scope: ['Druck', 'Gasverhalten', 'gasdichte Druckhülle']
  },
  {
    id: 'ENG-L1-000006', legacyId: 'LRN:SSF:NOX-AIRLOCK', subject: 'ENG',
    title: 'Luftschleusen', unlock: 'UNL:NOX:airlock',
    requires: ['PHY-L1-000026'], moduleUnlocks: ['ENG-L1-000009'],
    scope: ['Luftschleuse', 'Druckausgleich', 'Druckzonentrennung']
  },
  {
    id: 'BIO-L1-000002', legacyId: 'LRN:SSF:NOX-LIFE-SUPPORT', subject: 'BIO',
    title: 'Lebenserhaltungssysteme', unlock: 'UNL:NOX:life-support',
    requires: ['PHY-L1-000026','CHE-L1-000015','PHY-L1-000025'], moduleUnlocks: ['ENG-L1-000008','ENG-L1-000009'],
    scope: ['Sauerstoffversorgung', 'CO2-Abscheidung', 'Luftumwälzung', 'Wasserintegration']
  },
  {
    id: 'PHY-L1-000027', legacyId: 'LRN:SSF:NOX-THERMAL-CONTROL', subject: 'PHY',
    title: 'Thermalkontrolle', unlock: 'UNL:NOX:thermal-control',
    requires: ['PHY-L1-000025'], moduleUnlocks: ['ENG-L1-000009'],
    scope: ['Isolation', 'Heizen', 'Kühlen', 'Wärmetransport']
  },
  {
    id: 'PHY-L1-000028', legacyId: 'LRN:SSF:NOX-RADIATION-PROTECTION', subject: 'PHY',
    title: 'Strahlenschutz für Habitate', unlock: 'UNL:NOX:radiation-protection',
    requires: [], moduleUnlocks: ['ENG-L1-000009'],
    scope: ['extraterrestrischer Strahlenschutz', 'Abschirmung', 'geschützter Aufenthaltsbereich']
  },
  {
    id: 'ENG-L1-000007', legacyId: 'LRN:SSF:NOX-ENVIRONMENT-MONITORING', subject: 'ENG',
    title: 'Umgebungsüberwachung', unlock: 'UNL:NOX:environment-monitoring',
    requires: ['PHY-L1-000025'], moduleUnlocks: ['ENG-L1-000008','ENG-L1-000009'],
    scope: ['Sensorik', 'kritische Habitatparameter', 'Überwachung']
  },
  {
    id: 'ENG-L1-000008', legacyId: 'LRN:SSF:NOX-HABITAT-REDUNDANCY', subject: 'ENG',
    title: 'Redundanz und Fehlertoleranz im Habitat', unlock: 'UNL:NOX:habitat-redundancy',
    requires: ['BIO-L1-000002','ENG-L1-000007'], moduleUnlocks: ['ENG-L1-000009'],
    scope: ['Single Points of Failure', 'Redundanz', 'Fehlertoleranz']
  },
  {
    id: 'ENG-L1-000009', legacyId: 'LRN:SSF:NOX-MARS-HABITAT', subject: 'ENG',
    title: 'Mars-Habitat — Systemintegration', unlock: 'UNL:NOX:mars-habitat',
    requires: ['CHE-L1-000015','PHY-L1-000025','PHY-L1-000026','ENG-L1-000006','BIO-L1-000002','PHY-L1-000027','PHY-L1-000028','ENG-L1-000007','ENG-L1-000008'], moduleUnlocks: [],
    scope: ['Drucksystem', 'Luftschleuse', 'Lebenserhaltung', 'Thermalkontrolle', 'Strahlenschutz', 'Umgebungsüberwachung', 'Redundanz', 'Systemintegration']
  }
];

function fail(message) { throw new Error(message); }
function makeRecord(m) {
  return {
    id: m.id,
    version: '0.1.0',
    created: '2026-08-29',
    modified: '2026-08-29',
    title: { de: m.title, en: m.title },
    meta: {
      title: m.title,
      subject: m.subject,
      type: 'grundmodul',
      status: 'planned',
      entryQuestion: m.title,
      depthMin: 0,
      depthMax: null,
      durationMin: 3,
      durationMax: 7,
      entryQuestions: { L0: m.title, L1: m.title, L2: null },
      scope: m.scope
    },
    assets: { text: [], svg: [], image: [], video: [], audio: [], experiment: [] },
    dependencies: { requires: m.requires, moduleUnlocks: m.moduleUnlocks, pathUnlocks: [], archiveUnlocks: [] },
    branches: [],
    noxiaGrants: [],
    legacyId: m.legacyId,
    createdFromRequest: REQUEST_ID,
    unlocks: [m.unlock]
  };
}

const data = JSON.parse(fs.readFileSync(EXPORT, 'utf8'));
const list = data?.records?.learning_modules;
if (!Array.isArray(list)) fail('records.learning_modules missing');

const ids = new Map(list.map((m) => [m.id, m]));
const legacy = new Map(list.filter((m) => m.legacyId).map((m) => [m.legacyId, m]));
const unlockOwners = new Map();
for (const m of list) for (const u of (m.unlocks ?? [])) unlockOwners.set(u, m.id);

for (const m of modules) {
  const existingById = ids.get(m.id);
  const existingByLegacy = legacy.get(m.legacyId);
  const existingUnlockOwner = unlockOwners.get(m.unlock);
  if (existingById && existingById.legacyId !== m.legacyId) fail(`ID collision ${m.id}`);
  if (existingByLegacy && existingByLegacy.id !== m.id) fail(`legacyId collision ${m.legacyId} -> ${existingByLegacy.id}`);
  if (existingUnlockOwner && existingUnlockOwner !== m.id) {
    m.reuseId = existingUnlockOwner;
  }
}

const idRewrite = new Map(modules.filter((m) => m.reuseId).map((m) => [m.id, m.reuseId]));
const rewrite = (id) => idRewrite.get(id) ?? id;

for (const m of modules) {
  if (m.reuseId) continue;
  if (ids.has(m.id)) continue;
  const record = makeRecord({ ...m, requires: m.requires.map(rewrite), moduleUnlocks: m.moduleUnlocks.map(rewrite) });
  list.push(record);
  ids.set(record.id, record);
  if (record.legacyId) legacy.set(record.legacyId, record);
}

for (const m of modules) {
  const ownerId = m.reuseId ?? m.id;
  const owner = ids.get(ownerId);
  if (!owner) fail(`missing owner for ${m.unlock}`);
  owner.unlocks = Array.from(new Set([...(owner.unlocks ?? []), m.unlock]));
}

for (const m of modules) {
  if (m.reuseId) continue;
  const rec = ids.get(m.id);
  rec.dependencies.requires = rec.dependencies.requires.map(rewrite);
  rec.dependencies.moduleUnlocks = Array.from(new Set(rec.dependencies.moduleUnlocks.map(rewrite).filter((id) => id !== rec.id)));
}

data.version = '0.2.9';
data.modified = '2026-08-29T13:45:00+02:00';
data.updated = '2026-08-29';
data.sourceDocuments = Array.from(new Set([...(data.sourceDocuments ?? []), REQUEST_ID]));

fs.writeFileSync(EXPORT, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

if (fs.existsSync(OPEN_REQ)) {
  let req = fs.readFileSync(OPEN_REQ, 'utf8');
  req = req.replace('**Status:** open', '**Status:** done');
  req += '\n\n## KG-Ergebnis 2026-08-29\n\nDie angeforderten NOXIA-Unlocks sind im Learning-Modules-KXF kanonischen Modulidentitäten zugeordnet. Der bereits bestehende Unlock UNL:NOX:power-generation wird über die bestehende SSF-Identität LRN:SSF:PHY-1301 kanonisiert; die übrigen angeforderten Unlocks erhalten eigene kanonische Modulrecords. Voraussetzungen werden ausschließlich als KG/KXF-Modulabhängigkeiten abgebildet. Es wurden keine neuen NOXIA-Unlock-IDs erfunden und keine SSF-Didaktikinhalte übernommen.\n';
  fs.mkdirSync(path.dirname(DONE_REQ), { recursive: true });
  fs.writeFileSync(DONE_REQ, req, 'utf8');
  fs.unlinkSync(OPEN_REQ);
}

console.log(`learning modules total: ${list.length}`);
for (const m of modules) console.log(`${m.unlock} -> ${m.reuseId ?? m.id}`);
