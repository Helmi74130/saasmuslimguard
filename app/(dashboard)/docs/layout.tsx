'use client';

import { useState, useEffect } from 'react';
import { DocsSidebar } from '@/components/docs/docs-sidebar';
import { SearchDialog } from '@/components/docs/search-dialog';
import { Search } from 'lucide-react';
import navigation from '@/content/config/docs-navigation.json';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[#003463] dark:text-white mb-2">
              Documentation
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Guides complets pour utiliser MuslimGuard
            </p>
          </div>

          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Rechercher</span>
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs bg-white dark:bg-gray-900 rounded border border-gray-300 dark:border-gray-600">
              ⌘K
            </kbd>
          </button>
        </div>

        <div className="flex gap-8">
          <DocsSidebar navigation={navigation.sections} />
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>

      <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
