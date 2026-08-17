import { Tag } from "@/components/ui/Tag";
import type { ProjectConfig } from "@/lib/types";

interface SimpleSectionProps {
  title: string;
  children: React.ReactNode;
}

function SimpleSection({ title, children }: SimpleSectionProps) {
  return (
    <section className="mb-8">
      <h3 className="sys-label mb-3">{title}</h3>
      {children}
    </section>
  );
}

/**
 * Renders the full case-study body: problem/solution, architecture, features,
 * technologies, security, AI capabilities, engineering decisions, results
 * and future improvements.
 */
export function CaseStudyContent({ project }: { project: ProjectConfig }) {
  return (
    <div className="space-y-12">
      {/* Problem / Solution */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="sys-label mb-2">the problem</h3>
          <p className="text-sm leading-relaxed text-slate-300">
            {project.problem}
          </p>
        </div>
        <div>
          <h3 className="sys-label mb-2">the solution</h3>
          <p className="text-sm leading-relaxed text-slate-300">
            {project.solution}
          </p>
        </div>
      </div>

      {/* Architecture */}
      {project.architecture.summary ? (
        <SimpleSection title="architecture">
          <p className="text-sm leading-relaxed text-slate-300">
            {project.architecture.summary}
          </p>
          {project.architecture.notes && project.architecture.notes.length > 0 ? (
            <ul className="mt-3 space-y-1.5">
              {project.architecture.notes.map((note, i) => (
                <li key={i} className="text-sm text-slate-400">
                  • {note}
                </li>
              ))}
            </ul>
          ) : null}
        </SimpleSection>
      ) : null}

      {/* Features */}
      {project.features.length > 0 ? (
        <SimpleSection title="key features">
          <ul className="grid gap-2 sm:grid-cols-2">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-sm text-slate-300"
              >
                <span
                  className="mt-0.5 h-1 w-1 shrink-0 rounded-full bg-accent/70"
                  aria-hidden="true"
                />
                {feature}
              </li>
            ))}
          </ul>
        </SimpleSection>
      ) : null}

      {/* Technologies */}
      {project.technologies.length > 0 ? (
        <SimpleSection title="technologies">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <Tag key={tech} tone="neutral">
                {tech}
              </Tag>
            ))}
          </div>
        </SimpleSection>
      ) : null}

      {/* Security Considerations */}
      {project.securityConsiderations.length > 0 ? (
        <SimpleSection title="security considerations">
          <ul className="space-y-1.5">
            {project.securityConsiderations.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-slate-300"
              >
                <span
                  className="mt-0.5 h-1 w-1 shrink-0 rounded-full bg-danger/70"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </SimpleSection>
      ) : null}

      {/* AI Capabilities */}
      {project.aiCapabilities.length > 0 ? (
        <SimpleSection title="AI capabilities">
          <ul className="space-y-1.5">
            {project.aiCapabilities.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-slate-300"
              >
                <span
                  className="mt-0.5 h-1 w-1 shrink-0 rounded-full bg-mint/70"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </SimpleSection>
      ) : null}

      {/* Engineering Decisions */}
      {project.engineeringDecisions.length > 0 ? (
        <SimpleSection title="engineering decisions">
          <ul className="space-y-1.5">
            {project.engineeringDecisions.map((decision) => (
              <li
                key={decision}
                className="flex items-start gap-2 text-sm text-slate-300"
              >
                <span
                  className="mt-0.5 h-1 w-1 shrink-0 rounded-full bg-violet/70"
                  aria-hidden="true"
                />
                {decision}
              </li>
            ))}
          </ul>
        </SimpleSection>
      ) : null}

      {/* Results */}
      {project.results.length > 0 ? (
        <SimpleSection title="results">
          <ul className="space-y-1.5">
            {project.results.map((result) => (
              <li
                key={result}
                className="flex items-start gap-2 text-sm text-slate-300"
              >
                <span
                  className="mt-0.5 h-1 w-1 shrink-0 rounded-full bg-mint/70"
                  aria-hidden="true"
                />
                {result}
              </li>
            ))}
          </ul>
        </SimpleSection>
      ) : null}

      {/* Future Improvements */}
      {project.futureImprovements.length > 0 ? (
        <SimpleSection title="future improvements">
          <ul className="space-y-1.5">
            {project.futureImprovements.map((improvement) => (
              <li
                key={improvement}
                className="flex items-start gap-2 text-sm text-slate-300"
              >
                <span
                  className="mt-0.5 h-1 w-1 shrink-0 rounded-full bg-accent/70"
                  aria-hidden="true"
                />
                {improvement}
              </li>
            ))}
          </ul>
        </SimpleSection>
      ) : null}
    </div>
  );
}
