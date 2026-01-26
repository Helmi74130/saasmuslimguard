import Image from 'next/image';
import { Calendar, Clock, User, Tag } from 'lucide-react';
import type { BlogFrontmatter } from '@/lib/mdx/types';

interface BlogHeaderProps {
  frontmatter: BlogFrontmatter;
}

export function BlogHeader({ frontmatter }: BlogHeaderProps) {
  const formattedDate = new Date(frontmatter.date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="mb-8">
      {frontmatter.coverImage && (
        <div className="relative w-full h-64 md:h-96 -mx-8 mb-8 overflow-hidden rounded-lg">
          <Image
            src={frontmatter.coverImage}
            alt={frontmatter.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#003463] text-white">
          {frontmatter.category}
        </span>
        {frontmatter.featured && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            ⭐ Featured
          </span>
        )}
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        {frontmatter.title}
      </h1>

      <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
        {frontmatter.description}
      </p>

      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 pb-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4" />
          <span>{frontmatter.author}</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{formattedDate}</span>
        </div>

        {frontmatter.readingTime && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{frontmatter.readingTime} min de lecture</span>
          </div>
        )}
      </div>

      {frontmatter.tags && frontmatter.tags.length > 0 && (
        <div className="flex items-center gap-2 mt-6 flex-wrap">
          <Tag className="w-4 h-4 text-gray-400" />
          {frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </header>
  );
}
