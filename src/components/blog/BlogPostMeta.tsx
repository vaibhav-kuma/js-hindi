import type { Metadata } from 'next';
import type { BlogPost } from '@/lib/blog/types';
import { siteConfig } from '@/data/site';

export function generateBlogPostMetadata(post: BlogPost): Metadata {
  const postUrl = `${siteConfig.url}/blog/${post.slug}`;
  const ogImage = post.coverImage ? `${siteConfig.url}${post.coverImage}` : `${siteConfig.url}/og-blog.png`;

  return {
    title: post.title,
    description: post.description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      type: 'article',
      url: postUrl,
      title: post.title,
      description: post.description,
      siteName: siteConfig.name,
      publishedTime: post.date,
      authors: [siteConfig.name],
      tags: post.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImage],
      creator: siteConfig.githubUsername,
    },
    robots: {
      index: !post.draft,
      follow: true,
    },
    other: {
      'article:published_time': post.date,
      'article:author': siteConfig.name,
      'article:tag': post.tags.join(','),
    },
  };
}

export function generateBlogPostJsonLd(post: BlogPost): string {
  const postUrl = `${siteConfig.url}/blog/${post.slug}`;
  const ogImage = post.coverImage ? `${siteConfig.url}${post.coverImage}` : `${siteConfig.url}/og-blog.png`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: ogImage,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    keywords: post.tags.join(', '),
  };

  return JSON.stringify(jsonLd);
}

export function generateBlogIndexMetadata(): Metadata {
  return {
    title: 'Blog',
    description: `Technical writings on backend engineering, cybersecurity, and AI systems by ${siteConfig.name}.`,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: `${siteConfig.url}/blog`,
    },
    openGraph: {
      type: 'website',
      url: `${siteConfig.url}/blog`,
      title: `Blog — ${siteConfig.name}`,
      description: `Technical writings on backend engineering, cybersecurity, and AI systems.`,
      siteName: siteConfig.name,
      images: [
        {
          url: `${siteConfig.url}/og-blog.png`,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — Blog`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Blog — ${siteConfig.name}`,
      description: `Technical writings on backend engineering, cybersecurity, and AI systems.`,
      images: [`${siteConfig.url}/og-blog.png`],
      creator: siteConfig.githubUsername,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateTagPageMetadata(tag: string, posts: { title: string; description: string }[]): Metadata {
  const tagUrl = `${siteConfig.url}/blog/tag/${tag.toLowerCase()}`;
  const tagTitle = tag.charAt(0).toUpperCase() + tag.slice(1);

  return {
    title: `${tagTitle} — Blog`,
    description: `Posts tagged with "${tagTitle}". ${posts.length} article${posts.length !== 1 ? 's' : ''}.`,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: tagUrl,
    },
    openGraph: {
      type: 'website',
      url: tagUrl,
      title: `${tagTitle} — Blog — ${siteConfig.name}`,
      description: `Posts tagged with "${tagTitle}".`,
      siteName: siteConfig.name,
    },
    twitter: {
      card: 'summary',
      title: `${tagTitle} — Blog`,
      description: `Posts tagged with "${tagTitle}".`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}