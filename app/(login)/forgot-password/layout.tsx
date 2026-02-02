import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mot de Passe Oublié – Réinitialiser votre Accès MuslimGuard',
  description: 'Récupérez l\'accès à votre compte MuslimGuard. Entrez votre email et nous vous enverrons un lien de réinitialisation sécurisé.',
  openGraph: {
    title: 'Réinitialisation Mot de Passe MuslimGuard',
    description: 'Récupérez l\'accès à votre compte en quelques clics.',
    type: 'website',
    locale: 'fr_FR',
  },
};

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
