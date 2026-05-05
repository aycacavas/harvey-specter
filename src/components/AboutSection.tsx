export default function AboutSection() {
  return (
    <section id="about" className="px-4 md:px-8 py-12 md:py-[120px]">
      <div className="flex flex-col gap-6">

        {/* Label + divider */}
        <div className="flex flex-col gap-3">
          <p className="font-mono text-sm text-[#1f1f1f] uppercase text-right">
            [ 8+ years in industry ]
          </p>
          <div className="w-full h-px bg-[#1f1f1f]" />
        </div>

        {/* Desktop — staggered cascade */}
        <div className="hidden md:flex flex-col gap-2">
          <div className="flex items-start gap-3">
            <p className="text-[96px] font-light leading-[0.84] tracking-[-0.08em] text-black uppercase whitespace-nowrap">
              A creative director&nbsp;&nbsp;&nbsp;/
            </p>
            <span className="font-mono text-sm text-[#1f1f1f] mt-2">001</span>
          </div>
          <p className="pl-[214px] text-[96px] font-light leading-[0.84] tracking-[-0.08em] text-black uppercase whitespace-nowrap">
            Photographer
          </p>
          <p className="pl-[610px] text-[96px] font-light leading-[0.84] tracking-[-0.08em] text-black uppercase whitespace-nowrap">
            Born{" "}
            <span style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", fontWeight: 400, textTransform: "none" }}>
              &amp;
            </span>{" "}
            raised
          </p>
          <p className="text-[96px] font-light leading-[0.84] tracking-[-0.08em] text-black uppercase whitespace-nowrap">
            on the south side
          </p>
          <div className="pl-[606px] flex items-end gap-6">
            <p className="text-[96px] font-light leading-[0.84] tracking-[-0.08em] text-black uppercase whitespace-nowrap">
              of chicago.
            </p>
            <span className="font-mono text-sm text-[#1f1f1f] mb-3 whitespace-nowrap">
              [ CREATIVE FREELANCER ]
            </span>
          </div>
        </div>

        {/* Mobile — centered stack */}
        <div className="md:hidden flex flex-col gap-2 items-center overflow-hidden">
          <span className="font-mono text-sm text-[#1f1f1f] mb-1">001</span>
          <p className="text-[32px] font-light leading-[0.84] tracking-[-0.08em] text-black uppercase whitespace-nowrap">
            A creative director&nbsp;&nbsp;&nbsp;/
          </p>
          <p className="text-[32px] font-light leading-[0.84] tracking-[-0.08em] text-black uppercase whitespace-nowrap">
            Photographer
          </p>
          <p className="text-[32px] font-light leading-[0.84] tracking-[-0.08em] text-black uppercase whitespace-nowrap">
            Born{" "}
            <span style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", fontWeight: 400, textTransform: "none" }}>
              &amp;
            </span>{" "}
            raised
          </p>
          <p className="text-[32px] font-light leading-[0.84] tracking-[-0.08em] text-black uppercase whitespace-nowrap">
            on the south side
          </p>
          <p className="text-[32px] font-light leading-[0.84] tracking-[-0.08em] text-black uppercase whitespace-nowrap">
            of chicago.
          </p>
          <span className="font-mono text-sm text-[#1f1f1f] mt-1">[ CREATIVE FREELANCER ]</span>
        </div>

      </div>
    </section>
  );
}
