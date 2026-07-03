# Datenfluss — verifizierter Ist-Zustand

**KG-Arbeitsdokument · NICHT kanonisch · Stand 2026-07-03**
*Vorgesehener Ort: `docs/DATAFLOW.md` im KG-Repo.*

> Jede Zeile unten ist am **echten Code** geprüft (Clone von `noxiagame` und
> `solarsciencefoundation`), nicht aus Berichten übernommen. Wo kein Zugriff
> bestand (OTA-/KUE-Repos), steht `[OFFEN]`.

---

## Verifizierte Fakten

| Pfad | Status | Beleg |
|---|---|---|
| **SSF → KG (KXF)** | `[R]` **produktiv, Laufzeit-Fetch statischer Datei** | SSF `lib/kxf.ts` holt per `fetch()` (revalidate 300) die in Git committete JSON aus dem KG-Repo. Der KG exponiert **keinen Server**, nur Dateien. |
| **NOXIA → Supabase** | `[R]` **produktiv** | Game-API-Routen nutzen direkt `createClient(...)` mit Service-Role-Key; Middleware aktiv (Session-Schutz). |
| **NOXIA ↔ SSF (REST)** | `[R] verdrahtet, aber dormant` | Beidseitig gebaut; Default ist lokaler Demo-Fallback. Echter SSF-Verkehr nur bei `KNOWLEDGE_SOURCE=ssf`. |
| **Frontends → DB** | `[R] kein Zugriff` | `kueper.com`, `overtime-archive.org`, `thomas-kueper.de` sind reine statische Astro-Sites — kein `supabase`/`postgres`/`createClient`. Invariante gehalten. |
| **Frontends → SSF/KG (API)** | `[R] keine Aufrufe` | Null `fetch()`/`axios` zu SSF/KG. Einziger Treffer: HTML-Link von `thomas-kueper.de` auf `noxiagame.vercel.app` (kein API-Call). |
| **Produktive Cross-System-REST** | `[R]` keine aktiv | Der einzige reale Vertrag (SSF↔NOXIA) ist dormant. |

### Kanonische KXF-Auflösungspunkte (Source of Truth des KG-Exports)

```
https://raw.githubusercontent.com/thomaspeterkueper/kueper-knowledge-graph/main/exports/kxf-0.1.json
https://raw.githubusercontent.com/thomaspeterkueper/kueper-knowledge-graph/main/exports/kxf-learning-modules-0.1.json
```

---

## Korrektur gegenüber der bisherigen Annahme

Die Annahme „SSF konsumiert KXF `[AUSSTEHEND]`" ist **überholt**: SSF liest die KXF
**bereits produktiv** zur Laufzeit (`lib/kxf.ts`). `[R]`, nicht `[geplant]`.

Was tatsächlich noch offen ist, ist die *Erzeugungsseite*: Wird
`exports/kxf-*.json` im KG-Repo von Hand committet oder automatisch generiert?
→ **KG-intern zu klären** (`[zu prüfen]`).

---

## Bleibt offen

- `kueper.com` / KUE-Kanon: wo liegen die `KUE-*`-Signaturen? (Frontend ist statisch,
  der Kanon muss woanders leben.) `[OFFEN]`
- OTA-Repo-Ort — in der Registry noch `null`. `[OFFEN]`
- Automatischer KG→KXF-Export vs. Hand-Commit. `[zu prüfen — KG-intern]`

---

## Konsequenz für Hermes

Der SSF↔NOXIA-REST-Vertrag **existiert bereits** (beidseitig verdrahtet, nur
dormant). Die Schwelle „≥2 Systeme tauschen REST-APIs" ist im Prinzip erreicht,
sobald `KNOWLEDGE_SOURCE=ssf` gegen echtes SSF zeigt. Damit ist der **erste reale
Vertragskandidat SSF↔NOXIA** — aber die offenen Defekte (siehe external-tasks)
zeigen, dass dieser Vertrag heute nicht in sich konsistent ist. Reihenfolge:
**erst Defekte schließen, dann Vertrag verfestigen** — nicht umgekehrt. Ein
Hermes-Repo bleibt bis dahin `[AUSSTEHEND]`.
