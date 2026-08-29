---
id: SSF-0002
title: Magnetismus-Pfad — Lerndauern und External-Task-Lifecycle mit SSF abgleichen
status: done
source: SSF
target: KG
created: 2026-08-27
completed: 2026-08-29
priority: high
references:
  - SSF PR #2
  - KG PR #4
  - KG PR #3
  - SSF-0001
---

# SSF-0002 — Magnetismus-Pfad: Lerndauern und Lifecycle abgleichen

## Ergebnis

Die Anforderung wurde abgeschlossen.

1. Die acht kanonischen Module `PHY-L1-000017` bis `PHY-L1-000024` sowie `PATH:SSF:MAGNETISM-MATERIALS` sind im aktuellen KG-Stand vorhanden.
2. Die KXF-Zeitfelder `meta.durationMin`/`meta.durationMax` werden ausdrücklich als kompakte KXF-Modul-/Interaktionseinheit dokumentiert und nicht als vollständige SSF-Didaktikdauer. Die verbindliche Semantik steht in `docs/kxf-learning-duration-semantics.md`.
3. Für SSF bleibt die redaktionelle Lerndauer maßgeblich: 35 / 45 / 45 / 45 / 40 / 50 / 50 / 50 Minuten, insgesamt 360 Minuten.
4. `SSF-0001-magnetism-functional-materials.md` verbleibt nur unter `external-tasks/done/`; die doppelte `open/`-Ablage wurde entfernt.
5. Kanonische IDs, `legacyId`, `subject: PHY`, `meta.scope` und der Verzicht auf NOXIA-Grants bleiben erhalten.

## Zuständigkeitsgrenze

Der Knowledge Graph bleibt Source of Truth für kanonische IDs, Abhängigkeiten und fachlichen Scope. SSF bleibt Source of Truth für Didaktik, Lernsequenz, Übungen und redaktionelle Lerndauer. NOXIA bleibt außerhalb dieser Änderung.
