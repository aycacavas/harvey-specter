"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { year: "2016", text: "Began career as a junior designer at a boutique branding agency in Chicago." },
  { year: "2018", text: "Led visual identity for a series of hospitality brands across the Midwest." },
  { year: "2021", text: "Went independent — building brands, websites, and campaigns for clients worldwide." },
  { year: "2024", text: "Expanded into full-service creative direction, photography, and digital strategy." },
];

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sec = sectionRef.current!;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const imgWrapper = sec.querySelector<HTMLElement>("[data-story-img]")!;
        const imgInner = sec.querySelector<HTMLElement>("[data-story-img-inner]")!;
        const rows = gsap.utils.toArray<HTMLElement>("[data-story-row]", sec);

        gsap.set(imgWrapper, { clipPath: "inset(0 0 100% 0)" });
        gsap.set(imgInner, { scale: 1.15, transformOrigin: "50% 50%" });
        gsap.set(rows, { y: 20, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: imgWrapper,
            start: "top 80%",
            end: "top 5%",
            scrub: 2.5,
          },
        });

        tl.to(imgWrapper, { clipPath: "inset(0 0 0% 0)", ease: "none" }, 0)
          .to(imgInner, { scale: 1, ease: "none" }, 0);

        gsap.to(rows, {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rows[0],
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="story" className="px-4 lg:px-8 py-12 lg:py-20">

      {/* ── Desktop ───────────────────────────────────────────────────────── */}
      <div className="hidden lg:flex gap-12 items-start">

        {/* Left column — text content */}
        <div className="flex-1 flex flex-col gap-6">
          <span className="font-mono text-sm text-[#1f1f1f] uppercase">[ Story ]</span>
          <span className="font-mono text-sm text-[#1f1f1f] uppercase">002</span>

          <div className="flex flex-col">
            {milestones.map((m) => (
              <div key={m.year} data-story-row className="flex flex-col">
                <div className="w-full h-px bg-[#1f1f1f]" />
                <div className="flex gap-4 py-4">
                  <span className="font-mono text-sm text-[#888] w-20 shrink-0">{m.year}</span>
                  <p className="text-base md:text-[18px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
                    {m.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — portrait image */}
        <div className="w-[436px] shrink-0">
          <div data-story-img className="relative w-full h-[614px] overflow-hidden">
            <div data-story-img-inner className="absolute inset-0">
              <Image src="/about-portrait.jpg" alt="Portrait" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile / tablet ───────────────────────────────────────────────── */}
      <div className="lg:hidden flex flex-col gap-5">
        <span className="font-mono text-sm text-[#1f1f1f] uppercase">[ Story ]</span>
        <span className="font-mono text-sm text-[#1f1f1f] uppercase">002</span>

        <div className="flex flex-col">
          {milestones.map((m) => (
            <div key={m.year} className="flex flex-col">
              <div className="w-full h-px bg-[#1f1f1f]" />
              <div className="flex gap-4 py-4">
                <span className="font-mono text-sm text-[#888] w-20 shrink-0">{m.year}</span>
                <p className="text-base text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
                  {m.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div data-story-img className="relative w-full aspect-[422/594] overflow-hidden">
          <div data-story-img-inner className="absolute inset-0">
            <Image src="/about-portrait.jpg" alt="Portrait" fill className="object-cover" />
          </div>
        </div>
      </div>

    </section>
  );
}
