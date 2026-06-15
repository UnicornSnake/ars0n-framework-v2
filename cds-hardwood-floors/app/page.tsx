import Link from "next/link";
import { Hero } from "@/components/Hero";
import { BeforeAfter } from "@/components/BeforeAfter";
import { EstimateForm } from "@/components/EstimateForm";
import { Container, SectionHeading, ButtonLink } from "@/components/ui";
import { CheckIcon, ShieldIcon, StarIcon, ArrowIcon } from "@/components/icons";
import { services } from "@/lib/services";
import { areas } from "@/lib/areas";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Trust strip */}
      <section className="border-y border-wood-100 bg-paper">
        <Container className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 py-6 text-sm font-medium text-ink-soft">
          <span className="inline-flex items-center gap-2">
            <ShieldIcon className="h-5 w-5 text-brand" /> {site.mhicLicense}
          </span>
          <span className="inline-flex items-center gap-2">
            <StarIcon className="h-5 w-5 text-brand" /> Veteran Discount
          </span>
          <span className="inline-flex items-center gap-2">
            <CheckIcon className="h-5 w-5 text-brand" /> Free Written Estimates
          </span>
          <span className="inline-flex items-center gap-2">
            <CheckIcon className="h-5 w-5 text-brand" /> Serving {site.areaServed}
          </span>
        </Container>
      </section>

      {/* Services */}
      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="What we do"
            title="Hardwood floor services done right"
            intro="From a quick recoat to a full sand-and-refinish or brand-new installation, we handle every step with licensed, insured craftsmanship."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex flex-col rounded-2xl border border-wood-100 bg-paper p-6 transition-all hover:-translate-y-1 hover:border-wood-200 hover:shadow-lg hover:shadow-wood-900/5"
              >
                <h3 className="font-display text-xl font-semibold text-ink">
                  {s.shortName}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                  {s.summary}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  Learn more
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Before / After */}
      <section className="bg-wood-50 py-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="The transformation"
                title="See the difference refinishing makes"
                intro="Drag the slider to reveal a worn, scratched floor restored to a smooth, glowing finish — the same floor, brought back to life."
              />
              <div className="mt-8">
                <ButtonLink href="/contact" variant="primary">
                  Get a Free Estimate
                </ButtonLink>
              </div>
            </div>
            <BeforeAfter />
          </div>
        </Container>
      </section>

      {/* Why choose us */}
      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="Why CDS"
            title="A local crew you can trust with your floors"
            align="center"
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
            {[
              {
                icon: <ShieldIcon className="h-6 w-6 text-brand" />,
                title: "Licensed & Insured",
                body: "MHIC licensed and fully insured for your peace of mind on every job.",
              },
              {
                icon: <StarIcon className="h-6 w-6 text-brand" />,
                title: "Veteran Discount",
                body: "We proudly offer a discount to veterans and active service members.",
              },
              {
                icon: <CheckIcon className="h-6 w-6 text-brand" />,
                title: "Local & Reliable",
                body: `Based in and serving ${site.areaServed} with honest, on-time work.`,
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-wood-100 bg-paper p-6 text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-wood-50">
                  {c.icon}
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{c.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Service areas */}
      <section className="bg-wood-50 py-20">
        <Container>
          <SectionHeading
            eyebrow="Where we work"
            title="Serving Montgomery County, Maryland"
            intro="Proudly providing hardwood floor services to homeowners across the county, including:"
          />
          <div className="mt-10 flex flex-wrap gap-3">
            {areas.map((a) => (
              <Link
                key={a.slug}
                href={`/service-area/${a.slug}`}
                className="rounded-full border border-wood-200 bg-paper px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
              >
                {a.name}, MD
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Estimate form (hidden source field marks this as the Home lead) */}
      <section id="estimate" className="py-20">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Free estimate"
                title="Ready to fall in love with your floors again?"
                intro="Tell us about your project and we'll get back to you within one business day with a free, no-pressure estimate."
              />
              <ul className="mt-6 space-y-3 text-ink-soft">
                {[
                  "No-cost, no-obligation written estimates",
                  "Honest recommendations — recoat vs. refinish",
                  "Veteran discount available",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <CheckIcon className="mt-1 h-5 w-5 flex-none text-brand" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-ink-soft">
                Prefer to talk? Call{" "}
                <a href={site.phoneHref} className="font-semibold text-brand">
                  {site.phoneDisplay}
                </a>
                .
              </p>
            </div>
            <EstimateForm source="home" />
          </div>
        </Container>
      </section>
    </>
  );
}
