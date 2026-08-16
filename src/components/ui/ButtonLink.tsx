import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "solid" | "outline" | "violet" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-accent/40 bg-accent/10 text-cyan-200 hover:bg-accent/20 hover:border-accent/70 shadow-glow-sm",
  solid: "bg-accent text-void font-medium hover:bg-cyan-300",
  outline:
    "border border-line bg-white/[0.02] text-slate-200 hover:border-slate-400 hover:bg-white/[0.04]",
  violet:
    "border border-violet/40 bg-violet/10 text-violet-200 hover:bg-violet/20 hover:border-violet/70 shadow-glow-violet",
  ghost: "text-slate-300 hover:text-accent",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs gap-1.5",
  md: "px-4 py-2 text-sm gap-2",
  lg: "px-6 py-3 text-sm gap-2.5",
};

interface ButtonLinkProps {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  external?: boolean;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}

export function ButtonLink({
  href,
  variant = "outline",
  size = "md",
  icon,
  external,
  className,
  children,
  ariaLabel,
}: ButtonLinkProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-md font-mono tracking-wide transition-all duration-200",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
      >
        {icon}
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {icon}
      {children}
    </Link>
  );
}