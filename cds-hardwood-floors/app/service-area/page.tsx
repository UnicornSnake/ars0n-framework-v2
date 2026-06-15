import type { Metadata } from "next";
import Link from "next/link";
import { Container, ButtonLink } from "@/components/ui";
import { ArrowIcon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { areas } from "@/lib/areas";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Service Area — Montgomery County, MD",
  description: `CDS Hardwood Floors serves Bethesda, Rockville, Silver Spring, Potomac, Gaithersburg, and all of ${site.areaServed}.`,
  path: "/service-area",
});

export default function ServiceAreaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Service Area", path: "/service-area" },
        ])}
      />

      <section className="py-20">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Service Area
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Hardwood floor experts across {site.areaServed}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-soft">
            We bring refinishing, sanding, screen-and-coat, and installation to
            homeowners throughout the county. Choose your city for local details.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((a) => (
              <Link
                key={a.slug}
                href={`/service-area/${a.slug}`}
                className="group rounded-2xl border border-wood-100 bg-paper p-6 transition-all hover:-translate-y-1 hover:border-wood-200 hover:shadow-lg hover:shadow-wood-900/5"
              >
                <h2 className="font-display text-xl font-semibold text-ink">
                  {a.name}, MD
                </h2>
                <p className="mt-1 text-sm text-ink-soft">{a.region}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {a.intro}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  {a.name} floor services
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-12">
            <ButtonLink href="/contact" variant="primary">Get a Free Estimate</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
