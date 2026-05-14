"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

const values = [
  {
    number: "[ 1 ]",
    title: "Craft Over Speed",
    description:
      "Placeholder description of this value. Two to three sentences that explain why this principle matters to the work.",
    image: "/services-1.jpg",
  },
  {
    number: "[ 2 ]",
    title: "Clarity First",
    description:
      "Placeholder description of this value. Two to three sentences that explain why this principle matters to the work.",
    image: "/services-2.jpg",
  },
  {
    number: "[ 3 ]",
    title: "Built to Last",
    description:
      "Placeholder description of this value. Two to three sentences that explain why this principle matters to the work.",
    image: "/services-3.jpg",
  },
];

export default function ValuesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const inners = Array.from(
      section.querySelectorAll<HTMLElement>("[data-value-img-inner]")
    );

    // Default: slightly zoomed in, dimmed, settled slightly low
    gsap.set(inners, { scale: 1.12, filter: "brightness(0.82)", y: 5 });

    const listeners: { el: HTMLElement; enter: EventListener; leave: EventListener }[] = [];

    inners.forEach((inner) => {
      const wrapper = inner.closest<HTMLElement>("[data-value-img]");
      if (!wrapper) return;

      const onEnter = (e: Event) => {
        if ((e as PointerEvent).pointerType !== "mouse") return;
        gsap.killTweensOf(inner);
        gsap.to(inner, {
          scale: 1,
          filter: "brightness(1.06)",
          y: 0,
          duration: 0.9,
          ease: "power2.out",
        });
      };

      const onLeave = (e: Event) => {
        if ((e as PointerEvent).pointerType !== "mouse") return;
        gsap.killTweensOf(inner);
        gsap.to(inner, {
          scale: 1.12,
          filter: "brightness(0.82)",
          y: 5,
          duration: 0.9,
          ease: "power2.inOut",
        });
      };

      wrapper.addEventListener("pointerenter", onEnter);
      wrapper.addEventListener("pointerleave", onLeave);
      listeners.push({ el: wrapper, enter: onEnter, leave: onLeave });
    });

    return () => {
      gsap.killTweensOf(inners);
      listeners.forEach(({ el, enter, leave }) => {
        el.removeEventListener("pointerenter", enter);
        el.removeEventListener("pointerleave", leave);
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="values"
      className="bg-black px-4 md:px-8 py-12 md:py-20 flex flex-col gap-8 md:gap-12"
    >
      {/* Label */}
      <span className="font-mono text-sm text-white uppercase">[ Values ]</span>

      {/* [3] Principles header */}
      <div className="flex items-center justify-between font-light text-white uppercase tracking-[-0.08em] text-[32px] md:text-[96px] leading-none">
        <span>[3]</span>
        <span>Principles</span>
      </div>

      {/* Values list */}
      <div className="flex flex-col gap-12">
        {values.map((value) => (
          <div key={value.number} className="flex flex-col gap-4">

            {/* Number + divider */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-sm text-white uppercase">{value.number}</span>
              <div className="w-full h-px bg-white" />
            </div>

            {/* Title + desc + image */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-8">
              <p
                className="font-bold italic text-[36px] text-white uppercase leading-[1.1] tracking-[-0.04em] whitespace-nowrap shrink-0"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {value.title}
              </p>

              <div className="flex flex-col md:flex-row gap-6 md:gap-10 md:items-start min-w-0">
                <p className="text-base md:text-[18px] text-white leading-[1.3] tracking-[-0.04em] md:max-w-[393px] min-w-0">
                  {value.description}
                </p>
                {/* Mobile: landscape 3:2 — Desktop: 151px square */}
                <div data-value-img className="relative w-full aspect-[3/2] overflow-hidden md:w-[151px] md:h-[151px] md:shrink-0">
                  <div data-value-img-inner className="absolute inset-0">
                    <Image
                      src={value.image}
                      alt={value.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
