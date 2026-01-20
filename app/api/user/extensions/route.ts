import { NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { extensionTokens } from '@/lib/db/schema';
import { getUser, getTeamForUser } from '@/lib/db/queries';
import { eq, and, isNull, desc } from 'drizzle-orm';

export async function GET() {
  try {
    // Vérifier que l'utilisateur est authentifié
    const user = await getUser();
    if (!user) {
      return NextResponse.json(
        { error: 'User not authenticated' },
        { status: 401 }
      );
    }

    // Récupérer la team de l'utilisateur
    const team = await getTeamForUser();
    if (!team) {
      return NextResponse.json(
        { error: 'User does not belong to a team' },
        { status: 400 }
      );
    }

    // Récupérer toutes les extensions de la team (actives et révoquées)
    const tokens = await db
      .select({
        id: extensionTokens.id,
        deviceName: extensionTokens.deviceName,
        extensionVersion: extensionTokens.extensionVersion,
        createdAt: extensionTokens.createdAt,
        lastUsedAt: extensionTokens.lastUsedAt,
        revokedAt: extensionTokens.revokedAt,
        userId: extensionTokens.userId,
      })
      .from(extensionTokens)
      .where(eq(extensionTokens.teamId, team.id))
      .orderBy(desc(extensionTokens.createdAt));

    // Séparer les tokens actifs et révoqués
    const activeTokens = tokens.filter((t) => !t.revokedAt);
    const revokedTokens = tokens.filter((t) => t.revokedAt);

    return NextResponse.json({
      success: true,
      extensions: tokens.map((token) => ({
        id: token.id,
        deviceName: token.deviceName,
        extensionVersion: token.extensionVersion,
        createdAt: token.createdAt,
        lastUsedAt: token.lastUsedAt,
        revokedAt: token.revokedAt,
        isActive: !token.revokedAt,
        installedBy: token.userId === user.id ? 'You' : 'Team member',
      })),
      summary: {
        total: tokens.length,
        active: activeTokens.length,
        revoked: revokedTokens.length,
      },
    });
  } catch (error) {
    console.error('Get extensions error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve extensions' },
      { status: 500 }
    );
  }
}
