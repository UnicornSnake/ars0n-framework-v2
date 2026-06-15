/**
 * Metadata helpers. Centralizes canonical-URL and Open Graph construction so
 * every page's generateMetadata stays consistent.
 */

import type { Metadata } from "next";
import { site, SITE_URL } from "./site";

type PageMetaInput = {
  title: string;
  description: string;
  /** Path beginning with "/" — used for the canonical URL. */
  path: string;
  /** Optional OG image path; defaults to the hero render. */
  image?: string;
};

export function pageMetadata({ title, description, path, image }: PageMetaInput): Metadata {
  const canonical = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const ogImage = image ?? "/renders/master.jpg";

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: site.name,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
