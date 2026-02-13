import { db } from '@/lib/db/drizzle';
import { videos, videoCategories } from '@/lib/db/schema';
import { asc, eq } from 'drizzle-orm';
import { getUser } from '@/lib/db/queries';
import { NextResponse } from 'next/server';

export async function GET() {
  const user = await getUser();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
  }

  const result = await db
    .select({
      id: videos.id,
      youtubeId: videos.youtubeId,
      title: videos.title,
      thumbnailUrl: videos.thumbnailUrl,
      categoryId: videos.categoryId,
      categoryName: videoCategories.name,
      hasSound: videos.hasSound,
      order: videos.order,
      active: videos.active,
      createdAt: videos.createdAt,
    })
    .from(videos)
    .leftJoin(videoCategories, eq(videos.categoryId, videoCategories.id))
    .orderBy(asc(videos.order));

  return NextResponse.json({ videos: result });
}
