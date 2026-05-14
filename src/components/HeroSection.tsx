"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CTAButton from "./CTAButton";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const desktopEyebrowRef = useRef<HTMLParagraphElement>(null);
  const harveyGroupRef = useRef<HTMLDivElement>(null);
  const specterGroupRef = useRef<HTMLDivElement>(null);
  const mobileEyebrowRef = useRef<HTMLParagraphElement>(null);
  const mobileHarveyRef = useRef<HTMLSpanElement>(null);
  const mobileSpecterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const vw = window.innerWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 2,
      },
    });

    tl.to(bgRef.current, { scale: 1.2, transformOrigin: "50% 20%", ease: "none" }, 0);
    tl.to(harveyGroupRef.current, { x: -vw * 0.65, ease: "none" }, 0);
    tl.to(desktopEyebrowRef.current, { x: -vw * 0.65, ease: "none" }, 0);
    tl.to(specterGroupRef.current, { x: vw * 0.65, ease: "none" }, 0);
    tl.to(mobileEyebrowRef.current, { x: -vw * 0.75, ease: "none" }, 0);
    tl.to(mobileHarveyRef.current, { x: -vw * 0.75, ease: "none" }, 0);
    tl.to(mobileSpecterRef.current, { x: vw * 0.75, ease: "none" }, 0);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen">
      {/* Background clip layer — pointer-events-none so it never blocks content */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div ref={bgRef} className="absolute inset-0">
          <Image
            src="/hero.jpg"
            alt="Harvey Specter"
            fill
            className="object-cover object-top"
            priority
          />
        </div>

        {/* Blur overlay */}
        <div
          className="absolute bottom-0 inset-x-0 h-[50%] backdrop-blur-[10px] pointer-events-none"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 60%)",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 60%)",
          }}
        />
      </div>

      <div className="relative h-full flex flex-col px-4 md:px-8">

        {/* ── Desktop hero content ── */}
        <p
          ref={desktopEyebrowRef}
          className="hidden md:block absolute font-mono text-sm text-white mix-blend-overlay uppercase top-[41%] xl:top-[35%] left-8"
        >
          [ Hello i&apos;m ]
        </p>
        <h1 className="hidden md:block sr-only">Harvey Specter</h1>
        <div className="hidden md:flex gap-[2%] absolute left-8 right-8 top-[45%] xl:top-[39%] mix-blend-overlay" aria-hidden="true">
          <div ref={harveyGroupRef} className="flex-1 min-w-0">
            <svg viewBox="0 0 490 150" overflow="visible" className="w-full" xmlns="http://www.w3.org/2000/svg">
              <text
                x="0"
                y="115"
                textLength="490"
                lengthAdjust="spacingAndGlyphs"
                fill="white"
                style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontWeight: "500",
                  fontSize: "158px",
                  letterSpacing: "-11.06px",
                }}
              >
                Har<tspan dx="7">vey</tspan>
              </text>
            </svg>
          </div>
          <div ref={specterGroupRef} className="flex-1 min-w-0">
            <svg viewBox="0 0 490 150" overflow="visible" className="w-full" xmlns="http://www.w3.org/2000/svg">
              <text
                x="0"
                y="115"
                textLength="490"
                lengthAdjust="spacingAndGlyphs"
                fill="white"
                style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontWeight: "500",
                  fontSize: "158px",
                  letterSpacing: "-11.06px",
                }}
              >
                Specter
              </text>
            </svg>
          </div>
        </div>
        <div className="hidden md:flex absolute flex-col gap-4 bottom-8 right-8 w-[460px]">
          <p className="font-bold italic text-[18px] text-[#1f1f1f] tracking-[-0.04em] uppercase leading-[1.1]">
            H.Studio is a{" "}
            <span className="font-normal not-italic">full-service</span>
            {" "}creative studio creating beautiful digital experiences and products. We are an{" "}
            <span className="font-normal not-italic">award winning</span>
            {" "}desing and art group specializing in branding, web design and engineering.
          </p>
          <CTAButton className="self-start">Let&apos;s talk</CTAButton>
        </div>

        {/* ── Mobile hero content ── */}
        <div className="md:hidden absolute inset-x-4 top-[48%] bottom-10 flex flex-col">
          <p ref={mobileEyebrowRef} className="font-mono text-sm text-white uppercase mb-2 text-center">
            [ Hello i&apos;m ]
          </p>
          <h1 className="sr-only">Harvey Specter</h1>
          <div className="text-[clamp(72px,_14vw,_110px)] leading-none font-medium text-white mix-blend-overlay tracking-[-0.07em] text-center capitalize" aria-hidden="true">
            <span ref={mobileHarveyRef} className="block">Harvey</span>
            <span ref={mobileSpecterRef} className="block">Specter</span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-end gap-6 mt-6">
            <p className="font-bold italic text-[13px] text-[#1f1f1f] tracking-[-0.04em] uppercase leading-[1.2] text-center max-w-[290px] sm:max-w-[400px]">
              H.Studio is a{" "}
              <span className="font-normal not-italic">full-service</span>
              {" "}creative studio creating beautiful digital experiences and products. We are an{" "}
              <span className="font-normal not-italic">award winning</span>
              {" "}desing and art group specializing in branding, web design and engineering.
            </p>
            <CTAButton>Let&apos;s talk</CTAButton>
          </div>
        </div>

      </div>
    </section>
  );
}
