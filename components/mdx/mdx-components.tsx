import Link from 'next/link';
import { CodeBlock } from './code-block';
import { Callout } from './callout';
import { FileTree, FileTreeItem } from './file-tree';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import type { MDXComponents } from 'mdx/types';
import type { ReactNode } from 'react';

/**
 * Custom MDX components
 * These components are injected into MDX content
 */
export const mdxComponents: MDXComponents = {
  // Headings
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold text-[#003463] dark:text-white mb-6 mt-8 scroll-mt-20">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-3xl font-semibold text-[#003463] dark:text-white mb-4 mt-8 scroll-mt-20">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-3 mt-6 scroll-mt-20">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2 mt-4 scroll-mt-20">
      {children}
    </h4>
  ),

  // Paragraphs and text
  p: ({ children }) => (
    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
      {children}
    </p>
  ),

  // Links
  a: ({ href, children }) => {
    const isExternal = href?.startsWith('http');
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#003463] dark:text-blue-400 hover:underline font-medium"
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href || '#'}
        className="text-[#003463] dark:text-blue-400 hover:underline font-medium"
      >
        {children}
      </Link>
    );
  },

  // Lists
  ul: ({ children }) => (
    <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,

  // Code
  code: CodeBlock,
  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto rounded-lg bg-gray-50 dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-800">
      {children}
    </pre>
  ),

  // Blockquote
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-[#003463] dark:border-blue-400 pl-4 my-6 italic text-gray-700 dark:text-gray-300">
      {children}
    </blockquote>
  ),

  // Tables
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-gray-50 dark:bg-gray-800">{children}</thead>
  ),
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr className="border-b border-gray-300 dark:border-gray-700">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="px-4 py-2 text-left font-semibold text-gray-900 dark:text-gray-100">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{children}</td>
  ),

  // Horizontal rule
  hr: () => <hr className="my-8 border-gray-300 dark:border-gray-700" />,

  // Custom components
  Callout,
  FileTree,
  FileTreeItem,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
};
