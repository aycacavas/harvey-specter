"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PageHeroProps {
  label: string;
  number: string;
  heading: string[];
  sub: string;
}

export default function PageHero({ label, number, heading, sub }: PageHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sec = sectionRef.current!;
      const lines = gsap.utils.toArray<HTMLElement>("[data-hero-line]", sec);
      const para = sec.querySelector<HTMLElement>("[data-hero-para]");

      gsap.set(lines, { y: 24, opacity: 0, filter: "blur(3px)" });
      if (para) gsap.set(para, { y: 24, opacity: 0, filter: "blur(3px)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      lines.forEach((line, i) => {
        tl.to(
          line,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power3.out",
          },
          i * 0.1,
        );
      });

      if (para) {
        tl.to(
          para,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power3.out",
          },
          lines.length * 0.1 + 0.1,
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-4 md:px-8 pt-32 md:pt-40 pb-12 md:pb-20"
    >
      {/* Top label row */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-sm text-[#1f1f1f] uppercase">[ {label} ]</span>
        <span className="font-mono text-sm text-[#1f1f1f] uppercase">{number}</span>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[#1f1f1f]" />

      {/* Heading */}
      <div className="mt-8 flex flex-col gap-0">
        {heading.map((line, i) => (
          <div key={i} className="overflow-hidden">
            <p
              data-hero-line
              className="font-light text-[48px] lg:text-[96px] text-black uppercase tracking-[-0.08em] leading-[0.86]"
            >
              {line}
            </p>
          </div>
        ))}
      </div>

      {/* Sub paragraph */}
      <div className="mt-8 md:mt-12">
        <p
          data-hero-para
          className="text-base md:text-[18px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em] max-w-[520px]"
        >
          {sub}
        </p>
      </div>
    </section>
  );
}
