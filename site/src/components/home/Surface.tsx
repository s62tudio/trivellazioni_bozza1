"use client";

import { useRef } from "react";
import { useReducedMotion, useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { ArrowDown } from "lucide-react";
import { company } from "@/data/site";
import { intro } from "@/data/content";
import { photos } from "@/data/images";
import { Button, DemoBadge } from "@/components/ui/primitives";
import { CoreImage } from "./Stratum";

const ease = [0.16, 1, 0.3, 1] as const;

const cores = [
  { img: photos.rigB, h: "h-[80%]", enter: 0.25, drift: ["0%", "-14%"] },
  { img: photos.rigSun, h: "h-full", enter: 0.38, drift: ["0%", "8%"] },
  { img: photos.excavatorA, h: "h-[64%]", enter: 0.5, drift: ["0%", "-24%"] },
];

/** Hero: la "superficie" da cui inizia la discesa. */
export function Surface() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  return (
    <section id="superficie" ref={ref} aria-label="Superficie" className="relative overflow-hidden bg-[#eef1ef] text-ink">
      <div className="mx-auto grid min-h-[100svh] max-w-[1300px] items-center gap-12 px-5 pb-24 pt-32 sm:px-10 lg:grid-cols-2 xl:pl-56">
        <div>
          <m.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-700">
            {company.legalName} · Dal 1990
          </m.p>
          <h1 className="font-display mt-5 text-[clamp(3.2rem,5.3vw,5.8rem)] font-black uppercase leading-[0.86]">
            <span className="sr-only">{company.name} — </span>
            {["Scendiamo", "in profondità."].map((l, i) => (
              <span key={l} className="-mt-[0.14em] block overflow-hidden pt-[0.14em]">
                <m.span className={`block ${i ? "text-brand-600" : ""}`} initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.15 + i * 0.1, ease }}>
                  {l}
                </m.span>
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/75">
            {intro.lead}
          </p>
          <m.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6, ease }} className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="#servizio-01">Esplora i servizi</Button>
            <Button href="#contatti" variant="ghost">Contattaci</Button>
          </m.div>
          <m.a
            href="#azienda"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 inline-flex items-center gap-4 text-sm font-semibold"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white">
              <m.span animate={reduce ? undefined : { y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
                <ArrowDown aria-hidden className="h-5 w-5" />
              </m.span>
            </span>
            Inizia a scendere
          </m.a>
        </div>

        {/* Tre carote di sondaggio, ognuna con la propria velocità di parallasse */}
        <div className="flex h-[420px] items-start justify-center gap-4 sm:h-[560px] sm:gap-6">
          {cores.map(({ img, h, enter, drift }) => (
            <Core key={img.src} progress={scrollYProgress} drift={reduce ? ["0%", "0%"] : drift} className={`${h} w-[28%] max-w-[160px]`} enter={enter}>
              <CoreImage src={img.src} alt={img.alt} priority className="h-full w-full" sizes="(min-width:1024px) 160px, 28vw" />
            </Core>
          ))}
        </div>
      </div>
      {cores.some((c) => c.img.demo) && <DemoBadge className="absolute bottom-5 right-5 sm:right-10" />}
    </section>
  );
}

function Core({
  progress,
  drift,
  enter,
  className,
  children,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  drift: string[];
  enter: number;
  className: string;
  children: React.ReactNode;
}) {
  const y = useTransform(progress, [0, 1], drift);
  return (
    <m.div style={{ y }} className={className}>
      <m.div className="h-full w-full" initial={{ y: "-30%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, delay: enter, ease }}>
        {children}
      </m.div>
    </m.div>
  );
}
