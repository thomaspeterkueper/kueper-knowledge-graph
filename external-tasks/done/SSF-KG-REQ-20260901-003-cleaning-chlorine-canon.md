---
id: SSF-KG-REQ-20260901-003-CLEANING-CHLORINE-CANON
title: Kanonische Chemie-Identitäten für Hypochlorit/Bleichen/Chlorgas-Gefahr
status: done
source: SSF
target: KG
created: 2026-09-01
completed: 2026-09-01
priority: high
affects: [KG, SSF]
---

# Anlass

Der bestehende SSF-Pfad `PATH:SSF:CHE-REINIGUNG-CHLOR-0001` verwendet lokale bzw. nicht bestätigte Domains (`KD:CHE-OXIDATION`, `KD:CHE-REDOX`, `KD:CHE-SAFETY`) und enthält eine sicherheitsrelevante Vereinfachung der Haushaltschemie.

# KG-Rückgabe

Maschinenlesbarer Kanon:

- Export: `exports/chemistry-cleaning-chlorine-0.1.json`
- Commit: `aa26926a0f84a2a4fd3c9062ff6bd95c1ca767b1`
- Domains: `KD:CHM-REDOX:N2`, `KD:CHM-CHEMICAL-SAFETY:N2`, zusätzlich bestehend `KD:CHM-ACID-BASE:N2`
- LearningModule: `CHM-L1-000004`
- Legacy-/Consumer-ID: `LRN:SSF:CHM-CLEANING-HYPOCHLORITE-0001`
- SSF-Pfad: `PATH:SSF:CHE-REINIGUNG-CHLOR-0001`
- Prerequisites: `CHM-L1-000001`, `CHM-L1-000002`

Zentrale Concepts:

- `CON:CHM:hypochlorite-aqueous-system`
- `CON:CHM:hypochlorous-acid-hypochlorite-equilibrium`
- `CON:CHM:oxidative-bleaching-chromophores`
- `CON:CHM:hypochlorite-acidification-chlorine-release`
- `CON:CHM:incompatible-cleaner-mixing`
- `CON:CHM:chlorine-inhalation-hazard`
- `CON:CHM:chloramine-cleaner-hazard` (separater Folgefall)

Sicherheitsanforderungen:

- `REQ:CHM:HYPOCHLORITE-ACID-MIX-SAFETY-0001`
- `REQ:CHM:BLEACH-MECHANISM-QUALIFIER-0001`

Die nicht bestätigten `KD:CHE-OXIDATION`, `KD:CHE-REDOX` und `KD:CHE-SAFETY` sind für diesen Scope ausdrücklich nicht kanonisch. Es wird weder ein universeller pH-Grenzwert noch die Kurzformel „Chlor + Säure = Chlorgas“ kanonisiert. Chloramin-/Ammoniak-Chemie bleibt als eigener Sicherheitsfall abgegrenzt.
