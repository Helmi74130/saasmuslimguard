import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface DocsBreadcrumbsProps {
  sections: string[];
}

export function DocsBreadcrumbs({ sections }: DocsBreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
      <Link
        href="/"
        className="hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <Home className="w-4 h-4" />
      </Link>

      <ChevronRight className="w-4 h-4" />

      <Link
        href="/docs"
        className="hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        Documentation
      </Link>

      {sections.map((section, index) => {
        const isLast = index === sections.length - 1;
        const href = `/docs/${sections.slice(0, index + 1).join('/')}`;

        return (
          <div key={section} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4" />
            {isLast ? (
              <span className="text-gray-900 dark:text-white font-medium">
                {formatSectionName(section)}
              </span>
            ) : (
              <Link
                href={href}
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {formatSectionName(section)}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}

function formatSectionName(section: string): string {
  return section
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
