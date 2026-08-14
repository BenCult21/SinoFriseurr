import { SERVICES } from "@/lib/config";
import SectionHeading from "@/components/shared/SectionHeading";
import ServiceCard from "@/components/services/ServiceCard";
import BookingButton from "@/components/booking/BookingButton";

export default function ServicesSection() {
  return (
    <section id="leistungen" className="bg-stone-50 px-6 py-28 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Leistungen"
          title="Unsere Leistungen"
          align="center"
          description="Eine Auswahl unserer Services — persönlich abgestimmt auf Ihren Typ."
        />

        <div className="mt-16 grid gap-16 sm:grid-cols-2">
          {SERVICES.map((category) => (
            <div key={category.category}>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-stone-500">
                {category.category}
              </p>
              <div className="mt-4">
                {category.items.map((item, i) => (
                  <ServiceCard key={item.name} item={item} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <BookingButton label="Termin buchen" />
        </div>
      </div>
    </section>
  );
}
