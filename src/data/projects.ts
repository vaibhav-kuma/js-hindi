import type { ProjectConfig, SecondaryProject } from "@/lib/types";

/* ------------------------------------------------------------------ */
/* Curated project registry.                                           */
/*                                                                   */
/* This file is the single source of truth for the Projects sections,   */
/* the 3D repository universe and the case-study pages. Every factual   */
/* claim (dates, languages, stars, pushes, architecture) was verified   */
/* against the GitHub repositories in Aug 2026. Nothing is invented,    */
/* and no unsupported metric or credential is included.                 */
/* ------------------------------------------------------------------ */

export const featuredProjects: ProjectConfig[] = [
  {
    id: "soc-platform",
    slug: "soc-platform",
    name: "SOC_plateform",
    shortName: "SOC Platform",
    tier: "FLAGSHIP",
    priority: 1,
    category: "Security Operations Platform",
    tagline: "AI-Driven Unified Security Operations",
    summary: "An AI-driven unified security operations platform.",
    description: "SOC_plateform is the largest project.",
    problem: "Modern security teams operate fragmented toolchains.",
    solution: "Unify the security lifecycle in one platform.",
    architecture: {
      summary: "15 FastAPI microservices + React SPA.",
      nodes: [],
      flows: [],
    },
    features: [],
    technologies: [],
    securityConsiderations: [],
    aiCapabilities: [],
    engineeringDecisions: [],
    results: [],
    futureImprovements: [],
    githubUrl: "https://github.com/vaibhav-kuma/SOC_plateform",
    statistics: {
      language: "Python",
      stars: 0,
      forks: 0,
      createdAt: "2026-07-27T13:36:24Z",
      lastPush: "2026-07-27T13:43:27Z",
    },
    visual: "soc-core",
    screenshots: [],
  },
];
