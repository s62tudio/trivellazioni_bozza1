import Image from "next/image";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { company, navigation } from "@/data/site";
import { services } from "@/data/content";
import { Year } from "./Year";

export function Footer() {
  const pages = navigation.filter((n) => !n.children);

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      {/* Fascia stratigrafica: i colori degli strati attraversati */}
      <div aria-hidden className="flex h-1.5">
        {["#eef1ef", "#ddd2bd", "#c5b69b", "#6f624b", "#3a342c", "#059ad5"].map((c) => (
          <span key={c} className="flex-1" style={{ backgroundColor: c }} />
        ))}
      </div>

      <div className="mx-auto max-w-[1300px] px-5 pb-10 pt-20 sm:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Image src="/brand/logo-trivellazioni-italia.png" alt={company.name} width={538} height={210} className="h-14 w-auto" />
            <p className="mt-6 max-w-xs text-white/60">Trivellazioni, risanamento idrogeologico, movimento terra e impiantistica.</p>
          </div>

          <nav aria-label="Pagine" className="lg:col-span-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">Azienda</h2>
            <ul className="mt-5 space-y-3">
              {pages.map((p) => (
                <li key={p.href}><Link href={p.href} className="text-white/70 transition-colors hover:text-white">{p.label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Servizi" className="lg:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">Servizi</h2>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s.slug}><Link href={`/servizi/${s.slug}`} className="text-white/70 transition-colors hover:text-white">{s.title}</Link></li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">Contatti</h2>
            <address className="mt-5 space-y-3 not-italic text-white/70">
              <p><span className="block text-xs uppercase tracking-[0.14em] text-white/45">Sede legale</span>{company.address}</p>
              <p><span className="block text-xs uppercase tracking-[0.14em] text-white/45">Sede operativa</span>{company.operationalAddress}</p>
              <p><a href={company.phoneHref} className="hover:text-white">{company.phone}</a></p>
              <p><a href={`mailto:${company.email}`} className="hover:text-white">{company.email}</a></p>
              <p><a href={`mailto:${company.pec}`} className="hover:text-white">PEC {company.pec}</a></p>
            </address>
          </div>
        </div>

        <p aria-hidden className="font-display text-outline mt-20 select-none whitespace-nowrap text-[15vw] font-black uppercase leading-[0.8] [--outline-width:1px] [--outline:rgba(255,255,255,0.14)] lg:text-[12.5vw]">
          Trivellazioni Italia
        </p>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© <Year /> {company.legalName} · {company.vat} · {company.sdi}</p>
          <p className="text-xs italic">{company.motto}</p>
          <Link href="/privacy-policy" className="transition-colors hover:text-white">Privacy policy</Link>
          <a href="#main" className="inline-flex items-center gap-2 transition-colors hover:text-white">
            Torna su <ArrowUp aria-hidden className="h-4 w-4 text-brand-300" />
          </a>
        </div>
      </div>
    </footer>
  );
}
