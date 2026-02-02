import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Paiement Réussi – Bienvenue chez MuslimGuard Premium',
  description: 'Votre abonnement MuslimGuard Premium a été activé avec succès. Profitez de toutes les fonctionnalités pour protéger votre famille en ligne.',
  openGraph: {
    title: 'Paiement Réussi – MuslimGuard',
    description: 'Bienvenue dans MuslimGuard Premium ! Votre famille est maintenant protégée.',
    type: 'website',
    locale: 'fr_FR',
  },
};

export default function SuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
