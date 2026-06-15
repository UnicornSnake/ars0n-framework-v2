"use client";

/**
 * Hero WebGL scene (client-only — loaded via dynamic(ssr:false)).
 *
 * A single InstancedMesh of hardwood planks (ONE draw call) assembles into a
 * floor over ~2s: planks drop in and lock together left-to-right. The GSAP
 * timeline animates a plain progress ref — never React state — and the
 * per-instance matrices are recomputed from that ref inside useFrame. The DOM
 * hero overlay (#hero-overlay) fades in once the planks settle.
 *
 * frameloop="demand": the timeline calls invalidate() on each tick, so we only
 * render while animating and sit idle afterward.
 */
import { useMemo, useRef, Suspense, useLayoutEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { gsap, useGSAP } from "@/lib/gsap";
import { asset } from "@/lib/asset";

const COLS = 6; // planks across (x)
const ROWS = 12; // plank courses deep (z)
const COUNT = COLS * ROWS;
const PLANK_W = 1.0;
const PLANK_D = 0.5;
const PLANK_H = 0.08;
const GAP = 0.02;
const STEP_X = PLANK_W + GAP;
const STEP_Z = PLANK_D + GAP;
const FLOOR_W = COLS * STEP_X;
const FLOOR_D = ROWS * STEP_Z;
const DROP_HEIGHT = 2.4;

// Cubic ease with a subtle overshoot so planks "snap" into place.
function easeOutBack(x: number): number {
  const c1 = 1.30158;
  const c3 = c1 + 1;
  return 1 + c3 * (x - 1) ** 3 + c1 * (x - 1) ** 2;
}

type PlankData = { bases: THREE.Vector3[]; order: number[] };

function Floor() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const progress = useRef(0);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const invalidate = useThree((s) => s.invalidate);

  // Configure the texture in the loader callback (not by mutating the hook
  // return during render) so it tiles correctly and reads in sRGB.
  const oak = useTexture(asset("/textures/oak.jpg"), (loaded) => {
    const tex = loaded as THREE.Texture;
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.anisotropy = 8;
    tex.colorSpace = THREE.SRGBColorSpace;
  });

  const { bases, order }: PlankData = useMemo(() => {
    const bases: THREE.Vector3[] = [];
    const order: number[] = [];
    for (let row = 0; row < ROWS; row++) {
      // Running-bond: offset every other course by half a plank.
      const offset = (row % 2) * (STEP_X * 0.5);
      for (let col = 0; col < COLS; col++) {
        const x = -FLOOR_W / 2 + col * STEP_X + STEP_X / 2 + offset;
        const z = -FLOOR_D / 2 + row * STEP_Z + STEP_Z / 2;
        bases.push(new THREE.Vector3(x, 0, z));
        // Locking order: mostly left-to-right, slightly front-to-back.
        order.push((col / COLS) * 0.72 + (row / ROWS) * 0.28);
      }
    }
    return { bases, order };
  }, []);

  // Writes every instance matrix for a given global progress p (0..1).
  function applyMatrices(p: number) {
    const mesh = meshRef.current;
    if (!mesh) return;
    for (let i = 0; i < COUNT; i++) {
      const start = order[i] * 0.72; // last plank starts at p=0.72, finishes ~1
      let t = (p - start) / 0.28;
      t = t < 0 ? 0 : t > 1 ? 1 : t;
      const e = t <= 0 ? 0 : easeOutBack(t);
      const base = bases[i];
      dummy.position.set(base.x, THREE.MathUtils.lerp(DROP_HEIGHT, 0, e), base.z);
      const tilt = (1 - Math.min(t, 1)) * 0.45; // tilt flattens as it lands
      dummy.rotation.set(tilt, 0, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }

  // Seed the starting (empty) state before the first paint.
  useLayoutEffect(() => {
    applyMatrices(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame(() => applyMatrices(progress.current));

  useGSAP(() => {
    gsap.set("#hero-overlay", { autoAlpha: 0, y: 26 });
    progress.current = 0;
    const tl = gsap.timeline();
    tl.to(progress, {
      current: 1,
      duration: 2.0,
      ease: "none",
      onUpdate: invalidate,
    });
    tl.to(
      "#hero-overlay",
      { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.55"
    );
  }, []);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
      <boxGeometry args={[PLANK_W, PLANK_H, PLANK_D]} />
      <meshStandardMaterial map={oak} roughness={0.55} metalness={0.04} />
    </instancedMesh>
  );
}

export default function HeroScene({ onReady }: { onReady?: () => void }) {
  return (
    <Canvas
      dpr={[1, 2]}
      frameloop="demand"
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      camera={{ position: [0, 3.4, 6], fov: 40 }}
      onCreated={({ camera, scene }) => {
        camera.lookAt(0, 0, -1);
        scene.background = new THREE.Color("#1b120a");
        scene.fog = new THREE.Fog("#1b120a", 7, 16);
        onReady?.();
      }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 8, 3]} intensity={1.5} />
      <directionalLight position={[-5, 4, -2]} intensity={0.4} color="#ffd9a8" />
      <Suspense fallback={null}>
        <Floor />
      </Suspense>
    </Canvas>
  );
}
