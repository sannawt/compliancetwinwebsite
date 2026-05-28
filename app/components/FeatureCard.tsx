import Image from "next/image";

export type FeatureCardProps = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  badge?: string;
};

export function FeatureCard({
  title,
  description,
  imageSrc,
  imageAlt,
  badge,
}: FeatureCardProps) {
  return (
    <div className="win-panel overflow-hidden">
      <div className="flex items-start gap-3 p-4">
        <div className="shrink-0 overflow-hidden rounded-md border border-black/10 bg-white/50">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={84}
            height={84}
            className="h-[84px] w-[84px]"
          />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <div className="text-sm font-semibold">{title}</div>
            {badge ? (
              <span className="rounded-md border border-black/10 bg-[color:var(--ct-sand-100)] px-2 py-0.5 text-[11px] font-semibold text-black/70">
                {badge}
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-sm leading-6 text-black/75">{description}</p>
        </div>
      </div>
    </div>
  );
}

