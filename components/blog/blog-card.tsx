import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { BlogFrontmatter } from '@/lib/mdx/types';

interface BlogCardProps {
  slug: string;
  frontmatter: BlogFrontmatter;
}

export function BlogCard({ slug, frontmatter }: BlogCardProps) {
  const formattedDate = new Date(frontmatter.date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/blog/${slug}`}>
      <Card className="group h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        {frontmatter.coverImage && (
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={frontmatter.coverImage}
              alt={frontmatter.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#003463] text-white">
              {frontmatter.category}
            </span>
            {frontmatter.featured && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                ⭐ Featured
              </span>
            )}
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-[#003463] dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {frontmatter.title}
          </h3>
        </CardHeader>

        <CardContent>
          <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
            {frontmatter.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>

            {frontmatter.readingTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{frontmatter.readingTime} min</span>
              </div>
            )}
          </div>

          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              <Tag className="w-4 h-4 text-gray-400" />
              {frontmatter.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
