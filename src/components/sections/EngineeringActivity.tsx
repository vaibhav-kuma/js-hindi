import { Activity as ActivityIcon, ArrowUpRight, CalendarDays, Github, Star } from "lucide-react";
import { activitySnapshot, languageRemark } from "@/data/activity";
import { fetchGitHubProfile } from "@/lib/github";
import { siteConfig } from "@/data/site";
import { formatDate, formatMonthYear } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Engineering Activity — GitHub data with a graceful local fallback.
 * This is intentionally a secondary, compact section: projects lead,
 * statistics follow.
 */
export async function EngineeringActivity() {
  // Optional server-side enrichment; falls back to the verified local snapshot.
  const profile = await fetchGitHubProfile(siteConfig.githubUsername);

  const snapshot = profile
    ? {
        ...activitySnapshot,
        publicRepos: profile.publicRepos,
        followers: profile.followers,
        memberSince: profile.createdAt || activitySnapshot.memberSince,
      }
    : activitySnapshot;

  const totalLanguages = snapshot.topLanguages.reduce(
    (sum, language) => sum + language.repoCount,
    0,
  );

  return (
    <section id="activity" aria-labelledby="activity-heading" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            index="05"
            eyebrow="Engineering activity"
            title={
              <span id="activity-heading">
                A <span className="text-cyan-300">living</span> development history
              </span>
            }
            description="The numbers below are the official GitHub snapshot — instruments, not the headline. The headline is the work itself."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Profile telemetry */}
          <Reveal>
            <div className="panel h-full p-6">
              <span className="sys-label">telemetry</span>
              <dl className="mt-5 space-y-4">
                <Stat label="Public repositories" value={String(snapshot.publicRepos)} />
                <Stat label="Member since" value={formatMonthYear(snapshot.memberSince)} />
                <Stat label="Followers" value={String(snapshot.followers)} />
                <Stat label="Primary language" value="Python" />
              </dl>
              <a
                href={snapshot.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.16em] text-cyan-300 transition-colors hover:text-cyan-200"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                github/@{snapshot.username}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          {/* Language spread */}
          <Reveal delay={0.05}>
            <div className="panel h-full p-6">
              <span className="sys-label">language spread</span>
              <ul className="mt-5 space-y-3.5">
                {snapshot.topLanguages.map((language) => {
                  const width = Math.round((language.repoCount / totalLanguages) * 100);
                  return (
                    <li key={language.name}>
                      <div className="flex items-center justify-between font-mono text-[11px] text-slate-400">
                        <span>{language.name}</span>
                        <span className="text-slate-500">{language.repoCount} repos</span>
                      </div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.04]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-accent to-violet"
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-4 text-[12px] leading-relaxed text-slate-500">{languageRemark}</p>
            </div>
          </Reveal>

          {/* Recent pushes */}
          <Reveal delay={0.1}>
            <div className="panel h-full p-6">
              <span className="sys-label">recent pushes</span>
              <ul className="mt-5 space-y-3.5">
                {snapshot.recentRepositories.slice(0, 5).map((repo) => (
                  <li key={repo.name}>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start justify-between gap-3"
                    >
                      <span className="min-w-0">
                        <span className="block truncate font-mono text-[12px] text-slate-200 transition-colors group-hover:text-cyan-200">
                          {repo.name}
                        </span>
                        <span className="mt-0.5 block font-mono text-[10px] text-slate-500">
                          {repo.language ?? "—"} · pushed {formatDate(repo.pushedAt)}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-600 transition-colors group-hover:text-accent"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Activity pulse */}
          <Reveal delay={0.15}>
            <div className="panel h-full p-6">
              <span className="sys-label">activity pulse</span>
              <ul className="mt-5 space-y-4">
                <li className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md border border-mint/30 bg-mint/10 text-mint">
                    <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-mono text-[12px] text-slate-200">
                      Active since {formatMonthYear(snapshot.memberSince)}
                    </p>
                    <p className="font-mono text-[10px] text-slate-500">
                      continuously building through {formatDate(snapshot.asOf)}
                    </p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md border border-accent/30 bg-accent/10 text-accent">
                    <ActivityIcon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-mono text-[12px] text-slate-200">Momentum</p>
                    <p className="font-mono text-[10px] text-slate-500">
                      security, AI &amp; backend pushes across 2024 → 2026
                    </p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md border border-violet/30 bg-violet/10 text-violet">
                    <Star className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-mono text-[12px] text-slate-200">Open-source surface</p>
                    <p className="font-mono text-[10px] text-slate-500">
                      from learning repos to flagship systems
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line/60 pb-3 last:border-b-0">
      <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">{label}</dt>
      <dd className="font-mono text-sm text-cyan-200">{value}</dd>
    </div>
  );
}
