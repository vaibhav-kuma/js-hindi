"use client";

import { cn } from "@/lib/utils";

/** Static poster shown while a WebGL scene loads (or as 2D flavor behind UI). */
export function SceneLoader({ label = "initializing 3D scene", className }: { label?: string; className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center gap-3 overflow-hidden",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <div className="shimmer-box h-24 w-24 rounded-full" />
      <span className="sys-label animate-pulse">{label}…</span>
    </div>
  );
}

/** Static 2.5D poster used when WebGL is unavailable or 3D is disabled. */
export function WebGLFallback({
  label = "3D VIEW UNAVAILABLE — CORE ACCESSIBLE IN 2D",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden",
        className,
      )}
      aria-hidden="true"
    >
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div className="relative flex flex-col items-center gap-2">
        <div className="relative h-28 w-28 rounded-full border border-border">
          <div className="absolute inset-4 rounded-full border border-border" />
          <div className="absolute inset-9 rounded-full border border-border" />
          <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-glow" />
        </div>
        <span className="sys-label">{label}</span>
      </div>
    </div>
  );
}