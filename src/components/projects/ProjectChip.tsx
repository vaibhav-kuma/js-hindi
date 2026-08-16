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
      className="inline-flex items-center gap-1 rounded-md border border-line bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-slate-300 transition-colors hover:border-accent/50 hover:text-cyan-200"
    >
      {project.shortName}
      <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
    </Link>
  );
}