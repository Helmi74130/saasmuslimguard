import { db } from '@/lib/db/drizzle';
import { extensionTokens, teams, users } from '@/lib/db/schema';
import { eq, and, isNull } from 'drizzle-orm';
import { NextRequest } from 'next/server';
import crypto from 'crypto';

export interface ExtensionAuthResult {
  valid: boolean;
  tokenData?: {
    id: number;
    token: string;
    teamId: number | null;
    userId: number | null;
    deviceName: string | null;
    extensionVersion: string | null;
    createdAt: Date;
    lastUsedAt: Date | null;
  };
  team?: {
    id: number;
    name: string;
    subscriptionStatus: string | null;
    planName: string | null;
    stripeCustomerId: string | null;
    stripeSubscriptionId: string | null;
    stripeProductId: string | null;
  };
  user?: {
    id: number;
    name: string | null;
    email: string;
  };
  error?: string;
}

/**
 * Génère un token unique et sécurisé pour l'extension
 */
export function generateExtensionToken(): string {
  return `ext_${crypto.randomBytes(32).toString('hex')}`;
}

/**
 * Vérifie le token d'extension depuis le header de la requête
 */
export async function verifyExtensionToken(
  request: NextRequest
): Promise<ExtensionAuthResult> {
  const token = request.headers.get('x-extension-token');

  if (!token) {
    return {
      valid: false,
      error: 'Missing extension token',
    };
  }

  try {
    // Recherche du token dans la base de données
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
      return {
        valid: false,
        error: 'Invalid or revoked token',
      };
    }

    const tokenData = tokenResult[0];

    // Mise à jour de lastUsedAt
    await db
      .update(extensionTokens)
      .set({ lastUsedAt: new Date() })
      .where(eq(extensionTokens.id, tokenData.id));

    // Récupération des données de la team si disponible
    let team = null;
    if (tokenData.teamId) {
      const teamResult = await db
        .select({
          id: teams.id,
          name: teams.name,
          subscriptionStatus: teams.subscriptionStatus,
          planName: teams.planName,
          stripeCustomerId: teams.stripeCustomerId,
          stripeSubscriptionId: teams.stripeSubscriptionId,
          stripeProductId: teams.stripeProductId,
        })
        .from(teams)
        .where(eq(teams.id, tokenData.teamId))
        .limit(1);

      if (teamResult.length > 0) {
        team = teamResult[0];
      }
    }

    // Récupération des données de l'utilisateur si disponible
    let user = null;
    if (tokenData.userId) {
      const userResult = await db
        .select({
          id: users.id,
          name: users.name,
          email: users.email,
        })
        .from(users)
        .where(and(eq(users.id, tokenData.userId), isNull(users.deletedAt)))
        .limit(1);

      if (userResult.length > 0) {
        user = userResult[0];
      }
    }

    return {
      valid: true,
      tokenData,
      team: team || undefined,
      user: user || undefined,
    };
  } catch (error) {
    console.error('Extension token verification error:', error);
    return {
      valid: false,
      error: 'Token verification failed',
    };
  }
}

/**
 * Middleware pour protéger les routes d'extension
 */
export async function requireExtensionAuth(
  request: NextRequest
): Promise<ExtensionAuthResult> {
  return await verifyExtensionToken(request);
}
