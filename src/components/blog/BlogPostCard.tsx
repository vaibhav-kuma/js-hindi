import Link from 'next/link';
import { Calendar, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { BlogPostMeta } from '@/lib/blog/types';

interface BlogPostCardProps {
  post: BlogPostMeta;
  slug: string;
  className?: string;
}

export function BlogPostCard({ post, slug, className }: BlogPostCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className={cn('panel group relative overflow-hidden', className)}>
      {post.coverImage && (
        <Link href={`/blog/${slug}`} className="block aspect-video overflow-hidden" aria-label={`Read "${post.title}"`}>
          <img
            src={post.coverImage}
            alt=""
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>
      )}
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {post.tags.slice(0, 3).map((tag) => (
            <Link
              key={tag}
              href={`/blog/tag/${tag.toLowerCase()}`}
              className={cn(
                'inline-flex items-center gap-1 rounded border border-line/70 bg-white/[0.02] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors hover:border-accent/50 hover:text-accent',
                'text-slate-500'
              )}
            >
              <Tag className="h-2.5 w-2.5" aria-hidden="true" />
              {tag}
            </Link>
          ))}
          {post.tags.length > 3 && (
            <span className="inline-flex items-center rounded border border-line/70 bg-white/[0.02] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-slate-500">
              +{post.tags.length - 3}
            </span>
          )}
        </div>

        <Link href={`/blog/${slug}`} className="group">
          <h3 className="font-display text-xl font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-400">
          {post.description}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-[11px] text-slate-500">
          <span className="flex items-center gap-1 font-mono">
            <Calendar className="h-3 w-3" aria-hidden="true" />
            {formattedDate}
          </span>
        </div>
      </div>
    </article>
  );
}