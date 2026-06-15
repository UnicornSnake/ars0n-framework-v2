import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, ButtonLink } from "@/components/ui";
import { CheckIcon, ArrowIcon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { EstimateForm } from "@/components/EstimateForm";
import { services, getService, serviceSlugs } from "@/lib/services";
import { serviceJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

type Params = { service: string };

// Pre-render every service page at build time.
export function generateStaticParams(): Params[] {
  return serviceSlugs.map((service) => ({ service }));
}

// Reject unknown slugs (404 instead of on-demand rendering).
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.name,
    description: `${service.summary} Serving ${site.areaServed}. ${site.mhicLicense}.`,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd(service),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.shortName, path: `/services/${service.slug}` },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="bg-wood-900 py-16 text-cream">
        <Container>
          <nav className="text-sm text-wood-300" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand">Home</Link>
            <span className="px-2">/</span>
            <Link href="/services" className="hover:text-brand">Services</Link>
            <span className="px-2">/</span>
            <span className="text-wood-100">{service.shortName}</span>
          </nav>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
            {service.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-wood-100">{service.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact" variant="primary">Get a Free Estimate</ButtonLink>
            <ButtonLink href={site.phoneHref} variant="ghost" className="text-cream ring-white/30 hover:bg-white/10">
              Call {site.phoneDisplay}
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Body */}
      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="text-lg leading-relaxed text-ink-soft">{service.intro}</p>

            <h2 className="mt-10 font-display text-2xl font-semibold text-ink">
              What&apos;s included
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {service.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-ink-soft">
                  <CheckIcon className="mt-1 h-5 w-5 flex-none text-brand" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 space-y-8">
              {service.details.map((d) => (
                <div key={d.heading}>
                  <h3 className="font-display text-xl font-semibold text-ink">
                    {d.heading}
                  </h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{d.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <h3 className="font-display text-lg font-semibold text-ink">
                Other services
              </h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {others.map((o) => (
                  <Link
                    key={o.slug}
                    href={`/services/${o.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-wood-200 bg-paper px-4 py-2 text-sm font-medium text-ink hover:border-brand hover:text-brand"
                  >
                    {o.shortName}
                    <ArrowIcon className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky estimate form */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="font-display text-xl font-semibold text-ink">
              Request your free estimate
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              Tell us about your project — we respond within one business day.
            </p>
            <div className="mt-4">
              <EstimateForm source={`service:${service.slug}`} />
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
