"use client";

import { Fragment, useState, useEffect } from "react";
import { systemArchitecture } from "@/data/architecture";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * "How I Build Systems" — a representative architecture flow. Animated data
 * packets flow between stages on desktop (horizontal) and mobile (vertical).
 * Reduced-motion users see a static, fully readable diagram.
 */
export function ArchitectureSection() {
  const stages = systemArchitecture.stages;
  const reduced = usePrefersReducedMotion();
  const [flowPosition, setFlowPosition] = useState(0);

  useEffect(() => {
    if (reduced) return;
    let start: number;
    function animate(ts: number) {
      if (!start) start = ts;
      const progress = ((ts - start) / 2600) % 1;
      setFlowPosition(progress);
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, [reduced]);

  return (
    <section
      id="architecture"
      aria-labelledby="architecture-heading"
      className="section"
    >
      <div className="section-inner">
        <Reveal>
          <SectionHeading
            index="04"
            eyebrow="How I build systems"
            title={
              <span id="architecture-heading">
                The <span className="text-accent">architecture spine</span> behind{" "}
                every system
              </span>
            }
            description={systemArchitecture.summary}
          />
        </Reveal>

        <div className="mt-14">
          {/* Vertical layout (mobile/tablet) */}
          <Reveal delay={0.05}>
            <ol className="flex flex-col gap-4 lg:hidden" aria-label="Architecture pipeline">
              {stages.map((stage, index) => (
                <Fragment key={stage.id}>
                  <FlowStage stage={stage} index={index} orientation="column" />
                  {index < stages.length - 1 ? (
                    <li
                      aria-hidden="true"
                      className="relative mx-auto h-10 w-px bg-border"
                    >
                      <span
                        className={cn(
                          "absolute -left-[2px] top-0 h-2 w-2 rounded-full bg-accent transition-transform duration-2600 linear",
                          !reduced && "animate-flow-down"
                        )}
                        style={{
                          transform: reduced
                            ? "none"
                            : `translateY(calc(${flowPosition} * 100%))`,
                        }}
                      />
                    </li>
                  ) : null}
                </Fragment>
              ))}
            </ol>
          </Reveal>

          {/* Horizontal layout (desktop) */}
          <Reveal delay={0.05}>
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
                      className="relative mt-10 h-px w-16 shrink-0 bg-border"
                    >
                      <span
                        className={cn(
                          "absolute -top-[2px] left-0 h-2 w-2 rounded-full bg-accent transition-transform duration-2600 linear",
                          !reduced && "animate-flow-right"
                        )}
                        style={{
                          transform: reduced
                            ? "none"
                            : `translateX(calc(${flowPosition} * 100%))`,
                        }}
                      />
                    </li>
                  ) : null}
                </Fragment>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <div className="card">
              <div className="flex flex-wrap items-center gap-3">
                <span className="sys-label">principles</span>
                {systemArchitecture.principles.map((principle) => (
                  <Tag key={principle} tone="mint">
                    {principle}
                  </Tag>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FlowStage({
  stage,
  index,
  orientation,
}: {
  stage: (typeof systemArchitecture.stages)[number];
  index: number;
  orientation: "row" | "column";
}) {
  return (
    <li
      className={cn(
        "card flex-1 min-w-0 p-5",
        orientation === "row" ? "flex" : ""
      )}
    >
      <div className="flex items-center justify-between">
        <span className="sys-label text-accent">
          0{index + 1} · {stage.label}
        </span>
        <span aria-hidden="true" className="font-mono text-[10px] text-[var(--color-text-muted)]">
          ▸
        </span>
      </div>
      <p className="mt-2 text-body-sm leading-relaxed text-[var(--color-text-secondary)]">
        {stage.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {stage.tokens.map((token) => (
          <span
            key={token}
            className="rounded border border-border bg-card px-1.5 py-0.5 font-mono text-caption text-[var(--color-text-secondary)]"
          >
            {token}
          </span>
        ))}
      </div>
    </li>
  );
}