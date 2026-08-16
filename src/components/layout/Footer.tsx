import { Github, Linkedin, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/site";

const contactLinks = [
  siteConfig.email ? { label: "Email", href: `mailto:${siteConfig.email}` } : null,
  siteConfig.linkedinUrl ? { label: "LinkedIn", href: siteConfig.linkedinUrl } : null,
  { label: "GitHub", href: siteConfig.githubUrl },
  { label: "Resume", href: siteConfig.resumeUrl },
].filter((link): link is { label: string; href: string } => Boolean(link));

export function Footer() {
  return (
    <footer className="border-t border-line bg-void">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 font-mono text-sm tracking-[0.22em] text-slate-200">
              <span className="flex h-6 w-6 items-center justify-center rounded border border-accent/40 bg-accent/10 text-accent text-xs" aria-hidden="true">◈</span>
              {siteConfig.brand}
            </div>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-600">
              backend · cybersecurity · ai
            </p>
            <p className="mt-4 text-sm text-slate-500">
              Engineering profile based on verified GitHub repositories. No
              credentials or metrics are claimed beyond what the repositories
              demonstrate.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-2">
            <div>
              <h3 className="sys-label mb-3">Navigate</h3>
              <ul className="space-y-2">
                {siteConfig.nav.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`/#${item.id}`}
                      className="font-mono text-xs uppercase tracking-wider text-slate-400 transition-colors hover:text-cyan-200"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="sys-label mb-3">Connect</h3>
              <ul className="space-y-2">
                {contactLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...(link.label === "GitHub" || link.label === "Resume"
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-slate-400 transition-colors hover:text-cyan-200"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] text-slate-600">
            © {new Date().getFullYear()} {siteConfig.name} — designed & engineered in the lab
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-mint" aria-hidden="true" />
              systems nominal
            </span>
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="text-slate-500 transition-colors hover:text-accent"
            >
              <Github className="h-4 w-4" />
            </a>
            {siteConfig.linkedinUrl ? (
              <a
                href={siteConfig.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="text-slate-500 transition-colors hover:text-accent"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}