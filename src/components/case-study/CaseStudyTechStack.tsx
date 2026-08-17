"use client";

import dynamic from "next/dynamic";
import type { ProjectConfig } from "@/lib/types";
import { Tag } from "@/components/ui/Tag";
import { SceneLoader, WebGLFallback } from "@/components/three/SceneLoader";
import { useWebglSupported } from "@/hooks/useWebgl";

/** Lazy-loadable 3D project visual (out of SSR bundle). */
const ProjectVisual = dynamic(
  () => import("@/components/three/ProjectVisual").then((m) => m.ProjectVisual),
  { ssr: false, loading: () => <SceneLoader label="mounting project core" /> },
);

/**
 * Renders the technology tags for a project, plus an optional 3D visual
 * representation embedded in a canvas viewport.
 */
export function CaseStudyTechStack({ project }: { project: ProjectConfig }) {
  const webgl = useWebglSupported();

  return (
    <div className="mb-12">
      <div className="flex flex-wrap gap-1.5">
        {project.technologies.map((tech) => (
          <Tag key={tech} tone="accent">
            {tech}
          </Tag>
        ))}
      </div>

      {project.visual ? (
        <div className="mt-10 relative h-[420px] w-full rounded-xl border border-line bg-surface/50 overflow-hidden">
          {webgl ? (
            <ProjectVisual
              kind={project.visual}
              reduced={false}
              hovered={false}
              density={1}
            />
          ) : (
            <WebGLFallback className="h-full" />
          )}
        </div>
      ) : null}
    </div>
  );
}
