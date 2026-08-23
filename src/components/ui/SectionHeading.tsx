import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SystemLabel } from "@/components/ui/SystemLabel";

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <div className={cn("flex items-center gap-3", align === "center" && "justify-center")}>
        {index ? (
          <span className="font-mono text-caption text-[var(--color-text-muted)]">{index}</span>
        ) : null}
        <SystemLabel>{eyebrow}</SystemLabel>
      </div>
      <h2 className="mt-4 font-display text-display-sm font-semibold tracking-tight text-[var(--color-text-primary)]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-body leading-relaxed text-[var(--color-text-secondary)]">{description}</p>
      ) : null}
    </div>
  );
}