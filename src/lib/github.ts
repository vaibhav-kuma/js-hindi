import type { GitHubProfileData, GitHubRepoData } from "@/lib/types";

/**
 * Server-side GitHub data layer.
 *
 * - Runs only in Server Components (never bundles a token to the client).
 * - If no GITHUB_TOKEN is configured, unauthenticated API calls still work
 *   (rate-limited to 60 req/h per IP) — and every consumer in this app
 *   falls back to the local curated snapshot in src/data.
 *
 * This module intentionally returns `null` on failure instead of throwing,
 * so the UI can always degrade gracefully.
 */

const GITHUB_API = "https://api.github.com";
const token = process.env.GITHUB_TOKEN ?? "";

function headers(): Record<string, string> {
  const result: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) result.Authorization = `Bearer ${token}`;
  return result;
}

export async function fetchGitHubProfile(
  username: string,
): Promise<GitHubProfileData | null> {
  try {
    const response = await fetch(`${GITHUB_API}/users/${username}`, {
      headers: headers(),
      next: { revalidate: 3600 },
    });
    if (!response.ok) return null;
    const data = (await response.json()) as Record<string, unknown>;
    return {
      login: String(data.login ?? username),
      name: typeof data.name === "string" ? data.name : username,
      bio: typeof data.bio === "string" ? data.bio : null,
      location: typeof data.location === "string" ? data.location : null,
      publicRepos: typeof data.public_repos === "number" ? data.public_repos : 0,
      followers: typeof data.followers === "number" ? data.followers : 0,
      following: typeof data.following === "number" ? data.following : 0,
      createdAt: typeof data.created_at === "string" ? data.created_at : "",
      blog: typeof data.blog === "string" && data.blog ? data.blog : null,
    };
  } catch {
    return null;
  }
}

export async function fetchGitHubRepositories(
  username: string,
): Promise<GitHubRepoData[] | null> {
  try {
    const response = await fetch(
      `${GITHUB_API}/users/${username}/repos?per_page=100&sort=updated`,
      { headers: headers(), next: { revalidate: 3600 } },
    );
    if (!response.ok) return null;
    const data = (await response.json()) as Array<Record<string, unknown>>;
    return data.map((repo) => ({
      name: String(repo.name ?? ""),
      description:
        typeof repo.description === "string" ? repo.description : null,
      language: typeof repo.language === "string" ? repo.language : null,
      stars: typeof repo.stargazers_count === "number" ? repo.stargazers_count : 0,
      forks: typeof repo.forks_count === "number" ? repo.forks_count : 0,
      url: typeof repo.html_url === "string" ? repo.html_url : `https://github.com/${username}`,
      topics: Array.isArray(repo.topics) ? (repo.topics as string[]) : [],
      pushedAt: typeof repo.pushed_at === "string" ? repo.pushed_at : "",
      homepage: typeof repo.homepage === "string" && repo.homepage ? repo.homepage : null,
    }));
  } catch {
    return null;
  }
}

/** Fetch a single repository by owner/repo name. */
export async function fetchGitHubRepo(
  owner: string,
  repo: string,
): Promise<GitHubRepoData | null> {
  try {
    const response = await fetch(`${GITHUB_API}/repos/${owner}/${repo}`, {
      headers: headers(),
      next: { revalidate: 3600 },
    });
    if (!response.ok) return null;
    const data = (await response.json()) as Record<string, unknown>;
    return {
      name: String(data.name ?? repo),
      description:
        typeof data.description === "string" ? data.description : null,
      language: typeof data.language === "string" ? data.language : null,
      stars: typeof data.stargazers_count === "number" ? data.stargazers_count : 0,
      forks: typeof data.forks_count === "number" ? data.forks_count : 0,
      url: typeof data.html_url === "string" ? data.html_url : `https://github.com/${owner}/${repo}`,
      topics: Array.isArray(data.topics) ? (data.topics as string[]) : [],
      pushedAt: typeof data.pushed_at === "string" ? data.pushed_at : "",
      homepage: typeof data.homepage === "string" && data.homepage ? data.homepage : null,
    };
  } catch {
    return null;
  }
}

/**
 * Enrich project statistics from GitHub API.
 * Returns updated statistics or original if API fails.
 */
export async function enrichProjectStatistics(
  owner: string,
  repoName: string,
  originalStats: {
    language: string;
    stars: number;
    forks: number;
    createdAt: string;
    lastPush: string;
  },
): Promise<{
  language: string;
  stars: number;
  forks: number;
  createdAt: string;
  lastPush: string;
}> {
  const repo = await fetchGitHubRepo(owner, repoName);
  if (!repo) return originalStats;

  return {
    language: repo.language ?? originalStats.language,
    stars: repo.stars ?? originalStats.stars,
    forks: repo.forks ?? originalStats.forks,
    createdAt: originalStats.createdAt, // Keep original creation date
    lastPush: repo.pushedAt ?? originalStats.lastPush,
  };
}