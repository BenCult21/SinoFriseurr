import { CONTACT, OPENING_HOURS, SALON_NAME, SOCIAL_LINKS } from "@/lib/config";
import MapsLink from "@/components/shared/MapsLink";
import PhoneLink from "@/components/shared/PhoneLink";
import BookingButton from "@/components/booking/BookingButton";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-8">
          <div>
            <p className="font-display text-sm font-light uppercase tracking-[0.2em] text-ink">
              {SALON_NAME}
            </p>
            <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-stone-600">
              Modernes Styling, typgerechte Beratung und Wohlfühlambiente in Kassel.
            </p>
            <div className="mt-6">
              <BookingButton label="Termin buchen" modal />
            </div>
          </div>

          <div>
            <p className="text-xs font-light uppercase tracking-[0.25em] text-stone-500">
              Kontakt
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <MapsLink showAddress />
              <PhoneLink />
            </div>
            {SOCIAL_LINKS.length > 0 && (
              <div className="mt-6 flex gap-4">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-stone-600 hover:text-ink"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-xs font-light uppercase tracking-[0.25em] text-stone-500">
              Öffnungszeiten
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {OPENING_HOURS.map((entry) => (
                <li key={entry.day} className="flex justify-between gap-6 text-sm font-light text-stone-600">
                  <span>{entry.day}</span>
                  <span className={entry.hours === "geschlossen" ? "text-stone-400" : "text-ink"}>
                    {entry.hours}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SALON_NAME}. Alle Rechte vorbehalten.
          </p>
          <p>{CONTACT.fullAddress}</p>
        </div>
      </div>
    </footer>
  );
}
