import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import LatestNewsSection from "@/components/LatestNewsSection";
import Footer from "@/components/Footer";

export default function NewsPage() {
  return (
    <main>
      <Navbar />
      <PageHero
        label="News"
        number="005"
        heading={["Latest", "News"]}
        sub="Updates, articles, and stories from the studio — keeping you in the loop on what's new."
      />
      <LatestNewsSection />
      <Footer />
    </main>
  );
}
