import { describe, it, expect } from "vitest";
import { QUALITY, qualityFromDevice, type DeviceTier } from "@/lib/three/quality";

describe("3D quality tiers", () => {
  it("has correct high tier config", () => {
    expect(QUALITY.high).toEqual({
      dpr: [1, 2],
      particleCount: 850,
      density: 1,
      shadow: false,
    });
  });

  it("has correct medium tier config", () => {
    expect(QUALITY.medium).toEqual({
      dpr: [1, 1.5],
      particleCount: 380,
      density: 0.7,
      shadow: false,
    });
  });

  it("has correct low tier config", () => {
    expect(QUALITY.low).toEqual({
      dpr: [1, 1],
      particleCount: 130,
      density: 0.4,
      shadow: false,
    });
  });

  it("qualityFromDevice returns high for desktop", () => {
    expect(qualityFromDevice(true, false)).toBe("high");
  });

  it("qualityFromDevice returns medium for tablet", () => {
    expect(qualityFromDevice(false, true)).toBe("medium");
  });

  it("qualityFromDevice returns low for mobile", () => {
    expect(qualityFromDevice(false, false)).toBe("low");
  });

  it("all tiers have required properties", () => {
    const tiers: DeviceTier[] = ["high", "medium", "low"];
    for (const tier of tiers) {
      expect(QUALITY[tier]).toHaveProperty("dpr");
      expect(QUALITY[tier]).toHaveProperty("particleCount");
      expect(QUALITY[tier]).toHaveProperty("density");
      expect(QUALITY[tier]).toHaveProperty("shadow");
      expect(Array.isArray(QUALITY[tier].dpr)).toBe(true);
      expect(QUALITY[tier].dpr.length).toBe(2);
      expect(typeof QUALITY[tier].particleCount).toBe("number");
      expect(typeof QUALITY[tier].density).toBe("number");
      expect(typeof QUALITY[tier].shadow).toBe("boolean");
    }
  });
});