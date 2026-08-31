# KG-0021 — Permanentmagnet-Werkstoffe und Temperaturbegriffe

## Status

Canonical, 2026-08-31

## Anlass

SSF verwendet in den Entwurfsmodulen `MAG-004` und `MAG-005` bereits kanonisch wirkende `CON:MAT:*`-Referenzen. Vor KG-0021 waren diese Identitäten im Knowledge Graph nicht registriert. Der Research Candidate `RES-20260831-EAA9EDD9` R2 liefert eine belastbare wissenschaftliche Abgrenzung für Ferrit, AlNiCo, SmCo, NdFeB sowie Curie-Temperatur, Arbeitstemperatur und Entmagnetisierung.

Der Knowledge Graph registriert hier die stabilen Begriffsidentitäten. Konkrete Lehrtexte, Quizfragen und didaktische Reihenfolge bleiben SSF-eigene Source of Truth.

## KnowledgeDomain

`KD:MAT-MAGNETIC-MATERIALS:N2` — Magnetische Werkstoffe und Permanentmagnete, arbeitsfähiges Grundverständnis.

Die Domäne umfasst Werkstoffklassen von Permanentmagneten, Energiedichte, Koerzitivität, Temperaturverhalten, Korrosionsschutz, Rohstoffabhängigkeit und die Trennung intrinsischer Werkstoffeigenschaften von grade- und anwendungsabhängigen Designgrenzen.

## Kanonische Konzepte

### `CON:MAT:ferrite-magnet` — Hartferrit-Permanentmagnet

Oxidischer Permanentmagnet auf Basis hartmagnetischer Ferrite. Gegenüber Seltene-Erden-Magneten typischerweise geringere magnetische Energiedichte, dafür robuste Rohstoffbasis und in vielen Umgebungen gute Korrosionsbeständigkeit. Konkrete Kennwerte sind material-, grade- und prozessabhängig.

### `CON:MAT:alnico` — AlNiCo-Permanentmagnet

Permanentmagnet-Werkstofffamilie auf Basis von Aluminium, Nickel, Kobalt und Eisen. Charakteristisch sind hohe Remanenz und hohe Temperaturtauglichkeit geeigneter Grades bei vergleichsweise geringer Koerzitivität; der Magnetkreis muss daher gegen Entmagnetisierung passend ausgelegt werden.

### `CON:MAT:smco` — Samarium-Kobalt-Permanentmagnet

Seltene-Erden-Permanentmagnetfamilie, insbesondere SmCo5 und Sm2Co17. Sie verbindet hohe Koerzitivität und hohe Energiedichte mit guter Hochtemperaturfähigkeit geeigneter Grades. Rohstoffabhängigkeit von Samarium und Kobalt ist Teil der Werkstoffbewertung.

### `CON:MAT:ndfeb` — Neodym-Eisen-Bor-Permanentmagnet

Seltene-Erden-Permanentmagnetfamilie auf Basis der Nd2Fe14B-Phase. Sie erreicht unter den vier hier betrachteten Klassen die höchste verbreitete kommerzielle Energiedichte. Temperaturgrenzen und Koerzitivität sind stark gradeabhängig; gesintertes NdFeB ist korrosionsanfällig und wird in vielen Anwendungen geschützt.

### `CON:MAT:curie-temperature` — Curie-Temperatur

Temperatur, oberhalb der ein ferromagnetischer beziehungsweise ferrimagnetischer Werkstoff seine spontane magnetische Ordnung verliert. Die Curie-Temperatur ist eine intrinsische beziehungsweise werkstoffnahe Größe und nicht mit der zulässigen maximalen Einsatztemperatur eines konkreten Magneten gleichzusetzen.

### `CON:MAT:working-temperature` — zulässige Arbeitstemperatur eines Permanentmagneten

Anwendungs- und gradeabhängige Temperaturgrenze, innerhalb der ein Magnet unter definiertem Magnetkreis, Gegenfeld, Geometrie und zulässiger Flussänderung betrieben werden kann. Sie ist kein universeller Materialklassenwert und kann deutlich unterhalb der Curie-Temperatur liegen.

### `CON:MAT:demagnetization` — Entmagnetisierung

Abnahme des nutzbaren magnetischen Zustands eines Permanentmagneten durch Temperatur, Gegenfelder, ungünstigen Arbeitspunkt oder andere Einflüsse. Reversible und irreversible Anteile sind zu unterscheiden; die konkrete Empfindlichkeit hängt unter anderem von Werkstoffgrade, Geometrie und Magnetkreis ab.

## Evidenz- und Zahlenregel

`RES-20260831-EAA9EDD9` R2 stützt die Klassencharakterisierung und grobe Orientierungsbereiche, nicht zeitlose Einzelwerte für jede Materialfamilie.

Daher gelten folgende Regeln:

1. Curie-Temperatur darf nicht als maximale Einsatztemperatur dargestellt werden.
2. `Tmax` ist grade-, geometrie-, gegenfeld- und kriteriumsabhängig.
3. Marktpreise, Exportregeln, Produktionsanteile und Recyclingkapazitäten sind datierte Snapshots und keine invarianten Eigenschaften eines `CON:MAT:*`-Konzepts.
4. Herstellerwerte dürfen nur mit Grade-/Quellenkontext verwendet werden.
5. Aussagen wie „NdFeB muss immer beschichtet werden“, „SmCo ist immer die teuerste Lösung“ oder „Schiene-ähnlich bester Preis pro Fluss“ sind als universelle Regeln unzulässig.

## SSF-Mapping

Die bestehenden SSF-Entwurfsreferenzen werden bestätigt:

- `MAG-004.key_concepts` -> `CON:MAT:ferrite-magnet`, `CON:MAT:alnico`, `CON:MAT:smco`, `CON:MAT:ndfeb`
- `MAG-005.key_concepts` -> `CON:MAT:curie-temperature`, `CON:MAT:demagnetization`, `CON:MAT:working-temperature`

`MAG-004` und `MAG-005` selbst sind damit noch keine KG-registrierten LearningModule-IDs. Die kanonische Modulregistrierung erfolgt separat nach dem KXF-Learning-ID-Schema.

## Ownership

Knowledge Graph besitzt:
- Concept- und KnowledgeDomain-IDs,
- systemübergreifende Begriffssemantik,
- Mappings und KXF-Export.

SSF besitzt:
- Modultext,
- Lernziele,
- Beispiele,
- Assessments,
- didaktische Reihenfolge und Darstellung.
