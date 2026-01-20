import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { extensionTokens, activityLogs, ActivityType } from '@/lib/db/schema';
import { getUser, getTeamForUser } from '@/lib/db/queries';
import { eq, and } from 'drizzle-orm';

export async function DELETE(request: NextRequest) {
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

    // Récupérer le tokenId depuis le body ou depuis les query params
    const url = new URL(request.url);
    const tokenIdParam = url.searchParams.get('tokenId');

    let tokenId: number;

    if (tokenIdParam) {
      tokenId = parseInt(tokenIdParam, 10);
    } else {
      const body = await request.json();
      tokenId = body.tokenId;
    }

    if (!tokenId || isNaN(tokenId)) {
      return NextResponse.json(
        { error: 'Valid token ID is required' },
        { status: 400 }
      );
    }

    // Vérifier que le token appartient à la team de l'utilisateur
    const tokenResult = await db
      .select()
      .from(extensionTokens)
      .where(
        and(
          eq(extensionTokens.id, tokenId),
          eq(extensionTokens.teamId, team.id)
        )
      )
      .limit(1);

    if (tokenResult.length === 0) {
      return NextResponse.json(
        { error: 'Extension token not found or does not belong to your team' },
        { status: 404 }
      );
    }

    // Révoquer le token (soft delete via revokedAt)
    await db
      .update(extensionTokens)
      .set({
        revokedAt: new Date(),
      })
      .where(eq(extensionTokens.id, tokenId));

    // Log de l'activité
    await db.insert(activityLogs).values({
      teamId: team.id,
      userId: user.id,
      action: ActivityType.EXTENSION_REVOKED,
      timestamp: new Date(),
      ipAddress:
        request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
        request.headers.get('x-real-ip') ||
        null,
    });

    return NextResponse.json({
      success: true,
      message: 'Extension token revoked successfully',
    });
  } catch (error) {
    console.error('Extension revoke error:', error);
    return NextResponse.json(
      { error: 'Failed to revoke extension token' },
      { status: 500 }
    );
  }
}
