"use client";

import Link from "next/link";
import { useRef } from "react";
import { useReducedMotion, useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { ChevronRight } from "lucide-react";
import type { SiteImage } from "@/data/images";
import { CoreImage } from "@/components/home/Stratum";
import { DemoBadge } from "@/components/ui/primitives";

const ease = [0.16, 1, 0.3, 1] as const;

type Crumb = { label: string; href?: string };

/**
 * Hero delle pagine interne: la "superficie" di ogni pagina.
 * Titolo grande a sinistra, carote fotografiche a destra (0–3).
 */
export function PageHero({
  eyebrow,
  title,
  accent,
  lead,
  crumbs,
  cores = [],
  children,
}: {
  eyebrow: string;
  title: string;
  /** seconda riga del titolo, in azzurro */
  accent?: string;
  lead?: string;
  crumbs: Crumb[];
  cores?: SiteImage[];
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "-16%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "10%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "-26%"]);
  const ys = [y1, y2, y3];
  const heights = ["h-[82%]", "h-full", "h-[66%]"];

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#eef1ef] text-ink">
      <div className={`mx-auto grid max-w-[1300px] items-center gap-12 px-5 pb-20 pt-32 sm:px-10 sm:pt-36 ${cores.length ? "min-h-[86svh] lg:grid-cols-2" : "min-h-[56svh]"}`}>
        <div>
          <nav aria-label="Percorso" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-ink/75">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight aria-hidden className="h-3.5 w-3.5" />}
                  {c.href ? (
                    <Link href={c.href} className="underline-offset-4 hover:text-ink hover:underline">{c.label}</Link>
                  ) : (
                    <span aria-current="page" className="font-semibold text-ink">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <m.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-700">
            {eyebrow}
          </m.p>
          <h1 className="font-display mt-4 text-[clamp(3rem,6vw,6rem)] font-black uppercase leading-[0.86]">
            {[title, accent].filter(Boolean).map((l, i) => (
              <span key={l} className="-mt-[0.14em] block overflow-hidden pt-[0.14em]">
                <m.span className={`block ${i ? "text-brand-600" : ""}`} initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease }}>
                  {l}
                </m.span>
              </span>
            ))}
          </h1>
          {lead && (
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75">
              {lead}
            </p>
          )}
          {children && (
            <m.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease }} className="mt-8">
              {children}
            </m.div>
          )}
        </div>

        {cores.length > 0 && (
          <div className="flex h-[360px] items-start justify-center gap-4 sm:h-[500px] sm:gap-6">
            {cores.slice(0, 3).map((img, i) => (
              <m.div key={img.src} style={{ y: ys[i] }} className={`${heights[i]} w-[28%] max-w-[160px]`}>
                <m.div className="h-full w-full" initial={{ y: "-25%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.1, delay: 0.2 + i * 0.12, ease }}>
                  <CoreImage src={img.src} alt={img.alt} priority className="h-full w-full" sizes="(min-width:1024px) 160px, 28vw" />
                </m.div>
              </m.div>
            ))}
          </div>
        )}
      </div>
      {cores.some((c) => c.demo) && <DemoBadge className="absolute bottom-5 right-5 sm:right-10" />}
    </section>
  );
}
