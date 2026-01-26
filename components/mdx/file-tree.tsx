import { File, Folder } from 'lucide-react';
import type { ReactNode } from 'react';

interface FileTreeProps {
  children: ReactNode;
}

/**
 * File tree component for displaying directory structures
 * Usage in MDX:
 * <FileTree>
 * - 📁 content/
 *   - 📁 docs/
 *     - 📄 index.mdx
 * </FileTree>
 */
export function FileTree({ children }: FileTreeProps) {
  return (
    <div className="my-6 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg font-mono text-sm">
      <div className="[&_ul]:list-none [&_ul]:pl-4 [&_li]:py-1">
        {children}
      </div>
    </div>
  );
}

interface FileTreeItemProps {
  name: string;
  type?: 'file' | 'folder';
  children?: ReactNode;
}

export function FileTreeItem({ name, type = 'file', children }: FileTreeItemProps) {
  const Icon = type === 'folder' ? Folder : File;

  return (
    <li>
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        <span>{name}</span>
      </div>
      {children && <ul className="pl-4">{children}</ul>}
    </li>
  );
}
