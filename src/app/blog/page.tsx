import { Metadata } from 'next';
import Link from 'next/link';
import { BlogPostCard } from '@/components/blog/BlogPostCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { getPaginatedPosts } from '@/lib/blog';
import { generateBlogIndexMetadata } from '@/components/blog/BlogPostMeta';

export const metadata: Metadata = generateBlogIndexMetadata();

interface BlogIndexPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogIndexPage({ searchParams }: BlogIndexPageProps) {
  const { page = '1' } = await searchParams;
  const pageNum = Math.max(1, parseInt(page, 10));
  const { posts, totalPages, currentPage, totalPosts } = getPaginatedPosts(pageNum);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <Reveal>
        <SectionHeading
          index="01"
          eyebrow="Blog"
          title="Technical writings"
          description="Deep dives into backend architecture, security operations, AI agents, and the engineering decisions behind production systems."
        />
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <Reveal key={post.slug} delay={index * 0.05}>
            <BlogPostCard post={post} slug={post.slug} />
          </Reveal>
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Pagination">
          {currentPage > 1 && (
            <Link
              href={`/blog?page=${currentPage - 1}`}
              className="btn-secondary inline-flex items-center gap-2 rounded-md border border-line bg-white/[0.02] px-4 py-2 font-mono text-sm transition-colors hover:border-accent/50 hover:text-accent"
            >
              ← Previous
            </Link>
          )}
          <span className="px-4 font-mono text-sm text-slate-500">
            Page {currentPage} of {totalPages} ({totalPosts} posts)
          </span>
          {currentPage < totalPages && (
            <Link
              href={`/blog?page=${currentPage + 1}`}
              className="btn-secondary inline-flex items-center gap-2 rounded-md border border-line bg-white/[0.02] px-4 py-2 font-mono text-sm transition-colors hover:border-accent/50 hover:text-accent"
            >
              Next →
            </Link>
          )}
        </nav>
      )}

      <div className="mt-16 rounded-xl border border-line/50 bg-white/[0.02] p-8 text-center">
        <h3 className="font-display text-xl font-semibold text-slate-100">
          Stay updated
        </h3>
        <p className="mt-2 text-slate-400">
          Subscribe to the RSS feed for new posts.
        </p>
        <a
          href="/blog/rss.xml"
          className="mt-4 inline-flex items-center gap-2 rounded-md border border-accent/50 bg-accent/10 px-4 py-2 font-mono text-sm text-accent transition-colors hover:bg-accent/20"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M4 11a9 9 0 0 1 9 9" />
            <path d="M4 4a16 16 0 0 1 16 16" />
            <circle cx="5" cy="19" r="1" />
          </svg>
          RSS Feed
        </a>
      </div>
    </div>
  );
}