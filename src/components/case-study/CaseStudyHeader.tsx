import { Github, Star, GitFork } from "lucide-react";
import type { ProjectConfig } from "@/lib/types";
import { TierBadge } from "@/components/ui/TierBadge";
import { Tag } from "@/components/ui/Tag";
import { formatDate } from "@/lib/utils";

/**
 * Case-study header: tier badge, category, title, tagline, description,
 * GitHub link, and repository statistics.
 */
export function CaseStudyHeader({ project }: { project: ProjectConfig }) {
  return (
    <header className="mb-12">
      <div className="flex items-center gap-3">
        <TierBadge tier={project.tier} />
        <Tag tone="accent" className="uppercase">
          {project.category}
        </Tag>
      </div>

      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">
        {project.name}
      </h1>

      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-cyan-300">
        {project.tagline}
      </p>

      <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300">
        {project.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-4">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-line bg-white/[0.02] px-4 py-2 font-mono text-[12px] uppercase tracking-wider text-slate-300 transition-colors hover:border-accent/50 hover:text-accent"
        >
          <Github className="h-4 w-4" aria-hidden="true" />
          View on GitHub
        </a>
        {project.demoUrl ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-line bg-white/[0.02] px-4 py-2 font-mono text-[12px] uppercase tracking-wider text-slate-300 transition-colors hover:border-accent/50 hover:text-accent"
          >
            {project.demoVerified ? "Demo verified" : "Demo (unverified)"}
          </a>
        ) : null}
      </div>

      <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
        <div className="flex items-center gap-1.5 font-mono text-[12px] text-slate-400">
          <span
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ backgroundColor: languageColor(project.statistics.language) }}
            aria-hidden="true"
          />
          <span>{project.statistics.language}</span>
        </div>
        <dd className="flex items-center gap-1 font-mono text-[12px] text-slate-400">
          <Star className="h-3 w-3" aria-hidden="true" />
          {project.statistics.stars}
        </dd>
        <dd className="flex items-center gap-1 font-mono text-[12px] text-slate-400">
          <GitFork className="h-3 w-3" aria-hidden="true" />
          {project.statistics.forks}
        </dd>
        <dd className="font-mono text-[12px] text-slate-400">
          Pushed {formatDate(project.statistics.lastPush)}
        </dd>
      </dl>

      {project.screenshots && project.screenshots.length > 0 ? (
        <div className="mt-6">
          <img
            src={project.screenshots[0].src}
            alt={project.screenshots[0].caption || project.name}
            className="w-full max-w-4xl rounded-lg border border-line"
          />
          {project.screenshots[0].caption ? (
            <p className="mt-2 text-[11px] text-slate-500">
              {project.screenshots[0].caption}
            </p>
          ) : null}
        </div>
      ) : null}
    </header>
  );
}

/** Rough GitHub-language color map (display-only). */
function languageColor(language: string): string {
  const palette: Record<string, string> = {
    Python: "#3572A5",
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Java: "#b07219",
    PHP: "#4F5D95",
    HTML: "#e34c26",
    CSS: "#563d7c",
  };
  return palette[language] ?? "#64748b";
}
