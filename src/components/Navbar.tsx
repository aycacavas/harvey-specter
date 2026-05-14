"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import CTAButton from "./CTAButton";

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const navBgRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navLinkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const hamburgerRef = useRef<SVGPathElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const menuTl = useRef<gsap.core.Timeline | null>(null);
  const lastTheme = useRef("");

  // Initial overlay position — before first paint so there's no flash
  useLayoutEffect(() => {
    gsap.set(overlayRef.current, { clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)" });
    return () => { menuTl.current?.kill(); };
  }, []);

  // Desktop nav link hover — sliding underline (real pointer devices only)
  useEffect(() => {
    const ctx = gsap.context(() => {
      navLinkRefs.current.forEach((link) => {
        if (!link) return;
        const line = link.querySelector("[data-line]") as HTMLElement;
        link.addEventListener("pointerenter", (e: Event) => {
          if ((e as PointerEvent).pointerType !== "mouse") return;
          gsap.killTweensOf(line);
          gsap.fromTo(line, { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.35, ease: "power3.out" });
        });
        link.addEventListener("pointerleave", (e: Event) => {
          if ((e as PointerEvent).pointerType !== "mouse") return;
          gsap.killTweensOf(line);
          gsap.to(line, { scaleX: 0, transformOrigin: "right center", duration: 0.3, ease: "power3.in" });
        });
      });
    });
    return () => ctx.revert();
  }, []);

  // Sticky background + color theme switching per section
  useEffect(() => {
    const NAV_H = 72;

    const textEls = [logoRef.current, ...navLinkRefs.current.filter(Boolean)];
    const lineEls = navLinkRefs.current
      .filter(Boolean)
      .map((a) => a!.querySelector("[data-line]") as HTMLElement)
      .filter(Boolean);

    // setIsDark drives CTAButton variant; GSAP handles everything else
    const apply = (theme: string) => {
      if (theme === lastTheme.current) return;
      lastTheme.current = theme;
      const dark = theme === "fullDark" || theme === "dark";
      setIsDark(dark);
      if (theme === "fullDark") {
        gsap.to(navBgRef.current, { backgroundColor: "#000000", duration: 0.4 });
      } else if (theme === "dark") {
        gsap.to(navBgRef.current, { backgroundColor: "rgba(0,0,0,0.6)", duration: 0.4 });
      } else if (theme === "light") {
        gsap.to(navBgRef.current, { backgroundColor: "rgba(255,255,255,0.5)", duration: 0.4 });
      } else {
        gsap.to(navBgRef.current, { backgroundColor: "rgba(255,255,255,0)", duration: 0.4 });
      }
      const color = dark ? "#ffffff" : "#000000";
      gsap.to(textEls, { color, duration: 0.3 });
      gsap.to(lineEls, { backgroundColor: color, duration: 0.3 });
      if (hamburgerRef.current) gsap.to(hamburgerRef.current, { attr: { stroke: color }, duration: 0.3 });
    };

    // All comparisons are viewport-relative (getBoundingClientRect().top vs NAV_H).
    // This avoids floating-point drift from adding/subtracting window.scrollY.
    const check = () => {
      const footerEl = document.querySelector("footer");
      const servicesEl = document.getElementById("services");
      const aboutEl = document.getElementById("about");
      if (!footerEl || !servicesEl || !aboutEl) return;

      const footerTop = footerEl.getBoundingClientRect().top;
      const servicesTop = servicesEl.getBoundingClientRect().top;
      const servicesBottom = servicesEl.getBoundingClientRect().bottom;
      const aboutTop = aboutEl.getBoundingClientRect().top;

      // +1 buffer absorbs sub-pixel rounding (e.g. footerTop = 72.3 at max scroll)
      if (footerTop <= NAV_H + 1) apply("fullDark");
      else if (servicesTop <= NAV_H && servicesBottom > NAV_H) apply("dark");
      else if (aboutTop <= NAV_H) apply("light");
      else apply("clear");
    };

    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(check);
    };

    // ResizeObserver catches layout shifts from async content (WorkSection Sanity fetch).
    // Reset lastTheme so the apply guard doesn't suppress the re-evaluation.
    const ro = new ResizeObserver(() => {
      lastTheme.current = "";
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(check);
    });
    ro.observe(document.body);

    window.addEventListener("scroll", onScroll, { passive: true });
    check();

    return () => {
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // ── Open / close mobile menu ──────────────────────────────────────────────
  const openMenu = () => {
    setMenuOpen(true);
    menuTl.current?.kill();
    const items = menuItemRefs.current.filter(Boolean);
    const tl = gsap.timeline();
    menuTl.current = tl;

    tl.to(overlayRef.current, { clipPath: "polygon(0 0, 100% 0, 100% 110%, 0 88%)", duration: 0.55, ease: "power3.in" })
      .to(overlayRef.current, { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 0.2, ease: "power2.out" })
      .fromTo(
        items,
        { y: 52, rotation: 4, opacity: 0 },
        { y: 0, rotation: 0, opacity: 1, stagger: 0.09, duration: 0.55, ease: "back.out(1.4)", transformOrigin: "left center" },
        "-=0.5"
      );
  };

  const closeMenu = () => {
    menuTl.current?.kill();
    const items = [...menuItemRefs.current.filter(Boolean)].reverse();
    const tl = gsap.timeline({ onComplete: () => setMenuOpen(false) });
    menuTl.current = tl;

    tl.to(items, { y: -28, opacity: 0, stagger: 0.04, duration: 0.28, ease: "power2.in" })
      .to(overlayRef.current, { clipPath: "polygon(0 0, 100% 0, 100% 12%, 0 0%)", duration: 0.38, ease: "power3.in" }, "-=0.08")
      .to(overlayRef.current, { clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)", duration: 0.15, ease: "power2.out" });
  };

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50">
        {/* Frosted background — GSAP animates backgroundColor on scroll */}
        <div
          ref={navBgRef}
          className="absolute inset-0 backdrop-blur-md pointer-events-none"
          style={{ backgroundColor: "rgba(255,255,255,0)" }}
        />

        <div className="relative flex items-center justify-between px-4 md:px-8 py-6">
          <a
            ref={logoRef}
            href="/"
            className="font-semibold text-base tracking-[-0.04em] capitalize"
            style={{ color: "#000000" }}
          >
            H.Studio
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-5 lg:gap-10 xl:gap-14 font-semibold text-base tracking-[-0.04em] capitalize">
            {NAV_LINKS.map(({ label, href }, i) => (
              <a
                key={label}
                href={href}
                ref={(el) => { navLinkRefs.current[i] = el; }}
                className="relative py-0.5"
                style={{ color: "#000000" }}
              >
                {label}
                <span
                  data-line
                  className="absolute left-0 -bottom-0.5 h-[2px] w-full block"
                  style={{ transform: "scaleX(0)", backgroundColor: "#000000" }}
                />
              </a>
            ))}
          </div>

          {/* Hamburger */}
          <button className="md:hidden" aria-label="Open menu" onClick={openMenu}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                ref={hamburgerRef}
                d="M3 6H21M3 12H21M3 18H21"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Desktop CTA — variant swaps via isDark state; useLayoutEffect in CTAButton prevents flash */}
          <div className="hidden md:flex">
            <CTAButton variant={isDark ? "outline" : "solid"} className="whitespace-nowrap">Let&apos;s talk</CTAButton>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[100] bg-black flex flex-col px-4 py-6"
        style={{ pointerEvents: menuOpen ? "auto" : "none" }}
      >
        <div className="flex items-center justify-between">
          <span className="font-semibold text-base tracking-[-0.04em] capitalize text-white">
            H.Studio
          </span>
          <button onClick={closeMenu} aria-label="Close menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 6L18 18M18 6L6 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-8 font-semibold text-2xl tracking-[-0.04em] capitalize text-white text-center">
          {NAV_LINKS.map(({ label, href }, i) => (
            <a
              key={label}
              href={href}
              ref={(el) => { menuItemRefs.current[i] = el; }}
              onClick={closeMenu}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
