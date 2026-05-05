import Image from "next/image";

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
    // self-start prevents the link from stretching to full card width in the flex-col parent
    <a
      href="#"
      className="self-start flex items-center gap-[10px] border-b border-black py-1"
    >
      <span className="text-[14px] font-medium text-black tracking-[-0.04em]">
        Read more
      </span>
      <span className="flex items-center justify-center size-[18px] -rotate-90">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/arrow-ne.svg" alt="" className="size-full" />
      </span>
    </a>
  );
}

function ArticleCard({ image, description }: { image: string; description: string }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full h-[469px] overflow-hidden">
        <Image src={image} alt="" fill className="object-cover" />
      </div>
      <p className="text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
        {description}
      </p>
      <ReadMoreLink />
    </div>
  );
}

export default function LatestNewsSection() {
  return (
    <section id="news" className="bg-[#f3f3f3] overflow-hidden">

      {/* ── Desktop ───────────────────────────────────────────────── */}
      {/*
        gap-16 guarantees a fixed minimum gap between the rotated heading and
        the cards on all desktop sizes. cards section uses flex-1 so cards
        scale instead of overflowing on smaller breakpoints.
      */}
      <div className="hidden md:flex items-start px-8 py-[120px] gap-16">

        {/* Rotated heading — self-stretch so centering tracks the section height */}
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

        {/*
          items-start: dividers align at the TOP of cards 1 & 3 (not at the bottom),
          card 2 is pushed down with pt-[120px] for the stagger effect.
          Dividers use self-stretch to span from card tops down to the bottom of card 2.
        */}
        {/*
          Fixed w-[430px] cards intentionally exceed the 1440 px viewport
          so the 3rd card is ~60 % visible, hinting at horizontal scroll.
          overflow-hidden on <section> clips cleanly at the viewport edge.
        */}
        <div className="flex items-start">
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

      {/* ── Mobile ────────────────────────────────────────────────── */}
      <div className="md:hidden px-4 py-16 flex flex-col gap-8">
        {/* Manual breaks ensure exactly 3 lines at 32 px */}
        <p className="font-light text-[48px] text-black uppercase tracking-[-0.08em] leading-[0.86]">
          Keep up with my
          <br />
          latest news &amp;
          <br />
          achievements
        </p>

        {/*
          w-[70vw]: first card ≈ 75 % of available width.
          Second card starts at ~(16 + 70vw + 16)px, peeking ~25 % on screen.
        */}
        <div className="flex gap-4 overflow-x-auto -mx-4 px-4 pb-4">
          {articles.map((article, i) => (
            <div key={i} className="w-[70vw] shrink-0 flex flex-col gap-4">
              <div className="relative w-full h-[398px] overflow-hidden">
                <Image src={article.image} alt="" fill className="object-cover" />
              </div>
              <p className="text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
                {article.description}
              </p>
              <ReadMoreLink />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
