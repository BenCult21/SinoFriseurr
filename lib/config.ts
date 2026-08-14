// Zentrale, verbindliche Kundendaten für Sino Friseurstudio Kassel.
// Nur bestätigte Informationen aus den Kunden-Unterlagen. Nichts erfinden.

/**
 * Calendly-Buchungslink. Noch nicht vom Kunden bereitgestellt.
 * Sobald verfügbar: als Env-Var NEXT_PUBLIC_CALENDLY_URL setzen (siehe .env.example).
 * Alle Termin-CTAs im Projekt lesen ausschließlich aus dieser Konstante.
 */
export const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/PLACEHOLDER-SINO-FRISEURSTUDIO";

export const CALENDLY_URL_IS_PLACEHOLDER = !process.env.NEXT_PUBLIC_CALENDLY_URL;

export const SALON_NAME = "Sino Friseurstudio";

export const CONTACT = {
  street: "Kurt-Schumacher-Straße 31",
  postalCode: "34117",
  city: "Kassel",
  fullAddress: "Kurt-Schumacher-Straße 31, 34117 Kassel",
  phone: "0561 76602459",
  phoneDisplay: "0561 76602459",
  phoneHref: "tel:+4956176602459",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Sino Friseurstudio, Kurt-Schumacher-Straße 31, 34117 Kassel"),
};

export const OPENING_HOURS = [
  { day: "Montag", hours: "09:00 – 20:00 Uhr" },
  { day: "Dienstag", hours: "09:00 – 20:00 Uhr" },
  { day: "Mittwoch", hours: "09:00 – 20:00 Uhr" },
  { day: "Donnerstag", hours: "09:00 – 20:00 Uhr" },
  { day: "Freitag", hours: "09:00 – 20:00 Uhr" },
  { day: "Samstag", hours: "09:00 – 20:00 Uhr" },
  { day: "Sonntag", hours: "geschlossen" },
];

export type TeamMember = {
  name: string;
  role?: string;
  specialty?: string;
  bio?: string;
  photo?: string;
};

// Nur bestätigte Namen. Rollen/Spezialisierung/Bio/Fotos aktuell nicht verifiziert
// und werden bewusst nicht erfunden.
export const TEAM: TeamMember[] = [
  { name: "Ibrahim" },
  { name: "Sino" },
  { name: "Azad" },
];

export type ServiceItem = {
  name: string;
  duration: string;
  price: string;
};

export type ServiceCategory = {
  category: string;
  items: ServiceItem[];
};

export const SERVICES: ServiceCategory[] = [
  {
    category: "Herren",
    items: [
      { name: "Schneiden + Bart", duration: "ca. 35 Min.", price: "ab 28 €" },
      { name: "Schneiden + Bart + Waschen", duration: "ca. 40 Min.", price: "ab 33 €" },
      { name: "Waschen + Schneiden + Bart + Föhnen", duration: "ca. 45 Min.", price: "ab 35 €" },
      { name: "Trockenhaarschnitt", duration: "ca. 30 Min.", price: "ab 18 €" },
      { name: "Maschinenschnitt", duration: "ca. 30 Min.", price: "ab 18 €" },
    ],
  },
  {
    category: "Kinder",
    items: [{ name: "Kinder bis 12 Jahre", duration: "ca. 20 Min.", price: "ab 15 €" }],
  },
];

export const RATING = {
  overall: 5.0,
  reviewCount: 4,
  categories: [
    { label: "Empfang", score: 5.0 },
    { label: "Sauberkeit", score: 5.0 },
    { label: "Umgebung & Ambiente", score: 5.0 },
    { label: "Qualität der Dienstleistung", score: 5.0 },
  ],
};

export const ABOUT_VALUES = [
  "Modernes Styling",
  "Typgerechte Beratung",
  "Wohlfühlambiente",
  "Kreativität",
  "Handwerkskunst",
  "Leidenschaft für Haare",
  "Qualität",
  "Service",
  "Persönliche Beratung",
  "Hochwertige Produkte",
  "Moderne Techniken",
];

export const NAV_LINKS = [
  { label: "Start", href: "#start" },
  { label: "Über uns", href: "#ueber-uns" },
  { label: "Leistungen", href: "#leistungen" },
  { label: "Team", href: "#team" },
  { label: "Rezensionen", href: "#rezensionen" },
  { label: "Standort", href: "#standort" },
];

// Social-Media-Links aktuell nicht bestätigt — bewusst leer gelassen.
export const SOCIAL_LINKS: { label: string; href: string }[] = [];
