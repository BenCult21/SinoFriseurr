import { ABOUT_VALUES } from "@/lib/config";
import SectionHeading from "@/components/shared/SectionHeading";
import EditorialImage from "@/components/about/EditorialImage";

export default function AboutSection() {
  return (
    <section id="ueber-uns" className="bg-paper px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Über uns"
          title="Handwerk, das man spürt"
          description="Sino Friseurstudio steht für modernes Styling, typgerechte Beratung und ein Ambiente, in dem man sich wohlfühlt. Unser Team verbindet Kreativität, Handwerkskunst und Leidenschaft für Haare — mit einem klaren Anspruch an Qualität, Service und persönliche Beratung bei jedem Termin."
        />

        {/* Values Grid */}
        <div className="mt-20 grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {ABOUT_VALUES.map((value) => (
            <div key={value} className="flex flex-col gap-2 border-l border-line pl-6">
              <span className="font-display text-sm font-light text-ink">
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Image Gallery */}
        <div className="mt-32 space-y-8">
          {/* Main Image */}
          <EditorialImage
            src="/images/salon-barber-row.jpg"
            alt="Reihe hochwertiger Barber-Stühle im Sino Friseurstudio"
            sizes="100vw"
            className="aspect-video w-full"
            priority
          />

          {/* Secondary Images */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <EditorialImage
              src="/images/salon-reception.jpg"
              alt="Empfangsbereich des Sino Friseurstudio"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-video"
              delay={0.1}
            />
            <EditorialImage
              src="/images/salon-lounge.jpg"
              alt="Lounge-Bereich im Sino Friseurstudio"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-video"
              delay={0.15}
            />
          </div>

          {/* Detail Images */}
          <div className="grid grid-cols-2 gap-8 lg:gap-8">
            <EditorialImage
              src="/images/salon-detail-cape.jpg"
              alt="Detail im Sino Friseurstudio"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-square"
              delay={0.2}
            />
            <EditorialImage
              src="/images/salon-detail-leopard.jpg"
              alt="Dekoration im Sino Friseurstudio"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-square"
              delay={0.25}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
