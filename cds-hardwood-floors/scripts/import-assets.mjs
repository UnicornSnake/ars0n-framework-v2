/**
 * Imports the real higgsfield renders/textures into public/, auto-sorting by the
 * higgsfield job-ID embedded in each source filename and resizing for the web.
 *
 *   node scripts/import-assets.mjs <source-dir>
 *
 * Source files keep their original higgsfield names (…<jobid>…). Any file whose
 * name contains a known job ID is resized and written to its target path.
 */
import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

// jobId -> { out, width, [height] }. Renders are width-bounded; textures square.
const MAP = {
  // Renders (room photos, 16:9 source ~5504x3072)
  e10aad42: { out: "public/renders/master.jpg", width: 1920 }, // hero poster (LCP)
  "3602b1d0": { out: "public/renders/before.jpg", width: 1600 }, // worn
  "9491d559": { out: "public/renders/after.jpg", width: 1600 }, // refinished
  // Textures (top-down squares, 4096x4096) — kept square for tiling
  c350cc7b: { out: "public/textures/oak.jpg", width: 2048, height: 2048 },
  "0bda3fa5": { out: "public/textures/maple.jpg", width: 2048, height: 2048 },
  "69c03662": { out: "public/textures/walnut.jpg", width: 2048, height: 2048 },
  "449cc30c": { out: "public/textures/hickory.jpg", width: 2048, height: 2048 },
};

const srcDir = process.argv[2];
if (!srcDir) {
  console.error("usage: node scripts/import-assets.mjs <source-dir>");
  process.exit(1);
}

await mkdir("public/renders", { recursive: true });
await mkdir("public/textures", { recursive: true });

const files = await readdir(srcDir);
let done = 0;

for (const [jobId, target] of Object.entries(MAP)) {
  const match = files.find((f) => f.includes(jobId));
  if (!match) continue;

  const input = path.join(srcDir, match);
  const pipeline = sharp(input).resize({
    width: target.width,
    height: target.height,
    fit: target.height ? "cover" : "inside",
    withoutEnlargement: true,
  });
  await pipeline.jpeg({ quality: 82, mozjpeg: true }).toFile(target.out);

  const meta = await sharp(target.out).metadata();
  console.log(`✓ ${jobId} -> ${target.out} (${meta.width}x${meta.height})`);
  done++;
}

console.log(`\nImported ${done}/${Object.keys(MAP).length} assets.`);
const missing = Object.entries(MAP)
  .filter(([id]) => !files.some((f) => f.includes(id)))
  .map(([, t]) => t.out);
if (missing.length) console.log("Still needed:", missing.join(", "));
