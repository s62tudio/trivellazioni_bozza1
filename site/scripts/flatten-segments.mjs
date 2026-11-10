/**
 * Dopo `next build` (output: "export").
 *
 * L'esportazione statica scrive i file di precaricamento dentro cartelle
 * annidate, ad esempio:
 *   out/storia/__next.(site)/storia/__PAGE__.txt
 * mentre il browser li richiede come file "piatti", con un punto per livello:
 *   out/storia/__next.(site).storia.__PAGE__.txt
 * Questo script crea le copie piatte mancanti, così il precaricamento
 * delle pagine non restituisce 404.
 */
import { copyFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = fileURLToPath(new URL("../out/", import.meta.url));
let created = 0;

/** Tutti i file sotto `dir`, a qualsiasi profondità */
function filesIn(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? filesIn(full) : [full];
  });
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (!statSync(full).isDirectory()) continue;
    if (name.startsWith("__next.")) {
      for (const src of filesIn(full)) {
        const flat = join(dir, `${name}.${relative(full, src).split(sep).join(".")}`);
        if (!existsSync(flat)) {
          copyFileSync(src, flat);
          created++;
        }
      }
      continue;
    }
    walk(full);
  }
}

walk(OUT);
console.log(`flatten-segments: ${created} file di precaricamento allineati`);
