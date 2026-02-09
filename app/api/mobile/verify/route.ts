import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { users, teams, teamMembers, mobileDevices } from '@/lib/db/schema';
import { jwtVerify } from 'jose';
import { eq, and, isNull } from 'drizzle-orm';

const key = new TextEncoder().encode(process.env.AUTH_SECRET);

export async function GET(request: NextRequest) {
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

    // Vérifier que le device token n'est pas révoqué
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

    if (deviceResult.length === 0) {
      return NextResponse.json(
        { error: 'Device revoked' },
        { status: 403 }
      );
    }

    // Mettre à jour lastUsedAt
    await db
      .update(mobileDevices)
      .set({ lastUsedAt: new Date() })
      .where(eq(mobileDevices.id, deviceResult[0].id));

    // Récupérer l'utilisateur (vérifier qu'il n'est pas supprimé)
    const userResult = await db
      .select()
      .from(users)
      .where(and(eq(users.id, payload.userId), isNull(users.deletedAt)))
      .limit(1);

    if (userResult.length === 0) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const user = userResult[0];

    // Récupérer le statut d'abonnement actuel de la team
    const teamMemberResult = await db
      .select({ team: teams })
      .from(teamMembers)
      .innerJoin(teams, eq(teamMembers.teamId, teams.id))
      .where(eq(teamMembers.userId, user.id))
      .limit(1);

    const team = teamMemberResult.length > 0 ? teamMemberResult[0].team : null;
    const isPremium = team?.subscriptionStatus === 'active' || team?.subscriptionStatus === 'trialing';

    return NextResponse.json({
      valid: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      subscription: {
        isPremium,
        planName: team?.planName || 'free',
        status: team?.subscriptionStatus || 'none',
        source: team?.subscriptionSource || (team?.stripeSubscriptionId ? 'stripe' : 'none'),
        expiresAt: team?.googlePlayExpiresAt?.getTime() || null,
        willRenew: team?.subscriptionStatus === 'active',
      },
    });
  } catch (error) {
    console.error('Mobile verify error:', error);
    return NextResponse.json(
      { error: 'Failed to verify token' },
      { status: 500 }
    );
  }
}
