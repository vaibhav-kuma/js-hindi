import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredProjects } from "@/data/projects";

/** Small chip linking a technology to the featured project that uses it. */
export function ProjectChip({ slug }: { slug: string }) {
  const project = featuredProjects.find((p) => p.slug === slug);
  if (!project) return null;
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-2 py-1 font-mono text-caption text-[var(--color-text-secondary)] transition-colors hover:border-accent/50 hover:text-accent hover:bg-card-hover"
    >
      {project.shortName}
      <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
    </Link>
  );
}