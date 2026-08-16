"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** A stream of small glowing particles orbiting a tilted ring radius. */
export function DataStream({
  radius = 2.4,
  count = 22,
  color = "#22d3ee",
  speed = 0.25,
  tilt = Math.PI / 2,
  reduced = false,
  size = 0.02,
}: {
  radius?: number;
  count?: number;
  color?: string;
  speed?: number;
  tilt?: number;
  reduced?: boolean;
  size?: number;
}) {
  const ring = useRef<THREE.Group>(null);

  const angles = useMemo(
    () => Array.from({ length: count }, (_, i) => (i / count) * Math.PI * 2),
    [count],
  );

  useFrame((state) => {
    if (!ring.current || reduced) return;
    ring.current.rotation.z = state.clock.elapsedTime * speed;
  });

  return (
    <group rotation={[tilt, 0, 0]}>
      <group ref={ring}>
        {angles.map((angle, i) => (
          <mesh key={i} position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}>
            <sphereGeometry args={[size + (i % 3) * 0.006, 6, 6]} />
            <meshBasicMaterial color={color} transparent opacity={0.85} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/** Thin wireframe rings used inside most scenes. */
export function Ring({
  radius,
  tube = 0.004,
  color = "#155e75",
  rotation = [Math.PI / 2, 0, 0] as [number, number, number],
  opacity = 0.5,
}: {
  radius: number;
  tube?: number;
  color?: string;
  rotation?: [number, number, number];
  opacity?: number;
}) {
  return (
    <mesh rotation={rotation}>
      <torusGeometry args={[radius, tube, 8, 64]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}