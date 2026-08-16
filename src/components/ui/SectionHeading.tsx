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
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <div className={cn("flex items-center gap-3", align === "center" && "justify-center")}>
        {index ? (
          <span className="font-mono text-xs text-slate-600">{index}</span>
        ) : null}
        <SystemLabel>{eyebrow}</SystemLabel>
      </div>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-sm leading-relaxed text-slate-400">{description}</p>
      ) : null}
    </div>
  );
}