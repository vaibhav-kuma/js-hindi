"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Additive-blended star field / ambient particles drifting around the origin. */
export function ParticleField({
  count = 300,
  radius = 6,
  color = "#22d3ee",
  size = 0.022,
  speed = 0.04,
  reduced = false,
}: {
  count?: number;
  radius?: number;
  color?: string;
  size?: number;
  speed?: number;
  reduced?: boolean;
}) {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);
    const rng = mulberry32(7);
    for (let i = 0; i < count; i++) {
      const r = radius * (0.3 + rng() * 0.7);
      const theta = rng() * Math.PI * 2;
      const phi = Math.acos(2 * rng() - 1);
      array[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      array[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.55;
      array[i * 3 + 2] = r * Math.cos(phi);
    }
    return array;
  }, [count, radius]);

  useFrame((state) => {
    if (!points.current || reduced) return;
    const t = state.clock.elapsedTime;
    points.current.rotation.y = t * speed;
    points.current.rotation.x = Math.sin(t * speed * 0.6) * 0.06;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Deterministic PRNG so constellation layouts are stable between renders. */
function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export { mulberry32 };