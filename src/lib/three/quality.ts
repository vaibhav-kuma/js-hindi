/**
 * Device-tier based 3D quality presets.
 * Desktop gets the full experience, tablets are reduced, mobile is lightweight.
 */
export type DeviceTier = "high" | "medium" | "low";

export interface QualityTierConfig {
  /** Three.js dpr range for <Canvas>. */
  dpr: [number, number];
  /** Screen-space particle budget multiplier. */
  particleCount: number;
  /** Overall density multiplier (node counts etc). */
  density: number;
  shadow: boolean;
}

export const QUALITY: Record<DeviceTier, QualityTierConfig> = {
  high: {
    dpr: [1, 2],
    particleCount: 850,
    density: 1,
    shadow: false,
  },
  medium: {
    dpr: [1, 1.5],
    particleCount: 380,
    density: 0.7,
    shadow: false,
  },
  low: {
    dpr: [1, 1],
    particleCount: 130,
    density: 0.4,
    shadow: false,
  },
};

export function qualityFromDevice(
  isDesktop: boolean,
  isTablet: boolean,
): DeviceTier {
  if (isDesktop) return "high";
  if (isTablet) return "medium";
  return "low";
}