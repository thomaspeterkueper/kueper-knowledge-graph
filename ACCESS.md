# KG-Zugriffsregeln (ACCESS)

**KG-Arbeitsdokument · praktisch, NICHT kanonisch**
*Vorgesehener Ort: `ACCESS.md` im KG-Repo. Verankert in den Architektur-Invarianten
der Schichtenkarte (ARCHITECTURE.md).*

---

## Schreiben (Write)

**Nur KG-Maintainer schreiben in den KG.** Das folgt direkt aus der Invariante:
*„SSF schreibt nie direkt in KG-Daten."* Kein anderes System — SSF, NOXIA, Frontends,
oder die geplanten Apps (KI/Mininodes/Assistent) — schreibt in KG-Daten. Wer dem KG
etwas zuliefern will, tut das über einen Vorgang, den der KG selbst ausführt, nicht
durch Fremdschreibzugriff.

- Neue Modul-IDs vergibt **ausschließlich der KG** (ARC-0006 §III.2).
- Änderungen an KG-Objekten laufen über KG-eigene Prozesse (Repo-PRs / KG-Tooling).

## Lesen (Read)

**Andere Systeme lesen den KG, aber nicht seine Datenbank direkt.** Der Lesezugriff
läuft über die dafür vorgesehenen Ausgabeschichten:

- **KXF-Exports** — der kanonische Auslese-Weg für Wissensobjekte (SSF konsumiert so).
- **Signatur-Resolver / Registry** — für Signatur→Ort-Auflösung.
- Direkter Supabase-Zugriff auf die KG-DB bleibt KG-intern; andere Systeme halten
  keine KG-DB-Keys (Daten-Topologie der Schichtenkarte).

Damit ist die Richtung gewahrt: **KG → SSF → NOXIA** (Abhängigkeitsfluss, ARC-0006 §I).

## Öffentlich vs. privat  `[OFFEN]`

Welche KG-Daten öffentlich lesbar sind und welche nicht, ist **noch nicht
klassifiziert**. Das ist eine echte offene Entscheidung, keine Ableitung aus dem
Kanon. Bis sie getroffen ist, gilt konservativ: nicht-öffentlich als Default.

Zu klären:
- Sind KD-Strukturen und Modul-Metadaten öffentlich?
- Sind KXF-Exports öffentlich oder nur für registrierte Systeme?
- Braucht es Lese-Authentifizierung (API-Keys) für externe Konsumenten?

## Vorbereitung für die geplanten Apps  `[AUSSTEHEND]`

- **KI** (lesender Konsument): falls direkter KG-Lesezugriff — **Authentifizierung
  + Rate-Limit** KG-seitig vorsehen.
- **Mininodes** (datenerzeugend): **kein** Schreibzugriff auf KG-Daten (Invariante).
  Zuliefern nur über einen KG-geführten Aufnahme-/Event-Pfad, nicht durch Fremdschreiben.
- **Assistent** (evtl. personenbezogene Daten): Datenschutz-/Zugriffsfrage —
  gehört in eine spätere Datenschutzmatrix, nicht in diese Datei.

---

*Grenzen dieser Datei:* Sie regelt Zugriff auf den KG, nicht die Governance des
Ökosystems. Sie trifft keine ARC-Entscheidungen und klassifiziert kein Wissen —
sie beschreibt, wer den KG technisch lesen/schreiben darf.
