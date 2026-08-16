"use client";

import type { ProjectVisual } from "@/lib/types";
import { SecuritySphere } from "@/components/three/SecuritySphere";
import { AITransformationEngine } from "@/components/three/AITransformationEngine";
import { ThreatRadar } from "@/components/three/ThreatRadar";
import { ThreatNetwork } from "@/components/three/ThreatNetwork";
import { MonitoringGrid } from "@/components/three/MonitoringGrid";

/** Maps a curated project to its meaningful 3D representation. */
export function ProjectVisual({
  kind,
  reduced,
  hovered,
  density,
}: {
  kind: ProjectVisual | null;
  reduced?: boolean;
  hovered?: boolean;
  density?: number;
}) {
  const settings = { reduced, hovered, density };
  switch (kind) {
    case "soc-core":
      return <SecuritySphere {...settings} />;
    case "ai-engine":
      return <AITransformationEngine {...settings} />;
    case "threat-radar":
      return <ThreatRadar {...settings} />;
    case "threat-network":
      return <ThreatNetwork {...settings} />;
    case "monitoring-grid":
      return <MonitoringGrid {...settings} />;
    case null:
    default:
      return <SecuritySphere {...settings} />;
  }
}