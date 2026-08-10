# FELI-001 - Translation Check DE -> FR 0.1

## Status
Pilot review, 2026-08-10

## Sources
- `Feli und das Lichthaus`, Band 1, Kapitel 1-17 - user-supplied German manuscript
- `Féli et la maison de lumière`, Tome 1, chapitres 1-17 - user-supplied French translation

The manuscript texts are not stored in the Knowledge Graph. This file records only consistency findings.

## Overall result
The French version preserves the core plot, character identities, event order, central imagery and most recurring terminology. No systematic canon drift was found in the pilot pass.

Current result:
```text
FACT_CANON:      PASS with one localized grammar/reference issue class
TERMINOLOGY:     PASS / minor review items
VOICE_REGISTER:  PASS, review recommended for selected idioms
INTENT_AMBIGUITY: PASS in sampled key motifs
```

## Confirmed consistent anchors

| Canon subject / function | German | French | Result |
|---|---|---|---|
| protagonist | Feli | Féli | consistent localization |
| mentor | Herr Lumen | Monsieur Lumen | consistent localization |
| cracked shell | Muschel mit dem Sprung | coquillage fêlé | semantically consistent |
| half bicycle | halbes Fahrrad | demi-vélo | consistent |
| luminous paint | Leuchtfarbe | peinture lumineuse | consistent |
| haunted-house rumor | Spukhaus | maison hantée | consistent function |
| marine bioluminescence | Meerleuchten / Biolumineszenz | luminescence de la mer / bioluminescence | consistent |
| recurring light rhythm | eins, zwei, drei, hell | un, deux, trois, clair | consistent motif |

## Finding FR-001 - Jonas plural gender agreement

**Severity:** SOFT, with potential FACT/REFERENCE impact if left unreviewed

**Scope:** chapters 9 and 11

The German scenes refer to Feli and Jonas together with ordinary plural forms. In the French version, several plural forms are feminine although the group is Féli + Jonas.

Examples of affected constructions include:
- chapter 9: the sentence granting permission until nine uses feminine plural `Elles`;
- chapter 9: the participle in the statement that Monsieur Lumen waited for them is feminine plural;
- chapter 11: plural references while Féli and Jonas inspect the cellar use feminine agreement (`elles`, `toutes deux`) although Jonas is male.

**Expected:** mixed-gender plural agreement (`ils` and corresponding masculine/mixed participle agreement where required).

**Impact:** The intended participants remain recoverable from context, so the underlying event order is not changed. However, this is a real cross-language character-reference inconsistency and demonstrates why Translation Check must include entity-linked grammatical reference, not only glossary comparison.

**Recommended action:** correct the affected French plural agreements in the work repository/source manuscript. The Knowledge Graph itself must not edit the manuscript.

## Finding FR-002 - `maison du Lumen` terminology

**Severity:** SOFT

The French text uses descriptive forms around the Lumen house rather than one fully fixed proper-name equivalent for German `Lumen-Haus`. No identity drift is present, but the Feli terminology profile should define whether the preferred French label is:

- `la maison de Lumen`,
- `la maison du Lumen`,
- or intentionally context-dependent.

This is a terminology-governance question, not a canon error.

## Finding FR-003 - `Muschelkalk` -> `craie de coquillages`

**Severity:** SOFT / scientific terminology review

German describes the luminous paint ingredients using `Muschelkalk`; French renders this as `craie de coquillages`. The narrative function is preserved, but the material term is not a strict technical equivalent.

Because the formula is fictional and deliberately imprecise, this does not currently create a HARD canon conflict. If material composition later matters in another Feli volume, the terminology should be normalized to a defined canonical ingredient concept.

## Intent / motif sampling

The following key narrative functions remain recognizably equivalent across DE/FR in the pilot pass:

1. Feli initially rejects the label `adventure` but is drawn to solvable mysteries.
2. The cracked shell changes from an apparently damaged object into a recurring image associated with light entering through a crack.
3. Lumen teaches primarily through questions rather than direct answers.
4. The weakening house parallels Lumen's loss of active inquiry without explicitly reducing that theme to a diagnosis.
5. Waiting becomes a learned mode of inquiry after Feli has initially preferred active solving.
6. The returning marine light remains something Lumen did not manufacture himself.

These are recorded as narrative observations only. They are not promoted to universal `PRI` entities by this pilot.

## Validator requirements learned from this pass

A future Translation Check should support:

- entity-linked pronoun/agreement checking across languages;
- recurring-term glossary validation;
- scene participant comparison;
- number/order/fact comparison;
- named-vs-unnamed entity identity preservation;
- terminology review for scientific/technical terms;
- intentional ambiguity preservation;
- localization decisions with approved exceptions.

## Next test
Band 2 should reuse the same canonical IDs for Feli and all genuinely recurring entities. Its German source should first be checked against this seed; any French version should then be checked against both Band 2 semantics and the established Feli terminology profile.
