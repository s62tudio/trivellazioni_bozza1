import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import privacy from "@/data/privacy.json";
import { PageHero } from "@/components/pages/PageHero";
import { Layer } from "@/components/layout/Layer";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "Informativa sul trattamento dei dati personali di Trivellazioni Italia S.r.l.",
  alternates: { canonical: "/privacy-policy" },
};

type Block = { type: "p" | "li"; text: string };
type Section = { title: string; blocks: Block[] };

const slug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function PrivacyPage() {
  const sections = privacy.sections as Section[];
  return (
    <>
      <PageHero eyebrow="Informativa" title="Privacy" accent="policy." crumbs={[{ label: "Home", href: "/" }, { label: "Privacy policy" }]} />

      <Layer level={1} prev={0} label="Testo dell'informativa">
        <div className="grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              {/* Avviso: testo da aggiornare per il nuovo sito */}
              <div role="note" className="ph not-italic rounded-[22px] p-5 text-sm leading-relaxed">
                <p className="flex items-center gap-2 font-semibold"><AlertTriangle aria-hidden className="h-4 w-4" /> Testo da verificare</p>
                <p className="mt-2">
                  Informativa ripresa dal sito precedente. Cita servizi non presenti nel nuovo sito (WhatsApp, consenso marketing, cookie di analisi):
                  va aggiornata e approvata dal consulente privacy prima della pubblicazione.
                </p>
              </div>
              <nav aria-label="Indice" className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/75">Indice</p>
                <ol className="mt-3 space-y-1.5 text-sm">
                  {sections.map((s) => (
                    <li key={s.title}><a href={`#${slug(s.title)}`} className="text-ink/75 hover:text-ink hover:underline">{s.title}</a></li>
                  ))}
                </ol>
              </nav>
            </div>
          </aside>

          <article className="max-w-3xl space-y-6 text-[17px] leading-relaxed text-ink/85 lg:col-span-8">
            {privacy.intro.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}
            {sections.map((s) => (
              <section key={s.title} id={slug(s.title)} className="scroll-mt-28 border-t border-ink/15 pt-8">
                <h2 className="font-display text-3xl font-extrabold uppercase">{s.title}</h2>
                <div className="mt-4 space-y-3">
                  {s.blocks.map((b, i) =>
                    b.type === "li" ? (
                      <p key={i} className="flex gap-3"><span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />{b.text}</p>
                    ) : (
                      <p key={i}>{b.text}</p>
                    ),
                  )}
                </div>
              </section>
            ))}
          </article>
        </div>
      </Layer>
    </>
  );
}
