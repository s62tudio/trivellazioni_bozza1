"use client";

import { useEffect, useState } from "react";
import { useScroll, useSpring } from "motion/react";
import * as m from "motion/react-m";
import { strata } from "./strata";

/**
 * Indice di profondità: fisso a sinistra su schermi larghi,
 * etichetta del capitolo corrente su mobile.
 */
export function DepthRail() {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(strata.findIndex((s) => s.id === e.target.id));
        }),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    strata.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const light = strata[active]?.fg === "light";

  return (
    <>
      <nav
        aria-label="Capitoli della pagina"
        className={`fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 transition-colors duration-500 xl:block ${light ? "text-white" : "text-ink"}`}
      >
        <div className="relative pl-6">
          <span aria-hidden className="absolute bottom-1 left-[5px] top-1 w-0.5 bg-current opacity-20" />
          <m.span aria-hidden style={{ scaleY: p }} className="absolute bottom-1 left-[5px] top-1 w-0.5 origin-top bg-brand" />
          <ul className="space-y-5">
            {strata.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} aria-current={i === active ? "location" : undefined} className="group flex items-center gap-3">
                  <span aria-hidden className={`absolute left-0 h-3 w-3 rounded-full border-2 border-brand transition-colors duration-300 ${i <= active ? "bg-brand" : "bg-transparent"}`} />
                  <span className={`text-[11px] font-semibold uppercase tracking-[0.16em] transition-opacity duration-300 ${i === active ? "opacity-100" : "opacity-50 group-hover:opacity-85"}`}>
                    {String(i).padStart(2, "0")} {s.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div aria-hidden className="pointer-events-none fixed bottom-4 left-1/2 z-40 -translate-x-1/2 xl:hidden">
        <span className="whitespace-nowrap rounded-full bg-ink/85 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow-lg backdrop-blur-md">
          {String(active).padStart(2, "0")} · {strata[active]?.label}
        </span>
      </div>
    </>
  );
}
