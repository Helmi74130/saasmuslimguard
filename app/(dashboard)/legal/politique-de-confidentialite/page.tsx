import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité - MuslimGuard',
  description: 'Politique de confidentialité et protection des données personnelles de MuslimGuard',
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold text-[#003463] dark:text-white mb-8">
        Politique de Confidentialité
      </h1>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <div className="text-gray-700 dark:text-gray-300 mb-8">
          <p className="text-lg">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#003463] dark:text-white mb-4">
            1. Introduction
          </h2>
          <div className="text-gray-700 dark:text-gray-300 space-y-3">
            <p>
              MuslimGuard s'engage à protéger la confidentialité et la sécurité de vos données
              personnelles. Cette politique de confidentialité décrit comment nous collectons,
              utilisons, stockons et protégeons vos informations conformément au Règlement
              Général sur la Protection des Données (RGPD).
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#003463] dark:text-white mb-4">
            2. Données collectées
          </h2>
          <div className="text-gray-700 dark:text-gray-300 space-y-3">
            <p>
              Nous collectons les types de données suivants :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Données d'identification :</strong> nom, prénom, adresse email
              </li>
              <li>
                <strong>Données de connexion :</strong> adresse IP, données de navigation,
                cookies
              </li>
              <li>
                <strong>Données de paiement :</strong> informations de facturation (traitées
                de manière sécurisée par notre prestataire Stripe)
              </li>
              <li>
                <strong>Données d'utilisation :</strong> préférences de filtrage, statistiques
                d'utilisation de l'extension
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#003463] dark:text-white mb-4">
            3. Finalités du traitement
          </h2>
          <div className="text-gray-700 dark:text-gray-300 space-y-3">
            <p>
              Vos données personnelles sont utilisées pour :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Créer et gérer votre compte utilisateur</li>
              <li>Fournir et améliorer nos services de filtrage de contenu</li>
              <li>Traiter vos paiements et gérer votre abonnement</li>
              <li>Vous envoyer des communications relatives au service</li>
              <li>Assurer la sécurité et prévenir la fraude</li>
              <li>Analyser l'utilisation du service pour l'améliorer</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#003463] dark:text-white mb-4">
            4. Base légale du traitement
          </h2>
          <div className="text-gray-700 dark:text-gray-300 space-y-3">
            <p>
              Le traitement de vos données personnelles repose sur :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>L'exécution du contrat :</strong> pour fournir le service auquel vous
                avez souscrit
              </li>
              <li>
                <strong>Votre consentement :</strong> pour les cookies et communications
                marketing (retirable à tout moment)
              </li>
              <li>
                <strong>Nos intérêts légitimes :</strong> pour améliorer nos services et
                assurer la sécurité
              </li>
              <li>
                <strong>Obligations légales :</strong> pour respecter la réglementation en
                vigueur
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#003463] dark:text-white mb-4">
            5. Partage des données
          </h2>
          <div className="text-gray-700 dark:text-gray-300 space-y-3">
            <p>
              Nous ne vendons jamais vos données personnelles. Nous pouvons partager vos
              données avec :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Prestataires de services :</strong> Stripe (paiements), hébergeurs
                web, services d'analyse
              </li>
              <li>
                <strong>Autorités légales :</strong> si requis par la loi ou pour protéger
                nos droits
              </li>
            </ul>
            <p>
              Tous nos prestataires sont contractuellement tenus de respecter la
              confidentialité et la sécurité de vos données.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#003463] dark:text-white mb-4">
            6. Conservation des données
          </h2>
          <div className="text-gray-700 dark:text-gray-300 space-y-3">
            <p>
              Nous conservons vos données personnelles pendant la durée nécessaire aux
              finalités pour lesquelles elles ont été collectées :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Compte actif :</strong> pendant toute la durée de votre abonnement
              </li>
              <li>
                <strong>Après résiliation :</strong> jusqu'à 3 ans pour les obligations
                légales et comptables
              </li>
              <li>
                <strong>Données de facturation :</strong> 10 ans conformément aux obligations
                fiscales
              </li>
            </ul>
            <p>
              À l'issue de ces périodes, vos données sont supprimées ou anonymisées.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#003463] dark:text-white mb-4">
            7. Sécurité des données
          </h2>
          <div className="text-gray-700 dark:text-gray-300 space-y-3">
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées
              pour protéger vos données :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Chiffrement des données en transit (HTTPS/SSL)</li>
              <li>Chiffrement des données sensibles au repos</li>
              <li>Authentification sécurisée avec JWT</li>
              <li>Contrôles d'accès stricts</li>
              <li>Surveillance et détection des intrusions</li>
              <li>Sauvegardes régulières</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#003463] dark:text-white mb-4">
            8. Vos droits
          </h2>
          <div className="text-gray-700 dark:text-gray-300 space-y-3">
            <p>
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Droit d'accès :</strong> obtenir une copie de vos données personnelles
              </li>
              <li>
                <strong>Droit de rectification :</strong> corriger vos données inexactes ou
                incomplètes
              </li>
              <li>
                <strong>Droit à l'effacement :</strong> demander la suppression de vos données
              </li>
              <li>
                <strong>Droit à la limitation :</strong> limiter le traitement de vos données
              </li>
              <li>
                <strong>Droit à la portabilité :</strong> recevoir vos données dans un format
                structuré
              </li>
              <li>
                <strong>Droit d'opposition :</strong> vous opposer au traitement de vos
                données
              </li>
              <li>
                <strong>Droit de retirer votre consentement :</strong> à tout moment
              </li>
            </ul>
            <p>
              Pour exercer ces droits, contactez-nous à : <strong>contact@muslimguard.com</strong>
            </p>
            <p>
              Vous avez également le droit d'introduire une réclamation auprès de la CNIL
              (Commission Nationale de l'Informatique et des Libertés).
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#003463] dark:text-white mb-4">
            9. Cookies
          </h2>
          <div className="text-gray-700 dark:text-gray-300 space-y-3">
            <p>
              Notre site utilise des cookies pour :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Cookies essentiels :</strong> nécessaires au fonctionnement du site
                (session, authentification)
              </li>
              <li>
                <strong>Cookies analytiques :</strong> pour comprendre l'utilisation du site
                et l'améliorer
              </li>
            </ul>
            <p>
              Vous pouvez gérer vos préférences de cookies via les paramètres de votre
              navigateur.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#003463] dark:text-white mb-4">
            10. Transferts internationaux
          </h2>
          <div className="text-gray-700 dark:text-gray-300 space-y-3">
            <p>
              Vos données sont hébergées au sein de l'Union Européenne. Si des transferts hors
              UE sont nécessaires, nous nous assurons que des garanties appropriées sont en
              place (clauses contractuelles types, décision d'adéquation).
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#003463] dark:text-white mb-4">
            11. Mineurs
          </h2>
          <div className="text-gray-700 dark:text-gray-300 space-y-3">
            <p>
              Nos services sont destinés aux personnes de 18 ans et plus. Pour les mineurs de
              15 à 18 ans, le consentement d'un titulaire de l'autorité parentale est requis.
              Nous ne collectons pas sciemment de données auprès d'enfants de moins de 15 ans.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#003463] dark:text-white mb-4">
            12. Modifications
          </h2>
          <div className="text-gray-700 dark:text-gray-300 space-y-3">
            <p>
              Nous nous réservons le droit de modifier cette politique de confidentialité à
              tout moment. Les modifications importantes vous seront notifiées par email ou
              via un avis sur le site.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#003463] dark:text-white mb-4">
            13. Contact
          </h2>
          <div className="text-gray-700 dark:text-gray-300 space-y-3">
            <p>
              Pour toute question concernant cette politique de confidentialité ou le
              traitement de vos données personnelles :
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
