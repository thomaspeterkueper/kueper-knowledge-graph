---
id: SSF-0002
title: Magnetismus-Pfad — Lerndauern und External-Task-Lifecycle mit SSF abgleichen
status: open
source: SSF
target: KG
created: 2026-08-27
priority: high
references:
  - SSF PR #2
  - KG PR #4
  - KG PR #3
  - SSF-0001
---

# SSF-0002 — Magnetismus-Pfad: Lerndauern und Lifecycle abgleichen

## Anlass

Der Knowledge-Graph-PR #4 implementiert die kanonischen Module für `PATH:SSF:MAGNETISM-MATERIALS` als `PHY-L1-000017` bis `PHY-L1-000024`. Der fachliche Scope und die kanonischen IDs passen zur SSF-Integration. Beim Integrationsreview wurden jedoch zwei Punkte gefunden, die vor dem produktiven Abschluss bereinigt werden sollen.

## 1. Lerndauern

Die didaktische Dauer wird von SSF festgelegt. Die aktuellen SSF-Module definieren folgende Dauern:

| SSF-Modul | Kanonische KG-ID | Dauer |
| --- | --- | ---: |
| `MAG-001` | `PHY-L1-000017` | 35 min |
| `MAG-002` | `PHY-L1-000018` | 45 min |
| `MAG-003` | `PHY-L1-000019` | 45 min |
| `MAG-004` | `PHY-L1-000020` | 45 min |
| `MAG-005` | `PHY-L1-000021` | 40 min |
| `MAG-006` | `PHY-L1-000022` | 50 min |
| `MAG-007` | `PHY-L1-000023` | 50 min |
| `MAG-008` | `PHY-L1-000024` | 50 min |

Gesamtdauer des SSF-Pfads: **360 Minuten**.

Bitte die KXF-Dauerfelder so abgleichen, dass der KG-Export diese SSF-Didaktik nicht durch generische `3–7 min`-Werte überschreibt. Falls das KXF-Schema bewusst nur eine andere Art von Zeitwert beschreibt, muss diese Semantik explizit dokumentiert werden und SSF-Didaktikdauer darf beim Konsum nicht als KXF-Moduldauer ersetzt werden.

## 2. External-Task-Lifecycle

KG PR #4 legt die verarbeitete Anforderung `SSF-0001-magnetism-functional-materials.md` unter `external-tasks/done/` ab. KG PR #3 enthält dieselbe ursprüngliche Anforderung noch unter `external-tasks/open/`.

Nach Abschluss darf dieselbe Anforderung **nicht gleichzeitig in `open/` und `done/`** existieren. Bitte den Lifecycle so auflösen, dass `done/` die einzige aktive Ablage des erledigten Requests ist und PR #3 entsprechend als verarbeitet/superseded behandelt wird.

## Beibehalten

- Kanonische IDs `PHY-L1-000017` … `PHY-L1-000024`.
- `legacyId` `LRN:SSF:MAG-001` … `LRN:SSF:MAG-008`.
- `subject: PHY` für alle acht Module. In SSF steht `MAT` bereits für Mathematik; ein `MAT/MTL`-Split ist nicht Teil dieses Requests.
- `meta.scope` als derzeitige Repräsentation der Konzeptbereiche.
- Keine NOXIA-Grants in diesem Schritt.

## Akzeptanzkriterien

1. Die acht KXF-Modulrecords erhalten mit SSF konsistente Lerndauern oder eine dokumentierte, konfliktfreie Zeitsemantik.
2. Der Pfad `PATH:SSF:MAGNETISM-MATERIALS` bleibt unverändert identifizierbar und umfasst acht Module.
3. Für SSF-0001 verbleibt nach Verarbeitung nur der korrekte `done/`-Lifecycle-Zustand.
4. `python3 scripts/check_source_of_truth.py` bleibt erfolgreich.
5. `npm run learning:check` bleibt erfolgreich.

## Zuständigkeitsgrenze

Der Knowledge Graph bleibt Source of Truth für kanonische IDs, Abhängigkeiten und fachlichen Scope. SSF bleibt Source of Truth für Didaktik, Lernsequenz, Übungen und Lerndauer. NOXIA bleibt außerhalb dieser Änderung.
