import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import BioSection from "@/components/BioSection";
import PhotoSection from "@/components/PhotoSection";
import ServicesSection from "@/components/ServicesSection";
import WorkSection from "@/components/WorkSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import LatestNewsSection from "@/components/LatestNewsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <BioSection />
      <PhotoSection />
      <ServicesSection />
      <WorkSection />
      <TestimonialsSection />
      <LatestNewsSection />
      <Footer />
    </main>
  );
}
