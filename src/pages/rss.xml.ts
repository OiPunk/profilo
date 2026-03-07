import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { blogItems } from '../data/blogItems';

export function GET(context: APIContext) {
  return rss({
    title: 'Weiguang Li - Tech Blog',
    description: 'Java Backend Engineering insights covering Spring Boot, distributed systems, microservices, and software architecture.',
    site: context.site ?? 'https://oipunk.io',
    items: blogItems.map((post) => ({
      title: post.title,
      pubDate: new Date(post.date),
      description: post.excerpt,
      link: `/blog/${post.slug}`,
      categories: post.tags,
    })),
    customData: `<language>en-us</language>`,
  });
}
