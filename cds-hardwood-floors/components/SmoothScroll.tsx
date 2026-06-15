"use client";

/**
 * Global smooth-scroll provider (Lenis) wired to GSAP using the shared-RAF
 * pattern: GSAP's ticker drives Lenis's raf (autoRaf disabled), every Lenis
 * scroll calls ScrollTrigger.update(), and lagSmoothing is off so scrubbed
 * ScrollTrigger animations stay in lockstep with the smoothed scroll.
 *
 * Respects prefers-reduced-motion by collapsing the smoothing (lerp 1).
 */
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

function ScrollTriggerBridge() {
  // Keep ScrollTrigger in sync with Lenis's smoothed scroll position.
  useLenis(() => ScrollTrigger.update());
  return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    function raf(time: number) {
      // GSAP ticker time is in seconds; Lenis expects milliseconds.
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(raf);
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        smoothWheel: !reduced,
        lerp: reduced ? 1 : 0.1,
        duration: 1.1,
      }}
    >
      <ScrollTriggerBridge />
      {children}
    </ReactLenis>
  );
}
