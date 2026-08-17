import { generateRSSFeed } from '@/lib/blog/rss';

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function GET() {
  const xml = await generateRSSFeed();

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600',
    },
  });
}