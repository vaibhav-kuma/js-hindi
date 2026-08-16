"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * DarkExposure — a threat-intelligence network.
 * Nodes on a digital globe represent threats, domains and exposure signals;
 * edges trace the intelligence relationships between them.
 */
export function ThreatNetwork({
  reduced = false,
  hovered = false,
  density = 1,
}: {
  reduced?: boolean;
  hovered?: boolean;
  density?: number;
}) {
  const group = useRef<THREE.Group>(null);

  const config = useMemo(() => {
    const nodeCount = Math.round(44 * density);
    // Fibonacci sphere for even distribution.
    const nodes: THREE.Vector3[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = golden * i;
      nodes.push(
        new THREE.Vector3(
          Math.cos(theta) * radius,
          y,
          Math.sin(theta) * radius,
        ),
      );
    }

    // Connect each node to its 2 nearest neighbours.
    const edgePairs: Array<[THREE.Vector3, THREE.Vector3]> = [];
    for (let i = 0; i < nodes.length; i++) {
      const distances = nodes
        .map((other, j) => ({ j, d: i === j ? Infinity : nodes[i].distanceTo(other) }))
        .sort((a, b) => a.d - b.d)
        .slice(0, 2);
      for (const { j } of distances) {
        if (i < j) edgePairs.push([nodes[i], nodes[j]]);
      }
    }
    return { nodes, edgePairs };
  }, [density]);

  const linePositions = useMemo(() => {
    const positions = new Float32Array(config.edgePairs.length * 6);
    config.edgePairs.forEach(([a, b], i) => {
      positions[i * 6] = a.x;
      positions[i * 6 + 1] = a.y;
      positions[i * 6 + 2] = a.z;
      positions[i * 6 + 3] = b.x;
      positions[i * 6 + 4] = b.y;
      positions[i * 6 + 5] = b.z;
    });
    return positions;
  }, [config]);

  const nodePositions = useMemo(() => {
    const positions = new Float32Array(config.nodes.length * 3);
    config.nodes.forEach((node, i) => {
      positions[i * 3] = node.x;
      positions[i * 3 + 1] = node.y;
      positions[i * 3 + 2] = node.z;
    });
    return positions;
  }, [config]);

  useFrame((state, delta) => {
    if (!group.current || reduced) return;
    group.current.rotation.y += delta * (hovered ? 0.35 : 0.12);
  });

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[1.1, 24, 24]} />
        <meshBasicMaterial color="#0e1319" wireframe transparent opacity={0.35} />
      </mesh>

      {/* Intelligence relationship lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color={hovered ? "#8b5cf6" : "#475569"}
          transparent
          opacity={hovered ? 0.5 : 0.3}
        />
      </lineSegments>

      {/* Network nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.055}
          color={hovered ? "#a78bfa" : "#67e8f9"}
          transparent
          opacity={hovered ? 0.95 : 0.6}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Anomaly indicators (few red hotspots, brighter on hover) */}
      {[0.3, 0.7, 0.9].map((n) => {
        const point = config.nodes[Math.floor(n * config.nodes.length)];
        return (
          <mesh key={n} position={point}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color={hovered ? "#f87171" : "#7f1d1d"} transparent opacity={hovered ? 0.95 : 0.7} />
          </mesh>
        );
      })}
    </group>
  );
}