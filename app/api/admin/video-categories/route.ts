import { db } from '@/lib/db/drizzle';
import { videoCategories } from '@/lib/db/schema';
import { asc } from 'drizzle-orm';
import { getUser } from '@/lib/db/queries';
import { NextResponse } from 'next/server';

export async function GET() {
  const user = await getUser();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
  }

  const categories = await db
    .select()
    .from(videoCategories)
    .orderBy(asc(videoCategories.order));

  return NextResponse.json({ categories });
}
