"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { Github } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { featuredProjects, secondaryProjects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import type { ProjectConfig } from "@/lib/types";
import { useDeviceTier } from "@/hooks/useDeviceTier";
import { useWebglSupported } from "@/hooks/useWebgl";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { RepoCard } from "@/components/projects/RepoCard";
import { SceneLoader, WebGLFallback } from "@/components/three/SceneLoader";

const ProjectUniverseCanvas = dynamic(
  () =>
    import("@/components/projects/ProjectUniverseCanvas").then(
      (m) => m.ProjectUniverseCanvas,
    ),
  { ssr: false, loading: () => <SceneLoader label="mounting repository universe" /> },
);

const featured = featuredProjects;

function ProjectHoverCard({ project }: { project: ProjectConfig }) {
  return (
    <div className="pointer-events-none absolute right-4 top-12 z-20 w-[calc(100%-2rem)] max-w-sm sm:right-6">
      <motion.aside
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        className="rounded-xl border border-accent/40 bg-void/90 p-4 shadow-glow-sm backdrop-blur-md"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
            {project.category}
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 sm:inline">
            click to open case study
          </span>
        </div>
        <h3 className="mt-1.5 font-display text-lg font-semibold text-cyan-100">
          {project.name}
        </h3>
        <p className="mt-1.5 line-clamp-3 text-[13px] leading-relaxed text-slate-300">
          {project.summary}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="rounded border border-line bg-white/[0.03] px-1.5 py-0.5 font-mono text-[10px] text-slate-400"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.aside>
    </div>
  );
}

export function ProjectsUniverse() {
  const [hovered, setHovered] = useState<string | null>(null);
  const { tier, reducedMotion } = useDeviceTier();
  const webgl = useWebglSupported();

  const handleHover = useCallback((slug: string | null) => setHovered(slug), []);
  const hoveredProject =
    featured.find((project) => project.slug === hovered) ?? null;
  const flagship = featured.find((project) => project.tier === "FLAGSHIP") ?? null;
  const companions = featured.filter((project) => project.tier !== "FLAGSHIP");

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative scroll-mt-20 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            index="03"
            eyebrow="Featured Projects — repository universe"
            title={
              <span id="projects-heading">
                A universe of <span className="text-cyan-300">engineered systems</span>,{" "}
                ranked by impact
              </span>
            }
            description="Every curated repository gets the same engineering honesty — but not the same stage. The platforms at the center of my professional identity lead the universe; the full catalog stays navigable in 2D below, WebGL or not."
          />
        </Reveal>

        <div className="relative mt-12 min-h-[400px] overflow-hidden rounded-xl border border-line bg-surface/15 sm:min-h-[480px] lg:min-h-[560px]">
          <div className="absolute inset-0 bg-lines opacity-60" aria-hidden="true" />
          {webgl ? (
            <>
              <ProjectUniverseCanvas
                projects={featured}
                hovered={hovered}
                setHovered={handleHover}
                tier={tier}
                reduced={reducedMotion}
              />
              <div className="pointer-events-none absolute inset-x-6 top-4 z-10 flex items-center justify-between">
                <span className="sys-label">universe ▸ 5 curated systems</span>
                <span className="sys-label hidden sm:block">
                  hover a core · click opens the case study
                </span>
              </div>
              <AnimatePresence>
                {hoveredProject ? (
                  <ProjectHoverCard project={hoveredProject} />
                ) : null}
              </AnimatePresence>
            </>
          ) : (
            <WebGLFallback label="WEBGL UNAVAILABLE — PROJECTS ARE PRESENTED IN 2D BELOW" />
          )}
        </div>

        <div className="mt-10 space-y-6">
          {flagship ? (
            <Reveal>
              <RepoCard project={flagship} large />
            </Reveal>
          ) : null}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {companions.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.05}>
                <RepoCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-16">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="sys-label">
              secondary experimental surface — {secondaryProjects.length} repos
            </h3>
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-slate-400 transition-colors hover:text-cyan-200"
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              view all on github
            </a>
          </div>

          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {secondaryProjects.map((repo) => (
              <li key={repo.name}>
                <a
                  href={repo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="panel-nested flex h-full flex-col gap-2 p-4 transition-colors hover:border-accent/35"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-[12px] text-slate-200">
                      {repo.name}
                    </span>
                    <span className="inline-flex shrink-0 items-center gap-1 font-mono text-[10px] text-slate-500">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: languageHex(repo.language) }}
                        aria-hidden="true"
                      />
                      {repo.language ?? "—"}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-[12px] leading-relaxed text-slate-400">
                    {repo.summary}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-1 pt-1">
                    {repo.highlights.slice(0, 3).map((highlight) => (
                      <span
                        key={highlight}
                        className="rounded border border-line/70 bg-white/[0.02] px-1.5 py-0.5 font-mono text-[10px] text-slate-500"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function languageHex(language: string): string {
  const map: Record<string, string> = {
    Python: "#3572A5",
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    C: "#555555",
    "C#": "#178600",
    Java: "#b07219",
    PHP: "#4F5D95",
    "Jupyter Notebook": "#DA5B0B",
    HTML: "#e34c26",
  };
  return map[language] ?? "#64748b";
}
