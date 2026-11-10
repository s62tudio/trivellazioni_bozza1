"use client";

/**
 * NAVBAR
 * Desktop: "pillola" fluttuante con tutte le voci visibili (ispirata alla versione E)
 *          + sottomenu Servizi.
 * Mobile:  pulsante tondo che apre un cassetto laterale (versione F).
 */
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, useScroll, useSpring } from "motion/react";
import * as m from "motion/react-m";
import { ArrowUpRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { company, navigation } from "@/data/site";
import { services } from "@/data/content";
import { Text } from "@/components/ui/primitives";

const ease = [0.16, 1, 0.3, 1] as const;

export function Navbar() {
  const pathname = usePathname();
  const [drawer, setDrawer] = useState(false);
  const [drop, setDrop] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const servicesBtn = useRef<HTMLButtonElement>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  // Chiusura automatica al cambio pagina
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setDrawer(false);
    setDrop(false);
  }

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // se il fuoco era nel sottomenu Servizi, torna al pulsante che lo apre
        if (document.getElementById("menu-servizi")?.contains(document.activeElement)) servicesBtn.current?.focus();
        setDrawer(false);
        setDrop(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [drawer]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("/").slice(0, 2).join("/"));

  const openDrop = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDrop(true);
  };
  const closeDrop = () => {
    closeTimer.current = setTimeout(() => setDrop(false), 150);
  };

  const links = navigation.filter((n) => n.href !== "/contatti");

  return (
    <>
      <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4">
        <div className="relative mx-auto flex max-w-[1200px] items-center justify-between gap-3 rounded-full border border-white/10 bg-ink/85 py-2 pl-4 pr-2 text-white shadow-xl shadow-black/20 backdrop-blur-xl sm:pl-5">
          <Link href="/" aria-label={`${company.name} — Home`} className="shrink-0">
            <Image src="/brand/logo-trivellazioni-italia.png" alt={company.name} width={538} height={210} priority className="h-9 w-auto sm:h-10" />
          </Link>

          {/* Desktop: voci sempre visibili */}
          <nav aria-label="Navigazione principale" className="hidden lg:block">
            <ul className="flex items-center gap-0.5 text-[14px] font-medium">
              {links.map((n) =>
                n.children ? (
                  <li key={n.label} className="relative" onMouseEnter={openDrop} onMouseLeave={closeDrop}>
                    <button
                      ref={servicesBtn}
                      type="button"
                      aria-expanded={drop}
                      aria-controls="menu-servizi"
                      onClick={() => setDrop((v) => !v)}
                      className={`flex items-center gap-1 rounded-full px-3.5 py-2.5 transition-colors ${
                        isActive("/servizi") || drop ? "bg-white/12 text-white" : "text-white/75 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {n.label}
                      <ChevronDown aria-hidden className={`h-4 w-4 transition-transform duration-300 ${drop ? "rotate-180 text-brand-300" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {drop && (
                        <m.div
                          id="menu-servizi"
                          initial={{ opacity: 0, y: -6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.98 }}
                          transition={{ duration: 0.25, ease }}
                          className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-4"
                        >
                          <ul className="grid grid-cols-3 gap-2 rounded-[28px] border border-white/10 bg-ink p-2.5 shadow-2xl shadow-black/40">
                            {services.map((s, i) => (
                              <m.li key={s.slug} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.05, duration: 0.35, ease }}>
                                <Link href={`/servizi/${s.slug}`} onClick={() => setDrop(false)} className="group block rounded-[22px] p-2 transition-colors hover:bg-white/8">
                                  <span className="relative mx-auto block h-36 w-20 overflow-hidden rounded-full">
                                    <Image src={s.thumb.src} alt="" fill sizes="80px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                  </span>
                                  <span className="mt-3 block text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-300">Servizio {s.number}</span>
                                  <span className="mt-1 block text-center text-sm font-semibold leading-snug">{s.title}</span>
                                </Link>
                              </m.li>
                            ))}
                          </ul>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </li>
                ) : (
                  <li key={n.label}>
                    <Link
                      href={n.href}
                      aria-current={isActive(n.href) ? "page" : undefined}
                      className={`block rounded-full px-3.5 py-2.5 transition-colors ${
                        isActive(n.href) ? "bg-white/12 text-white" : "text-white/75 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {n.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5">
            <Link
              href="/contatti"
              aria-current={isActive("/contatti") ? "page" : undefined}
              className="hidden items-center gap-1.5 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-white hover:text-ink sm:inline-flex"
            >
              Contatti <ArrowUpRight aria-hidden className="h-4 w-4" />
            </Link>
            {/* Mobile: apre il cassetto */}
            <button
              type="button"
              onClick={() => setDrawer(true)}
              aria-expanded={drawer}
              aria-controls="menu-mobile"
              aria-label="Apri menu"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-brand lg:hidden"
            >
              <Menu aria-hidden className="h-5 w-5" />
            </button>
          </div>

          {/* Avanzamento lettura */}
          <span aria-hidden className="pointer-events-none absolute inset-x-6 bottom-0 h-px overflow-hidden">
            <m.span style={{ scaleX: progress }} className="block h-full w-full origin-left bg-brand" />
          </span>
        </div>
      </header>

      {/* Cassetto laterale (solo mobile/tablet) */}
      <AnimatePresence>
        {drawer && (
          <>
            <m.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawer(false)}
              className="fixed inset-0 z-[60] bg-black/55 lg:hidden"
            />
            <m.nav
              key="drawer"
              id="menu-mobile"
              aria-label="Navigazione mobile"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease }}
              className="fixed bottom-0 right-0 top-0 z-[61] flex w-full max-w-md flex-col overflow-y-auto bg-ink px-6 pb-8 pt-5 text-white lg:hidden"
            >
              <div className="flex items-center justify-between">
                <Image src="/brand/logo-trivellazioni-italia.png" alt="" width={538} height={210} className="h-9 w-auto" />
                <button type="button" onClick={() => setDrawer(false)} aria-label="Chiudi menu" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-brand">
                  <X aria-hidden className="h-5 w-5" />
                </button>
              </div>
              <ul className="mt-10">
                {navigation.map((n, i) => (
                  <m.li
                    key={n.label}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.04, duration: 0.4, ease }}
                    className="border-b border-white/10"
                  >
                    {n.children ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setMobileServices((v) => !v)}
                          aria-expanded={mobileServices}
                          aria-controls="menu-mobile-servizi"
                          className="font-display flex w-full items-center justify-between py-3 text-left text-4xl font-extrabold uppercase"
                        >
                          {n.label}
                          <ChevronDown aria-hidden className={`h-6 w-6 text-brand-300 transition-transform ${mobileServices ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence initial={false}>
                          {mobileServices && (
                            <m.ul
                              id="menu-mobile-servizi"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease }}
                              className="overflow-hidden border-l-2 border-brand pl-4"
                            >
                              {n.children.map((c) => (
                                <li key={c.href}>
                                  <Link href={c.href} onClick={() => setDrawer(false)} className="flex items-center justify-between gap-3 py-2.5 text-white/80 active:text-white">
                                    {c.label} <ArrowUpRight aria-hidden className="h-4 w-4 shrink-0 text-brand-300" />
                                  </Link>
                                </li>
                              ))}
                              <li className="h-3" />
                            </m.ul>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={n.href}
                        onClick={() => setDrawer(false)}
                        aria-current={isActive(n.href) ? "page" : undefined}
                        className={`font-display block py-3 text-4xl font-extrabold uppercase ${isActive(n.href) ? "text-brand-300" : ""}`}
                      >
                        {n.label}
                      </Link>
                    )}
                  </m.li>
                ))}
              </ul>
              <p className="mt-auto flex items-center gap-2 pt-10 text-sm text-white/60">
                <Phone aria-hidden className="h-4 w-4 text-brand-300" /> <Text>{company.phone}</Text>
              </p>
            </m.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
