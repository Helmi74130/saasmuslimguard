import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { BlogFrontmatter } from '@/lib/mdx/types';

interface BlogCardProps {
  slug: string;
  frontmatter: BlogFrontmatter;
}

export function BlogCard({ slug, frontmatter }: BlogCardProps) {
  const formattedDate = new Date(frontmatter.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article className="h-full flex flex-col">
        {frontmatter.coverImage && (
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg mb-4">
            <Image
              src={frontmatter.coverImage}
              alt={frontmatter.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        <div className="flex items-center gap-2 mb-3">
          {frontmatter.author && (
            <>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {frontmatter.author}
              </span>
              <span className="text-gray-400">•</span>
            </>
          )}
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {formattedDate}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-[#003463] dark:group-hover:text-blue-400 transition-colors flex items-start justify-between gap-2">
          <span className="line-clamp-2">{frontmatter.title}</span>
          <ArrowUpRight className="w-5 h-5 flex-shrink-0 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </h3>

        <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-4 flex-grow">
          {frontmatter.description}
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          {frontmatter.category && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              {frontmatter.category}
            </span>
          )}
          {frontmatter.tags && frontmatter.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              {tag}
            </span>
          ))}
        </div>
      </article>
    </Link>
  );
}
