"use client";

import { useRouter } from "next/navigation";
import type { ProjectConfig } from "@/lib/types";
import type { DeviceTier } from "@/lib/three/quality";
import { QUALITY } from "@/lib/three/quality";
import { SceneCanvas } from "@/components/three/SceneCanvas";
import { ProjectUniverseScene } from "@/components/three/ProjectUniverseScene";

/** Canvas-mounted wrapper for the 3D repository universe (lazy-loaded). */
export function ProjectUniverseCanvas({
  projects,
  hovered,
  setHovered,
  tier,
  reduced,
}: {
  projects: ProjectConfig[];
  hovered: string | null;
  setHovered: (slug: string | null) => void;
  tier: DeviceTier;
  reduced: boolean;
}) {
  const router = useRouter();

  return (
    <SceneCanvas
      camera={{ position: [0, 0.3, 8.4], fov: 50 }}
      tier={tier}
      reducedMotion={reduced}
      pointerEvents
      label="3D repository universe — press on a core to open its case study"
    >
      <ProjectUniverseScene
        projects={projects}
        hovered={hovered}
        setHovered={setHovered}
        reduced={reduced}
        density={QUALITY[tier].density}
        onSelect={(slug) => router.push(`/projects/${slug}`)}
      />
    </SceneCanvas>
  );
}