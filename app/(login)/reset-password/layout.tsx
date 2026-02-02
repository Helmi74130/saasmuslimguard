import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nouveau Mot de Passe – Réinitialisez votre Accès MuslimGuard',
  description: 'Créez un nouveau mot de passe sécurisé pour votre compte MuslimGuard et retrouvez l\'accès à votre contrôle parental islamique.',
  openGraph: {
    title: 'Réinitialisation Mot de Passe MuslimGuard',
    description: 'Créez un nouveau mot de passe pour votre compte.',
    type: 'website',
    locale: 'fr_FR',
  },
};

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
