# KG-0015 - Feli Narrative Pilot 001

## Status
Draft productive, 2026-08-10

## Bezug
Ergaenzt KG-0009 Narrative World Model und KG-0014 Narrative Representation and Localization Consistency.

## Zweck
KG-0015 setzt den ersten realen Narrative-World-Pilot anhand von `Feli und das Lichthaus` um. Der Pilot dient nicht der Vollerfassung des Manuskripts, sondern dem Test von Identitaet, Kontinuitaet, Events, Wissen, Representation und Sprachkonsistenz.

## Source-of-Truth-Grenze
Der Knowledge Graph speichert nicht das Manuskript. Er speichert ausschliesslich daraus belegte kanonische Identitaeten, Relationen, Events, Wissenszustaende und Representations.

Die fuer Pilot 001 verwendeten Texte wurden dem KG-Arbeitsprozess als deutsche und franzoesische Manuskriptfassungen bereitgestellt. Volltexte verbleiben ausserhalb des KG.

## Schema-Erweiterungen aus dem Pilot
Der Pilot zeigt zwei fehlende stabile narrative Entitaetsklassen.

### OBJ - Physical/Narrative Object
```text
OBJ:<LAYER>:<slug>
```

`OBJ` bezeichnet ein individuelles, referenzierbares nicht-lebendiges Objekt mit stabiler Identitaet, das nicht bereits durch einen spezifischeren Typ wie `BLD`, `DOC` oder `SYS` abgedeckt ist.

Beispiele:
```text
OBJ:L4:feli-muschel-mit-sprung
OBJ:L4:lumen-summendes-glas
OBJ:L4:feli-notizheft
```

### ANI - Animal
```text
ANI:<LAYER>:<slug>
```

`ANI` bezeichnet ein individuelles Tier mit stabiler narrativer Identitaet.

Beispiel:
```text
ANI:L4:lumen-katze
```

### Harte Regeln
1. `OBJ` ist nur fuer individuelle Objekte mit stabiler Identitaet zu verwenden, nicht fuer Stoffklassen oder allgemeine Konzepte.
2. `ANI` ist fuer individuelle Tiere vorgesehen, nicht fuer biologische Taxa.
3. Ein spezifischer vorhandener Typ hat Vorrang vor `OBJ`.
4. Werkbezogene sprachliche Benennungen eines `OBJ` oder `ANI` werden als Representation/Terminologie gepflegt und erzeugen keine neue Identitaet.

## Pilotumfang 0.1
Pilot 001 erfasst zunaechst:
- das Werk als sprachunabhaengige Werkidentitaet,
- 5 Kernpersonen,
- 1 Tier,
- 5 Orte,
- 5 individuelle Objekte,
- 8 zentrale Events,
- exemplarische Relationen,
- exemplarische Knowledge-/Belief-Zustaende,
- deutsche und franzoesische Werk-Representation,
- einen ersten Translation/Localization Check.

## Noch bewusst nicht kanonisiert
### Universelle Principles
Der Text enthaelt starke Motive und philosophisch anschlussfaehige Aussagen, etwa den Sprung als Ort, durch den Licht eintritt, Lernen durch eigenes Entdecken sowie das Wiederaufnehmen des Suchens. Diese werden in Pilot 0.1 nicht als `PRI` kanonisiert.

Begruendung: KG-0009/KG-0014 verlangen eine explizite werkuebergreifende Kuratierung. Ein einzelner Band darf keine universelle Principle-Geltung erzeugen.

### Exakte Geografie
Die Kuestenstadt bleibt im Text unbenannt. Der Pilot vergibt daher eine stabile interne fiktionale Ortsidentitaet, behauptet aber keine reale geografische Zuordnung.

### Exakte Kalenderdaten
Die Handlung verlaeuft von Oktober bis Dezember, jedoch ohne Jahr. Events verwenden deshalb ordinale und relative Zeitangaben statt erfundener Datumswerte.

## Erfolgskriterien Pilot 001
Pilot 001 gilt in Stufe A als umgesetzt, wenn:
1. alle Seed-Entitaeten stabile IDs besitzen,
2. keine Sprachfassung eigene Weltidentitaeten erzeugt,
3. mindestens ein Knowledge-vs-Reality-Fall modelliert ist,
4. die deutsche und franzoesische Fassung auf Terminologie und Fakten verglichen wurden,
5. erkannte Translation-Drifts dokumentiert sind.

Stufe B folgt mit Band 2. Erst dann kann echte Band-zu-Band-Continuity validiert werden.
