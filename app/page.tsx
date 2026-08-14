import Hero from "@/components/hero/Hero";
import AboutSection from "@/components/about/AboutSection";
import ServicesSection from "@/components/services/ServicesSection";
import TeamSection from "@/components/team/TeamSection";
import ReviewsSection from "@/components/reviews/ReviewsSection";
import BookingSection from "@/components/booking/BookingSection";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <TeamSection />
      <ReviewsSection />
      <BookingSection />
    </>
  );
}
