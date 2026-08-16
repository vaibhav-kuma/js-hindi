"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Line } from "@react-three/drei";
import type { ProjectConfig } from "@/lib/types";
import { RepositoryNode } from "@/components/three/RepositoryNode";

export const UNIVERSE_LAYOUT: Record<
  string,
  { position: [number, number, number]; scale: number }
> = {
  "soc-platform": { position: [0, 0.35, 0], scale: 1.55 },
  "legacy-lift-ai": { position: [-3.0, 1.15, -0.6], scale: 1.0 },
  vadt: { position: [3.0, 1.15, -0.6], scale: 0.95 },
  "dark-exposure": { position: [-2.7, -1.2, 0.45], scale: 1.0 },
  "threat-detection-monitoring-dashboard": { position: [2.7, -1.2, 0.45], scale: 1.0 },
};

/**
 * The 3D repository universe: the flagship SOC core sits at center stage,
 * connected by intelligence lines to the four featured projects.
 */
export function ProjectUniverseScene({
  projects,
  hovered,
  setHovered,
  onSelect,
  reduced = false,
  density = 1,
}: {
  projects: ProjectConfig[];
  hovered: string | null;
  setHovered: (slug: string | null) => void;
  onSelect: (slug: string) => void;
  reduced?: boolean;
  density?: number;
}) {
  const drift = useRef<THREE.Group>(null);

  const flagship = useMemo(
    () => projects.find((project) => project.tier === "FLAGSHIP"),
    [projects],
  );

  const companions = useMemo(
    () => projects.filter((project) => project.tier !== "FLAGSHIP"),
    [projects],
  );

  // Connection curves: flagship → each featured project.
  const connections = useMemo(() => {
    if (!flagship) return [];
    const origin = UNIVERSE_LAYOUT[flagship.slug]?.position ?? [0, 0.35, 0];
    return companions.map((companion) => {
      const target = UNIVERSE_LAYOUT[companion.slug]?.position ?? [0, 0, 0];
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(...origin),
        new THREE.Vector3(
          (origin[0] + target[0]) / 2,
          Math.max(origin[1], target[1]) + 0.55,
          (origin[2] + target[2]) / 2,
        ),
        new THREE.Vector3(...target),
      ]);
      return { companion, curve };
    });
  }, [flagship, companions]);

  useFrame((state, delta) => {
    if (!drift.current || reduced) return;
    drift.current.rotation.y += delta * 0.02;
    if (state.pointer.x) {
      drift.current.rotation.x = THREE.MathUtils.lerp(
        drift.current.rotation.x,
        -state.pointer.y * 0.05,
        0.02,
      );
    }
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[5, 5, 7]} intensity={14} color="#22d3ee" />
      <pointLight position={[-5, -4, -6]} intensity={10} color="#8b5cf6" />

      <group ref={drift}>
        {connections.map(({ companion, curve }) => {
          const active = hovered === companion.slug;
          return (
            <Line
              key={companion.slug}
              points={curve.getPoints(28)}
              color={active ? "#a78bfa" : "#155e75"}
              transparent
              opacity={active ? 0.7 : 0.28}
              lineWidth={active ? 1.2 : 0.7}
            />
          );
        })}

        {projects.map((project) => {
          const layout = UNIVERSE_LAYOUT[project.slug];
          return (
            <RepositoryNode
              key={project.slug}
              project={project}
              position={layout.position}
              scale={layout.scale}
              hovered={hovered === project.slug}
              onHover={setHovered}
              onSelect={onSelect}
              reduced={reduced}
              density={density}
            />
          );
        })}
      </group>
    </>
  );
}