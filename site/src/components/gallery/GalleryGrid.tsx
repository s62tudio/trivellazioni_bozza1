"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Expand } from "lucide-react";
import { gallery as allItems, galleryCategories, type GalleryItem } from "@/data/content";
import { Lightbox } from "./Lightbox";

const ease = [0.16, 1, 0.3, 1] as const;

/** Mosaico: ogni posizione ha la propria dimensione, layout non ripetitivo. */
const spans = [
  "sm:col-span-2 sm:row-span-2",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-1 sm:row-span-2",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-2 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-2 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
];

/** Galleria con filtri per categoria e lightbox (su fondo scuro). */
export function GalleryGrid({ items: source = allItems, limit, filterId = "gallery-filter" }: { items?: GalleryItem[]; limit?: number; filterId?: string }) {
  const [filter, setFilter] = useState<(typeof galleryCategories)[number]>("Tutte");
  const categories = galleryCategories.filter((c) => c === "Tutte" || source.some((g) => g.category === c));
  const [open, setOpen] = useState<number | null>(null);
  const items = useMemo(() => {
    const f = filter === "Tutte" ? source : source.filter((g) => g.category === filter);
    return limit ? f.slice(0, limit) : f;
  }, [filter, source, limit]);

  return (
    <div>
        <div role="group" aria-label="Filtra per categoria" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
        {categories.length > 2 && categories.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
            className={`relative min-h-11 shrink-0 rounded-full px-4 text-sm font-semibold transition-colors ${filter === c ? "text-ink" : "border border-white/15 text-white/75 hover:text-white"}`}
          >
            {filter === c && <m.span layoutId={filterId} className="absolute inset-0 rounded-full bg-brand-300" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
            <span className="relative">{c}</span>
          </button>
        ))}
      </div>

      <m.ul layout className="mt-10 grid auto-rows-[200px] grid-cols-1 gap-3 sm:grid-flow-dense sm:grid-cols-4 lg:auto-rows-[220px]">
        <AnimatePresence mode="popLayout">
          {items.map((g, i) => (
            <m.li
              layout
              key={g.image.src}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.45, ease }}
              className={`${filter === "Tutte" ? spans[i % spans.length] : i === 0 ? "sm:col-span-2 sm:row-span-2" : ""} ${i === 0 ? "row-span-2" : ""}`}
            >
              <button type="button" onClick={() => setOpen(i)} aria-label={`Apri immagine: ${g.title}`} className="group relative block h-full w-full overflow-hidden rounded-[28px] text-left">
                <Image src={g.image.src} alt={g.image.alt} fill sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 92vw" className="object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]" />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                  <span>
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-300">{g.category}</span>
                    <span className="font-display block text-xl font-extrabold uppercase">{g.title}</span>
                  </span>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-ink opacity-0 transition-opacity group-hover:opacity-100">
                    <Expand aria-hidden className="h-4 w-4" />
                  </span>
                </span>
              </button>
            </m.li>
          ))}
        </AnimatePresence>
      </m.ul>
      <Lightbox items={items} index={open} onClose={() => setOpen(null)} onChange={setOpen} />
    </div>
  );
}
