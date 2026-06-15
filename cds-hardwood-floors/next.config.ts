import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Static-export preview mode (e.g. GitHub Pages) is opt-in via PAGES_EXPORT=1.
// The default build targets Cloudflare Workers via the OpenNext adapter.
const isPagesExport = process.env.PAGES_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// Cloudflare Image Resizing (the /cdn-cgi/image custom loader) only works on a
// zone with the feature enabled — NOT on *.workers.dev. Default to unoptimized
// images so they render everywhere; opt into the loader once on a custom domain
// via NEXT_PUBLIC_CF_IMAGE_RESIZING=1. Assets are already web-sized.
const useCfImageResizing = process.env.NEXT_PUBLIC_CF_IMAGE_RESIZING === "1";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  ...(isPagesExport
    ? {
        // No server runtime: fully static HTML/CSS/JS for a CDN/Pages host.
        output: "export",
        trailingSlash: true,
        basePath: basePath || undefined,
        assetPrefix: basePath || undefined,
        images: { unoptimized: true },
      }
    : {
        images: useCfImageResizing
          ? { loader: "custom", loaderFile: "./lib/cf-image-loader.ts" }
          : { unoptimized: true },
      }),
};

export default nextConfig;

// Initialize the OpenNext Cloudflare dev shim so getCloudflareContext() and
// bindings work under `next dev`. No-op in production builds; skipped entirely
// for the static export.
if (!isPagesExport) {
  void initOpenNextCloudflareForDev();
}
