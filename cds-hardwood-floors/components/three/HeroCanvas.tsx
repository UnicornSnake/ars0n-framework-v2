"use client";

/**
 * Client-only mount point for the hero WebGL island.
 *
 * - The 3D scene is isolated via dynamic(ssr:false) so WebGL never SSRs.
 * - It mounts only AFTER first paint (requestAnimationFrame), so the static
 *   poster behind it stays the LCP element and the canvas never blocks it.
 * - Gated on prefers-reduced-motion: reduced-motion users keep just the poster.
 * - The canvas fades in once the GL context is created; if WebGL fails, the
 *   wrapper stays transparent and the poster simply remains visible.
 */
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export function HeroCanvas() {
  const [mount, setMount] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Defer mount until after the first paint so LCP (the poster) isn't blocked.
    const raf = requestAnimationFrame(() => setMount(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!mount) return null;

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 -z-20 transition-opacity duration-700 ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    >
      <HeroScene onReady={() => setReady(true)} />
    </div>
  );
}
