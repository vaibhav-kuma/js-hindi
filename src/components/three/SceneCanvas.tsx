"use client";

import { Canvas } from "@react-three/fiber";
import type { ReactNode } from "react";
import { useWebglSupported } from "@/hooks/useWebgl";
import type { DeviceTier } from "@/lib/three/quality";
import { QUALITY } from "@/lib/three/quality";
import { cn } from "@/lib/utils";

type CameraProps = {
  position: [number, number, number];
  fov?: number;
};

/**
 * Shared WebGL scaffold:
 * - caps pixel ratio by device tier,
 * - serves `frameloop="demand"` when the visitor prefers reduced motion,
 * - returns null (→ DOM fallback) when WebGL is unavailable.
 */
export function SceneCanvas({
  children,
  className,
  camera = { position: [0, 0, 8], fov: 45 },
  tier = "high",
  reducedMotion = false,
  pointerEvents = false,
  label,
}: {
  children: ReactNode;
  className?: string;
  camera?: CameraProps;
  tier?: DeviceTier;
  reducedMotion?: boolean;
  pointerEvents?: boolean;
  label?: string;
}) {
  const webgl = useWebglSupported();
  const quality = QUALITY[tier];

  if (!webgl) return null;

  return (
    <div
      className={cn("absolute inset-0", className)}
      aria-hidden="true"
      aria-label={label}
    >
      <Canvas
        dpr={quality.dpr}
        frameloop={reducedMotion ? "demand" : "always"}
        camera={camera}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: pointerEvents ? "auto" : "none",
        }}
      >
        {children}
      </Canvas>
    </div>
  );
}

type SceneProps = CameraProps;