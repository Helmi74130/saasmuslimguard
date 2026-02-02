import { getAllBlogPosts } from '@/lib/mdx/loader';
import { BlogCard } from '@/components/blog/blog-card';
import { Search } from 'lucide-react';
import FooterSection from '@/components/footer';

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
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        <header className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
            Découvrez nos articles, tutoriels et actualités sur la protection en ligne selon
            les valeurs islamiques
          </p>
        </header>

        {featuredPosts.length > 0 && (
          <section className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {featuredPosts.map((post) => (
                <BlogCard key={post.slug} slug={post.slug} frontmatter={post.frontmatter} />
              ))}
            </div>
          </section>
        )}

        {regularPosts.length > 0 && (
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {regularPosts.map((post) => (
                <BlogCard key={post.slug} slug={post.slug} frontmatter={post.frontmatter} />
              ))}
            </div>
          </section>
        )}

        {posts.length === 0 && (
          <div className="text-center py-20">
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

      <FooterSection />
    </div>
  );
}
