'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { CheckCircle, Chrome, ExternalLink, ArrowRight, Copy } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const CHROME_EXTENSION_URL =
  'https://chromewebstore.google.com/detail/muslimguard-contr%C3%B4le-pare/khilbklefblhhcombalbofjjliplfdnp';

interface SuccessPageClientProps {
  isTrial: boolean;
  formattedTrialEndDate: string;
}

export default function SuccessPageClient({
  isTrial,
  formattedTrialEndDate
}: SuccessPageClientProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(CHROME_EXTENSION_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="flex-1 p-4 lg:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Success Banner */}
        <Card className="mb-8 border-green-500 bg-green-50 dark:bg-green-950">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              <div>
                <CardTitle className="text-green-800 dark:text-green-100">
                  Félicitations ! Votre abonnement Premium est activé
                </CardTitle>
                <CardDescription className="text-green-700 dark:text-green-200">
                  {isTrial
                    ? `Période d'essai de 7 jours - Aucune facturation avant le ${formattedTrialEndDate}`
                    : 'Votre abonnement Premium est maintenant actif'}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Chrome Extension Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Chrome className="mr-2 h-6 w-6" />
              Étape 1 : Installez l'extension Chrome
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Pour commencer à protéger votre famille en ligne, installez notre
              extension Chrome MuslimGuard. L'extension vous permettra de
              filtrer les contenus inappropriés et de garantir une navigation
              sécurisée.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="bg-[#003463] hover:bg-[#003463]/90 text-white"
              >
                <a
                  href={CHROME_EXTENSION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Chrome className="mr-2 h-5 w-5" />
                  Installer MuslimGuard pour Chrome
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" onClick={handleCopyLink}>
                <Copy className="mr-2 h-4 w-4" />
                {copied ? 'Copié !' : 'Copier le lien'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle>Prochaines étapes</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3 list-decimal list-inside">
              <li className="text-muted-foreground">
                <span className="font-medium text-foreground">
                  Installez l'extension Chrome
                </span>{' '}
                depuis le Chrome Web Store
              </li>
              <li className="text-muted-foreground">
                <span className="font-medium text-foreground">
                  Connectez-vous à votre compte MuslimGuard
                </span>{' '}
                dans l'extension
              </li>
              <li className="text-muted-foreground">
                <span className="font-medium text-foreground">
                  Configurez vos préférences de protection
                </span>{' '}
                selon vos besoins
              </li>
              <li className="text-muted-foreground">
                <span className="font-medium text-foreground">
                  Invitez les membres de votre famille
                </span>{' '}
                depuis votre tableau de bord
              </li>
            </ol>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/dashboard">
                Aller au tableau de bord
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
