import type { ReactNode } from 'react';

interface CodeBlockProps {
  children: ReactNode;
  className?: string;
}

/**
 * Code block component for inline code
 * Block code is handled by Shiki through rehype-shiki
 */
export function CodeBlock({ children, className }: CodeBlockProps) {
  const isInline = !className || !className.startsWith('language-');

  if (isInline) {
    return (
      <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-sm font-mono text-[#003463] dark:text-blue-300 border border-gray-200 dark:border-gray-700">
        {children}
      </code>
    );
  }

  // Block code is handled by Shiki, just return children
  return <code className={className}>{children}</code>;
}
