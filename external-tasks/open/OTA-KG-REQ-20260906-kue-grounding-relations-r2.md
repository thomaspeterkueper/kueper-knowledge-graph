---
id: OTA-KG-REQ-20260906-kue-grounding-relations-r2
source: OTA
target: KG
status: open
created: 2026-09-06
priority: high
type: relation-registration
supersedes: []
follows_up: OTA-KG-REQ-20260906-kue-grounding-relations
---

# OTA → KG: Nach Review zurückgehaltene UPE-/mtDNA-Groundings freigeben

## Anlass

Der erste Grounding-Request `OTA-KG-REQ-20260906-kue-grounding-relations` wurde KG-seitig abgeschlossen. Die UPE- und mtDNA-Kanten blieben dort bewusst als `withheldPendingReview` zurück, bis OTA die fachliche Prüfung gegen `KUE-SCI-0175` und `KUE-SCI-0176` beendet.

Diese Prüfung ist jetzt abgeschlossen.

## OTA-Abschlussstand

### UPE / KUE-SCI-0175

- `OTA-SCI-0045-2026-DE` → v1.2; direkter KUE-0175-Anker eingebaut.
- `OTA-SCI-0047-2026-DE` → v1.2; universelle Kopfdominanz, pauschale Intensitätswerte, direkte pEEG-Mitochondrien-Spezifität und UPE→Halo-Kausalität aus der `[R]`-Ebene entfernt bzw. eingegrenzt.
- `OTA-LSC-0003-2026-DE` → v1.2; Spektrum/Intensität/Messkontext an KUE-0175 angeglichen; UPE nicht exklusiv mitochondrial; klinische Diagnosespezifität bleibt `[T/H]`.

### mtDNA-Methylierung / KUE-SCI-0176

- `OTA-SCI-0045-2026-DE` → v1.2; stabile transgenerationale mtDNA-CpG-Methylierungsakkumulation wird nicht als `[R]` geführt.
- `OTA-SCI-0048-2031-DE` → v1.2; das 2031er EIQM-Methylierungs-/Regulationsmodell bleibt ausdrücklich In-Universe `[S→F/OFFEN]`.

## Zur Registrierung freigegebene Relationen

Bitte die bislang zurückgehaltenen Kanten nun als aktive `GROUNDED_IN`-Relationen in der kanonischen Grounding-Source-of-Truth registrieren:

- `DOC:OTA:OTA-SCI-0045-2026-DE` → `DOC:KUE:KUE-SCI-0175-2026-DE`
- `DOC:OTA:OTA-SCI-0047-2026-DE` → `DOC:KUE:KUE-SCI-0175-2026-DE`
- `DOC:OTA:OTA-LSC-0003-2026-DE` → `DOC:KUE:KUE-SCI-0175-2026-DE`
- `DOC:OTA:OTA-SCI-0045-2026-DE` → `DOC:KUE:KUE-SCI-0176-2026-DE`
- `DOC:OTA:OTA-SCI-0048-2031-DE` → `DOC:KUE:KUE-SCI-0176-2026-DE`

## Epistemische Grenze

`GROUNDED_IN` bedeutet ausschließlich: KUE trägt die allgemeine Realwissenschaftsgrundlage. Λ-Haplogruppe, UPE-Kohärenz, FSS, EIQM-2031, Halo-Brücke und transgenerationale Aktivierungslogik bleiben OTA `[T]/[H]/[S]/[F]/[OFFEN]` und werden durch die Relation nicht zu KUE-Kanon.

## Erwartetes Ergebnis

1. Die fünf Kanten werden aus `withheldPendingReview` in aktive `GROUNDED_IN`-Records überführt.
2. Keine Duplikate zu bestehenden Grounding-Records erzeugen.
3. KG gibt eine Completion-Antwort an OTA zurück.
