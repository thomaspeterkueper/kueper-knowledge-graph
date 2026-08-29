# NOXIA → KG: kanonische Lernidentität für „Energie & Arbeit“ / `gravitationsbrunnen`

**Origin:** NOXIA
**Target:** KUEPER Knowledge Graph
**Status:** open
**Created:** 2026-08-29
**Related:** `solarsciencefoundation/external-tasks/open/NOX-SSF-REQ-20260829-gravitationsbrunnen-animation.md`
**Related:** `noxiagame/external-tasks/open/SSF-NOX-REQ-20260829-gravitationsbrunnen-module-mapping.md`

## Befund in NOXIA

Der sichtbare Akademiekurs **„Energie & Arbeit“** ist aktuell ein lokaler, DB-basierter `foundation_kurse`-Kurs. Seine Folie **„Gravitationsbrunnen visualisiert“** referenziert die lokale Interactive-/Animation-ID `gravitationsbrunnen`.

NOXIA besitzt für diesen Kurs repository-seitig derzeit keine belastbare kanonische `PATH:SSF:*`-/`LRN:SSF:*`-Zuordnung. Die konkrete produktive `foundation_kurse.kurs_id` ist im Repository nicht als Seed dokumentiert und darf daher nicht geraten werden. NOXIA kann die lokale Kurs-ID zur Laufzeit/DB an die kanonische Identität binden, sobald KG sie bereitstellt.

## Benötigte KG-Arbeit

Bitte für den fachlichen Lerngegenstand **Energie & Arbeit** eine kanonische Lernidentität bereitstellen bzw. eine bereits vorhandene passende Identität explizit benennen:

- kanonische `LRN:SSF:*`-Modul-ID,
- zugehörige `PATH:SSF:*`-Pfad-ID bzw. bestehende Pfadzuordnung,
- fachlicher Scope mindestens: Arbeit, Energie, potentielle Energie/Gravitationspotential und der Lernabschnitt `gravitationsbrunnen`,
- Export über die etablierte Learning-Modules-KXF-Struktur, sodass SSF diese Identität als Content-Authority verwenden kann.

Keine NOXIA-Spielregeln oder SSF-Didaktik in KG duplizieren.

## Stabile lokale Referenz

Die Interactive-ID ist bereits festgelegt und soll nicht umbenannt werden:

`gravitationsbrunnen`

Sie ist keine kanonische Modulidentität, sondern die NOXIA/SSF-Contentreferenz für die konkrete interaktive Darstellung.

## Akzeptanz

- KG benennt eine bestehende oder neue kanonische `LRN:SSF:*`-Identität für den Lerngegenstand.
- Eine eindeutige `PATH:SSF:*`-Zuordnung liegt vor.
- Die Identität wird im KXF exportiert und ist für SSF konsumierbar.
- SSF kann daran den strukturierten `interactive`-Abschnitt `gravitationsbrunnen` hängen.
- NOXIA kann anschließend seinen lokalen `foundation_kurse`-Datensatz über `kg_path_id` anbinden, ohne eine kanonische Identität zu erfinden.

## Rückgabe an NOXIA/SSF

Bitte nach Umsetzung die endgültige `LRN:SSF:*`- und `PATH:SSF:*`-ID im Task dokumentieren. NOXIA übernimmt danach ausschließlich die lokale `kurs_id`→`kg_path_id`-Bindung; SSF implementiert Inhalt und Interaktion.