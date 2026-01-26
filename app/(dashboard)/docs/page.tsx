import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BookOpen, Download, Settings, Sparkles, Code, AlertCircle, ArrowRight } from 'lucide-react';
import navigation from '@/content/config/docs-navigation.json';

const iconMap = {
  BookOpen,
  Download,
  Settings,
  Sparkles,
  Code,
  AlertCircle,
};

export default function DocsHomePage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Bienvenue dans la documentation MuslimGuard
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Découvrez comment installer, configurer et utiliser l'extension MuslimGuard pour
          protéger votre famille en ligne selon vos valeurs islamiques.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {navigation.sections.map((section) => {
          const Icon = iconMap[section.icon as keyof typeof iconMap] || BookOpen;
          const firstItem = section.items[0];

          return (
            <Link key={section.slug} href={`/docs/${firstItem.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-[#003463] dark:bg-blue-600 rounded-lg">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-[#003463] dark:group-hover:text-blue-400 transition-colors">
                      {section.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.items.slice(0, 4).map((item) => (
                      <li key={item.slug} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <ArrowRight className="w-3 h-3 flex-shrink-0" />
                        <span className="line-clamp-1">{item.title}</span>
                      </li>
                    ))}
                    {section.items.length > 4 && (
                      <li className="text-sm text-gray-500 dark:text-gray-500">
                        +{section.items.length - 4} autres...
                      </li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <Card className="bg-gradient-to-r from-[#003463] to-blue-700 text-white">
        <CardHeader>
          <CardTitle className="text-2xl">Démarrage rapide</CardTitle>
          <CardDescription className="text-blue-100">
            Installez et configurez MuslimGuard en moins de 5 minutes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            href="/docs/introduction/quick-start"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#003463] rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Commencer maintenant
            <ArrowRight className="w-4 h-4" />
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
