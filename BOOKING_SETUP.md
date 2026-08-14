# Calendly-Integration für Sino Friseurstudio

## 📋 Überblick

Die Website bietet ein elegantes Terminbuchungs-System, das direkt in die Calendly-Plattform integriert ist. Nutzer können Termine buchen, ohne die Website verlassen zu müssen.

## 🔧 Technische Details

### Aktuelle Implementierung

- **Booking Modal**: Elegantes, animiertes Modal-Dialog
- **Calendly Embed**: Offizielle Calendly-Widget-Integration
- **Responsive Design**: Funktioniert auf Desktop, Tablet und Mobile
- **Fallback**: Wenn Calendly-URL noch nicht konfiguriert, zeigt fallback Link

### Komponenten

- `components/booking/BookingButton.tsx` - CTA Button mit Modal-Unterstützung
- `components/booking/BookingModal.tsx` - Elegantes Modal mit Calendly Widget
- `lib/config.ts` - Zentrale Konfiguration

## 🚀 Setup: Calendly-URL einbinden

### Schritt 1: Calendly-Buchungsseite finden

1. Melden Sie sich bei [Calendly.com](https://calendly.com) an
2. Gehen Sie zu **Scheduling Links** / **Booking Link**
3. Kopieren Sie Ihre persönliche Calendly-URL
   - Format: `https://calendly.com/your-username/appointment-name`

### Schritt 2: Environment Variable setzen

#### Für lokale Entwicklung:

1. Datei `.env.local` im Root-Verzeichnis erstellen (falls nicht vorhanden)
2. Folgende Zeile hinzufügen:

```bash
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username/appointment-name
```

3. Server neu starten (`npm run dev`)

#### Für Vercel Deployment:

1. Melden Sie sich bei [Vercel](https://vercel.com) an
2. Gehen Sie zu Ihr Projekt > **Settings** > **Environment Variables**
3. Neue Variable hinzufügen:
   - **Name**: `NEXT_PUBLIC_CALENDLY_URL`
   - **Value**: `https://calendly.com/your-username/appointment-name`
   - **Environments**: Wählen Sie `Production`, `Preview`, und `Development`
4. Speichern und Projekt neu deployen

## ✅ Testing

Nach der Konfiguration:

1. Lokale Website öffnen: `http://localhost:3000`
2. "Termin buchen" Button klicken
3. Calendly-Widget sollte im Modal angezeigt werden
4. Testtermine buchen und in Calendly überprüfen

## 🔐 Wichtig: `NEXT_PUBLIC_*` Variable

Die Variable beginnt mit `NEXT_PUBLIC_`, weil:
- Sie im Browser benötigt wird (nicht nur im Server)
- Sie ist öffentlich sichtbar (enthält keine Secrets)
- Sie ist in `lib/config.ts` zur Compile-Time verfügbar

**WARNUNG**: Benutzen Sie niemals API-Keys oder Secrets in einer `NEXT_PUBLIC_`-Variable!

## 📱 Mobile-Optimierung

Das Booking-Modal ist vollständig responsive:
- Auf Mobile: Vollbild-Modal mit Touch-optimierten Close-Button
- Auf Desktop: Zentriertes Modal mit ausreichend Abstand
- Scroll-Blocking verhindert Background-Scrolling im geöffneten Zustand

## 🎨 Design-Anpassungen

Das Modal kann einfach angepasst werden:

**In `components/booking/BookingModal.tsx`:**

```tsx
// Modal-Header anpassen
<h2 className="font-display text-2xl font-light tracking-wide text-ink">
  Termin vereinbaren
</h2>

// Farben, Grössen, etc. über Tailwind
```

## 🔗 Calendly-Embed Dokumentation

Für erweiterte Anpassungen siehe [Calendly Embed Dokumentation](https://help.calendly.com/en/articles/1445124-embed-calendly-on-your-website).

## ⚙️ Fallback / Platzhalter-Verhalten

Wenn `NEXT_PUBLIC_CALENDLY_URL` nicht gesetzt oder noch ein Platzhalter ist:

- Modal zeigt Fallback-UI
- Link zu Calendly ist trotzdem verfügbar
- Keine Fehler oder Broken Links
- Benutzer kann trotzdem buchen (externe Seite)

## 🆘 Häufige Probleme

### Calendly-Widget wird nicht angezeigt

**Lösung:**
1. Überprüfen Sie, dass `NEXT_PUBLIC_CALENDLY_URL` korrekt gesetzt ist
2. Browser-Konsole öffnen (F12) und auf Fehler prüfen
3. Server neu starten nach env-Änderung

### Modal öffnet sich nicht

**Lösung:**
1. JavaScript-Fehler in der Konsole prüfen
2. Überprüfen Sie, dass `BookingModal` richtig importiert ist
3. Cache/Cookies löschen

### Termin wird nicht erstellt

**Lösung:**
1. Überprüfen Sie Calendly-Konfiguration
2. Stellen Sie sicher, dass das Calendly-Konto aktiv ist
3. Überprüfen Sie Zeitzone und Verfügbarkeiten in Calendly

## 📞 Support

Für Fragen zur Calendly-Integration:
- [Calendly Help Center](https://help.calendly.com)
- Diese Website: `0561 76602459`

---

**Stand**: August 2024
**Version**: 1.0
