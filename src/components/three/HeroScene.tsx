"use client";

import { DigitalCore } from "@/components/three/DigitalCore";
import { SceneCanvas } from "@/components/three/SceneCanvas";
import { QUALITY, type DeviceTier } from "@/lib/three/quality";

/** Lazy-loadable hero 3D scene (kept out of the main bundle). */
export function HeroScene({
  tier,
  reduced,
}: {
  tier: DeviceTier;
  reduced: boolean;
}) {
  return (
    <SceneCanvas
      camera={{ position: [0, 0, 7.4], fov: 45 }}
      tier={tier}
      reducedMotion={reduced}
    >
      <DigitalCore reduced={reduced} density={QUALITY[tier].density} />
    </SceneCanvas>
  );
}