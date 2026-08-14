# KG-0018 - Wissenschaftlicher Wissensfall-Pilot 001 (LUCA / Autonomiegradient)

## Status
Draft productive, 2026-08-14

## Bezug
Antwortet auf `EXT-ECO-KG-20260811-001` (Generalisierbares Object-Relation-State-Event-Modell). Liefert das dritte und letzte Pflicht-Domänenbeispiel (wissenschaftlicher Wissensfall), neben dem narrativen Fall (`KG-0015`) und dem NOXIA-Simulationsfall (`KG-0017`). Nutzt bereits vorhandenes Material (`CON:L1:luca`, `CON:L1:autonomiegradient`, `REL-BIO-0001`, `REL-OMNI-0001`, `RES-MET-20260811-001`) statt einen künstlichen Fall zu konstruieren. Ergänzt `KG-0016 - Gedächtnismodell und epistemische Architektur`, dessen Observation/Episode/Claim/Belief-Leiter hier auf einen realen naturwissenschaftlichen Fall angewendet wird.

## Zweck
Prüft, wie ein wissenschaftliches Konzept ohne materiellen Referenten (Theorie, Rekonstruktion, Gradient) im generalisierten Kern behandelt wird - und wo eine einzelne Entität mit einem einzelnen Status-Marker die tatsächliche epistemische Lage bereits unterkomplex abbildet.

## Source-of-Truth-Grenze
Der Knowledge Graph speichert keine Primärforschung. Die zugrundeliegende Publikation (Mrnjavac, N.; Hoffmann, N.K.; Schlikker, M.L. et al., *Science Advances* 2026, eaef3128, DOI 10.1126/sciadv.aef3128) bleibt externe Quelle. Der KG speichert eine referenzierbare, provenienzfähige Projektion ihres zentralen Befunds - nicht den Volltext, nicht die Rohdaten.

## Der Fall

**`CON:L1:luca`** - letzter universeller gemeinsamer Vorfahr des irdischen Lebens. Kein Fossil, kein direkt beobachtbares Objekt: LUCA existierte vor ca. 4 Milliarden Jahren und wird ausschließlich über methodische Rekonstruktion (vergleichende Genomik, Geochemie) erschlossen.

**`CON:L1:autonomiegradient`** - ein systemtheoretisches Maß (Substitution, Reproduktion, Regulation, organisatorische Schließung), kein Objekt, sondern ein Bewertungsrahmen mit stabiler begrifflicher Identität.

**`REL-BIO-0001`**: `luca EXEMPLIFIES autonomiegradient` - LUCAs rekonstruierte schrittweise Übernahme geochemisch bereitgestellter katalytischer Funktionen illustriert einen Autonomie-Übergang.

## Abbildung der fünf Bausteine

### OBJECT
`CON:L1:luca` und `CON:L1:autonomiegradient` sind beide `Concept`-Objekte (nicht `PER`/`ORG`/`PLC` - kein physischer Referent nötig für stabile Identität). Deckt sich mit KG-0009s Grundregel: *ein Ding mit stabiler Identität bleibt dieselbe Entität, auch wenn sich das Wissen darüber ändert.* Wichtig hier: Die Identität von `CON:L1:luca` ist stabil, **obwohl LUCA selbst nie direkt beobachtet werden kann und wird** - Objektidentität im KG erfordert keine empirische Zugänglichkeit, nur begriffliche Stabilität.

### RELATION
`REL-BIO-0001` (`luca EXEMPLIFIES autonomiegradient`, Status `[R]`) und `REL-OMNI-0001` (`autonomiegradient THEORETICAL_EXTENSION omnizedenz`, Status `[T]`) sind bereits explizite, typisierte Kanten nach KG-0003/KG-0009-Muster - inklusive Provenienz (`kurator`, `erstellt`) und Kommentarfeld, das die Relation gegen Fehlinterpretation absichert (*"Die Relation ist eine methodologische Analogie [...] behauptet weder eine biologische Herleitung [...] noch eine gemeinsame ontologische Struktur"* - siehe `RES-MET-20260811-001`).

### STATE
Für Konzepte wie diese ist STATE typischerweise nicht relevant - `CON:L1:luca` hat keinen zeitgebundenen Zustand im KG-0009-Sinn (kein "LUCA war am Datum X in Zustand Y"). Was sich zeitlich ändert, ist nicht der Zustand des Objekts, sondern der **Forschungsstand über** das Objekt - das ist kein STATE, sondern eine Folge von EVENTs auf der Wissensebene (siehe unten).

### EVENT
Die Publikation selbst ist ein modellierbares Ereignis auf der Wissensebene, kein Zustandsereignis der Welt:

```json
{
  "id": "EVT:L1:mrnjavac-2026-luca-reconstruction",
  "type": "Event",
  "time": { "from": "2026", "precision": "year", "certainty": "canonical" },
  "participants": ["CON:L1:luca"],
  "effects": [
    {
      "subject": "CON:L1:luca",
      "property": "reconstructed_metabolic_stage",
      "from": "unknown",
      "to": "native-metal-catalyzed intermediate stage (hypothesis)"
    }
  ],
  "source": "DOI:10.1126/sciadv.aef3128"
}
```

Das Event verändert nicht LUCA (der existierte oder existierte nicht, unabhängig von 2026er Publikationen), sondern den **Wissensstand über** LUCA. Diese Unterscheidung - Weltereignis vs. Erkenntnisereignis - existiert in KG-0009 nicht explizit und ist ein echter Befund dieses Piloten (siehe unten).

### KNOWLEDGE / ASSERTION - der Kern des Falls

Hier trägt `KG-0016`s Vier-Ebenen-Leiter direkt:

```text
Observation  -> vergleichende Genomdaten, geochemische Messungen an
                serpentinisierenden hydrothermalen Systemen (nicht im KG,
                liegen in der Publikation/Primärdaten)

Episode      -> die konkrete Studie Mrnjavac et al. 2026 als
                abgeschlossener Erkenntnisvorgang

Claim        -> "native Übergangsmetalle fungierten als katalytische
                Vorläufer von Enzymen/Kofaktoren am Ursprung des
                Stoffwechsels" - eine geäußerte, quellenbezogene Behauptung

Belief       -> im KG nicht als generalisierte Wahrheit übernommen, sondern
                als Entitäts-Attribut (`befund`-Feld) mit Quellenbindung
                gehalten - genau die von KG-0016 geforderte Nicht-Wäsche
                des epistemischen Status
```

## Befund: Ein einzelner Status-Marker ist für diesen Fall unterkomplex

`CON:L1:luca` trägt `status: [R]` (Real). Das ist für **die Existenz von LUCA** als solche vertretbar (breiter wissenschaftlicher Konsens: irgendein letzter gemeinsamer Vorfahr existierte). Es ist **nicht** vertretbar für die im `befund`-Feld beschriebene spezifische Rekonstruktion (native Metallkatalyse als Zwischenstufe) - das ist eine Forschungshypothese eines einzelnen 2026er Papers, epistemisch näher an `[H]` (Hypothese) oder `[T]` (Theorie) als an `[R]`.

Das Modell hat aktuell keine Möglichkeit, „die Entität ist real, aber dieser spezifische Befund über sie ist nur hypothetisch" auf derselben Entität auszudrücken - ein einzelnes `status`-Feld zwingt zur Vergröberung auf einen Wert für das ganze Objekt. Das ist kein Fehler dieses Piloten, sondern eine echte Grenze, die die Generalisierung sichtbar macht: KG-0009s Status-Marker (`canonical`, `work_derived`, `asserted`, `uncertain`, `superseded`, `non_canonical`) sind pro Relation/Aussage vergeben, nicht pro Objekt - für narrative Fälle passend, weil dort meist Relationen/Events strittig sind, nicht die Objektexistenz selbst. Für wissenschaftliche Fälle ist oft die Objektexistenz gesichert, aber einzelne Detailbehauptungen darüber sind es nicht - genau der `KNO`/`Claim`-Mechanismus aus KG-0009/KG-0016 sollte diese Feindifferenzierung tragen, nicht das grobe Entity-Level-`status`-Feld.

**Empfehlung, keine Vorgabe:** Detailbehauptungen wie den `befund`-Text nicht als Freitext-Feld auf der Entität, sondern als eigene `KNO:CON:L1:luca:CLAIM:...`-Assertion mit eigenem Status/Confidence zu führen - die Entität selbst bliebe `[R]` (LUCA existierte), die spezifische Rekonstruktion würde separat, niedrigerer Sicherheit, geführt. Nicht in diesem Piloten umgesetzt, da das eine Strukturänderung an bestehenden, bereits kanonisierten Entitäten wäre.

## Was nicht generalisiert wird

- **Kein STATE für Konzepte.** Weder `luca` noch `autonomiegradient` brauchen zeitgebundene Zustände - der generalisierte STATE-Baustein ist für Objekte mit veränderlichen Eigenschaften gedacht (Schiffe, Figuren, Standorte), nicht für stabile Begriffe.
- **Kein `KNOWLEDGE_BELIEF` im narrativen Sinn.** Es gibt keine Figuren, die etwas glauben - stattdessen die oben skizzierte, noch nicht umgesetzte Claim/Confidence-Struktur auf Aussagenebene.
- **Die Prospektionskette (`Ground Truth -> Measurement -> Interpretation -> Discovery`) passt hier tatsächlich**, anders als bei NOXIA (`KG-0017`): Geochemische Messung -> Rekonstruktionsargument -> publizierter Befund -> `CON:L1:luca.befund`. Das ist der einzige der drei Piloten, auf den dieses Muster zutrifft - konsistent mit der Erwartung, dass es primär für OTA-/SSF-artige Beobachtungsfälle gedacht ist.

## Harte Regeln
1. `CON:L1:luca`s `status: [R]` bezieht sich auf die Objektexistenz, nicht auf die Richtigkeit jeder im `befund`-Feld beschriebenen Detailbehauptung. Diese Unschärfe wird hier dokumentiert, nicht stillschweigend gelöst.
2. `REL-OMNI-0001` bleibt `[T]` (Theorie) und wird nicht durch die Beziehung zu `CON:L1:luca` (`[R]`) aufgewertet - Status vererbt sich nicht über Relationen.
3. `METHODOLOGICAL_ANALOGY_TO` (aus `RES-MET-20260811-001`) bleibt ausdrücklich keine fachliche Ableitung - dieser Pilot ändert daran nichts.
4. Kein neues Registry-Schema wird durch diesen Piloten erzwungen; die Claim/Confidence-Empfehlung ist ein Vorschlag für eine spätere Entscheidung, keine Umsetzung.

## Ergebnis
Der generalisierte Kern trägt auch für den wissenschaftlichen Wissensfall - `OBJECT` und `RELATION` unmittelbar, `EVENT` mit einer wichtigen Präzisierung (Wissensereignis vs. Weltereignis, in KG-0009 bisher nicht unterschieden), `STATE` korrekt nicht anwendbar, und `KNOWLEDGE/ASSERTION` über KG-0016s Leiter grundsätzlich passend - aber mit einer echten, benannten Grenze: die aktuelle Ein-Status-pro-Entität-Praxis kann „Objekt gesichert, Detailbehauptung hypothetisch" nicht gleichzeitig ausdrücken. Das ist der wertvollste Fund dieses Piloten - eine konkrete, nicht triviale Lücke, die eine echte Generalisierungsentscheidung erfordert, statt nur zu bestätigen, dass alles schon passt.

## Bezug zu EXT-ECO-KG-20260811-001
Erfüllt Domänenbeispiel 3 von 3 ("wissenschaftlicher Wissensfall, z. B. LUCA/Autonomiegradient oder AVI"). Damit sind alle drei im „Erwarteten Ergebnis" geforderten Domänenbeispiele geliefert (narrativ: `KG-0015`; Simulation: `KG-0017`; wissenschaftlich: dieses Dokument). Verbleibend aus dem „Erwarteten Ergebnis": Punkt 1 (dokumentierter allgemeiner Kern vs. narrative Spezialtypen), Punkt 2 (Festlegung, ob STATE/EVENT/ASSERTION/TIME/PROVENANCE systemweit nutzbar sind) und Punkt 4 (Widerspruchs-/Provenienzregeln) - diese sind Synthese-Schritte über alle drei Piloten hinweg, kein weiteres Domänenbeispiel.
