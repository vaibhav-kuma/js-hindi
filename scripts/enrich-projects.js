#!/usr/bin/env node
/**
 * Build-time GitHub data enrichment script.
 *
 * This script fetches live repository statistics from GitHub API and updates
 * the statistics in src/data/projects.ts. It's designed to run during CI/CD
 * or locally before deployment.
 *
 * Usage:
 *   GITHUB_TOKEN=ghp_xxx node scripts/enrich-projects.js
 *
 * The script:
 * 1. Reads the current projects.ts
 * 2. For each featured project, fetches live data from GitHub
 * 3. Updates stars, forks, language, and lastPush
 * 4. Writes the updated projects.ts back
 */

import fs from "fs";
import path from "path";

const GITHUB_API = "https://api.github.com";
const token = process.env.GITHUB_TOKEN ?? "";
const OWNER = "vaibhav-kuma";

interface RepoStats {
  language: string;
  stars: number;
  forks: number;
  createdAt: string;
  lastPush: string;
}

interface FeaturedProject {
  id: string;
  slug: string;
  name: string;
  githubUrl: string;
  statistics: RepoStats;
}

async function fetchGitHubRepo(repoName: string): Promise<{
  language: string | null;
  stars: number;
  forks: number;
  pushedAt: string;
} | null> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${GITHUB_API}/repos/${OWNER}/${repoName}`, {
      headers,
    });

    if (!response.ok) {
      console.warn(`  ⚠️  Failed to fetch ${repoName}: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    return {
      language: data.language,
      stars: data.stargazers_count ?? 0,
      forks: data.forks_count ?? 0,
      pushedAt: data.pushed_at,
    };
  } catch (error) {
    console.warn(`  ⚠️  Error fetching ${repoName}:`, error);
    return null;
  }
}

function parseProjectsFile(content: string): {
  header: string;
  projects: FeaturedProject[];
  footer: string;
} {
  // Find the featuredProjects array
  const startMarker = "export const featuredProjects: ProjectConfig[] = [";
  const startIdx = content.indexOf(startMarker);
  if (startIdx === -1) throw new Error("Could not find featuredProjects export");

  const header = content.slice(0, startIdx + startMarker.length);

  // Find the closing bracket for the array
  let bracketCount = 1;
  let i = startIdx + startMarker.length;
  for (; i < content.length && bracketCount > 0; i++) {
    if (content[i] === "[") bracketCount++;
    else if (content[i] === "]") bracketCount--;
  }
  const projectsContent = content.slice(startIdx + startMarker.length, i - 1);
  const footer = content.slice(i - 1);

  // Parse individual projects using regex
  const projectRegex = /\{\s*id:\s*"([^"]+)",\s*slug:\s*"([^"]+)",\s*name:\s*"([^"]+)",[\s\S]*?githubUrl:\s*"([^"]+)",[\s\S]*?statistics:\s*\{([\s\S]*?)\}\s*\}/g;

  const projects: FeaturedProject[] = [];
  let match;
  while ((match = projectRegex.exec(projectsContent)) !== null) {
    const [, id, slug, name, githubUrl, statsContent] = match;

    // Parse statistics
    const languageMatch = statsContent.match(/language:\s*"([^"]+)"/);
    const starsMatch = statsContent.match(/stars:\s*(\d+)/);
    const forksMatch = statsContent.match(/forks:\s*(\d+)/);
    const createdAtMatch = statsContent.match(/createdAt:\s*"([^"]+)"/);
    const lastPushMatch = statsContent.match(/lastPush:\s*"([^"]+)"/);

    projects.push({
      id,
      slug,
      name,
      githubUrl,
      statistics: {
        language: languageMatch?.[1] ?? "",
        stars: parseInt(starsMatch?.[1] ?? "0", 10),
        forks: parseInt(forksMatch?.[1] ?? "0", 10),
        createdAt: createdAtMatch?.[1] ?? "",
        lastPush: lastPushMatch?.[1] ?? "",
      },
    });
  }

  return { header, projects, footer };
}

function updateProjectsContent(
  content: string,
  projects: FeaturedProject[],
): string {
  let result = content;

  for (const project of projects) {
    // Find and replace the statistics object for this project
    const projectStart = result.indexOf(`id: "${project.id}"`);
    if (projectStart === -1) continue;

    // Find the statistics object after this project
    const statsStart = result.indexOf("statistics:", projectStart);
    if (statsStart === -1) continue;

    const braceStart = result.indexOf("{", statsStart);
    if (braceStart === -1) continue;

    let braceCount = 1;
    let i = braceStart + 1;
    for (; i < result.length && braceCount > 0; i++) {
      if (result[i] === "{") braceCount++;
      else if (result[i] === "}") braceCount--;
    }

    const newStats = `{
      language: "${project.statistics.language}",
      stars: ${project.statistics.stars},
      forks: ${project.statistics.forks},
      createdAt: "${project.statistics.createdAt}",
      lastPush: "${project.statistics.lastPush}",
    }`;

    result =
      result.slice(0, braceStart + 1) +
      newStats.slice(1, -1) +
      result.slice(i - 1);
  }

  return result;
}

async function main() {
  console.log("🔍 Starting GitHub data enrichment...");
  console.log(`   Owner: ${OWNER}`);
  console.log(`   Token: ${token ? "✅ Set" : "❌ Not set (rate limited)"}`);

  const projectsPath = path.join(process.cwd(), "src/data/projects.ts");
  const content = fs.readFileSync(projectsPath, "utf-8");

  const { projects } = parseProjectsFile(content);

  console.log(`\n📦 Found ${projects.length} featured projects`);

  for (const project of projects) {
    const repoName = project.githubUrl.split("/").pop() ?? project.name;
    console.log(`\n📡 Fetching ${repoName}...`);

    const data = await fetchGitHubRepo(repoName);
    if (data) {
      const oldStars = project.statistics.stars;
      const oldForks = project.statistics.forks;
      const oldLanguage = project.statistics.language;
      const oldLastPush = project.statistics.lastPush;

      project.statistics.language = data.language ?? project.statistics.language;
      project.statistics.stars = data.stars;
      project.statistics.forks = data.forks;
      project.statistics.lastPush = data.pushedAt ?? project.statistics.lastPush;

      console.log(`   Language: ${oldLanguage} → ${project.statistics.language}`);
      console.log(`   Stars: ${oldStars} → ${project.statistics.stars}`);
      console.log(`   Forks: ${oldForks} → ${project.statistics.forks}`);
      console.log(`   Last Push: ${oldLastPush} → ${project.statistics.lastPush}`);
    } else {
      console.log(`   ⚠️  Using cached data`);
    }

    // Rate limiting: wait 100ms between requests
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  const updatedContent = updateProjectsContent(content, projects);
  fs.writeFileSync(projectsPath, updatedContent);

  console.log("\n✅ Enrichment complete! Updated src/data/projects.ts");
}

main().catch((error) => {
  console.error("❌ Enrichment failed:", error);
  process.exit(1);
});