"use client";

import { useEffect, useState } from "react";
import { Github, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { useScrollToId } from "@/components/layout/LenisProvider";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const scrollToId = useScrollToId();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const navigate = (id: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    setOpen(false);
    if (pathname !== "/") {
      window.location.assign(`/#${id}`);
      return;
    }
    scrollToId(id);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line bg-ink/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a
          href="/#top"
          aria-label={`${siteConfig.name} — home`}
          className="flex items-center gap-2.5 font-mono text-sm tracking-[0.22em] text-slate-200"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded border border-accent/40 bg-accent/10 text-accent" aria-hidden="true">◈</span>
          <span className="hidden sm:inline">{siteConfig.brand}</span>
          <span className="text-slate-500 sm:hidden">VK</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {siteConfig.nav.map((item) => (
            <a
              key={item.id}
              href={`/#${item.id}`}
              onClick={navigate(item.id)}
              className="group relative rounded px-3 py-2 font-mono text-[13px] uppercase tracking-[0.14em] text-slate-400 transition-colors hover:text-cyan-200"
            >
              {item.label}
              <span className="absolute inset-x-3 -bottom-px h-px origin-left scale-x-0 bg-accent/70 transition-transform duration-200 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {siteConfig.openToOpportunities ? (
            <a
              href="/#contact"
              onClick={navigate("contact")}
              className="hidden items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-emerald-300 transition-colors hover:bg-mint/20 md:inline-flex"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
              </span>
              Open to opportunities
            </a>
          ) : null}
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${siteConfig.name} on GitHub`}
            className="hidden rounded-md border border-line p-2 text-slate-400 transition-colors hover:border-accent/50 hover:text-accent sm:block"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            className="rounded-md border border-line p-2 text-slate-300 lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden border-b border-line bg-ink/95 backdrop-blur-lg lg:hidden"
          >
            <ul className="space-y-1 px-4 py-4">
              {siteConfig.nav.map((item, idx) => (
                <li key={item.id}>
                  <a
                    href={`/#${item.id}`}
                    onClick={navigate(item.id)}
                    className="flex items-center justify-between rounded-md px-3 py-2.5 font-mono text-sm uppercase tracking-[0.16em] text-slate-300 hover:bg-white/[0.04] hover:text-cyan-200"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-slate-600">0{idx + 1}</span>
                  </a>
                </li>
              ))}
              <li className="border-t border-line pt-3">
                <a
                  href={siteConfig.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 font-mono text-sm text-slate-300 hover:text-accent"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  GitHub /{siteConfig.githubUsername}
                </a>
              </li>
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}