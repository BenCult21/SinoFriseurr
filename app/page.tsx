import Hero from "@/components/hero/Hero";
import AboutSection from "@/components/about/AboutSection";
import GallerySection from "@/components/gallery/GallerySection";
import ServicesSection from "@/components/services/ServicesSection";
import TeamSection from "@/components/team/TeamSection";
import ReviewsSection from "@/components/reviews/ReviewsSection";
import ContactSection from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <GallerySection />
      <ServicesSection />
      <TeamSection />
      <ReviewsSection />
      <ContactSection />
    </>
  );
}
