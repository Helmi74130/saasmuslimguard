import { NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { mobileDevices } from '@/lib/db/schema';
import { getUser } from '@/lib/db/queries';
import { eq, isNull, desc } from 'drizzle-orm';

export async function GET() {
  try {
    // Vérifier que l'utilisateur est authentifié (cookie session web)
    const user = await getUser();
    if (!user) {
      return NextResponse.json(
        { error: 'User not authenticated' },
        { status: 401 }
      );
    }

    // Récupérer tous les appareils mobiles actifs de l'utilisateur
    const devices = await db
      .select({
        id: mobileDevices.id,
        deviceName: mobileDevices.deviceName,
        platform: mobileDevices.platform,
        appVersion: mobileDevices.appVersion,
        lastUsedAt: mobileDevices.lastUsedAt,
        createdAt: mobileDevices.createdAt,
      })
      .from(mobileDevices)
      .where(
        eq(mobileDevices.userId, user.id),
      )
      .orderBy(desc(mobileDevices.createdAt));

    // Séparer actifs et révoqués
    const allDevices = await db
      .select({
        id: mobileDevices.id,
        deviceName: mobileDevices.deviceName,
        platform: mobileDevices.platform,
        appVersion: mobileDevices.appVersion,
        lastUsedAt: mobileDevices.lastUsedAt,
        createdAt: mobileDevices.createdAt,
        revokedAt: mobileDevices.revokedAt,
      })
      .from(mobileDevices)
      .where(eq(mobileDevices.userId, user.id))
      .orderBy(desc(mobileDevices.createdAt));

    const activeDevices = allDevices.filter((d) => !d.revokedAt);

    return NextResponse.json({
      devices: activeDevices.map((device) => ({
        id: device.id,
        deviceName: device.deviceName,
        platform: device.platform,
        appVersion: device.appVersion,
        lastUsedAt: device.lastUsedAt,
        createdAt: device.createdAt,
      })),
    });
  } catch (error) {
    console.error('Get mobile devices error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve mobile devices' },
      { status: 500 }
    );
  }
}
