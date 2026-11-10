"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import type { Stat } from "@/data/content";

/** Contatore animato; se il dato manca mostra "00" marcato come placeholder. */
export function StatNumber({ stat, className = "" }: { stat: Stat; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(stat.from ?? 0);

  useEffect(() => {
    if (!inView || stat.value === null || reduce) return;
    const c = animate(stat.from ?? 0, stat.value, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, stat.value, stat.from, reduce]);

  if (stat.value === null) {
    return (
      <span ref={ref} className={`${className} opacity-40`} title="Dato da inserire">
        00<span className="sr-only"> (dato da inserire)</span>
      </span>
    );
  }
  return (
    <span ref={ref} className={`${className} tabular-nums`}>
      {reduce ? stat.value : n}
      {stat.suffix}
    </span>
  );
}
