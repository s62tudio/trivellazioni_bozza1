import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { company, seo, siteUrl } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: seo.title, template: `%s | ${company.name}` },
  description: seo.description,
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: company.name,
    title: seo.title,
    description: seo.description,
    images: [{ url: "/images/azienda/trivellazionitalia_home.jpg", width: 1920, height: 960 }],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#141618",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${fontDisplay.variable} ${fontSans.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
        >
          Vai al contenuto
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
