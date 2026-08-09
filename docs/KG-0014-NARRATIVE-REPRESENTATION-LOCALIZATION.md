# KG-0014 - Narrative Representation and Localization Consistency

## Status
Draft productive, 2026-08-10

## Bezug
Ergaenzt KG-0009 Narrative World Model und die in `ID-SCHEMA.md` eingefuehrten Typen `PRI` und `REP`.

## Zweck
Diese Spezifikation definiert, wie unterschiedliche Werk-, Perspektiv- und Sprachdarstellungen derselben kanonischen Weltidentitaet behandelt und geprueft werden.

Grundsatz:
```text
CANONICAL SUBJECT / MEANING
    +--> Werkdarstellung
    +--> Figuren-/Erzaehlperspektive
    +--> deutsche Sprachfassung
    +--> franzoesische Sprachfassung
    +--> spanische Sprachfassung
```

Keine einzelne Sprachfassung ist automatisch Weltwahrheit.

## Representation
ID:
```text
REP:<WORK-ID>:<SUBJECT-ID>:<slug>
```

Eine Representation erzeugt keine zweite kanonische Identitaet. Sie darf Canon selektiv zeigen, vereinfachen oder perspektivisch anders benennen, aber nicht stillschweigend umschreiben.

Empfohlene Felder fuer Sprachfassungen:
```json
{
  "language": "fr",
  "locale": "fr-FR",
  "sourceRepresentation": "REP:...:de",
  "translationStatus": "reviewed",
  "targetAudience": "children-4-6",
  "terminologyProfile": "feli-core",
  "localizationDecisions": []
}
```

`sourceRepresentation` dokumentiert den konkreten Uebersetzungsworkflow. Es bedeutet nicht, dass die Quellsprache ontologisch hoeherrangig ist.

## Translation / Localization Check

### 1. FACT_CANON
Personen, Orte, Beziehungen, Ereignisse, Reihenfolgen, Mengen und andere kanonische Fakten bleiben semantisch aequivalent.

### 2. TERMINOLOGY
Eigennamen, wiederkehrende Begriffe und festgelegte Benennungen folgen einem serien-/werkuebergreifenden Terminologieprofil.

### 3. VOICE_REGISTER
Erzaehlperspektive, Zielalter, Ton, Register und Figurenstimmen bleiben funktional aequivalent. Wort-fuer-Wort-Gleichheit ist weder erforderlich noch erwuenscht.

### 4. INTENT_AMBIGUITY
Bewusste Mehrdeutigkeiten, Wortspiele, emotionale Gewichtung, Informationszurueckhaltung und Reveals duerfen nicht unbeabsichtigt vereindeutigt oder verschoben werden.

## Localization Decision
Sprachlich oder kulturell notwendige Abweichungen werden explizit dokumentiert.

Beispiel:
```json
{
  "type": "localizationDecision",
  "scope": "REP:...:fr",
  "sourceExpression": "...",
  "targetExpression": "...",
  "reason": "age_appropriate_idiom",
  "semanticImpact": "none",
  "status": "approved"
}
```

Eine genehmigte Localization Decision ist kein Fehler.

## Schweregrade

### HARD
Kanonischer Fakt veraendert; Person/Ort verwechselt; Ereignis oder Relation widerspricht der gemeinsamen Bedeutung; Reveal wird faktisch vorgezogen oder entfernt.

### SOFT
Terminologie, Register, Altersangemessenheit oder Bedeutungsschattierung ist inkonsistent und braucht Review.

### THEMATIC
Philosophische, ethische oder motivische Wirkung verschiebt sich. Dies ist ein Autoren-/Uebersetzungsreview, kein automatischer Fehler.

## Principles
`PRI:<LAYER>:<slug>` bezeichnet explizit kuratierte Principles. Sprachfassungen koennen gegen dieselben Principles geprueft werden. Eine Uebersetzung soll nicht unbeabsichtigt eine andere philosophische Aussage erzeugen, muss aber keine woertliche Formulierung reproduzieren.

## Source of Truth
Der KG besitzt kanonische Identitaeten, stabile Terminologieanker, Principles und Cross-Work-/Cross-Language-Konsistenzregeln.

Werk-Repositories besitzen Manuskripte, konkrete Sprachtexte, stilistische Entscheidungen und werkbezogene Localization Decisions.

Der KG veraendert Werk-Repositories nicht direkt. Benoetigte Aenderungen werden als externe Anforderungen an das jeweilige Ziel-Repository gegeben.

## Pilot 001 - Feli
Feli ist der erste verbindliche Pilot fuer KG-0009/KG-0014.

Der Pilot prueft:
1. Band-zu-Band-Kontinuitaet.
2. Gemeinsame Orte/Objekte mit anderen Werken ohne Doppelidentitaeten.
3. Principle-Vertraeglichkeit ohne philosophische Zwangslogik.
4. Sprachfassungs-Konsistenz.

Minimaler Translation-Pilot:
- mindestens ein Feli-Werk,
- deutsche Basisfassung plus mindestens eine weitere Sprachfassung,
- wiederkehrende Eigennamen und Kernbegriffe als Terminologieprofil,
- Faktenvergleich pro Szene,
- Voice/Register-Review fuer die Zielaltersgruppe,
- dokumentierte Localization Decisions fuer nicht-triviale Abweichungen.

Der Pilot gilt erst dann als erfolgreich, wenn Band-zu-Band- und Cross-Language-Checks gemeinsam funktionieren.

## Spaetere Werkzeuge
- Translation Comparison
- Terminology Drift Check
- Canon Fact Diff
- Voice/Register Review
- Ambiguity/Reveal Check
- Localization Decision Registry
- Cross-Series Place/Entity Check
