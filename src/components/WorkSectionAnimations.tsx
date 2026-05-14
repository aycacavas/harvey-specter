"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function WorkSectionAnimations() {
  useEffect(() => {
    const section = document.getElementById("projects");
    if (!section) return;

    // ── Image hover (identical params to ServicesSection) ─────────────────
    const inners = Array.from(
      section.querySelectorAll<HTMLElement>("[data-work-img-inner]")
    );
    gsap.set(inners, { scale: 1.12, filter: "brightness(0.82)", y: 5 });

    type Listener = { el: HTMLElement; enter: EventListener; leave: EventListener };
    const listeners: Listener[] = [];

    inners.forEach((inner) => {
      const wrapper = inner.closest<HTMLElement>("[data-work-img]");
      if (!wrapper) return;

      const onEnter = (e: Event) => {
        if ((e as PointerEvent).pointerType !== "mouse") return;
        gsap.killTweensOf(inner);
        gsap.to(inner, { scale: 1, filter: "brightness(1.06)", y: 0, duration: 0.9, ease: "power2.out" });
      };
      const onLeave = (e: Event) => {
        if ((e as PointerEvent).pointerType !== "mouse") return;
        gsap.killTweensOf(inner);
        gsap.to(inner, { scale: 1.12, filter: "brightness(0.82)", y: 5, duration: 0.9, ease: "power2.inOut" });
      };

      wrapper.addEventListener("pointerenter", onEnter);
      wrapper.addEventListener("pointerleave", onLeave);
      listeners.push({ el: wrapper, enter: onEnter, leave: onLeave });
    });

    // ── Arrow hover (desktop / pointer devices only) ───────────────────────
    // SVG natural direction is ↘. GSAP rotation -90 → ↗ (default), -45 → → (hover).
    const arrowWrappers = Array.from(
      section.querySelectorAll<HTMLElement>("[data-work-arrow]")
    );

    arrowWrappers.forEach((wrapper) => {
      const svg = wrapper.querySelector<SVGElement>("svg");
      if (!svg) return;

      gsap.set(svg, { rotation: -90 });

      const onEnter = (e: Event) => {
        if ((e as PointerEvent).pointerType !== "mouse" || window.innerWidth < 768) return;
        gsap.killTweensOf(svg);
        gsap.to(svg, { rotation: -45, duration: 0.45, ease: "power2.out" });
      };
      const onLeave = (e: Event) => {
        if ((e as PointerEvent).pointerType !== "mouse" || window.innerWidth < 768) return;
        gsap.killTweensOf(svg);
        gsap.to(svg, { rotation: -90, duration: 0.4, ease: "power2.inOut" });
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

  return null;
}
