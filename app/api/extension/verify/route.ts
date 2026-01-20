import { NextRequest, NextResponse } from 'next/server';
import { verifyExtensionToken } from '@/lib/auth/extension';

export async function GET(request: NextRequest) {
  const authResult = await verifyExtensionToken(request);

  if (!authResult.valid) {
    return NextResponse.json(
      { error: authResult.error || 'Invalid token' },
      { status: 401 }
    );
  }

  // Si le token n'est pas encore lié à une team
  if (!authResult.tokenData?.teamId) {
    return NextResponse.json({
      valid: true,
      linked: false,
      message: 'Token is valid but not linked to an account yet',
      tokenData: {
        id: authResult.tokenData?.id,
        deviceName: authResult.tokenData?.deviceName,
        extensionVersion: authResult.tokenData?.extensionVersion,
        createdAt: authResult.tokenData?.createdAt,
        lastUsedAt: authResult.tokenData?.lastUsedAt,
      },
    });
  }

  // Token lié à une team - retourner les infos complètes
  return NextResponse.json({
    valid: true,
    linked: true,
    tokenData: {
      id: authResult.tokenData.id,
      deviceName: authResult.tokenData.deviceName,
      extensionVersion: authResult.tokenData.extensionVersion,
      createdAt: authResult.tokenData.createdAt,
      lastUsedAt: authResult.tokenData.lastUsedAt,
    },
    team: authResult.team
      ? {
          id: authResult.team.id,
          name: authResult.team.name,
          subscriptionStatus: authResult.team.subscriptionStatus,
          planName: authResult.team.planName,
        }
      : null,
    user: authResult.user
      ? {
          id: authResult.user.id,
          name: authResult.user.name,
          email: authResult.user.email,
        }
      : null,
  });
}
