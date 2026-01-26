import { MetadataRoute } from 'next';
import { getAllDocs, getAllBlogPosts } from '@/lib/mdx/loader';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

  // Static pages
  const staticPages = [
    '',
    '/features',
    '/pricing',
    '/contact',
    '/sign-in',
    '/sign-up',
    '/docs',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Documentation pages
  const docs = await getAllDocs();
  const docPages = docs.map((doc) => ({
    url: `${baseUrl}/docs/${doc.slug}`,
    lastModified: new Date(doc.frontmatter.lastUpdated),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Blog posts
  const posts = await getAllBlogPosts();
  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.date),
    changeFrequency: 'monthly' as const,
    priority: post.frontmatter.featured ? 0.9 : 0.6,
  }));

  return [...staticPages, ...docPages, ...blogPages];
}
