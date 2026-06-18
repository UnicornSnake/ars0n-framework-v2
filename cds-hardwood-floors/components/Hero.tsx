import Image from "next/image";
import { site } from "@/lib/site";
import { ButtonLink } from "@/components/ui";
import { PhoneIcon, ShieldIcon, StarIcon } from "@/components/icons";

/**
 * Hero section. The LCP element is the static poster image (master.jpg) — a
 * plain photo, so it paints immediately, is fully crawlable, and adds no
 * client-side blocking time. (The experimental WebGL hero was removed; the
 * island components remain parked in components/three for a future revisit.)
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[88vh] items-center overflow-hidden">
      {/* LCP poster image */}
      <Image
        src="/renders/master.jpg"
        alt="Freshly refinished oak hardwood floor in a bright living room"
        fill
        priority
        sizes="100vw"
        className="-z-30 object-cover"
      />
      {/* Legibility scrim */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-wood-900/85 via-wood-900/45 to-wood-900/30"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8">
        <div id="hero-overlay" className="max-w-2xl">
          <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-wood-100">
            <span className="inline-flex items-center gap-1.5">
              <ShieldIcon className="h-4 w-4 text-brand" /> {site.mhicLicense}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <StarIcon className="h-4 w-4 text-brand" /> Veteran discount
            </span>
          </div>

          <h1 className="font-display text-4xl font-semibold leading-[1.05] text-white sm:text-5xl md:text-6xl">
            CDS Hardwood Floors
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-wood-50/90 sm:text-xl">
            Refinishing, sanding, screen-and-coat, and installation across{" "}
            {site.areaServed}. Worn, scratched floors made beautiful again — by a
            licensed, insured local crew.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/contact" variant="primary" className="text-lg">
              Get a Free Estimate
            </ButtonLink>
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-lg font-semibold text-white ring-1 ring-inset ring-white/40 backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              <PhoneIcon className="h-5 w-5" />
              {site.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
