import { db } from '@/lib/db/drizzle';
import { videos } from '@/lib/db/schema';
import { eq, and, asc } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const categoryId = request.nextUrl.searchParams.get('categoryId');

  const conditions = [eq(videos.active, true)];
  if (categoryId) {
    conditions.push(eq(videos.categoryId, parseInt(categoryId)));
  }

  const result = await db
    .select({
      id: videos.id,
      youtubeId: videos.youtubeId,
      title: videos.title,
      thumbnailUrl: videos.thumbnailUrl,
      hasSound: videos.hasSound,
      order: videos.order,
    })
    .from(videos)
    .where(and(...conditions))
    .orderBy(asc(videos.order));

  return NextResponse.json({ videos: result });
}
