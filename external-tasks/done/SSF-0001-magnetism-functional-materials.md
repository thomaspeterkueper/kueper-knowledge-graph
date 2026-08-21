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

## Umsetzung

Erledigt am 2026-08-21 (Autonomous Implementation, Task e2d5d0db).

Erstellt:

```text
exports/kxf-learning-modules-0.1.json   -> 8 Lernmodule PHY-L1-000017..000024
                                            (legacyId LRN:SSF:MAG-001..MAG-008),
                                            PATH:SSF:MAGNETISM-MATERIALS als records.paths
exports/path-registry-0.1.json          -> PATH:SSF:MAGNETISM-MATERIALS (learning_sequence, planned)
learning/ssf-phy-mag-001..008.yaml      -> Autorenschicht je MAG-Modul (teaches, ssf_path_id)
entities/concepts/*.yaml                -> 36 kanonische Konzepte (Magnetfeld bis Flux Pinning)
external-tasks/done/SSF-0001...md       -> diese Datei
```

Abhängigkeiten folgen der Reihenfolge MAG-001 -> MAG-002 -> ... -> MAG-008 (dependencies.requires
bzw. moduleUnlocks im KXF-Export). SSF kann die Module über den Export ohne lokale Duplikation
in die Lernkarte des Lernpfads PATH:SSF:MAGNETISM-MATERIALS aufnehmen. NOXIA-Grants bleiben
bewusst offen (kein unlocks-Eintrag) bis zur kuratorischen Festlegung.
