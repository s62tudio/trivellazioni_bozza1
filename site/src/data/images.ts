/**
 * REGISTRO IMMAGINI
 * ---------------------------------------------------------------
 * - photos.*   → fotografie AZIENDALI (dal sito precedente), /public/images/azienda
 * - images.*   → fotografie DIMOSTRATIVE (Unsplash), da usare solo dove
 *                mancano foto aziendali; vengono marcate "Foto dimostrativa".
 */

export type SiteImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  demo: boolean;
};

const demo = (file: string, alt: string, width: number, height: number): SiteImage => ({
  src: `/images/demo/${file}.jpg`,
  alt,
  width,
  height,
  demo: true,
});

export const images = {
  impiantoTubazioni: demo("impianto-tubazioni", "Tubazioni e valvole di un impianto", 1800, 1197),
} satisfies Record<string, SiteImage>;

/* ---------- Fotografie aziendali ---------- */
const own = (file: string, alt: string, width: number, height: number): SiteImage => ({
  src: `/images/azienda/${file}.jpg`,
  alt,
  width,
  height,
  demo: false,
});

export const photos = {
  heroRig: own("trivellazionitalia_home", "Perforatrice MAIT HR130 con il marchio Trivellazioni Italia", 1920, 960),
  rigHr130: own("trivellaziotalia_hr130", "Perforatrice MAIT HR130 di Trivellazioni Italia in cantiere", 1600, 1196),
  works: own("trivellazionitalia_lavori", "Perforatrice cingolata ed escavatore al lavoro in un cantiere collinare", 1920, 800),
  rigSun: own("trivellazionitalia_storia", "Antenna di una perforatrice controluce", 500, 760),
  rigPylon: own("trivellazionitalia_perforatrici", "Perforatrice e operatori in un cantiere recintato", 775, 576),
  rigCasing: own("trivellazionitalia_perforatrici2", "Operatori al lavoro sull'armatura di una fondazione", 761, 569),
  rigA: own("trivellazioni-italia-perforatrici", "Perforatrice idraulica per micropali ed escavatore in cantiere", 500, 500),
  rigB: own("trivellazioni-italia-perforatrici-1", "Perforatrice cingolata su un versante", 500, 500),
  rigC: own("trivellazioni-italia-perforatrici-2", "Perforatrice cingolata vicino a un elettrodotto", 500, 500),
  rigD: own("trivellazioni-italia-perforatrici-3", "Perforatrice in un piazzale industriale", 500, 500),
  rigE: own("trivellazioni-italia-perforatrici-4", "Perforatrice sotto un traliccio dell'alta tensione", 500, 500),
  rigF: own("trivellazioni-italia-perforatrici-5", "Perforatrice e betoniera in un cantiere collinare", 500, 500),
  rigSm6: own("trivellazioni-italia-perforatrici-6", "Perforatrice e gru cingolata in cantiere", 500, 500),
  excavatorA: own("movimento-terra-trivellazioni-italia", "Escavatore cingolato che scarica materiale in uno scavo", 1024, 600),
  excavatorB: own("movimento-terra-trivellazionitalia", "Escavatore che lavora su un fronte di scavo", 1024, 600),
  droneA: own("drone1", "Vista dall'alto di un cantiere di fondazione con perforatrice", 775, 517),
  droneB: own("drone2", "Vista dall'alto di un plinto con armature", 776, 520),
  droneC: own("drone3", "Vista dall'alto di un cantiere di pali di fondazione", 785, 508),
  piles: own("pali-trivellazioni-italia", "Cantiere di pali di fondazione visto dall'alto", 1024, 600),
  solar: own("fotovoltaico-2", "Impianto fotovoltaico su copertura", 1600, 900),
  building: own("lavori-edili", "Lavori edili su una volta in pietra", 400, 400),
  fesr: own("digitalizzazione-e-industria4", "Cartellone del progetto Digitalizzazione e Industria 4.0 cofinanziato dal FESR", 1162, 1680),
} satisfies Record<string, SiteImage>;
