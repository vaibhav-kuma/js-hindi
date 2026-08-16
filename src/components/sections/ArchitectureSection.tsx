import { Fragment } from "react";
import { systemArchitecture } from "@/data/architecture";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";

/**
 * "How I Build Systems" — a representative architecture flow. Animated data
 * packets flow between stages on desktop (horizontal) and mobile (vertical).
 * Reduced-motion users see a static, fully readable diagram.
 */
export function ArchitectureSection() {
  const stages = systemArchitecture.stages;

  return (
    <section
      id="architecture"
      aria-labelledby="architecture-heading"
      className="relative scroll-mt-20 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="04"
          eyebrow="How I build systems"
          title={
            <span id="architecture-heading">
              The <span className="text-cyan-300">architecture spine</span> behind{" "}
              every system
            </span>
          }
          description={systemArchitecture.summary}
        />

        <div className="mt-14">
          {/* Vertical layout (mobile/tablet) */}
          <ol className="flex flex-col gap-2 lg:hidden" aria-label="Architecture pipeline">
            {stages.map((stage, index) => (
              <Fragment key={stage.id}>
                <FlowStage
                  stage={stage}
                  index={index}
                  orientation="column"
                />
                {index < stages.length - 1 ? (
                  <li
                    aria-hidden="true"
                    className="relative mx-auto h-8 w-px bg-line/60"
                  >
                    <span className="absolute -left-[2px] top-0 h-1.5 w-1.5 rounded-full bg-accent animate-flow-down" />
                  </li>
                ) : null}
              </Fragment>
            ))}
          </ol>

          {/* Horizontal layout (desktop) */}
          <ol
            className="hidden items-start gap-0 lg:flex"
            aria-label="Architecture pipeline"
          >
            {stages.map((stage, index) => (
              <Fragment key={stage.id}>
                <FlowStage stage={stage} index={index} orientation="row" />
                {index < stages.length - 1 ? (
                  <li
                    aria-hidden="true"
                    className="relative mt-8 h-px w-12 shrink-0 bg-line/60"
                  >
                    <span className="absolute -top-[2px] left-0 h-1.5 w-1.5 rounded-full bg-accent animate-flow-right" />
                  </li>
                ) : null}
              </Fragment>
            ))}
          </ol>

          <div className="mt-10 flex flex-wrap items-center gap-3 rounded-lg border border-line/70 bg-surface/30 px-4 py-3">
            <span className="sys-label">principles</span>
            {systemArchitecture.principles.map((principle) => (
              <Tag key={principle} tone="mint">
                {principle}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FlowStage({ stage, index, orientation }: { stage: (typeof systemArchitecture.stages)[number]; index: number; orientation: "row" | "column" }) {
  return (
    <li
      className={
        orientation === "row"
          ? "flex-1 rounded-lg border border-line bg-surface/50 p-4"
          : "rounded-lg border border-line bg-surface/50 p-4"
      }
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
          0{index + 1} · {stage.label}
        </span>
        <span aria-hidden="true" className="font-mono text-[10px] text-slate-600">
          ▸
        </span>
      </div>
      <p className="mt-2 text-[12px] leading-relaxed text-slate-400">
        {stage.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {stage.tokens.map((token) => (
          <span
            key={token}
            className="rounded border border-line/70 bg-white/[0.02] px-1.5 py-0.5 font-mono text-[10px] text-slate-400"
          >
            {token}
          </span>
        ))}
      </div>
    </li>
  );
}
