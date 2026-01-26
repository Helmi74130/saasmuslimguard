import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/mdx/loader';
import { getRelatedContent } from '@/lib/mdx/related';
import { BlogHeader } from '@/components/blog/blog-header';
import { RelatedPosts } from '@/components/blog/related-posts';
import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article non trouvé',
    };
  }

  return {
    title: `${post.frontmatter.title} | Blog MuslimGuard`,
    description: post.frontmatter.description,
    authors: [{ name: post.frontmatter.author }],
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: 'article',
      publishedTime: post.frontmatter.date,
      authors: [post.frontmatter.author],
      images: post.frontmatter.coverImage ? [post.frontmatter.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Get related posts
  const allPosts = await getAllBlogPosts();
  const relatedPosts = getRelatedContent(
    slug,
    post.frontmatter.tags || [],
    allPosts,
    3
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <article className="max-w-4xl mx-auto">
        <BlogHeader frontmatter={post.frontmatter} />

        <div className="prose prose-lg prose-gray dark:prose-invert max-w-none mt-8">
          {post.content}
        </div>

        <RelatedPosts posts={relatedPosts} />
      </article>
    </div>
  );
}
