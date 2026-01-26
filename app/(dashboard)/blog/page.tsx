import { getAllBlogPosts } from '@/lib/mdx/loader';
import { BlogCard } from '@/components/blog/blog-card';
import { Search } from 'lucide-react';

interface BlogPageProps {
  searchParams: Promise<{
    category?: string;
    tag?: string;
  }>;
}

export const metadata = {
  title: 'Blog | MuslimGuard',
  description: 'Articles, tutoriels et actualités sur MuslimGuard',
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  let posts = await getAllBlogPosts();

  // Filter by category
  if (params.category) {
    posts = posts.filter((post) => post.frontmatter.category === params.category);
  }

  // Filter by tag
  if (params.tag) {
    posts = posts.filter((post) => post.frontmatter.tags?.includes(params.tag));
  }

  // Separate featured posts
  const featuredPosts = posts.filter((post) => post.frontmatter.featured);
  const regularPosts = posts.filter((post) => !post.frontmatter.featured);

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold text-[#003463] dark:text-white mb-4">Blog</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Découvrez nos articles, tutoriels et actualités sur la protection en ligne selon
          les valeurs islamiques
        </p>
      </header>

      {featuredPosts.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            ⭐ Articles à la une
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <BlogCard key={post.slug} slug={post.slug} frontmatter={post.frontmatter} />
            ))}
          </div>
        </section>
      )}

      {regularPosts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {params.category || params.tag ? 'Résultats' : 'Tous les articles'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <BlogCard key={post.slug} slug={post.slug} frontmatter={post.frontmatter} />
            ))}
          </div>
        </section>
      )}

      {posts.length === 0 && (
        <div className="text-center py-16">
          <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Aucun article trouvé
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Aucun article ne correspond à vos critères de recherche.
          </p>
        </div>
      )}
    </div>
  );
}
