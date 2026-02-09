import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { mobileDevices, activityLogs, ActivityType } from '@/lib/db/schema';
import { jwtVerify } from 'jose';
import { eq, and, isNull } from 'drizzle-orm';

const key = new TextEncoder().encode(process.env.AUTH_SECRET);

export async function DELETE(request: NextRequest) {
  try {
    // Extraire le JWT du header Authorization
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No token' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);

    // Vérifier le JWT
    let payload;
    try {
      const result = await jwtVerify(token, key, { algorithms: ['HS256'] });
      payload = result.payload as { userId: number; teamId: number | null; deviceToken: string };
    } catch {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Révoquer le device (soft delete)
    const deviceResult = await db
      .select()
      .from(mobileDevices)
      .where(
        and(
          eq(mobileDevices.token, payload.deviceToken),
          isNull(mobileDevices.revokedAt)
        )
      )
      .limit(1);

    if (deviceResult.length > 0) {
      await db
        .update(mobileDevices)
        .set({ revokedAt: new Date() })
        .where(eq(mobileDevices.id, deviceResult[0].id));
    }

    // Logger l'activité
    if (payload.teamId) {
      await db.insert(activityLogs).values({
        teamId: payload.teamId,
        userId: payload.userId,
        action: ActivityType.MOBILE_LOGOUT,
        timestamp: new Date(),
        ipAddress:
          request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
          request.headers.get('x-real-ip') ||
          null,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('Mobile logout error:', error);
    return NextResponse.json(
      { error: 'Failed to logout' },
      { status: 500 }
    );
  }
}
