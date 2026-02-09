import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { mobileDevices, activityLogs, ActivityType } from '@/lib/db/schema';
import { getUser, getTeamForUser } from '@/lib/db/queries';
import { eq, and } from 'drizzle-orm';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deviceId = parseInt(id, 10);

    if (isNaN(deviceId)) {
      return NextResponse.json(
        { error: 'Invalid device ID' },
        { status: 400 }
      );
    }

    // Vérifier que l'utilisateur est authentifié (cookie session web)
    const user = await getUser();
    if (!user) {
      return NextResponse.json(
        { error: 'User not authenticated' },
        { status: 401 }
      );
    }

    // Vérifier que le device appartient à l'utilisateur
    const deviceResult = await db
      .select()
      .from(mobileDevices)
      .where(
        and(
          eq(mobileDevices.id, deviceId),
          eq(mobileDevices.userId, user.id)
        )
      )
      .limit(1);

    if (deviceResult.length === 0) {
      return NextResponse.json(
        { error: 'Mobile device not found or does not belong to you' },
        { status: 404 }
      );
    }

    // Soft delete : mettre revokedAt à maintenant
    await db
      .update(mobileDevices)
      .set({ revokedAt: new Date() })
      .where(eq(mobileDevices.id, deviceId));

    // Logger l'activité
    const team = await getTeamForUser();
    if (team) {
      await db.insert(activityLogs).values({
        teamId: team.id,
        userId: user.id,
        action: ActivityType.MOBILE_DEVICE_REVOKED,
        timestamp: new Date(),
        ipAddress:
          request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
          request.headers.get('x-real-ip') ||
          null,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Mobile device revoked successfully',
    });
  } catch (error) {
    console.error('Revoke mobile device error:', error);
    return NextResponse.json(
      { error: 'Failed to revoke mobile device' },
      { status: 500 }
    );
  }
}
