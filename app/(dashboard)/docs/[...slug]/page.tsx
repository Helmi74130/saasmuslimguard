import { notFound } from 'next/navigation';
import { getDocBySlug, getAllDocs } from '@/lib/mdx/loader';
import { generateTOC } from '@/lib/mdx/toc';
import { DocsBreadcrumbs } from '@/components/docs/docs-breadcrumbs';
import { TableOfContents } from '@/components/docs/table-of-contents';
import { PrevNextNav } from '@/components/docs/prev-next-nav';
import navigation from '@/content/config/docs-navigation.json';
import type { Metadata } from 'next';

interface DocPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateStaticParams() {
  const docs = await getAllDocs();

  return docs.map((doc) => ({
    slug: doc.slug.split('/'),
  }));
}

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getDocBySlug(slug);

  if (!doc) {
    return {
      title: 'Page non trouvée',
    };
  }

  return {
    title: `${doc.frontmatter.title} | MuslimGuard Documentation`,
    description: doc.frontmatter.description,
    keywords: doc.frontmatter.keywords,
    openGraph: {
      title: doc.frontmatter.title,
      description: doc.frontmatter.description,
      type: 'article',
    },
  };
}

export default async function DocPage({ params }: DocPageProps) {
  const { slug } = await params;
  const doc = await getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  const toc = generateTOC(doc.rawContent);

  // Find prev/next pages
  const allItems = navigation.sections.flatMap((section) => section.items);
  const currentIndex = allItems.findIndex((item) => item.slug === slug.join('/'));
  const prev = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const next = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  return (
    <div className="flex gap-8">
      <article className="flex-1 max-w-3xl">
        <DocsBreadcrumbs sections={slug} />

        <header className="mb-8">
          <h1 className="text-4xl font-bold text-[#003463] dark:text-white mb-4">
            {doc.frontmatter.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {doc.frontmatter.description}
          </p>
          {doc.frontmatter.lastUpdated && (
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Dernière mise à jour :{' '}
              {new Date(doc.frontmatter.lastUpdated).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}
        </header>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          {doc.content}
        </div>

        <PrevNextNav prev={prev} next={next} />
      </article>

      <TableOfContents items={toc} />
    </div>
  );
}
