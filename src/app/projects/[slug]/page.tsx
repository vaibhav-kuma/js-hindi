import { notFound } from "next/navigation";
import { featuredProjects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CaseStudyHeader } from "@/components/case-study/CaseStudyHeader";
import { CaseStudyTechStack } from "@/components/case-study/CaseStudyTechStack";
import { CaseStudyContent } from "@/components/case-study/CaseStudyContent";

/**
 * Dynamic case-study page — looks up the project by slug from the
 * curated featuredProjects registry and renders the full narrative.
 *
 * This is a Server Component so GitHub enrichment and static rendering
 * work out of the box. All 3D canvases are lazy-loaded on the client.
 */
export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = featuredProjects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <SectionHeading
        eyebrow={`Project case study`}
        title={
          <span>
            <span className="text-cyan-300">{project.shortName}</span>
            <> — {project.category}</>
          </span>
        }
      />

      <div className="mt-10">
        <CaseStudyHeader project={project} />

        <CaseStudyTechStack project={project} />

        <CaseStudyContent project={project} />
      </div>
    </div>
  );
}
