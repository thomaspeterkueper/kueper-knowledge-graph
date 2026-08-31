# SSF → KG Request: Contracomology Learning-Contract registrieren

**Origin:** `thomaspeterkueper/solarsciencefoundation`
**Target:** `thomaspeterkueper/kueper-knowledge-graph`
**Status:** open
**Date:** 2026-08-31

## Anlass

SSF setzt den freigegebenen Contracomology-Einführungspfad auf Basis von `KD:KON:N1` um. Der Knowledge Graph bleibt Source of Truth für kanonische Concept- und Learning-Contract-Identitäten.

## Anforderung

Bitte die folgenden von SSF verwendeten Lernidentitäten im KG/SSF Learning-Contract prüfen und, soweit sie dem kanonischen KG-Modell entsprechen, registrieren bzw. bestätigen:

- Path: `PATH:SSF:KON-EINFUEHRUNG-0001`
- SSF module/sourceModuleId: `KON-L1-000001`
- KXF module: `LRN:SSF:KON-L1-000001`
- Domain: `KD:KON:N1`
- Concepts: `CON:L1:zeitform`, `CON:L1:avi-punkt`, `CON:L1:oem`, `CON:L1:paradigma-1`, `CON:L1:paradigma-2`, `CON:L1:paradigma-3`

`CON:L1:ma-u` und `CON:L1:ma-ta-u` werden von SSF nicht verwendet, solange deren Definitionen nicht kanonisch freigegeben sind.

## Abgrenzung

- KG definiert/prüft die kanonischen Identitäten und Concept-Beziehungen.
- SSF definiert Didaktik, Kapitel, Übungen und Kompetenztests.
- NOXIA-Unlock-Keys werden durch diese Anforderung nicht eingeführt oder verändert.
- Keine fachlichen Definitionen aus SSF sollen in den KG zurückgeschrieben werden; nur Identität/Mapping/Contract werden angefordert.

## Erwartetes Ergebnis

Der KG bestätigt oder korrigiert die oben genannten Identitäten und stellt sie über den bestehenden KXF/Learning-Contract so bereit, dass SSF und spätere Consumer eindeutig darauf referenzieren können.
