"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * legacy-lift-ai — an AI transformation engine:
 * legacy blocks drift in on the left, pass through an agenting portal ring,
 * and stream out the right as modernized, glowing primitives.
 */
export function AITransformationEngine({
  reduced = false,
  hovered = false,
  density = 1,
}: {
  reduced?: boolean;
  hovered?: boolean;
  density?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const portal = useRef<THREE.Mesh>(null);
  const flow = useRef<THREE.Group>(null);

  // Particles travel a horizontal bezier through the portal.
  const particles = useMemo(() => {
    const count = Math.round(22 * density);
    return Array.from({ length: count }, (_, i) => ({
      seed: i / count,
      speed: 0.12 + ((i * 7) % 5) / 40,
    }));
  }, [density]);

  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2.6, 0.1, 0),
        new THREE.Vector3(-1.2, 0.4, 0.5),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(1.2, -0.3, -0.4),
        new THREE.Vector3(2.6, 0, 0),
      ]),
    [],
  );

    useFrame((state, delta) => {
    if (!group.current || reduced) return;
    group.current.rotation.y += delta * (hovered ? 0.4 : 0.14);
    if (portal.current) {
      portal.current.rotation.z += delta * 0.5;
    }
    if (flow.current) {
      const t = state.clock.elapsedTime;
      const meshes = flow.current.children as THREE.Mesh[];
      meshes.forEach((mesh, i) => {
        const particle = particles[i];
        if (!particle) return;
        const phase = t * particle.speed;
        const progress = (phase + particle.seed) % 1;
        const point = curve.getPoint(progress);
        mesh.position.copy(point);
        const scale = 1 + Math.sin(progress * Math.PI) * 0.8;
        mesh.scale.setScalar(0.04 + scale * 0.03);
        const material = mesh.material as THREE.MeshBasicMaterial;
        material.color = new THREE.Color(
          progress > 0.72 ? "#34d399" : progress > 0.35 ? "#22d3ee" : "#64748b",
        );
      });
    }
  });

  const legacyBlocks = useMemo(() => {
    const count = 7;
    return Array.from({ length: count }, (_, i) => ({
      x: -1.5 - (i % 3) * 0.55,
      y: 0.3 - Math.floor(i / 3) * 0.55,
      z: ((i * 13) % 5) / 5 - 0.2,
      size: 0.16 + ((i * 11) % 5) / 22,
    }));
  }, []);

  const modernBlocks = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        x: 1.5 + (i % 2) * 0.55,
        y: 0.35 - Math.floor(i / 2) * 0.55,
        size: 0.13 + ((i * 9) % 4) / 20,
      })),
    [],
  );

  return (
    <group ref={group}>
      {/* Legacy inputs */}
      {legacyBlocks.map((block, i) => (
        <mesh key={`legacy-${i}`} position={[block.x, block.y, block.z]}>
          <boxGeometry args={[block.size, block.size, block.size]} />
          <meshBasicMaterial color="#475569" transparent opacity={0.85} />
        </mesh>
      ))}

      {/* Portal ring */}
      <mesh ref={portal} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.85, 0.055, 16, 64]} />
        <meshBasicMaterial color={hovered ? "#a78bfa" : "#8b5cf6"} transparent opacity={0.95} />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0.4, 0]}>
        <torusGeometry args={[0.55, 0.02, 12, 48]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.6} />
      </mesh>

      {/* Modernized outputs */}
      {modernBlocks.map((block, i) => (
        <mesh key={`modern-${i}`} position={[block.x, block.y, 0]}>
          <tetrahedronGeometry args={[block.size, 0]} />
          <meshBasicMaterial color={hovered ? "#6ee7b7" : "#34d399"} transparent opacity={0.95} />
        </mesh>
      ))}

      {/* Flowing transformation particles */}
      <group ref={flow}>
        {particles.map((_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color="#22d3ee" transparent opacity={0.9} />
          </mesh>
        ))}
      </group>
    </group>
  );
}