"use client";

import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    logo: "/testimonial-logo-2.svg",
    logoW: 143,
    logoH: 19,
    quote:
      "A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.",
    name: "Marko Stojković",
    rotate: "-6.85deg",
    left: "7%",
    top: "100px",
    zIndex: 20,
  },
  {
    logo: "/testimonial-logo-1.svg",
    logoW: 138,
    logoH: 19,
    quote:
      "Professional, precise, and incredibly fast at handling complex product visualizations and templates.",
    name: "Lukas Weber",
    rotate: "2.9deg",
    left: "47%",
    top: "195px",
    zIndex: 5,
  },
  {
    logo: "/testimonial-logo-3.svg",
    logoW: 109,
    logoH: 31,
    quote:
      "A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don't just make things look good; they solve business problems through visual clarity.",
    name: "Sarah Jenkins",
    rotate: "2.23deg",
    left: "21%",
    top: "553px",
    zIndex: 20,
  },
  {
    logo: "/testimonial-logo-4.svg",
    logoW: 81,
    logoH: 36,
    quote:
      "An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.",
    name: "Sofia Martínez",
    rotate: "-4.15deg",
    left: "55%",
    top: "546px",
    zIndex: 20,
  },
];

function TestimonialCard({
  logo,
  logoW,
  logoH,
  quote,
  name,
}: {
  logo: string;
  logoW: number;
  logoH: number;
  quote: string;
  name: string;
}) {
  return (
    <div className="bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4 w-[353px] max-w-[calc(100%-2rem)] shrink-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo}
        alt=""
        width={logoW}
        height={logoH}
        style={{ width: logoW, height: logoH, objectFit: "contain", objectPosition: "left" }}
      />
      <p className="text-[18px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">{quote}</p>
      <p className="font-black text-[16px] text-black uppercase tracking-[-0.04em] leading-[1.1]">
        {name}
      </p>
    </div>
  );
}

// y drift range per card (px): further from 0 = more drift = appears closer
const DRIFT = [-70, -25, -55, -80];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = document.getElementById("testimonials");
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-testimonial-card]", section);

      cards.forEach((card, i) => {
        const toY = DRIFT[i] ?? -60;
        const fromY = Math.abs(toY);
        // Set rotation via GSAP so it owns the transform and can compose y safely
        gsap.set(card, { rotation: parseFloat(testimonials[i].rotate) });
        gsap.fromTo(
          card,
          { y: fromY },
          {
            y: toY,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 2,
            },
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="testimonials">

      {/* Desktop — only at lg+ where the absolute card layout has room */}
      <div className="hidden lg:flex items-center justify-center relative px-8 h-[900px] overflow-hidden">
        <p className="relative font-medium text-[198px] text-black text-center capitalize tracking-[-0.07em] leading-[1.1] select-none pointer-events-none z-[10]">
          Testimonials
        </p>

        {testimonials.map((t, i) => (
          <div
            key={t.name}
            data-testimonial-card={String(i)}
            className="absolute"
            style={{
              left: t.left,
              top: t.top,
              transform: `rotate(${t.rotate})`,
              zIndex: t.zIndex,
            }}
          >
            <TestimonialCard {...t} />
          </div>
        ))}
      </div>

      {/* Mobile / tablet slider — below lg */}
      <div className="lg:hidden px-4 py-16 flex flex-col gap-8">
        <p className="font-medium text-[64px] text-black capitalize tracking-[-0.07em] leading-[0.8]">
          Testimonials
        </p>

        <div className="flex flex-col gap-6">
          {/* Track */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {testimonials.map((t) => (
                <div key={t.name} className="w-full shrink-0 flex justify-center">
                  <TestimonialCard {...t} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === active ? "w-5 h-2 bg-black" : "w-2 h-2 bg-[#ccc]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
