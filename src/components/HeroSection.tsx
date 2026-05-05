"use client";

import { useState } from "react";
import Image from "next/image";

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background photo — object-top keeps head proportions correct */}
      <div className="absolute inset-0">
        <Image
          src="/hero.jpg"
          alt="Harvey Specter"
          fill
          className="object-cover object-top"
          priority
        />
      </div>

      {/* Blur overlay — mask makes it fade upward instead of hard-cutting */}
      <div
        className="absolute bottom-0 inset-x-0 h-[50%] backdrop-blur-[10px] pointer-events-none"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 60%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 60%)",
        }}
      />

      {/* Page content */}
      <div className="relative h-full flex flex-col px-4 md:px-8">

        {/* Navbar */}
        <nav className="flex items-center justify-between py-6 relative z-50">
          <a href="/" className="font-semibold text-base tracking-[-0.04em] capitalize text-black">
            H.Studio
          </a>
          <div className="hidden md:flex items-center gap-14 font-semibold text-base tracking-[-0.04em] capitalize text-black">
            <a href="#about" className="hover:opacity-60 transition-opacity">About</a>
            <a href="#services" className="hover:opacity-60 transition-opacity">Services</a>
            <a href="#projects" className="hover:opacity-60 transition-opacity">Projects</a>
            <a href="#news" className="hover:opacity-60 transition-opacity">News</a>
            <a href="#contact" className="hover:opacity-60 transition-opacity">Contact</a>
          </div>
          <button
            className="md:hidden"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 6H21M3 12H21M3 18H21" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <button className="hidden md:flex items-center justify-center bg-black text-white text-sm font-medium tracking-[-0.04em] px-5 py-3 rounded-full whitespace-nowrap">
            Let&apos;s talk
          </button>
        </nav>

        {/* Mobile menu overlay */}
        {menuOpen && (
          <div className="fixed inset-0 z-[100] bg-white flex flex-col px-4 py-6">
            <div className="flex items-center justify-between mb-12">
              <span className="font-semibold text-base tracking-[-0.04em] capitalize text-black">
                H.Studio
              </span>
              <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6L18 18M18 6L6 18" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-8 font-semibold text-2xl tracking-[-0.04em] capitalize text-black">
              <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
              <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
              <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
              <a href="#news" onClick={() => setMenuOpen(false)}>News</a>
              <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
            </div>
          </div>
        )}

        {/* Desktop: eyebrow + name + description — absolutely positioned */}
        <p className="hidden md:block absolute font-mono text-sm text-white mix-blend-overlay uppercase top-[41%] left-8">
          [ Hello i&apos;m ]
        </p>
        <h1
          className="hidden md:block absolute font-medium text-white mix-blend-overlay tracking-[-0.07em] capitalize whitespace-nowrap leading-none top-[45%] left-0 right-0 text-center"
          style={{ fontSize: "clamp(100px, 16vw, 230px)" }}
        >
          Harvey Specter
        </h1>
        <div className="hidden md:flex absolute flex-col gap-[17px] bottom-8 right-8 w-[294px]">
          <p className="font-bold italic text-sm text-[#1f1f1f] tracking-[-0.04em] uppercase leading-[1.1]">
            H.Studio is a{" "}
            <span className="font-normal not-italic">full-service</span>
            {" "}creative studio creating beautiful digital experiences and products. We are an{" "}
            <span className="font-normal not-italic">award winning</span>
            {" "}desing and art group specializing in branding, web design and engineering.
          </p>
          <button className="self-start bg-black text-white text-sm font-medium tracking-[-0.04em] px-4 py-3 rounded-full">
            Let&apos;s talk
          </button>
        </div>

        {/* Mobile: single flow container — eyebrow → H1 → fixed gap → description */}
        <div className="md:hidden absolute inset-x-4 top-[44%] flex flex-col">
          <p className="font-mono text-sm text-white mix-blend-overlay uppercase mb-2 text-center">
            [ Hello i&apos;m ]
          </p>
          <h1 className="text-[80px] leading-none font-medium text-white mix-blend-overlay tracking-[-0.07em] text-center capitalize">
            Harvey<br />Specter
          </h1>
          <div className="flex flex-col gap-4 mt-10">
            <p className="font-bold italic text-sm text-[#1f1f1f] tracking-[-0.04em] uppercase leading-[1.1]">
              H.Studio is a{" "}
              <span className="font-normal not-italic">full-service</span>
              {" "}creative studio creating beautiful digital experiences and products. We are an{" "}
              <span className="font-normal not-italic">award winning</span>
              {" "}desing and art group specializing in branding, web design and engineering.
            </p>
            <button className="self-start bg-black text-white text-sm font-medium tracking-[-0.04em] px-4 py-3 rounded-full">
              Let&apos;s talk
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
