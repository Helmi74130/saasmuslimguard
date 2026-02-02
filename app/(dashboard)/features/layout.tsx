import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fonctionnalités MuslimGuard – Contrôle Parental Intelligent pour Familles Musulmanes',
  description: 'Découvrez les 6 fonctionnalités puissantes de MuslimGuard : blocage personnalisé, détection de mots-clés, pause prière automatique, protection locale, plages horaires et appareils illimités.',
  keywords: 'fonctionnalités contrôle parental islamique, blocage personnalisé, détection mots-clés, mode prière automatique, protection locale, plages horaires internet, appareils illimités',
  openGraph: {
    title: 'Fonctionnalités MuslimGuard – Protection Famille Musulmane',
    description: 'Blocage intelligent, pause prière automatique, protection locale et plus encore pour protéger votre famille en ligne.',
    type: 'website',
    locale: 'fr_FR',
  },
};

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
