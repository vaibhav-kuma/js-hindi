import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { BlogPostCard } from '@/components/blog/BlogPostCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { TagLink } from '@/components/blog/TagLink';
import { getPostsByTagWithSlug, getAllTagsList } from '@/lib/blog';
import { generateTagPageMetadata } from '@/components/blog/BlogPostMeta';

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTagsList();
  return tags.map((tag) => ({ tag: tag.toLowerCase() }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTagWithSlug(decodedTag);
  return generateTagPageMetadata(decodedTag, await posts);
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = await getPostsByTagWithSlug(decodedTag);
  const tagTitle = decodedTag.charAt(0).toUpperCase() + decodedTag.slice(1);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <Reveal>
        <SectionHeading
          index="01"
          eyebrow="Tag"
          title={
            <span>
              <TagLink tag={decodedTag} count={posts.length} variant="lg" />
            </span>
          }
          description={`${posts.length} post${posts.length !== 1 ? 's' : ''} tagged with "${tagTitle}"`}
        />
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <Reveal key={post.slug} delay={index * 0.05}>
            <BlogPostCard post={post} slug={post.slug} />
          </Reveal>
        ))}
      </div>

      <nav className="mt-12" aria-label="Tag navigation">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-md border border-line bg-white/[0.02] px-4 py-2 font-mono text-sm transition-colors hover:border-accent/50 hover:text-accent"
        >
          ← All posts
        </Link>
      </nav>
    </div>
  );
}