import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeShiki from '@shikijs/rehype';
import type { DocFrontmatter, BlogFrontmatter } from './types';

const DOCS_PATH = path.join(process.cwd(), 'content/docs');
const BLOG_PATH = path.join(process.cwd(), 'content/blog');

// Import MDX components dynamically to avoid circular dependencies
async function getMdxComponents() {
  const { mdxComponents } = await import('@/components/mdx/mdx-components');
  return mdxComponents;
}

/**
 * Get a documentation page by slug
 */
export async function getDocBySlug(slug: string[]) {
  const fileName = slug[slug.length - 1];
  const filePath = path.join(DOCS_PATH, ...slug.slice(0, -1), `${fileName}.mdx`);

  try {
    const source = await fs.readFile(filePath, 'utf8');
    const { content, data } = matter(source);

    const components = await getMdxComponents();

    const { content: mdxContent } = await compileMDX<DocFrontmatter>({
      source: content,
      options: {
        parseFrontmatter: false,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'wrap' }],
            [
              rehypeShiki,
              {
                themes: {
                  light: 'github-light',
                  dark: 'github-dark',
                },
              },
            ],
          ],
        },
      },
      components,
    });

    return {
      content: mdxContent,
      frontmatter: data as DocFrontmatter,
      slug: slug.join('/'),
      rawContent: content,
    };
  } catch (error) {
    console.error(`Error loading doc: ${filePath}`, error);
    return null;
  }
}

/**
 * Get all documentation pages recursively
 */
export async function getAllDocs(): Promise<
  Array<{ slug: string; frontmatter: DocFrontmatter }>
> {
  const docs: Array<{ slug: string; frontmatter: DocFrontmatter }> = [];

  async function readDir(dirPath: string, baseSlug = '') {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        await readDir(fullPath, baseSlug ? `${baseSlug}/${entry.name}` : entry.name);
      } else if (entry.name.endsWith('.mdx')) {
        const slug = baseSlug
          ? `${baseSlug}/${entry.name.replace('.mdx', '')}`
          : entry.name.replace('.mdx', '');

        try {
          const source = await fs.readFile(fullPath, 'utf8');
          const { data } = matter(source);
          docs.push({
            slug,
            frontmatter: data as DocFrontmatter,
          });
        } catch (error) {
          console.error(`Error reading doc file: ${fullPath}`, error);
        }
      }
    }
  }

  try {
    await readDir(DOCS_PATH);
  } catch (error) {
    console.error('Error reading docs directory:', error);
  }

  // Sort by section and order
  return docs.sort((a, b) => {
    if (a.frontmatter.section === b.frontmatter.section) {
      return a.frontmatter.order - b.frontmatter.order;
    }
    return a.frontmatter.section.localeCompare(b.frontmatter.section);
  });
}

/**
 * Get a blog post by slug
 */
export async function getBlogPostBySlug(slug: string) {
  const filePath = path.join(BLOG_PATH, `${slug}.mdx`);

  try {
    const source = await fs.readFile(filePath, 'utf8');
    const { content, data } = matter(source);

    const components = await getMdxComponents();

    const { content: mdxContent } = await compileMDX<BlogFrontmatter>({
      source: content,
      options: {
        parseFrontmatter: false,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'wrap' }],
            [
              rehypeShiki,
              {
                themes: {
                  light: 'github-light',
                  dark: 'github-dark',
                },
              },
            ],
          ],
        },
      },
      components,
    });

    // Calculate reading time if not provided
    const readingTime = data.readingTime || calculateReadingTime(content);

    return {
      content: mdxContent,
      frontmatter: { ...data, readingTime } as BlogFrontmatter,
      slug,
      rawContent: content,
    };
  } catch (error) {
    console.error(`Error loading blog post: ${filePath}`, error);
    return null;
  }
}

/**
 * Get all blog posts sorted by date
 */
export async function getAllBlogPosts(): Promise<
  Array<{ slug: string; frontmatter: BlogFrontmatter }>
> {
  try {
    const files = await fs.readdir(BLOG_PATH);
    const posts: Array<{ slug: string; frontmatter: BlogFrontmatter }> = [];

    for (const file of files) {
      if (file.endsWith('.mdx')) {
        const slug = file.replace('.mdx', '');
        const filePath = path.join(BLOG_PATH, file);

        try {
          const source = await fs.readFile(filePath, 'utf8');
          const { content, data } = matter(source);

          const readingTime = data.readingTime || calculateReadingTime(content);

          posts.push({
            slug,
            frontmatter: { ...data, readingTime } as BlogFrontmatter,
          });
        } catch (error) {
          console.error(`Error reading blog post: ${filePath}`, error);
        }
      }
    }

    // Sort by date (newest first)
    return posts.sort((a, b) => {
      const dateA = new Date(a.frontmatter.date);
      const dateB = new Date(b.frontmatter.date);
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.error('Error reading blog directory:', error);
    return [];
  }
}

/**
 * Calculate reading time in minutes
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
