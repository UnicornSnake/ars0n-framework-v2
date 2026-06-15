/**
 * Generates labeled placeholder images so the site builds and runs before the
 * real renders/textures are dropped in. Each output is a warm wood-toned
 * gradient with a "PLACEHOLDER" label. Replace the files in public/renders and
 * public/textures with the real assets and delete this script if desired.
 *
 *   node scripts/gen-placeholders.mjs
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const targets = [
  { path: "public/renders/master.jpg", w: 1600, h: 900, c1: "#caa06a", c2: "#6b401a", label: "master.jpg" },
  { path: "public/renders/before.jpg", w: 1600, h: 900, c1: "#9a8568", c2: "#4d3a26", label: "before.jpg (worn)" },
  { path: "public/renders/after.jpg", w: 1600, h: 900, c1: "#d8b483", c2: "#7a4d1f", label: "after.jpg (refinished)" },
  { path: "public/textures/oak.jpg", w: 1024, h: 1024, c1: "#d9b483", c2: "#a96c2a", label: "oak" },
  { path: "public/textures/maple.jpg", w: 1024, h: 1024, c1: "#e7c89c", c2: "#c99a5c", label: "maple" },
  { path: "public/textures/walnut.jpg", w: 1024, h: 1024, c1: "#7a5230", c2: "#3f2a18", label: "walnut" },
  { path: "public/textures/hickory.jpg", w: 1024, h: 1024, c1: "#c69a63", c2: "#7b4f29", label: "hickory" },
];

function svg({ w, h, c1, c2, label }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="100%" stop-color="${c2}"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#g)"/>
    <text x="50%" y="50%" font-family="sans-serif" font-size="${Math.round(w / 22)}"
      fill="#ffffff" fill-opacity="0.85" text-anchor="middle" dominant-baseline="middle">
      ${label}
    </text>
    <text x="50%" y="${h - Math.round(h / 12)}" font-family="sans-serif" font-size="${Math.round(w / 40)}"
      fill="#ffffff" fill-opacity="0.6" text-anchor="middle">PLACEHOLDER — replace with real asset</text>
  </svg>`;
}

await mkdir("public/renders", { recursive: true });
await mkdir("public/textures", { recursive: true });

for (const t of targets) {
  await sharp(Buffer.from(svg(t)))
    .jpeg({ quality: 80 })
    .toFile(t.path);
  console.log("wrote", t.path);
}

// Simple square brand icon for JSON-LD logo / favicon fallback.
await sharp(Buffer.from(svg({ w: 512, h: 512, c1: "#a96c2a", c2: "#3f2a18", label: "CDS" })))
  .png()
  .toFile("public/icon.png");
console.log("wrote public/icon.png");
