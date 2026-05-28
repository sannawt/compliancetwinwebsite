import Image from "next/image";

export function HeroHourglass() {
  return (
    <div
      className="ct-hourglassHero shrink-0"
      tabIndex={0}
      role="img"
      aria-label="Hourglass"
    >
      <Image
        src="/hero/hourglass.png"
        alt=""
        width={480}
        height={480}
        priority
        className="ct-hourglass size-full object-contain"
        aria-hidden
      />
    </div>
  );
}
