# Entwicklungsprinzip: Next.js 'use client' Direktive

**Übernommen aus:** noxiagame ADR-use-client-first-line.md
**Datum:** 20.07.2026

## Regel

In allen Next.js App-Router Projekten des Kueper-Ökosystems gilt:

**`'use client'` ist immer die erste Zeile einer Client-Komponente.**

Nicht vor Header-Kommentaren, nicht nach Imports — erste Zeile, Punkt.

Siehe: `noxiagame/docs/decisions/ADR-use-client-first-line.md` für Details.
