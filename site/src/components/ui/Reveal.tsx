"use client";

import { type HTMLMotionProps } from "motion/react";
import * as m from "motion/react-m";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  from?: "up" | "left" | "right" | "none";
  distance?: number;
};

/** Fade/slide-in all'ingresso nel viewport (una sola volta). */
export function Reveal({ delay = 0, from = "up", distance = 32, children, ...rest }: RevealProps) {
  const offset = {
    up: { y: distance },
    left: { x: -distance },
    right: { x: distance },
    none: {},
  }[from];

  return (
    <m.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </m.div>
  );
}

/** Titolo che sale riga per riga da una maschera. */
export function MaskLines({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  animateOnMount = false,
}: {
  lines: React.ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  animateOnMount?: boolean;
}) {
  // L'osservatore è sul contenitore (mai ritagliato), le righe ereditano le varianti.
  return (
    <m.span
      className={`block ${className}`}
      initial="hidden"
      {...(animateOnMount
        ? { animate: "show" }
        : { whileInView: "show", viewport: { once: true, margin: "0px 0px -8% 0px" } })}
    >
      {lines.map((line, i) => (
        <span key={i} className="-mt-[0.14em] block overflow-hidden pb-[0.06em] pt-[0.14em]">
          <m.span
            className={`block ${lineClassName}`}
            variants={{
              hidden: { y: "105%" },
              show: { y: "0%", transition: { duration: 1, delay: delay + i * 0.09, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            {line}
          </m.span>
        </span>
      ))}
    </m.span>
  );
}
