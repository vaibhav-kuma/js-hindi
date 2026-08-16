import Link from "next/link";
import { ArrowUpRight, Github, Star, GitFork } from "lucide-react";
import type { ProjectConfig } from "@/lib/types";
import { TierBadge } from "@/components/ui/TierBadge";
import { formatDate } from "@/lib/utils";

/**
 * Accessible 2D representation of a featured project — always rendered,
 * never dependent on WebGL. Anchor inside is the title link; GitHub link is
 * a sibling <a> (no invalid nested anchors).
 */
export function RepoCard({ project, large = false }: { project: ProjectConfig; large?: boolean }) {
  return (
    <article
      className={
        "panel flex h-full flex-col overflow-hidden p-5 transition-colors hover:border-accent/40"
      }
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <TierBadge tier={project.tier} />
          <h3
            className={
              "mt-2 font-display font-semibold tracking-tight text-slate-100 " +
              (large ? "text-xl" : "text-lg")
            }
          >
            <Link
              href={`/projects/${project.slug}`}
              className="transition-colors hover:text-cyan-200"
            >
              {project.name}
            </Link>
          </h3>
          <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">
            {project.category}
          </p>
        </div>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.name} on GitHub`}
          className="shrink-0 rounded-md border border-line p-2 text-slate-400 transition-colors hover:border-accent/50 hover:text-accent"
        >
          <Github className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>

      <p className="mt-3 line-clamp-3 text-[13px] leading-relaxed text-slate-400">
        {project.summary}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.technologies.slice(0, large ? 7 : 5).map((tech) => (
          <span
            key={tech}
            className="rounded border border-line bg-white/[0.02] px-1.5 py-0.5 font-mono text-[10px] text-slate-400"
          >
            {tech}
          </span>
        ))}
      </div>

      <footer className="mt-5 flex items-center justify-between gap-3 border-t border-line/70 pt-4">
        <div className="flex items-center gap-3 font-mono text-[11px] text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: languageColor(project.statistics.language) }}
              aria-hidden="true"
            />
            {project.statistics.language}
          </span>
          <span className="inline-flex items-center gap-1">
            <Star className="h-3 w-3" aria-hidden="true" /> {project.statistics.stars}
          </span>
          <span className="inline-flex items-center gap-1">
            <GitFork className="h-3 w-3" aria-hidden="true" /> {project.statistics.forks}
          </span>
          <span className="hidden sm:inline">pushed {formatDate(project.statistics.lastPush)}</span>
        </div>
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex shrink-0 items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-cyan-300 transition-colors hover:text-cyan-200"
        >
          Case study <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </footer>
    </article>
  );
}

/** Rough GitHub-language color map (approximate, display-only). */
function languageColor(language: string): string {
  const palette: Record<string, string> = {
    Python: "#3572A5",
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Java: "#b07219",
    HTML: "#e34c26",
    C: "#555555",
    "C#": "#178600",
    CSS: "#563d7c",
    PHP: "#4F5D95",
    Shell: "#89e051",
    "Jupyter Notebook": "#DA5B0B",
  };
  return palette[language] ?? "#64748b";
}