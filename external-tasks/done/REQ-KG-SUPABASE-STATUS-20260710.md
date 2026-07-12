<!--
KUEPER · Knowledge Graph
Path:    external-tasks/open/REQ-KG-SUPABASE-STATUS-20260710.md
Version: 1.0.0
Created: 2026-07-10
Origin:  REQ-KG-LEGAL-ACCESS-20260710 §6–7
-->

# REQ-KG-SUPABASE-STATUS-20260710
## Supabase-Verarbeitungsstand für Datenschutzerklärung dokumentieren

**Target:** `SYS:KUEPER:knowledge-graph` (registry/legal/)
**Origin:** OTA-Kurator / Legal-Review
**Requester:** T.P.K.
**Status:** Open
**Priority:** High — Voraussetzung für Datenschutzerklärung Status `released`
**Blocking:** Freigabe der Datenschutzerklärung

---

## Zweck

`registry/legal/datenschutz.de.md` enthält in §7 Platzhalter für
systemspezifische Supabase-Verarbeitungen. Diese müssen mit dem tatsächlichen
Betriebsstand befüllt werden, bevor der Status von `draft_productive`
auf `released` gesetzt werden darf.

---

## Verarbeitungsstand NOXIA (`noxiagame.vercel.app`)

Aus `supabase/migrations/001a_noxia_tables.sql` bekannt:

| Tabelle | Gespeicherte Felder | Zweck |
|---------|---------------------|-------|
| `profiles` | `id` (UUID, auth.users), `username`, `credits`, `created_at`, `last_seen_at` | Spielerprofil |
| `locations` | Spielwelt-Daten, keine personenbezogenen Daten | Simulation |
| `resources`, `buildings`, `ships` | Spielzustand, keine personenbezogenen Daten | Simulation |
| `orders`, `events` | Spielaktionen, referenzieren Spieler-UUID | Spielhistorie |

**Zu klären und an KG melden:**
- [ ] Supabase-Region: `eu-central-1` (Frankfurt)? → bestätigen
- [ ] Auth: E-Mail + Passwort? Magic Link? OAuth? → bestätigen
- [ ] Session-Cookies: Supabase Standard-Session-Cookie? → bestätigen
- [ ] Speicherdauer `profiles`: unbegrenzt bis Löschanfrage? → bestätigen
- [ ] Löschweg für Nutzer: `profiles.id ON DELETE CASCADE` setzt Kette fort → bestätigen
- [ ] Aufbewahrungsfristen für `events`/`orders`: keine? → bestätigen

---

## Verarbeitungsstand SSF (`solarsciencefoundation.org`)

Aus `supabase/manual-setup.sql` bekannt:

| Tabelle | Gespeicherte Felder | Zweck |
|---------|---------------------|-------|
| `profiles` | `id` (UUID), `display_name`, `created_at`, `updated_at` | Nutzerprofil |
| `membership_roles` | Rollendefinitionen (keine personenbezogen) | Zugangskontrolle |
| `member_roles` | `user_id`, `role_id` | Rollenzuweisung |
| `supporter_records` | `user_id`, `supporter_type`, `started_at` | Mitgliedschaftsstatus |

**Zu klären und an KG melden:**
- [ ] Ist SSF-Auth produktiv aktiv oder nur vorbereitet? → bestätigen
- [ ] Lernfortschritt-Speicherung: existiert noch keine Tabelle? → bestätigen
- [ ] Supabase-Region → bestätigen
- [ ] Löschweg: `ON DELETE CASCADE` vorhanden? → bestätigen

---

## Requested Output

Ergänzung von `registry/legal/datenschutz.de.md` §7 mit den bestätigten Werten:

```markdown
## 7. Supabase — Konten und Anwendungszustand

### NOXIA (noxiagame.vercel.app)
**Aktiviert:** Ja — Spielerkonten, Spielzustand, Handelsaktionen.
**Gespeicherte Daten:** Benutzername, Credits, Spielzustand (Gebäude, Schiffe, Aufträge).
**Auth:** [E-Mail + Passwort / Magic Link — bestätigen]
**Region:** [eu-central-1 / bestätigen]
**Speicherdauer:** Bis zur Löschanfrage des Nutzers.
**Löschweg:** Kontolöschung entfernt alle verknüpften Spielerdaten (CASCADE).

### SSF (solarsciencefoundation.org)
**Aktiviert:** [Ja / Nein — bestätigen]
**Gespeicherte Daten:** [bestätigen]
...
```

---

## Vorgehen

1. Thomas beantwortet die offenen Fragen (kann direkt in diesen Request kommentieren
   oder als neuen Request zurückmelden)
2. Kurator befüllt `registry/legal/datenschutz.de.md` §7 mit den bestätigten Werten
3. Status bleibt `draft_productive` bis juristische Prüfung abgeschlossen
4. Nach juristischer Prüfung: `released` setzen → Footer-Draft-Banner verschwindet

---

*Kurator: T.P.K. · 2026-07-10*
