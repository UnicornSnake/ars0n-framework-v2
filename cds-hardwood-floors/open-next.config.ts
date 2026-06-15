import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * OpenNext Cloudflare configuration. Defaults are suitable for this site:
 * static assets are served by the Workers Assets binding and the rendered
 * routes run in the Worker. Add an incremental cache (R2/KV) here later if
 * ISR/data caching is introduced.
 */
export default defineCloudflareConfig();
