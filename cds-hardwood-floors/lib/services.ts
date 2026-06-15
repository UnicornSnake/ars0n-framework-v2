/**
 * Service catalog. Drives the Services index, the per-service static pages
 * (generateStaticParams), navigation, and Service JSON-LD.
 */

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  /** One-line summary used in cards and meta descriptions. */
  summary: string;
  /** Longer marketing copy for the service page body. */
  intro: string;
  /** Bullet points describing what the service includes. */
  highlights: string[];
  /** Short FAQ-style detail paragraphs. */
  details: { heading: string; body: string }[];
};

export const services: Service[] = [
  {
    slug: "refinishing",
    name: "Hardwood Floor Refinishing",
    shortName: "Refinishing",
    summary:
      "Bring tired, scratched hardwood back to life with a full sand-and-refinish — bare wood to a flawless new finish.",
    intro:
      "Refinishing strips away years of wear, scratches, and old finish to reveal the bare wood beneath, then rebuilds it with a durable, beautiful new finish. It's the most cost-effective way to make decades-old floors look brand new without the expense of replacement.",
    highlights: [
      "Complete sanding down to bare wood",
      "Stain color matching and custom tones",
      "Oil-based or water-based polyurethane finishes",
      "Dust-containment sanding systems",
      "Repairs to gouges, gaps, and damaged boards",
    ],
    details: [
      {
        heading: "When refinishing makes sense",
        body: "If your floors are deeply scratched, discolored, or the finish has worn through to bare wood, a full refinish restores both protection and appearance. Solid hardwood can typically be refinished several times over its lifetime.",
      },
      {
        heading: "Our process",
        body: "We sand progressively through grits for a glass-smooth surface, vacuum and tack between coats, apply your chosen stain, and seal with multiple coats of professional-grade polyurethane. We protect your trim, vents, and adjacent rooms throughout.",
      },
    ],
  },
  {
    slug: "sanding",
    name: "Hardwood Floor Sanding",
    shortName: "Sanding",
    summary:
      "Precision dust-controlled sanding that levels boards and prepares your floor for a perfect finish.",
    intro:
      "Proper sanding is the foundation of every great floor. Using professional drum and edge sanders with dust-containment systems, we level cupped or uneven boards and create the smooth, clean surface that a flawless finish depends on.",
    highlights: [
      "Drum, orbital, and edge sanding",
      "Dust-containment for a cleaner job",
      "Leveling of cupped and uneven boards",
      "Fine-grit finish sanding for smoothness",
      "Prep for stain and topcoat",
    ],
    details: [
      {
        heading: "Why sanding quality matters",
        body: "Every imperfection left in the wood telegraphs through the finish. Our multi-pass approach removes old coatings and surface damage evenly so stain absorbs uniformly and the topcoat lays down glass-smooth.",
      },
      {
        heading: "Low-dust equipment",
        body: "Our sanders connect to dust-containment systems that capture the vast majority of airborne dust, keeping your home cleaner and the air healthier while we work.",
      },
    ],
  },
  {
    slug: "screen-and-coat",
    name: "Screen & Coat",
    shortName: "Screen & Coat",
    summary:
      "A fast, affordable refresh — lightly abrade and recoat floors that are worn but not damaged.",
    intro:
      "Also called a buff-and-coat, screen-and-coat lightly scuffs the existing finish and applies a fresh topcoat — no full sanding required. It's the ideal maintenance step for floors that look dull or lightly scratched but are still structurally sound.",
    highlights: [
      "No full sand-down required",
      "Same-day to next-day turnaround on many jobs",
      "Restores sheen and protection",
      "Extends the life of your existing finish",
      "A fraction of the cost of refinishing",
    ],
    details: [
      {
        heading: "Is your floor a candidate?",
        body: "Screen-and-coat works when the wear is in the finish, not the wood — no bare spots, deep gouges, or water damage. If scratches haven't cut into the wood itself, a fresh coat can make the whole floor look new again.",
      },
      {
        heading: "Keep floors looking new",
        body: "Recoating every few years before the finish wears through protects the wood underneath and delays the need for a full refinish, saving you money over the life of the floor.",
      },
    ],
  },
  {
    slug: "installation",
    name: "Hardwood Floor Installation",
    shortName: "Installation",
    summary:
      "Expert installation of solid and engineered hardwood — oak, maple, walnut, hickory, and more.",
    intro:
      "From new construction to replacing old flooring, we install solid and engineered hardwood with precision. We help you choose the right species, plank width, and finish for your home, then deliver a tight, level, lasting installation.",
    highlights: [
      "Solid and engineered hardwood",
      "Oak, maple, walnut, hickory, and more",
      "Subfloor prep and moisture testing",
      "Custom plank widths and patterns",
      "Site-finished or prefinished options",
    ],
    details: [
      {
        heading: "Materials guidance",
        body: "We'll walk you through species, grades, widths, and finishes so your new floor fits your lifestyle and budget. Hardwood adds warmth, value, and durability that lasts for generations.",
      },
      {
        heading: "Done right the first time",
        body: "We acclimate material to your home, test subfloor moisture, and install to manufacturer spec so your floor stays flat and tight for years. Proper installation is the difference between a floor that lasts decades and one that fails early.",
      },
    ],
  },
];

export const serviceSlugs = services.map((s) => s.slug);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
