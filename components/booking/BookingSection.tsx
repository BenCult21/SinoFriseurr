import { CALENDLY_URL_IS_PLACEHOLDER } from "@/lib/config";
import SectionHeading from "@/components/shared/SectionHeading";
import BookingButton from "@/components/booking/BookingButton";

export default function BookingSection() {
  return (
    <section id="termin" className="bg-ink px-6 py-28 text-paper lg:px-10 lg:py-36">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <SectionHeading
          eyebrow="Termin"
          title="Jetzt Termin vereinbaren"
          align="center"
          invert
          description="Buchen Sie Ihren Wunschtermin bequem online — schnell, unkompliziert und ohne Wartezeit am Telefon."
        />

        <div className="mt-10">
          <BookingButton
            label="Termin buchen"
            variant="outline"
            className="border-paper! text-paper! hover:bg-paper! hover:text-ink!"
          />
        </div>

        {CALENDLY_URL_IS_PLACEHOLDER && (
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-stone-300">
            Hinweis: Calendly-Link folgt in Kürze — aktuell Platzhalter hinterlegt.
          </p>
        )}
      </div>
    </section>
  );
}
