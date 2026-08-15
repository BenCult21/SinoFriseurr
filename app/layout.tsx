import type { Metadata } from "next";
import { Playfair_Display, Inter, Cormorant } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { CONTACT, OPENING_HOURS, SALON_NAME } from "@/lib/config";

const playfairDisplay = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant({
  variable: "--font-hero",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sinofriseurstudio.de"),
  title: {
    default: `${SALON_NAME} – Friseur in Kassel`,
    template: `%s – ${SALON_NAME}`,
  },
  description:
    "Sino Friseurstudio in Kassel: modernes Styling, typgerechte Beratung und Wohlfühlambiente. Jetzt Termin online buchen.",
  openGraph: {
    title: `${SALON_NAME} – Friseur in Kassel`,
    description:
      "Modernes Styling, typgerechte Beratung und Wohlfühlambiente in Kassel.",
    url: "https://sinofriseurstudio.de",
    siteName: SALON_NAME,
    locale: "de_DE",
    type: "website",
  },
};

const SCHEMA_DAY_OF_WEEK: Record<string, string> = {
  Montag: "https://schema.org/Monday",
  Dienstag: "https://schema.org/Tuesday",
  Mittwoch: "https://schema.org/Wednesday",
  Donnerstag: "https://schema.org/Thursday",
  Freitag: "https://schema.org/Friday",
  Samstag: "https://schema.org/Saturday",
  Sonntag: "https://schema.org/Sunday",
};

const openingHoursSpecification = OPENING_HOURS.filter((h) => h.hours !== "geschlossen").map(
  (h) => {
    const [opens, closes] = h.hours.replace(" Uhr", "").split(" – ");
    return {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: SCHEMA_DAY_OF_WEEK[h.day],
      opens,
      closes,
    };
  }
);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: SALON_NAME,
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT.street,
    postalCode: CONTACT.postalCode,
    addressLocality: CONTACT.city,
    addressCountry: "DE",
  },
  telephone: CONTACT.phoneHref.replace("tel:", ""),
  url: "https://sinofriseurstudio.de",
  openingHoursSpecification,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`${playfairDisplay.variable} ${cormorant.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <ScrollToTop />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
