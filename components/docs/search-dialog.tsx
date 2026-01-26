'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, FileText, BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  slug: string;
  type: 'doc' | 'blog';
}

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);

    try {
      // Use the search API instead of loading the file directly
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, performSearch]);

  const handleSelect = (result: SearchResult) => {
    router.push(result.slug);
    onClose();
    setQuery('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl p-0">
        <DialogHeader className="px-4 pt-4 pb-0">
          <DialogTitle className="sr-only">Rechercher</DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-3 px-4 pb-4 border-b border-gray-200 dark:border-gray-800">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher dans la documentation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400"
            autoFocus
          />
        </div>

        <div className="max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-8 text-center text-gray-500">Recherche...</div>
          ) : results.length > 0 ? (
            <div className="p-2">
              {results.map((result) => {
                const Icon = result.type === 'blog' ? FileText : BookOpen;
                return (
                  <button
                    key={result.id}
                    onClick={() => handleSelect(result)}
                    className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
                  >
                    <Icon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white truncate">
                        {result.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        {result.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {result.type === 'blog' ? 'Blog' : 'Documentation'}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : query ? (
            <div className="p-8 text-center text-gray-500">
              Aucun résultat pour "{query}"
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              Commencez à taper pour rechercher...
            </div>
          )}
        </div>

        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800 text-xs text-gray-500">
          <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">↑↓</kbd> pour
          naviguer · <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">↵</kbd>{' '}
          pour sélectionner · <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
            Échap
          </kbd>{' '}
          pour fermer
        </div>
      </DialogContent>
    </Dialog>
  );
}
