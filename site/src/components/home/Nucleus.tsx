"use client";

/**
 * Strato 06 — NUCLEO
 * L'unica parte con riquadri arrotondati "bento" (il 5% preso dalla versione E):
 * certificazioni, galleria con filtri + lightbox, contatti con form.
 */
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Building2, FileDown, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { company } from "@/data/site";
import { certifications, certificationsIntro } from "@/data/content";
import { Eyebrow } from "@/components/ui/primitives";
import { MaskLines, Reveal } from "@/components/ui/Reveal";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Stratum } from "./Stratum";
import { ContactForm } from "./ContactForm";

const tile = "rounded-[28px] border border-white/10 bg-anthracite";

export function Nucleus() {
  return (
    <Stratum id="nucleo">
      <Certifications />
      <Gallery />
      <Contacts />
    </Stratum>
  );
}

/* ---------------- CERTIFICAZIONI ---------------- */
function Certifications() {
  return (
    <div id="certificazioni">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Reveal><Eyebrow index="06" tone="light">Certificazioni</Eyebrow></Reveal>
          <h2 className="font-display mt-5 text-[clamp(3rem,6vw,5.5rem)] font-black uppercase leading-[0.88]">
            <MaskLines lines={["Qualità", "documentata."]} />
          </h2>
        </div>
        <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
          <p className="text-white/70">{certificationsIntro}</p>
          <Link href="/certificazioni" className="mt-4 inline-flex items-center gap-2 font-semibold text-brand-300 hover:underline">Tutte le certificazioni <ArrowUpRight aria-hidden className="h-4 w-4" /></Link>
        </Reveal>
      </div>
      <ul className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">
        {certifications.map((c, i) => (
          <li key={c.code}>
            <Reveal delay={i * 0.05} className={`${tile} group flex h-full flex-col p-3 transition-transform duration-300 hover:-translate-y-1`}>
              {c.image ? (
                <div className="relative aspect-[1242/1755] overflow-hidden rounded-[18px] bg-white">
                  <Image src={c.image} alt={`Certificato ${c.title}`} fill sizes="(min-width:1024px) 160px, 45vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                </div>
              ) : (
                <span className="flex aspect-[1242/1755] items-center justify-center rounded-[18px] border border-dashed border-brand-300/50 bg-white/5">
                  <ShieldCheck aria-hidden className="h-7 w-7 text-brand-300" strokeWidth={1.5} />
                </span>
              )}
              <p className="mt-3 px-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-300">{c.code}</p>
              <h3 className="px-1 text-sm font-semibold leading-snug">{c.description}</h3>
              {c.pdf && (
                <a href={c.pdf} target="_blank" rel="noopener" className="mt-auto inline-flex items-center gap-1.5 self-start px-1 pt-3 text-sm font-semibold text-white/80 hover:text-brand-300">
                  <FileDown aria-hidden className="h-4 w-4" /> PDF <span className="sr-only">{c.title}</span>
                </a>
              )}
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- GALLERIA ---------------- */
function Gallery() {
  return (
    <div id="galleria" className="mt-32">
      <div className="mb-8">
        <Reveal><Eyebrow index="07" tone="light">Galleria</Eyebrow></Reveal>
        <h2 className="font-display mt-5 text-[clamp(3rem,6vw,5.5rem)] font-black uppercase leading-[0.88]">
          <MaskLines lines={["Il lavoro, ", <span key="b" className="text-brand-300">in immagini.</span>]} />
        </h2>
      </div>
      <GalleryGrid limit={10} filterId="nucleus-filter" />
      <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-white/55">Cantieri e mezzi di {company.shortName}.</p>
        <Link href="/galleria" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/25 px-6 font-semibold hover:bg-white hover:text-ink">Galleria completa <ArrowUpRight aria-hidden className="h-4 w-4" /></Link>
      </div>
    </div>
  );
}

/* ---------------- CONTATTI ---------------- */
function Contacts() {
  return (
    <div id="contatti" className="mt-32 grid gap-3 lg:grid-cols-12">
      <Reveal className="flex flex-col rounded-[28px] bg-brand p-7 text-ink sm:p-10 lg:col-span-5">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink/70">08 · Contatti</p>
        <h2 className="font-display mt-5 text-[clamp(2.6rem,3.9vw,4.2rem)] font-black uppercase leading-[0.88]">Siamo arrivati in fondo. Parliamone.</h2>
        <p className="mt-4 text-lg font-medium">Hai un progetto? Ottieni una consulenza gratuita.</p>
        <dl className="mt-8 space-y-4">
          {[
            { icon: MapPin, l: "Sede operativa", v: company.operationalAddress },
            { icon: Building2, l: "Sede legale", v: company.address },
            { icon: Phone, l: "Telefono", v: company.phone, href: company.phoneHref },
            { icon: Mail, l: "Email", v: company.email, href: `mailto:${company.email}` },
            { icon: Mail, l: "Ufficio tecnico", v: "tecnico@trivellazionitalia.it", href: "mailto:tecnico@trivellazionitalia.it" },
            { icon: ShieldCheck, l: "PEC", v: company.pec, href: `mailto:${company.pec}` },
          ].map(({ icon: Icon, l, v, href }) => (
            <div key={l} className="relative pl-8">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/65">
                <Icon aria-hidden className="absolute left-0 top-0.5 h-5 w-5 text-ink" />
                {l}
              </dt>
              <dd className="break-words font-medium">{href ? <a href={href} className="underline-offset-4 hover:underline">{v}</a> : v}</dd>
            </div>
          ))}
        </dl>
        <a
          href={company.mapsUrl}
          target="_blank"
          rel="noopener"
          className="group mt-8 flex min-h-12 items-center justify-between gap-3 rounded-[22px] bg-ink px-5 py-4 font-semibold text-white transition-colors hover:bg-white hover:text-ink"
        >
          <span className="flex items-center gap-2"><MapPin aria-hidden className="h-5 w-5" /> Indicazioni stradali</span>
          <ArrowUpRight aria-hidden className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </Reveal>
      <Reveal delay={0.1} className={`${tile} p-7 sm:p-10 lg:col-span-7`}>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">Richiedi informazioni</p>
        <div className="mt-6"><ContactForm /></div>
      </Reveal>
    </div>
  );
}
