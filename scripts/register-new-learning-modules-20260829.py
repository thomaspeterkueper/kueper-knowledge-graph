#!/usr/bin/env python3
import json
import re
from pathlib import Path
import yaml

ROOT = Path('.')
EXPORT = ROOT / 'exports' / 'kxf-learning-modules-0.1.json'
FILES = [
    ROOT / 'learning' / 'ssf-ast-mars-regolith.yaml',
    ROOT / 'learning' / 'ssf-ast-mondnavigation.yaml',
    ROOT / 'learning' / 'ssf-eng-lifesupport-mobil.yaml',
    ROOT / 'learning' / 'ssf-phy-mondstaub-verschleiss.yaml',
    ROOT / 'learning' / 'ssf-phy-wasser-vakuum.yaml',
]

with EXPORT.open(encoding='utf-8') as f:
    data = json.load(f)
mods = data['records']['learning_modules']
paths = data['records'].setdefault('paths', [])

by_id = {m['id']: m for m in mods}
by_legacy = {m.get('legacyId'): m for m in mods if m.get('legacyId')}

raw = []
for fp in FILES:
    with fp.open(encoding='utf-8') as f:
        y = yaml.safe_load(f)
    raw.append((fp, y))

# Allocate stable canonical IDs only for records not already mapped.
# Layer is preserved from the authoring YAML (L2 here).
next_num = {}
for m in mods:
    match = re.fullmatch(r'([A-Z]{3})-(L\d+)-(\d{6})', m.get('id', ''))
    if match:
        key = (match.group(1), match.group(2))
        next_num[key] = max(next_num.get(key, 0), int(match.group(3)))

legacy_to_canonical = {k: v['id'] for k, v in by_legacy.items()}
assigned = {}
for fp, y in raw:
    legacy = y['module_id']
    if legacy in legacy_to_canonical:
        assigned[legacy] = legacy_to_canonical[legacy]
        continue
    domain = y['domain']
    layer = y.get('layer', 'L1')
    key = (domain, layer)
    next_num[key] = next_num.get(key, 0) + 1
    cid = f'{domain}-{layer}-{next_num[key]:06d}'
    while cid in by_id:
        next_num[key] += 1
        cid = f'{domain}-{layer}-{next_num[key]:06d}'
    assigned[legacy] = cid

# Also resolve legacy forms that directly encode an existing canonical ID.
def resolve(req):
    if req in assigned:
        return assigned[req]
    if req in legacy_to_canonical:
        return legacy_to_canonical[req]
    if req.startswith('LRN:SSF:'):
        candidate = req[len('LRN:SSF:'):]
        if candidate in by_id:
            return candidate
    raise RuntimeError(f'Unresolved prerequisite: {req}')

for fp, y in raw:
    legacy = y['module_id']
    cid = assigned[legacy]
    if legacy in legacy_to_canonical:
        continue
    title = y['name']
    requires = [resolve(x) for x in (y.get('requires') or [])]
    unlocks = list(dict.fromkeys(y.get('unlocks') or []))
    scope = list(dict.fromkeys(y.get('teaches') or []))
    record = {
        'id': cid,
        'version': '0.1.0',
        'created': str(y.get('created', '2026-08-29')),
        'modified': '2026-08-29',
        'title': {'de': title, 'en': title},
        'meta': {
            'title': title,
            'subject': y['domain'],
            'type': 'grundmodul',
            'status': 'planned',
            'entryQuestion': title,
            'depthMin': 0,
            'depthMax': None,
            'durationMin': 3,
            'durationMax': 7,
            'entryQuestions': {'L0': title, 'L1': title, 'L2': title},
            'scope': scope,
            'subdomain': y.get('subdomain'),
        },
        'assets': {'text': [], 'svg': [], 'image': [], 'video': [], 'audio': [], 'experiment': []},
        'dependencies': {'requires': requires, 'moduleUnlocks': [], 'pathUnlocks': [], 'archiveUnlocks': []},
        'branches': [],
        'noxiaGrants': [],
        'legacyId': legacy,
        'unlocks': unlocks,
        'source': {
            'authoringFile': str(fp),
            'ssfPathId': y.get('ssf_path_id'),
            'otaReference': y.get('ota_reference'),
            'curator': y.get('curator'),
        }
    }
    mods.append(record)
    by_id[cid] = record
    by_legacy[legacy] = record
    legacy_to_canonical[legacy] = cid

    pid = y.get('ssf_path_id')
    if pid and not any(p.get('id') == pid for p in paths):
        paths.append({
            'id': pid,
            'type': 'Path',
            'purpose': 'learn',
            'target': cid,
            'status': 'draft_productive',
            'sourceSystem': 'SSF'
        })

# Version bump is additive, no schema bump.
data['version'] = '0.2.10'
data['modified'] = '2026-08-29T22:20:00+02:00'
data['updated'] = '2026-08-29'
data.setdefault('sourceDocuments', [])
marker = 'KG-LEARNING-SYNC-20260829-NEW-MODULES'
if marker not in data['sourceDocuments']:
    data['sourceDocuments'].append(marker)

with EXPORT.open('w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
    f.write('\n')

print('Registered:')
for legacy, cid in assigned.items():
    print(f'  {legacy} -> {cid}')
