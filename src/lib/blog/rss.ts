import RSS from 'rss';
import { getAllPosts } from './index';
import { siteConfig } from '@/data/site';

export async function generateRSSFeed(): Promise<string> {
  const posts = await getAllPosts();
  const siteUrl = siteConfig.url;

  const feed = new RSS({
    title: `${siteConfig.name} — Blog`,
    description: `Technical writings on backend engineering, cybersecurity, and AI systems`,
    site_url: siteUrl,
    feed_url: `${siteUrl}/blog/rss.xml`,
    language: 'en',
    copyright: `All rights reserved ${new Date().getFullYear()}, ${siteConfig.name}`,
    managingEditor: siteConfig.name,
    webMaster: siteConfig.name,
    categories: [...new Set(posts.flatMap((p) => p.tags))],
  });

  for (const post of posts.slice(0, 20)) {
    const postUrl = `${siteUrl}/blog/${post.slug}`;
    feed.item({
      title: post.title,
      description: post.description,
      url: postUrl,
      guid: postUrl,
      date: post.date,
      categories: post.tags,
      author: siteConfig.name,
      enclosure: post.coverImage
        ? { url: `${siteUrl}${post.coverImage}`, type: 'image/png' }
        : undefined,
    });
  }

  return feed.xml({ indent: true });
}