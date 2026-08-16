"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { ProjectConfig } from "@/lib/types";
import { ProjectVisual } from "@/components/three/ProjectVisual";

/**
 * Interactive project node in the repository universe:
 * enlarges on hover, rotates, and routes clicks to the case-study page.
 */
export function RepositoryNode({
  project,
  position,
  scale,
  hovered,
  onHover,
  onSelect,
  reduced = false,
  density = 1,
}: {
  project: ProjectConfig;
  position: [number, number, number];
  scale: number;
  hovered: boolean;
  onHover: (slug: string | null) => void;
  onSelect: (slug: string) => void;
  reduced?: boolean;
  density?: number;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    const target = hovered ? scale * 1.14 : scale;
    group.current.scale.setScalar(
      THREE.MathUtils.lerp(group.current.scale.x, target, 0.09),
    );
    if (!reduced) {
      group.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group
      position={position}
      onPointerOver={(event) => {
        event.stopPropagation();
        onHover(project.slug);
      }}
      onPointerOut={() => onHover(null)}
      onPointerUp={() => onHover(null)}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(project.slug);
      }}
    >
      <group ref={group} scale={scale}>
        <ProjectVisual
          kind={project.visual}
          reduced={reduced}
          hovered={hovered}
          density={density}
        />
      </group>
    </group>
  );
}