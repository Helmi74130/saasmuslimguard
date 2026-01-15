import { Button } from '@/components/ui/button';
import { ArrowRight, CreditCard, Database } from 'lucide-react';
import { Terminal } from './terminal';
import HeroSection from '@/components/hero-section';
import FeaturesSection from '@/components/features-8';
import ContentSection from '@/components/content-2';
import TestimonialsSection from '@/components/testimonials';
import CallToAction from '@/components/call-to-action';
import FAQsThree from '@/components/faqs-3';
import FooterSection from '@/components/footer';
import ContentSectionOne from '@/components/content-1';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
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
