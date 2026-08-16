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
    muted: "text-slate-500",
    accent: "text-accent",
    violet: "text-violet",
    mint: "text-mint",
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
          tone === "accent" && "bg-accent/70",
          tone === "violet" && "bg-violet/70",
          tone === "mint" && "bg-mint/70",
          tone === "muted" && "bg-slate-600",
        )}
        aria-hidden="true"
      />
      {children}
    </span>
  );
}