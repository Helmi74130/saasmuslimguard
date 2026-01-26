import type { DocFrontmatter, BlogFrontmatter } from './types';

interface ContentItem {
  slug: string;
  frontmatter: DocFrontmatter | BlogFrontmatter;
}

/**
 * Get related content based on tags/keywords similarity
 */
export function getRelatedContent<T extends ContentItem>(
  currentSlug: string,
  currentTags: string[],
  allContent: T[],
  limit = 3
): T[] {
  // Calculate similarity score for each item
  const scored = allContent
    .filter((item) => item.slug !== currentSlug)
    .map((item) => {
      const itemTags = 'tags' in item.frontmatter
        ? item.frontmatter.tags
        : 'keywords' in item.frontmatter
          ? item.frontmatter.keywords
          : [];

      const score = calculateSimilarity(currentTags, itemTags);

      return { ...item, score };
    })
    .filter((item) => item.score > 0) // Only include items with some similarity
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored;
}

/**
 * Calculate Jaccard similarity between two tag arrays
 */
function calculateSimilarity(tags1: string[], tags2: string[]): number {
  if (tags1.length === 0 || tags2.length === 0) {
    return 0;
  }

  const set1 = new Set(tags1.map((t) => t.toLowerCase()));
  const set2 = new Set(tags2.map((t) => t.toLowerCase()));

  const intersection = new Set([...set1].filter((x) => set2.has(x)));
  const union = new Set([...set1, ...set2]);

  return intersection.size / union.size; // Jaccard similarity
}
