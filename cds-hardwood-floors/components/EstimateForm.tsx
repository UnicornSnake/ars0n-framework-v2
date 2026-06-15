"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { services } from "@/lib/services";
import { Button } from "@/components/ui";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

// Minimal typing for the Turnstile global injected by the api.js script.
declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        }
      ) => string;
      reset: (id?: string) => void;
    };
  }
}

type Status = "idle" | "submitting" | "success" | "error";

export function EstimateForm({
  source = "contact",
}: {
  /** Identifies which page the lead came from; sent as a hidden field. */
  source?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  // Explicitly render the Turnstile widget once the script is ready.
  function renderTurnstile() {
    if (!SITE_KEY || !window.turnstile || !widgetRef.current) return;
    if (widgetId.current) return; // already rendered
    widgetId.current = window.turnstile.render(widgetRef.current, {
      sitekey: SITE_KEY,
      theme: "auto",
      callback: (t) => setToken(t),
      "expired-callback": () => setToken(""),
      "error-callback": () => setToken(""),
    });
  }

  useEffect(() => {
    // In case the script loaded before this component mounted.
    renderTurnstile();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    if (SITE_KEY && !token) {
      setStatus("error");
      setError("Please complete the verification challenge and try again.");
      return;
    }

    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, turnstileToken: token }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error || "Something went wrong. Please call us instead.");
      }
      setStatus("success");
      form.reset();
      if (window.turnstile && widgetId.current) window.turnstile.reset(widgetId.current);
      setToken("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unexpected error.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-wood-200 bg-paper p-8 text-center shadow-sm">
        <h3 className="font-display text-2xl font-semibold text-ink">Thank you!</h3>
        <p className="mt-3 text-ink-soft">
          Your estimate request is on its way. We&apos;ll be in touch shortly. For
          anything urgent, call us directly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-wood-200 bg-paper p-6 shadow-sm sm:p-8"
    >
      {SITE_KEY ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
          onLoad={renderTurnstile}
        />
      ) : null}

      {/* Hidden source + honeypot (anti-spam) fields. */}
      <input type="hidden" name="source" value={source} />
      <div className="hidden" aria-hidden="true">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" name="name" required autoComplete="name" />
        <Field label="Phone" name="phone" type="tel" required autoComplete="tel" />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="sm:col-span-2"
        />
        <Field
          label="Property city / ZIP"
          name="location"
          placeholder="e.g. Bethesda 20814"
          className="sm:col-span-2"
        />
        <div className="sm:col-span-2">
          <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-ink">
            Service needed
          </label>
          <select
            id="service"
            name="service"
            defaultValue=""
            className="w-full rounded-lg border border-wood-200 bg-white px-3.5 py-2.5 text-ink shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          >
            <option value="" disabled>
              Choose a service…
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
            <option value="Not sure / multiple">Not sure / multiple</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
            Project details
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Rooms, square footage, timeline, current condition…"
            className="w-full rounded-lg border border-wood-200 bg-white px-3.5 py-2.5 text-ink shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </div>
      </div>

      {SITE_KEY ? <div ref={widgetRef} className="mt-5" /> : null}

      {status === "error" ? (
        <p role="alert" className="mt-4 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 w-full disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Request My Free Estimate"}
      </Button>
      <p className="mt-3 text-xs text-ink-soft">
        Veteran discount available. We typically respond within one business day.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  autoComplete,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required ? <span className="text-brand"> *</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full rounded-lg border border-wood-200 bg-white px-3.5 py-2.5 text-ink shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
      />
    </div>
  );
}
