const testimonials = [
  {
    logo: "/testimonial-logo-2.svg",
    logoW: 143,
    logoH: 19,
    quote:
      "A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.",
    name: "Marko Stojković",
    rotate: "-6.85deg",
    left: "7%",
    top: "100px",
    zIndex: 20,
  },
  {
    logo: "/testimonial-logo-1.svg",
    logoW: 138,
    logoH: 19,
    quote:
      "Professional, precise, and incredibly fast at handling complex product visualizations and templates.",
    name: "Lukas Weber",
    rotate: "2.9deg",
    left: "47%",
    top: "195px",
    zIndex: 5,
  },
  {
    logo: "/testimonial-logo-3.svg",
    logoW: 109,
    logoH: 31,
    quote:
      "A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don't just make things look good; they solve business problems through visual clarity.",
    name: "Sarah Jenkins",
    rotate: "2.23deg",
    left: "21%",
    top: "553px",
    zIndex: 20,
  },
  {
    logo: "/testimonial-logo-4.svg",
    logoW: 81,
    logoH: 36,
    quote:
      "An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.",
    name: "Sofia Martínez",
    rotate: "-4.15deg",
    left: "55%",
    top: "546px",
    zIndex: 20,
  },
];

function TestimonialCard({
  logo,
  logoW,
  logoH,
  quote,
  name,
  mobile,
}: {
  logo: string;
  logoW: number;
  logoH: number;
  quote: string;
  name: string;
  mobile?: boolean;
}) {
  return (
    <div
      className={`bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4 shrink-0 ${
        mobile ? "w-[68vw] max-w-[250px] min-h-[290px]" : "w-[353px]"
      }`}
    >
      {/* Company logo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo}
        alt=""
        width={logoW}
        height={logoH}
        style={{ width: logoW, height: logoH, objectFit: "contain", objectPosition: "left" }}
      />
      {/* Quote */}
      <p className="text-[18px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">{quote}</p>
      {/* Name */}
      <p className="font-black text-[16px] text-black uppercase tracking-[-0.04em] leading-[1.1]">
        {name}
      </p>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section id="testimonials">

      {/* Desktop */}
      <div className="hidden md:flex items-center justify-center relative px-8 h-[900px] overflow-hidden">
        {/* Heading — z-[10] so Lukas Weber (z-5) sits behind it, other cards (z-20) in front */}
        <p className="relative font-medium text-[198px] text-black text-center capitalize tracking-[-0.07em] leading-[1.1] select-none pointer-events-none z-[10]">
          Testimonials
        </p>

        {/* Cards absolutely positioned over / around the heading */}
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="absolute"
            style={{
              left: t.left,
              top: t.top,
              transform: `rotate(${t.rotate})`,
              zIndex: t.zIndex,
            }}
          >
            <TestimonialCard {...t} />
          </div>
        ))}
      </div>

      {/* Mobile — no overflow-hidden on section so rotated cards aren't clipped */}
      <div className="md:hidden px-4 py-16 flex flex-col gap-8">
        <p className="font-medium text-[64px] text-black capitalize tracking-[-0.07em] leading-[0.8]">
          Testimonials
        </p>

        {/* pt-8 gives room for top rotation overflow; pl-6 prevents left clipping */}
        <div className="flex overflow-x-auto pb-4 -mx-4 pl-6 pr-4 pt-8" style={{ scrollSnapType: "x mandatory" }}>
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="relative shrink-0"
              style={{
                transform: `rotate(${t.rotate})`,
                scrollSnapAlign: "start",
                marginLeft: i === 0 ? 0 : i === 1 ? "-10px" : "16px",
                zIndex: i === 1 ? 10 : 1,
              }}
            >
              <TestimonialCard {...t} mobile />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
