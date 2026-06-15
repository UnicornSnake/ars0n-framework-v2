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

// Each target lists candidate job-IDs (first match wins) so equivalent render
// variants can stand in. Renders are width-bounded; textures kept square.
const MAP = [
  // Renders (same living room: worn -> refinished, 16:9 source ~5504x3072)
  { ids: ["b3d7105a", "e10aad42", "9491d559"], out: "public/renders/master.jpg", width: 1920 }, // hero (LCP)
  { ids: ["34cbdca1", "3602b1d0"], out: "public/renders/before.jpg", width: 1600 }, // worn
  { ids: ["9491d559"], out: "public/renders/after.jpg", width: 1600 }, // refinished
  // Textures (top-down squares, 4096x4096)
  { ids: ["c350cc7b"], out: "public/textures/oak.jpg", width: 2048, height: 2048 },
  { ids: ["0bda3fa5"], out: "public/textures/maple.jpg", width: 2048, height: 2048 },
  { ids: ["69c03662"], out: "public/textures/walnut.jpg", width: 2048, height: 2048 },
  { ids: ["449cc30c"], out: "public/textures/hickory.jpg", width: 2048, height: 2048 },
];

const srcDir = process.argv[2];
if (!srcDir) {
  console.error("usage: node scripts/import-assets.mjs <source-dir>");
  process.exit(1);
}

await mkdir("public/renders", { recursive: true });
await mkdir("public/textures", { recursive: true });

const files = await readdir(srcDir);
let done = 0;
const missing = [];

for (const target of MAP) {
  // First candidate job-ID with a matching file on disk wins.
  let match;
  let matchedId;
  for (const id of target.ids) {
    match = files.find((f) => f.includes(id));
    if (match) {
      matchedId = id;
      break;
    }
  }
  if (!match) {
    missing.push(target.out);
    continue;
  }

  const input = path.join(srcDir, match);
  await sharp(input)
    .resize({
      width: target.width,
      height: target.height,
      fit: target.height ? "cover" : "inside",
      withoutEnlargement: true,
    })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(target.out);

  const meta = await sharp(target.out).metadata();
  console.log(`✓ ${matchedId} -> ${target.out} (${meta.width}x${meta.height})`);
  done++;
}

console.log(`\nImported ${done}/${MAP.length} assets.`);
if (missing.length) console.log("Still needed:", missing.join(", "));
