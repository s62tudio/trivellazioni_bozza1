import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { company, siteUrl } from "@/data/site";
import { services } from "@/data/content";

/** Dati strutturati (schema.org) dell'impresa, validi per tutto il sito. */
const organization = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "@id": `${siteUrl}/#impresa`,
  name: company.name,
  legalName: company.legalName,
  slogan: company.motto,
  url: siteUrl,
  logo: `${siteUrl}/brand/logo-trivellazioni-italia.png`,
  image: `${siteUrl}/images/azienda/trivellazionitalia_home.jpg`,
  foundingDate: "1990",
  telephone: "+39 0823 1490691",
  email: company.email,
  vatID: "IT01431620622",
  areaServed: { "@type": "Country", name: "Italia" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via Marzano snc",
    postalCode: "82030",
    addressLocality: "Campoli del Monte Taburno",
    addressRegion: "BN",
    addressCountry: "IT",
  },
  location: {
    "@type": "Place",
    name: "Sede operativa",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Via Domenico Izzo 24",
      postalCode: "82011",
      addressLocality: "Airola",
      addressRegion: "BN",
      addressCountry: "IT",
    },
  },
  makesOffer: services.map((s) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: s.title, description: s.intro, url: `${siteUrl}/servizi/${s.slug}` },
  })),
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
