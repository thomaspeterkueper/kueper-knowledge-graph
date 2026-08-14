# KG-0019 - Der generalisierte semantische Kern

## Status
Draft productive, 2026-08-14

## Bezug
Antwortet auf `EXT-ECO-KG-20260811-001`. Synthetisiert `KG-0009` (narratives Weltmodell), `KG-0015` (narrativer Pilot, Feli), `KG-0016` (epistemische Architektur), `KG-0017` (NOXIA-Simulationspilot), `KG-0018` (wissenschaftlicher Wissenspilot) zu einem dokumentierten allgemeinen Kern. Erfüllt die Punkte 1, 2, 4 und 5 des „Erwarteten Ergebnisses" von `EXT-ECO-KG-20260811-001`. Punkt 3 (drei Domänenbeispiele) ist mit `KG-0015`/`KG-0017`/`KG-0018` bereits erfüllt und wird hier nicht wiederholt, nur referenziert.

## Zweck
Legt fest, welcher Teil von `KG-0009` domänenübergreifend gilt und welcher strikt narrativ bleibt - ohne einen universellen OOP-Typ zu erzwingen (ausdrücklich ausgeschlossen im ursprünglichen Request).

---

## 1. Allgemeiner Kern gegenüber narrativen Spezialtypen (Erwartetes Ergebnis, Punkt 1)

### 1.1 ENTITY/OBJECT - kein neuer Typ nötig

Beantwortet „Zu prüfen" Punkt 1. `KG-0016` hat dies bereits vorweggenommen und wird hier bestätigt statt neu erfunden:

```text
Object identity -> DOC / MOD / CON / SYS / PER / ORG / PLC / SHIP / LOC / ...
```

Jeder bereits existierende typisierte Präfix trägt stabile Identität selbst. Es gibt keinen Bedarf für ein neues `ENTITY:*`- oder `OBJECT:*`-Präfix, das diese ersetzt oder überdacht. `KG-0018` bestätigt das für Konzepte ohne materiellen Referenten (`CON:L1:luca`) - Objektidentität erfordert begriffliche Stabilität, keine physische Existenz oder empirische Zugänglichkeit. `KG-0017` bestätigt es für Simulationsobjekte (Schiffe, Standorte) - dort wären eigene KG-Typen ohnehin nicht angebracht, da die Source of Truth bei NOXIA bleibt (siehe §5).

**Festlegung:** Kein neuer Universaltyp. Der bestehende, gewachsene Satz an Präfixen bleibt der Objektschicht-Standard.

### 1.2 Was bleibt strikt narrativ

Aus `KG-0009`, unverändert:

```text
STORY_ARC
SCENE
CHARACTER_KNOWLEDGE
CHARACTER_BELIEF
READER_KNOWLEDGE
```

Diese haben keine sinnvolle Entsprechung außerhalb erzählter Welten. `KG-0017` bestätigt das explizit für NOXIA (keine Perspektiventrennung in der Simulation), `KG-0018` für den wissenschaftlichen Fall (Aussagen-Ebene übernimmt die Funktion, nicht Figuren-Wissen). Keine Vermischung von narrativer Weltwahrheit und realer Evidenz - wie im ursprünglichen Request explizit gefordert.

---

## 2. Systemweite Nutzbarkeit von STATE, EVENT, ASSERTION, TIME, PROVENANCE (Erwartetes Ergebnis, Punkt 2)

### 2.1 STATE - systemweit nutzbar, mit einheitlicher Form

Beantwortet „Zu prüfen" Punkt 2 (STATE-Teil). Kanonische Form, domänenunabhängig:

```json
{
  "id": "STA:<OBJECT-ID>:<STATE-SLUG>",
  "subject": "<OBJECT-ID>",
  "validFrom": "<ISO-Zeitpunkt>",
  "validTo": "<ISO-Zeitpunkt | null>",
  "properties": { "...": "..." },
  "source": "<EVT-ID | SYS:* | DOC:*>"
}
```

`validTo: null` bedeutet „aktuell gültig". Diese Form wurde in `KG-0017` konkret für NOXIA vorgeschlagen (`entity_states`-Tabelle) und ist identisch mit der bereits in `KG-0016` skizzierten `STA:<OBJECT-ID>:<STATE-SLUG>`-Notation. Beide Piloten sind konsistent, ohne dass ich das koordiniert hätte - ein Indiz, dass die Form tatsächlich trägt.

**Festlegung:** STATE ist systemweit nutzbar. Genutzt wird es nur dort, wo ein Objekt tatsächlich zeitlich veränderliche Eigenschaften mit Abfragebedarf über die Historie hat (Schiffspositionen, Standort-Status). Für stabile Begriffe (`CON:L1:luca`, `CON:L1:autonomiegradient`) bleibt STATE ungenutzt - kein Zwang zur Anwendung.

### 2.2 EVENT - systemweit nutzbar, mit einer wichtigen Präzisierung

Beantwortet „Zu prüfen" Punkt 2 (EVENT-Teil). Kanonische Form:

```json
{
  "id": "EVT:<SCOPE>:<slug>",
  "time": { "from": "...", "to": "...|null", "precision": "...", "certainty": "..." },
  "participants": ["<OBJECT-ID>", "..."],
  "effects": [
    { "subject": "<OBJECT-ID>", "property": "...", "from": "...", "to": "..." }
  ],
  "source": "<Herkunft>"
}
```

**Präzisierung aus `KG-0018`:** Es gibt zwei kategorial verschiedene Event-Arten, die `KG-0009` nicht unterscheidet:

- **Weltereignis** - verändert den Zustand der modellierten Welt/Simulation (ein Schiff kommt an, eine Ressource wird gehandelt).
- **Wissensereignis** - verändert nicht die Welt, sondern den Wissensstand über die Welt (eine Studie wird veröffentlicht, eine Rekonstruktion wird publiziert).

Beide nutzen dieselbe `EVT`-Form, aber ihre `effects` zeigen auf unterschiedliche Zielebenen: Weltereignisse verändern Objekteigenschaften direkt, Wissensereignisse verändern Aussagen über Objekte (siehe `ASSERTION`, §2.3). Diese Unterscheidung ist neu gegenüber `KG-0009` und wird hier erstmals explizit festgehalten.

**Festlegung:** EVENT ist systemweit nutzbar, mit der Weltereignis/Wissensereignis-Unterscheidung als verbindlicher Präzisierung.

### 2.3 ASSERTION - neu eingeführt, löst den in KG-0018 gefundenen Mangel

Beantwortet „Zu prüfen" Punkte 4 und 5 zusammen - das ist der wichtigste neue Baustein dieser Synthese.

**Befund aus `KG-0018`:** Ein einzelnes `status`-Feld pro Entität kann nicht ausdrücken, dass ein Objekt gesichert existiert, während eine spezifische Behauptung darüber nur hypothetisch ist (`CON:L1:luca` ist `[R]`, sein `befund`-Text ist eher `[H]`/`[T]`). Diese Synthese löst das, ohne bestehende Entitäten rückwirkend zu ändern:

```json
{
  "id": "ASR:<subject>:<slug>",
  "concerns": "<OBJECT-ID | STA-ID | EVT-ID | REL-ID>",
  "claim": "<Freitext oder strukturierte Aussage>",
  "epistemicStatus": "[R] | [T] | [H] | [S] | [F] | [I] | [OFFEN]",
  "source": "<DOI | DOC:* | SYS:* | Autor>",
  "asOf": "<Zeitpunkt der Aussage>",
  "supersededBy": "<ASR-ID | null>"
}
```

**Wichtig:** `epistemicStatus` nutzt exakt das bestehende Marker-Vokabular aus `docs/signatur-schema.md` (`[R]/[T]/[H]/[S]/[F]/[I]/[W]/[OFFEN]`) - kein neues Vokabular. Der Unterschied ist nur, *worauf* der Marker sitzt: nicht mehr zwingend auf der Entität selbst, sondern optional auf einer eigenständigen Aussage über die Entität. Die Entität behält ihren eigenen, groben `status` als Default (weiterhin gültig und meist ausreichend); `ASSERTION` ist der Fein-Mechanismus für Fälle wie `CON:L1:luca`, wo Entitätsstatus und Detailstatus auseinanderfallen.

**Bezug zu KG-0016:** `ASSERTION` ist nicht identisch mit `KNO`. `KNO` (Claim/Belief) bleibt für perspektivisches, mehrfach-subjektives Wissen (Figur A glaubt X, Figur B glaubt Y). `ASSERTION` ist einfacher: eine einzelne, quellengebundene Aussage ohne Perspektiventrennung - für den wissenschaftlichen und simulativen Fall der Normalfall, für den narrativen Fall der Unterbau, auf dem `KNO` aufbaut, wo Perspektiven gebraucht werden.

**Festlegung:** ASSERTION ist systemweit nutzbar und wird für neue Fälle mit Entitätsstatus/Detailstatus-Divergenz empfohlen. Bestehende Entitäten werden nicht rückwirkend migriert (siehe „Nicht Ziel" im ursprünglichen Request).

### 2.4 TIME und PROVENANCE - bereits durchgängig vorhanden, hier nur benannt

Beantwortet „Zu prüfen" Punkt 2 (Rest). Beide sind in der Praxis bereits systemweit in Gebrauch (`erstellt`/`created`, `kurator`/`curator`, `quelle`/`source` auf praktisch jeder Entität und Relation dieser Session). Diese Synthese erhebt das nur zur expliziten Regel statt es implizit zu lassen:

**Festlegung:** Jedes `EVENT`, jede `ASSERTION` und jedes `STATE` trägt verpflichtend ein Zeitfeld (`time`/`validFrom`/`asOf`) und ein Herkunftsfeld (`source`). Für `OBJECT`/`RELATION` bleibt es wie bisher üblich (empfohlen, durchgängig gelebt, aber nicht in jedem historischen Datensatz nachgetragen).

---

## 3. Widerspruchs- und Provenienzregeln (Erwartetes Ergebnis, Punkt 4)

Übertragen aus `ECO-ARC-0019 §II.5` (Mehrfach-Agenten-Konfliktregel), dort für Repository-Drift entwickelt, hier auf `ASSERTION`-Ebene generalisiert - dieselbe Grundregel trägt in beide Richtungen:

1. **Formal begründete Aussage vor unbegründeter.** Eine `ASSERTION` mit belastbarem `source`-Feld (DOI, publiziertes Dokument, formaler Request) geht einer Aussage ohne nachvollziehbare Herkunft vor.
2. **Zwei formal begründete, aber widersprüchliche Aussagen werden nicht stillschweigend gemergt oder einseitig bevorzugt.** Beide bleiben bestehen; die neuere erhält `supersededBy`-Verweis nur, wenn tatsächlich eine echte Ablösung vorliegt (nicht bei bloßem Widerspruch zwischen gleichrangigen Quellen). Bei echtem, nicht auflösbarem Widerspruch: Eskalation an den Kurator, wie in `ECO-ARC-0019` für Repository-Konflikte bereits etabliert.
3. **Nie eine `ASSERTION` überschreiben.** Widerruf oder Korrektur erzeugt eine neue `ASSERTION` mit `supersededBy`-Verweis auf die alte - die alte bleibt lesbar (Nachvollziehbarkeit, analog zur Nicht-Löschung in `docs/signatur-schema.md`s Revisionsprinzip).
4. **Objektstatus und Aussagenstatus widersprechen sich nicht per Definition.** `CON:L1:luca` bleibt `[R]`, während eine zugehörige `ASSERTION` `[H]` sein kann - das ist der Normalfall, kein Fehlerzustand (siehe §2.3).

---

## 4. Antworten auf die verbleibenden „Zu prüfen"-Punkte

**Punkt 6 (Prospektionskette):** Bildet sich auf `EVENT` (Wissensereignis-Variante) und `ASSERTION` ab, aber nicht als eigener Kernbaustein - als domänenspezifische Erweiterung, wie in „Gewünschte Architekturgrenze" des ursprünglichen Requests für die „Wissenschaftliche Erweiterung" vorgesehen. `KG-0018` bestätigt: passt auf den LUCA-Fall (Messung → Rekonstruktionsargument → publizierter Befund), `KG-0017` bestätigt die Nicht-Anwendung auf NOXIA (direkt simulierte, nicht gemessene Wahrheit).

**Punkt 7 (Referenzierung ohne Source-of-Truth-Verlagerung):** Durchgängig eingehalten in allen drei Piloten - `source`/`concerns`/`participants`-Felder verweisen auf externe Systeme (`SYS:NOXIA:*`, DOI, `DOC:KUE:*`), ohne deren Inhalte zu duplizieren. Keine neue Regel nötig, nur Bestätigung der bereits gelebten Praxis.

**Punkt 8 (KXF-Projektionen):** Kein sofortiger Major-Stand nötig. Vorschlag: `ASSERTION` und die Weltereignis/Wissensereignis-Unterscheidung können additiv in bestehende Exporte einfließen (analog zum Shard-Prinzip aus `KG-0016`: `exports/assertion-registry-0.1.json` als neue, eigenständige Datei statt Umbau bestehender Exporte). Keine Entscheidung in diesem Dokument - Umsetzung folgt bei Bedarf.

---

## 5. Was bewusst noch nicht generalisiert wird (Erwartetes Ergebnis, Punkt 5)

- **Rückwirkende Migration bestehender Entitäten auf `ASSERTION`.** `CON:L1:luca` behält vorerst nur seinen `status`/`befund`-Freitext; die Umstellung auf eine separate `ASSERTION` ist eine Empfehlung (§2.3), keine durchgeführte Änderung - ausdrücklich im „Nicht Ziel" des Requests ausgeschlossen.
- **Automatisierte Widerspruchserkennung.** Die Regeln aus §3 sind beschrieben, nicht durch Tooling erzwungen (anders als `ECO-ARC-0019`s CI-Check für Repository-Drift, der bewusst nur strukturelle, nicht semantische Widersprüche prüft).
- **`KNO`/`ASSERTION`-Verhältnis in voller Tiefe.** §2.3 grenzt beide ab, aber eine vollständige Migrationsregel (wann wird ein `KNO` zu einer `ASSERTION` oder umgekehrt) ist nicht Teil dieser Synthese.
- **KXF-Schema-Umsetzung.** Punkt 8 bleibt Vorschlag, keine Implementierung.
- **Ein viertes oder weiteres Domänenbeispiel.** Die drei geforderten (narrativ, Simulation, wissenschaftlich) gelten als ausreichend für diese Synthese; weitere Fälle (z. B. OTA-Dokumentenarchiv als eigener Fall) wären eine separate, spätere Vertiefung.

---

## Ergebnis

Der allgemeine Kern besteht aus fünf Bausteinen (`OBJECT` - kein neuer Typ, `RELATION` - bereits etabliert, `STATE`, `EVENT` mit Weltereignis/Wissensereignis-Unterscheidung, `ASSERTION` als neuer, epistemisch feinkörniger Baustein) plus `TIME`/`PROVENANCE` als durchgängige Pflichtfelder auf den zeit-/quellenfähigen Bausteinen. Narrative Spezialtypen (`STORY_ARC`, `SCENE`, `CHARACTER_KNOWLEDGE`, `CHARACTER_BELIEF`, `READER_KNOWLEDGE`) bleiben unverändert narrativ-exklusiv. Die Widerspruchsregel ist keine Neuerfindung, sondern die direkte Übertragung von `ECO-ARC-0019`s Repository-Konfliktprinzip auf die Aussagenebene - derselbe Grundsatz trägt an beiden Stellen.

## Bezug zu EXT-ECO-KG-20260811-001
Erfüllt „Erwartetes Ergebnis" Punkte 1, 2, 4, 5 vollständig. Punkt 3 war bereits durch `KG-0015`/`KG-0017`/`KG-0018` erfüllt. Damit ist der offene Request inhaltlich vollständig bearbeitet - Schließung liegt beim Kurator, nicht bei diesem Dokument selbst (Folgebezug des Requests sieht eine anschließende Ökosystem-Prüfung vor, ob ein systemweiter Architekturstandard daraus abgeleitet wird).
