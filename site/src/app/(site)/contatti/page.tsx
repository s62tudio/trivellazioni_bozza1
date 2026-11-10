import type { Metadata } from "next";
import { ArrowUpRight, Building2, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { company } from "@/data/site";
import { PageHero } from "@/components/pages/PageHero";
import { Layer } from "@/components/layout/Layer";
import { ContactForm } from "@/components/home/ContactForm";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contatti",
  description: "Contatta Trivellazioni Italia S.r.l.: sede operativa ad Airola (BN), sede legale a Campoli del Monte Taburno (BN), telefono 0823 1490691.",
  alternates: { canonical: "/contatti" },
};

const maps = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

const tile = "rounded-[28px] border border-white/10 bg-anthracite p-7";

export default function ContattiPage() {
  const sedi = [
    { icon: MapPin, label: "Sede operativa", value: company.operationalAddress },
    { icon: Building2, label: "Sede legale", value: company.address },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contatti"
        title="Parliamo"
        accent="del vostro cantiere."
        lead="Hai un progetto? Ottieni una consulenza gratuita."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contatti" }]}
      >
        <div className="flex flex-wrap gap-3">
          <a href={company.phoneHref} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-brand px-6 font-semibold text-ink hover:bg-ink hover:text-white">
            <Phone aria-hidden className="h-5 w-5" /> {company.phone}
          </a>
          <a href={`mailto:${company.email}`} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ink/25 px-6 font-semibold hover:bg-ink hover:text-white">
            <Mail aria-hidden className="h-5 w-5" /> Scrivici
          </a>
        </div>
      </PageHero>

      <Layer level={6} prev={0} label="Recapiti e modulo di contatto">
        <div className="grid gap-3 lg:grid-cols-12">
          {/* Sedi */}
          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-12">
            {sedi.map(({ icon: Icon, label, value }, i) => (
              <Reveal key={label} delay={i * 0.06} className={`${tile} flex flex-col`}>
                <Icon aria-hidden className="h-7 w-7 text-brand-300" />
                <h2 className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">{label}</h2>
                <p className="font-display mt-2 text-3xl font-extrabold uppercase leading-tight">{value}</p>
                <a href={maps(value)} target="_blank" rel="noopener" className="group mt-6 inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-white/25 px-5 text-sm font-semibold hover:bg-white hover:text-ink">
                  Indicazioni stradali <ArrowUpRight aria-hidden className="h-4 w-4" />
                </a>
              </Reveal>
            ))}
          </div>

          {/* Recapiti */}
          <Reveal className="flex flex-col rounded-[28px] bg-brand p-7 text-ink lg:col-span-5">
            <h2 className="font-display text-4xl font-black uppercase">Recapiti</h2>
            <dl className="mt-6 space-y-4">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/65">Telefono</dt>
                <dd className="text-lg font-semibold"><a href={company.phoneHref} className="hover:underline">{company.phone}</a></dd>
              </div>
              {company.emails.map((e) => (
                <div key={e.value}>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/65">{e.label}</dt>
                  <dd className="break-words font-medium"><a href={`mailto:${e.value}`} className="hover:underline">{e.value}</a></dd>
                </div>
              ))}
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/65">PEC</dt>
                <dd className="break-words font-medium"><a href={`mailto:${company.pec}`} className="hover:underline">{company.pec}</a></dd>
              </div>
            </dl>
            <div className="mt-auto flex items-start gap-3 border-t border-ink/20 pt-5 text-sm">
              <ShieldCheck aria-hidden className="mt-0.5 h-5 w-5 shrink-0" />
              <p>{company.legalName}<br />{company.vat} · {company.sdi}</p>
            </div>
          </Reveal>

          {/* Modulo */}
          <Reveal delay={0.1} className={`${tile} sm:p-10 lg:col-span-7`}>
            <h2 className="font-display text-4xl font-black uppercase">Scrivici</h2>
            <p className="mt-2 text-white/65">Compila il modulo per ricevere maggiori informazioni sui nostri servizi.</p>
            <div className="mt-8"><ContactForm /></div>
          </Reveal>
        </div>
      </Layer>
    </>
  );
}
