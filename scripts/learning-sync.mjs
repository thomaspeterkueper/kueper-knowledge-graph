#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const LEARNING_DIR = path.join(ROOT, 'learning');
const EXPORT_PATH = path.join(ROOT, 'exports', 'kxf-learning-modules-0.1.json');
const WRITE = process.argv.includes('--write');

const canonicalPattern = /^[A-Z]{3,}-L\d+-\d{6}$/;

function fail(message) {
  throw new Error(message);
}

function normalizedText(value) {
  return String(value ?? '')
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function moduleTitle(module) {
  if (typeof module?.meta?.title === 'string') return module.meta.title;
  if (typeof module?.title === 'string') return module.title;
  if (typeof module?.title?.de === 'string') return module.title.de;
  return '';
}

function loadExport() {
  const data = JSON.parse(fs.readFileSync(EXPORT_PATH, 'utf8'));
  const modules = data?.records?.learning_modules ?? [];
  const canonicalById = new Map(modules.map((m) => [m.id, m]));
  const legacyCandidates = new Map();
  const explicitMappings = new Map();

  for (const module of modules) {
    if (module.legacyId) legacyCandidates.set(module.legacyId, module);
  }

  for (const mapping of data.legacyIdMappings ?? []) {
    if (mapping.legacy && mapping.canonicalViewId) {
      explicitMappings.set(mapping.legacy, mapping.canonicalViewId);
    }
  }

  return { canonicalById, legacyCandidates, explicitMappings };
}

function parseRootScalar(text, key) {
  const re = new RegExp(`^${key}:\\s*(.+?)\\s*$`, 'm');
  const match = text.match(re);
  return match ? match[1].replace(/^['"]|['"]$/g, '') : null;
}

function titlesAgree(sourceName, module) {
  const source = normalizedText(sourceName);
  const target = normalizedText(moduleTitle(module));
  return Boolean(source && target && source === target);
}

function resolveCanonical(moduleId, moduleName, canonicalById, legacyCandidates, explicitMappings) {
  if (!moduleId) return { canonical: null, reason: 'missing-module-id' };
  if (canonicalById.has(moduleId)) return { canonical: moduleId, reason: 'already-canonical' };

  if (explicitMappings.has(moduleId)) {
    const target = explicitMappings.get(moduleId);
    if (canonicalById.has(target)) return { canonical: target, reason: 'explicit-mapping' };
  }

  if (legacyCandidates.has(moduleId)) {
    const targetModule = legacyCandidates.get(moduleId);
    if (titlesAgree(moduleName, targetModule)) {
      return { canonical: targetModule.id, reason: 'legacy-id-and-title-match' };
    }
    return {
      canonical: null,
      reason: `semantic-conflict:${targetModule.id}:${moduleTitle(targetModule)}`,
    };
  }

  if (moduleId.startsWith('LRN:SSF:')) {
    const suffix = moduleId.slice('LRN:SSF:'.length);
    const targetModule = canonicalById.get(suffix);
    if (targetModule && titlesAgree(moduleName, targetModule)) {
      return { canonical: suffix, reason: 'prefixed-canonical-id-and-title-match' };
    }
    if (targetModule) {
      return {
        canonical: null,
        reason: `semantic-conflict:${suffix}:${moduleTitle(targetModule)}`,
      };
    }
  }

  return { canonical: null, reason: 'no-deterministic-mapping' };
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

  // Nested historic structures such as `unlocks: noxia:` are intentionally
  // not rewritten automatically. They need a semantic conversion, not a text move.
  if (entries.length === 0) return { text, rawAliases: [] };

  const normative = entries.filter((entry) => entry.startsWith('UNL:NOX:'));
  const rawAliases = entries.filter((entry) => !entry.startsWith('UNL:NOX:'));
  if (rawAliases.length === 0) return { text, rawAliases };

  const replacement = ['unlocks:'];
  for (const entry of normative) replacement.push(`  - ${entry}`);
  if (normative.length === 0) replacement.push('  []');
  replacement.push('planned_unlocks:');
  for (const entry of rawAliases) replacement.push(`  - ${entry}`);

  return {
    text: [...lines.slice(0, start), ...replacement, ...lines.slice(end)].join('\n'),
    rawAliases,
  };
}

function migrateFile(file, context) {
  const fullPath = path.join(LEARNING_DIR, file);
  let text = fs.readFileSync(fullPath, 'utf8');
  const moduleId = parseRootScalar(text, 'module_id');
  const moduleName = parseRootScalar(text, 'name');
  const legacyId = parseRootScalar(text, 'legacy_id');
  const resolution = resolveCanonical(moduleId, moduleName, context.canonicalById, context.legacyCandidates, context.explicitMappings);
  const canonical = resolution.canonical;

  const result = {
    file,
    moduleId,
    moduleName,
    canonical,
    reason: resolution.reason,
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

const context = loadExport();
const files = fs.readdirSync(LEARNING_DIR)
  .filter((file) => /\.ya?ml$/i.test(file))
  .sort();

const results = files.map((file) => migrateFile(file, context));
const changed = results.filter((r) => r.idChanged);
const unlocks = results.filter((r) => r.rawUnlocks.length > 0);
const unresolved = results.filter((r) => r.unresolved);

console.log(`learning files: ${results.length}`);
console.log(`canonical IDs known in export: ${context.canonicalById.size}`);
console.log(`deterministically mappable legacy IDs: ${changed.length}`);
console.log(`files with flat raw unlock aliases: ${unlocks.length}`);
console.log(`review-required legacy IDs: ${unresolved.length}`);

for (const r of changed) console.log(`MAP  ${r.file}: ${r.moduleId} -> ${r.canonical} [${r.reason}]`);
for (const r of unlocks) console.log(`UNLOCK ${r.file}: ${r.rawUnlocks.join(', ')}`);
for (const r of unresolved) console.log(`REVIEW ${r.file}: ${r.moduleId ?? '<missing module_id>'} [${r.reason}]`);

if (unresolved.length > 0) {
  console.error('Review cases remain. No canonical IDs were invented and semantic conflicts were not auto-migrated.');
  process.exitCode = 2;
}

if (!WRITE && (changed.length > 0 || unlocks.length > 0)) {
  console.log('Dry run only. Re-run with --write to apply only semantic-safe deterministic migrations.');
}
