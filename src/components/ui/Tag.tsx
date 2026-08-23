import { cn } from "@/lib/utils";

export function Tag({
  children,
  className,
  tone = "neutral",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "neutral" | "accent" | "violet" | "mint" | "danger";
}) {
  const tones = {
    neutral: "border-border bg-card text-[var(--color-text-secondary)]",
    accent: "border-accent/30 bg-accent/10 text-accent",
    violet: "border-violet/30 bg-violet/10 text-violet",
    mint: "border-mint/30 bg-mint/10 text-mint",
    danger: "border-danger/30 bg-danger/10 text-danger",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg border px-2.5 py-0.5 font-mono text-caption leading-relaxed",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}