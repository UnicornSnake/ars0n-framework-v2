"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Accessible before/after slider driven by a range input (no animation library).
 * This is the baseline interactive comparison used on the page and also serves
 * as the prefers-reduced-motion fallback for the scroll-driven wipe added later.
 */
export function BeforeAfter({
  before = "/renders/before.jpg",
  after = "/renders/after.jpg",
}: {
  before?: string;
  after?: string;
}) {
  const [pos, setPos] = useState(50);

  return (
    <figure className="w-full">
      <div className="relative aspect-[16/9] w-full select-none overflow-hidden rounded-2xl ring-1 ring-wood-200 shadow-xl shadow-wood-900/10">
        {/* AFTER (refinished) sits underneath, fully visible. */}
        <Image
          src={after}
          alt="Hardwood floor after professional refinishing"
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />
        {/* BEFORE (worn) clipped to the slider position on top. */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Image
            src={before}
            alt="Worn hardwood floor before refinishing"
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
          <span className="absolute left-3 top-3 rounded-full bg-wood-900/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
            Before
          </span>
        </div>
        <span className="absolute right-3 top-3 rounded-full bg-brand px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
          After
        </span>

        {/* Divider handle */}
        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-white/90"
          style={{ left: `${pos}%` }}
          aria-hidden="true"
        >
          <span className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-wood-700 shadow">
            ↔
          </span>
        </div>

        <label className="sr-only" htmlFor="ba-range">
          Reveal before or after
        </label>
        <input
          id="ba-range"
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
    </figure>
  );
}
