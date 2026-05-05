import Image from "next/image";

const services = [
  {
    number: "[ 1 ]",
    title: "Brand Discovery",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    image: "/services-1.jpg",
  },
  {
    number: "[ 2 ]",
    title: "Web Design & Dev",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    image: "/services-2.jpg",
  },
  {
    number: "[ 3 ]",
    title: "Marketing",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    image: "/services-3.jpg",
  },
  {
    number: "[ 4 ]",
    title: "Photography",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    image: "/services-4.jpg",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="bg-black px-4 md:px-8 py-12 md:py-20 flex flex-col gap-8 md:gap-12">

      {/* Label */}
      <span className="font-mono text-sm text-white uppercase">[ Services ]</span>

      {/* [4] Deliverables header */}
      <div className="flex items-center justify-between font-light text-white uppercase tracking-[-0.08em] text-[32px] md:text-[96px] leading-none">
        <span>[4]</span>
        <span>Deliverables</span>
      </div>

      {/* Service list */}
      <div className="flex flex-col gap-12">
        {services.map((service) => (
          <div key={service.number} className="flex flex-col gap-2 md:gap-[9px]">

            {/* Number + divider */}
            <div className="flex flex-col gap-[9px]">
              <span className="font-mono text-sm text-white uppercase">{service.number}</span>
              <div className="w-full border-t border-white" />
            </div>

            {/* Title + desc + image */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 pt-1">
              <p
                className="font-bold italic text-[36px] text-white uppercase leading-[1.1] tracking-[-0.04em] whitespace-nowrap shrink-0"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {service.title}
              </p>

              <div className="flex flex-col md:flex-row gap-6 md:items-start">
                <p className="text-base md:text-sm text-white leading-[1.3] tracking-[-0.04em] md:w-[393px]">
                  {service.description}
                </p>
                <div className="relative size-[151px] shrink-0 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
