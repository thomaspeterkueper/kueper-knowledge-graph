# Supabase Setup - KUEPER Knowledge Graph

## Projekt

```text
Project name: kueper-knowledge-graph
Project id: ehuoafluxkmizvatmyzt
Role: operational KG index and API data layer
```

---

## Grundregel

Supabase ist nicht die kanonische Quelle.

```text
GitHub Repo -> Supabase -> kg.kueper.com
```

Nicht:

```text
Supabase -> GitHub Repo
```

---

## Einrichtung

1. Supabase-Projekt oeffnen.
2. SQL Editor oeffnen.
3. Inhalt aus `infrastructure/migrations/0001_initial_schema.sql` ausfuehren.
4. Tabellen pruefen.
5. Danach Sync-/Import-Skript entwickeln.

---

## Secrets

Keine Supabase-Keys im Repository speichern.

Spaeter benoetigte Umgebungsvariablen:

```text
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_ANON_KEY
```

Service Role Keys gehoeren nur in sichere Server-/CI-Umgebungen.

---

## RLS

Row Level Security wird aktiviert.

Initial bleiben Schreiboperationen serverseitig/importgesteuert.

Oeffentliche Leserechte werden erst fuer kuratierte Public-Views oder API-Endpunkte freigegeben.

---

## Public API

`kg.kueper.com` soll spaeter nicht direkt beliebige Masterdaten ausgeben.

Public API und Exporte muessen Sichtbarkeit und Exportstatus beachten.
