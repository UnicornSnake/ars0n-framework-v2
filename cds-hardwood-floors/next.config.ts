import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Static-export preview mode (e.g. GitHub Pages) is opt-in via PAGES_EXPORT=1.
// The default build targets Cloudflare Workers via the OpenNext adapter.
const isPagesExport = process.env.PAGES_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

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
        images: {
          // Route optimization through Cloudflare Image Resizing in production.
          loader: "custom",
          loaderFile: "./lib/cf-image-loader.ts",
        },
      }),
};

export default nextConfig;

// Initialize the OpenNext Cloudflare dev shim so getCloudflareContext() and
// bindings work under `next dev`. No-op in production builds; skipped entirely
// for the static export.
if (!isPagesExport) {
  void initOpenNextCloudflareForDev();
}
