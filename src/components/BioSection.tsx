"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function CornerBracket({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={className}
    >
      <path d="M12 1H1V12" stroke="#1f1f1f" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

const BIO_TEXT =
  "Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here. Placeholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.";

export default function BioSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sec = sectionRef.current!;
      const mm  = gsap.matchMedia();

      // ── Desktop: text starts top-aligned with image, descends to bottom ───
      mm.add("(min-width: 1024px)", () => {
        const imgWrapper = sec.querySelector<HTMLElement>("[data-bio-img-d]")!;
        const imgInner   = sec.querySelector<HTMLElement>("[data-bio-img-inner-d]")!;
        const textEl     = sec.querySelector<HTMLElement>("[data-bio-text-d]")!;

        // Distance text must travel: image height − text height.
        // At y:−travel the text top sits exactly at the image top.
        // At y:0 (natural items-end position) the text bottom aligns with image bottom.
        const travel = imgWrapper.offsetHeight - textEl.offsetHeight;

        gsap.set(imgWrapper, { clipPath: "inset(0 0 100% 0)" });
        gsap.set(imgInner,   { scale: 1.15, transformOrigin: "50% 50%" });
        gsap.set(textEl,     { y: -travel, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: imgWrapper,
            start: "top 80%",
            end:   "top 5%",
            scrub: 2.5,
          },
        });

        // All three animate together over the same scrub window:
        // image clips open top-to-bottom, inner image de-zooms, text descends + fades in.
        tl.to(imgWrapper, { clipPath: "inset(0 0 0% 0)", ease: "none" }, 0)
          .to(imgInner,   { scale: 1,                    ease: "none" }, 0)
          .to(textEl,     { y: 0, opacity: 1,            ease: "none" }, 0);
      });

      // ── Mobile: stacked layout — separate time-based reveals ──────────────
      mm.add("(max-width: 1023px)", () => {
        const imgWrapper = sec.querySelector<HTMLElement>("[data-bio-img-m]")!;
        const imgInner   = sec.querySelector<HTMLElement>("[data-bio-img-inner-m]")!;
        const textEl = sec.querySelector<HTMLElement>("[data-bio-text-line-m]");

        gsap.set(imgWrapper, { clipPath: "inset(0 0 100% 0)" });
        gsap.set(imgInner,   { scale: 1.15, transformOrigin: "50% 50%" });
        if (textEl) gsap.set(textEl, { y: 28, opacity: 0, filter: "blur(3px)" });

        gsap.timeline({
          scrollTrigger: {
            trigger: imgWrapper,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        })
          .to(imgWrapper, { clipPath: "inset(0 0 0% 0)", duration: 1.8, ease: "power2.inOut" }, 0)
          .to(imgInner,   { scale: 1,                    duration: 2.4, ease: "power2.out"  }, 0);

        if (textEl) {
          gsap.timeline({
            scrollTrigger: {
              trigger: textEl,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }).to(textEl, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.9, ease: "power3.out" });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="bio" className="px-4 lg:px-8 py-12 lg:py-20">

      {/* ── Desktop ───────────────────────────────────────────────────────── */}
      <div className="hidden lg:flex items-start justify-between">
        <span className="font-mono text-sm text-[#1f1f1f] uppercase whitespace-nowrap">
          [ About ]
        </span>

        {/* items-end: text bottom and image bottom share the same baseline */}
        <div className="flex items-end gap-8 flex-1 pl-8">

          {/* Text — starts top-aligned with image, descends to this natural bottom position */}
          <div data-bio-text-d className="flex-1 min-w-0">
            <div className="flex items-stretch gap-3">
              <div className="flex flex-col justify-between w-4 shrink-0">
                <CornerBracket />
                <CornerBracket className="-rotate-90" />
              </div>
              <p className="flex-1 text-base md:text-[18px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em] py-2">
                Placeholder paragraph one. This is where you introduce yourself — your background,
                your passion for your craft, and what drives you creatively. Two to three sentences
                work best here. Placeholder paragraph two. Here you can describe your technical
                approach, how you collaborate with clients, or what sets your work apart from others
                in your field.
              </p>
              <div className="flex flex-col justify-between w-4 shrink-0">
                <CornerBracket className="rotate-90" />
                <CornerBracket className="rotate-180" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 shrink-0">
            <span className="font-mono text-sm text-[#1f1f1f] uppercase">002</span>
            <div data-bio-img-d className="relative w-[436px] h-[614px] overflow-hidden">
              <div data-bio-img-inner-d className="absolute inset-0">
                <Image
                  src="/about-portrait.jpg"
                  alt="Portrait"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile / tablet ───────────────────────────────────────────────── */}
      <div className="lg:hidden flex flex-col gap-5">
        <span className="font-mono text-sm text-[#1f1f1f] uppercase">002</span>
        <span className="font-mono text-sm text-[#1f1f1f] uppercase">[ About ]</span>

        <div className="flex items-stretch gap-3 max-w-[600px] mx-auto">
          <div className="flex flex-col justify-between w-4 shrink-0">
            <CornerBracket />
            <CornerBracket className="-rotate-90" />
          </div>
          <div className="flex-1 py-2">
            <p
              data-bio-text-line-m
              className="text-base md:text-[18px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]"
            >
              {BIO_TEXT}
            </p>
          </div>
          <div className="flex flex-col justify-between w-4 shrink-0">
            <CornerBracket className="rotate-90" />
            <CornerBracket className="rotate-180" />
          </div>
        </div>

        <div data-bio-img-m className="relative w-full aspect-[422/594] overflow-hidden">
          <div data-bio-img-inner-m className="absolute inset-0">
            <Image
              src="/about-portrait.jpg"
              alt="Portrait"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

    </section>
  );
}
