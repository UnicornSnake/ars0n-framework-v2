/**
 * Structured-data builders. We emit a HomeAndConstructionBusiness (a subtype of
 * LocalBusiness) graph for strong local SEO, plus per-page Service and
 * BreadcrumbList helpers.
 */

import { site, SITE_URL } from "./site";
import type { Service } from "./services";
import type { Area } from "./areas";

const BUSINESS_ID = `${SITE_URL}/#business`;

/** The core LocalBusiness node, referenced by other nodes via @id. */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["HomeAndConstructionBusiness", "GeneralContractor"],
    "@id": BUSINESS_ID,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: SITE_URL,
    telephone: site.phoneE164,
    email: site.email,
    priceRange: site.priceRange,
    image: `${SITE_URL}/renders/master.jpg`,
    logo: `${SITE_URL}/icon.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: site.areaServed,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: site.hours.days,
        opens: site.hours.opens,
        closes: site.hours.closes,
      },
    ],
    knowsAbout: [
      "Hardwood floor refinishing",
      "Hardwood floor sanding",
      "Screen and coat",
      "Hardwood floor installation",
    ],
    slogan: site.tagline,
  };
}

/** Service node tied back to the business via provider @id. */
export function serviceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/services/${service.slug}/#service`,
    serviceType: service.name,
    name: service.name,
    description: service.summary,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "AdministrativeArea", name: site.areaServed },
  };
}

/** Per-city node so each service-area page has its own local relevance. */
export function areaJsonLd(area: Area) {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE_URL}/service-area/${area.slug}/#business`,
    name: `${site.name} — ${area.name}, MD`,
    parentOrganization: { "@id": BUSINESS_ID },
    description: `Hardwood floor refinishing, sanding, screen-and-coat, and installation serving ${area.name}, ${area.region}.`,
    url: `${SITE_URL}/service-area/${area.slug}`,
    telephone: site.phoneE164,
    image: `${SITE_URL}/renders/master.jpg`,
    areaServed: {
      "@type": "City",
      name: area.name,
      containedInPlace: { "@type": "AdministrativeArea", name: site.areaServed },
    },
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };
}
