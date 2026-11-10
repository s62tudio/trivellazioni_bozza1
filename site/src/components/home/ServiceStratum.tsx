import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/content";
import { Eyebrow, Text } from "@/components/ui/primitives";
import { MaskLines, Reveal } from "@/components/ui/Reveal";
import { CoreImage, Stratum } from "./Stratum";
import { strata } from "./strata";

/** Strati 02–04: un servizio per strato, layout alternato. */
export function ServiceStratum({ index }: { index: number }) {
  const s = services[index];
  const id = `servizio-${s.number}`;
  const flip = index % 2 === 1;
  const light = strata.find((x) => x.id === id)?.fg === "light";

  return (
    <Stratum id={id}>
      <div className="grid items-center gap-14 lg:grid-cols-12">
        <Reveal from={flip ? "right" : "left"} className={`flex justify-center gap-4 sm:gap-6 lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}>
          <CoreImage src={s.image.src} alt={s.image.alt} badge={s.image.demo} className="h-[380px] w-[150px] sm:h-[480px] sm:w-[190px]" />
          <CoreImage src={s.thumb.src} alt={s.thumb.alt} badge={s.thumb.demo} className="mt-16 h-[300px] w-[110px] sm:h-[380px] sm:w-[145px]" />
        </Reveal>

        <div className={`lg:col-span-6 ${flip ? "lg:order-1" : "lg:col-start-7"}`}>
          <Reveal>
            <Eyebrow index={String(index + 2).padStart(2, "0")} tone={light ? "light" : "dark"}>
              Servizio {s.number}
            </Eyebrow>
          </Reveal>
          <h2 className="font-display mt-5 text-[clamp(2.8rem,5.4vw,5rem)] font-black uppercase leading-[0.88]">
            <MaskLines lines={[s.title]} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg opacity-90">{s.intro}</p>
            <p className="mt-2 text-sm opacity-70"><Text>{s.detail}</Text></p>
            <ul className={`mt-6 flex flex-wrap gap-2 border-t pt-6 ${light ? "border-white/20" : "border-ink/20"}`}>
              {s.keywords.map((k, j) => (
                <li key={j} className={`rounded-full border px-3.5 py-1.5 text-sm ${light ? "border-white/25" : "border-ink/25"}`}>
                  <Text>{k}</Text>
                </li>
              ))}
            </ul>
            <Link
              href={`/servizi/${s.slug}`}
              className={`group mt-8 inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-3.5 font-semibold transition-colors ${
                light ? "bg-white text-ink hover:bg-brand hover:text-white" : "bg-ink text-white hover:bg-brand"
              }`}
            >
              Scopri il servizio
              <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </div>
    </Stratum>
  );
}
