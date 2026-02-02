import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Paramètres Généraux – Profil MuslimGuard',
  description: 'Gérez vos informations de compte MuslimGuard : nom, email et préférences de profil.',
  openGraph: {
    title: 'Paramètres Généraux MuslimGuard',
    description: 'Modifiez vos informations personnelles et préférences de compte.',
    type: 'website',
    locale: 'fr_FR',
  },
};

export default function GeneralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
