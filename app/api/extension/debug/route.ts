import { NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { extensionTokens } from '@/lib/db/schema';
import { getUser, getTeamForUser } from '@/lib/db/queries';
import { eq, desc } from 'drizzle-orm';

/**
 * Endpoint de debug pour diagnostiquer les tokens multiples
 * À SUPPRIMER EN PRODUCTION
 */
export async function GET() {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json(
        { error: 'User not authenticated' },
        { status: 401 }
      );
    }

    const team = await getTeamForUser();
    if (!team) {
      return NextResponse.json(
        { error: 'User does not belong to a team' },
        { status: 400 }
      );
    }

    // Récupérer tous les tokens de la team
    const allTokens = await db
      .select({
        id: extensionTokens.id,
        token: extensionTokens.token,
        deviceName: extensionTokens.deviceName,
        userId: extensionTokens.userId,
        teamId: extensionTokens.teamId,
        createdAt: extensionTokens.createdAt,
        lastUsedAt: extensionTokens.lastUsedAt,
        revokedAt: extensionTokens.revokedAt,
      })
      .from(extensionTokens)
      .where(eq(extensionTokens.teamId, team.id))
      .orderBy(desc(extensionTokens.createdAt));

    // Analyser les patterns
    const analysis = {
      totalTokens: allTokens.length,
      activeTokens: allTokens.filter((t) => !t.revokedAt).length,
      revokedTokens: allTokens.filter((t) => t.revokedAt).length,
      unlinkedTokens: allTokens.filter((t) => !t.teamId).length,

      // Grouper par deviceName
      byDevice: allTokens.reduce((acc, token) => {
        const device = token.deviceName || 'Unknown';
        if (!acc[device]) {
          acc[device] = [];
        }
        acc[device].push({
          id: token.id,
          createdAt: token.createdAt,
          linked: !!token.teamId,
          revoked: !!token.revokedAt,
          lastUsed: token.lastUsedAt,
        });
        return acc;
      }, {} as Record<string, any[]>),

      // Tokens suspects (même device, créés le même jour)
      suspiciousDuplicates: Object.entries(
        allTokens.reduce((acc, token) => {
          const device = token.deviceName || 'Unknown';
          const date = token.createdAt?.toISOString().split('T')[0];
          const key = `${device}_${date}`;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(token);
          return acc;
        }, {} as Record<string, any[]>)
      )
        .filter(([_, tokens]) => tokens.length > 1)
        .map(([key, tokens]) => ({
          device: key.split('_')[0],
          date: key.split('_')[1],
          count: tokens.length,
          tokens: tokens.map((t) => ({
            id: t.id,
            createdAt: t.createdAt,
            linked: !!t.teamId,
          })),
        })),
    };

    return NextResponse.json({
      team: {
        id: team.id,
        name: team.name,
      },
      tokens: allTokens.map((t) => ({
        ...t,
        token: `${t.token.substring(0, 10)}...`, // Masquer le token complet
      })),
      analysis,
    });
  } catch (error) {
    console.error('Extension debug error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve debug info' },
      { status: 500 }
    );
  }
}
