import HeroSection from '@/components/hero-section';
import FeaturesSection from '@/components/features-8';
import ContentSection from '@/components/content-2';
import TestimonialsSection from '@/components/testimonials';
import CallToAction from '@/components/call-to-action';
import FAQsThree from '@/components/faqs-3';
import FooterSection from '@/components/footer';
import ContentSectionOne from '@/components/content-1';
import type { Metadata } from 'next'
import Features from '@/components/features-3';

export const metadata: Metadata = {
  title: 'MuslimGuard – Le contrôle parental islamique intelligent',
  description:
    'MuslimGuard protège vos enfants en ligne, bloque les contenus inappropriés et met Internet en pause pendant les heures de prière selon votre ville.',
}


export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <Features />
      <FeaturesSection />
      <ContentSectionOne />
      <ContentSection />
      <TestimonialsSection />
      <CallToAction />
      <FAQsThree />
      <FooterSection />
    </main>
  );
}
