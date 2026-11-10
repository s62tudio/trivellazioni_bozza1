import type { Metadata } from "next";
import { gallery } from "@/data/content";
import { photos } from "@/data/images";
import { PageHero } from "@/components/pages/PageHero";
import { CtaBand } from "@/components/pages/CtaBand";
import { Layer } from "@/components/layout/Layer";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Galleria",
  description: "Perforatrici, escavatori e cantieri visti dall'alto: le fotografie dei mezzi e dei lavori di Trivellazioni Italia S.r.l.",
  alternates: { canonical: "/galleria" },
};

export default function GalleriaPage() {
  return (
    <>
      <PageHero
        eyebrow="Galleria"
        title="Il lavoro,"
        accent="in immagini."
        lead="Perforatrici, escavatori e cantieri visti dall'alto: i mezzi e i lavori di Trivellazioni Italia."
        crumbs={[{ label: "Home", href: "/" }, { label: "Galleria" }]}
        cores={[photos.rigC, photos.rigSun, photos.excavatorB]}
      >
        <p className="text-sm text-ink/75">{gallery.length} fotografie · filtra per categoria e apri a schermo intero</p>
      </PageHero>

      <Layer level={6} prev={0} label="Fotografie">
        <GalleryGrid />
      </Layer>

      <CtaBand prev={6} />
    </>
  );
}
