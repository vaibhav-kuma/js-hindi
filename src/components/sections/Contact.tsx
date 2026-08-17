import { Mail, Linkedin, Github, Globe } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const CONTACT_LINKS = [
  siteConfig.email ?
    ({ label: "Email", href: `mailto:${siteConfig.email}` } as const): null,
  siteConfig.linkedinUrl ?
    ({ label: "LinkedIn", href: siteConfig.linkedinUrl } as const): null,
  ({ label: "GitHub", href: siteConfig.githubUrl } as const),
  ({ label: "Resume", href: siteConfig.resumeUrl } as const),
].filter(Boolean) as { label: string; href: string }[];

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-20 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            index="06"
                        eyebrow="Let&apos;s build something"
            title={
              <span id="contact-heading">
                LET&apos;S BUILD SOMETHING
              </span>
            }
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="panel p-6">
              <h3 className="sys-label mb-4">CONTACT</h3>
              <p className="mb-5 text-slate-400">
                Questions about this portfolio, a project, or just want to discuss backend engineering,
                cybersecurity, or AI agent systems? Reach out — no form, just direct conversation.
              </p>
              <dl className="mt-6 space-y-4">
                {CONTACT_LINKS.map((link) => (
                  <div key={link.label} className="flex items-center gap-3">
                    <a
                      href={link.href}
                      {...(link.label === "GitHub" || link.label === "Resume"
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.16em] text-slate-400 transition-colors hover:text-cyan-200"
                    >
                      {link.label}
                      <Globe className="h-3 w-3" aria-hidden="true" />
                    </a>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="panel p-6">
              <h3 className="sys-label mb-4">Site navigation</h3>
              <ul className="space-y-3">
                {siteConfig.nav.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`/#${item.id}`}
                      className="font-mono text-xs uppercase tracking-[0.16em] text-slate-400 transition-colors hover:text-cyan-200"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
