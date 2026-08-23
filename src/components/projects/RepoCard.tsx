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
    <article className="card-interactive flex flex-col h-full p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <TierBadge tier={project.tier} />
          <h3 className={`mt-2 font-display font-semibold tracking-tight ${large ? "text-heading-lg" : "text-heading-md"}`}>
            <Link
              href={`/projects/${project.slug}`}
              className="transition-colors hover:text-accent"
            >
              {project.name}
            </Link>
          </h3>
          <p className="mt-0.5 font-mono text-caption uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
            {project.category}
          </p>
        </div>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.name} on GitHub`}
          className="shrink-0 rounded-lg border border-border p-2 text-[var(--color-text-muted)] transition-colors hover:border-accent/50 hover:text-accent hover:bg-card-hover"
        >
          <Github className="h-5 w-5" aria-hidden="true" />
        </a>
      </div>

      <p className="mt-4 line-clamp-3 text-body-sm leading-relaxed text-[var(--color-text-secondary)]">
        {project.summary}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.technologies.slice(0, large ? 7 : 5).map((tech) => (
          <span
            key={tech}
            className="rounded border border-border bg-card px-2 py-0.5 font-mono text-caption text-[var(--color-text-secondary)]"
          >
            {tech}
          </span>
        ))}
      </div>

      <footer className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
        <div className="flex items-center gap-4 font-mono text-caption text-[var(--color-text-muted)]">
          <span className="inline-flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: languageColor(project.statistics.language) }}
              aria-hidden="true"
            />
            {project.statistics.language}
          </span>
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5" aria-hidden="true" /> {project.statistics.stars}
          </span>
          <span className="inline-flex items-center gap-1">
            <GitFork className="h-3.5 w-3.5" aria-hidden="true" /> {project.statistics.forks}
          </span>
          <span className="hidden sm:inline">pushed {formatDate(project.statistics.lastPush)}</span>
        </div>
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex shrink-0 items-center gap-1 font-mono text-caption uppercase tracking-wider text-accent transition-colors hover:text-accent/80"
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