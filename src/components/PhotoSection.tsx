import Image from "next/image";

export default function PhotoSection() {
  return (
    <section className="relative w-full h-[700px] md:h-[900px]">
      <Image
        src="/photo-section.jpg"
        alt="Photographer at work"
        fill
        className="object-cover object-[60%_center] md:object-center"
      />
    </section>
  );
}
