import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Journal d\'Activité – Historique MuslimGuard',
  description: 'Consultez l\'historique de toutes les actions effectuées sur votre compte MuslimGuard : connexions, modifications et activités de sécurité.',
  openGraph: {
    title: 'Journal d\'Activité MuslimGuard',
    description: 'Suivez l\'historique complet des activités de votre compte.',
    type: 'website',
    locale: 'fr_FR',
  },
};

export default function ActivityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
