"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryItem } from "@/data/content";

type Props = {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onChange: (i: number) => void;
};

export function Lightbox({ items, index, onClose, onChange }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null;
  const item = open ? items[index] : null;

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onChange((index + dir + items.length) % items.length);
    },
    [index, items.length, onChange],
  );

  useEffect(() => {
    if (!open) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prevFocus?.focus();
    };
  }, [open, go, onClose]);

  return (
    <AnimatePresence>
      {item && index !== null && (
        <m.div
          role="dialog"
          aria-modal="true"
          aria-label={`Immagine ${index + 1} di ${items.length}: ${item.title}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[80] flex flex-col bg-ink/96 backdrop-blur-sm"
          onClick={onClose}
        >
          <div className="flex items-center justify-between px-4 py-4 text-white sm:px-8" onClick={(e) => e.stopPropagation()}>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.2em]">
              <span className="text-brand">{String(index + 1).padStart(2, "0")}</span>
              <span className="text-white/50"> / {String(items.length).padStart(2, "0")}</span>
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center bg-white/10 transition-colors hover:bg-brand"
              aria-label="Chiudi galleria"
            >
              <X aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-20">
            <AnimatePresence mode="popLayout" initial={false}>
              <m.div
                key={item.image.src}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(1);
                  else if (info.offset.x > 60) go(-1);
                }}
                className="relative h-full w-full cursor-grab touch-pan-y active:cursor-grabbing"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="100vw"
                  draggable={false}
                  className="select-none object-contain"
                />
              </m.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              className="absolute left-2 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center bg-white/10 text-white transition-colors hover:bg-brand sm:flex"
              aria-label="Immagine precedente"
            >
              <ChevronLeft aria-hidden="true" className="h-7 w-7" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              className="absolute right-2 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center bg-white/10 text-white transition-colors hover:bg-brand sm:flex"
              aria-label="Immagine successiva"
            >
              <ChevronRight aria-hidden="true" className="h-7 w-7" />
            </button>
          </div>

          <div
            className="flex items-center justify-between gap-4 px-4 py-5 text-white sm:px-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <p className="font-display text-xl font-semibold uppercase tracking-wide">{item.title}</p>
              <p className="text-sm text-iron-light">
                {item.category}
                {item.image.demo && " · Foto dimostrativa"}
              </p>
            </div>
            <div className="flex gap-2 sm:hidden">
              <button type="button" onClick={() => go(-1)} className="flex h-11 w-11 items-center justify-center bg-white/10" aria-label="Immagine precedente">
                <ChevronLeft aria-hidden="true" className="h-6 w-6" />
              </button>
              <button type="button" onClick={() => go(1)} className="flex h-11 w-11 items-center justify-center bg-brand" aria-label="Immagine successiva">
                <ChevronRight aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
