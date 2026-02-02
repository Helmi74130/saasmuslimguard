import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connexion MuslimGuard – Accédez à votre Compte de Contrôle Parental',
  description: 'Connectez-vous à votre compte MuslimGuard pour gérer la protection en ligne de votre famille. Contrôle parental islamique intelligent et personnalisable.',
  openGraph: {
    title: 'Connexion MuslimGuard',
    description: 'Accédez à votre tableau de bord MuslimGuard pour protéger votre famille en ligne.',
    type: 'website',
    locale: 'fr_FR',
  },
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
