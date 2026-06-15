"use client";

/**
 * Shared GSAP setup. Registers ScrollTrigger + the useGSAP hook exactly once on
 * the client. Import { gsap, ScrollTrigger, useGSAP } from here instead of the
 * raw packages so registration is guaranteed.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export { gsap, ScrollTrigger, useGSAP };
