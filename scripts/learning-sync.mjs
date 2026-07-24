#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const LEARNING_DIR = path.join(ROOT, 'learning');
const EXPORT_PATH = path.join(ROOT, 'exports', 'kxf-learning-modules-0.1.json');
const WRITE = process.argv.includes('--write');

const canonicalPattern = /^[A-Z]{3,}-L\d+-\d{6}$/;

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

function loadExport() {
  const data = JSON.parse(fs.readFileSync(EXPORT_PATH, 'utf8'));
  const modules = data?.records?.learning_modules ?? [];
  const canonicalIds = new Set(modules.map((m) => m.id));
  const legacyToCanonical = new Map();

  for (const module of modules) {
    if (module.legacyId) legacyToCanonical.set(module.legacyId, module.id);
  }

  for (const mapping of data.legacyIdMappings ?? []) {
    if (mapping.legacy && mapping.canonicalViewId) {
      legacyToCanonical.set(mapping.legacy, mapping.canonicalViewId);
    }
  }

  return { canonicalIds, legacyToCanonical };
}

function parseRootScalar(text, key) {
  const re = new RegExp(`^${key}:\\s*(.+?)\\s*$`, 'm');
  const match = text.match(re);
  return match ? match[1].replace(/^['"]|['"]$/g, '') : null;
}

function resolveCanonical(moduleId, canonicalIds, legacyToCanonical) {
  if (!moduleId) return null;
  if (canonicalIds.has(moduleId)) return moduleId;
  if (legacyToCanonical.has(moduleId)) return legacyToCanonical.get(moduleId);

  if (moduleId.startsWith('LRN:SSF:')) {
    const suffix = moduleId.slice('LRN:SSF:'.length);
    if (canonicalIds.has(suffix)) return suffix;
  }

  return null;
}

function normalizeUnlocks(text) {
  const lines = text.split(/\r?\n/);
  const start = lines.findIndex((line) => /^unlocks:\s*$/.test(line));
  if (start < 0) return { text, rawAliases: [] };

  let end = start + 1;
  const entries = [];
  while (end < lines.length) {
    const line = lines[end];
    const item = line.match(/^\s{2}-\s+(.+?)\s*$/);
    if (item) {
      entries.push(item[1].replace(/^['"]|['"]$/g, ''));
      end += 1;
      continue;
    }
    if (/^\s*$/.test(line)) {
      end += 1;
      continue;
    }
    break;
  }

  const normative = entries.filter((entry) => entry.startsWith('UNL:NOX:'));
  const rawAliases = entries.filter((entry) => !entry.startsWith('UNL:NOX:'));
  if (rawAliases.length === 0) return { text, rawAliases };

  const replacement = ['unlocks:'];
  for (const entry of normative) replacement.push(`  - ${entry}`);
  replacement.push('planned_unlocks:');
  for (const entry of rawAliases) replacement.push(`  - ${entry}`);

  return {
    text: [...lines.slice(0, start), ...replacement, ...lines.slice(end)].join('\n'),
    rawAliases,
  };
}

function migrateFile(file, canonicalIds, legacyToCanonical) {
  const fullPath = path.join(LEARNING_DIR, file);
  let text = fs.readFileSync(fullPath, 'utf8');
  const moduleId = parseRootScalar(text, 'module_id');
  const legacyId = parseRootScalar(text, 'legacy_id');
  const canonical = resolveCanonical(moduleId, canonicalIds, legacyToCanonical);

  const result = {
    file,
    moduleId,
    canonical,
    idChanged: false,
    rawUnlocks: [],
    unresolved: false,
  };

  if (!moduleId) {
    result.unresolved = true;
    return result;
  }

  if (!canonical) {
    result.unresolved = !canonicalPattern.test(moduleId);
  } else if (canonical !== moduleId) {
    const idLine = new RegExp(`^module_id:\\s*${moduleId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'm');
    const replacement = legacyId
      ? `module_id: ${canonical}`
      : `module_id: ${canonical}\nlegacy_id: ${moduleId}`;
    text = text.replace(idLine, replacement);
    result.idChanged = true;
  }

  const unlockResult = normalizeUnlocks(text);
  text = unlockResult.text;
  result.rawUnlocks = unlockResult.rawAliases;

  if (WRITE && (result.idChanged || result.rawUnlocks.length > 0)) {
    fs.writeFileSync(fullPath, text.endsWith('\n') ? text : `${text}\n`, 'utf8');
  }

  return result;
}

if (!fs.existsSync(LEARNING_DIR)) fail('learning/ directory not found');
if (!fs.existsSync(EXPORT_PATH)) fail('KXF learning-module export not found');

const { canonicalIds, legacyToCanonical } = loadExport();
const files = fs.readdirSync(LEARNING_DIR)
  .filter((file) => /\.ya?ml$/i.test(file))
  .sort();

const results = files.map((file) => migrateFile(file, canonicalIds, legacyToCanonical));
const changed = results.filter((r) => r.idChanged);
const unlocks = results.filter((r) => r.rawUnlocks.length > 0);
const unresolved = results.filter((r) => r.unresolved);

console.log(`learning files: ${results.length}`);
console.log(`canonical IDs known in export: ${canonicalIds.size}`);
console.log(`legacy IDs with deterministic mapping: ${changed.length}`);
console.log(`files with raw unlock aliases: ${unlocks.length}`);
console.log(`unmapped legacy IDs: ${unresolved.length}`);

for (const r of changed) console.log(`MAP  ${r.file}: ${r.moduleId} -> ${r.canonical}`);
for (const r of unlocks) console.log(`UNLOCK ${r.file}: ${r.rawUnlocks.join(', ')}`);
for (const r of unresolved) console.log(`REVIEW ${r.file}: ${r.moduleId ?? '<missing module_id>'}`);

if (unresolved.length > 0) {
  console.error('Unmapped legacy IDs remain. Curator mapping is required; no canonical IDs were invented.');
  process.exitCode = 2;
}

if (!WRITE && (changed.length > 0 || unlocks.length > 0)) {
  console.log('Dry run only. Re-run with --write to apply deterministic migrations.');
}
