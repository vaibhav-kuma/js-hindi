"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Threat-Detection-Monitoring-Dashboard — an observability infrastructure
 * grid. Metric "racks" on a lattice breathe with signal; the central node
 * flashes red for critical alerts on hover.
 */
export function MonitoringGrid({
  reduced = false,
  hovered = false,
  density = 1,
}: {
  reduced?: boolean;
  hovered?: boolean;
  density?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const instancedRef = useRef<THREE.InstancedMesh>(null);
  const core = useRef<THREE.Mesh>(null);

  const base = useMemo(() => {
    const cols = 5;
    const rows = 4;
    const cells: Array<{ x: number; z: number; phase: number; base: number }> = [];
    for (let z = 0; z < rows; z++) {
      for (let x = 0; x < cols; x++) {
        const xi = x - (cols - 1) / 2;
        const zi = z - (rows - 1) / 2;
        cells.push({
          x: xi * 0.55,
          z: zi * 0.55,
          phase: (x * 1.7 + z * 2.3) % (Math.PI * 2),
          base: 0.24 + ((x + z) % 3) * 0.1,
        });
      }
    }
    return cells;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);

  useEffect(() => {
    if (!instancedRef.current) return;
    const mesh = instancedRef.current;
    base.forEach((cell, i) => {
      color.setHSL(0.52 + (cell.x * 0.02), 0.9, 0.5);
      mesh.setColorAt(i, color);
    });
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [base, color]);

  useFrame((state, delta) => {
    if (!group.current || reduced) return;
    group.current.rotation.y += delta * (hovered ? 0.32 : 0.12);

    const t = state.clock.elapsedTime;
    base.forEach((cell, i) => {
      const pulse = Math.sin(t * 0.8 + cell.phase);
      const height = Math.max(0.12, cell.base + pulse * 0.34);
      dummy.position.set(cell.x, height / 2 - 0.42, cell.z);
      dummy.scale.set(1 + pulse * 0.08, height, 1 + pulse * 0.08);
      dummy.updateMatrix();
      instancedRef.current?.setMatrixAt(i, dummy.matrix);
    });
    if (instancedRef.current) {
      instancedRef.current.instanceMatrix.needsUpdate = true;
    }

    if (core.current) {
      const s = 1 + Math.sin(t * (hovered ? 6 : 1.8)) * 0.12;
      core.current.scale.setScalar(s);
      (core.current.material as THREE.MeshBasicMaterial).color = new THREE.Color(
        hovered ? "#f87171" : "#22d3ee",
      );
    }
  });

  return (
    <group ref={group}>
      {/* Base lattice */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.7, 48]} />
        <meshBasicMaterial color="#0d131c" transparent opacity={0.5} />
      </mesh>
      <gridHelper args={[3.4, 8, "#155e75", "#0e3a4e"]} position={[0, -0.44, 0]} />

      {/* Metric racks */}
      <instancedMesh ref={instancedRef} args={[undefined, undefined, base.length]}>
        <boxGeometry args={[0.14, 1, 0.14]} />
        <meshBasicMaterial transparent opacity={0.9} />
      </instancedMesh>

      {/* Central monitoring node */}
      <mesh ref={core} position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.95} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <torusGeometry args={[0.34, 0.006, 8, 48]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.6} />
      </mesh>

      {/* Floating alert signal */}
      <mesh position={[0.85, 1.35, 0.5]}>
        <tetrahedronGeometry args={[0.09, 0]} />
        <meshBasicMaterial color={hovered ? "#f87171" : "#34d399"} transparent opacity={0.95} />
      </mesh>
      <mesh position={[-0.9, 1.2, -0.4]}>
        <tetrahedronGeometry args={[0.07, 0]} />
        <meshBasicMaterial color="#34d399" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}