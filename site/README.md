# Trivellazioni Italia Srl — Sito web

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Motion · Lucide.

```bash
npm install
npm run dev      # sviluppo → http://localhost:3000
npm run build && npm run start   # produzione
```

## Dove si modificano i contenuti

| Cosa | File |
|---|---|
| Dati aziendali, recapiti, menu, SEO, dominio | `src/data/site.ts` |
| Servizi, numeri, timeline, certificazioni, galleria | `src/data/content.ts` |
| Fotografie (percorsi, alt, dimensioni) | `src/data/images.ts` |
| Colori e font (design tokens) | `src/app/globals.css` (`@theme`) |

**Placeholder**: ogni testo scritto tra `[parentesi quadre]` viene mostrato
evidenziato (tratteggio azzurro). Sostituendolo con il testo reale l'evidenziazione sparisce.
I numeri con `value: null` mostrano `00` finché non si inserisce il dato.

## Fotografie e documenti

- `public/images/azienda/` — fotografie aziendali (dal sito precedente)
- `public/images/certificazioni/` — anteprime dei certificati
- `public/documenti/` — PDF di certificazioni e compliance
- `public/images/demo/` — una sola foto dimostrativa residua (Impiantistica), marcata "Foto dimostrativa"

Per sostituire o aggiungere foto: copiarle in `public/images/azienda/` e registrarle in
`src/data/images.ts` (oggetto `photos`, `demo: false`).

## Pagine

Home · Storia · Servizi (3) · Certificazioni · Compliance · Galleria · Contatti · Privacy policy

## Da completare
- Collegamento del form contatti a un servizio di invio email
- Revisione della privacy policy (testo del sito precedente, da aggiornare)
- Foto in alta risoluzione e foto aziendali per l'Impiantistica
