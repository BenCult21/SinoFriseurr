import { ABOUT_VALUES } from "@/lib/config";
import SectionHeading from "@/components/shared/SectionHeading";
import EditorialImage from "@/components/about/EditorialImage";

export default function AboutSection() {
  return (
    <section id="ueber-uns" className="bg-paper px-6 py-28 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Über uns"
          title="Handwerk, das man spürt"
          description="Sino Friseurstudio steht für modernes Styling, typgerechte Beratung und ein Ambiente, in dem man sich wohlfühlt. Unser Team verbindet Kreativität, Handwerkskunst und Leidenschaft für Haare — mit einem klaren Anspruch an Qualität, Service und persönliche Beratung bei jedem Termin. Wir arbeiten mit hochwertigen Produkten und modernen Techniken."
        />

        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          {ABOUT_VALUES.map((value) => (
            <span
              key={value}
              className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500"
            >
              {value}
            </span>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
          <EditorialImage
            src="/images/salon-barber-row.jpg"
            alt="Reihe hochwertiger Barber-Stühle im Sino Friseurstudio mit Hexagon-Deckenbeleuchtung"
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="aspect-[4/3] lg:col-span-7"
            priority
          />
          <EditorialImage
            src="/images/salon-reception.jpg"
            alt="Empfangsbereich des Sino Friseurstudio mit schwarzem Marmor und Hexagon-Lichtdecke"
            sizes="(min-width: 1024px) 34vw, 100vw"
            className="aspect-[4/3] lg:col-span-5 lg:translate-y-10"
            delay={0.1}
          />

          <EditorialImage
            src="/images/salon-lounge.jpg"
            alt="Lounge- und Wartebereich im Sino Friseurstudio mit Sitzbank und Blick auf Kassel"
            sizes="(min-width: 1024px) 34vw, 100vw"
            className="aspect-[4/3] lg:col-span-5"
            delay={0.15}
          />
          <div className="grid grid-cols-2 gap-5 lg:col-span-7 lg:gap-6">
            <EditorialImage
              src="/images/salon-detail-cape.jpg"
              alt="Detailaufnahme eines edlen Frisörumhangs im Sino Friseurstudio"
              sizes="(min-width: 1024px) 17vw, 50vw"
              className="aspect-square lg:translate-y-6"
              delay={0.2}
            />
            <EditorialImage
              src="/images/salon-detail-leopard.jpg"
              alt="Goldene Dekofigur als stilvolles Detail im Sino Friseurstudio"
              sizes="(min-width: 1024px) 17vw, 50vw"
              className="aspect-square"
              delay={0.25}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
