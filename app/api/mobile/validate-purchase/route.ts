import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { teams, activityLogs, ActivityType } from '@/lib/db/schema';
import { jwtVerify } from 'jose';
import { eq } from 'drizzle-orm';

const key = new TextEncoder().encode(process.env.AUTH_SECRET);

const VALID_PRODUCTS = ['muslimguard_monthly', 'muslimguard_annual'] as const;

export async function POST(request: NextRequest) {
  try {
    // 1. Vérifier l'auth
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'No token' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);

    let payload;
    try {
      const result = await jwtVerify(token, key, { algorithms: ['HS256'] });
      payload = result.payload as { userId: number; teamId: number | null; deviceToken: string };
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      );
    }

    if (!payload.teamId) {
      return NextResponse.json(
        { success: false, error: 'No team associated' },
        { status: 400 }
      );
    }

    // 2. Récupérer le body
    const body = await request.json();
    const { platform, purchaseToken, productId } = body;

    if (platform !== 'android' || !purchaseToken || !productId) {
      return NextResponse.json(
        { success: false, error: 'Invalid request' },
        { status: 400 }
      );
    }

    // 3. Valider que le productId est valide
    if (!VALID_PRODUCTS.includes(productId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid product' },
        { status: 400 }
      );
    }

    // 4. Calculer la date d'expiration (approximative pour le MVP)
    // En production : valider via l'API Google Play Developer avec un Service Account
    const now = new Date();
    const expiresAt = productId === 'muslimguard_annual'
      ? new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000)
      : new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    const planName = productId === 'muslimguard_annual'
      ? 'Premium Annual'
      : 'Premium Monthly';

    // 5. Mettre à jour la team
    await db
      .update(teams)
      .set({
        subscriptionStatus: 'active',
        planName,
        googlePlayPurchaseToken: purchaseToken,
        googlePlayProductId: productId,
        googlePlayExpiresAt: expiresAt,
        subscriptionSource: 'google_play',
        updatedAt: new Date(),
      })
      .where(eq(teams.id, payload.teamId));

    // 6. Logger l'activité
    await db.insert(activityLogs).values({
      teamId: payload.teamId,
      userId: payload.userId,
      action: ActivityType.GOOGLE_PLAY_PURCHASE,
      timestamp: new Date(),
      ipAddress:
        request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
        request.headers.get('x-real-ip') ||
        null,
    });

    // 7. Retourner le statut
    return NextResponse.json({
      success: true,
      subscription: {
        isPremium: true,
        status: 'active',
        planName,
        source: 'google_play',
        expiresAt: expiresAt.getTime(),
        willRenew: true,
      },
    });
  } catch (error) {
    console.error('Validate purchase error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to validate purchase' },
      { status: 500 }
    );
  }
}
