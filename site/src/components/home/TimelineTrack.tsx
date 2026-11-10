"use client";

import Image from "next/image";
import { useRef } from "react";
import { useScroll, useSpring, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { Wrench } from "lucide-react";
import type { Milestone } from "@/data/content";
import { DemoBadge, Text, Wedge } from "@/components/ui/primitives";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Timeline a forma di carota di sondaggio (su fondo scuro).
 * La linea si riempie di azzurro con lo scroll e la punta (dal logo) scende.
 */
export function TimelineTrack({ items, nodeBorder = "#26231f" }: { items: Milestone[]; nodeBorder?: string }) {
  const track = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start 70%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const headTop = useTransform(progress, (v) => `${v * 100}%`);

  return (
    <ol ref={track} className="relative overflow-x-clip">
      <span aria-hidden className="absolute bottom-0 left-[9px] top-0 w-2 -translate-x-1/2 rounded-full bg-[repeating-linear-gradient(to_bottom,#c5b69b_0_40px,#8e7f63_40px_56px,#ddd2bd_56px_86px,#6f624b_86px_100px)] opacity-70 md:left-1/2" />
      <m.span aria-hidden style={{ scaleY: progress }} className="absolute bottom-0 left-[9px] top-0 w-2 origin-top -translate-x-1/2 rounded-full bg-brand md:left-1/2" />
      <m.span aria-hidden style={{ top: headTop }} className="absolute left-[9px] z-10 -translate-x-1/2 -translate-y-full md:left-1/2">
        <Wedge className="h-6 w-7 text-brand drop-shadow" />
      </m.span>
      {items.map((ms, i) => (
        <Item key={i} ms={ms} i={i} nodeBorder={nodeBorder} />
      ))}
    </ol>
  );
}

function Item({ ms, i, nodeBorder }: { ms: Milestone; i: number; nodeBorder: string }) {
  const right = i % 2 === 1;
  return (
    <li className="relative pb-20 pl-10 last:pb-0 md:grid md:grid-cols-2 md:gap-20 md:pl-0">
      <m.span
        aria-hidden
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -40% 0px" }}
        transition={{ duration: 0.5, ease }}
        style={{ borderColor: nodeBorder }}
        className="absolute left-[9px] top-4 z-[5] h-5 w-5 -translate-x-1/2 rounded-full border-4 bg-brand md:left-1/2"
      />

      <m.div
        initial={{ opacity: 0, x: right ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "0px 0px -20% 0px" }}
        transition={{ duration: 0.9, ease }}
        className={right ? "md:order-2" : "md:text-right"}
      >
        <p className="font-display text-[clamp(4rem,8vw,7rem)] font-black leading-[0.85] text-brand-300">{ms.year}</p>
        {ms.year === "AAAA" && <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-white/45">Anno da inserire</p>}
        <h3 className="font-display mt-4 text-3xl font-extrabold uppercase"><Text>{ms.title}</Text></h3>
        <p className={`mt-2 max-w-md text-white/65 ${right ? "" : "md:ml-auto"}`}><Text>{ms.description}</Text></p>
        {ms.items && (
          <ul className={`mt-5 flex flex-wrap gap-1.5 ${right ? "" : "md:justify-end"}`}>
            {ms.items.map((it) => (
              <li key={it} className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/80">{it}</li>
            ))}
          </ul>
        )}
        {ms.machinery && (
          <p className={`mt-4 flex items-center gap-2 text-sm text-white/70 ${right ? "" : "md:justify-end"}`}>
            <Wrench aria-hidden className="h-4 w-4 text-brand-300" /> <Text>{ms.machinery}</Text>
          </p>
        )}
      </m.div>

      {ms.image && (
        <m.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -20% 0px" }}
          transition={{ duration: 1, delay: 0.1, ease }}
          className={`relative mt-8 md:mt-0 ${right ? "md:order-1" : ""}`}
        >
          {/* Foto a "capsula": la carota coricata */}
          <div className={`relative aspect-[16/9] w-full max-w-md overflow-hidden rounded-full ${right ? "md:ml-auto" : ""}`}>
            <Image src={ms.image.src} alt={ms.image.alt} fill sizes="(min-width:768px) 28rem, 90vw" className="object-cover" />
          </div>
          {ms.image.demo && <DemoBadge className={`absolute -bottom-3 ${right ? "right-8" : "left-8"}`} />}
        </m.div>
      )}
    </li>
  );
}
