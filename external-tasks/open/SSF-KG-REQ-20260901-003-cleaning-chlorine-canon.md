---
id: SSF-KG-REQ-20260901-003-CLEANING-CHLORINE-CANON
title: Kanonische Chemie-Identitäten für Hypochlorit/Bleichen/Chlorgas-Gefahr
status: open
source: SSF
target: KG
created: 2026-09-01
priority: high
affects: [KG, SSF]
---

# Anlass

Der bestehende SSF-Pfad `PATH:SSF:CHE-REINIGUNG-CHLOR-0001` verwendet lokale bzw. nicht bestätigte Domains (`KD:CHE-OXIDATION`, `KD:CHE-REDOX`, `KD:CHE-SAFETY`) und enthält eine sicherheitsrelevante Vereinfachung der Haushaltschemie.

SSF wird den alten Pfad bis zur kanonischen Neuimplementierung aus dem aktiven Registry-Kandidatenbestand nehmen. Bitte KG-seitig keine Didaktik implementieren.

# Benötigter kanonischer Umfang

Bitte vorhandene Identitäten wiederverwenden oder neue stabile Identitäten nur falls erforderlich anlegen für:

1. Hypochlorit-basierte Bleich-/Desinfektionschemie in wässrigen Haushaltsreinigern;
2. Oxidation von Chromophoren als Bleicheffekt auf Foundation-Level;
3. Säuerung hypochlorithaltiger Lösungen und mögliche Freisetzung von molekularem Chlor;
4. chemische Mischsicherheit für hypochlorithaltige Reiniger + saure Reiniger;
5. falls sinnvoll: Abgrenzung zu Chloraminen/Ammoniak als eigener späterer Sicherheitsfall.

# Fachliche Leitplanken für den Vertrag

- Nicht pauschal `Chlor + Säure = Chlorgas`, sondern konkret Hypochlorit-/Aktivchlor-Systeme unter sauren Bedingungen.
- Kein universeller harter pH-Schwellenwert wie `pH < 4`, sofern KG dafür keine belastbare, kontextgebundene Quelle modelliert.
- Keine Aussage, dass „Chlor Doppelbindungen zerstört“ als universeller Mechanismus für alle Bleichfälle genügt; Foundation-Level darf Oxidation von Chromophoren erklären, muss aber als vereinfachtes Modell gekennzeichnet werden.

# Gewünschte Rückgabe

- kanonische `KD:*`- und relevante `CON:*`-IDs;
- ggf. LearningModule-ID für den SSF-Anwendungspfad oder klare Consumer-Zuordnung;
- Prerequisites, insbesondere zu Säure/Base/pH, falls fachlich erforderlich;
- Sicherheitsrelationen/Warnings, die SSF didaktisch darstellen soll.
