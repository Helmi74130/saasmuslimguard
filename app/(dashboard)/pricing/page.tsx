import { checkoutAction } from '@/lib/payments/actions';
import { Check } from 'lucide-react';
import { getStripePrices, getStripeProducts } from '@/lib/payments/stripe';
import { SubmitButton } from './submit-button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tarifs MuslimGuard – Plans Gratuit & Premium | Contrôle Parental Islamique',
  description: 'Découvrez les tarifs de MuslimGuard : plan gratuit avec fonctionnalités essentielles ou Premium pour une protection complète. Essai gratuit de 7 jours, annulation à tout moment.',
  keywords: 'tarifs contrôle parental islamique, prix muslimguard, abonnement protection famille musulmane, plan gratuit filtre internet halal',
  openGraph: {
    title: 'Tarifs MuslimGuard – Protection Famille dès 0€',
    description: 'Plan gratuit ou Premium à partir de 4,99€/mois. Essai gratuit de 7 jours, sans engagement.',
    type: 'website',
    locale: 'fr_FR',
  },
};

// Prices are fresh for one hour max
export const revalidate = 3600;

export default async function PricingPage() {
  const [prices, products] = await Promise.all([
    getStripePrices(),
    getStripeProducts(),
  ]);

  const premiumPlan = products.find((product) => product.name === 'MuslimGuard Premium');

  // Récupère les 2 prix (mensuel et annuel)
  const monthlyPrice = prices.find(
    (price) => price.productId === premiumPlan?.id && price.interval === 'month'
  );
  const yearlyPrice = prices.find(
    (price) => price.productId === premiumPlan?.id && price.interval === 'year'
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Débloquez le Potentiel Complet de MuslimGuard
        </h1>
        <p className="text-xl text-gray-600">
          Protégez votre famille en ligne avec toutes les fonctionnalités avancées
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Plan Free */}
        <PricingCard
          name="Gratuit"
          price={0}
          interval="month"
          trialDays={0}
          features={[
            '5 domaines à bloquer',
            '2 catégories activables',
            'Mode prière manuel',
            'Historique 50 blocages',
            '1 mode protection',
          ]}
          priceId={null}
          isFree={true}
        />

        {/* Plan Premium Monthly */}
        <PricingCard
          name={premiumPlan?.name || 'Premium'}
          description="Mensuel"
          price={monthlyPrice?.unitAmount || 499}
          interval={monthlyPrice?.interval || 'month'}
          trialDays={monthlyPrice?.trialPeriodDays || 7}
          features={[
            'Domaines/mots-clés illimités',
            'Toutes 15+ catégories',
            'Mode prière automatique',
            'Historique 1000 blocages',
            '3 modes protection',
            'Whitelist temporaire',
            'Support prioritaire',
          ]}
          priceId={monthlyPrice?.id}
          highlighted={false}
        />

        {/* Plan Premium Yearly */}
        <PricingCard
          name={premiumPlan?.name || 'Premium'}
          description="Annuel (Économisez 33%)"
          price={yearlyPrice?.unitAmount || 3999}
          interval={yearlyPrice?.interval || 'year'}
          trialDays={yearlyPrice?.trialPeriodDays || 7}
          features={[
            'Domaines/mots-clés illimités',
            'Toutes 15+ catégories',
            'Mode prière automatique',
            'Historique 1000 blocages',
            '3 modes protection',
            'Whitelist temporaire',
            'Support prioritaire',
          ]}
          priceId={yearlyPrice?.id}
          highlighted={true}
        />
      </div>
    </main>
  );
}

function PricingCard({
  name,
  description,
  price,
  interval,
  trialDays,
  features,
  priceId,
  isFree = false,
  highlighted = false,
}: {
  name: string;
  description?: string;
  price: number;
  interval: string;
  trialDays: number;
  features: string[];
  priceId?: string | null;
  isFree?: boolean;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`pt-6 rounded-lg p-6 ${highlighted
          ? 'border-2 border-[#003463] bg-[#003463]/5 shadow-lg'
          : 'border border-gray-200'
        }`}
    >
      {highlighted && (
        <div className="bg-[#003463] text-white text-sm font-bold py-1 px-3 rounded-full inline-block mb-4">
          Meilleure Offre
        </div>
      )}
      <h2 className="text-2xl font-bold text-gray-900 mb-1">{name}</h2>
      {description && (
        <p className="text-sm text-gray-600 mb-4">{description}</p>
      )}

      <p className="text-4xl font-bold text-gray-900 mb-2">
        {isFree ? 'Gratuit' : `€${(price / 100).toFixed(2)}`}
      </p>

      {!isFree && (
        <p className="text-sm text-gray-600 mb-4">
          par {interval === 'month' ? 'mois' : 'an'}
        </p>
      )}

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-[#003463] mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      {isFree ? (
        <button
          className="w-full bg-[#003463]/10 text-[#003463] py-2 px-4 rounded-full font-semibold hover:bg-[#003463]/20 transition-colors"
        >
          Essayer maintenant
        </button>
      ) : (
        <form action={checkoutAction}>
          <input type="hidden" name="priceId" value={priceId || ''} />
          <SubmitButton />
        </form>
      )}
    </div>
  );
}
