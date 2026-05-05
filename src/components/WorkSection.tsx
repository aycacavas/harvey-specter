import Image from "next/image";

const projects = [
  {
    title: "Surfers Paradise",
    tags: ["Social Media", "Photography"],
    image: "/work-1.jpg",
  },
  {
    title: "Cyberpunk Caffe",
    tags: ["Social Media", "Photography"],
    image: "/work-2.jpg",
  },
  {
    title: "Agency 976",
    tags: ["Social Media", "Photography"],
    image: "/work-3.jpg",
  },
  {
    title: "Minimal Playground",
    tags: ["Social Media", "Photography"],
    image: "/work-4.jpg",
  },
];

function ArrowIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden className="-rotate-90">
      <path
        d="M18.7235 16.0531L11.1704 8.5L8.5 11.1704L16.053 18.7235H10.2263V22.5H22.5V10.2262H18.7235V16.0531Z"
        fill="black"
      />
    </svg>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="backdrop-blur-[10px] bg-white/30 px-2 py-1 rounded-full text-[#111] text-sm font-medium tracking-[-0.04em] whitespace-nowrap">
      {label}
    </span>
  );
}

function CornerBracket({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path d="M12 1H1V12" stroke="#1f1f1f" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

function ProjectCard({ title, tags, image, tall }: {
  title: string;
  tags: string[];
  image: string;
  tall?: boolean;
}) {
  return (
    <div className="flex flex-col gap-[10px]">
      <div className={`relative w-full overflow-hidden ${tall ? "h-[744px]" : "h-[699px]"}`}>
        <Image src={image} alt={title} fill className="object-cover" />
        <div className="absolute bottom-4 left-4 flex gap-3">
          {tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-black text-[36px] text-black uppercase leading-[1.1] tracking-[-0.04em]">
          {title}
        </p>
        <ArrowIcon />
      </div>
    </div>
  );
}

export default function WorkSection() {
  return (
    <section id="projects" className="px-4 md:px-8 py-12 md:py-20">

      {/* Header */}
      <div className="mb-10 md:mb-[61px]">
        {/* [ PORTFOLIO ] — mobile only, above heading */}
        <span className="md:hidden block font-mono text-sm text-[#1f1f1f] uppercase mb-4">
          [ Portfolio ]
        </span>

        <div className="flex items-start justify-between">
          <div className="flex gap-[10px] items-start">
            <div className="font-light text-black uppercase tracking-[-0.08em] leading-[0.86] text-[48px] md:text-[96px]">
              <p>Selected</p>
              <p>Work</p>
            </div>
            {/* 004 — desktop only, next to heading */}
            <span className="hidden md:inline font-mono text-sm text-[#1f1f1f] uppercase mt-1">004</span>
          </div>

          {/* mobile: 004 far right; desktop: [ portfolio ] vertical */}
          <div>
            <span className="md:hidden font-mono text-sm text-[#1f1f1f] uppercase">004</span>
            <div className="hidden md:flex items-center justify-center w-[15px] h-[110px]">
              <span
                className="font-mono text-sm text-[#1f1f1f] uppercase whitespace-nowrap"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                [ portfolio ]
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile — stacked */}
      <div className="md:hidden flex flex-col gap-10">
        {projects.map((p) => (
          <div key={p.title} className="flex flex-col gap-[10px]">
            <div className="relative w-full aspect-[3/4] overflow-hidden">
              <Image src={p.image} alt={p.title} fill className="object-cover" />
              <div className="absolute bottom-4 left-4 flex gap-3">
                {p.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-black text-[28px] text-black uppercase leading-[1.1] tracking-[-0.04em]">
                {p.title}
              </p>
              <ArrowIcon />
            </div>
          </div>
        ))}

        {/* Mobile CTA */}
        <div className="flex items-stretch gap-3 mt-4">
          <div className="flex flex-col justify-between w-4 shrink-0">
            <CornerBracket />
            <CornerBracket className="-rotate-90" />
          </div>
          <div className="flex-1 flex flex-col gap-[10px] py-3">
            <p className="italic text-base text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
              Discover how my creativity transforms ideas into impactful digital experiences — schedule a call with me to get started.
            </p>
            <button className="self-start bg-black text-white text-sm font-medium tracking-[-0.04em] px-4 py-3 rounded-full">
              Let&apos;s talk
            </button>
          </div>
          <div className="flex flex-col justify-between w-4 shrink-0">
            <CornerBracket className="rotate-90" />
            <CornerBracket className="rotate-180" />
          </div>
        </div>
      </div>

      {/* Desktop — two-column masonry */}
      <div className="hidden md:flex gap-6 items-end">
        {/* Left column */}
        <div className="flex-1 flex flex-col">
          <ProjectCard {...projects[0]} tall />
          <div className="mt-[117px]">
            <ProjectCard {...projects[1]} />
          </div>

          {/* Desktop CTA */}
          <div className="flex items-stretch gap-3 mt-[117px] w-[465px]">
            <div className="flex flex-col justify-between w-6 shrink-0">
              <CornerBracket />
              <CornerBracket className="-rotate-90" />
            </div>
            <div className="flex-1 flex flex-col gap-[10px] py-3">
              <p className="italic text-sm text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
                Discover how my creativity transforms ideas into impactful digital experiences — schedule a call with me to get started.
              </p>
              <button className="self-start bg-black text-white text-sm font-medium tracking-[-0.04em] px-4 py-3 rounded-full">
                Let&apos;s talk
              </button>
            </div>
            <div className="flex flex-col justify-between w-6 shrink-0">
              <CornerBracket className="rotate-90" />
              <CornerBracket className="rotate-180" />
            </div>
          </div>
        </div>

        {/* Right column — offset down */}
        <div className="flex-1 flex flex-col pt-[240px]">
          <ProjectCard {...projects[2]} />
          <div className="mt-[117px]">
            <ProjectCard {...projects[3]} tall />
          </div>
        </div>
      </div>

    </section>
  );
}
