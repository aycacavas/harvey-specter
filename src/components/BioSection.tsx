import Image from "next/image";

function CornerBracket({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={className}
    >
      <path d="M12 1H1V12" stroke="#1f1f1f" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

function BracketedText() {
  return (
    <div className="flex items-stretch gap-3">
      <div className="flex flex-col justify-between w-4 shrink-0">
        <CornerBracket />
        <CornerBracket className="-rotate-90" />
      </div>
      <p className="flex-1 text-base md:text-sm text-[#1f1f1f] leading-[1.3] tracking-[-0.04em] py-3">
        Placeholder paragraph one. This is where you introduce yourself — your background, your
        passion for your craft, and what drives you creatively. Two to three sentences work best
        here. Placeholder paragraph two. Here you can describe your technical approach, how you
        collaborate with clients, or what sets your work apart from others in your field.
      </p>
      <div className="flex flex-col justify-between w-4 shrink-0">
        <CornerBracket className="rotate-90" />
        <CornerBracket className="rotate-180" />
      </div>
    </div>
  );
}

export default function BioSection() {
  return (
    <section id="bio" className="px-4 md:px-8 py-12 md:py-20">

      {/* Desktop */}
      <div className="hidden md:flex items-start justify-between">
        <span className="font-mono text-sm text-[#1f1f1f] uppercase whitespace-nowrap">
          [ About ]
        </span>

        <div className="flex items-end gap-8 flex-1 pl-8">
          <div className="flex-1 min-w-0">
            <BracketedText />
          </div>

          <div className="flex flex-col gap-6 shrink-0">
            <span className="font-mono text-sm text-[#1f1f1f] uppercase">002</span>
            <div className="relative w-[436px] h-[614px]">
              <Image
                src="/about-portrait.jpg"
                alt="Portrait"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex flex-col gap-5">
        <span className="font-mono text-sm text-[#1f1f1f] uppercase">002</span>
        <span className="font-mono text-sm text-[#1f1f1f] uppercase">[ About ]</span>
        <BracketedText />
        <div className="relative w-full aspect-[422/594]">
          <Image
            src="/about-portrait.jpg"
            alt="Portrait"
            fill
            className="object-cover"
          />
        </div>
      </div>

    </section>
  );
}
