import { describe, it, expect } from "vitest";
import { featuredProjects, secondaryProjects } from "@/data/projects";

describe("Project data validation", () => {
  it("has at least one featured project", () => {
    expect(featuredProjects.length).toBeGreaterThan(0);
  });

  it("has unique slugs across featured projects", () => {
    const slugs = featuredProjects.map((p) => p.slug);
    const uniqueSlugs = new Set(slugs);
    expect(slugs.length).toBe(uniqueSlugs.size);
  });

  it("has unique names across featured projects", () => {
    const names = featuredProjects.map((p) => p.name);
    const uniqueNames = new Set(names);
    expect(names.length).toBe(uniqueNames.size);
  });

  it("every featured project has required fields", () => {
    for (const project of featuredProjects) {
      expect(project.id).toBeTruthy();
      expect(project.slug).toBeTruthy();
      expect(project.name).toBeTruthy();
      expect(project.shortName).toBeTruthy();
      expect(["FLAGSHIP", "FEATURED", "SECONDARY"]).toContain(project.tier);
      expect(typeof project.priority).toBe("number");
      expect(project.category).toBeTruthy();
      expect(project.tagline).toBeTruthy();
      expect(project.summary).toBeTruthy();
      expect(project.description).toBeTruthy();
      expect(project.problem).toBeTruthy();
      expect(project.solution).toBeTruthy();
      expect(project.architecture).toBeTruthy();
      expect(project.architecture.summary).toBeTruthy();
      expect(Array.isArray(project.features)).toBe(true);
      expect(Array.isArray(project.technologies)).toBe(true);
      expect(Array.isArray(project.securityConsiderations)).toBe(true);
      expect(Array.isArray(project.aiCapabilities)).toBe(true);
      expect(Array.isArray(project.engineeringDecisions)).toBe(true);
      expect(Array.isArray(project.results)).toBe(true);
      expect(Array.isArray(project.futureImprovements)).toBe(true);
      expect(project.githubUrl).toMatch(/^https:\/\/github\.com\//);
      expect(project.statistics).toBeTruthy();
      expect(project.statistics.language).toBeTruthy();
      expect(typeof project.statistics.stars).toBe("number");
      expect(typeof project.statistics.forks).toBe("number");
      expect(project.statistics.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}/);
      expect(project.statistics.lastPush).toMatch(/^\d{4}-\d{2}-\d{2}/);
      expect(Array.isArray(project.screenshots)).toBe(true);
    }
  });

  it("has exactly one FLAGSHIP project", () => {
    const flagships = featuredProjects.filter((p) => p.tier === "FLAGSHIP");
    expect(flagships.length).toBe(1);
  });

  it("priority values are unique and sequential", () => {
    const priorities = featuredProjects.map((p) => p.priority).sort((a, b) => a - b);
    for (let i = 0; i < priorities.length; i++) {
      expect(priorities[i]).toBe(i + 1);
    }
  });

  it("secondary projects have no duplicate slugs with featured", () => {
    const featuredSlugs = new Set<string>(featuredProjects.map((p) => p.slug));
    const secondaryNames = secondaryProjects.map((p) => p.name);
    for (const name of secondaryNames) {
      // Check if the name matches any featured slug (case-insensitive)
      const slugMatch = featuredSlugs.has(name.toLowerCase().replace(/\s+/g, "-"));
      expect(slugMatch).toBe(false);
    }
  });

  it("every secondary project has required fields", () => {
    for (const project of secondaryProjects) {
      expect(project.name).toBeTruthy();
      expect(project.category).toBeTruthy();
      expect(project.summary).toBeTruthy();
      expect(project.language).toBeTruthy();
      expect(typeof project.stars).toBe("number");
      expect(project.githubUrl).toMatch(/^https:\/\/github\.com\//);
      expect(project.lastPush).toMatch(/^\d{4}-\d{2}-\d{2}/);
      expect(Array.isArray(project.highlights)).toBe(true);
    }
  });

  it("visual types match expected values", () => {
    const validVisuals = [
      "soc-core",
      "ai-engine",
      "threat-radar",
      "threat-network",
      "monitoring-grid",
      null,
    ];
    for (const project of featuredProjects) {
      expect(validVisuals).toContain(project.visual);
    }
  });
});