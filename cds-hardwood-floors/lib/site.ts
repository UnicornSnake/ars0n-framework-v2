/**
 * Central site configuration. Single source of truth for NAP (name / address /
 * phone) data, which is reused across metadata, JSON-LD, header, and footer so
 * the business information stays consistent for SEO and local citations.
 */

export const PHONE_DISPLAY = "(240) 731-7030";
export const PHONE_E164 = "+12407317030";
export const PHONE_HREF = `tel:${PHONE_E164}`;

const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cdshardwoodfloors.com";
// Normalize: no trailing slash so we can compose canonical URLs predictably.
export const SITE_URL = RAW_SITE_URL.replace(/\/$/, "");

export const site = {
  name: "CDS Hardwood Floors",
  legalName: "CDS Hardwood Floors LLC",
  shortName: "CDS Hardwood Floors",
  tagline: "Hardwood Floor Refinishing & Installation in Montgomery County, MD",
  description:
    "CDS Hardwood Floors provides professional hardwood floor refinishing, sanding, screen-and-coat, and installation throughout Montgomery County, Maryland. MHIC licensed and insured, with a veteran discount.",
  url: SITE_URL,
  phoneDisplay: PHONE_DISPLAY,
  phoneE164: PHONE_E164,
  phoneHref: PHONE_HREF,
  email: "estimates@cdshardwoodfloors.com",
  mhicLicense: "MHIC Licensed & Insured",
  priceRange: "$$",
  areaServed: "Montgomery County, Maryland",
  address: {
    region: "MD",
    regionName: "Maryland",
    locality: "Montgomery County",
    country: "US",
  },
  // Approximate center of the service area (Rockville, MD) for geo metadata.
  geo: {
    latitude: 39.084,
    longitude: -77.1528,
  },
  hours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "08:00",
    closes: "18:00",
  },
  social: {
    // Placeholders — update with real profiles when available.
    facebook: "",
    instagram: "",
    google: "",
  },
} as const;

export type SiteConfig = typeof site;
