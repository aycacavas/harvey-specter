"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PhotoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { scale: 1 },
        {
          scale: 1.18,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end:   "bottom top",
            scrub: 1.5,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[700px] md:h-[900px] overflow-hidden">
      <div ref={imgRef} className="absolute inset-0">
        <Image
          src="/photo-section.jpg"
          alt="Photographer at work"
          fill
          className="object-cover object-[60%_center] md:object-center"
        />
      </div>
    </section>
  );
}
