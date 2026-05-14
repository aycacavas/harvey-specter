"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

export default function CTAButton({
  variant = "solid",
  className = "",
  children,
  href,
  onClick,
}: {
  variant?: "solid" | "outline";
  className?: string;
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const aRef = useRef<HTMLAnchorElement>(null);
  const tailRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const el: HTMLElement | null = href !== undefined ? aRef.current : btnRef.current;
    const tail = tailRef.current;
    if (!wrapper || !el || !tail) return;

    gsap.set(tail, { scaleY: 0, transformOrigin: "top center", opacity: 0 });

    // Clear any inline styles from the previous variant before applying new ones
    gsap.set(el, { clearProps: "backgroundColor,color" });

    if (variant === "outline") {
      gsap.set(el, { backgroundColor: "rgba(255,255,255,0)" });
    }

    const onEnter = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || window.innerWidth < 768) return;
      gsap.killTweensOf([el, tail]);
      gsap.to(tail, {
        scaleY: 1,
        opacity: 1,
        duration: 0.3,
        delay: 0.08,
        ease: "power2.out",
        transformOrigin: "top center",
      });
      if (variant === "outline") {
        gsap.to(el, { backgroundColor: "#ffffff", color: "#000000", duration: 0.3 });
      }
    };

    const onLeave = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || window.innerWidth < 768) return;
      gsap.killTweensOf([el, tail]);
      gsap.to(tail, {
        scaleY: 0,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        transformOrigin: "top center",
      });
      if (variant === "outline") {
        gsap.to(el, { backgroundColor: "rgba(255,255,255,0)", color: "#ffffff", duration: 0.25 });
      }
    };

    wrapper.addEventListener("pointerenter", onEnter as EventListener);
    wrapper.addEventListener("pointerleave", onLeave as EventListener);
    return () => {
      wrapper.removeEventListener("pointerenter", onEnter as EventListener);
      wrapper.removeEventListener("pointerleave", onLeave as EventListener);
    };
  }, [href, variant]);

  // Tail color matches the button fill: black for solid, white for outline
  const tailColor = variant === "solid" ? "#000000" : "#ffffff";

  const pillClasses = [
    "relative inline-flex items-center justify-center",
    "text-sm font-medium tracking-[-0.04em] leading-none whitespace-nowrap",
    "px-6 py-3 rounded-full border",
    variant === "solid"
      ? "bg-black border-black text-white"
      : "bg-transparent border-white text-white",
  ].join(" ");

  // The tail is a downward-pointing triangle anchored just below the button,
  // offset to the right (~65% from left) to match the speech-bubble reference.
  const tail = (
    <span
      ref={tailRef}
      className="absolute pointer-events-none"
      style={{
        bottom: 0,
        left: "62%",
        width: 14,
        height: 13,
        backgroundColor: tailColor,
        clipPath: "polygon(0 0, 100% 0, 82% 100%)",
        opacity: 0,
      }}
      aria-hidden
    />
  );

  // pb-[11px] reserves visual space for the tail so it doesn't overlap siblings
  const wrapperClass = `relative inline-block pb-[11px] ${className}`;

  if (href !== undefined) {
    return (
      <div ref={wrapperRef} className={wrapperClass}>
        <a ref={aRef} href={href} className={pillClasses}>
          {children}
        </a>
        {tail}
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className={wrapperClass}>
      <button ref={btnRef} onClick={onClick} className={pillClasses}>
        {children}
      </button>
      {tail}
    </div>
  );
}
