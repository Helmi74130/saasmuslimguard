import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { extensionTokens, activityLogs, ActivityType } from '@/lib/db/schema';
import { getUser, getTeamForUser } from '@/lib/db/queries';
import { eq, and, isNull } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    // Vérifier que l'utilisateur est authentifié (via cookie JWT)
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

    // Récupérer le token depuis le body
    const body = await request.json();
    const { token } = body;

    if (!token || typeof token !== 'string') {
      return NextResponse.json(
        { error: 'Extension token is required' },
        { status: 400 }
      );
    }

    // Vérifier que le token existe et n'est pas révoqué
    const tokenResult = await db
      .select()
      .from(extensionTokens)
      .where(
        and(
          eq(extensionTokens.token, token),
          isNull(extensionTokens.revokedAt)
        )
      )
      .limit(1);

    if (tokenResult.length === 0) {
      return NextResponse.json(
        { error: 'Invalid or revoked extension token' },
        { status: 400 }
      );
    }

    const extensionToken = tokenResult[0];

    // Vérifier que le token n'est pas déjà lié à une autre team
    if (extensionToken.teamId && extensionToken.teamId !== team.id) {
      return NextResponse.json(
        { error: 'Extension token is already linked to another team' },
        { status: 400 }
      );
    }

    // Si déjà lié au même user et même team, ne rien faire
    if (extensionToken.teamId === team.id && extensionToken.userId === user.id) {
      return NextResponse.json({
        success: true,
        message: 'Extension already linked to your account',
        alreadyLinked: true,
        team: {
          id: team.id,
          name: team.name,
          subscriptionStatus: team.subscriptionStatus,
          planName: team.planName,
        },
      });
    }

    // Lier le token à la team et à l'utilisateur
    await db
      .update(extensionTokens)
      .set({
        teamId: team.id,
        userId: user.id,
      })
      .where(eq(extensionTokens.id, extensionToken.id));

    // Log de l'activité
    await db.insert(activityLogs).values({
      teamId: team.id,
      userId: user.id,
      action: ActivityType.EXTENSION_LINKED,
      timestamp: new Date(),
      ipAddress:
        request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
        request.headers.get('x-real-ip') ||
        null,
    });

    return NextResponse.json({
      success: true,
      message: 'Extension linked to your account successfully',
      team: {
        id: team.id,
        name: team.name,
        subscriptionStatus: team.subscriptionStatus,
        planName: team.planName,
      },
    });
  } catch (error) {
    console.error('Extension link account error:', error);
    return NextResponse.json(
      { error: 'Failed to link extension to account' },
      { status: 500 }
    );
  }
}
