import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Paramètres de Sécurité – Mot de Passe MuslimGuard',
  description: 'Gérez la sécurité de votre compte MuslimGuard : changez votre mot de passe ou supprimez votre compte.',
  openGraph: {
    title: 'Sécurité MuslimGuard',
    description: 'Protégez votre compte avec des paramètres de sécurité renforcés.',
    type: 'website',
    locale: 'fr_FR',
  },
};

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
