# OTA-KG-REQ-20260905-generation-mars-bios

**Requester:** SYS:OTA:overtimearchive  
**Recipient:** SYS:KUEPER:knowledge-graph  
**Status:** open  
**Created:** 2026-09-05  
**Type:** document_reference_registration / entity_alignment

## Anlass

Das OTA hat `EXT-NXU-OTA-20260830-001` inhaltlich reconciliert. Für Lena Kowalski und Keiko Nakamura wurden widersprechende Dezember-2025-Profile archiviert und neue 2092-Nachfolger angelegt. Rashid Al-Mansouri und Kaelen waren bereits im selben OTA-Workstream vorbereitet.

Der KG soll nun die finalen OTA-Dokumentreferenzen und NXU-Figurenrelationen registrieren beziehungsweise vorhandene Einträge aktualisieren.

## Zu registrierende Zielstände

| OTA-Dokument | NXU-Figur | OTA-Status | Hinweis |
| --- | --- | --- | --- |
| `DOC:OTA:OTA-BIO-0014-2092-DE` | `CHAR:NXU:kaelen` | ENTWURF | partielles Profil; ca. 2079, Ceres/Belt, SYELP Phase 2 |
| `DOC:OTA:OTA-BIO-0035-2092-DE` | `CHAR:NXU:rashid` | AKTIV | kanonischer 2092-Stand; Geburtsjahr 2079 |
| `DOC:OTA:OTA-BIO-0036-2092-DE` | `CHAR:NXU:lena` | AKTIV | kanonischer Nachfolger von `OTA-BIO-0006-2025-DE` |
| `DOC:OTA:OTA-BIO-0037-2092-DE` | `CHAR:NXU:keiko` | AKTIV | kanonischer Nachfolger von `OTA-BIO-0010-2025-DE` |

## Archivierte Vorgänger

Die folgenden Dokumente bleiben als historische OTA-Stände erhalten und dürfen nicht mehr als aktueller Figurenkanon aufgelöst werden:

- `DOC:OTA:OTA-BIO-0006-2025-DE` — Lena Kowalski → Nachfolger `DOC:OTA:OTA-BIO-0036-2092-DE`
- `DOC:OTA:OTA-BIO-0008-2025-DE` — Rashid Al-Mansouri → Nachfolger `DOC:OTA:OTA-BIO-0035-2092-DE`
- `DOC:OTA:OTA-BIO-0010-2025-DE` — Keiko Nakamura → Nachfolger `DOC:OTA:OTA-BIO-0037-2092-DE`

## Kanonische Leitplanken

- Rashid: Geburtsjahr 2079; Dubai; Hassan und Layla Al-Mansouri; Schwester Aisha; SYELP Phase 1 Erde→Mars 2092.
- Lena: 2077; Iteratio Prime Alpha, Omega-7; Vater Gerhard Kowalski; Mutter verstorben, weitere Angaben offen/klassifiziert; akustische Hypersensitivität; Monolith-Signal Januar 2092; SYELP Phase 2 Mars→Erde.
- Keiko: ca. 2077; Iteratio Prime Alpha, Sektor B; Vater Dr. Hiroshi Tanaka, Geophysiker, verstorben; Todesjahr/-ursache offen; historiografische Disposition; verschlüsselte Audiodatei des Vaters; SYELP Phase 2.
- Kaelen: ca. 2079; Ceres/Belt; they/them bzw. dey/deren; Belt-Physiologie und trainierte taktile Strukturwahrnehmung, ausdrücklich nicht metaphysisch; SYELP Phase 2.

## Erwartetes Ergebnis

1. Document-reference registry enthält die vier finalen OTA-Dokumente mit korrektem `sourcePath` in `thomaspeterkueper/overtime-archive.org`.
2. Die vier Dokumente sind mit den jeweiligen `CHAR:NXU:*`-Entitäten verknüpft.
3. Archivierte Vorgänger sind als historische/superseded Dokumentstände erkennbar und lösen nicht als aktueller Figurenkanon auf.
4. Eine kurze Abschlussmeldung an OTA bestätigt die registrierten IDs, damit `EXT-NXU-OTA-20260830-001` geschlossen werden kann.
