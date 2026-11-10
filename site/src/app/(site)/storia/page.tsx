import type { Metadata } from "next";
import { company } from "@/data/site";
import { history, timeline } from "@/data/content";
import { photos } from "@/data/images";
import { PageHero } from "@/components/pages/PageHero";
import { CtaBand } from "@/components/pages/CtaBand";
import { Layer } from "@/components/layout/Layer";
import { TimelineTrack } from "@/components/home/TimelineTrack";
import { Eyebrow } from "@/components/ui/primitives";
import { MaskLines, Reveal } from "@/components/ui/Reveal";
import { CoreImage } from "@/components/home/Stratum";

export const metadata: Metadata = {
  title: "Storia",
  description: "Dal 1990 a oggi: da Trivellazioni Borselleca Rocco a Trivellazioni Italia S.r.l., la storia di un'impresa di famiglia cresciuta nella perforazione.",
  alternates: { canonical: "/storia" },
};

export default function StoriaPage() {
  return (
    <>
      <PageHero
        eyebrow="Storia"
        title="Dal 1990,"
        accent="strato dopo strato."
        lead={history.lead}
        crumbs={[{ label: "Home", href: "/" }, { label: "Storia" }]}
        cores={[photos.rigB, photos.rigSun, photos.droneC]}
      />

      {/* Capitoli */}
      <Layer level={1} prev={0} label="I capitoli della storia">
        <div className="space-y-24">
          {history.chapters.map((c, i) => (
            <article key={c.title} className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <Reveal>
                  <Eyebrow index={String(i + 1).padStart(2, "0")}>{c.kicker}</Eyebrow>
                </Reveal>
                <h2 className="font-display mt-4 text-[clamp(2.6rem,5vw,4.5rem)] font-black uppercase leading-[0.9]">
                  <MaskLines lines={[c.title]} />
                </h2>
              </div>
              <Reveal delay={0.1} className="space-y-4 text-lg leading-relaxed text-ink/80 lg:col-span-6 lg:col-start-7 lg:pt-8">
                {c.text.map((t) => (
                  <p key={t.slice(0, 20)}>{t}</p>
                ))}
              </Reveal>
            </article>
          ))}
          <Reveal>
            <blockquote className="font-display mx-auto max-w-4xl text-center text-[clamp(2rem,4vw,3.6rem)] font-black uppercase leading-[0.95]">
              &ldquo;{company.motto}&rdquo;
            </blockquote>
          </Reveal>
        </div>
      </Layer>

      {/* Timeline */}
      <Layer level={5} prev={1} label="Le tappe">
        <div className="mb-20 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal><Eyebrow index="04" tone="light">Le tappe</Eyebrow></Reveal>
            <h2 className="font-display mt-4 text-[clamp(3rem,6vw,5.5rem)] font-black uppercase leading-[0.88]">
              <MaskLines lines={["La carota", "del tempo."]} />
            </h2>
          </div>
        </div>
        <TimelineTrack items={timeline} />
      </Layer>

      {/* Lavorazioni */}
      <Layer level={2} prev={5} label="Le lavorazioni">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal><Eyebrow index="05">Le lavorazioni</Eyebrow></Reveal>
            <h2 className="font-display mt-4 text-[clamp(3rem,6vw,5.5rem)] font-black uppercase leading-[0.88]">
              <MaskLines lines={["Grande e", "piccola", "perforazione."]} />
            </h2>
            <Reveal delay={0.1} className="mt-10 flex gap-4">
              <CoreImage src={photos.rigE.src} alt={photos.rigE.alt} className="h-[300px] w-[120px]" />
              <CoreImage src={photos.rigA.src} alt={photos.rigA.alt} className="mt-12 h-[240px] w-[100px]" />
            </Reveal>
          </div>
          <div className="space-y-12 lg:col-span-6 lg:col-start-7">
            {[
              { t: "Grande perforazione", items: history.largeDrilling },
              { t: "Piccola perforazione", items: history.smallDrilling },
            ].map((g) => (
              <Reveal key={g.t}>
                <h3 className="font-display text-3xl font-extrabold uppercase">{g.t}</h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <li key={it} className="rounded-full border border-ink/25 bg-white/30 px-4 py-2 text-sm font-medium">{it}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
            <Reveal>
              <h3 className="font-display text-3xl font-extrabold uppercase">Oggi</h3>
              <p className="mt-4 text-lg leading-relaxed text-ink/80">{history.today}</p>
            </Reveal>
          </div>
        </div>
      </Layer>

      <CtaBand prev={2} />
    </>
  );
}
