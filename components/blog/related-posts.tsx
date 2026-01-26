import { BlogCard } from './blog-card';
import type { BlogFrontmatter } from '@/lib/mdx/types';

interface RelatedPostsProps {
  posts: Array<{ slug: string; frontmatter: BlogFrontmatter }>;
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Articles similaires
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.slug} slug={post.slug} frontmatter={post.frontmatter} />
        ))}
      </div>
    </section>
  );
}
