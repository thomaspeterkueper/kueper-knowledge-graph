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

Die verwendeten Schriftarten sollen lokal beziehungsweise über den Build self-hosted ausgeliefert werden. Beim Laden der Schriftarten findet dann keine Verbindung zu Google Fonts oder anderen externen Font-Diensten statt.

Für NOXIA ist die Umstellung der verbliebenen Remote-Einbindung von Courier Prime und Playfair Display auf `next/font/google` als `NOX-0005` beauftragt. Solange diese Änderung nicht produktiv ausgerollt ist, muss die bestehende Remote-Verbindung zu Google Fonts im veröffentlichten Rechtstext berücksichtigt werden.

Der Stand von zereya.de ist vor Veröffentlichung gesondert zu verifizieren.

---

## 6. Cookies und Tracking

Auf den statischen Websites werden nach aktuellem Kenntnisstand keine Cookies zu Analyse- oder Marketingzwecken gesetzt. Es findet kein eigenes Analytics- oder Werbe-Tracking statt.

Soweit NOXIA oder SSF Benutzerkonten verwenden, können technisch notwendige Session- oder Authentifizierungs-Cookies eingesetzt werden. Rechtsgrundlage ist je nach Ausgestaltung Art. 6 Abs. 1 lit. b oder lit. f DSGVO.

Falls künftig nicht notwendige Cookies, Analytics- oder Marketing-Dienste eingesetzt werden, sind diese Erklärung und gegebenenfalls das Consent-Verfahren vor Aktivierung anzupassen.

---

## 7. Benutzerkonten und Anwendungsdaten

Soweit NOXIA oder SSF Konten, Anmeldung, Spielstände, Lernfortschritte oder vergleichbare Zustände anbieten, kann Supabase als Datenbank- und Authentifizierungsdienst eingesetzt werden.

Verarbeitet werden dabei abhängig von der konkreten Funktion insbesondere:

- E-Mail-Adresse oder Benutzerkennung,
- Authentifizierungs- und Sessiondaten,
- Spielstand oder Lernfortschritt,
- technische Metadaten zur Nutzung des Kontos.

Rechtsgrundlage ist grundsätzlich Art. 6 Abs. 1 lit. b DSGVO, soweit die Verarbeitung zur Bereitstellung der gewählten Anwendung erforderlich ist. Ergänzende Sicherheits- und Betriebsverarbeitungen können auf Art. 6 Abs. 1 lit. f DSGVO gestützt werden.

Vor Veröffentlichung sind je System zu bestätigen:

- ob Benutzerkonten produktiv aktiviert sind,
- welche Datenfelder tatsächlich gespeichert werden,
- welche Region und Vertragskonfiguration bei Supabase genutzt wird,
- welche Lösch- und Aufbewahrungsfristen gelten,
- wie Nutzer ihr Konto und ihre Anwendungsdaten löschen lassen können.

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
