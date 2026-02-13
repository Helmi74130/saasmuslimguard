import { db } from '@/lib/db/drizzle';
import { videoCategories } from '@/lib/db/schema';
import { eq, asc } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
  const categories = await db
    .select({
      id: videoCategories.id,
      name: videoCategories.name,
      icon: videoCategories.icon,
      order: videoCategories.order,
    })
    .from(videoCategories)
    .where(eq(videoCategories.active, true))
    .orderBy(asc(videoCategories.order));

  return NextResponse.json({ categories });
}
