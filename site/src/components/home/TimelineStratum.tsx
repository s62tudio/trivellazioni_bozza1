import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { timeline } from "@/data/content";
import { Eyebrow } from "@/components/ui/primitives";
import { MaskLines, Reveal } from "@/components/ui/Reveal";
import { Stratum } from "./Stratum";
import { TimelineTrack } from "./TimelineTrack";

/** Strato 05: la storia come una carota verticale. */
export function TimelineStratum() {
  return (
    <Stratum id="storia">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal>
            <Eyebrow index="05" tone="light">La nostra storia</Eyebrow>
          </Reveal>
          <h2 className="font-display mt-5 text-[clamp(3rem,6vw,5.5rem)] font-black uppercase leading-[0.88]">
            <MaskLines lines={["Strato", "dopo strato."]} />
          </h2>
        </div>
        <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:self-end">
          <p className="text-lg text-white/75">Le tappe che hanno segnato l&apos;evoluzione dell&apos;azienda: persone, mezzi e lavorazioni.</p>
        </Reveal>
      </div>

      <div className="mt-20">
        <TimelineTrack items={timeline} />
      </div>

      <Reveal className="mt-16 md:text-center">
        <Link href="/storia" className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-ink transition-colors hover:bg-brand hover:text-white">
          Leggi la storia completa
          <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </Reveal>
    </Stratum>
  );
}
