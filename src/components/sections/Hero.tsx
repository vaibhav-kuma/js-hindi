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
  { ssr: false, loading: () => <SceneLoader label="powering up engineering core" /> },
);

/**
 * Landing hero — headline, tagline and a 3D engineering core that springs
 * to life on capable devices. Graceful fallbacks for WebGL-less and
 * reduced-motion users.
 */
export function Hero() {
  const { tier, reducedMotion } = useDeviceTier();
  const webgl = useWebglSupported();

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* 3D canvas — behind the content, only renders when WebGL is available */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {webgl ? (
          <HeroScene tier={tier} reduced={reducedMotion} />
        ) : (
          <WebGLFallback label="3D VIEW UNAVAILABLE — CORE ACCESSIBLE IN 2D" />
        )}
      </div>

      {/* Background grid (always visible, inert) */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Text column */}
          <div className="lg:col-span-6">
            <span className="sys-label">digital engineering lab</span>

            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-100 sm:text-5xl">
              <span className="block">I&apos;m {siteConfig.name}.</span>
              <span className="block text-cyan-300 text-glow-cyan mt-1">
                {siteConfig.role}
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg text-slate-300 leading-relaxed">
              {siteConfig.tagline}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
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
                className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-1.5 font-mono text-sm transition-colors hover:border-accent/50 hover:text-accent"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                GitHub /{siteConfig.githubUsername}
              </a>
            </div>

            {/* Positioning tags */}
            <div className="mt-10 flex flex-wrap gap-2">
              {siteConfig.positioning.map((pos) => (
                <span
                  key={pos}
                  className="inline-flex items-center gap-1 rounded border border-line/50 bg-white/[0.02] px-2.5 py-1 font-mono text-[11px] text-slate-400"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-mint"
                    aria-hidden="true"
                  />
                  {pos}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

