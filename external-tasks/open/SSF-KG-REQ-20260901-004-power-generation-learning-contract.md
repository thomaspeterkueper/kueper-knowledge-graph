# SSF → KG Request: Power generation learning contract

- **Origin:** `thomaspeterkueper/solarsciencefoundation`
- **Target:** `thomaspeterkueper/kueper-knowledge-graph`
- **Status:** open
- **Date:** 2026-09-01
- **Consumer unlock:** `UNL:NOX:power-generation`

## Anlass

NOXIA verweist bereits auf die Voraussetzung `UNL:NOX:power-generation`. Die SSF meldet derzeit: „Für diese Voraussetzung wurde noch kein SSF-Lernmodul gefunden.“

Im SSF-Repository existiert noch kein Lernpfad für diesen Unlock. SSF soll die Didaktik liefern, aber keine kanonischen `KD:*`-, Concept- oder LearningModule-Identitäten erfinden.

## Benötigte KG-Entscheidung

Bitte einen kanonischen Learning Contract für die Grundlagen elektrischer Energieerzeugung im NOXIA-/SSF-Kontext liefern.

Mindestens benötigt:

1. kanonische LearningModule-ID und ggf. Legacy-/Consumer-ID,
2. kanonische Knowledge Domains,
3. zentrale Concepts und Relationen,
4. fachliche Voraussetzungen / `requires`,
5. Abgrenzung von Energiequelle, Energiewandlung, elektrischer Leistung, Energie, Wirkungsgrad und Versorgungssystem,
6. soweit im Scope sinnvoll: Solar-PV, Generatorprinzip und speicher-/netzgekoppelte Versorgung als Anwendungen, ohne technologiespezifische Details fälschlich zu universalisieren.

## Gewünschter SSF-Pfad

Reservierte SSF-Verbraucheridentität, **nicht als KG-Kanonisierung zu verstehen**:

- Path: `PATH:SSF:NOX-POWER-GENERATION-0001`
- Unlock: `UNL:NOX:power-generation`

Didaktische Zielkette:

`Energiequelle → Energiewandlung → elektrische Leistung/Energie → Verluste/Wirkungsgrad → zeitlicher Bedarf und Erzeugung → Speicher/Netz/Redundanz → Systementscheidung`

Der Lernpfad soll problemorientiert beginnen und Interaktivität nur dort verwenden, wo die Manipulation einen fachlichen Erkenntnisgewinn erzeugt.

## Rückgabe

Bitte diesen Request nach Bearbeitung nach `external-tasks/done/` verschieben und die kanonischen IDs/Verträge maschinenlesbar exportieren, damit SSF sie ohne lokale Parallelidentitäten übernehmen kann.
