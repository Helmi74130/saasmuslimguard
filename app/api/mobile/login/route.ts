import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { users, teams, teamMembers, mobileDevices, activityLogs, ActivityType } from '@/lib/db/schema';
import { comparePasswords } from '@/lib/auth/session';
import { SignJWT } from 'jose';
import { eq, and, isNull } from 'drizzle-orm';
import crypto from 'crypto';

const key = new TextEncoder().encode(process.env.AUTH_SECRET);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, deviceName, deviceId, appVersion } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Récupérer l'utilisateur par email
    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (userResult.length === 0) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const user = userResult[0];

    // Vérifier que l'utilisateur n'est pas soft-deleted
    if (user.deletedAt) {
      return NextResponse.json(
        { error: 'Account deleted' },
        { status: 403 }
      );
    }

    // Vérifier le mot de passe
    const isPasswordValid = await comparePasswords(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Récupérer la team de l'utilisateur via teamMembers
    const teamMemberResult = await db
      .select({
        teamId: teamMembers.teamId,
        team: teams,
      })
      .from(teamMembers)
      .innerJoin(teams, eq(teamMembers.teamId, teams.id))
      .where(eq(teamMembers.userId, user.id))
      .limit(1);

    const team = teamMemberResult.length > 0 ? teamMemberResult[0].team : null;

    // Déterminer le statut premium
    const isPremium = team?.subscriptionStatus === 'active' || team?.subscriptionStatus === 'trialing';

    // Générer le token mobile
    const mobileToken = `mob_${crypto.randomUUID()}`;

    // Insérer le device dans la base
    await db.insert(mobileDevices).values({
      token: mobileToken,
      teamId: team?.id || null,
      userId: user.id,
      deviceName: deviceName ? deviceName.substring(0, 100) : null,
      deviceId: deviceId ? deviceId.substring(0, 255) : null,
      platform: body.platform || 'android',
      appVersion: appVersion ? appVersion.substring(0, 20) : null,
    });

    // Créer le JWT mobile (expire dans 30 jours)
    const jwt = await new SignJWT({
      userId: user.id,
      teamId: team?.id || null,
      deviceToken: mobileToken,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('30d')
      .sign(key);

    // Logger l'activité
    if (team) {
      await db.insert(activityLogs).values({
        teamId: team.id,
        userId: user.id,
        action: ActivityType.MOBILE_LOGIN,
        timestamp: new Date(),
        ipAddress:
          request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
          request.headers.get('x-real-ip') ||
          null,
      });
    }

    return NextResponse.json({
      success: true,
      token: jwt,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      subscription: {
        isPremium,
        planName: team?.planName || 'free',
        status: team?.subscriptionStatus || 'none',
      },
    });
  } catch (error) {
    console.error('Mobile login error:', error);
    return NextResponse.json(
      { error: 'Failed to login' },
      { status: 500 }
    );
  }
}
