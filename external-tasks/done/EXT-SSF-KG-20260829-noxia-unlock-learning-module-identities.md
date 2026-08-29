# SSF → KG: kanonische Lernmodul-Identitäten für NOXIA-Unlock-Pfade

**Origin:** Solar Science Foundation (SSF)
**Target:** KUEPER Knowledge Graph
**Status:** done
**Created:** 2026-08-29
**Related source task:** `solarsciencefoundation/external-tasks/open/NOX-SSF-REQ-20260829-unlock-learning-paths.md`

## Anlass

NOXIA hat die kanonischen Unlock-IDs und deren Abhängigkeiten vorgegeben. SSF soll dazu Lernpfade und didaktische Inhalte erstellen. Die bestehende SSF→NOXIA-API hält jedoch die Source-of-Truth-Grenze fest: Der Knowledge Graph ist Source of Truth für kanonische Wissens-/Modulidentität und strukturelle Metadaten; SSF besitzt die didaktische Präsentation und Inhalte.

Im aktuellen Live-Pfad normalisiert `solarsciencefoundation/lib/kxf.ts` Lernmodule aus dem KG/KXF-Export. Dabei stammen `module.unlocks[]` aus den KXF-Modulrecords (`dependencies.moduleUnlocks` / `module_unlocks` / `unlocks` bzw. `noxia.grants`). Lokale SSF-Fallbackwerte dürfen diese kanonische Struktur nicht konkurrierend überschreiben.

## Benötigte KG-Arbeit

Bitte kanonische `LRN:SSF:*`-Modulidentitäten bzw. bestehende passende Modulidentitäten für die folgenden von NOXIA bereits kanonisch festgelegten Unlocks bereitstellen und im Learning-Modules-KXF exportieren:

- `UNL:NOX:resource-extraction`
- `UNL:NOX:water-processing`
- `UNL:NOX:pressure-systems`
- `UNL:NOX:airlock`
- `UNL:NOX:life-support`
- `UNL:NOX:thermal-control`
- `UNL:NOX:radiation-protection`
- `UNL:NOX:environment-monitoring`
- `UNL:NOX:habitat-redundancy`
- `UNL:NOX:mars-habitat`

Die Unlock-IDs selbst dürfen nicht umbenannt oder neu interpretiert werden. Sie stammen aus NOXIA und werden hier nur als Zielreferenzen geführt.

## Voraussetzungen laut NOXIA-Auftrag

- `airlock` benötigt `pressure-systems`.
- `life-support` benötigt `pressure-systems` + `water-processing` + `power-generation`.
- `thermal-control` benötigt `power-generation`.
- `environment-monitoring` benötigt `power-generation`.
- `habitat-redundancy` benötigt `life-support` + `environment-monitoring`.
- `mars-habitat` ist ein Integrations-/Master-Unlock und benötigt `water-processing`, `power-generation` sowie alle genannten Habitat-Teil-Unlocks.

Bitte diese Beziehungen nur in der bereits etablierten KG/KXF-Struktur abbilden; keine SSF-Didaktik in den KG kopieren.

## Akzeptanz

- Für jeden benötigten SSF-Lernpfad existiert eine kanonische, exportierte Modulidentität oder eine explizite Zuordnung zu einer bereits vorhandenen Identität.
- Die zugehörige kanonische NOXIA-Unlock-ID erscheint im KXF-Modulrecord so, dass SSF `module.unlocks[]` daraus normalisieren kann.
- KG bleibt Source of Truth für Identität/Struktur; SSF bleibt Source of Truth für Lerninhalt/Didaktik; NOXIA bleibt Source of Truth für Unlock-Identität und Spielwirkung.
- Keine neuen NOXIA-Unlock-IDs erfinden.

## Rückmeldung an SSF

Nach Bereitstellung der Identitäten/KXF-Daten kann SSF die eigentlichen Lerninhalte gefahrlos implementieren und den Quellauftrag abschließen.


## KG-Ergebnis 2026-08-29

Die angeforderten NOXIA-Unlocks sind im Learning-Modules-KXF kanonischen Modulidentitäten zugeordnet. Der bereits bestehende Unlock UNL:NOX:power-generation wird über die bestehende SSF-Identität LRN:SSF:PHY-1301 kanonisiert; die übrigen angeforderten Unlocks erhalten eigene kanonische Modulrecords. Voraussetzungen werden ausschließlich als KG/KXF-Modulabhängigkeiten abgebildet. Es wurden keine neuen NOXIA-Unlock-IDs erfunden und keine SSF-Didaktikinhalte übernommen.
