'use client';

import { MDXRemote } from 'next-mdx-remote/rsc';
import * as mdxComponents from '@/components/mdx';

interface BlogPostContentProps {
  source: string;
}

export function BlogPostContent({ source }: BlogPostContentProps) {
  return (
    <article className="prose prose-invert prose-cyan max-w-none prose-headings:text-slate-100 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-p:text-slate-300 prose-a:text-accent prose-a:no-underline prose-a:border-b prose-a:border-accent/50 prose-a:hover:border-accent prose-strong:text-slate-100 prose-code:text-cyan-300 prose-code:before:content-none prose-code:after:content-none prose-pre:bg-void prose-pre:border prose-pre:border-line/50 prose-pre:rounded-xl prose-img:rounded-xl prose-img:border prose-img:border-line/50 prose-blockquote:border-l-4 prose-blockquote:border-cyan-500 prose-blockquote:bg-cyan-500/10 prose-ul:text-slate-300 prose-ol:text-slate-300">
      <MDXRemote source={source} components={mdxComponents} />
    </article>
  );
}