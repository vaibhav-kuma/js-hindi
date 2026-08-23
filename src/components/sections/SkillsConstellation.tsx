"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { techGroups, techLinks, techNodes, groupById } from "@/data/skills";
import { featuredProjects } from "@/data/projects";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectChip } from "@/components/projects/ProjectChip";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/providers/ThemeProvider";

const GROUP_COLORS_DARK = {
  languages: "#22d3ee",
  backend: "#a78bfa",
  frontend: "#fbbf24",
  cybersecurity: "#f87171",
  ai: "#34d399",
  infrastructure: "#94a3b8",
} as const;

const GROUP_COLORS_LIGHT = {
  languages: "#06b6d4",
  backend: "#7c3aed",
  frontend: "#d97706",
  cybersecurity: "#dc2626",
  ai: "#059669",
  infrastructure: "#475569",
} as const;

type GroupId = keyof typeof GROUP_COLORS_DARK;

function hashString(value: string): number {
  let h = 0;
  for (let i = 0; i < value.length; i++) {
    h = (h << 5) - h + value.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

interface NodePoint {
  id: string;
  x: number;
  y: number;
  label: string;
  group: GroupId;
  projects: string[];
}

/** Clusters each technology around its group hub, deterministically. */
function buildLayout(width: number, height: number): NodePoint[] {
  const cx = width / 2;
  const cy = height / 2;
  const baseRadius = Math.min(width, height) * 0.3;
  return techNodes.map((node) => {
    const groupIndex = techGroups.findIndex((group) => group.id === node.group);
    const hubAngle = -Math.PI / 2 + (groupIndex / techGroups.length) * Math.PI * 2;
    const hubX = cx + Math.cos(hubAngle) * baseRadius;
    const hubY = cy + Math.sin(hubAngle) * baseRadius * 0.82;
    const seed = hashString(node.id);
    const offsetRadius = baseRadius * (0.08 + (seed % 45) / 100);
    const offsetAngle = seed * 13.7;
    return {
      id: node.id,
      x: hubX + Math.cos(offsetAngle) * offsetRadius,
      y: hubY + Math.sin(offsetAngle) * offsetRadius,
      label: node.label,
      group: node.group as GroupId,
      projects: node.projects,
    };
  });
}

function isNeighbour(a: string, b: string): boolean {
  return techLinks.some(
    (link) =>
      (link.source === a && link.target === b) ||
      (link.source === b && link.target === a),
  );
}

export function SkillsConstellation() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();
  const { theme } = useTheme();

  const [size, setSize] = useState({ width: 0, height: 0 });
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const hoveredRef = useRef<string | null>(null);
  const selectedRef = useRef<string | null>(null);
  useEffect(() => {
    hoveredRef.current = hovered;
  }, [hovered]);
  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const measure = () =>
      setSize({ width: el.clientWidth, height: el.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const points = useMemo(
    () => (size.width > 0 ? buildLayout(size.width, size.height) : []),
    [size],
  );
  const pointById = useMemo(() => {
    const map: Record<string, NodePoint> = {};
    for (const point of points) map[point.id] = point;
    return map;
  }, [points]);

  const findNode = useCallback(
    (px: number, py: number): string | null => {
      let best: string | null = null;
      let bestDistance = 30 * 30;
      for (const point of points) {
        const dx = point.x - px;
        const dy = point.y - py;
        const d = dx * dx + dy * dy;
        if (d < bestDistance) {
          bestDistance = d;
          best = point.id;
        }
      }
      return best;
    },
    [points],
  );

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    setHovered(findNode(event.clientX - rect.left, event.clientY - rect.top));
  };

  const handleSelect = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    setSelected(findNode(event.clientX - rect.left, event.clientY - rect.top));
  };

  const groupColors = theme === "dark" ? GROUP_COLORS_DARK : GROUP_COLORS_LIGHT;
  const gridColor = theme === "dark" ? "rgba(148, 163, 184, 0.05)" : "rgba(15, 23, 42, 0.03)";
  const linkColor = theme === "dark" ? "rgba(71, 85, 105, 0.32)" : "rgba(15, 23, 42, 0.12)";
  const activeLinkColor = "rgba(8, 145, 178, 0.6)";
  const dimAlpha = 0.15;
  const textColor = theme === "dark" ? "#e2e8f0" : "#0f172a";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || size.width === 0 || size.height === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size.width * dpr;
    canvas.height = size.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let raf = 0;
    const draw = () => {
      const t = reduced ? 0 : performance.now() / 1000;
      const drift = Math.sin(t * 0.4) * 1.4;
      ctx.clearRect(0, 0, size.width, size.height);

      // Draw subtle grid background
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 0.5;
      const gridSize = 48;
      for (let x = 0; x <= size.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x + drift, 0);
        ctx.lineTo(x + drift, size.height);
        ctx.stroke();
      }
      for (let y = 0; y <= size.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(size.width, y);
        ctx.stroke();
      }

      const hov = hoveredRef.current;
      const sel = selectedRef.current;

      for (const link of techLinks) {
        const a = pointById[link.source];
        const b = pointById[link.target];
        if (!a || !b) continue;
        const active =
          Boolean(hov) && (hov === a.id || hov === b.id);
        ctx.beginPath();
        ctx.moveTo(a.x + drift, a.y);
        ctx.lineTo(b.x + drift, b.y);
        ctx.strokeStyle = active ? activeLinkColor : linkColor;
        ctx.lineWidth = active ? 1.4 : 1;
        ctx.stroke();
      }

      for (const point of points) {
        const x = point.x + drift;
        const y = point.y;
        const isHovered = hov === point.id;
        const isSelected = sel === point.id;
        const connected = hov ? isNeighbour(hov, point.id) : false;
        const dim = Boolean(hov || sel) && !isHovered && !isSelected && !connected;

        ctx.globalAlpha = dim ? dimAlpha : 1;
        ctx.beginPath();
        ctx.arc(x, y, isHovered || isSelected ? 7.5 : 4.5, 0, Math.PI * 2);
        ctx.fillStyle = groupColors[point.group];
        ctx.fill();
        if (isHovered || isSelected) {
          ctx.strokeStyle = textColor;
          ctx.lineWidth = 1.25;
          ctx.stroke();
          ctx.font = '500 10px var(--font-jetbrains-mono), monospace';
          ctx.textAlign = "center";
          ctx.fillStyle = textColor;
          ctx.fillText(point.label, x, y - 13);
        } else if (connected && hov) {
          ctx.globalAlpha = 0.9;
          ctx.beginPath();
          ctx.arc(x, y, 5.5, 0, Math.PI * 2);
          ctx.strokeStyle = groupColors[point.group];
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }
      void sel;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [size, reduced, pointById, points, theme, gridColor, groupColors, linkColor, textColor]);

  const selectedNode = selected ? pointById[selected] : null;
  const selectedProjects = selectedNode
    ? selectedNode.projects
        .map((slug) => featuredProjects.find((project) => project.slug === slug))
        .filter((project): project is (typeof featuredProjects)[number] => Boolean(project))
    : [];

  return (
    <section id="skills" aria-labelledby="skills-heading" className="section">
      <div className="section-inner">
        <Reveal>
          <SectionHeading
            index="02"
            eyebrow="Skills — technology constellation"
            title={
              <span id="skills-heading">
                Technologies mapped to <span className="text-violet">real projects</span>
              </span>
            }
            description="Not a progress-bar list — a connected constellation. Hover a node to light up the relations, or select it to see exactly where the technology is used across the portfolio."
          />
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_300px]">
          <Reveal>
            <div
              ref={wrapperRef}
              className="relative h-[380px] overflow-hidden rounded-xl border border-border bg-[var(--color-card)]/50 sm:h-[460px]"
            >
              <canvas
                ref={canvasRef}
                onPointerMove={handlePointerMove}
                onPointerLeave={() => setHovered(null)}
                onClick={handleSelect}
                className="absolute inset-0 h-full w-full cursor-crosshair"
                role="img"
                aria-label="Interactive technology constellation grouped by domain"
              />
              <span className="pointer-events-none absolute bottom-3 left-4 sys-label">
                hover / click a node — relationships light up
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <aside className="card h-fit">
              {selectedNode ? (
                <>
                  <span className="sys-label" style={{ color: groupColors[selectedNode.group] }}>
                    {groupById[selectedNode.group]?.label}
                  </span>
                  <h3 className="mt-2 font-display text-heading-md font-semibold text-[var(--color-text-primary)]">
                    {selectedNode.label}
                  </h3>
                  <p className="mt-2 text-body-sm leading-relaxed text-[var(--color-text-secondary)]">
                    Used directly in the featured systems below.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedProjects.length > 0 ? (
                      selectedProjects.map((project) => (
                        <ProjectChip key={project.slug} slug={project.slug} />
                      ))
                    ) : (
                      <p className="font-mono text-xs text-[var(--color-text-muted)]">
                        used across the wider repository set
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <div>
                  <span className="sys-label">explorer</span>
                  <p className="mt-2 font-mono text-[13px] leading-relaxed text-[var(--color-text-muted)]">
                    select any node to resolve its connected projects. The same
                    graph is navigable below for keyboard & touch.
                  </p>
                </div>
              )}
            </aside>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-10">
          <h3 className="sys-label mb-4">full stack index — selectable</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {techGroups.map((group) => (
              <div key={group.id} className="card">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: groupColors[group.id as GroupId] }}
                    aria-hidden="true"
                  />
                  <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
                    {group.label}
                  </h4>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {techNodes
                    .filter((node) => node.group === group.id)
                    .map((node) => (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => setSelected(node.id)}
                        aria-pressed={selected === node.id}
                        className={cn(
                          "rounded border px-2.5 py-1 font-mono text-[11px] transition-all duration-200",
                          selected === node.id
                            ? "border-accent/60 bg-accent/10 text-accent"
                            : "border-border bg-card text-[var(--color-text-secondary)] hover:border-accent/40 hover:text-accent hover:bg-card-hover",
                        )}
                      >
                        {node.label}
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}