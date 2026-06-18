import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { site, SITE_URL } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { SmoothScroll } from "@/components/SmoothScroll";
import { localBusinessJsonLd } from "@/lib/jsonld";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "hardwood floor refinishing",
    "hardwood floor installation",
    "floor sanding",
    "screen and coat",
    "Montgomery County MD",
    "Bethesda",
    "Rockville",
    "Silver Spring",
    "Potomac",
    "Gaithersburg",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  // Site-wide Open Graph + Twitter defaults so every page produces a rich link
  // preview. Pages can override these; the share image is a real after photo.
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    locale: "en_US",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Refinished hardwood floor by CDS Hardwood Floors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        {/* Site-wide LocalBusiness structured data. */}
        <JsonLd data={localBusinessJsonLd()} />
        <SmoothScroll>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
