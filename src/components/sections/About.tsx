import { Activity, Boxes, Cpu, ShieldCheck } from "lucide-react";
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
      className="relative scroll-mt-20 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            index="01"
            eyebrow="About — engineering profile"
            title={
              <span id="about-heading">
                A builder at the{" "}
                <span className="text-cyan-300">intersection of AI, security & backend</span>
              </span>
            }
          />
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-5" delay={0.05}>
            <div className="panel overflow-hidden">
              <div className="flex items-center gap-2 border-b border-line px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-danger/80" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber/80" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-mint/80" aria-hidden="true" />
                <span className="ml-2 font-mono text-xs text-slate-500">profile — bash</span>
              </div>
              <div className="space-y-3 p-5 font-mono text-[13px] leading-relaxed">
                <p className="text-slate-300">
                  <span className="text-cyan-300">$</span> whoami && pwd
                </p>
                <p className="pl-3 text-slate-400">
                  vaibhav-kumar — Backend Developer &amp; Security Analysis
                  <span className="text-cyan-200"> @</span> /engineering/lab
                </p>
                <p className="text-slate-300">
                  <span className="text-cyan-300">$</span> cat focus.txt
                </p>
                <p className="pl-3 text-slate-400">
                  [solid: backend engineering, threat detection, security automation]<br />
                  [now: AI-driven SOC platform · agentic modernization · observability]
                </p>
                <p className="text-slate-300">
                  <span className="text-cyan-300">$</span> echo $location
                </p>
                <p className="pl-3 text-slate-400">dehradun.in 🇮🇳 — utc+5:30</p>
                <p className="text-slate-300">
                  <span className="text-cyan-300">$</span> system.status
                </p>
                <p className="text-slate-300">
                  <span className="text-cyan-300">$</span>
                  <span className="cursor-block" aria-hidden="true" />
                </p>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <p className="max-w-2xl text-base leading-relaxed text-slate-300">
                I&apos;m {siteConfig.name}, a backend-focused developer and cybersecurity
                engineer building systems where intelligence meets infrastructure. My
                work spans detection pipelines and security automation on Python-powered
                backends, through to AI copilots and agent-driven platforms on the modern
                TypeScript stack — each project engineered as a real system with events,
                stores and observability, not a repo of scripts.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400">
                Every capability on this site is traced to a public repository. The
                flagship SOC_plateform mirrors a modern Security Operations Center as 15
                microservices; the rest of the lab demonstrates the same discipline at
                smaller scale.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {domains.map((domain, index) => (
                <Reveal key={domain.title} delay={0.1 + index * 0.06}>
                  <div className="panel h-full p-5 transition-colors hover:border-accent/30">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-md border border-line bg-white/[0.02] text-accent">
                        <domain.icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <h3 className="font-display text-sm font-semibold text-slate-100">
                        {domain.title}
                      </h3>
                    </div>
                    <ul className="mt-3 space-y-1.5">
                      {domain.points.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-[13px] text-slate-400">
                          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent/70" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2} className="mt-7">
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
