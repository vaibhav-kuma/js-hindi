"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { DataStream } from "@/components/three/DataStream";

/**
 * SOC_plateform — a Security Operations command core.
 * Interconnected security nodes orbit a bright core over event streams.
 */
export function SecuritySphere({
  reduced = false,
  hovered = false,
  density = 1,
}: {
  reduced?: boolean;
  hovered?: boolean;
  density?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);

  // Satellite security nodes (instanced-style individual small meshes).
  const satellites = useMemo(() => {
    const count = Math.round(14 * density);
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = 1.75 + (i % 3) * 0.22;
      return { angle, radius, offset: i * 137.5 }; // golden-angle spacing in the other ring
    });
  }, [density]);

  useFrame((state, delta) => {
    if (!group.current || reduced) return;
    group.current.rotation.y += delta * (hovered ? 0.5 : 0.16);
    if (core.current) core.current.rotation.z += delta * 0.3;
    if (shell.current) {
      shell.current.rotation.z -= delta * 0.12;
    }
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.2) * 0.05;
    if (core.current) core.current.scale.setScalar(pulse);
  });

  return (
    <group ref={group}>
      {/* Outer security shell */}
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshBasicMaterial color={hovered ? "#22d3ee" : "#155e75"} wireframe transparent opacity={hovered ? 0.7 : 0.5} />
      </mesh>

      {/* Glowing core */}
      <mesh ref={core}>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshBasicMaterial color={hovered ? "#67e8f9" : "#22d3ee"} transparent opacity={0.95} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.76, 20, 20]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={hovered ? 0.18 : 0.1} />
      </mesh>

      {/* Cross rings — the "command ring" */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.28, 0.008, 8, 64]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.7} />
      </mesh>
      <mesh rotation={[Math.PI / 2.6, 0.5, 0]}>
        <torusGeometry args={[1.18, 0.006, 8, 64]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.6} />
      </mesh>

      {/* Satellite security nodes */}
      {satellites.map((sat, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(sat.angle) * sat.radius,
            Math.sin(sat.angle + sat.radius) * 0.45,
            Math.sin(sat.angle) * sat.radius,
          ]}
        >
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshBasicMaterial
            color={hovered ? "#34d399" : i % 4 === 0 ? "#f87171" : "#67e8f9"}
            transparent
            opacity={hovered ? 0.95 : 0.7}
          />
        </mesh>
      ))}

      {/* Event streams */}
      <DataStream radius={1.55} count={24} color="#67e8f9" speed={0.5} reduced={reduced} />
      <DataStream radius={1.85} count={18} color="#a78bfa" speed={0.34} tilt={Math.PI / 1.7} reduced={reduced} />
    </group>
  );
}