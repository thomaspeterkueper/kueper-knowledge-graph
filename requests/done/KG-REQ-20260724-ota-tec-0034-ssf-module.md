# KG-REQ-20260724-ota-tec-0034-ssf-module

ID: REQ:L3:PENDING
Requester: OTA-TEC-0034 (Wasserextraktor Typ M — Schema v1.4)
Recipient: T.P.K.
Request Type: new_learning_modules
Status: open
Created: 2026-07-24
Priority: medium
Blocking: OTA-TEC-0034 §9 Lernabhaengigkeiten

## Anlass

OTA-TEC-0034 (Wasserextraktor Typ M) benennt in §9 drei TAUGHT_BY-Module.
Zwei fehlen vollstaendig, eines braucht einen Mars-Kontext-Abschnitt.

## Benoetigte Module

### 1. PHY-WASSER-VAKUUM-0001 — NEU
"Wasserphasen im Vakuum"
Einstiegsfrage: "Warum kann man auf dem Mars kein Wasser kochen — und was passiert stattdessen?"
Inhalt: Tripelpunkt H2O bei 611.7 Pa / 0.01 Celsius (kanonisch [R]).
Mars-Atmosphaere ~600 Pa -> unterhalb Tripelpunkt -> kein fluessiges Wasser.
Sublimation: Eis -> Dampf ohne fluessige Phase. Kondensationsfalle bei -80 Celsius.
Warum Niederdruck ISRU-Vorteil sein kann (niedrigere Sublimationstemperatur).
Voraussetzung: PHY-WASSER-PHASEN-0001, PHY-WASSER-SUBLIM-0001
Unlock-Kandidat: ISRU:WATER-EXTRACTION

### 2. PHY-WASSER-SUBLIM-0001 — ERGAENZEN (Mars-OBS)
Bestehendes Modul hat Waesche-im-Winter-Kontext und Titan-Analogie.
Fehlend: Mars-spezifischer Abschnitt.
Phoenix-Lander 2008: weisse Klumpen sublimieren sichtbar.
Mars-Druck 600 Pa, Sublimationsrate bei -20 Celsius, ISRU-Implikation.
Massnahme: neue OBS:SUBLIM-MARS Section im bestehenden Pfad.

### 3. AST-MARS-REGOLITH-0001 — NEU
"Marsregolith-Zusammensetzung"
Einstiegsfrage: "Warum kann man auf dem Mars nicht einfach Erde aus dem Boden nehmen?"
Inhalt: Zusammensetzung ~45% SiO2, ~18% Fe2O3, Perchlorate 0.5-1 Gew.-% [R].
Perchlorat-Problem: toxisch fuer Menschen und Pflanzen, muss filtriert werden.
Wassereis-Verteilung: regional 2-40 Gew.-% [H], orbital detektierbar via
Neutronenspektrometer (NASA MRO CRISM) [R].
Voraussetzung: AST-SONNENSYSTEM-0001, PHY-WASSER-SUBLIM-0001
Unlock-Kandidaten: SENSOR:SUBSURFACE, ISRU:REGOLITH-ANALYSIS

## Referenz

OTA-TEC-0034 §9:
- "Wasserphasen im Vakuum" → PHY-WASSER-VAKUUM-0001
- "Sublimation vs. Verdampfung" → PHY-WASSER-SUBLIM-0001 (ergaenzen)
- "Marsregolith-Zusammensetzung" → AST-MARS-REGOLITH-0001
OTA-TEC-0034 §22 TAUGHT_BY-Relationen sind damit erfuellbar.


## Erledigt 2026-07-24 / 2026-08-30

Alle 5 Module implementiert (PHY-WASSER-VAKUUM, AST-MARS-REGOLITH, PHY-MONDSTAUB, ENG-LIFESUPPORT-MOBIL, AST-MONDNAVIGATION). In learningPaths.ts v1.4.1 deployed.
