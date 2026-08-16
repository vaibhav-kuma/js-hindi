import { cn } from "@/lib/utils";
import type { Tier } from "@/lib/types";

const tierStyles: Record<Tier, { label: string; className: string }> = {
  FLAGSHIP: {
    label: "Flagship",
    className:
      "border-accent/50 bg-accent/15 text-cyan-300 shadow-glow-sm",
  },
  FEATURED: {
    label: "Featured",
    className: "border-violet/50 bg-violet/15 text-violet-200",
  },
  SECONDARY: {
    label: "Repo",
    className: "border-line bg-white/[0.03] text-slate-400",
  },
};

export function TierBadge({ tier, className }: { tier: Tier; className?: string }) {
  const config = tierStyles[tier];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em]",
        config.className,
        className,
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          tier === "FLAGSHIP" && "bg-accent animate-pulse",
          tier === "FEATURED" && "bg-violet",
          tier === "SECONDARY" && "bg-slate-500",
        )}
        aria-hidden="true"
      />
      {config.label}
    </span>
  );
}