import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { company } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { Layer, type Level } from "@/components/layout/Layer";

/** Chiusura delle pagine interne: il "nucleo" con la richiesta di contatto. */
export function CtaBand({ prev }: { prev: Level }) {
  return (
    <Layer level={6} prev={prev} label="Contattaci">
      <Reveal className="rounded-[40px] bg-brand p-8 text-ink sm:p-14">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink/70">Hai un progetto?</p>
        <p className="font-display mt-4 text-[clamp(2.8rem,7vw,6.5rem)] font-black uppercase leading-[0.86]">Ottieni una consulenza gratuita.</p>
        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2 text-lg font-medium">
            <a href={company.phoneHref} className="flex items-center gap-2 hover:underline"><Phone aria-hidden className="h-5 w-5" /> {company.phone}</a>
            <a href={`mailto:${company.email}`} className="flex items-center gap-2 break-all hover:underline"><Mail aria-hidden className="h-5 w-5 shrink-0" /> {company.email}</a>
          </div>
          <Link href="/contatti" className="group inline-flex min-h-12 items-center gap-2 self-start rounded-full bg-ink px-7 py-4 font-semibold text-white transition-colors hover:bg-white hover:text-ink">
            Contattaci
            <ArrowUpRight aria-hidden className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Reveal>
    </Layer>
  );
}
