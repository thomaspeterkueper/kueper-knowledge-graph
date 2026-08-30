#!/usr/bin/env node
import fs from 'node:fs';

const file = 'exports/kxf-learning-modules-0.1.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const modules = data.records?.learning_modules;
const paths = data.records?.paths;
if (!Array.isArray(modules) || !Array.isArray(paths)) throw new Error('KXF learning module/path records missing');

const id = 'PHY-L2-000005';
const legacyId = 'LRN:SSF:PHY-ENERGIE-ARBEIT-0001';
const pathId = 'PATH:SSF:PHY-ENERGIE-ARBEIT-0001';
const requestId = 'EXT-NOX-KG-20260829-energy-work-gravitational-well-module';

if (!modules.some((m) => m.id === id)) {
  modules.push({
    id,
    version: '0.1.0',
    created: '2026-08-30',
    modified: '2026-08-30',
    title: {
      de: 'Energie & Arbeit — Gravitationspotential und Gravitationsbrunnen',
      en: 'Energy & Work — Gravitational Potential and Gravity Wells'
    },
    meta: {
      title: 'Energie & Arbeit — Gravitationspotential und Gravitationsbrunnen',
      subject: 'PHY',
      type: 'brueckenmodul',
      status: 'planned',
      entryQuestion: 'Warum muss man Arbeit verrichten, um aus einem Gravitationsbrunnen herauszukommen?',
      depthMin: 1,
      depthMax: null,
      durationMin: 5,
      durationMax: 10,
      entryQuestions: {
        L0: 'Warum kostet es Energie, einen Planeten zu verlassen?',
        L1: 'Wie hängen Arbeit, potentielle Energie und Gravitationspotential zusammen?',
        L2: 'Wie beschreibt ein Gravitationsbrunnen die energetische Bindung in einem Gravitationsfeld?'
      },
      scope: ['Arbeit', 'Energie', 'potentielle Energie', 'Gravitationspotential', 'gravitationsbrunnen']
    },
    assets: { text: [], svg: [], image: [], video: [], audio: [], experiment: [] },
    dependencies: { requires: ['PHY-L1-000025'], moduleUnlocks: [], pathUnlocks: [], archiveUnlocks: [] },
    branches: [],
    noxiaGrants: [],
    legacyId,
    createdFromRequest: requestId,
    interactiveRefs: ['gravitationsbrunnen'],
    source: {
      authoringFile: 'learning/ssf-phy-energie-arbeit-gravitationsbrunnen.yaml',
      ssfPathId: pathId,
      curator: 'T.P.K.'
    }
  });
}

if (!paths.some((p) => p.id === pathId)) {
  paths.push({
    id: pathId,
    type: 'Path',
    purpose: 'learn',
    target: id,
    status: 'draft_productive',
    sourceSystem: 'SSF'
  });
}

data.version = '0.2.11';
data.modified = '2026-08-30T16:55:00+02:00';
data.updated = '2026-08-30';
data.sourceDocuments = Array.from(new Set([...(data.sourceDocuments ?? []), requestId]));

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
console.log(`${id} -> ${pathId}`);
