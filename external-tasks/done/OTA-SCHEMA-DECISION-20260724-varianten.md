# OTA-SCHEMA-DECISION-20260724 — Variantenfrage §15

ID: DECISION:OTA:VARIANTS
Requester: OTA-TEC-0035 §15 Validierungs-Notizen
Recipient: T.P.K.
Status: resolved
Created: 2026-07-24

## Befund

OTA-TEC-0035 zeigt: Rover-Varianten fuer Mars und Asteroiden unterscheiden
sich nicht graduell (andere Zahlen, gleiches Funktionsprinzip) sondern
fundamental im Wirkprinzip:
- Mond-Rover: Radfahrzeug (Traktionskraft auf Regolith)
- Mars-Rover: Radfahrzeug mit anderer Aerodynamik/Druck (aehnliches Prinzip)
- Asteroid-Fahrzeug: Greif-/Ankertechnik (Mikrogravitation, voellig anderes Prinzip)

OTA-TEC-0034 zeigt den Gegenfall: Wasserextraktor fuer Mond und Mars sind
dasselbe Funktionsprinzip (Sublimation + Kondensation) mit anderen Parametern
(Temperatur, Druck, Eisgehalt) — bleiben im selben Dossier als Abschnitt.

## Kurator-Entscheidung (T.P.K., 2026-07-24)

### Regel fuer §15 (Varianten)

**Kriterium:** Unterscheidet sich das Wirkprinzip fundamental?

Gleiches Wirkprinzip, andere Parameter:
→ Unterabschnitt im selben Dossier (Beispiel: Wasserextraktor Mond/Mars)
→ Relation: VARIANT_AT_LOCATION (neuer Relationstyp, nur Parameterwerte verschieden)

Anderes Wirkprinzip:
→ Eigenes Dossier mit eigener objectId
→ Relation: FUNCTIONAL_ANALOG_TO (loest dieselbe Aufgabe, anderer Mechanismus)

### Begruendung

FUNCTIONAL_ANALOG_TO ist praeziser als VARIANT_OF weil:
- Keine Abstammungsbeziehung impliziert (Asteroid-Fahrzeug ist kein "Rover-Derivat")
- Klar kommuniziert: gleiche Funktion, anderer Mechanismus
- Saubere Abgrenzung in Knowledge-Graph-Queries moeglich

VARIANT_AT_LOCATION beschreibt den einfacheren Fall ohne eigenes Dossier:
- Dieselbe physikalische Loesung
- Andere Einsatzbedingungen (Schwerkraft, Druck, Temperatur)
- Andere quantitative Werte (Energiebedarf, Materialstaerken)
- Dokumentiert als Unterabschnitt in §15

### Neue Relationstypen (fuer Schema-Update)

VARIANT_AT_LOCATION: Dasselbe Objekt, andere Einsatzbedingungen.
  Felder: location (Mond/Mars/Asteroid), parameter_differences (Liste)
  Beispiel: Wasserextraktor-Mond VARIANT_AT_LOCATION von Wasserextraktor-Mars

FUNCTIONAL_ANALOG_TO: Anderes Objekt, gleiche Funktion, anderes Wirkprinzip.
  Felder: function (was es leistet), mechanism_difference (warum anderes Dossier)
  Beispiel: Asteroid-Greiffahrzeug FUNCTIONAL_ANALOG_TO Erkundungsrover-Mond

### Schema-Update

§15 (Varianten) erhaelt klarstellenden Abschnitt:
"Varianten mit gleichem Wirkprinzip werden als Unterabschnitt dokumentiert
(Relation: VARIANT_AT_LOCATION). Varianten mit anderem Wirkprinzip erhalten
ein eigenes Dossier (Relation: FUNCTIONAL_ANALOG_TO)."

§22 (Relationen) erhaelt beide neuen Relationstypen als optionale Felder.

## Naechste Schritte

1. Schema v1.4 RC → v1.5 mit diesem §15-Zusatz und zwei neuen Relationstypen
2. OTA-TEC-0034 §15 ggf. mit VARIANT_AT_LOCATION-Notation ergaenzen
3. Zunaechst kein Asteroid-Fahrzeug-Dossier noetig — Entscheidung trifft erst
   dann auf konkrete Arbeit wenn der Rover im Spiel relevant wird
