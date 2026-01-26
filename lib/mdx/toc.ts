import type { TocItem } from './types';

/**
 * Generate table of contents from MDX content
 * Extracts h2 and h3 headings
 */
export function generateTOC(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: TocItem[] = [];

  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();

    // Remove markdown formatting from heading text
    const cleanText = text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
      .replace(/`([^`]+)`/g, '$1') // Remove code formatting
      .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
      .replace(/\*([^*]+)\*/g, '$1') // Remove italic
      .trim();

    // Generate ID (same as rehype-slug)
    const id = cleanText
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');

    toc.push({ id, text: cleanText, level });
  }

  return toc;
}
