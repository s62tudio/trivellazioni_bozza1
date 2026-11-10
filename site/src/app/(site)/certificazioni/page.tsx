import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FileDown } from "lucide-react";
import { certifications, certificationsIntro } from "@/data/content";
import { photos } from "@/data/images";
import { PageHero } from "@/components/pages/PageHero";
import { CtaBand } from "@/components/pages/CtaBand";
import { Layer } from "@/components/layout/Layer";
import { Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Certificazioni",
  description: "Attestazione SOA e certificazioni ISO 9001, ISO 14001, ISO 45001, ISO 37001, ISO 39001 e UNI/PdR 125:2022 di Trivellazioni Italia S.r.l., con i documenti scaricabili.",
  alternates: { canonical: "/certificazioni" },
};

export default function CertificazioniPage() {
  return (
    <>
      <PageHero
        eyebrow="Certificazioni"
        title="Qualità"
        accent="documentata."
        lead={certificationsIntro}
        crumbs={[{ label: "Home", href: "/" }, { label: "Certificazioni" }]}
        cores={[photos.rigCasing, photos.rigF, photos.droneB]}
      >
        <p className="text-sm text-ink/75">{certifications.length} certificazioni e attestazioni · documenti in PDF</p>
      </PageHero>

      <Layer level={5} prev={0} label="Elenco certificazioni">
        <ul className="space-y-3">
          {certifications.map((c, i) => (
            <li key={c.code}>
              <Reveal delay={0.04 * i} className="grid items-center gap-6 rounded-[28px] border border-white/10 bg-white/5 p-4 sm:grid-cols-[140px_1fr_auto] sm:p-5">
                {c.image && (
                  <a href={c.pdf ?? c.image} target="_blank" rel="noopener" className="group relative mx-auto block aspect-[1242/1755] w-32 overflow-hidden rounded-[18px] bg-white sm:mx-0 sm:w-[140px]" aria-label={`Apri il certificato ${c.title}`}>
                    <Image src={c.image} alt={`Certificato ${c.title}`} fill sizes="140px" className="object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                  </a>
                )}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-300">{String(i + 1).padStart(2, "0")} · {c.code}</p>
                  <h2 className="font-display mt-2 text-[clamp(2rem,4vw,3.4rem)] font-black uppercase leading-[0.9]">{c.title}</h2>
                  <p className="mt-2 text-white/70">{c.description}</p>
                </div>
                {c.pdf && (
                  <a href={c.pdf} target="_blank" rel="noopener" className="group inline-flex min-h-12 items-center gap-2 self-center justify-self-start rounded-full bg-white px-6 py-3 font-semibold text-ink transition-colors hover:bg-brand hover:text-white sm:justify-self-end">
                    <FileDown aria-hidden className="h-5 w-5" /> Scarica PDF <span className="sr-only">{c.title}</span>
                  </a>
                )}
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-16 flex flex-col gap-4 rounded-[28px] border border-white/10 p-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Eyebrow tone="light">Parità di genere</Eyebrow>
            <p className="mt-2 max-w-xl text-white/75">La politica aziendale per la parità di genere e il Sistema di Gestione UNI/PdR 125:2022 sono descritti nella sezione Compliance.</p>
          </div>
          <Link href="/compliance#parita-di-genere" className="inline-flex min-h-12 items-center gap-2 self-start rounded-full border border-white/25 px-6 font-semibold hover:bg-white hover:text-ink">
            Vai alla Compliance <ArrowUpRight aria-hidden className="h-4 w-4" />
          </Link>
        </Reveal>
      </Layer>

      <CtaBand prev={5} />
    </>
  );
}
