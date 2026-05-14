"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

const articles = [
  {
    image: "/news-1.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    image: "/news-2.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    image: "/news-3.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

function ReadMoreLink() {
  return (
    <a
      href="#"
      className="self-start flex items-center gap-[10px] border-b border-black py-1"
    >
      <span className="text-[14px] font-medium text-black tracking-[-0.04em]">
        Read more
      </span>
      <span data-read-more-arrow className="flex items-center justify-center size-[18px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/arrow-ne.svg" alt="" className="size-full" />
      </span>
    </a>
  );
}

function ArticleCard({ image, description }: { image: string; description: string }) {
  return (
    <div className="flex flex-col gap-4">
      <div data-news-img className="relative w-full h-[469px] overflow-hidden">
        <div data-news-img-inner className="absolute inset-0">
          <Image src={image} alt="" fill className="object-cover" />
        </div>
      </div>
      <p className="text-base md:text-[18px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
        {description}
      </p>
      <ReadMoreLink />
    </div>
  );
}

export default function LatestNewsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = document.getElementById("news");
    if (!section) return;

    const inners = Array.from(
      section.querySelectorAll<HTMLElement>("[data-news-img-inner]")
    );
    gsap.set(inners, { scale: 1.12, filter: "brightness(0.82)", y: 5 });

    type Listener = { el: HTMLElement; enter: EventListener; leave: EventListener };
    const listeners: Listener[] = [];

    inners.forEach((inner) => {
      const wrapper = inner.closest<HTMLElement>("[data-news-img]");
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

    // ── Read more arrow hover ─────────────────────────────────────────────
    const arrowSpans = Array.from(
      section.querySelectorAll<HTMLElement>("[data-read-more-arrow]")
    );

    arrowSpans.forEach((span) => {
      const link = span.closest<HTMLElement>("a");
      if (!link) return;

      gsap.set(span, { rotation: -90 });

      const onEnter = (e: Event) => {
        if ((e as PointerEvent).pointerType !== "mouse" || window.innerWidth < 768) return;
        gsap.killTweensOf(span);
        gsap.to(span, { rotation: -45, duration: 0.45, ease: "power2.out" });
      };
      const onLeave = (e: Event) => {
        if ((e as PointerEvent).pointerType !== "mouse" || window.innerWidth < 768) return;
        gsap.killTweensOf(span);
        gsap.to(span, { rotation: -90, duration: 0.4, ease: "power2.inOut" });
      };

      link.addEventListener("pointerenter", onEnter);
      link.addEventListener("pointerleave", onLeave);
      listeners.push({ el: link, enter: onEnter, leave: onLeave });
    });

    return () => {
      gsap.killTweensOf(inners);
      gsap.killTweensOf(arrowSpans);
      listeners.forEach(({ el, enter, leave }) => {
        el.removeEventListener("pointerenter", enter);
        el.removeEventListener("pointerleave", leave);
      });
    };
  }, []);

  return (
    <section id="news" className="bg-[#f3f3f3]">

      {/* ── Desktop ───────────────────────────────────────────────── */}
      <div className="hidden md:flex items-start px-8 py-[120px] gap-16">

        <div className="w-[110px] self-stretch shrink-0 flex items-center justify-center">
          <div className="-rotate-90 whitespace-nowrap">
            <p className="font-light text-[64px] text-black uppercase tracking-[-0.08em] leading-[0.86]">
              Keep up with my latest
            </p>
            <p className="font-light text-[64px] text-black uppercase tracking-[-0.08em] leading-[0.86]">
              news &amp; achievements
            </p>
          </div>
        </div>

        <div className="flex-1 min-w-0 overflow-x-auto no-scrollbar">
        <div className="flex items-start" style={{ minWidth: "max-content" }}>
          <div className="w-[430px] shrink-0">
            <ArticleCard image={articles[0].image} description={articles[0].description} />
          </div>

          <div className="w-px bg-[#d0d0d0] self-stretch mx-6 shrink-0" />

          <div className="w-[430px] shrink-0 pt-[120px]">
            <ArticleCard image={articles[1].image} description={articles[1].description} />
          </div>

          <div className="w-px bg-[#d0d0d0] self-stretch mx-6 shrink-0" />

          <div className="w-[430px] shrink-0">
            <ArticleCard image={articles[2].image} description={articles[2].description} />
          </div>
        </div>
        </div>
      </div>

      {/* ── Mobile slider ─────────────────────────────────────────── */}
      <div className="md:hidden px-4 py-16 flex flex-col gap-8">
        <p className="font-light text-[48px] text-black uppercase tracking-[-0.08em] leading-[0.86]">
          Keep up with my
          <br />
          latest news &amp;
          <br />
          achievements
        </p>

        <div className="flex flex-col gap-6">
          {/* Track */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {articles.map((article, i) => (
                <div key={i} className="w-full shrink-0">
                  <div className="flex flex-col gap-4">
                    <div data-news-img className="relative w-full h-[300px] overflow-hidden">
                      <div data-news-img-inner className="absolute inset-0">
                        <Image src={article.image} alt="" fill className="object-cover" />
                      </div>
                    </div>
                    <p className="text-base md:text-[18px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
                      {article.description}
                    </p>
                    <ReadMoreLink />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2">
            {articles.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to article ${i + 1}`}
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
