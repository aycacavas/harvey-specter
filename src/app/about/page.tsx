import Navbar from "@/components/Navbar";
import AboutHero from "@/components/AboutHero";
import StorySection from "@/components/StorySection";
import ValuesSection from "@/components/ValuesSection";
import SkillsSection from "@/components/SkillsSection";
import AboutCTASection from "@/components/AboutCTASection";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <AboutHero />
      <StorySection />
      <ValuesSection />
      <SkillsSection />
      <AboutCTASection />
      <Footer />
    </main>
  );
}
