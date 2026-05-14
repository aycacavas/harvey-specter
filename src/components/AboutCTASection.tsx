import CTAButton from "./CTAButton";

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

export default function AboutCTASection() {
  return (
    <section className="px-4 md:px-8 py-20 md:py-32">
      <div className="max-w-[600px] mx-auto">
        <div className="flex items-stretch gap-3">
          {/* Left brackets */}
          <div className="flex flex-col justify-between w-4 shrink-0">
            <CornerBracket />
            <CornerBracket className="-rotate-90" />
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col gap-6 py-3">
            <p className="italic text-base md:text-[18px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
              Ready to start a project? Let&apos;s talk about your ideas and build
              something you&apos;ll love.
            </p>
            <CTAButton href="#" className="self-start">
              Let&apos;s talk
            </CTAButton>
          </div>

          {/* Right brackets */}
          <div className="flex flex-col justify-between w-4 shrink-0">
            <CornerBracket className="rotate-90" />
            <CornerBracket className="rotate-180" />
          </div>
        </div>
      </div>
    </section>
  );
}
