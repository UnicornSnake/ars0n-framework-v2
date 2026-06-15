"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { ButtonLink } from "@/components/ui";
import { PhoneIcon } from "@/components/icons";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/service-area", label: "Service Area" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-wood-100/70 bg-cream/85 backdrop-blur supports-[backdrop-filter]:bg-cream/70">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-ink"
          onClick={() => setOpen(false)}
        >
          CDS <span className="text-brand">Hardwood Floors</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={site.phoneHref}
            className="flex items-center gap-2 text-sm font-semibold text-ink hover:text-brand"
          >
            <PhoneIcon className="h-4 w-4" />
            {site.phoneDisplay}
          </a>
          <ButtonLink href="/contact" variant="primary" className="px-5 py-2 text-sm">
            Free Estimate
          </ButtonLink>
        </div>

        {/* Mobile: tap-to-call + menu toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={site.phoneHref}
            aria-label={`Call ${site.phoneDisplay}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white"
          >
            <PhoneIcon className="h-4 w-4" />
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-inset ring-wood-200 text-ink"
          >
            <span className="sr-only">Menu</span>
            <div className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </div>
          </button>
        </div>
      </div>

      {open ? (
        <nav
          className="border-t border-wood-100 bg-cream px-5 py-4 md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-wood-50"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <ButtonLink
                href="/contact"
                variant="primary"
                className="w-full"
              >
                Get a Free Estimate
              </ButtonLink>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
