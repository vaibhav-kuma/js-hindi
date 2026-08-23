import { MetadataRoute } from "next";
import { featuredProjects } from "@/data/projects";
import { getAllSlugs, getAllTagsList } from "@/lib/blog";
import { siteConfig } from "@/data/site";

const BASE_URL = siteConfig.url;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogSlugs = getAllSlugs();
  const tagSlugs = getAllTagsList();

  const staticRoutes = [
    "",
    "/blog",
    "/projects",
    "/architecture",
    "/activity",
    "/contact",
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const blogRoutes = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const tagRoutes = tagSlugs.map((tag) => ({
    url: `${BASE_URL}/blog/tag/${tag.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const projectRoutes = featuredProjects.map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: new Date(project.statistics.lastPush),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes, ...tagRoutes, ...projectRoutes];
}