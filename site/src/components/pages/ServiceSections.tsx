import type { ServiceSection } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";

type Block =
  | { kind: "lead"; s: ServiceSection }
  | { kind: "list"; s: ServiceSection }
  | { kind: "tiles"; items: ServiceSection[] }
  | { kind: "feature"; s: ServiceSection };

/** Raggruppa le sezioni in blocchi di impaginazione diversi. */
function toBlocks(sections: ServiceSection[]): Block[] {
  const out: Block[] = [];
  sections.forEach((s, i) => {
    const short = !!s.text && !s.items && s.text.length < 220;
    if (i === 0 && s.text && !s.items) return out.push({ kind: "lead", s });
    if (short) {
      const last = out[out.length - 1];
      if (last?.kind === "tiles") last.items.push(s);
      else out.push({ kind: "tiles", items: [s] });
      return;
    }
    if (s.items && !s.text) return out.push({ kind: "list", s });
    out.push({ kind: "feature", s });
  });
  return out;
}

/** Contenuti di approfondimento di un servizio. */
export function ServiceSections({ sections, dark }: { sections: ServiceSection[]; dark: boolean }) {
  const muted = dark ? "text-white/75" : "text-ink/75";
  const line = dark ? "border-white/20" : "border-ink/20";
  const tile = dark ? "bg-white/8 border-white/10" : "bg-white/35 border-ink/10";
  const num = dark ? "text-brand-300" : "text-ink";
  let featureCount = 0;

  return (
    <div className="space-y-24">
      {toBlocks(sections).map((b, k) => {
        if (b.kind === "lead")
          return (
            <div key={k} className="grid gap-8 lg:grid-cols-12">
              <h2 className="font-display text-[clamp(2.4rem,4.5vw,4rem)] font-black uppercase leading-[0.9] lg:col-span-5">{b.s.title}</h2>
              <Reveal className={`text-xl leading-relaxed lg:col-span-6 lg:col-start-7 ${muted}`}>
                <p>{b.s.text}</p>
              </Reveal>
            </div>
          );

        if (b.kind === "list")
          return (
            <div key={k} className="grid gap-8 lg:grid-cols-12">
              <h2 className="font-display text-[clamp(2.2rem,4vw,3.6rem)] font-black uppercase leading-[0.9] lg:col-span-5">{b.s.title}</h2>
              <ol className={`border-t lg:col-span-7 ${line}`}>
                {b.s.items!.map((it, i) => (
                  <li key={it} className={`flex gap-5 border-b py-5 ${line}`}>
                    <span className={`font-display w-8 shrink-0 text-2xl font-black ${num}`}>{String(i + 1).padStart(2, "0")}</span>
                    <Reveal delay={i * 0.04} className="text-lg">{it}</Reveal>
                  </li>
                ))}
              </ol>
            </div>
          );

        if (b.kind === "tiles")
          return (
            <ul key={k} className="grid gap-3 sm:grid-cols-2">
              {b.items.map((s, i) => (
                <li key={s.title}>
                  <Reveal delay={i * 0.06} className={`h-full rounded-[28px] border p-7 ${tile}`}>
                    <span className={`font-display text-sm font-bold ${num}`}>{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="font-display mt-2 text-3xl font-extrabold uppercase">{s.title}</h3>
                    <p className={`mt-3 ${muted}`}>{s.text}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          );

        const flip = featureCount++ % 2 === 1;
        return (
          <article key={k} className={`grid gap-8 border-t pt-12 lg:grid-cols-12 ${line}`}>
            <h2 className={`font-display text-[clamp(2.2rem,4vw,3.6rem)] font-black uppercase leading-[0.9] lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}>{b.s.title}</h2>
            <Reveal className={`lg:col-span-6 ${flip ? "lg:order-1" : "lg:col-start-7"}`}>
              {b.s.text && <p className={`text-lg leading-relaxed ${muted}`}>{b.s.text}</p>}
              {b.s.items && (
                <ul className="mt-6 space-y-3">
                  {b.s.items.map((it) => (
                    <li key={it} className="flex gap-3">
                      <span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-brand" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          </article>
        );
      })}
    </div>
  );
}
