import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { getPost, getAllSlugs } from '@/lib/blog';
import { BlogPostHeader } from '@/components/blog/BlogPostHeader';
import { BlogPostContent } from '@/components/blog/BlogPostContent';
import { generateBlogPostMetadata, generateBlogPostJsonLd } from '@/components/blog/BlogPostMeta';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return generateBlogPostMetadata(post);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = generateBlogPostJsonLd(post);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <article>
        <BlogPostHeader post={post} readingTime={post.readingTime} />
        <BlogPostContent source={post.content} />
      </article>

      <footer className="mt-16 pt-8 border-t border-line/50">
        <nav className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-md border border-line bg-white/[0.02] px-4 py-2 font-mono text-sm transition-colors hover:border-accent/50 hover:text-accent"
          >
            ← Back to Blog
          </Link>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${tag.toLowerCase()}`}
                className="rounded border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-accent transition-colors hover:bg-accent/20"
              >
                {tag}
              </Link>
            ))}
          </div>
        </nav>
      </footer>
    </div>
  );
}