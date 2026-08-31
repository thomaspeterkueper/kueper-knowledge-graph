# KG-0017 — Contracomology: kanonische Kernbegriffe und Consumer-Freigabe

**Status:** canonical  
**Datum:** 2026-08-31  
**Owner:** SYS:KUEPER:knowledge-graph  
**Quelle:** KG-0013-CONTRACOMOLOGY-ONBOARDING, thomaspeterkueper/contracomology/lib/course.ts  
**Anforderungen:** KG.KON-000001, KG.KON-000003, KG.KON-000004, KG.KON-000005

## Entscheidung

`KD:KON:N1` ist als Knowledge Domain kanonisch freigegeben. Contracomology/Kontrakomologie bleibt eine Werk-Theorie des KUEPER-Ökosystems. Die Freigabe ist keine Behauptung externer wissenschaftlicher Validierung, kein Peer-Review und kein empirischer Befund.

Die nachstehenden Concept-IDs sind KG-kuratiert. Consumer dürfen sie referenzieren. SSF darf darauf einen Academy-/Kurskontext aufbauen; NOXIA darf sie als Wissens-/Kompetenzreferenzen nutzen. Gameplay-Wirkung und Balancing bleiben ausschließlich NOXIA Source of Truth, didaktischer Inhalt ausschließlich SSF Source of Truth.

## Kanonische Begriffe

### `CON:L1:zeitform` — Zeitform

Ein Denk- und Ordnungsrahmen, in dem zeitliche Abläufe gegliedert, gewichtet und erlebt werden. Im Contracomology-Kontext bezeichnet Zeitform keine neue physikalische Zeitvariable, sondern eine theoretische Perspektive darauf, wie zeitliche Beziehungen strukturiert und interpretiert werden.

### `CON:L1:avi-punkt` — AVI-Punkt

Ein expliziter Bezugspunkt, an dem Beobachtung, Interpretation und Orientierung zusammengeführt werden. Der Begriff bezeichnet im Contracomology-Kurs eine Perspektiv- bzw. Referenzposition; er ist nicht mit einem eigenständigen physikalischen Postulat des AVI-Modells gleichzusetzen.

### `CON:L1:oem` — Omnizedentes Entfaltungsmodul

Eine strukturelle Einheit der Werk-Theorie, die einen vollständigen Transformationsprozess beschreibt: von einer offenen Ausgangslage über einen Phasen- bzw. Übergangsschritt zu einer veränderten Offenheit. OEM bezeichnet einen Prozess, keinen statischen Zustand.

### `CON:L1:ma-u` — Ma'U

Reservierter kanonischer Concept-Anker aus dem Contracomology-/Mishkenaz-Begriffsraum. Die semantische Detaildefinition ist noch nicht ausreichend quellengesichert. Der Anker darf zur Identitätsauflösung verwendet werden, aber nicht als Grundlage für fachliche Aussagen oder Gameplay-Regeln.

### `CON:L1:ma-ta-u` — Ma'Ta'U

Reservierter kanonischer Concept-Anker aus dem Contracomology-/Mishkenaz-Begriffsraum. Die semantische Detaildefinition ist noch nicht ausreichend quellengesichert. Der Anker darf zur Identitätsauflösung verwendet werden, aber nicht als Grundlage für fachliche Aussagen oder Gameplay-Regeln.

### `CON:L1:paradigma-1` — Objektperspektive

Perspektive, in der abgegrenzte Objekte, Eigenschaften und Zustände die primären Beschreibungseinheiten bilden.

### `CON:L1:paradigma-2` — Beziehungsperspektive

Perspektive, in der Beziehungen, Kopplungen und wechselseitige Abhängigkeiten zwischen Einheiten die primären Beschreibungseinheiten bilden.

### `CON:L1:paradigma-3` — Transformationsperspektive

Perspektive, in der Übergänge, Prozesse und Veränderungsregeln zwischen Zuständen bzw. Relationen die primären Beschreibungseinheiten bilden.

## Statusregeln

- `zeitform`, `avi-punkt`, `oem`, `paradigma-1`, `paradigma-2`, `paradigma-3`: `canonical` für Identität und obige KG-Definition.
- `ma-u`, `ma-ta-u`: `canonical_anchor`, Definition weiterhin `pending_definition`; sie blockieren den Einführungskurs nicht.
- Epistemischer Marker aller acht Begriffe: `[W]` / Werk-Theorie.

## Consumer-Freigabe

### SSF

Der KG-Blocker für einen Contracomology-Academy-Eintrag ist aufgehoben. Das verifizierte Portalziel ist `https://contracomology.org/`. SSF darf einen Lern-/Katalogeintrag mit `KD:KON:N1` und den freigegebenen Concept-IDs anlegen. `KON` ist als Subject-Code fachlich genehmigt; die konkrete SSF-Modul-ID bleibt im Learning-Contract des KG/SSF zu registrieren.

### NOXIA

Der KG-Blocker für die Evaluation von Contracomology als Crew-/Langzeitmissionskompetenz ist aufgehoben. NOXIA darf `KD:KON:N1` und die freigegebenen Concept-IDs referenzieren. Ob und wie daraus Stabilitäts-, Konflikt-, Kommunikations- oder Kulturmechaniken entstehen, ist eine NOXIA-Entscheidung und keine KG-Festlegung.

## Source-of-Truth-Grenzen

- Knowledge Graph: IDs, Definitionen, Relationen, epistemischer Status.
- Contracomology: Fachportal und eigener Kurs-/Darstellungsinhalt.
- SSF: Didaktik, Academy-Katalog, Lernmodule und Lernpfade.
- NOXIA: Gameplay-Mechanik, Balancing, UI und Anwendung.
