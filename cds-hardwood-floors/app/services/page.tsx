import type { Metadata } from "next";
import { Container, SectionHeading, ButtonLink } from "@/components/ui";
import { ArrowIcon, CheckIcon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { services } from "@/lib/services";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Hardwood Floor Services",
  description: `Refinishing, sanding, screen-and-coat, and installation in ${site.areaServed}. MHIC licensed and insured, with a veteran discount.`,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />

      <section className="bg-wood-900 py-20 text-cream">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Our Services
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Complete hardwood floor care, start to finish
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-wood-100">
            Whether your floors need a light refresh or a full transformation, we
            have the right service — done by a licensed, insured local crew across{" "}
            {site.areaServed}.
          </p>
        </Container>
      </section>

      <section className="py-20">
        <Container className="space-y-8">
          {services.map((s, i) => (
            <div
              key={s.slug}
              className="grid gap-8 rounded-3xl border border-wood-100 bg-paper p-8 md:grid-cols-3 md:p-10"
            >
              <div className="md:col-span-2">
                <span className="text-sm font-semibold text-brand">
                  0{i + 1}
                </span>
                <h2 className="mt-1 font-display text-2xl font-semibold text-ink sm:text-3xl">
                  {s.name}
                </h2>
                <p className="mt-3 text-ink-soft">{s.intro}</p>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {s.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-ink-soft">
                      <CheckIcon className="mt-0.5 h-4 w-4 flex-none text-brand" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col justify-end gap-3 md:items-end">
                <ButtonLink href={`/services/${s.slug}`} variant="ghost" className="w-full md:w-auto">
                  {s.shortName} details
                  <ArrowIcon className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/contact" variant="primary" className="w-full md:w-auto">
                  Free estimate
                </ButtonLink>
              </div>
            </div>
          ))}
        </Container>
      </section>

      <section className="bg-wood-50 py-16">
        <Container className="flex flex-col items-center gap-6 text-center">
          <SectionHeading
            title="Not sure which service you need?"
            intro="We'll take a look and recommend the most cost-effective option — even if that's a simple recoat."
            align="center"
          />
          <div className="flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact" variant="primary">Get a Free Estimate</ButtonLink>
            <ButtonLink href={site.phoneHref} variant="ghost">Call {site.phoneDisplay}</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
