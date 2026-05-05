export default function Footer() {
  return (
    <footer className="bg-black">

      {/* ── Desktop ───────────────────────────────────────────────── */}
      <div className="hidden md:flex flex-col gap-[8.5vw] pt-12 px-8">

        {/* Top row: CTA · social centre · social right + divider */}
        <div className="flex flex-col gap-12">
          <div className="flex items-start justify-between">

            {/* CTA */}
            <div className="flex flex-col gap-3 w-[298px]">
              <p className="font-light italic text-[24px] text-white uppercase tracking-[-0.04em] leading-[1.1]">
                Have a{" "}
                <span className="font-black not-italic">project</span>
                {" "}in mind?
              </p>
              <a
                href="#"
                className="self-start border border-white rounded-full px-4 py-3 text-[14px] font-medium text-white tracking-[-0.04em] leading-none"
              >
                Let&apos;s talk
              </a>
            </div>

            {/* Social centre */}
            <div className="w-[298px] text-center text-[18px] text-white uppercase tracking-[-0.04em] leading-[1.1]">
              <p>Facebook</p>
              <p>Instagram</p>
            </div>

            {/* Social right */}
            <div className="w-[298px] text-right text-[18px] text-white uppercase tracking-[-0.04em] leading-[1.1]">
              <p>X.com</p>
              <p>Linkedin</p>
            </div>
          </div>

          {/* Horizontal rule */}
          <div className="w-full h-px bg-white" />
        </div>

        {/* Bottom section: legal links stacked above H.Studio */}
        <div className="flex flex-col gap-6">

          {/* Legal links — right-aligned, never overlaps the logo */}
          <div className="flex justify-end gap-8 items-center text-[12px] text-white uppercase tracking-[-0.04em] leading-[1.1] whitespace-nowrap">
            <a href="#" className="underline">Licences</a>
            <a href="#" className="underline">Privacy policy</a>
          </div>

          {/* H.Studio — overflow-hidden clips horizontal bleed */}
          <div className="relative h-[20vw] overflow-hidden">
            {/* Rotated side label — z-10 keeps it above the logotype */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[15px] h-[160px] flex items-center justify-center z-10">
              <span className="-rotate-90 whitespace-nowrap font-mono text-[14px] text-white uppercase leading-[1.1]">
                [ Coded By Claude ]
              </span>
            </div>
            {/* Giant logotype — top-[3vw] gives glyph-bleed room above the i dot */}
            <p className="absolute top-[3vw] left-1/2 -translate-x-1/2 font-semibold text-[20vw] text-white capitalize tracking-[-0.06em] leading-[0.8] whitespace-nowrap select-none">
              H.Studio
            </p>
          </div>
        </div>
      </div>

      {/* ── Mobile ────────────────────────────────────────────────── */}
      <div className="md:hidden flex flex-col gap-12 pt-12 px-4">

        {/* CTA + social links + divider */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <p className="font-light italic text-[24px] text-white uppercase tracking-[-0.04em] leading-[1.1]">
              Have a{" "}
              <span className="font-black not-italic">project</span>
              {" "}in mind?
            </p>
            <a
              href="#"
              className="self-start border border-white rounded-full px-4 py-3 text-[14px] font-medium text-white tracking-[-0.04em] leading-none"
            >
              Let&apos;s talk
            </a>
          </div>

          {/* Social links — vertical list on mobile */}
          <div className="flex flex-col gap-4 text-[18px] text-white uppercase tracking-[-0.04em] leading-[1.1]">
            <p>Facebook</p>
            <p>Instagram</p>
            <p>X.com</p>
            <p>Linkedin</p>
          </div>

          <div className="mt-2 w-full h-px bg-white" />
        </div>

        {/* Bottom: legal + coded-by + H.Studio */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-8 justify-center pb-8 text-[12px] text-white uppercase tracking-[-0.04em] leading-[1.1]">
            <a href="#" className="underline">Licences</a>
            <a href="#" className="underline">Privacy policy</a>
          </div>

          <div className="overflow-hidden -mr-4">
            <p className="font-mono text-[14px] text-white uppercase leading-[1.1] mb-3">
              [ Coded By Claude ]
            </p>
            {/* Text overflows and is clipped by overflow-hidden above */}
            <p className="font-semibold text-[120px] text-white capitalize tracking-[-0.06em] leading-[0.8] whitespace-nowrap select-none">
              H.Studio
            </p>
          </div>
        </div>
      </div>

    </footer>
  );
}
