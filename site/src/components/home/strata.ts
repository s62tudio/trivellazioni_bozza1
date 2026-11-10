import { services } from "@/data/content";

/**
 * Strati della homepage: dalla superficie al nucleo.
 * Ogni strato è un capitolo (id = ancora), con fondo e testo
 * a contrasto verificato (≥ 4.5:1).
 */
export type Stratum = { id: string; label: string; bg: string; fg: "dark" | "light" };

export const strata: Stratum[] = [
  { id: "superficie", label: "Superficie", bg: "#eef1ef", fg: "dark" },
  { id: "azienda", label: "L'azienda", bg: "#ddd2bd", fg: "dark" },
  { id: "servizio-01", label: services[0].shortTitle, bg: "#c5b69b", fg: "dark" },
  { id: "servizio-02", label: services[1].shortTitle, bg: "#6f624b", fg: "light" },
  { id: "servizio-03", label: services[2].shortTitle, bg: "#3a342c", fg: "light" },
  { id: "storia", label: "La storia", bg: "#26231f", fg: "light" },
  { id: "nucleo", label: "Certificazioni e contatti", bg: "#141618", fg: "light" },
];

export const strataIndex = (id: string) => strata.findIndex((s) => s.id === id);
