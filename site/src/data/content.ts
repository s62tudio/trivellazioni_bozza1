/**
 * CONTENUTI DEL SITO
 * ---------------------------------------------------------------
 * Fonte: sito aziendale precedente (solo testi e informazioni).
 * I valori tra [parentesi quadre] sono placeholder ancora da completare.
 */
import { images, photos, type SiteImage } from "./images";

/* ---------- Servizi ---------- */
export type ServiceSection = { title: string; text?: string; items?: string[] };

export type Service = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  intro: string;
  detail: string;
  image: SiteImage;
  thumb: SiteImage;
  keywords: string[];
  /** Contenuti di approfondimento per la pagina dedicata */
  sections: ServiceSection[];
};

export const services: Service[] = [
  {
    slug: "trivellazioni-risanamento-idrogeologico",
    number: "01",
    title: "Trivellazioni e Risanamento Idrogeologico",
    shortTitle: "Trivellazioni",
    intro: "Pali di fondazione, micropali, tiranti, palancolati e jet grouting per fondazioni profonde e consolidamento dei terreni.",
    detail:
      "Le fondazioni su pali trasferiscono i carichi a strati di terreno profondi e portanti, oltre terreni soffici, falde o cavità, riducendo i cedimenti nel tempo.",
    image: photos.rigE,
    thumb: photos.rigA,
    keywords: ["Pali trivellati", "Pali infissi", "Micropali", "Tiranti", "Palancolati", "Jet grouting"],
    sections: [
      {
        title: "Cosa sono i pali di fondazione",
        text: "I pali di fondazione sono fondazioni indirette, dette anche profonde: trasmettono una parte non trascurabile del carico verticale per attrito lungo la superficie laterale e, in base al rapporto tra diametro e altezza, con la pressione sul piano di appoggio alla base. Si riducono così i cedimenti a lungo termine, sfruttando strati di terreno profondi e adeguatamente portanti, oltre terreni soffici e inadatti, falde o cavità.",
      },
      {
        title: "Quando si utilizzano",
        items: [
          "Per difetto di capacità portante del terreno affiorante",
          "Quando è tecnologicamente impossibile realizzare fondazioni superficiali (strutture offshore, terreni incoerenti soggetti a elevati gradienti di filtrazione)",
          "Per incompatibilità dei cedimenti di fondazioni superficiali con il tipo di struttura",
          "Quando occorre isolare le fondazioni da un terreno superficiale soggetto a erosione o ad altri fenomeni",
        ],
      },
      { title: "Pali trivellati", text: "Ottenuti per perforazione del terreno ed estrazione di un volume di terreno circa uguale a quello del palo." },
      { title: "Pali infissi", text: "Ottenuti per infissione, senza preventiva perforazione, mediante battitura, pressione statica o vibrazione alla punta." },
      { title: "Pali costruiti fuori opera", text: "Realizzati in cantiere e poi infissi nel terreno per battitura o mediante getto d'acqua in pressione." },
      { title: "Pali gettati in opera", text: "Variano in base al modo d'infissione della camicia metallica che fa da cassaforma: pali infissi per battitura e pali trivellati." },
      {
        title: "Micropali",
        text: "Pali trivellati con diametro tra 90 e 300 mm e lunghezza da 2 fino a 30 metri, con fusto in malta o miscela cementizia e armatura in tubo o profilato metallico. Classificati in base all'iniezione: a gravità, a bassa pressione, ad alta pressione con tubo valvolato.",
        items: [
          "Consolidamento dei terreni prima delle fondazioni dirette",
          "Ancoraggi e tiranti (barriere paramassi, contrasto al ribaltamento di paratie)",
          "Consolidamento di fondazioni dirette insufficienti",
          "Ripristino di fondazioni danneggiate (cedimenti differenziali, erosione di pile di ponti)",
        ],
      },
      {
        title: "Tiranti attivi, passivi e autoperforanti",
        text: "Impiegati nei consolidamenti e nel completamento delle opere di sostegno, provvisori o definitivi (consolidamento di frane o muri di sostegno). Si compongono di bulbo di ancoraggio, parte libera e testata; l'armatura è generalmente in trefoli o barre.",
      },
      {
        title: "Palancolati",
        text: "Per proteggere aree o zone di lavoro come argini e pontili: palancole in cemento armato centrifugato infisse con vibratore ad alta frequenza collegato alla gru, fino a formare una parete continua.",
      },
      {
        title: "Jet grouting",
        text: "Iniezione nel terreno di miscela cementizia attraverso piccoli ugelli, con pressioni fino a 600 atm: per consolidare fondazioni esistenti, formare blocchi di fondazione, creare trincee antisifone, impermeabilizzare e bonificare terreni.",
      },
    ],
  },
  {
    slug: "movimento-terra",
    number: "02",
    title: "Movimento Terra",
    shortTitle: "Movimento terra",
    intro: "Tutte le lavorazioni in cui si spostano con mezzi meccanici terra, detriti e inerti: dalle fondamenta alla modellazione dei terreni.",
    detail:
      "Mezzi di grande potenza, scelti in base al lavoro e alla natura del terreno, anche in zone montagnose e rocciose.",
    image: photos.excavatorB,
    thumb: photos.excavatorA,
    keywords: ["Escavatori", "Mini escavatori", "Terne", "Pale cingolate", "Ruspe"],
    sections: [
      {
        title: "Quando è necessario",
        text: "Il movimento terra è un passaggio importante nella fase iniziale dei lavori: una tecnica fondamentale per operazioni che vanno dal getto delle fondamenta alla costruzione di nuove strutture, alla demolizione di quelle esistenti o alla modellazione dei terreni.",
      },
      {
        title: "Le macchine da impiegare",
        text: "Servono macchinari di grande potenza e con funzionalità specifiche per movimentare i terreni più difficili e lavorare zone montagnose e rocciose. La scelta varia in base al tipo di lavoro e alla natura del terreno. Il materiale generato viene di norma riutilizzato per il riempimento dello scavo oppure smaltito secondo le procedure previste.",
      },
      {
        title: "Il parco macchine",
        items: ["Escavatori", "Mini escavatori di diversa portata e dimensione", "Terne", "Pale cingolate", "Ruspe"],
      },
    ],
  },
  {
    slug: "impiantistica",
    number: "03",
    title: "Impiantistica",
    shortTitle: "Impiantistica",
    intro: "Installazione, trasformazione, ampliamento e manutenzione degli impianti di cui all'Art. 1 del D.M. 37/2008.",
    detail: "Dagli impianti elettrici a quelli idrici, termici, del gas, di sollevamento e antincendio.",
    image: photos.solar,
    thumb: images.impiantoTubazioni,
    keywords: ["Elettrici", "Elettronici", "Climatizzazione", "Idrico-sanitari", "Gas", "Sollevamento", "Antincendio"],
    sections: [
      {
        title: "Impianti per cui l'azienda è abilitata (Art. 1, D.M. 37/2008)",
        items: [
          "Produzione, trasformazione, trasporto, distribuzione e utilizzazione dell'energia elettrica; protezione contro le scariche atmosferiche; automazione di porte, cancelli e barriere",
          "Impianti radiotelevisivi, antenne e impianti elettronici in genere",
          "Riscaldamento, climatizzazione, condizionamento e refrigerazione, comprese evacuazione dei prodotti della combustione, ventilazione e aerazione",
          "Impianti idrici e sanitari di qualsiasi natura o specie",
          "Distribuzione e utilizzazione di gas di qualsiasi tipo",
          "Sollevamento di persone o cose: ascensori, montacarichi, scale mobili e simili",
          "Impianti di protezione antincendio",
        ],
      },
    ],
  },
];

/* ---------- Numeri aziendali ---------- */
export type Stat = { label: string; value: number | null; suffix?: string; /** valore di partenza del contatore */ from?: number };

export const stats: Stat[] = [
  { label: "Anno di fondazione", value: 1990, from: 1960 },
  { label: "Certificazioni e attestazioni", value: 7 },
  { label: "Aree di servizio", value: 3 },
  { label: "Sedi in Campania", value: 2 },
];

/* ---------- Presentazione ---------- */
export const intro = {
  eyebrow: "L'azienda",
  title: ["Un'impresa", "che lavora", "sul campo."],
  lead:
    "Trivellazioni Italia S.r.l. opera nei settori delle trivellazioni, del risanamento idrogeologico, del movimento terra e dell'impiantistica.",
  body:
    "Nata nel 1990 come Trivellazioni Borselleca Rocco per la perforazione di pozzi artesiani, l'azienda è cresciuta fino a ricevere richieste da tutta Italia. Oggi realizza opere partendo dalle fondamenta e le completa con le proprie maestranze.",
  highlights: [
    { title: "Dal 1990", text: "Nel 1995 la prima macchina per pali di grande diametro, una MAIT T8, per i primi grandi cantieri in Campania." },
    { title: "Esperti del settore", text: "La voglia di aggiornamento ha portato l'azienda ad affacciarsi anche ad altri settori, con la perforazione di ultima generazione." },
    { title: "Soluzioni efficaci", text: "Soluzioni su misura delle esigenze dei clienti e risultati di altissimo livello." },
  ],
};

/* ---------- Timeline ---------- */
export type Milestone = {
  year: string;
  title: string;
  description: string;
  machinery?: string;
  items?: string[];
  image?: SiteImage;
};

export const timeline: Milestone[] = [
  {
    year: "1990",
    title: "Nasce Trivellazioni Borselleca Rocco",
    description:
      "Rocco Borselleca fonda l'azienda, che inizialmente si occupa esclusivamente di perforazione di pozzi artesiani. Già dai primi anni arrivano richieste di lavori importanti.",
    machinery: "Macchine a corda",
  },
  {
    year: "1995",
    title: "La prima macchina per pali di grande diametro",
    description:
      "Viene acquistata una MAIT T8, impiegata nei primi grandi cantieri in Campania. Da qui la crescita: richieste da tutta Italia, nuove perforatrici e personale specializzato.",
    machinery: "MAIT T8",
    image: photos.rigSun,
  },
  {
    year: "2008",
    title: "Arriva Pellegrino, nasce Trivellazioni Italia S.r.l.",
    description:
      "Entra in azienda il figlio di Rocco, Pellegrino, che porta nuove idee fino a fondare Trivellazioni Italia S.r.l. Si apre un nuovo periodo di crescita, con nuove lavorazioni di grande e piccola perforazione.",
    items: [
      "Pali di grande diametro",
      "Diaframmi",
      "Pali battuti",
      "Pali in sabbia",
      "Dreni verticali",
      "Elica continua",
      "Pali marittimi",
      "Pali FDP e secanti",
      "Micropali",
      "Tiranti",
      "Jet grouting",
      "Iniezioni",
      "Infilaggi",
      "VTR",
    ],
    image: photos.droneC,
  },
  {
    year: "Oggi",
    title: "Dalle fondamenta al completamento",
    description:
      "Oltre alla trivellazione, l'azienda opera nel movimento terra, nelle costruzioni edili e nell'impiantistica: realizza opere partendo dalle fondamenta e le completa con le proprie maestranze.",
    image: photos.heroRig,
  },
];

/* ---------- Certificazioni ---------- */
export type Certification = {
  code: string;
  title: string;
  description: string;
  image?: string;
  pdf?: string;
};

export const certifications: Certification[] = [
  { code: "SOA", title: "Attestazione SOA", description: "Qualificazione per l'esecuzione di lavori pubblici.", image: "/images/certificazioni/soa.webp", pdf: "/documenti/attestazione-soa.pdf" },
  { code: "ISO 9001", title: "ISO 9001:2015", description: "Sistema di gestione per la qualità.", image: "/images/certificazioni/iso-9001-2015.webp", pdf: "/documenti/iso-9001.pdf" },
  { code: "ISO 14001", title: "ISO 14001", description: "Sistema di gestione ambientale.", image: "/images/certificazioni/iso-14001.webp", pdf: "/documenti/iso-14001.pdf" },
  { code: "ISO 45001", title: "ISO 45001", description: "Sistema di gestione per la salute e sicurezza sul lavoro.", image: "/images/certificazioni/iso-45001.webp", pdf: "/documenti/iso-45001.pdf" },
  { code: "ISO 37001", title: "ISO 37001", description: "Sistema di gestione per la prevenzione della corruzione.", image: "/images/certificazioni/iso-37001.webp", pdf: "/documenti/iso-37001.pdf" },
  { code: "ISO 39001", title: "ISO 39001", description: "Sistema di gestione per la sicurezza stradale.", image: "/images/certificazioni/iso-39001.webp", pdf: "/documenti/iso-39001.pdf" },
  { code: "PdR 125", title: "UNI/PdR 125:2022", description: "Sistema di gestione per la parità di genere.", image: "/images/certificazioni/pdr.webp", pdf: "/documenti/pdr-125.pdf" },
];

export const certificationsIntro =
  "La sostenibilità e la sicurezza sono le nostre priorità: per questo forniamo servizi di trivellazione di altissima qualità in modo responsabile.";

/* ---------- Galleria (categorie del sito originale) ---------- */
export const galleryCategories = ["Tutte", "Perforatrici", "Escavatori", "Visti dall'alto"] as const;
export type GalleryCategory = Exclude<(typeof galleryCategories)[number], "Tutte">;

export type GalleryItem = { image: SiteImage; category: GalleryCategory; title: string };

export const gallery: GalleryItem[] = [
  { image: photos.heroRig, category: "Perforatrici", title: "MAIT HR130" },
  { image: photos.droneA, category: "Visti dall'alto", title: "Cantiere di fondazione" },
  { image: photos.rigSun, category: "Perforatrici", title: "In quota" },
  { image: photos.excavatorB, category: "Escavatori", title: "Fronte di scavo" },
  { image: photos.works, category: "Perforatrici", title: "Perforazione e scavo" },
  { image: photos.rigE, category: "Perforatrici", title: "Sotto l'elettrodotto" },
  { image: photos.droneB, category: "Visti dall'alto", title: "Armatura del plinto" },
  { image: photos.rigF, category: "Perforatrici", title: "Getto in collina" },
  { image: photos.excavatorA, category: "Escavatori", title: "Scavo" },
  { image: photos.rigA, category: "Perforatrici", title: "Micropali" },
  { image: photos.droneC, category: "Visti dall'alto", title: "Campo pali" },
  { image: photos.rigPylon, category: "Perforatrici", title: "In cantiere" },
  { image: photos.rigB, category: "Perforatrici", title: "Sul versante" },
  { image: photos.rigCasing, category: "Perforatrici", title: "Armature" },
  { image: photos.rigC, category: "Perforatrici", title: "Linea elettrica" },
  { image: photos.rigD, category: "Perforatrici", title: "Piazzale" },
  { image: photos.rigSm6, category: "Perforatrici", title: "Con la gru" },
];

/* ---------- Compliance ---------- */
export const compliance = {
  intro:
    "In questo portale è presente l'estratto del modello organizzativo D. Lgs. 231/2001 con finalità informative per i terzi interessati, non sostitutivo della versione integrale disponibile presso la società.",
  odv: {
    text: "La società ha affidato a un Organismo di Vigilanza il compito di vigilare sull'osservanza delle prescrizioni del Modello Organizzativo, verificarne la reale efficacia e valutare la necessità di aggiornamenti.",
    email: "odv@trivellazionitalia.it",
  },
  documents: [
    { title: "Modello 231 — Parte Generale", href: "/documenti/modello-231-parte-generale.pdf" },
    { title: "Codice Etico", href: "/documenti/codice-etico.pdf" },
    { title: "Procedura Whistleblowing", href: "/documenti/whistleblowing.pdf" },
  ],
  whistleblowing: {
    text: "Con il D. Lgs. 10.3.2023 n. 24 è stata data attuazione alla direttiva (UE) 2019/1937 sulla protezione delle persone che segnalano violazioni. Per la segnalazione degli illeciti la società ha adottato un canale dedicato.",
    url: "https://trivellazionitalia.segnalazioni.online",
  },
  gender: {
    text: "Trivellazioni Italia S.r.l. sostiene i valori della parità di genere attraverso meccanismi societari, organizzativi e gestionali improntati al rispetto dei diritti, della libertà e della dignità delle persone, e si è dotata di un Sistema di Gestione UNI/PdR 125:2022.",
    image: "/images/certificazioni/politica-parita-di-genere.png",
  },
  fesr: {
    title: "Digitalizzazione e Industria 4.0",
    text: "Fondo Regionale per la Crescita Campania (FRC) — Asse III, Obiettivo specifico 3.1, Azione 3.1.1: aiuti per investimenti in macchinari, impianti e beni intangibili. Progetto cofinanziato dal Fondo Europeo di Sviluppo Regionale.",
    image: photos.fesr,
  },
};


/* ---------- Storia (pagina dedicata) ---------- */
export const history = {
  lead: "Dal 1990 un'impresa di famiglia che è cresciuta perforazione dopo perforazione, fino a operare in tutta Italia.",
  chapters: [
    {
      kicker: "Le origini",
      title: "Pozzi artesiani e macchine a corda",
      text: [
        "L'azienda nasce nel 1990 con Rocco Borselleca, sotto il nome di Trivellazioni Borselleca Rocco. Inizialmente si occupa esclusivamente di perforazione di pozzi artesiani con l'utilizzo di alcune macchine a corda.",
        "Già dai primi anni si trova ad affrontare diversi lavori e richieste importanti. Questa situazione porta Rocco a investire nell'azienda: nel 1995 viene acquistata la prima macchina per pali di grande diametro, la MAIT T8, utilizzata per i primi grandi cantieri in Campania.",
      ],
    },
    {
      kicker: "Una crescita inarrestabile",
      title: "Richieste da tutta Italia",
      text: [
        "Da questo momento la crescita è inarrestabile, con richieste di lavori da tutta Italia. Per soddisfarle vengono acquistate altre macchine perforatrici, assunto personale specializzato e aumentate le conoscenze e l'esperienza nel mondo delle perforazioni.",
        "La cura dei particolari fa maturare la convinzione di ampliare e diversificare le attrezzature, proiettando l'azienda in una dimensione di grande visibilità in tutta Italia.",
      ],
    },
    {
      kicker: "La nuova generazione",
      title: "Nasce Trivellazioni Italia S.r.l.",
      text: [
        "Nel 2008 entra a far parte della società il giovanissimo figlio di Rocco, Pellegrino, che con forza di volontà e determinazione porta in azienda nuove idee, fino a decidere di fondare Trivellazioni Italia S.r.l.",
        "L'azienda affronta un nuovo periodo di crescita e di transizione, introducendo nuove lavorazioni senza trascurare la piccola perforazione.",
      ],
    },
  ],
  largeDrilling: ["Pali di grande diametro", "Diaframmi", "Pali battuti", "Pali in sabbia", "Dreni verticali", "Elica continua", "Pali marittimi", "Pali FDP e secanti"],
  smallDrilling: ["Micropali", "Tiranti", "Jet grouting", "Iniezioni semplici e valvolate con miscele cementizie e chimiche", "Infilaggi", "VTR"],
  today:
    "La voglia di aggiornamento spinge Trivellazioni Italia S.r.l. a essere sempre più performante nella trivellazione e a interessarsi ad altri settori: movimento terra, costruzioni edili e impiantistica. Tutto ciò le permette di realizzare opere partendo dalle fondamenta e completarle con le proprie maestranze.",
};
