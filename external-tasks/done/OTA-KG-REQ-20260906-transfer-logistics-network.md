---
id: OTA-KG-REQ-20260906-TRANSFER-LOGISTICS-NETWORK
title: Register OTA transfer logistics network and core relations
status: done
source: OTA
target: KUEPER Knowledge Graph
created: 2026-09-06
completed: 2026-09-06
priority: normal
---

## Ergebnis

KG hat den stabilen Dokumentstand `DOC:OTA:OTA-TEC-0122-2026-DE` registriert und die für das Dossier benötigte Wissensdomäne `KD:SPACE-LOGISTICS:N2` kanonisiert.

Registriert wurden:

- `DOC:OTA:OTA-TEC-0122-2026-DE`
- canonicalId: `OTA-TEC-0122-TRANSFER-NETWORK`
- externalObjectId: `solar-transfer-logistics-network`
- `KD:SPACE-LOGISTICS:N2`
- `KD:SPACE-ORBITAL-MECHANICS:N2` als weitere zugeordnete Domain

Als dokumentarische Relationstypen wurden `EXPANDS`, `REFERENCES` und `RELATED_TO` im KG-Vokabular ergänzt.

Von den angefragten Zielrelationen konnten zum aktuellen KG-Stand nur bereits auflösbare Zielentitäten als kanonische Kanten registriert werden:

- `DOC:OTA:OTA-TEC-0122-2026-DE REFERENCES DOC:OTA:OTA-TEC-0082-2026-DE`
- `DOC:OTA:OTA-TEC-0122-2026-DE RELATED_TO DOC:OTA:OTA-TEC-0092-2026-DE`

Die Ziele `OTA-TEC-0025`, `0083`, `0084`, `0016`, `0087` sowie `0112` bis `0116` sind im aktuellen KG-Dokumentregister noch nicht als auflösbare DocumentReference-Entitäten vorhanden. Die entsprechenden Kanten werden daher nicht vorweggenommen. Sobald diese Zielidentitäten registriert sind, können die dokumentarischen Beziehungen ohne neue Semantikentscheidung ergänzt werden.

Die im Dossier genannten möglichen neuen Klassen (Orbital Shuttle, Cargo Tug, Depot Tender/Tanker, Hub-to-Hub Shuttle, Mars Orbital Transfer Vehicle, interplanetare Transferklasse, Rescue Vehicle, Mars Orbital Hub) wurden ausdrücklich **nicht** als neue KG-Entitäten angelegt.

## KG-Nachweise

- `exports/knowledge-domains-space-0.1.json` v0.1.4 — commit `bee4945db89d991f099d904c9858f90314b92f57`
- `exports/document-references-space-0.1.json` v0.1.5 — commit `bcb1752993c99945217e7f6871f9cb4a93239d08`
- `exports/relations-0.1.json` v0.1.1 — commit `1ba41304291ebafc4f10f38805b2055e24a82c4e`
