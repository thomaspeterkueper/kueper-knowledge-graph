# Feli Narrative Pilot

This directory contains KG-owned semantic pilot data for the Feli series.

## Scope

The pilot implements KG-0009, KG-0014 and KG-0015 against real work material without copying manuscript text into the Knowledge Graph.

Files:

- `pilot-001-canon-seed-0.1.json` - draft semantic seed for Band 1 / Tome 1
- `pilot-001-translation-check-de-fr-0.1.md` - first German/French consistency review

## Source of Truth

The KG owns stable semantic IDs, cross-work identity, relation/state/event semantics and consistency rules.

The Feli manuscript repository or authoring source owns prose, chapter text, stylistic edits and approved translations. This directory does not replace that source.

## Current state

Pilot 001 Stage A:

- schema gap for individual objects resolved via `OBJ`;
- schema gap for individual animals resolved via `ANI`;
- language-neutral work identity defined;
- core Band 1 entities seeded;
- central Band 1 events seeded with ordinal/relative time only;
- Knowledge-vs-Reality cases seeded;
- German and French work representations linked to the same work identity;
- first DE/FR translation review completed.

## Deliberately unresolved

- no exact year is invented;
- the coastal town is not mapped to a real place;
- no universal philosophical Principle is inferred from Band 1 alone;
- the purpose of the half bicycle remains unknown;
- the cause of the humming jar remains unknown;
- Band-to-Band continuity remains untested until Band 2 is ingested.

## Next stage

Pilot 001 Stage B ingests Band 2 using existing IDs wherever identity is genuinely shared. The first Continuity Check then compares Band 2 against this seed before any cross-language check is performed.
