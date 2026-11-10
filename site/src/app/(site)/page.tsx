import { Surface } from "@/components/home/Surface";
import { DepthRail } from "@/components/home/DepthRail";
import { IntroStratum } from "@/components/home/IntroStratum";
import { ServiceStratum } from "@/components/home/ServiceStratum";
import { TimelineStratum } from "@/components/home/TimelineStratum";
import { Nucleus } from "@/components/home/Nucleus";
import { services } from "@/data/content";

/**
 * HOMEPAGE — direzione "Carotaggio" (versione F) con navbar a pillola
 * e riquadri finali ispirati alla versione E.
 * Scorrendo si scende dalla superficie al nucleo: ogni strato è un capitolo.
 */
export default function HomePage() {
  return (
    <>
      <DepthRail />
      <Surface />
      <IntroStratum />
      {services.map((s, i) => (
        <ServiceStratum key={s.slug} index={i} />
      ))}
      <TimelineStratum />
      <Nucleus />
    </>
  );
}
