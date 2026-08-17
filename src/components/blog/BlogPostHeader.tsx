import Link from 'next/link';
import { Calendar, Clock, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { BlogPostMeta } from '@/lib/blog/types';

interface BlogPostHeaderProps {
  post: BlogPostMeta;
  readingTime: string;
}

export function BlogPostHeader({ post, readingTime }: BlogPostHeaderProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="mb-10">
      <div className="flex flex-wrap gap-1.5 mb-4">
        {post.tags.map((tag) => (
          <Link
            key={tag}
            href={`/blog/tag/${tag.toLowerCase()}`}
            className={cn(
              'inline-flex items-center gap-1 rounded border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors hover:bg-accent/20',
              'text-accent'
            )}
          >
            <Tag className="h-3 w-3" aria-hidden="true" />
            {tag}
          </Link>
        ))}
      </div>

      <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-100 leading-tight mb-4">
        {post.title}
      </h1>

      <p className="text-lg text-slate-300 max-w-3xl mb-6">{post.description}</p>

      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
        <span className="flex items-center gap-1.5 font-mono">
          <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
          <time dateTime={post.date}>{formattedDate}</time>
        </span>
        <span className="flex items-center gap-1.5 font-mono">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {readingTime}
        </span>
      </div>

      {post.coverImage && (
        <div className="mt-8 rounded-xl overflow-hidden border border-line/50">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-auto"
          />
        </div>
      )}
    </header>
  );
}