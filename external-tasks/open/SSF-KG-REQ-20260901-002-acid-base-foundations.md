---
id: SSF-KG-REQ-20260901-002-ACID-BASE-FOUNDATIONS
title: Kanonische KnowledgeDomains und Lernmodul-Identitäten für Säure/Base-Grundlagen bereitstellen
status: open
source: SSF
target: KG
created: 2026-09-01
priority: high
affects: [KG, SSF, NOXIA]
---

# Anlass

SSF baut einen echten Grundlagenstrang für Säuren/Basen auf. Der bestehende Anwendungspfad `PATH:SSF:CHE-REINIGUNG-KALK-0001` verwendet derzeit SSF-lokal wirkende Domain-IDs wie `KD:CHE-ACID-BASE`, `KD:CHE-CARBONATE` und `KD:PHY-PH`. Gemäß KG-Vertrag darf SSF keine Ersatz-`KD:*`-Identitäten lokal erfinden.

# Benötigter kanonischer Umfang

Bitte im KG prüfen, vorhandene Identitäten wiederverwenden und nur falls fachlich nötig neue stabile Identitäten anlegen für:

1. Säure/Base-Grundprinzip in wässriger Lösung (Brønsted-Kontext, H3O+/OH− auf Foundation-Level)
2. pH als Maß/Skala für wässrige Systeme inklusive logarithmischer Natur
3. Neutralisation / Stoffmengenbezug auf Foundation-Level
4. Carbonat + Säure als Anwendung, insbesondere Calciumcarbonat und CO2-Entwicklung

Zusätzlich werden stabile Lernmodul-Identitäten/KXF-Zuordnungen für drei SSF-Grundlagenreisen benötigt:

- Säure/Base-Einstieg: „Warum schmeckt Zitrone sauer – und Seife nicht?“
- pH-Grundlage: „Was bedeutet eigentlich pH 3 oder pH 10?“
- Neutralisation: „Was passiert, wenn Säure und Base aufeinandertreffen?“

# Gewünschte Rückgabe

- kanonische `KD:*`-IDs und ggf. relevante `CON:*`-IDs;
- kanonische Lernmodul-/KXF-IDs oder klare Anweisung, welche bestehenden IDs zu verwenden sind;
- Prerequisite-Relationen zwischen den drei Grundlagen;
- Mapping/Einordnung für den vorhandenen Kalk-/Reinigungspfad;
- keine SSF-Didaktik oder Runtime-Implementierung im KG.

# Source-of-Truth

KG: Identitäten, Begriffe, Relationen und KXF-Vertrag.  
SSF: Lernreise, Erklärungen, Visualisierung/Experimente, Quiz und Anwendung.  
NOXIA: spätere spielmechanische Nutzung/Unlocks.
