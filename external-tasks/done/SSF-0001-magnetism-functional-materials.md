# SSF-0001 — Magnetismus & funktionale Materialien im Knowledge Graph

## Herkunft

Solar Science Foundation

## Ziel

Für den neuen SSF-Lernpfad `PATH:SSF:MAGNETISM-MATERIALS` sollen die kanonischen Wissensobjekte und KXF-Lernmodul-Datensätze im KUEPER Knowledge Graph ergänzt werden. Der Knowledge Graph bleibt Source of Truth; SSF übernimmt Didaktik, Darstellung und Fortschritt.

## Benötigte Lernmodule

- `MAG-001` — Magnetfelder verstehen
- `MAG-002` — Warum Materialien magnetisch sind
- `MAG-003` — Weich- und hartmagnetische Werkstoffe
- `MAG-004` — Permanentmagnete als Werkstoffe
- `MAG-005` — Magnetismus und Temperatur
- `MAG-006` — Vom Rohstoff zum Magneten
- `MAG-007` — Anwendungen magnetischer Materialien
- `MAG-008` — Fortgeschrittene magnetische Funktionen

## Benötigte Konzeptbereiche

Magnetfeld, magnetischer Dipol, Elektromagnetismus, magnetisches Moment, Dia-/Para-/Ferromagnetismus, Domänen, Hysterese, Remanenz, Koerzitivfeldstärke, weich-/hartmagnetische Werkstoffe, Ferrit, AlNiCo, SmCo, NdFeB, Curie-Temperatur, Entmagnetisierung, Zusammensetzung, Mikrostruktur, Verarbeitung, kritische Rohstoffe, Recycling, Elektromotor, Generator, Transformator, Hall-Sensor, magnetische Lager, Wirbelströme, magnetische Abschirmung, Magnetokalorik, Supraleitung und Flux Pinning.

## KXF-Anforderung

Die acht Module sollen so exportiert werden, dass SSF sie über `kxf-learning-modules-0.1.json` ohne lokale Duplikation in der Lernkarte aufnehmen kann. Abhängigkeiten sollen der Reihenfolge `MAG-001` → … → `MAG-008` folgen.

## Abgrenzung

Keine SSF-Didaktik oder NOXIA-Spiellogik im KG implementieren. NOXIA-spezifische Grants können später separat definiert werden, sobald der fachliche Pfad kanonisch vorliegt.

---
_Resolved 2026-08-21: Lernpfad `PATH:SSF:MAGNETISM-MATERIALS` im KG registriert. Acht kanonische Module `PHY-L1-000017` … `PHY-L1-000024` (MAG-001 … MAG-008) in `exports/kxf-learning-modules-0.1.json` (v0.2.8) angelegt; Abhängigkeitskette MAG-001 → … → MAG-008 über `dependencies.requires`/`moduleUnlocks` modelliert. Die vom Request benannten Konzeptbereiche sind als `meta.scope` der jeweiligen Module geführt. `legacyId` erhält die SSF-Modulnamen (`LRN:SSF:MAG-001` … `LRN:SSF:MAG-008`) zur Rückverfolgbarkeit. Status `planned` — inhaltliche Didaktik bleibt laut Request bei SSF, es wurden keine fachlichen Inhalte erfunden. Keine NOXIA-Unlocks (Grants laut Abgrenzung später). SSF kann die Module ohne lokale Duplikation über den KXF-Export aufnehmen._
