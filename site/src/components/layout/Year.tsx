"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** Anno corrente: statico in prerender, reale sul client. */
export function Year() {
  const year = useSyncExternalStore(noop, () => new Date().getFullYear(), () => 2026);
  return <span>{year}</span>;
}
