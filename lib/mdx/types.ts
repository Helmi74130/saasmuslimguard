export interface DocFrontmatter {
  title: string;
  description: string;
  section: string;
  order: number;
  lastUpdated: string;
  keywords: string[];
}

export interface BlogFrontmatter {
  title: string;
  description: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  coverImage?: string;
  readingTime?: number;
  featured?: boolean;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface NavigationSection {
  title: string;
  slug: string;
  icon: string;
  items: NavigationItem[];
}

export interface NavigationItem {
  title: string;
  slug: string;
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  slug: string;
  type: 'doc' | 'blog';
}
