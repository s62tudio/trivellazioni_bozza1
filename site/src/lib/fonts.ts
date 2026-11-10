import { Big_Shoulders, Inter } from "next/font/google";

/** Titoli: Big Shoulders (condensato, industriale) */
export const fontDisplay = Big_Shoulders({ subsets: ["latin"], variable: "--font-bigsh", display: "swap", adjustFontFallback: false, fallback: ["Arial Narrow", "sans-serif"] });

/** Testi: Inter (leggibilità) */
export const fontSans = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
