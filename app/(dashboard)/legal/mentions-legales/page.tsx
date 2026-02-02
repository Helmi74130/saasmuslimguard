import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions Légales - MuslimGuard',
  description: 'Mentions légales de MuslimGuard',
};

export default function MentionsLegalesPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold text-[#003463] dark:text-white mb-8">
        Mentions Légales
      </h1>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#003463] dark:text-white mb-4">
            1. Informations légales
          </h2>
          <div className="text-gray-700 dark:text-gray-300 space-y-3">
            <p>
              <strong>Raison sociale :</strong> MuslimGuard
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#003463] dark:text-white mb-4">
            2. Hébergement
          </h2>
          <div className="text-gray-700 dark:text-gray-300 space-y-3">
            <p>
              Ce site est hébergé par :
            </p>
            <p>
              <strong>Nom de l'hébergeur :</strong> Vercel Inc.
            </p>
            <p>
              <strong>Adresse :</strong>  340 S Lemon Ave #4133, Walnut, CA 91789, USA
            </p>
            <p>
              <strong>Site web:</strong> https://vercel.com
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#003463] dark:text-white mb-4">
            3. Propriété intellectuelle
          </h2>
          <div className="text-gray-700 dark:text-gray-300 space-y-3">
            <p>
              L'ensemble du contenu de ce site (textes, images, vidéos, logos, icônes, etc.)
              est la propriété exclusive de MuslimGuard, sauf mention contraire.
            </p>
            <p>
              Toute reproduction, distribution, modification, adaptation, retransmission ou
              publication de ces différents éléments est strictement interdite sans l'accord
              exprès par écrit de MuslimGuard.
            </p>
            <p>
              Cette représentation ou reproduction, par quelque procédé que ce soit, constitue
              une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la
              propriété intellectuelle.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#003463] dark:text-white mb-4">
            4. Limitation de responsabilité
          </h2>
          <div className="text-gray-700 dark:text-gray-300 space-y-3">
            <p>
              MuslimGuard s'efforce d'assurer au mieux de ses possibilités, l'exactitude et
              la mise à jour des informations diffusées sur ce site, dont elle se réserve le
              droit de corriger, à tout moment et sans préavis, le contenu.
            </p>
            <p>
              Toutefois, MuslimGuard ne peut garantir l'exactitude, la précision ou
              l'exhaustivité des informations mises à disposition sur ce site.
            </p>
            <p>
              En conséquence, l'utilisateur reconnaît utiliser ces informations sous sa
              responsabilité exclusive.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#003463] dark:text-white mb-4">
            5. Liens hypertextes
          </h2>
          <div className="text-gray-700 dark:text-gray-300 space-y-3">
            <p>
              Le site peut contenir des liens hypertextes vers d'autres sites. MuslimGuard
              n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à
              leur contenu.
            </p>
            <p>
              La mise en place de liens hypertextes vers le site MuslimGuard nécessite une
              autorisation préalable écrite.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#003463] dark:text-white mb-4">
            6. Droit applicable
          </h2>
          <div className="text-gray-700 dark:text-gray-300 space-y-3">
            <p>
              Les présentes mentions légales sont régies par le droit français. En cas de
              litige et à défaut d'accord amiable, le litige sera porté devant les tribunaux
              français conformément aux règles de compétence en vigueur.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#003463] dark:text-white mb-4">
            7. Contact
          </h2>
          <div className="text-gray-700 dark:text-gray-300 space-y-3">
            <p>
              Pour toute question concernant ces mentions légales, vous pouvez nous contacter :
            </p>
            <p>
              <strong>Email :</strong> contact@muslimguard.com
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
