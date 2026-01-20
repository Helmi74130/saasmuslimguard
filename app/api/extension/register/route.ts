import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { extensionTokens } from '@/lib/db/schema';
import { generateExtensionToken } from '@/lib/auth/extension';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { deviceName, extensionVersion } = body;

    // Validation basique
    if (!deviceName || typeof deviceName !== 'string') {
      return NextResponse.json(
        { error: 'Device name is required' },
        { status: 400 }
      );
    }

    // Génération d'un token unique
    const token = generateExtensionToken();

    // Création du token en base de données (sans team/user pour le moment)
    const [newToken] = await db
      .insert(extensionTokens)
      .values({
        token,
        deviceName: deviceName.substring(0, 100), // Limitation à 100 caractères
        extensionVersion: extensionVersion
          ? extensionVersion.substring(0, 20)
          : null,
        createdAt: new Date(),
      })
      .returning();

    // Note: Le log d'activité EXTENSION_REGISTERED sera créé lors du link-account
    // (quand on aura un teamId valide), pas ici car on n'a pas encore de team

    return NextResponse.json({
      success: true,
      token: newToken.token,
      tokenId: newToken.id,
      message:
        'Extension registered successfully. Please link to your account.',
    });
  } catch (error) {
    console.error('Extension registration error:', error);
    return NextResponse.json(
      { error: 'Failed to register extension' },
      { status: 500 }
    );
  }
}
