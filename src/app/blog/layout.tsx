import { Metadata } from 'next';
import Link from 'next/link';
import { Rss } from 'lucide-react';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: 'Blog',
  description: `Technical writings on backend engineering, cybersecurity, and AI systems by ${siteConfig.name}.`,
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-line/50 bg-void/80 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/blog" className="font-display text-xl font-semibold text-slate-100">
              {siteConfig.brand} Blog
            </Link>
            <Link
              href="/blog/rss.xml"
              className="inline-flex items-center gap-1.5 rounded-md border border-line/50 bg-white/[0.02] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-slate-400 transition-colors hover:border-accent/50 hover:text-accent"
              title="RSS Feed"
            >
              <Rss className="h-3.5 w-3.5" aria-hidden="true" />
              RSS
            </Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}