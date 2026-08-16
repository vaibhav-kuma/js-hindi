import type { ActivitySnapshot } from "@/lib/types";

/**
 * Engineering Activity — snapshot of verified GitHub facts.
 * Used as the default source of truth; the Activity section may enrich this
 * snapshot at request time via lib/github.ts (with an optional server-side token).
 */
export const activitySnapshot: ActivitySnapshot = {
  username: "vaibhav-kuma",
  profileUrl: "https://github.com/vaibhav-kuma",
  memberSince: "2024-06-24",
  publicRepos: 49,
  followers: 2,
  topLanguages: [
    { name: "Python", repoCount: 16 },
    { name: "TypeScript", repoCount: 9 },
    { name: "JavaScript", repoCount: 5 },
    { name: "HTML", repoCount: 3 },
    { name: "Java", repoCount: 2 },
  ],
  recentRepositories: [
    { name: "Neww", pushedAt: "2026-08-10", url: "https://github.com/vaibhav-kuma/Neww", language: "TypeScript" },
    { name: "Startup", pushedAt: "2026-08-10", url: "https://github.com/vaibhav-kuma/Startup", language: null },
    { name: "VADT", pushedAt: "2026-08-01", url: "https://github.com/vaibhav-kuma/VADT", language: "Python" },
    { name: "SOC_plateform", pushedAt: "2026-07-27", url: "https://github.com/vaibhav-kuma/SOC_plateform", language: "Python" },
    { name: "legacy-lift-ai", pushedAt: "2026-07-20", url: "https://github.com/vaibhav-kuma/legacy-lift-ai", language: "TypeScript" },
    { name: "Backend-Engineering", pushedAt: "2026-06-26", url: "https://github.com/vaibhav-kuma/Backend-Engineering", language: "Java" },
  ],
  asOf: "2026-08-16",
};

/** Secondary observation about the language spread (kept factual). */
export const languageRemark =
  "Primary-repo languages also include C, C#, C++, CSS, PHP and Jupyter Notebook — the profile spans systems-level engineering to applied AI.";

/** Recent activity periods by repo (verified from pushed_at dates). */
export const activityLine: Array<{ period: string; label: string }> = [
  { period: "2026-08", label: "active this week" },
  { period: "2026-07", label: "flagship projects shipped" },
  { period: "2026-03", label: "open-source & runtime security" },
  { period: "2025-11", label: "observability & intel wave" },
  { period: "2024-06", label: "joined GitHub" },
];