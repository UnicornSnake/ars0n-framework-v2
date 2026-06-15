/**
 * Prefixes a public asset path with the configured basePath. next/image and
 * next/link handle basePath automatically, but raw client-side fetches (e.g.
 * three.js texture loads) do not — use asset() for those so they resolve under
 * a basePath-hosted deployment such as GitHub Pages.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${p}`;
}
