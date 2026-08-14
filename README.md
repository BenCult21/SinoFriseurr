# Sino Friseurstudio Kassel — Website

Premium-Website für das Sino Friseurstudio (Kurt-Schumacher-Straße 31, 34117 Kassel), gebaut mit Next.js (App Router), TypeScript, Tailwind CSS und Framer Motion.

## Entwicklung

```bash
npm install
npm run dev
```

Anschließend [http://localhost:3000](http://localhost:3000) öffnen.

```bash
npm run build   # Produktions-Build
npm run start   # Produktions-Server lokal starten
npm run lint    # ESLint
```

## Calendly-Konfiguration

Alle „Termin buchen"-CTAs lesen zentral aus `lib/config.ts` (`CALENDLY_URL`). Solange keine echte Kunden-URL vorliegt, ist dort ein klar erkennbarer Platzhalter hinterlegt.

Sobald die echte Calendly-URL vorliegt:

1. `.env.example` nach `.env.local` kopieren
2. `NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/...` eintragen
3. Dieselbe Variable in den Vercel-Projekteinstellungen (Environment Variables) für Production/Preview setzen

Kein Code muss angepasst werden — alle Buttons verwenden automatisch die neue URL.

## Zentrale Kundendaten

Alle verbindlichen Kundendaten (Adresse, Telefon, Öffnungszeiten, Team, Leistungen, Bewertungen) liegen gebündelt in [`lib/config.ts`](./lib/config.ts). Nur dort bearbeiten — die Komponenten greifen ausschließlich auf diese zentrale Quelle zu.

## Tests

Um die Tests auszuführen:

```bash
npm test
```

### Test-Struktur

Die Test-Suite deckt folgende Bereiche ab:

- **Unit Tests**: Tests für einzelne Funktionen und Module
- **Integration Tests**: Tests für die Zusammenarbeit mehrerer Komponenten
- **E2E Tests**: End-to-End Tests für komplette Workflows

### Test-Ausführung

```bash
# Alle Tests ausführen
npm test

# Tests mit Coverage
npm test -- --coverage

# Tests im Watch-Mode
npm test -- --watch

# Spezifische Test-Datei
npm test -- path/to/test.js
```

## Offene Punkte (bewusst nicht erfunden)

- Echte Calendly-URL
- Social-Media-Links
- Team-Rollen, Spezialisierungen, Erfahrung, Bio-Texte und Fotos für Ibrahim, Sino, Azad
- Individuelle Rezensionstexte (aktuell nur Aggregat-Bewertung 5,0/5,0 bei 4 Bewertungen bekannt)

## Bilder

Die Salon-Fotos in `public/images/` stammen aus der vom Kunden bereitgestellten Planity-PDF (Empfang, Lounge, Barber-Stühle, Deko-Details). Keine Stockfotos, keine KI-generierten Bilder.

## Deployment

Zero-Config-Deployment auf [Vercel](https://vercel.com). `NEXT_PUBLIC_CALENDLY_URL` als Environment Variable nicht vergessen (siehe oben).

## Kontakt

Für Fragen oder Support: benlandgrebe65@gmail.com
