import path from "node:path";
import type { NextConfig } from "next";

/**
 * Esportazione statica: `next build` genera il sito completo in `out/`,
 * servito come asset statici da Cloudflare Workers (vedi ../wrangler.jsonc).
 */
const nextConfig: NextConfig = {
  output: "export",
  images: {
    // L'ottimizzazione immagini integrata richiede un server: le foto sono già dimensionate.
    unoptimized: true,
  },
  turbopack: {
    root: path.resolve(__dirname),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
