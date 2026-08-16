"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ParticleField } from "@/components/three/ParticleField";
import { DataStream, Ring } from "@/components/three/DataStream";

/**
 * Hero centerpiece — a procedurally-built "engineering core":
 * wireframe icosahedron, emissive inner core, orbit rings, data streams and
 * a particle field. Reacts subtly to the cursor.
 */
export function DigitalCore({
  reduced = false,
  density = 1,
}: {
  reduced?: boolean;
  density?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!group.current || reduced) return;
    const t = state.clock.elapsedTime;

    // Mouse parallax with smoothing.
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      state.pointer.x * 0.45,
      0.025,
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -state.pointer.y * 0.28,
      0.025,
    );

    if (core.current) {
      core.current.rotation.z += delta * 0.25;
      const pulse = 1 + Math.sin(t * 1.6) * 0.04;
      core.current.scale.setScalar(pulse);
    }
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.4;
      inner.current.rotation.z += delta * 0.2;
    }
    void t;
  });

  const particleCount = Math.round(500 * density);

  return (
    <group ref={group}>
      {/* Ambient light for tone */}
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 6]} intensity={12} color="#22d3ee" />
      <pointLight position={[-4, -3, -5]} intensity={8} color="#8b5cf6" />

      {/* Outer wireframe shell */}
      <mesh>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial color="#164e63" wireframe transparent opacity={0.42} />
      </mesh>

      {/* Core */}
      <mesh ref={core}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.92} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.98, 24, 24]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.1} />
      </mesh>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.42, 0]} />
        <meshBasicMaterial color="#0e7490" transparent opacity={0.7} />
      </mesh>

      {/* Rings */}
      <Ring radius={1.9} color="#164e63" opacity={0.55} rotation={[Math.PI / 2, 0, 0]} />
      <Ring radius={2.15} color="#8b5cf6" opacity={0.3} rotation={[Math.PI / 2.4, 0.4, 0.1]} tube={0.005} />
      <Ring radius={1.7} color="#34d399" opacity={0.25} rotation={[Math.PI / 3.2, -0.3, 0]} tube={0.003} />

      <DataStream radius={1.95} count={20} color="#67e8f9" speed={0.3} reduced={reduced} />
      <DataStream radius={2.4} count={26} color="#a78bfa" speed={0.22} tilt={Math.PI / 1.55} reduced={reduced} />

      <ParticleField count={particleCount} radius={5.5} color="#22d3ee" size={0.02} speed={0.05} reduced={reduced} />
    </group>
  );
}