import { cn } from "@/lib/utils";
import type { Tier } from "@/lib/types";

const tierStyles: Record<Tier, { label: string; className: string; dotClass: string }> = {
  FLAGSHIP: {
    label: "Flagship",
    className: "border-accent/40 bg-accent/10 text-accent",
    dotClass: "bg-accent animate-pulse",
  },
  FEATURED: {
    label: "Featured",
    className: "border-violet/40 bg-violet/10 text-violet",
    dotClass: "bg-violet",
  },
  SECONDARY: {
    label: "Repo",
    className: "border-border bg-card text-[var(--color-text-muted)]",
    dotClass: "bg-[var(--color-text-muted)]",
  },
};

export function TierBadge({ tier, className }: { tier: Tier; className?: string }) {
  const config = tierStyles[tier];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-caption uppercase tracking-[0.16em]",
        config.className,
        className,
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          config.dotClass,
        )}
        aria-hidden="true"
      />
      {config.label}
    </span>
  );
}