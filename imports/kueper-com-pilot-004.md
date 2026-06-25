# KUEPER Knowledge Graph — Importplan KUEPER.COM

## Pilot 4 · KUE-Basiscluster

Arbeitsprotokoll · kein kanonisches Archivdokument

Stand: 2026-06-24 · Kurator: T.P.K.

## Quelle

Repository: `thomaspeterkueper/kueper.com`

Astro Content Collection: `kue`

Bestätigte Pfadregel:

```text
src/content/kue/[kategorie]/[datei].md
```

Beispiele:

```text
src/content/kue/phi/kue-phi-0001-2026-de.md
src/content/kue/sci/kue-sci-0001-2026-de.md
src/content/kue/lsc/kue-lsc-XXXX-2026-de.md
```

Schema laut `src/content/config.ts`:

```ts
{
  datum: string,
  titel: string,
  kategorie: BIO | SCI | TEC | LSC | PHY | PHI | ARC | HIS | GEO | PSY | SOC | LNG | ECO | ORG | OBS | FND | OPS | MET,
  marker: R | T | S | P | H | I,
  version: string,
  status: string,
  sprache: DE | EN,
  keywords: string[],
  kurator: string,
  signatur: string
}
```

## Ziel

Erster echter Importlauf aus KUEPER.COM in den gemeinsamen Knowledge Graph.

Nicht alle Dokumente importieren. Zuerst ein KUE-Basiscluster mit 10–20 Dokumenten.

## Auswahlpriorität

1. PHY — Physikgrundlagen
2. GEO / AST — Planetologie, Geologie, Astronomie
3. CHE — Chemiegrundlagen
4. BIO / LSC — Biologie, Leben, Evolution
5. MAT/MET — Mathematik und Methodik, soweit im Bestand vorhanden
6. OBS — reale Beobachtungsnotizen als [R]-Anker

## Bereits bestätigte Pilotdokumente

| Signatur | Pfad | Rolle im Graph |
|---|---|---|
| KUE-PHI-0001-2026-DE | `src/content/kue/phi/kue-phi-0001-2026-de.md` | Interpretation/Motivation des AVI-Modells |
| KUE-SCI-0001-2026-DE | `src/content/kue/sci/kue-sci-0001-2026-de.md` | Theorie-/Definitionsdokument des AVI-Modells |

## Extraktionsformat

Für jedes KUE-Dokument entsteht ein DOC-Knoten:

```text
entity_id:       DOC:KUE:<signatur-slug>
typ:             Document
name:            <titel>
domäne:          <kategorie>
status:          <marker oder dominanter epistemischer Status>
is_instance:     true
beschreibung:    Kurzfassung des Dokuments.
erster_nachweis: <Repo-Pfad oder kueper.com-URL>
erstellt:        2026-06-24
kurator:         T.P.K.
```

Dazu Relationen:

```text
DOC:KUE:<signatur> describes CON:<domain>:<concept>
DOC:KUE:<signatur> defines CON:<domain>:<concept>
DOC:KUE:<signatur> interprets CON:<domain>:<concept>
DOC:KUE:<signatur> references DOC:KUE:<andere-signatur>
DOC:KUE:<signatur> anchors CON:<domain>:<foundation-node>
```

## Erste erwartete Foundation Nodes

- CON:CHE:wasser
- CON:PHY:energie
- CON:PHY:gravitation
- CON:PHY:zeit
- CON:MET:information
- CON:BIO:leben
- CON:BIO:evolution
- CON:GEO:atmosphaere
- CON:AST:habitable-zone
- CON:PHY:strahlung

## Neue Beziehungstyp-Kandidaten aus KUE-Pilot

| Typ | Grund | Beispiel |
|---|---|---|
| `defines` | Dokument definiert eine Theorie oder Entität formal | KUE-SCI-0001 defines CON:PHY:avi-modell |
| `interprets` | Dokument deutet oder motiviert eine Entität, ohne sie formal zu definieren | KUE-PHI-0001 interprets CON:PHY:avi-modell |
| `anchors` | Dokument verankert einen Foundation Node im KUE-Bestand | KUE-SCI-0001 anchors CON:PHY:zeit |

## Offene technische Notiz

Der GitHub-Connector kann Dateien abrufen, wenn der konkrete Pfad bekannt ist. Die Pfadregel ist nun bestätigt. Für größere Importe wird zusätzlich eine maschinenlesbare Dateiliste oder ein Index empfohlen.

ᐃ
