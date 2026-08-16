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
    neutral: "border-line bg-white/[0.03] text-slate-300",
    accent: "border-accent/30 bg-accent/10 text-cyan-300",
    violet: "border-violet/30 bg-violet/10 text-violet-200",
    mint: "border-mint/30 bg-mint/10 text-emerald-300",
    danger: "border-danger/30 bg-danger/10 text-red-300",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded border px-2 py-0.5 font-mono text-[11px] leading-relaxed",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}