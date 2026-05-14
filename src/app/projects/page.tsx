import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import WorkSection from "@/components/WorkSection";
import Footer from "@/components/Footer";

export default function ProjectsPage() {
  return (
    <main>
      <Navbar />
      <PageHero
        label="Projects"
        number="004"
        heading={["Selected", "Work"]}
        sub="A curated collection of brand identities, websites, and campaigns created for clients worldwide."
      />
      <WorkSection />
      <Footer />
    </main>
  );
}
