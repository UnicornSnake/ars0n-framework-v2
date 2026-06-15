/**
 * Service-area catalog. Drives the per-city static pages
 * (generateStaticParams), local SEO metadata, and area JSON-LD.
 */

export type Area = {
  slug: string;
  name: string;
  /** County/region line shown under the city name. */
  region: string;
  /** ZIP codes served, used in copy and structured data. */
  zips: string[];
  /** Short, location-specific intro copy. */
  intro: string;
  /** Local landmarks / neighborhoods for natural local relevance. */
  neighborhoods: string[];
};

export const areas: Area[] = [
  {
    slug: "bethesda",
    name: "Bethesda",
    region: "Montgomery County, MD",
    zips: ["20814", "20816", "20817"],
    intro:
      "From the historic homes near downtown Bethesda to newer builds in Bradley Hills, we refinish and install hardwood floors across the Bethesda area with the care these properties deserve.",
    neighborhoods: ["Downtown Bethesda", "Bradley Hills", "Glen Echo Heights", "Westmoreland Hills"],
  },
  {
    slug: "rockville",
    name: "Rockville",
    region: "Montgomery County, MD",
    zips: ["20850", "20851", "20852", "20853"],
    intro:
      "Rockville's mix of mid-century homes and new developments keeps our crews busy refinishing original oak and installing fresh hardwood throughout the city and surrounding neighborhoods.",
    neighborhoods: ["King Farm", "Twinbrook", "Rockville Town Center", "Fallsmead"],
  },
  {
    slug: "silver-spring",
    name: "Silver Spring",
    region: "Montgomery County, MD",
    zips: ["20901", "20902", "20903", "20910"],
    intro:
      "Silver Spring is full of classic homes with hardwood worth saving. We restore worn original floors and install new hardwood across the downtown core and surrounding neighborhoods.",
    neighborhoods: ["Downtown Silver Spring", "Woodside", "Sligo Park Hills", "Forest Glen"],
  },
  {
    slug: "potomac",
    name: "Potomac",
    region: "Montgomery County, MD",
    zips: ["20854", "20859"],
    intro:
      "Potomac's larger homes call for premium hardwood work — wide-plank installations, custom stains, and meticulous refinishing. We deliver finish quality that matches the neighborhood.",
    neighborhoods: ["Potomac Village", "Avenel", "Falconhurst", "River Falls"],
  },
  {
    slug: "gaithersburg",
    name: "Gaithersburg",
    region: "Montgomery County, MD",
    zips: ["20877", "20878", "20879", "20882"],
    intro:
      "From Kentlands to Olde Towne, we help Gaithersburg homeowners refinish tired floors and install new hardwood that stands up to busy family life.",
    neighborhoods: ["Kentlands", "Olde Towne", "Montgomery Village", "Quince Orchard"],
  },
];

export const areaSlugs = areas.map((a) => a.slug);

export function getArea(slug: string): Area | undefined {
  return areas.find((a) => a.slug === slug);
}
