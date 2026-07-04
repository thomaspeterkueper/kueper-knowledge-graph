# KG-0013 — Contracomology: Onboarding als Ökosystem-Bürger

| Feld | Inhalt |
|------|--------|
| **Signatur** | KG-0013 (KG-internes Quelldokument) |
| **Titel** | Contracomology — Onboarding als Ökosystem-Bürger |
| **Status** | `draft_productive` · NICHT kanonisch |
| **Kurator** | T.P.K. |
| **Bezug** | KG-0008-REGISTRY, ID-SCHEMA, KG-ARC-0001 (KDs); Präzedenz: AVI (`MOD:L2:avi`, `DOC:OTA:OTA-FND-0028-2026-DE`) |
| **Erstellt** | 2026-07-03 |

> **[KN-0.1]** Contracomology ist ein vom Kurator gesetzter Wissenschaftszweig — Theorie, kein empirischer Befund, keine externe Begutachtung. Der Kanon dieses Ökosystems ist Werk-Setzung, nicht Peer-Review. Alle Entitäten und Dokumente hier tragen daher `[W]`-Status (Theorie/Werk), nicht `[R]`. AVI ist das Muster. — T.P.K.

---

## 1. System-Record

Die Seite ist eine Fassade, kein Wissensspeicher.

```json
{
  "id": "SYS:KUEPER:contracomology",
  "type": "System",
  "name": "Contracomology",
  "role": "publication_frontend",
  "site": "contracomology.org",
  "repo": "thomaspeterkueper/contracomology",
  "owns": ["contracomology_ui"],
  "consumes": [
    "exports/kxf-0.6.json",
    "exports/entity-registry-0.1.json",
    "exports/relation-registry-0.1.json"
  ],
  "resolves_fulltext_from": ["SYS:KUEPER:ota", "SYS:KUEPER:kueper-com"],
  "source_of_truth": "SYS:KUEPER:knowledge-graph",
  "status": "draft_productive"
}
```

## 2. Knowledge-Domain-Record

```json
{
  "id": "KD:KON:N1",
  "type": "KnowledgeDomain",
  "status": "draft_productive",
  "source": "KG-0013",
  "exports": ["exports/knowledge-domains-0.1.json", "exports/kxf-0.6.json"]
}
```

Form nach KG-ARC-0001 (`KD:<DOMAIN>:<LEVEL>`, N-Level = Vorwissen). `KON` wird als eigenständiger Domänen-Code geführt. Einstieg auf `N1`; ein voraussetzungsfreier Basiseintrag `KD:KON:N0` bleibt offen.

## 3. Entitäten-Gerüst

Definitionen für Zeitform, AVI-Punkt, OEM, Ma'U, Ma'Ta'U und die drei Paradigmen stehen aus. Diese Begriffe werden nicht kanonisiert, bis der Kurator Definitionen liefert.

## 4. Dokumente — zweistufig, wie AVI

1. Analysen zuerst als kueper.com-Entwürfe `DOC:KUE:KUE-MUS-####-2026-DE`.
2. Gereifte Analysen später als `DOC:OTA:OTA-…-2026-DE` kanonisieren.
3. Der KG legt je Dokument nur den Record an; Volltext bleibt im jeweiligen Archiv.

## 5. Fassaden-Vertrag

- Contracomology liest Verknüpfungen aus dem KG.
- Contracomology löst `DOC:*`-Records zu Volltext aus OTA / kueper.com auf.
- Contracomology besitzt keine Systemwahrheit.
- Kein direkter DB-Zugriff auf fremde Systeme.

## 6. Offen

- ID-Anker-Entscheidung: opaker Anker plus lesbarer Alias.
- Definitionen der Begriffe.
- Namespace-Kollision `KG-####`: Empfehlung `REQ-KG-####` für ausgehende Requests, getrennt vom internen Doc-Raum.
