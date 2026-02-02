import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Créer un Compte MuslimGuard – Contrôle Parental Islamique Gratuit',
  description: 'Créez votre compte MuslimGuard gratuit et commencez à protéger votre famille en ligne dès aujourd\'hui. Installation rapide, essai gratuit, aucune carte bancaire requise.',
  keywords: 'inscription muslimguard, créer compte contrôle parental islamique, essai gratuit protection famille musulmane',
  openGraph: {
    title: 'Inscription MuslimGuard – Essai Gratuit',
    description: 'Créez votre compte gratuit et protégez votre famille en ligne en quelques minutes.',
    type: 'website',
    locale: 'fr_FR',
  },
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
