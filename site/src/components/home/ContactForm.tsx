"use client";

import { useId, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { services } from "@/data/content";

type Errors = Partial<Record<"nome" | "email" | "messaggio" | "privacy", string>>;

/** Form contatti accessibile (etichette visibili, errori vicino al campo, focus sul primo errore). */
export function ContactForm() {
  const id = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    const next: Errors = {};
    if (!String(d.get("nome") ?? "").trim()) next.nome = "Inserisci nome e cognome.";
    const email = String(d.get("email") ?? "").trim();
    if (!email) next.email = "Inserisci un indirizzo email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "L'indirizzo email non sembra corretto.";
    if (String(d.get("messaggio") ?? "").trim().length < 10) next.messaggio = "Scrivi qualche parola in più sulla richiesta.";
    if (!d.get("privacy")) next.privacy = "È necessario accettare l'informativa privacy.";
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    // TODO: collegare l'invio a un servizio email / route API
    setSent(true);
  }

  const input =
    "mt-2 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-base text-white outline-none transition-colors placeholder:text-white/35 focus:border-brand-300 focus:bg-white/10 aria-[invalid=true]:border-red-400";
  const label = "text-xs font-semibold uppercase tracking-[0.14em] text-white/70";
  const err = "mt-1.5 text-sm text-red-300";

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <m.div key="ok" role="status" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-[420px] flex-col justify-center">
          <CheckCircle2 aria-hidden className="h-14 w-14 text-brand-300" strokeWidth={1.5} />
          <p className="font-display mt-5 text-4xl font-black uppercase">Richiesta pronta</p>
          <p className="mt-2 max-w-sm text-white/65">Form dimostrativo: l&apos;invio verrà collegato a un servizio email nella fase di sviluppo completo.</p>
          <button type="button" onClick={() => setSent(false)} className="mt-6 self-start text-sm font-semibold text-brand-300 underline underline-offset-4">Nuova richiesta</button>
        </m.div>
      ) : (
        <m.form key="form" noValidate onSubmit={onSubmit} exit={{ opacity: 0 }} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor={`${id}-nome`} className={label}>Nome e cognome *</label>
              <input id={`${id}-nome`} name="nome" autoComplete="name" className={input} aria-invalid={!!errors.nome} aria-describedby={errors.nome ? `${id}-nome-e` : undefined} />
              {errors.nome && <p id={`${id}-nome-e`} className={err}>{errors.nome}</p>}
            </div>
            <div>
              <label htmlFor={`${id}-az`} className={label}>Azienda / Ente</label>
              <input id={`${id}-az`} name="azienda" autoComplete="organization" className={input} />
            </div>
            <div>
              <label htmlFor={`${id}-email`} className={label}>Email *</label>
              <input id={`${id}-email`} name="email" type="email" autoComplete="email" className={input} aria-invalid={!!errors.email} aria-describedby={errors.email ? `${id}-email-e` : undefined} />
              {errors.email && <p id={`${id}-email-e`} className={err}>{errors.email}</p>}
            </div>
            <div>
              <label htmlFor={`${id}-tel`} className={label}>Telefono</label>
              <input id={`${id}-tel`} name="telefono" type="tel" autoComplete="tel" className={input} />
            </div>
          </div>
          <div>
            <label htmlFor={`${id}-srv`} className={label}>Servizio di interesse</label>
            <select id={`${id}-srv`} name="servizio" defaultValue="" className={`${input} cursor-pointer [&>option]:text-ink`}>
              <option value="">Seleziona…</option>
              {services.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
              <option value="altro">Altro</option>
            </select>
          </div>
          <div>
            <label htmlFor={`${id}-msg`} className={label}>Messaggio *</label>
            <textarea id={`${id}-msg`} name="messaggio" rows={4} className={`${input} resize-none`} aria-invalid={!!errors.messaggio} aria-describedby={errors.messaggio ? `${id}-msg-e` : undefined} />
            {errors.messaggio && <p id={`${id}-msg-e`} className={err}>{errors.messaggio}</p>}
          </div>
          <div>
            <label className="flex cursor-pointer items-start gap-3 text-sm text-white/75">
              <input type="checkbox" name="privacy" className="mt-0.5 h-5 w-5 shrink-0 accent-[#059ad5]" aria-invalid={!!errors.privacy} aria-describedby={errors.privacy ? `${id}-priv-e` : undefined} />
              <span>Ho letto l&apos;<a href="/privacy-policy" target="_blank" className="underline underline-offset-2 hover:text-white">informativa privacy</a> e acconsento al trattamento dei dati per gestire la richiesta. *</span>
            </label>
            {errors.privacy && <p id={`${id}-priv-e`} className={err}>{errors.privacy}</p>}
          </div>
          <button type="submit" className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-semibold text-ink transition-colors hover:bg-white hover:text-ink">
            Invia richiesta
            <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </m.form>
      )}
    </AnimatePresence>
  );
}
