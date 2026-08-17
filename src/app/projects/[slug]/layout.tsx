import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Shared layout for case-study pages.
 * Provides a consistent back-to-home navigation and a system-label bar.
 */
export default function CaseStudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/"
          className={cn(
            "inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500 transition-colors hover:text-cyan-300",
          )}
        >
          <ArrowLeft className="h-3 w-3" aria-hidden="true" />
          Back to lab
        </Link>
      </div>
      <div className="pb-24">{children}</div>
    </section>
  );
}
