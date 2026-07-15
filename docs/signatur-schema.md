# Signatur-Schema für Akteure und Objekte

**KG-Arbeitsdokument · Ergänzungsvorschlag zur Schichtenkarte v0.3 · NICHT kanonisch**
*Revision 0.2 — Steward-Korrekturen gegen kanonischen Bestand (ARC-0006 §I / §III / §VIII)*

> Vom KG verfasst. Kanonisiert nichts. Eine Aufnahme wäre ein OTA-Akt (ARC-0008
> oder Anhang), kein KG-Alleingang.

---

## Ausgangsproblem  *(unverändert übernommen)*

Schicht 0 (Akteure) und Schicht 1 (`signature-registry`) lösen strukturell
dasselbe: etwas systemübergreifend referenzierbar machen, ohne dass ein System das
Referenzierte besitzen muss. Getrennt entstehen zwei Resolver — einer für „wer",
einer für „was". Dieser Vorschlag vereint beide unter einem Format.

## Grundprinzip  *(unverändert, endorsed)*

**Akteure sind ein Typ im Signatur-Schema, keine Ausnahme davon.** `identity` ist
eine von mehreren `domain`-Ausprägungen, gleichrangig mit KD, ARC oder Modul.

---

## Format

```
kueper:<domain>:<type>:<local-id>[:<version>]
```

> **⚠ Steward-Korrektur 1 — `local-id` EMBETTET kanonische IDs, ersetzt sie nicht.**
> Der Erstentwurf schrieb `kueper:ota:arc:0006` und
> `kueper:ssf:module:intro-solar-physics`. Beides kollidiert mit ARC-0006 §III:
> Die kanonischen IDs sind `OTA-ARC-0006-2026-DE` und `MAT-L0-000001`, und der KG
> ist deren **alleinige** Vergabestelle (§III.2). Ein truncierendes Slug-Format
> wäre ein **drittes, konkurrierendes ID-System**. Deshalb: `kueper:*` ist eine
> **Adress-/URI-Schicht**, die die kanonische ID als `local-id` *trägt* — kein
> Ersatz. ARC-0006 §III bleibt unangetastet.

| Segment | Bedeutung | Beispiele |
|---|---|---|
| `domain` | **besitzendes** System (Source of Truth) | `identity`, `kg`, `ota`, `ssf`, `noxia`, `kue` |
| `type` | Kategorie in der Domain | `person`, `org`, `faction`, `kd`, `arc`, `module`, `path`, `progress` |
| `local-id` | stabile ID des Besitzers — **kanonische ID, wo eine existiert** | `MAT-L0-000001`, `OTA-ARC-0006-2026-DE`, `thomas-kueper` |
| `version` | optional; nur wo nicht schon in der kanonischen ID enthalten | `v2`, `2026-07` |

### Beispiele (korrigiert)

```
kueper:identity:person:thomas-kueper
kueper:identity:org:ssf
kueper:identity:ai-system:omni
kueper:identity:faction:helios-corp
kueper:kg:kd:resonanztheorie-basis
kueper:kg:module:MAT-L0-000001          ← war fälschlich ssf:module:<slug>
kueper:kg:path:PATH-SSF-MATH-BAYES      ← PATH ist KG-registriert (§VIII)
kueper:ota:arc:OTA-ARC-0006-2026-DE     ← volle kanonische Signatur, Version bereits enthalten
kueper:ssf:progress:u_0192              ← SSFs eigene Lerndaten (legitim)
kueper:ssf:achievement:first-quiz
kueper:noxia:faction-state:helios-corp  ← lokaler Spielzustand (unverändert korrekt)
```

> **⚠ Steward-Korrektur 2 — `module` und `path` sind `kg`, nicht `ssf`.**
> ARC-0006 §I: „Wer ein Lernmodul anlegt, legt es im KG an. SSF liest es aus."
> §VIII.1: PATHs sind **im KG registriert**; SSF übernimmt nur die didaktische
> Zusammenstellung. Damit ist die Domain für Modul- und Pfad-**Objekte** `kg`.
> SSFs *eigene* Domain-Einträge sind seine Lerndaten: `progress`, `achievement`,
> `recommendation`, `difficulty`, `unlock` — nicht die Module/Pfade selbst. Sonst
> kehrt das Schema die KG→SSF-Richtung um.

Weiterhin gilt (unverändert, gut): `identity:faction:helios-corp` (der Akteur) und
`noxia:faction-state:helios-corp` (sein Spielzustand) sind bewusst **zwei**
Signaturen — siehe „Akteur vs. lokaler Zustand".

---

## Warum das Format die Invarianten respektiert  *(übernommen)*

- **Namespace = besitzendes System.** Referenzieren überträgt keine Semantik.
- **Signatur trägt keine Fachlogik** — opaker Schlüssel, Hermes-kompatibel
  (Hermes transportiert, definiert nicht → Schichtenkarte §Invarianten).
- **Stabil über Ortswechsel** — nur der Registry-Eintrag ändert sich, nicht die Signatur.
- **Kein System muss fremde Daten besitzen, um zu referenzieren.**

---

## Akteur vs. lokaler Zustand — Grenze bleibt  *(übernommen)*

- `kueper:identity:*` = **wer/was etwas ist** (semantisch, KG-verwaltet)
- `kueper:noxia:*`, `kueper:ssf:*` = **lokaler Zustand** dieses Akteurs (verbleibt bei der App)

```
kueper:identity:person:thomas-kueper
  ├─ kg:    node-id  4471
  ├─ ssf:   user-id  u_0192
  ├─ noxia: player-id p_0044
  └─ kue:   author-id a_02
```

> **Design-Vermerk (kein Blocker) — die Registry erfüllt bewusst ZWEI Relationen:**
> (1) *Ortsauflösung*: Signatur → Speicherort (das, was die bestehende
> `signature-registry` heute tut). (2) *Identitäts-Aliasing*: Akteur → lokale IDs
> je System (die Tabelle oben). Ein Format, aber zwei Relationen — das sollte
> bewusst so entworfen sein, nicht versehentlich in einen Topf fallen.

---

## Was das für Schicht 0 / 1 bedeutet  *(übernommen, präzisiert)*

- **Schicht 0** wird prüfbar: Die offene Setzung „KG besitzt semantische Identität"
  konkretisiert sich zu „wer schreibt `identity:*`-Einträge" — Antwort kann bei KG
  bleiben, ohne dass KG Governance-Autorität über ARC gewinnt.
- **Schicht 1** bekommt ein einheitliches, explizites Schema statt eines impliziten.

---

## Was der Vorschlag NICHT tut  *(übernommen)*

- Kanonisiert nichts. `domain: identity` bleibt `[OFFEN]`, bis Schicht 0 bestätigt ist.
- Entscheidet keine Lesepfade (`KG→NOXIA`). Regelt Referenzierbarkeit, nicht Zugriff.
- Ersetzt Hermes nicht. Signaturen sind ein Feldtyp in Verträgen, kein Konkurrenzsystem.

---

## Wege zur Umsetzung (Zuständigkeiten)

- **Dieses Dokument verfeinern** → KG-Domäne, kein external-task.
- **Adoption des systemübergreifenden Adressformats** → Schicht-1-Governance =
  OTA/Kurator (ARC-0008 oder Anhang), external-task ins OTA.
- **Lokale IDs für die Alias-Tabelle exponieren** (SSF/NOXIA/KUE liefern `user-id`,
  `player-id`, `author-id`) → je ein external-task in die betroffenen Repos.

---

## Offene Fragen für die nächste Runde

- `type`-Werte je Domain kontrolliert (Enum) oder frei erweiterbar?
- Registry technisch: KG-DB mit Lesezugriff für alle, oder eigener minimaler Dienst
  (dann reiner Schicht-1-Dienst statt KG-Doppelrolle)?
- Versionierung: nur wo die kanonische ID sie nicht schon trägt (KD-Weiterentwicklung)?
- Migrationspfad: bestehende IDs in KG/SSF/NOXIA mappen, oder Neuaufbau?

---

## Status-Marker

Jeder Entity- und Relations-Datensatz trägt einen `status`-Marker. Sieben sind **epistemisch** (Belastbarkeit einer Aussage); `[W]` bildet eine achte, **konstitutive** Kategorie.

| Marker | Bedeutung |
|---|---|
| `[R]` | Real — empirisch gesichert |
| `[T]` | Theorie — theoretisch fundiert |
| `[H]` | Hypothese — begründete Annahme |
| `[S]` | Spekulativ — offene Vermutung |
| `[F]` | Fiktiv — narrativ / erfunden |
| `[I]` | Illustrativ — didaktisches Beispiel |
| `[W]` | **Werk-Setzung** — durch autorielle Setzung im eigenen Werk konstituiert (nicht empirisch, sondern gesetzt). Deckt strukturelle `part_of`-Taxonomiekanten selbst-autorisierter Modelle ab (z. B. `contracomology-core`). Definition gemäß OTA-ARC-0006 („Epistemologischer Marker: [W] Werk-Setzung"). |
| `[OFFEN]` | Offen — noch nicht klassifiziert |
