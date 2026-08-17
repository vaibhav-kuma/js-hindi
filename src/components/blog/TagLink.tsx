import Link from 'next/link';
import { Tag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TagLinkProps {
  tag: string;
  count?: number;
  className?: string;
  variant?: 'default' | 'sm' | 'lg';
}

export function TagLink({ tag, count, className, variant = 'default' }: TagLinkProps) {
  const sizes = {
    sm: 'px-1.5 py-0.5 text-[10px]',
    default: 'px-2.5 py-1 text-[11px]',
    lg: 'px-3 py-1.5 text-[12px]',
  };

  return (
    <Link
      href={`/blog/tag/${tag.toLowerCase()}`}
      className={cn(
        'inline-flex items-center gap-1 rounded border border-accent/30 bg-accent/10 font-mono uppercase tracking-[0.1em] transition-colors hover:bg-accent/20',
        'text-accent',
        sizes[variant],
        className
      )}
    >
      <Tag className={cn('h-3 w-3', variant === 'sm' && 'h-2.5 w-2.5', variant === 'lg' && 'h-3.5 w-3.5')} aria-hidden="true" />
      {tag}
      {count !== undefined && (
        <span className="opacity-60">({count})</span>
      )}
    </Link>
  );
}