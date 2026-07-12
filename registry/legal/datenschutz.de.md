# Datenschutzerklärung

**Status:** `draft_productive` · nicht juristisch freigegeben  
**Dokument:** `DOC:KUE:LEGAL-PRIVACY-DE`  
**Content Owner:** `SYS:KUEPER:knowledge-graph`  
**Stand:** `{{ impressum.updated }}`

> **Entwurf, kein geprüfter Rechtstext.** Vor Veröffentlichung juristisch prüfen lassen. Technische Verarbeitungen, Auftragsverarbeiter, Speicherfristen und Site-spezifische Besonderheiten müssen vor Freigabe nochmals gegen den realen Betriebsstand geprüft werden.

---

## 1. Verantwortlicher

{{ impressum.responsible.name }}, {{ impressum.responsible.address }},  
E-Mail: {{ impressum.responsible.email }}.

Die Platzhalter werden beim Build aus `registry/legal/impressum-master.json` aufgelöst. Das Impressum bleibt die Single Source of Truth für die Verantwortlichen-Daten.

---

## 2. Geltungsbereich

Diese Erklärung gilt für die Websites des KUEPER-Ökosystems. Die meisten Angebote – insbesondere kueper.com, thomas-kueper.de, overtimearchive.org, contracomology.org und zereya.de – sind statische Websites ohne Benutzerkonten.

NOXIA (`noxiagame.vercel.app`) und die Solar Science Foundation (`solarsciencefoundation.org`) können darüber hinaus Kontodaten und Anwendungszustände verarbeiten. Die konkrete Aktivierung dieser Funktionen ist vor Veröffentlichung je System zu bestätigen.

---

## 3. Hosting

Die Websites werden derzeit überwiegend über Vercel ausgeliefert. Beim Aufruf können technisch notwendige Zugriffsdaten verarbeitet werden, insbesondere IP-Adresse, Zeitpunkt, angefragte Ressource, Referrer sowie Browser- und Betriebssystemkennung.

Zweck der Verarbeitung ist der sichere und stabile Betrieb der Websites. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.

Die Verarbeitung erfolgt nach den von Vercel bereitgestellten Datenschutz- und Vertragsbedingungen. Soweit erforderlich, ist vor Veröffentlichung ein Auftragsverarbeitungsvertrag abzuschließen beziehungsweise dessen wirksamer Abschluss zu dokumentieren. Bei möglichen Übermittlungen in die USA sind die tatsächlich verwendeten Garantien – etwa EU-Standardvertragsklauseln oder eine einschlägige Zertifizierung – vor Freigabe zu prüfen.

---

## 4. Server-Logfiles

Gemeint sind die Zugriffslogs des jeweiligen Hosting-Anbieters, die beim Seitenaufruf entstehen können. Dazu gehören insbesondere IP-Adresse, Zeitpunkt, angefragte Ressource, Referrer sowie Browser- und Betriebssystemkennung.

Die Aufbewahrung richtet sich nach der tatsächlich genutzten Hosting-Konfiguration und dem jeweiligen Tarif. Die konkrete Speicherdauer ist vor Veröffentlichung aus der aktuellen Anbieter-Dokumentation oder dem Vertrag zu übernehmen.

Supabase ist hiervon zu unterscheiden: Supabase wird – soweit in NOXIA oder SSF aktiviert – als Datenbank- und Authentifizierungsdienst für Kontodaten und Anwendungszustände genutzt und wird in Abschnitt 7 gesondert behandelt.

GitHub dient als Quellcode- und Build-Plattform. Die öffentliche Auslieferung der Websites erfolgt über den jeweiligen Hosting-Anbieter. GitHub ist daher grundsätzlich nicht Teil des normalen Seitenaufrufs der Besucher. Wird eine Site künftig über GitHub Pages ausgeliefert, muss GitHub zusätzlich als Hoster berücksichtigt werden.

---

## 5. Schriftarten

Die verwendeten Schriftarten werden lokal über den Build ausgeliefert (`next/font/google` — serverseitiges Laden beim Build, keine Laufzeitverbindung zu Google Fonts).

Für NOXIA werden Courier Prime, Playfair Display, Geist und Geist Mono über `next/font/google` eingebunden. Beim Aufruf der Website findet keine separate Verbindung zu Google Fonts statt (`NOX-0005` — abgeschlossen 2026-07-11).

Der Stand von zereya.de ist vor Veröffentlichung gesondert zu verifizieren.

---

## 6. Cookies und Tracking

Auf den statischen Websites werden nach aktuellem Kenntnisstand keine Cookies zu Analyse- oder Marketingzwecken gesetzt. Es findet kein eigenes Analytics- oder Werbe-Tracking statt.

Soweit NOXIA oder SSF Benutzerkonten verwenden, können technisch notwendige Session- oder Authentifizierungs-Cookies eingesetzt werden. Rechtsgrundlage ist je nach Ausgestaltung Art. 6 Abs. 1 lit. b oder lit. f DSGVO.

Falls künftig nicht notwendige Cookies, Analytics- oder Marketing-Dienste eingesetzt werden, sind diese Erklärung und gegebenenfalls das Consent-Verfahren vor Aktivierung anzupassen.

---

## 7. Systemspezifische Supabase-Verarbeitung

Auftragsverarbeiter ist Supabase Inc. Das Hosting erfolgt in einer EU-Region; die Datenbank- und Auth-Server stehen innerhalb der EU. Login-E-Mail-Adresse und das (gehashte) Passwort werden vom Supabase-Auth-System in der verwalteten Tabelle `auth.users` gespeichert, nicht in den Anwendungstabellen.

**NOXIA** (`rrsgswmmjynumwnnolhi.supabase.co`)

- Anmeldung: E-Mail und Passwort (inkl. Passwort-Reset per E-Mail). Kein OAuth, kein Magic Link.
- Sitzungsverwaltung: cookie-basiert (Supabase-Standard-Session-Cookies über `@supabase/ssr`).
- Personenbezogene Daten: `profiles` (Nutzer-UUID, `username`, `credits`, `created_at`, `last_seen_at`); `player_buildings`, `ships`, `trade_orders` sowie Spielaktions-/Ereignisdaten referenzieren die Nutzer-UUID. Welt-/Simulationsdaten (`locations`, `resources`, `market_prices` u. a.) sind nicht personenbezogen.
- Speicherdauer: Konten ohne Aktivität werden nach 6 Monaten gelöscht; Registrierungen mit unbestätigter E-Mail-Adresse nach 1 Monat. Darüber hinaus Speicherung bis zur Löschanfrage. (Spieldaten `price_history` unterliegen einer separaten, nicht personenbezogenen Retention.)
- Löschung: `profiles.id ON DELETE CASCADE` entfernt abhängige Datensätze.

**Solar Science Foundation** (`eiwudquwkymshqdskjxm.supabase.co`)

- Anmeldung: E-Mail und Passwort mit E-Mail-Bestätigung (Confirm-Signup). Kein OAuth, kein Magic Link.
- Sitzungsverwaltung: Browser-`localStorage` (`@supabase/supabase-js`; serverseitige Zugriffe ohne persistente Session).
- Personenbezogene Daten: `profiles` (Nutzer-UUID, `display_name`, abgeleitet aus Anzeigename oder E-Mail-Lokalteil), `member_roles`, `supporter_records`, `learning_progress`, `exercise_attempts`, `unlocks`, `user_achievements`, `project_access_audit`. Alle über die Nutzer-UUID mit `profiles` verknüpft; Row Level Security ist aktiv (Zugriff nur auf eigene Datensätze).
- Speicherdauer: Konten ohne Aktivität werden nach 6 Monaten gelöscht; Registrierungen mit unbestätigter E-Mail-Adresse nach 1 Monat. Darüber hinaus Speicherung bis zur Löschanfrage.
- Löschung: durchgängig `ON DELETE CASCADE` auf `profiles(id)` bzw. `auth.users(id)`; `project_access_audit` auf `ON DELETE SET NULL`.

---

## 8. Kontaktaufnahme

Bei einer Kontaktaufnahme per E-Mail oder Kontaktformular werden die übermittelten Angaben zur Bearbeitung der Anfrage verarbeitet. Rechtsgrundlage ist je nach Inhalt Art. 6 Abs. 1 lit. b oder lit. f DSGVO.

---

## 9. Betroffenenrechte

Betroffene Personen haben nach Maßgabe der DSGVO insbesondere folgende Rechte:

- Auskunft nach Art. 15 DSGVO,
- Berichtigung nach Art. 16 DSGVO,
- Löschung nach Art. 17 DSGVO,
- Einschränkung der Verarbeitung nach Art. 18 DSGVO,
- Datenübertragbarkeit nach Art. 20 DSGVO,
- Widerspruch nach Art. 21 DSGVO.

Anfragen können an den Verantwortlichen aus Abschnitt 1 gerichtet werden.

---

## 10. Beschwerderecht

Betroffene Personen können sich bei einer Datenschutzaufsichtsbehörde beschweren. Nach dem Sitz des Verantwortlichen ist grundsätzlich der Hessische Beauftragte für Datenschutz und Informationsfreiheit in Betracht zu ziehen. Die aktuellen Kontaktdaten der zuständigen Behörde sind vor Veröffentlichung zu prüfen.

---

## 11. Verschlüsselung und Stand

Die Übertragung der Websites soll TLS-verschlüsselt erfolgen. Die konkrete technische Umsetzung ist je Domain vor Veröffentlichung zu prüfen.

Stand: `{{ impressum.updated }}`

Diese Datenschutzerklärung wird angepasst, wenn sich Verarbeitungsvorgänge, gesetzliche Anforderungen, Anbieter oder eingesetzte Dienste ändern.
