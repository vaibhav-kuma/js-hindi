"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center rounded-lg",
        "transition-all duration-250 ease-out-expo",
        "bg-card hover:bg-card-hover",
        "border border-border",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        "aria-label:Toggle theme"
      )}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="absolute transition-all duration-300 ease-out-expo">
        <Sun className="h-5 w-5 text-amber" style={{ transform: theme === "dark" ? "rotate(-90deg) scale(0)" : "rotate(0) scale(1)" }} aria-hidden="true" />
      </span>
      <span className="absolute transition-all duration-300 ease-out-expo">
        <Moon className="h-5 w-5 text-violet" style={{ transform: theme === "light" ? "rotate(90deg) scale(0)" : "rotate(0) scale(1)" }} aria-hidden="true" />
      </span>
    </button>
  );
}