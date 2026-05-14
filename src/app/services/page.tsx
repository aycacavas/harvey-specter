import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";

export default function ServicesPage() {
  return (
    <main>
      <Navbar />
      <PageHero
        label="Services"
        number="003"
        heading={["What", "We Do"]}
        sub="From brand discovery to photography — a full-service creative offering built around your vision."
      />
      <ServicesSection />
      <Footer />
    </main>
  );
}
