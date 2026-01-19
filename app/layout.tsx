import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { getUser, getTeamForUser } from '@/lib/db/queries';
import { SWRConfig } from 'swr';

export const metadata: Metadata = {
  title: 'MuslimGuard – Contrôle Parental Islamique Intelligent | Protection Famille',
  description: 'MuslimGuard protège vos enfants en ligne avec un contrôle parental intelligent. Bloquez automatiquement les contenus inappropriés et mettez Internet en pause pendant les heures de prière. Essai gratuit.',
  keywords: 'contrôle parental islamique, protection enfants musulmans, filtre internet halal, blocage contenus haram, mode prière automatique, sécurité internet famille musulmane',
  openGraph: {
    title: 'MuslimGuard – Le contrôle parental islamique intelligent',
    description: 'Protégez vos enfants en ligne avec MuslimGuard : blocage automatique de contenus inappropriés et pause internet pendant la prière.',
    type: 'website',
    locale: 'fr_FR',
  },
};

export const viewport: Viewport = {
  maximumScale: 1
};

const manrope = Manrope({ subsets: ['latin'] });

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`bg-white dark:bg-gray-950 text-black dark:text-white ${manrope.className}`}
    >
      <body className="min-h-[100dvh] bg-gray-50">
        <SWRConfig
          value={{
            fallback: {
              // We do NOT await here
              // Only components that read this data will suspend
              '/api/user': getUser(),
              '/api/team': getTeamForUser()
            }
          }}
        >
          {children}
        </SWRConfig>
      </body>
    </html>
  );
}
