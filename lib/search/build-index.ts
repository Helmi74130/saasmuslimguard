import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

interface SearchIndexItem {
  id: string;
  title: string;
  description: string;
  slug: string;
  type: 'doc' | 'blog';
  section?: string;
  category?: string;
  tags?: string[];
}

const DOCS_PATH = path.join(process.cwd(), 'content/docs');
const BLOG_PATH = path.join(process.cwd(), 'content/blog');

/**
 * Build search index from all docs and blog posts
 * Generates a JSON file that can be loaded client-side
 */
export async function buildSearchIndex() {
  const indexItems: SearchIndexItem[] = [];

  // Index documentation pages
  const docs = await readDocsRecursively(DOCS_PATH);
  docs.forEach((doc, i) => {
    indexItems.push({
      id: `doc-${i}`,
      title: doc.frontmatter.title,
      description: doc.frontmatter.description,
      slug: `/docs/${doc.slug}`,
      type: 'doc',
      section: doc.frontmatter.section,
      tags: doc.frontmatter.keywords,
    });
  });

  // Index blog posts
  const blogPosts = await readBlogPosts();
  blogPosts.forEach((post, i) => {
    indexItems.push({
      id: `blog-${i}`,
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      slug: `/blog/${post.slug}`,
      type: 'blog',
      category: post.frontmatter.category,
      tags: post.frontmatter.tags,
    });
  });

  // Write index to JSON file
  const indexPath = path.join(process.cwd(), 'content/config/search-index.json');
  await fs.writeFile(indexPath, JSON.stringify(indexItems, null, 2));

  return indexItems;
}

async function readDocsRecursively(
  dirPath: string,
  baseSlug = ''
): Promise<Array<{ slug: string; frontmatter: any }>> {
  const docs: Array<{ slug: string; frontmatter: any }> = [];

  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        const nestedDocs = await readDocsRecursively(
          fullPath,
          baseSlug ? `${baseSlug}/${entry.name}` : entry.name
        );
        docs.push(...nestedDocs);
      } else if (entry.name.endsWith('.mdx')) {
        const slug = baseSlug
          ? `${baseSlug}/${entry.name.replace('.mdx', '')}`
          : entry.name.replace('.mdx', '');

        try {
          const source = await fs.readFile(fullPath, 'utf8');
          const { data } = matter(source);
          docs.push({ slug, frontmatter: data });
        } catch (error) {
          console.error(`Error reading doc file: ${fullPath}`, error);
        }
      }
    }
  } catch (error) {
    console.error('Error reading docs directory:', error);
  }

  return docs;
}

async function readBlogPosts(): Promise<Array<{ slug: string; frontmatter: any }>> {
  const posts: Array<{ slug: string; frontmatter: any }> = [];

  try {
    const files = await fs.readdir(BLOG_PATH);

    for (const file of files) {
      if (file.endsWith('.mdx')) {
        const slug = file.replace('.mdx', '');
        const filePath = path.join(BLOG_PATH, file);

        try {
          const source = await fs.readFile(filePath, 'utf8');
          const { data } = matter(source);
          posts.push({ slug, frontmatter: data });
        } catch (error) {
          console.error(`Error reading blog post: ${filePath}`, error);
        }
      }
    }
  } catch (error) {
    console.error('Error reading blog directory:', error);
  }

  return posts;
}
