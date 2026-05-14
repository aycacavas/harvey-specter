import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import CTAButton from "@/components/CTAButton";

function ContactDetails() {
  return (
    <section className="px-4 md:px-8 py-12 md:py-20 flex flex-col gap-12 md:gap-20">
      {/* Two-column on desktop */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Left: get in touch */}
        <div className="flex flex-col gap-6 flex-1">
          <span className="font-mono text-sm text-[#1f1f1f] uppercase">[ Get in touch ]</span>
          <div className="h-px bg-[#1f1f1f]" />
          <p className="text-base md:text-[18px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em] max-w-[420px]">
            Have a project in mind? Fill out the form or reach out directly — I&apos;d love to hear about it.
          </p>
          <div className="flex flex-col gap-3 text-base text-[#1f1f1f] tracking-[-0.04em]">
            <a href="mailto:hello@hstudio.com" className="underline underline-offset-2">hello@hstudio.com</a>
            <p>Chicago, Illinois</p>
          </div>
          <CTAButton className="self-start">Let&apos;s talk</CTAButton>
        </div>
        {/* Right: social links */}
        <div className="flex flex-col gap-6 lg:w-[300px] shrink-0">
          <span className="font-mono text-sm text-[#1f1f1f] uppercase">[ Follow ]</span>
          <div className="h-px bg-[#1f1f1f]" />
          <div className="flex flex-col gap-4 text-[18px] text-[#1f1f1f] uppercase tracking-[-0.04em] leading-[1.1]">
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">X.com</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <PageHero
        label="Contact"
        number="006"
        heading={["Let's", "Talk"]}
        sub="Ready to start something new? Get in touch and let's bring your ideas to life."
      />
      <ContactDetails />
      <Footer />
    </main>
  );
}
