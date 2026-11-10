import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { intro, stats } from "@/data/content";
import { company } from "@/data/site";
import { Eyebrow, Text } from "@/components/ui/primitives";
import { MaskLines, Reveal } from "@/components/ui/Reveal";
import { StatNumber } from "@/components/ui/StatNumber";
import { Stratum } from "./Stratum";

/** Strato 01: presentazione aziendale + numeri. */
export function IntroStratum() {
  return (
    <Stratum id="azienda">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow index="01">{intro.eyebrow}</Eyebrow>
          </Reveal>
          <h2 className="font-display mt-5 text-[clamp(3rem,6vw,5.5rem)] font-black uppercase leading-[0.88]">
            <MaskLines lines={["Chi lavora", "sotto la", "superficie."]} />
          </h2>
          <Reveal delay={0.15}>
            <blockquote className="mt-8 border-l-4 border-brand pl-5 text-lg font-medium italic text-ink/80">
              &ldquo;{company.motto}&rdquo;
            </blockquote>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7 lg:pt-10">
          <p className="text-xl leading-relaxed">{intro.lead}</p>
          <p className="mt-4 text-ink/70"><Text>{intro.body}</Text></p>
          <ul className="mt-8 grid gap-6 sm:grid-cols-3">
            {intro.highlights.map((h) => (
              <li key={h.title} className="border-t-2 border-ink pt-3">
                <p className="font-display text-2xl font-extrabold uppercase">{h.title}</p>
                <p className="mt-1 text-sm text-ink/70">{h.text}</p>
              </li>
            ))}
          </ul>
          <Link href="/storia" className="group mt-8 inline-flex items-center gap-2 border-b-2 border-current pb-1 font-semibold">
            La nostra storia
            <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>

      {/* Numeri aziendali */}
      <dl className="mt-20 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-ink/20 pt-10 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.07} className="flex flex-col">
            <dd className="font-display order-1 text-[clamp(3.6rem,7vw,6rem)] font-black leading-none">
              <StatNumber stat={s} />
            </dd>
            <dt className="order-2 mt-2 text-sm font-medium uppercase tracking-[0.14em] text-ink/65">{s.label}</dt>
          </Reveal>
        ))}
      </dl>
    </Stratum>
  );
}
