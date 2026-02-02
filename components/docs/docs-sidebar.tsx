'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, BookOpen, Download, Settings, Sparkles, Code, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import type { NavigationSection } from '@/lib/mdx/types';

interface DocsSidebarProps {
  navigation: NavigationSection[];
  onNavigate?: () => void;
}

const iconMap = {
  BookOpen,
  Download,
  Settings,
  Sparkles,
  Code,
  AlertCircle,
};

export function DocsSidebar({ navigation, onNavigate }: DocsSidebarProps) {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(navigation.map((section) => section.slug))
  );

  const toggleSection = (slug: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  };

  return (
    <nav className="w-full md:w-64 md:sticky md:top-20 md:h-[calc(100vh-5rem)] overflow-y-auto md:pr-4 pb-10">
      <div className="space-y-6">
        {navigation.map((section) => {
          const Icon = iconMap[section.icon as keyof typeof iconMap] || BookOpen;
          const isOpen = openSections.has(section.slug);

          return (
            <div key={section.slug}>
              <button
                onClick={() => toggleSection(section.slug)}
                className="flex items-center justify-between w-full text-sm font-semibold text-gray-900 dark:text-white hover:text-[#003463] dark:hover:text-blue-400 transition-colors mb-2"
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span>{section.title}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isOpen ? 'transform rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <ul className="space-y-1 ml-6">
                  {section.items.map((item) => {
                    const itemPath = `/docs/${item.slug}`;
                    const isActive = pathname === itemPath;

                    return (
                      <li key={item.slug}>
                        <Link
                          href={itemPath}
                          onClick={onNavigate}
                          className={`block py-1.5 px-3 text-sm rounded transition-colors ${
                            isActive
                              ? 'bg-[#003463] text-white dark:bg-blue-600'
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                          }`}
                        >
                          {item.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
