import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  try {
    // Load search index
    const indexPath = path.join(process.cwd(), 'content/config/search-index.json');
    const indexData = await fs.readFile(indexPath, 'utf8');
    const index = JSON.parse(indexData);

    // Simple search implementation
    const lowercaseQuery = query.toLowerCase();
    const results = index.filter(
      (item: any) =>
        item.title.toLowerCase().includes(lowercaseQuery) ||
        item.description.toLowerCase().includes(lowercaseQuery) ||
        item.tags?.some((tag: string) => tag.toLowerCase().includes(lowercaseQuery))
    );

    return NextResponse.json({ results: results.slice(0, 10) });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
