import Image from "next/image";
import { strata, strataIndex } from "./strata";
import { DemoBadge } from "@/components/ui/primitives";

/** Sezione-strato con bordo superiore ondulato nel colore dello strato precedente. */
export function Stratum({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const i = strataIndex(id);
  const s = strata[i];
  const prev = strata[i - 1];
  return (
    <section
      id={id}
      aria-label={s.label}
      style={{ backgroundColor: s.bg }}
      className={`relative overflow-x-clip ${s.fg === "light" ? "text-white" : "text-ink"} ${className}`}
    >
      {prev && (
        <svg aria-hidden viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute -top-px left-0 h-10 w-full sm:h-16" style={{ color: prev.bg }}>
          <path
            fill="currentColor"
            d={
              i % 2
                ? "M0 0H1440V30C1240 70 1080 10 860 40C640 70 470 18 260 46C150 60 70 52 0 40Z"
                : "M0 0H1440V44C1280 20 1120 66 900 38C690 12 520 64 300 34C170 18 80 30 0 50Z"
            }
          />
        </svg>
      )}
      <div className="mx-auto max-w-[1300px] px-5 pb-24 pt-28 sm:px-10 sm:pb-32 sm:pt-36 xl:pl-56">{children}</div>
    </section>
  );
}

/** Fotografia a forma di "carota" di sondaggio. */
export function CoreImage({
  src,
  alt,
  className = "",
  sizes = "(min-width:1024px) 15vw, 40vw",
  priority = false,
  badge = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  badge?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden rounded-full shadow-2xl shadow-black/25 ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      {badge && <DemoBadge className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap" />}
    </div>
  );
}
