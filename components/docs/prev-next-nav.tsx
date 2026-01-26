import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { NavigationItem } from '@/lib/mdx/types';

interface PrevNextNavProps {
  prev?: NavigationItem | null;
  next?: NavigationItem | null;
}

export function PrevNextNav({ prev, next }: PrevNextNavProps) {
  if (!prev && !next) {
    return null;
  }

  return (
    <nav className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
      {prev ? (
        <Link
          href={`/docs/${prev.slug}`}
          className="group flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-[#003463] dark:hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all"
        >
          <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-[#003463] dark:group-hover:text-blue-400 transition-colors" />
          <div className="flex-1">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Précédent</p>
            <p className="font-medium text-gray-900 dark:text-white group-hover:text-[#003463] dark:group-hover:text-blue-400 transition-colors">
              {prev.title}
            </p>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next && (
        <Link
          href={`/docs/${next.slug}`}
          className="group flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-[#003463] dark:hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all md:ml-auto"
        >
          <div className="flex-1 text-right">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Suivant</p>
            <p className="font-medium text-gray-900 dark:text-white group-hover:text-[#003463] dark:group-hover:text-blue-400 transition-colors">
              {next.title}
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#003463] dark:group-hover:text-blue-400 transition-colors" />
        </Link>
      )}
    </nav>
  );
}
