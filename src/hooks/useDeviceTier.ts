"use client";

import { useEffect, useState } from "react";
import type { DeviceTier } from "@/lib/three/quality";
import { qualityFromDevice } from "@/lib/three/quality";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function detectTier(): DeviceTier {
  if (typeof window === "undefined") return "high";
  const desktop = window.matchMedia("(min-width: 1024px) and (hover: hover)").matches;
  const tablet = window.matchMedia("(min-width: 768px) and (max-width: 1023px)").matches;
  return qualityFromDevice(desktop, tablet);
}

/** Resolves 'high' | 'medium' | 'low' after hydration (defaults to desktop tier on SSR). */
export function useDeviceTier(): { tier: DeviceTier; reducedMotion: boolean } {
  const [tier, setTier] = useState<DeviceTier>("high");
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    setTier(detectTier());
    const onResize = () => setTier(detectTier());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return { tier, reducedMotion };
}