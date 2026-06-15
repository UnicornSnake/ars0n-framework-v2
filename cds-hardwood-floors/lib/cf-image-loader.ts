/**
 * Custom next/image loader for Cloudflare. In production it routes requests
 * through Cloudflare Image Resizing (/cdn-cgi/image/...). During local
 * development (next dev) Image Resizing isn't available, so we return the
 * source untouched.
 *
 * Referenced from next.config.ts via images.loaderFile.
 */
"use client";

type LoaderArgs = { src: string; width: number; quality?: number };

export default function cloudflareLoader({ src, width, quality }: LoaderArgs): string {
  // Leave absolute/remote URLs and dev mode alone.
  if (process.env.NODE_ENV === "development") {
    return src;
  }

  const params = [`width=${width}`, `quality=${quality || 75}`, "format=auto"];

  // Normalize the source to an absolute path on this origin.
  const normalizedSrc = src.startsWith("/") ? src : `/${src}`;
  return `/cdn-cgi/image/${params.join(",")}${normalizedSrc}`;
}
