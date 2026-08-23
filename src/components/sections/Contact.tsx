import { Mail, Linkedin, Github, Globe, ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const CONTACT_LINKS = [
  siteConfig.email
    ? ({ label: "Email", href: `mailto:${siteConfig.email}`, icon: Mail } as const)
    : null,
  siteConfig.linkedinUrl
    ? ({ label: "LinkedIn", href: siteConfig.linkedinUrl, icon: Linkedin } as const)
    : null,
  ({ label: "GitHub", href: siteConfig.githubUrl, icon: Github } as const),
  ({ label: "Resume", href: siteConfig.resumeUrl, icon: Globe } as const),
].filter(Boolean) as { label: string; href: string; icon: React.ComponentType<{ className?: string }> }[];

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section"
    >
      <div className="section-inner">
        <Reveal>
          <SectionHeading
            index="06"
            eyebrow="Let's build something"
            title={
              <span id="contact-heading">
                LET&apos;S BUILD SOMETHING
              </span>
            }
          />
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="card">
              <h3 className="sys-label mb-4">CONTACT</h3>
              <p className="mb-6 text-[var(--color-text-secondary)]">
                Questions about this portfolio, a project, or just want to discuss backend engineering,
                cybersecurity, or AI agent systems? Reach out — no form, just direct conversation.
              </p>
              <dl className="space-y-3">
                {CONTACT_LINKS.map((link) => (
                  <div key={link.label} className="flex items-center gap-3">
                    <a
                      href={link.href}
                      {...(link.label === "GitHub" || link.label === "Resume"
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group inline-flex items-center gap-2 font-mono text-caption uppercase tracking-[0.16em] text-[var(--color-text-secondary)] transition-colors hover:text-accent"
                    >
                      <link.icon className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      {link.label}
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                    </a>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="card">
              <h3 className="sys-label mb-4">Site navigation</h3>
              <ul className="space-y-2">
                {siteConfig.nav.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`/#${item.id}`}
                      className="group inline-flex items-center gap-2 font-mono text-body-sm text-[var(--color-text-secondary)] transition-colors hover:text-accent"
                    >
                      <span className="w-6 text-[var(--color-text-muted)]">{item.label}</span>
                      <span className="text-[var(--color-text-muted)] group-hover:text-accent transition-colors">→</span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-border">
                <p className="font-mono text-caption text-[var(--color-text-muted)]">
                  Built with Next.js, TypeScript & Three.js
                </p>
                <p className="mt-1 font-mono text-caption text-[var(--color-text-muted)]">
                  © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}