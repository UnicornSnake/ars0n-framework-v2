import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, ButtonLink } from "@/components/ui";
import { CheckIcon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { BeforeAfter } from "@/components/BeforeAfter";
import { EstimateForm } from "@/components/EstimateForm";
import { getArea, areaSlugs } from "@/lib/areas";
import { services } from "@/lib/services";
import { areaJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

type Params = { area: string };

export function generateStaticParams(): Params[] {
  return areaSlugs.map((area) => ({ area }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { area: slug } = await params;
  const area = getArea(slug);
  if (!area) return {};
  return pageMetadata({
    title: `Hardwood Floor Refinishing & Installation in ${area.name}, MD`,
    description: `Professional hardwood floor refinishing, sanding, screen-and-coat, and installation in ${area.name}, ${area.region}. ${site.mhicLicense}. Call ${site.phoneDisplay}.`,
    path: `/service-area/${area.slug}`,
  });
}

export default async function AreaPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { area: slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  return (
    <>
      <JsonLd
        data={[
          areaJsonLd(area),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Service Area", path: "/service-area" },
            { name: area.name, path: `/service-area/${area.slug}` },
          ]),
        ]}
      />

      <section className="bg-wood-900 py-16 text-cream">
        <Container>
          <nav className="text-sm text-wood-300" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand">Home</Link>
            <span className="px-2">/</span>
            <Link href="/service-area" className="hover:text-brand">Service Area</Link>
            <span className="px-2">/</span>
            <span className="text-wood-100">{area.name}</span>
          </nav>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Hardwood Floor Refinishing &amp; Installation in {area.name}, MD
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-wood-100">{area.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact" variant="primary">Get a Free Estimate</ButtonLink>
            <ButtonLink href={site.phoneHref} variant="ghost" className="text-cream ring-white/30 hover:bg-white/10">
              Call {site.phoneDisplay}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-semibold text-ink">
              Floor services for {area.name} homeowners
            </h2>
            <p className="mt-3 text-ink-soft">
              From classic oak in older homes to new engineered installs, our crew
              delivers finish-quality work {area.neighborhoods.length > 0 ? "from " + area.neighborhoods.slice(0, 2).join(" to ") + " and" : "across"} every corner of {area.name}.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="rounded-xl border border-wood-100 bg-paper p-5 hover:border-brand"
                >
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {s.shortName}
                  </h3>
                  <p className="mt-1 text-sm text-ink-soft">{s.summary}</p>
                </Link>
              ))}
            </div>

            <div className="mt-10">
              <h2 className="font-display text-2xl font-semibold text-ink">
                Neighborhoods we serve in {area.name}
              </h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {area.neighborhoods.map((n) => (
                  <li key={n} className="flex items-center gap-2 text-ink-soft">
                    <CheckIcon className="h-4 w-4 flex-none text-brand" />
                    {n}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-ink-soft">
                Serving ZIP codes {area.zips.join(", ")} and surrounding areas.
              </p>
            </div>

            <div className="mt-10">
              <BeforeAfter />
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="font-display text-xl font-semibold text-ink">
              Free {area.name} estimate
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              {site.mhicLicense}. Veteran discount available.
            </p>
            <div className="mt-4">
              <EstimateForm source={`area:${area.slug}`} />
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
