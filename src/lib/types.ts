/* ------------------------------------------------------------------ */
/* Shared strict types for the portfolio data & component layers.     */
/* ------------------------------------------------------------------ */

export type ProjectSlug =
  | "soc-platform"
  | "legacy-lift-ai"
  | "vadt"
  | "dark-exposure"
  | "threat-detection-monitoring-dashboard";

export type Tier = "FLAGSHIP" | "FEATURED" | "SECONDARY";

export type ProjectVisual =
  | "soc-core"
  | "ai-engine"
  | "threat-radar"
  | "threat-network"
  | "monitoring-grid";

/** One node in an architecture diagram. `stage` drives horizontal layout (0 → leftmost source). */
export interface ArchNode {
  id: string;
  label: string;
  technology?: string;
  stage: number;
  kind?: "ui" | "gateway" | "service" | "ai" | "queue" | "data" | "obs";
}

export interface ArchFlow {
  from: string;
  to: string;
  label?: string;
}

export interface ArchitectureDetail {
  summary: string;
  nodes: ArchNode[];
  flows: ArchFlow[];
  notes?: string[];
}

export interface RepositoryStatistics {
  language: string;
  stars: number;
  forks: number;
  createdAt: string; // ISO date (from GitHub)
  lastPush: string; // ISO date (from GitHub)
}

export interface ScreenshotAsset {
  /** Path under /public, e.g. "/projects/soc-platform/overview.png". Leave "" when unavailable. */
  src: string;
  caption: string;
}

export interface ProjectConfig {
  id: string;
  slug: ProjectSlug;
  name: string;
  shortName: string;
  tier: Tier;
  priority: number;
  category: string;
  tagline: string;
  summary: string;
  description: string;
  problem: string;
  solution: string;
  architecture: ArchitectureDetail;
  features: string[];
  technologies: string[];
  securityConsiderations: string[];
  aiCapabilities: string[];
  engineeringDecisions: string[];
  /** Only claims that are verifiable from the repository / GitHub metadata. */
  results: string[];
  futureImprovements: string[];
  githubUrl: string;
  demoUrl?: string;
  /** true only when the demo is confirmed reachable; otherwise the UI shows "unverified". */
  demoVerified?: boolean;
  statistics: RepositoryStatistics;
  visual: ProjectVisual | null;
  screenshots: ScreenshotAsset[];
}

export interface SecondaryProject {
  name: string;
  category: string;
  summary: string;
  language: string;
  stars: number;
  githubUrl: string;
  lastPush: string;
  highlights: string[];
}

/* ------------------------------- Skills ------------------------------- */

export type TechGroupId =
  | "languages"
  | "backend"
  | "frontend"
  | "cybersecurity"
  | "ai"
  | "infrastructure";

export interface TechnologyNode {
  id: string;
  label: string;
  group: TechGroupId;
  /** Project slugs that directly use this technology (see data/projects.ts). */
  projects: string[];
}

export interface TechnologyLink {
  source: string;
  target: string;
}

export interface TechGroup {
  id: TechGroupId;
  label: string;
  description: string;
}

/* ------------------------------- GitHub -------------------------------- */

export interface GitHubRepoData {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  url: string;
  topics: string[];
  pushedAt: string;
  homepage: string | null;
}

export interface GitHubProfileData {
  login: string;
  name: string;
  bio: string | null;
  location: string | null;
  publicRepos: number;
  followers: number;
  following: number;
  createdAt: string;
  blog: string | null;
}

/* ------------------------------ Activity ------------------------------ */

export interface LanguageCount {
  name: string;
  repoCount: number;
}

export interface ActivitySnapshot {
  username: string;
  profileUrl: string;
  memberSince: string;
  publicRepos: number;
  followers: number;
  topLanguages: LanguageCount[];
  recentRepositories: { name: string; pushedAt: string; url: string; language: string | null }[];
  asOf: string;
}

/* ------------------------------ Timeline ------------------------------ */

export interface TimelineEntry {
  date: string; // display label, e.g. "Jun 2026"
  title: string;
  description: string;
  repoName?: string;
  repoUrl?: string;
  tags: string[];
}

export interface NavigationItem {
  id: string;
  label: string;
}