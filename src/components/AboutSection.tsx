"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sec     = sectionRef.current!;
      const header  = sec.querySelector<HTMLElement>("[data-bio-header]");
      const lines   = gsap.utils.toArray<HTMLElement>("[data-bio-line]",  sec).filter(el => el.offsetParent !== null);
      const labels  = gsap.utils.toArray<HTMLElement>("[data-bio-label]", sec).filter(el => el.offsetParent !== null);

      // ── Initial states ────────────────────────────────────────────────────
      // Header fades in at its natural position — divider stays as a fixed frame.
      if (header) gsap.set(header, { opacity: 0 });

      // Lines sit below their overflow-hidden mask clip boundary.
      // letterSpacing starts 0.02em wider than final — contracts as text settles.
      gsap.set(lines, {
        y: 64,
        opacity: 0,
        filter: "blur(4px)",
        letterSpacing: "-0.06em",
      });

      // Labels: wide tracking + slight x — compresses to position mechanically.
      gsap.set(labels, { opacity: 0, x: 9, letterSpacing: "0.14em" });

      // ── Reveal animation ─────────────────────────────────────────────────

      // Header has its own trigger — fades in as soon as it enters the viewport,
      // independent of the text lines which are 200px below.
      if (header) {
        gsap.to(header, {
          opacity: 1,
          duration: 0.55,
          ease: "power2.out",
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Text lines + labels fire when the first visible line enters the viewport.
      const firstLine = lines[0] ?? sec;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: firstLine,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Typography lines — emerge from beneath their masks in sequence.
      lines.forEach((line, i) => {
        tl.to(
          line,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            letterSpacing: "-0.08em",
            duration: 1.2,
            ease: "power3.out",
          },
          0.08 + i * 0.13,
        );
      });

      // Labels — mechanical: tracking contracts, x settles.
      tl.to(
        labels,
        {
          opacity: 1,
          x: 0,
          letterSpacing: "0em",
          stagger: 0.1,
          duration: 0.65,
          ease: "power2.out",
        },
        0.26,
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="px-4 lg:px-8 py-12 lg:py-[120px]">
      <div className="flex flex-col gap-16 lg:gap-[200px]">

        {/* Label + divider — fixed reference frame, fades in before text */}
        <div data-bio-header className="flex flex-col gap-4">
          <p className="font-mono text-sm text-[#1f1f1f] uppercase text-right">
            [ 8+ years in industry ]
          </p>
          <div className="w-full h-px bg-[#1f1f1f]" />
        </div>

        {/* ── Desktop ─────────────────────────────────────────────────────── */}
        <div className="hidden lg:flex flex-col gap-2">

          {/* Line 1 — overflow-hidden masks the upward reveal */}
          <div className="flex items-start gap-3">
            <div className="overflow-hidden">
              <p
                data-bio-line
                className="text-[clamp(48px,6.2vw,96px)] font-light leading-[0.84] tracking-[-0.08em] text-black uppercase whitespace-nowrap"
              >
                A creative director&nbsp;&nbsp;&nbsp;/
              </p>
            </div>
            <span data-bio-label className="font-mono text-sm text-[#1f1f1f] mt-2">001</span>
          </div>

          {/* Line 2 */}
          <div className="overflow-hidden pl-[14.9vw]">
            <p
              data-bio-line
              className="text-[clamp(48px,6.2vw,96px)] font-light leading-[0.84] tracking-[-0.08em] text-black uppercase whitespace-nowrap"
            >
              Photographer
            </p>
          </div>

          {/* Line 3 */}
          <div className="overflow-hidden pl-[42.4vw]">
            <p
              data-bio-line
              className="text-[clamp(48px,6.2vw,96px)] font-light leading-[0.84] tracking-[-0.08em] text-black uppercase whitespace-nowrap"
            >
              Born{" "}
              <span
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  textTransform: "none",
                }}
              >
                &amp;
              </span>{" "}
              raised
            </p>
          </div>

          {/* Line 4 */}
          <div className="overflow-hidden">
            <p
              data-bio-line
              className="text-[clamp(48px,6.2vw,96px)] font-light leading-[0.84] tracking-[-0.08em] text-black uppercase whitespace-nowrap"
            >
              on the south side
            </p>
          </div>

          {/* Line 5 + inline label */}
          <div className="pl-[42vw] flex items-end gap-6">
            <div className="overflow-hidden">
              <p
                data-bio-line
                className="text-[clamp(48px,6.2vw,96px)] font-light leading-[0.84] tracking-[-0.08em] text-black uppercase whitespace-nowrap"
              >
                of chicago.
              </p>
            </div>
            <span
              data-bio-label
              className="hidden xl:block font-mono text-sm text-[#1f1f1f] mb-3 whitespace-nowrap"
            >
              [ CREATIVE FREELANCER ]
            </span>
          </div>

          {/* Inline label at lg (not xl) */}
          <span
            data-bio-label
            className="xl:hidden self-end font-mono text-sm text-[#1f1f1f] whitespace-nowrap mt-2"
          >
            [ CREATIVE FREELANCER ]
          </span>
        </div>

        {/* ── Mobile / tablet ──────────────────────────────────────────────── */}
        <div className="lg:hidden flex flex-col gap-2 items-center overflow-x-hidden">
          <span data-bio-label className="font-mono text-sm text-[#1f1f1f] mb-1">001</span>

          <div className="overflow-hidden">
            <p
              data-bio-line
              className="text-[32px] font-light leading-[0.84] tracking-[-0.08em] text-black uppercase whitespace-nowrap"
            >
              A creative director&nbsp;&nbsp;&nbsp;/
            </p>
          </div>
          <div className="overflow-hidden">
            <p
              data-bio-line
              className="text-[32px] font-light leading-[0.84] tracking-[-0.08em] text-black uppercase whitespace-nowrap"
            >
              Photographer
            </p>
          </div>
          <div className="overflow-hidden">
            <p
              data-bio-line
              className="text-[32px] font-light leading-[0.84] tracking-[-0.08em] text-black uppercase whitespace-nowrap"
            >
              Born{" "}
              <span
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  textTransform: "none",
                }}
              >
                &amp;
              </span>{" "}
              raised
            </p>
          </div>
          <div className="overflow-hidden">
            <p
              data-bio-line
              className="text-[32px] font-light leading-[0.84] tracking-[-0.08em] text-black uppercase whitespace-nowrap"
            >
              on the south side
            </p>
          </div>
          <div className="overflow-hidden">
            <p
              data-bio-line
              className="text-[32px] font-light leading-[0.84] tracking-[-0.08em] text-black uppercase whitespace-nowrap"
            >
              of chicago.
            </p>
          </div>

          <span data-bio-label className="font-mono text-sm text-[#1f1f1f] mt-2">
            [ CREATIVE FREELANCER ]
          </span>
        </div>

      </div>
    </section>
  );
}
