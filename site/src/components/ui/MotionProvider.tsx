"use client";

import { LazyMotion, MotionConfig } from "motion/react";

/** Le funzioni di animazione vengono scaricate dopo il primo disegno della pagina. */
const loadFeatures = () => import("./motionFeatures").then((mod) => mod.default);

/** Animazioni caricate in modo differito; rispetta prefers-reduced-motion. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
