"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * VADT — an interactive threat-detection radar.
 * A sweep sector scans continuously; threat blips blink on the rings
 * (more intensely when hovered while you explore the project).
 */
export function ThreatRadar({
  reduced = false,
  hovered = false,
  density = 1,
}: {
  reduced?: boolean;
  hovered?: boolean;
  density?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const sweep = useRef<THREE.Mesh>(null);
  const blipRefs = useRef<Array<THREE.Mesh | null>>([]);

  const blips = useMemo(() => {
    const count = Math.round(9 * density);
    return Array.from({ length: count }, (_, i) => {
      const radius = 0.55 + ((i * 17) % 90) / 100 * 1.0;
      return {
        radius,
        angle: ((i * 137.5) % 360) * (Math.PI / 180),
        speed: 0.6 + ((i * 5) % 4) / 4,
        phase: (i / count) * Math.PI * 2,
      };
    });
  }, [density]);

  useFrame((state, delta) => {
    if (!group.current || reduced) return;
    group.current.rotation.y += delta * (hovered ? 0.3 : 0.1);
    if (sweep.current) sweep.current.rotation.z += delta * 0.9;
    if (reduced) return;

    const t = state.clock.elapsedTime;
    blips.forEach((blip, i) => {
      const mesh = blipRefs.current[i];
      if (!mesh) return;
      const p = (Math.sin(t * blip.speed + blip.phase) + 1) / 2;
      mesh.visible = p > 0.5;
      const material = mesh.material as THREE.MeshBasicMaterial;
      material.opacity = hovered ? 0.9 : 0.5 + p * 0.4;
      material.color = new THREE.Color(
        hovered && p > 0.85 ? "#f87171" : p > 0.8 ? "#34d399" : "#67e8f9",
      );
    });
  });

  return (
    <group ref={group} rotation={[-Math.PI / 2, 0, 0]}>
      {/* Radar ground disc & rings live flat on the ground plane */}
      <mesh>
        <circleGeometry args={[1.55, 48]} />
        <meshBasicMaterial color="#0d131c" transparent opacity={0.6} />
      </mesh>
      {[0.55, 1.0, 1.45].map((radius) => (
        <mesh key={radius}>
          <ringGeometry args={[radius - 0.008, radius, 48, 1]} />
          <meshBasicMaterial color="#155e75" transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>
      ))}
      {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle) => (
        <mesh key={angle} rotation={[0, 0, angle]}>
          <boxGeometry args={[3.1, 0.006, 0.002]} />
          <meshBasicMaterial color="#0e3a4e" transparent opacity={0.6} />
        </mesh>
      ))}

      {/* Sweep sector */}
      <mesh ref={sweep} rotation={[0, 0, 0]}>
        <ringGeometry args={[0.02, 1.52, 48, 1, 0, 0.9]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={hovered ? 0.35 : 0.18}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Center node */}
      <mesh>
        <circleGeometry args={[0.07, 16]} />
        <meshBasicMaterial color={hovered ? "#34d399" : "#22d3ee"} />
      </mesh>

      {/* Threat blips */}
      {blips.map((blip, i) => (
        <mesh
          key={i}
          ref={(mesh) => {
            blipRefs.current[i] = mesh;
          }}
          position={[
            Math.cos(blip.angle) * blip.radius,
            Math.sin(blip.angle) * blip.radius,
            0.01,
          ]}
        >
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshBasicMaterial color="#34d399" transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
}