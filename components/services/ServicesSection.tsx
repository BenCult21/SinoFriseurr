import { SERVICES } from "@/lib/config";
import SectionHeading from "@/components/shared/SectionHeading";
import ServiceCard from "@/components/services/ServiceCard";
import BookingButton from "@/components/booking/BookingButton";

export default function ServicesSection() {
  return (
    <section id="leistungen" className="bg-paper px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Leistungen"
          title="Unsere Services"
          align="center"
          description="Professionelle Haarschnitte und Treatments, persönlich abgestimmt auf Ihren Typ."
        />

        <div className="mt-20 space-y-16">
          {SERVICES.map((category) => (
            <div key={category.category}>
              <h3 className="font-display text-2xl font-light text-ink tracking-wide mb-8">
                {category.category}
              </h3>
              <div className="space-y-0">
                {category.items.map((item, i) => (
                  <ServiceCard key={item.name} item={item} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <BookingButton label="Termin buchen" />
        </div>
      </div>
    </section>
  );
}
