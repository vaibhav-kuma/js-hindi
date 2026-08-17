import { compileMDX } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { BlogPostMeta } from './types';

const PRETTY_CODE_OPTIONS = {
  theme: {
    dark: 'github-dark',
    light: 'github-light',
  },
  keepBackground: true,
  tokensMap: {
    fn: 'function',
  },
} as const;

export async function compileMdx(source: string): Promise<{
  content: React.ReactNode;
  frontmatter: BlogPostMeta;
}> {
  const { content, frontmatter } = await compileMDX<BlogPostMeta>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          [rehypePrettyCode, PRETTY_CODE_OPTIONS],
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        ],
      },
    },
  });

  return { content, frontmatter };
}