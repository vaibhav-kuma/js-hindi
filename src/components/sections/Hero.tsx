"use client";

import dynamic from "next/dynamic";
import { ArrowDown, Github } from "lucide-react";
import { useDeviceTier } from "@/hooks/useDeviceTier";
import { useWebglSupported } from "@/hooks/useWebgl";
import { siteConfig } from "@/data/site";
import { SceneLoader, WebGLFallback } from "@/components/three/SceneLoader";
import { Button } from "@/components/ui/Button";

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((m) => m.HeroScene),
  { ssr: false, loading: () => <SceneLoader label="Initializing engineering core" /> },
);

interface HeroProps {
  className?: string;
}

/**
 * Landing hero — headline, tagline and a 3D engineering core that springs
 * to life on capable devices. Graceful fallbacks for WebGL-less and
 * reduced-motion users.
 */
export function Hero({ className }: HeroProps) {
  const { tier, reducedMotion } = useDeviceTier();
  const webgl = useWebglSupported();

  return (
    <section
      id="top"
      className={`relative flex min-h-screen items-center overflow-hidden ${className ?? ""}`}
    >
      {/* 3D canvas — behind the content, only renders when WebGL is available */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {webgl ? (
          <HeroScene tier={tier} reduced={reducedMotion} />
        ) : (
          <WebGLFallback label="3D VIEW UNAVAILABLE — CORE ACCESSIBLE IN 2D" />
        )}
      </div>

      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-primary)] via-transparent to-[var(--color-bg-primary)]" />
      </div>

      {/* Radial gradient glow behind 3D scene */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-accent/10 blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Text column */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
              <span className="sys-label">digital engineering lab</span>
              <span className="h-px w-24 bg-gradient-to-r from-accent/50 to-transparent" aria-hidden="true" />
            </div>

            <h1 className="mt-6 font-display text-display-lg font-semibold tracking-tight text-[var(--color-text-primary)]">
              <span className="block">I&apos;m {siteConfig.name}.</span>
              <span className="block text-accent text-glow-cyan mt-2">
                {siteConfig.role}
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-body-lg text-[var(--color-text-secondary)] leading-relaxed">
              {siteConfig.tagline}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                variant="primary"
                icon={<ArrowDown className="h-4 w-4" aria-hidden="true" />}
                onClick={() => {
                  const el = document.getElementById("about");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                Explore the lab
              </Button>
              <a
                href={siteConfig.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                <span>GitHub /{siteConfig.githubUsername}</span>
              </a>
            </div>

            {/* Positioning tags */}
            <div className="mt-10 flex flex-wrap gap-2">
              {siteConfig.positioning.map((pos) => (
                <span
                  key={pos}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 font-mono text-[11px] text-[var(--color-text-secondary)] transition-colors hover:border-accent/50 hover:text-accent"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-mint"
                    aria-hidden="true"
                  />
                  {pos}
                </span>
              ))}
            </div>

            {/* Location & status */}
            <div className="mt-8 flex items-center gap-6 text-sm text-[var(--color-text-muted)]">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-mint animate-ping opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
                </span>
                <span>{siteConfig.location}</span>
              </div>
              {siteConfig.openToOpportunities && (
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber" aria-hidden="true" />
                  <span>Open to opportunities</span>
                </div>
              )}
            </div>
          </div>

          {/* Right column - Visual element or stats */}
          <div className="hidden lg:block lg:col-span-6">
            <div className="relative h-[400px] rounded-2xl border border-border bg-[var(--color-card)]/50 backdrop-blur-sm">
              <div className="absolute inset-0 flex items-center justify-center text-[var(--color-text-muted)]">
                <div className="text-center p-8">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl border border-border mx-auto">
                    <span className="text-2xl font-mono text-accent">◈</span>
                  </div>
                  <p className="font-mono text-sm uppercase tracking-wider">Interactive 3D Core</p>
                  <p className="mt-1 text-xs">WebGL-powered engineering visualization</p>
                </div>
              </div>
              {/* Floating indicator */}
              <div className="absolute bottom-6 right-6 flex items-center gap-2 rounded-lg border border-[var(--color-border)]/50 bg-[var(--color-card)]/80 px-3 py-2 text-xs font-mono text-[var(--color-text-muted)] backdrop-blur-sm">
                <span className="flex h-2 w-2">
                  <span className="relative inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
                </span>
                <span>Tier: {tier.toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <ArrowDown className="h-6 w-6 text-[var(--color-text-muted)]" />
      </div>
    </section>
  );
}