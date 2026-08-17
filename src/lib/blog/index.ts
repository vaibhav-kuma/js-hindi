import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { BlogPost, BlogPostMeta, TagCount, PaginatedPosts } from './types';

const CONTENT_DIR = path.join(process.cwd(), 'content/blog');
const POSTS_PER_PAGE = 10;

function getMdxFiles(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }
  return fs.readdirSync(CONTENT_DIR).filter((file) => file.endsWith('.mdx'));
}

function parseSlug(filename: string): string {
  return filename.replace(/\.mdx$/, '');
}

export function getAllPostsMeta(): BlogPostMeta[] {
  const files = getMdxFiles();
  const posts: BlogPostMeta[] = [];

  for (const file of files) {
    const filePath = path.join(CONTENT_DIR, file);
    const source = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(source);
    posts.push(data as BlogPostMeta);
  }

  return posts
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const files = getMdxFiles();
  const posts: BlogPost[] = [];

  for (const file of files) {
    const filePath = path.join(CONTENT_DIR, file);
    const source = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(source);
    const meta = data as BlogPostMeta;

    if (meta.draft) continue;

    const readingTimeText = readingTime(content).text;
    const slug = parseSlug(file);

    posts.push({
      ...meta,
      slug,
      content,
      readingTime: readingTimeText,
    });
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(source);
  const meta = data as BlogPostMeta;

  if (meta.draft) {
    return null;
  }

  const readingTimeText = readingTime(content).text;

  return {
    ...meta,
    slug,
    content,
    readingTime: readingTimeText,
  };
}

export function getAllTags(): TagCount[] {
  const posts = getAllPostsMeta();
  const tagCounts: Record<string, number> = {};

  for (const post of posts) {
    for (const tag of post.tags) {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    }
  }

  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByTag(tag: string): BlogPostMeta[] {
  const posts = getAllPostsMeta();
  return posts.filter((post) => post.tags.includes(tag));
}

export async function getPostsByTagWithSlug(tag: string): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.tags.includes(tag));
}

export function getPaginatedPosts(page: number): PaginatedPosts {
  const allPosts = getAllPostsMeta();
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const posts = allPosts.slice(start, start + POSTS_PER_PAGE);

  return {
    posts: posts as BlogPost[],
    totalPages,
    currentPage,
    totalPosts,
  };
}

export function getAllSlugs(): string[] {
  return getMdxFiles().map(parseSlug);
}

export function getAllTagsList(): string[] {
  return getAllTags().map((t) => t.tag);
}