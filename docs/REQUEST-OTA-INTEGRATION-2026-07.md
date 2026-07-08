# KG REQUEST — OTA-Integration und Live-API

**Datum:** 2026-07-08  
**Priorität:** Hoch  
**Abhängigkeiten:** KG-0004, KG-0005, KG-0012  
**Initiiert durch:** OTA-Kurator (Thomas Peter Küper)

---

## Kontext

Das OverTime Archive hat 205 Dokumente publiziert. Alle tragen `kg.documentId`, `kg.graphId` und `knowledge.domains`-Blöcke im Frontmatter. Die OTA-Website hat eine Suchseite mit KG-Domain-Links (`/suche?domain=KD:GEO-SEISM:N2`). Die KG-Verbindung ist vorbereitet — die Datenbankseite fehlt.

Aktuelle Schwachstelle: SSF liest KXF-Exporte **statisch von GitHub Raw** (dokumentiert in OTA-ARC-0008 §II als `[R]`-Befund). Änderungen im KG wirken erst nach manuellem Export auf SSF.

---

## REQ-KG-001 — OTA Ingestion Pipeline aktivieren

**Was:** Implementierung der in KG-0005 definierten Ingestion-Pipeline für die 205 OTA-Dokumente.

**Input:** OTA-Website-Suchindex (`https://overtimearchive.org/api/search.json`) — liefert alle Dokumente mit Signatur, Serie, Jahr, Domains, Epistemik-Marker.

**Erwartetes Ergebnis pro Dokument:**
```json
{
  "id": "DOC:OTA:OTA-SCI-0043-2026-DE",
  "type": "Document",
  "system": "SYS:KUEPER:ota",
  "canonicalId": "OTA-SCI-0043-2026-DE",
  "series": "SCI",
  "year": 2026,
  "language": "DE",
  "epistemicProfile": ["R","H","S"],
  "accessLevel": 0,
  "contentUrl": "https://overtimearchive.org/dokument/OTA-SCI-0043-2026-DE",
  "metadataOwner": "KUEPER Knowledge Graph"
}
```

**REQUIRES-Kanten** aus `knowledge.domains`:
```json
{
  "id": "REQ:DOC:OTA:OTA-SCI-0043-2026-DE:KD:GEO-SEISM:N2:READ",
  "from": "DOC:OTA:OTA-SCI-0043-2026-DE",
  "relation": "REQUIRES",
  "to": "KD:GEO-SEISM:N2",
  "purpose": "read"
}
```

**Akzeptanzkriterium:** `GET /api/documents?system=ota` gibt alle 205 Dokumente zurück.

---

## REQ-KG-002 — Öffentliche REST-API für OTA-Dokument-Metadaten

**Was:** Neue API-Route die OTA-Dokument-Metadaten aus der Supabase-Datenbank liefert.

**Route:** `GET /api/ota/documents`  
**Route:** `GET /api/ota/documents/[signatur]`  
**Route:** `GET /api/ota/documents/[signatur]/prerequisites`  
**Route:** `GET /api/ota/documents/[signatur]/paths`

**Response-Beispiel** `/api/ota/documents/OTA-SCI-0043-2026-DE`:
```json
{
  "id": "DOC:OTA:OTA-SCI-0043-2026-DE",
  "signature": "OTA-SCI-0043-2026-DE",
  "series": "SCI",
  "year": 2026,
  "language": "DE",
  "epistemicProfile": ["R","H","S"],
  "accessLevel": 0,
  "prerequisites": [
    { "domain": "KD:GEO-SEISM:N2", "level": "N2", "purpose": "read" },
    { "domain": "KD:MATH-STAT:N1", "level": "N1", "purpose": "read" }
  ],
  "learningPaths": [
    { "id": "PATH:OTA:OTA-SCI-0043-2026-DE:READ", "moduleCount": 4 }
  ],
  "contentUrl": "https://overtimearchive.org/dokument/OTA-SCI-0043-2026-DE"
}
```

**Auth:** Kein Auth für `accessLevel: 0`. JWT-Token für `accessLevel > 0`.

**Akzeptanzkriterium:**  
- `GET /api/ota/documents/OTA-SCI-0043-2026-DE` antwortet mit 200 und korrekten Prerequisites  
- `GET /api/ota/documents/OTA-RED-0018-2091-DE` antwortet mit 401 ohne Token

---

## REQ-KG-003 — KG-Domain-Suchendpunkt

**Was:** API-Route für Domain-basierte Suche — OTA-Website-Suchseite sendet `/suche?domain=KD:GEO-SEISM:N2` und braucht alle Dokumente, die diese Domain voraussetzen.

**Route:** `GET /api/ota/documents?domain=KD:GEO-SEISM:N2`

**Response:**
```json
{
  "domain": "KD:GEO-SEISM:N2",
  "domainTitle": "Seismologie — arbeitsfähiges Grundverständnis",
  "documents": [
    { "signature": "OTA-SCI-0043-2026-DE", "year": 2026, "level": "N2" },
    { "signature": "OTA-SCI-0082-2026-DE", "year": 2026, "level": "N1" }
  ],
  "learningPath": "PATH:SSF:GEO-SEISM-FOUNDATIONS"
}
```

**Akzeptanzkriterium:** OTA-Website kann `/suche?domain=X` gegen KG-API auflösen.

---

## REQ-KG-004 — Automatischer KXF-Export-Trigger

**Was:** GitHub Actions Webhook — wenn sich OTA-Dokumente ändern (Commit in `overtime-archive.org`), triggert KG automatisch einen KXF-Neuexport.

**Mechanismus:**
```
OTA-Commit → GitHub Webhook → KG-Endpoint POST /api/kxf/rebuild → 
  Lese neuen OTA-Search-Index → Ingestion-Pipeline (REQ-KG-001) → 
  Schreibe neue exports/kxf-*.json → SSF liest beim nächsten Build
```

**Exportierte Dateien nach Rebuild:**
- `exports/kxf-learning-modules-0.2.json` (mit neuen IDs nach ARC-0007)
- `exports/kxf-ota-documents-0.1.json` (neu — alle OTA-Dokument-Metadaten)

**Akzeptanzkriterium:** Nach einem OTA-Commit wird innerhalb von 5 Minuten ein neuer KXF-Export verfügbar.

---

## REQ-KG-005 — KXF-Migration v0.1.3 → v0.2.0

**Was:** Implementierung des in OTA-ARC-0007 vollständig spezifizierten Migrationsplans.

**Referenz:** `overtime-archive.org/src/content/internal/arc/OTA-ARC-0007-2026-DE.md`

**Kernänderungen:**
- 13 Module: `LRN:SSF:*` → `{DOMAIN}-L{LEVEL}-{NNNNNN}`
- 3 `learning_path`-Module → `records.paths[]`
- `legacyId`-Feld für alle 13 Module
- `transitional: true` für 5 Übergangsobjekte
- Schema: `KXF-LEARNING-MODULES-0.2`, Version `0.2.0`

**Validierung:** Alle 5 Checks aus ARC-0007 §IV müssen PASS zurückgeben.

**Akzeptanzkriterium:** `exports/kxf-learning-modules-0.2.json` existiert und besteht V-1 bis V-5.

