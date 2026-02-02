import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact MuslimGuard – Posez vos Questions sur le Contrôle Parental Islamique',
  description: 'Contactez l\'équipe MuslimGuard pour toute question sur notre contrôle parental islamique. Nous répondons dans les plus brefs délais à contact@muslim-guard.com',
  keywords: 'contact muslimguard, support contrôle parental islamique, aide protection famille musulmane, service client muslimguard',
  openGraph: {
    title: 'Contactez MuslimGuard – Support & Questions',
    description: 'Une question sur MuslimGuard ? Contactez-nous et nous vous répondrons rapidement.',
    type: 'website',
    locale: 'fr_FR',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
