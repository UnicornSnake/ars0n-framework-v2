import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { PhoneIcon, ShieldIcon, StarIcon, CheckIcon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { EstimateForm } from "@/components/EstimateForm";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact & Free Estimates",
  description: `Request a free hardwood floor estimate from CDS Hardwood Floors. Call ${site.phoneDisplay} or send us your project details. Serving ${site.areaServed}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              Contact Us
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              Get your free estimate
            </h1>
            <p className="mt-5 text-lg text-ink-soft">
              Tell us about your floors and we&apos;ll get back to you within one
              business day. Prefer to talk it through? Give us a call.
            </p>

            <a
              href={site.phoneHref}
              className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-wood-200 bg-paper px-6 py-4 text-xl font-semibold text-ink shadow-sm transition-colors hover:border-brand"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white">
                <PhoneIcon className="h-5 w-5" />
              </span>
              {site.phoneDisplay}
            </a>

            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-3 text-ink-soft">
                <ShieldIcon className="mt-0.5 h-5 w-5 flex-none text-brand" />
                <span>
                  <strong className="text-ink">{site.mhicLicense}</strong> — fully
                  covered on every job.
                </span>
              </li>
              <li className="flex items-start gap-3 text-ink-soft">
                <StarIcon className="mt-0.5 h-5 w-5 flex-none text-brand" />
                <span>
                  <strong className="text-ink">Veteran discount</strong> for veterans
                  and active service members.
                </span>
              </li>
              <li className="flex items-start gap-3 text-ink-soft">
                <CheckIcon className="mt-0.5 h-5 w-5 flex-none text-brand" />
                <span>
                  <strong className="text-ink">Serving {site.areaServed}</strong> —
                  Bethesda, Rockville, Silver Spring, Potomac, Gaithersburg &amp; more.
                </span>
              </li>
            </ul>
          </div>

          <div>
            <EstimateForm source="contact" />
          </div>
        </Container>
      </section>
    </>
  );
}
