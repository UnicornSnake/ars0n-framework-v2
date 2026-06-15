/// <reference types="@cloudflare/workers-types" />
/**
 * Types for the Cloudflare Worker environment (bindings + secrets).
 * Regenerate the binding portion with `npm run cf-typegen` after editing
 * wrangler.jsonc. Secrets are declared here manually.
 */
interface CloudflareEnv {
  // Bindings (wrangler.jsonc)
  ASSETS: Fetcher;
  IMAGES: ImagesBinding;

  // Secrets (wrangler secret put ...)
  TURNSTILE_SECRET_KEY?: string;
  RESEND_API_KEY?: string;
  ESTIMATE_TO_EMAIL?: string;
  ESTIMATE_FROM_EMAIL?: string;

  // Public (inlined at build time)
  NEXT_PUBLIC_TURNSTILE_SITE_KEY?: string;
  NEXT_PUBLIC_SITE_URL?: string;
}

// Make secrets/vars visible on process.env for code that reads them directly
// (OpenNext populates process.env from the Cloudflare env at runtime).
declare namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface ProcessEnv extends CloudflareEnv {}
}
