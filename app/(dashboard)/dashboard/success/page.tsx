import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getUser, getTeamForUser } from '@/lib/db/queries';
import { stripe } from '@/lib/payments/stripe';
import SuccessPageClient from './success-client';

export default async function SuccessPage({
  searchParams
}: {
  searchParams: { session_id?: string }
}) {
  const sessionId = searchParams.session_id;

  // 1. Validation: session_id doit exister
  if (!sessionId) {
    redirect('/dashboard');
  }

  // 2. Vérifier l'utilisateur authentifié
  const user = await getUser();
  if (!user) {
    redirect('/sign-in');
  }

  try {
    // 3. Vérification Stripe: récupérer la session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // 4. Sécurité: vérifier que la session appartient à cet utilisateur
    if (session.client_reference_id !== user.id.toString()) {
      console.warn('Session does not belong to current user');
      redirect('/dashboard');
    }

    // 5. Cookie one-time display: vérifier si déjà affiché
    const cookieStore = await cookies();
    const successShown = cookieStore.get('success_shown');

    if (successShown?.value === sessionId) {
      // Déjà affiché, rediriger vers dashboard
      redirect('/dashboard');
    }

    // 6. Marquer comme affiché (cookie 24h)
    cookieStore.set('success_shown', sessionId, {
      maxAge: 60 * 60 * 24, // 24 heures
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    // 7. Fetch team data pour affichage
    const team = await getTeamForUser();
    const isTrial = team?.subscriptionStatus === 'trialing';

    // Calculer la date de fin d'essai (7 jours à partir de maintenant)
    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + 7);
    const formattedTrialEndDate = trialEndDate.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    return (
      <SuccessPageClient
        isTrial={isTrial}
        formattedTrialEndDate={formattedTrialEndDate}
      />
    );
  } catch (error) {
    console.error('Error validating checkout session:', error);
    redirect('/dashboard');
  }
}
