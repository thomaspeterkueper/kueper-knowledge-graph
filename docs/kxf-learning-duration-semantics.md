# KXF Learning Duration Semantics

## Zweck

Die Felder `meta.durationMin` und `meta.durationMax` im Export `exports/kxf-learning-modules-0.1.json` beschreiben eine **kompakte KXF-Modul-/Interaktionseinheit** und sind keine kanonische Aussage über die vollständige didaktische Bearbeitungszeit eines von SSF redaktionell aufgebauten Lernmoduls oder Lernpfads.

## Zuständigkeit

- Der **KUEPER Knowledge Graph** ist Source of Truth für kanonische Modul-IDs, fachlichen Scope, Abhängigkeiten und KXF-Exportstruktur.
- Die **Solar Science Foundation (SSF)** ist Source of Truth für Didaktik, Lernsequenz, Übungen und redaktionelle Lerndauer.
- Ein Consumer darf KXF `durationMin`/`durationMax` daher nicht verwenden, um eine explizit von SSF definierte Lerndauer zu überschreiben.

## Magnetismus-Pfad

Für `PATH:SSF:MAGNETISM-MATERIALS` gelten in SSF folgende redaktionelle Lerndauern:

| Kanonische KG-ID | SSF-Modul | SSF-Dauer |
| --- | --- | ---: |
| `PHY-L1-000017` | `MAG-001` | 35 min |
| `PHY-L1-000018` | `MAG-002` | 45 min |
| `PHY-L1-000019` | `MAG-003` | 45 min |
| `PHY-L1-000020` | `MAG-004` | 45 min |
| `PHY-L1-000021` | `MAG-005` | 40 min |
| `PHY-L1-000022` | `MAG-006` | 50 min |
| `PHY-L1-000023` | `MAG-007` | 50 min |
| `PHY-L1-000024` | `MAG-008` | 50 min |

Gesamtdauer in SSF: **360 Minuten**.

Die derzeitigen KXF-Werte von `3–7 min` bleiben als KXF-spezifische kompakte Interaktionszeit bestehen. Sie sind ausdrücklich **nicht** mit der redaktionellen SSF-Lerndauer gleichzusetzen.

## Consumer-Regel

Wenn ein Consumer sowohl eine explizite SSF-Didaktikdauer als auch KXF `durationMin`/`durationMax` kennt, hat die SSF-Didaktikdauer für die Darstellung der Lern-/Kursdauer Vorrang. KXF-Dauerwerte dürfen nur als eigene, entsprechend bezeichnete Interaktions- oder KXF-Einheit angezeigt werden.

Diese Regel wurde im Rahmen von `SSF-0002` festgehalten, um eine semantische Kollision zwischen Knowledge Graph und SSF zu vermeiden.
