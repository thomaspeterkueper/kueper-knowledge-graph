# KG-REQ-20260724-ota-tec-0035-ssf-module

ID: REQ:L3:PENDING
Requester: OTA-TEC-0035 (Erkundungsrover Mond Typ P — Schema v1.4)
Recipient: T.P.K.
Request Type: new_learning_modules
Status: open
Created: 2026-07-24
Priority: medium
Blocking: OTA-TEC-0035 §9 Lernabhaengigkeiten

## Anlass

OTA-TEC-0035 (Erkundungsrover Pioneer-Klasse) benennt in §9 drei TAUGHT_BY-Module.
Alle drei fehlen vollstaendig im SSF-System.

## Benoetigte Module

### 1. PHY-MONDSTAUB-VERSCHLEISS-0001 — NEU
"Mondstaub und Materialverschleiss"
Einstiegsfrage: "Warum hat Mondstaub Apollo-Astronauten fast den Einsatz
gekostet — und was macht ihn so gefaehrlicher als irdischen Staub?"
Inhalt:
- Mondstaub: extrem feinkoernig (<10 Mikrometer), scharfkantig (kein
  Wasser-Transport rundet Kanten ab wie auf Erde) [R]
- Elektrostatische Aufladung durch Sonnenwind -> Staub klebt an allem [R]
- Apollo-Erfahrung: Astronauten konnten nach Mondausflug Raumanzuege kaum
  oeffnen, Staubeintrag beschaedigte Dichtungen [R]
- Mesh-Wheel-Technik: Drahtgeflecht statt Luftreifen, trotzdem Abrasionsproblem
- Solarzellen-Degradation durch Staubbelag
- Reinigungsansaetze: elektrische Felder (noch experimentell [H])
Voraussetzung: keine zwingenden Voraussetzungen, allgemeines Physikmodul
Unlock-Kandidat: TOOL:DUST-MITIGATION, SENSOR:DUST-MONITOR

### 2. ENG-LIFESUPPORT-MOBIL-0001 — NEU
"Life-Support-Grundlagen im Kleinformat"
Einstiegsfrage: "Wie atmet man in einem Fahrzeug das gerade 400 km vom
naechsten Hab entfernt auf dem Mond steht?"
Inhalt:
- O2-Versorgung: Drucktanks vs. Elektrolyse (fuer Langstrecke)
- CO2-Entfernung: LiOH-Kartuschen (Apollo [R]) vs. CDRA-Systeme (ISS [R])
- Druckkabine: Mindestdruck 35-60 kPa (reine O2-Atmosphaere [R])
- Life-Support-Budget: O2 0.84 kg/Person/Tag, H2O 3.5 L/Person/Tag
- Notfallreserve: Rueckweg-Reserve + 20% Sicherheitsmarge
- Armstrong-Grenze: 6.3 kPa, ab hier siedet Blut [R]
Voraussetzung: PHY-WASSER-VAKUUM-0001 (Druckphysik)
Unlock-Kandidat: TOOL:LIFE-SUPPORT-MOBILE, ENG:PRESSURE-CABIN

### 3. AST-MONDNAVIGATION-0001 — NEU
"Navigation ohne GPS auf dem Mond"
Einstiegsfrage: "Wie findet ein Rover auf dem Mond den Weg zurueck zur
Basis — wenn es kein GPS gibt?"
Inhalt:
- Kein GPS auf dem Mond (kein GPS-Satellitennetz 2040 [H])
- Inertialnavigation: Gyroskope + Beschleunigungssensoren, Drift-Problem
- Sternennavigation: Mond hat keine Atmosphaere -> Sterne immer sichtbar,
  Sternen-Triangulation moeglich [R]
- Bakennavigation: Radiobaken von der Basis, Triangulation
- Odometrie: Radumdrehungen zaehlen (funktioniert bei Apollo-LRV [R])
- Horizont-Referenz: bei 1/6 g und 6-7 km Horizont-Entfernung
- Kombination dieser Methoden fuer Redundanz
Voraussetzung: AST-SONNENSYSTEM-0001
Unlock-Kandidat: NAV:SURFACE, SENSOR:INERTIAL

## Ebenfalls benoetigte Module (relevant werdend, nachgelagert)

### 4. ENG-LIFESUPPORT-NOTFALL-0001 — SPAETER
"Notfallprotokolle bei Life-Support-Ausfall"
Abhaengig von ENG-LIFESUPPORT-MOBIL-0001. Kein unmittelbarer Handlungsbedarf.

### 5. AST-REGOLITH-KARTIERUNG-0001 — SPAETER
"Regolith-Kartierung und Ressourcenerkennung"
Ueberschneidung mit AST-MARS-REGOLITH-0001 (fuer Mars).
Separate Mond-Variante benoetigt wenn Rover-Pfad fertig.
Kein unmittelbarer Handlungsbedarf.

## Referenz

OTA-TEC-0035 §9:
- "Mondstaub und Materialverschleiss" → PHY-MONDSTAUB-VERSCHLEISS-0001
- "Life-Support-Grundlagen im Kleinformat" → ENG-LIFESUPPORT-MOBIL-0001
- "Navigation ohne GPS auf dem Mond" → AST-MONDNAVIGATION-0001
OTA-TEC-0035 §22 TAUGHT_BY-Relationen sind damit erfuellbar.
