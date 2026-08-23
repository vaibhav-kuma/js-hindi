import { cn } from "@/lib/utils";

/** Mono-spaced system label used above section headings and in metadata rows. */
export function SystemLabel({
  children,
  className,
  tone = "muted",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "muted" | "accent" | "violet" | "mint";
}) {
  const tones = {
    muted: "text-[var(--color-text-muted)]",
    accent: "text-accent",
    violet: "text-violet",
    mint: "text-mint",
  } as const;
  const lineColors = {
    muted: "bg-[var(--color-border-strong)]",
    accent: "bg-accent/70",
    violet: "bg-violet/70",
    mint: "bg-mint/70",
  } as const;
  return (
    <span
      className={cn(
        "sys-label inline-flex items-center gap-2",
        tones[tone],
        className,
      )}
    >
      <span
        className={cn(
          "h-[1px] w-5",
          lineColors[tone],
        )}
        aria-hidden="true"
      />
      {children}
    </span>
  );
}