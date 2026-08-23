"use client";

import { Cpu, ShieldCheck, Boxes, Activity } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { siteConfig } from "@/data/site";

const domains = [
  {
    icon: Cpu,
    title: "Backend Engineering",
    points: ["API design & services", "Event-driven systems", "Data modelling"],
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity & Incident Readiness",
    points: ["Threat detection & hunting", "SIEM / EDR concepts", "MITRE ATT&CK mapping"],
  },
  {
    icon: Boxes,
    title: "AI & Agentic Systems",
    points: ["LLM orchestration", "AI agents & copilots", "AI security & ML monitoring"],
  },
  {
    icon: Activity,
    title: "Distributed Systems & Observability",
    points: ["Kafka event buses", "Metrics, logs & alerting", "Containerized deployments"],
  },
];

const languages = ["Python", "TypeScript", "JavaScript", "Java", "C++", "C", "C#"];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section"
    >
      <div className="section-inner">
        <Reveal>
          <SectionHeading
            index="01"
            eyebrow="About — engineering profile"
            title={
              <span id="about-heading">
                A builder at the{" "}
                <span className="text-accent">intersection of AI, security & backend</span>
              </span>
            }
          />
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          {/* Terminal-style profile card */}
          <Reveal className="lg:col-span-5" delay={0.05}>
            <div className="card h-full overflow-hidden">
              <div className="flex items-center gap-2 border-b border-border px-4 py-3 -mx-6 -mb-6">
                <span className="h-2.5 w-2.5 rounded-full bg-danger/80" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber/80" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-mint/80" aria-hidden="true" />
                <span className="ml-2 font-mono text-xs text-[var(--color-text-muted)]">profile — bash</span>
              </div>
              <div className="space-y-4 p-2 font-mono text-[13px] leading-relaxed">
                <div className="flex items-baseline gap-2 text-[var(--color-text-secondary)]">
                  <span className="text-accent">$</span>
                  <span>whoami && pwd</span>
                </div>
                <p className="pl-6 text-[var(--color-text-muted)]">
                  {siteConfig.name} — Backend Developer & Security Engineer
                  <span className="text-accent"> @</span> /engineering/lab
                </p>
                <div className="flex items-baseline gap-2 text-[var(--color-text-secondary)]">
                  <span className="text-accent">$</span>
                  <span>cat focus.txt</span>
                </div>
                <p className="pl-6 text-[var(--color-text-muted)] leading-relaxed">
                  [solid: backend engineering, threat detection, security automation]<br />
                  [now: AI-driven SOC platform · agentic modernization · observability]
                </p>
                <div className="flex items-baseline gap-2 text-[var(--color-text-secondary)]">
                  <span className="text-accent">$</span>
                  <span>echo $location</span>
                </div>
                <p className="pl-6 text-[var(--color-text-muted)]">{siteConfig.location} 🇮🇳 — utc+5:30</p>
                <div className="flex items-baseline gap-2 text-[var(--color-text-secondary)]">
                  <span className="text-accent">$</span>
                  <span>system.status</span>
                </div>
                <div className="pl-6 flex items-center gap-2 text-[var(--color-text-secondary)]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inset-0 rounded-full bg-mint animate-ping opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
                  </span>
                  <span>All systems operational</span>
                  <span className="cursor-block ml-1" aria-hidden="true" />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Bio & domains */}
          <div className="lg:col-span-7 space-y-8">
            <Reveal delay={0.1}>
              <div className="max-w-2xl space-y-4">
                <p className="text-body-lg text-[var(--color-text-secondary)] leading-relaxed">
                  I&apos;m {siteConfig.name}, a backend-focused developer and cybersecurity
                  engineer building systems where intelligence meets infrastructure. My
                  work spans detection pipelines and security automation on Python-powered
                  backends, through to AI copilots and agent-driven platforms on the modern
                  TypeScript stack — each project engineered as a real system with events,
                  stores and observability, not a repo of scripts.
                </p>
                <p className="text-body text-[var(--color-text-muted)] leading-relaxed">
                  Every capability on this site is traced to a public repository. The
                  flagship SOC_plateform mirrors a modern Security Operations Center as 15
                  microservices; the rest of the lab demonstrates the same discipline at
                  smaller scale.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="grid gap-4 sm:grid-cols-2">
                {domains.map((domain, index) => (
                  <Reveal key={domain.title} delay={0.15 + index * 0.06}>
                    <div className="card h-full transition-all duration-300 hover:border-accent/30 hover:shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card">
                          <domain.icon className="h-5 w-5 text-accent" aria-hidden="true" />
                        </div>
                        <h3 className="font-display text-heading-sm font-semibold text-[var(--color-text-primary)]">
                          {domain.title}
                        </h3>
                      </div>
                      <ul className="mt-4 space-y-2">
                        {domain.points.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-body-sm text-[var(--color-text-secondary)]">
                            <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.25} className="pt-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="sys-label mr-1">primary languages</span>
                {languages.map((language) => (
                  <Tag key={language} tone="accent" className="uppercase">
                    {language}
                  </Tag>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}