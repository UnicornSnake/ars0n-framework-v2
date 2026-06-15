import Link from "next/link";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { areas } from "@/lib/areas";
import { Container } from "@/components/ui";
import { PhoneIcon, ShieldIcon } from "@/components/icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-wood-800 bg-wood-900 text-wood-100">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="font-display text-lg font-semibold text-white">
              CDS Hardwood Floors
            </div>
            <p className="mt-3 text-sm leading-relaxed text-wood-200">
              {site.tagline}
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-wood-200">
              <ShieldIcon className="h-4 w-4 text-brand" />
              {site.mhicLicense}
            </div>
            <a
              href={site.phoneHref}
              className="mt-4 inline-flex items-center gap-2 text-lg font-semibold text-white hover:text-brand"
            >
              <PhoneIcon className="h-5 w-5 text-brand" />
              {site.phoneDisplay}
            </a>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-wood-300">
              Services
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-wood-100 hover:text-brand"
                  >
                    {s.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-wood-300">
              Service Area
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {areas.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/service-area/${a.slug}`}
                    className="text-wood-100 hover:text-brand"
                  >
                    {a.name}, MD
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-wood-300">
              Company
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-wood-100 hover:text-brand">
                  Contact &amp; Estimates
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-wood-100 hover:text-brand">
                  All Services
                </Link>
              </li>
              <li className="text-wood-200">Serving {site.areaServed}</li>
              <li className="text-wood-200">Veteran discount available</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-wood-800 pt-6 text-xs text-wood-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.legalName}. All rights reserved.
          </p>
          <p>{site.mhicLicense} &middot; {site.areaServed}</p>
        </div>
      </Container>
    </footer>
  );
}
