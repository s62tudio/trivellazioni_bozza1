/**
 * DATI AZIENDALI
 * ---------------------------------------------------------------
 * Fonte: sito aziendale precedente (trivellazionitalia.it), usato solo
 * come archivio di contenuti. I valori tra [parentesi quadre] restano
 * PLACEHOLDER da completare.
 */

export const siteUrl = "https://www.trivellazionitalia.it";

export const company = {
  name: "Trivellazioni Italia Srl",
  legalName: "Trivellazioni Italia S.r.l.",
  shortName: "Trivellazioni Italia",
  motto: "La nostra forza al vostro servizio in ogni direzione",
  sectors: ["Trivellazioni", "Risanamento idrogeologico", "Movimento terra", "Impiantistica"],
  address: "Via Marzano snc, 82030 Campoli del Monte Taburno (BN)",
  operationalAddress: "Via Domenico Izzo 24, 82011 Airola (BN)",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Via+Domenico+Izzo+24+82011+Airola+BN",
  phone: "0823 1490691",
  phoneHref: "tel:+3908231490691",
  email: "info@trivellazionitalia.it",
  emails: [
    { label: "Info generali", value: "info@trivellazionitalia.it" },
    { label: "Ufficio tecnico", value: "tecnico@trivellazionitalia.it" },
    { label: "Ufficio amministrativo", value: "amministrazione@trivellazionitalia.it" },
    { label: "Reclami", value: "reclami@trivellazionitalia.it" },
  ],
  pec: "trivellazioni.italia@pec.it",
  vat: "P.IVA 01431620622",
  sdi: "SDI M5UXCR1",
  social: [] as { label: string; href: string }[],
};

export const seo = {
  title: "Trivellazioni Italia Srl — Trivellazioni, risanamento idrogeologico, movimento terra, impiantistica",
  description:
    "Dal 1990 Trivellazioni Italia S.r.l. realizza pali di fondazione, micropali, tiranti e jet grouting, movimento terra e impianti. Sedi a Campoli del Monte Taburno e Airola (BN).",
};

export type NavItem = { label: string; href: string; children?: NavItem[] };

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Storia", href: "/storia" },
  {
    label: "Servizi",
    href: "/servizi/trivellazioni-risanamento-idrogeologico",
    children: [
      { label: "Trivellazioni e Risanamento Idrogeologico", href: "/servizi/trivellazioni-risanamento-idrogeologico" },
      { label: "Movimento Terra", href: "/servizi/movimento-terra" },
      { label: "Impiantistica", href: "/servizi/impiantistica" },
    ],
  },
  { label: "Certificazioni", href: "/certificazioni" },
  { label: "Compliance", href: "/compliance" },
  { label: "Galleria", href: "/galleria" },
  { label: "Contatti", href: "/contatti" },
];
