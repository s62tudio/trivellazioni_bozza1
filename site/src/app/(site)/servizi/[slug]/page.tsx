import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { gallery, services, type GalleryCategory } from "@/data/content";
import { photos, type SiteImage } from "@/data/images";
import { PageHero } from "@/components/pages/PageHero";
import { CtaBand } from "@/components/pages/CtaBand";
import { ServiceSections } from "@/components/pages/ServiceSections";
import { Layer, isDark, type Level } from "@/components/layout/Layer";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { CoreImage } from "@/components/home/Stratum";
import { Eyebrow } from "@/components/ui/primitives";
import { MaskLines, Reveal } from "@/components/ui/Reveal";

/** Per ogni servizio: strato di colore, terza foto dell'hero, categorie di galleria collegate */
const extra: Record<string, { level: Level; core?: SiteImage; categories: GalleryCategory[] }> = {
  "trivellazioni-risanamento-idrogeologico": { level: 2, core: photos.droneA, categories: ["Perforatrici", "Visti dall'alto"] },
  "movimento-terra": { level: 3, core: photos.works, categories: ["Escavatori"] },
  impiantistica: { level: 4, categories: [] },
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  return s ? { title: s.title, description: s.intro, alternates: { canonical: `/servizi/${s.slug}` } } : {};
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();
  const { level, core, categories } = extra[s.slug];
  const dark = isDark(level);
  const related = gallery.filter((g) => categories.includes(g.category));
  const others = services.filter((x) => x.slug !== s.slug);

  return (
    <>
      <PageHero
        eyebrow={`Servizio ${s.number}`}
        title={s.title}
        lead={s.intro}
        crumbs={[{ label: "Home", href: "/" }, { label: "Servizi" }, { label: s.shortTitle }]}
        cores={core ? [s.thumb, s.image, core] : [s.thumb, s.image]}
      >
        <ul className="flex flex-wrap gap-2">
          {s.keywords.map((k) => (
            <li key={k} className="rounded-full border border-ink/20 px-3.5 py-1.5 text-sm font-medium">{k}</li>
          ))}
        </ul>
      </PageHero>

      <Layer level={level} prev={0} label="Approfondimento">
        <ServiceSections sections={s.sections} dark={dark} />
      </Layer>

      {related.length > 0 && (
        <Layer level={6} prev={level} label="Dal cantiere">
          <div className="mb-8">
            <Reveal><Eyebrow tone="light">Dal cantiere</Eyebrow></Reveal>
            <h2 className="font-display mt-4 text-[clamp(3rem,6vw,5.5rem)] font-black uppercase leading-[0.88] text-white">
              <MaskLines lines={["Mezzi e", <span key="b" className="text-brand-300">lavori.</span>]} />
            </h2>
          </div>
          <GalleryGrid items={related} limit={8} />
        </Layer>
      )}

      {/* Altri servizi */}
      <Layer level={5} prev={related.length ? 6 : level} label="Altri servizi">
        <Reveal><Eyebrow tone="light">Altri servizi</Eyebrow></Reveal>
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/servizi/${o.slug}`} className="group flex items-center gap-6 rounded-[28px] border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10">
                <CoreImage src={o.image.src} alt="" className="h-32 w-16 shrink-0" sizes="64px" />
                <span className="flex-1">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-300">Servizio {o.number}</span>
                  <span className="font-display mt-1 block text-3xl font-extrabold uppercase leading-none">{o.title}</span>
                </span>
                <ArrowUpRight aria-hidden className="h-6 w-6 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </Layer>

      <CtaBand prev={5} />
    </>
  );
}
