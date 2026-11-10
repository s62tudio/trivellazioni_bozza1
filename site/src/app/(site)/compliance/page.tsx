import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, FileText, Mail, ShieldAlert } from "lucide-react";
import { compliance } from "@/data/content";
import { PageHero } from "@/components/pages/PageHero";
import { Layer } from "@/components/layout/Layer";
import { Eyebrow } from "@/components/ui/primitives";
import { MaskLines, Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Compliance",
  description: "Modello organizzativo D. Lgs. 231/2001, Codice Etico, Organismo di Vigilanza, procedura Whistleblowing e politica per la parità di genere di Trivellazioni Italia S.r.l.",
  alternates: { canonical: "/compliance" },
};

const anchors = [
  { id: "modello-231", label: "Modello 231" },
  { id: "whistleblowing", label: "Whistleblowing" },
  { id: "parita-di-genere", label: "Parità di genere" },
  { id: "industria-4-0", label: "Industria 4.0" },
];

function DocRow({ title, href }: { title: string; href: string }) {
  return (
    <li>
      <a href={href} target="_blank" rel="noopener" className="group flex min-h-16 items-center gap-4 border-b border-current/15 py-4">
        <FileText aria-hidden className="h-6 w-6 shrink-0 text-brand-700" />
        <span className="flex-1 text-lg font-semibold">{title}</span>
        <span className="text-sm font-medium opacity-70">PDF</span>
        <ArrowUpRight aria-hidden className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </li>
  );
}

export default function CompliancePage() {
  const { odv, documents, whistleblowing, gender, fesr } = compliance;
  return (
    <>
      <PageHero eyebrow="Compliance" title="Compliance" accent="e trasparenza." lead={compliance.intro} crumbs={[{ label: "Home", href: "/" }, { label: "Compliance" }]}>
        <nav aria-label="Sezioni della pagina">
          <ul className="flex flex-wrap gap-2">
            {anchors.map((a) => (
              <li key={a.id}>
                <a href={`#${a.id}`} className="inline-flex min-h-11 items-center rounded-full border border-ink/20 px-4 text-sm font-semibold hover:bg-ink hover:text-white">{a.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {/* Modello 231 */}
      <Layer level={1} prev={0} id="modello-231" label="Modello 231">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal><Eyebrow index="01">D. Lgs. 231/2001</Eyebrow></Reveal>
            <h2 className="font-display mt-4 text-[clamp(2.8rem,5.5vw,5rem)] font-black uppercase leading-[0.88]">
              <MaskLines lines={["Modello", "organizzativo"]} />
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal className="text-lg leading-relaxed text-ink/80">
              <p>{odv.text}</p>
              <a href={`mailto:${odv.email}`} className="mt-6 inline-flex items-center gap-3 rounded-[22px] bg-ink px-5 py-4 font-semibold text-white hover:bg-brand">
                <Mail aria-hidden className="h-5 w-5" />
                <span><span className="block text-xs font-medium uppercase tracking-[0.14em] text-white/60">Organismo di Vigilanza</span>{odv.email}</span>
              </a>
            </Reveal>
            <ul className="mt-10 border-t border-current/15">
              {documents.filter((d) => !d.href.includes("whistleblowing")).map((d) => <DocRow key={d.href} {...d} />)}
            </ul>
          </div>
        </div>
      </Layer>

      {/* Whistleblowing */}
      <Layer level={2} prev={1} id="whistleblowing" label="Whistleblowing">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal><Eyebrow index="02">D. Lgs. 24/2023</Eyebrow></Reveal>
            <h2 className="font-display mt-4 text-[clamp(2.8rem,5.5vw,5rem)] font-black uppercase leading-[0.88]">
              <MaskLines lines={["Whistle-", "blowing"]} />
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal className="text-lg leading-relaxed text-ink/80"><p>{whistleblowing.text}</p></Reveal>
            <a href={whistleblowing.url} target="_blank" rel="noopener" className="group mt-6 flex items-center justify-between gap-4 rounded-[22px] bg-ink px-5 py-4 font-semibold text-white hover:bg-brand">
              <span className="flex items-center gap-3"><ShieldAlert aria-hidden className="h-5 w-5" /> Canale di segnalazione</span>
              <ArrowUpRight aria-hidden className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <ul className="mt-6 border-t border-current/15">
              {documents.filter((d) => d.href.includes("whistleblowing")).map((d) => <DocRow key={d.href} {...d} />)}
            </ul>
          </div>
        </div>
      </Layer>

      {/* Parità di genere */}
      <Layer level={4} prev={2} id="parita-di-genere" label="Parità di genere">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal><Eyebrow index="03" tone="light">UNI/PdR 125:2022</Eyebrow></Reveal>
            <h2 className="font-display mt-4 text-[clamp(2.8rem,5.5vw,5rem)] font-black uppercase leading-[0.88]">
              <MaskLines lines={["Parità", "di genere"]} />
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal className="text-lg leading-relaxed text-white/80"><p>{gender.text}</p></Reveal>
            <Reveal delay={0.1} className="mt-8 overflow-hidden rounded-[22px] bg-white p-3">
              <Image src={gender.image} alt="Politica aziendale per la parità di genere" width={1296} height={370} className="h-auto w-full" />
            </Reveal>
            <a href="/documenti/pdr-125.pdf" target="_blank" rel="noopener" className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 font-semibold text-ink hover:bg-brand hover:text-white">
              <FileText aria-hidden className="h-5 w-5" /> Certificato PdR 125 (PDF)
            </a>
          </div>
        </div>
      </Layer>

      {/* Industria 4.0 */}
      <Layer level={5} prev={4} id="industria-4-0" label={fesr.title}>
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal><Eyebrow index="04" tone="light">POR Campania FESR</Eyebrow></Reveal>
            <h2 className="font-display mt-4 text-[clamp(2.8rem,5.5vw,5rem)] font-black uppercase leading-[0.88]">
              <MaskLines lines={["Digitalizzazione", "e Industria 4.0"]} />
            </h2>
            <Reveal delay={0.1} className="mt-6 text-lg leading-relaxed text-white/80"><p>{fesr.text}</p></Reveal>
          </div>
          <Reveal delay={0.1} className="mx-auto w-full max-w-sm lg:col-span-4 lg:col-start-9">
            <Image src={fesr.image.src} alt={fesr.image.alt} width={fesr.image.width} height={fesr.image.height} className="h-auto w-full rounded-[22px]" sizes="(min-width:1024px) 380px, 90vw" />
          </Reveal>
        </div>
      </Layer>
    </>
  );
}
