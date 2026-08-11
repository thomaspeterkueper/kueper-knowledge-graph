# KG-0016 — Gedächtnismodell und epistemische Architektur

## Status

Draft productive, 2026-08-11

## Zweck

KG-0016 macht die bisher nur in Essay, Architekturpapier, Prototyp und Research-Notizen vorhandenen Gedächtnis- und Epistemikarbeiten im Knowledge Graph adressierbar.

Ziel ist keine Kanonisierung neurowissenschaftlicher Behauptungen. Der KG trennt ausdrücklich zwischen publizierter Modellinterpretation, technischer Formalisierung und experimentellem Prototyp.

## Adressierbare Kernobjekte

```text
DOC:KUE:KUE-PHI-0002-2026-DE
    Gedächtnis als Zugriffsproblem — publizierte Arbeitsfassung

MOD:L2:gedaechtnis-zugriffsmodell
    theoretische Modellskizze

MOD:L2:epistemische-node-architektur
    technische Formalisierung

MOD:L2:minimaler-epistemischer-kernel
    minimaler ausführbarer Prototyp
```

Die Trennung zwischen Dokument, Modell und Implementierungsmodell ist absichtlich. Ein Text ist nicht das Modell, und ein Prototyp ist nicht die Theorie.

## Fachliche Kerntrennungen

Der Graph macht mindestens folgende Begriffe explizit:

- `CON:L1:gedaechtnis-speicher-zugriff`
- `CON:L1:erinnerung-ueberzeugung`
- `CON:L1:retrieval-score-confidence`
- `CON:L1:nichtwissen-zustaende`
- `CON:L1:epistemische-rechtfertigung`

Die technische Architektur hält vier epistemische Ebenen auseinander:

```text
Observation
Episode
Claim
Belief
```

`Justification` ist ein evaluator-lokales Verbindungsobjekt zwischen Claim und Belief und keine fünfte epistemische Ebene. Claim-Generation-Provenance und Belief-Justification sind getrennt.

## Vier Nichtwissen-Zustände

Der Minimalprototyp operationalisiert:

1. Substratverlust
2. partiellen Retrievalpfad-Defekt
3. vollständig orphaned vorhandene Repräsentation
4. Filterblockade

Das normale Verhaltensinterface kann Zustand 1 und die vollständig orphaned Repräsentation gleich erscheinen lassen. Die Unterscheidung entsteht erst über einen privilegierten diagnostischen Store-/Maintenance-Zugriff.

## Kompatibilität mit KG-0009 / Object–Relation–Event

KG-0016 führt **keinen neuen Universaltyp `Object`** ein. Es übernimmt den Grundsatz aus KG-0009: stabile Identität wird durch die bereits vorhandenen typisierten IDs getragen.

Damit gilt:

```text
Object identity
    -> DOC / MOD / CON / SYS / ...

Relation
    -> explizite REL-Kante

State
    -> zeitgebundene Ausprägung eines stabilen Objekts, wenn benötigt

Event
    -> Änderung, Revision oder historisch relevantes Geschehen, wenn benötigt
```

Ein Modell bleibt über Revisionen dasselbe Modellobjekt. Eine neue Version erzeugt nicht automatisch eine neue Identität. Wenn ein Versionszustand selbst abfragerelevant wird, kann er später als `STA:<OBJECT-ID>:<STATE-SLUG>` modelliert werden. Historisch relevante Modelländerungen können als `EVT` referenziert werden.

Damit bleibt dieselbe Objektlogik für narrative Weltobjekte, wissenschaftliche Modelle und technische Systeme verwendbar.

## Abgrenzung zu KNO / KnowledgeAssertion

KG-0009 modelliert perspektivisches Wissen, Claims und Beliefs über `KNO`. Das ist mit der epistemischen Architektur kompatibel, aber nicht identisch.

Eine Projektion darf beispielsweise abbilden:

```text
Kernel Claim   -> KNO(...:CLAIM:...)
Kernel Belief  -> KNO(...:BELIEF:...)
```

Dabei gelten drei Schutzregeln:

1. `KNO` ersetzt nicht die Claim-Generation-Provenance.
2. `KNO` ersetzt nicht die evaluator-lokale `Justification`.
3. Ein `KNO.confidence` darf nicht stillschweigend mit `belief_confidence` des Kernels gleichgesetzt werden, sofern Evaluator, Evidenz und Bewertungsmethode nicht erhalten sind.

Die KG-Projektion darf also epistemische Zustände darstellen, aber keinen epistemischen Status „waschen“.

## Relationen

KG-0016 verwendet bestehende Relationstypen (`COVERS`, `PART_OF`) und ergänzt für diesen Arbeitsbereich:

- `DESCRIBES`
- `INFORMS`
- `FORMALIZES`
- `IMPLEMENTS`
- `TESTS`
- `METHODOLOGICAL_ANALOGY_TO`

`METHODOLOGICAL_ANALOGY_TO` ist ausdrücklich keine fachliche Ableitung. Die Relation LUCA → Gedächtnismodell bleibt ein Research Candidate und bezeichnet nur eine methodologische Analogie funktionaler Rekonstruktion.

## Registry-Shards

Die vorhandenen Baseregistries sind groß und historisch gewachsen. KG-0016 nutzt deshalb die in KG-0008 ergänzte additive Shard-Struktur:

```text
exports/entity-registry-0.1.json
  + exports/entity-registry-epistemic-0.1.json

exports/relation-registry-0.1.json
  + exports/relation-registry-epistemic-0.1.json

exports/document-references-0.1.json
  + exports/document-references-epistemic-0.1.json
```

Für Consumer ist jeweils das Aggregat die logische Registry. Die Basisdateien bleiben aus Kompatibilitätsgründen bestehen.

## Source of Truth

- Volltext und Publikationsstatus des Essays: `kueper.com`
- semantische IDs, Relationen und Registry-Projektion: `kueper-knowledge-graph`
- technische Detailarchitektur und Prototypstand: jeweilige technische Arbeitsquelle; der KG speichert deren semantische Projektion, nicht den vollständigen Quelltext.

## Ergebnis

Andere Projekte können nun die Gedächtnis-/Epistemikobjekte über stabile IDs auflösen und ihre Relationen abfragen, ohne Research-Notizen oder fremde Repository-Dateien durchsuchen zu müssen.
