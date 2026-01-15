'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import Link from 'next/link'

type FAQItem = {
    id: string
    icon: IconName
    question: string
    answer: string
}

export default function FAQsThree() {
    const faqItems: FAQItem[] = [
        {
            id: 'item-1',
            icon: 'shield-check',
            question: 'MuslimGuard remplace-t-il le rôle des parents ?',
            answer: "Non, et il ne le prétend pas. MuslimGuard est un outil d’aide, pas un substitut à l’éducation, au dialogue et à l’accompagnement parental.",
        },
        {
            id: 'item-2',
            icon: 'heart',
            question: "Puis-je autoriser certains sites malgré le blocage ?",
            answer: "Oui. Vous pouvez :autoriser des sites éducatifs ou islamiques créer des exceptions temporaires ajuster le niveau de protection selon l’âge de l’enfant Vous gardez toujours le contrôle.",
        },
        {
            id: 'item-3',
            icon: 'ban',
            question: 'Quels types de contenus sont bloqués ?',
            answer: "Muslim Guard bloque les contenus inappropriés selon les valeurs islamiques : pornographie, violence excessive, jeux d'argent, sites de rencontres, contenus blasphématoires, et propagande extrémiste. Vous pouvez personnaliser les filtres selon l'âge de votre enfant et ajouter des sites spécifiques à bloquer ou autoriser.",
        },
        {
            id: 'item-4',
            icon: 'clock',
            question: "Puis-je limiter le temps d'écran de mon enfant ?",
            answer: "Oui, Muslim Guard inclut une gestion complète du temps d'écran. Vous pouvez définir des plages horaires d'utilisation, bloquer l'accès pendant les heures de prière ou de devoirs, et fixer des limites quotidiennes. Des rappels pour la salat peuvent également être activés sur l'appareil de votre enfant.",
        },
        {
            id: 'item-5',
            icon: 'smartphone',
            question: 'Sur quels appareils fonctionne Muslim Guard ?',
            answer: "MuslimGuard est actuellement disponible comme extension de navigateur, ce qui signifie qu’il fonctionne sur les appareils où vous pouvez installer cette extension. Concrètement, cela inclut normalement : Ordinateurs de bureau et laptops (Windows, macOS, Linux) via Google Chrome et navigateurs basés sur Chromium (Edge, Brave, Opera…)",
        },
        {
            id: 'item-6',
            icon: 'lock',
            question: 'Mon enfant peut-il désactiver MuslimGuard ?',
            answer: "Non. Les paramètres sont protégés par un code parental. Sans ce code, il est impossible de modifier ou désactiver la protection.",
        },
        {
            id: 'item-7',
            icon: 'message-circle',
            question: 'Les réseaux sociaux et messageries sont-ils surveillés ?',
            answer: "Vous pouvez choisir de bloquer certaines applications (TikTok, Snapchat, etc.). Pour les enfants plus âgés, Muslim Guard peut détecter les contenus préoccupants dirrectement dans la page.",
        },
        {
            id: 'item-8',
            icon: 'database-zap',
            question: "Mes données et celles de mes enfants sont-elles en sécurité ?",
            answer: "Oui. Toutes les données restent localement sur l’appareil. MuslimGuard ne collecte, ne vend et ne partage aucune donnée personnelle. Aucun compte obligatoire, aucun serveur externe.",
        },
    ]

    return (
        <section className="bg-muted dark:bg-background py-20">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
                <div className="flex flex-col gap-10 md:flex-row md:gap-16">
                    <div className="md:w-1/3">
                        <div className="sticky top-20">
                            <h2 className="mt-4 text-3xl font-bold">Questions Fréquentes</h2>
                            <p className="text-muted-foreground mt-4">
                                Vous ne trouvez pas la réponse à votre question ? Contactez notre{' '}
                                <Link
                                    href="#"
                                    className="text-primary font-medium hover:underline">
                                    équipe de support
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className="md:w-2/3">
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full space-y-2">
                            {faqItems.map((item) => (
                                <AccordionItem
                                    key={item.id}
                                    value={item.id}
                                    className="bg-background shadow-xs rounded-lg border px-4 last:border-b">
                                    <AccordionTrigger className="cursor-pointer items-center py-5 hover:no-underline">
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-6">
                                                <DynamicIcon
                                                    name={item.icon}
                                                    className="m-auto size-4"
                                                />
                                            </div>
                                            <span className="text-base">{item.question}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-5">
                                        <div className="px-9">
                                            <p className="text-base">{item.answer}</p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    )
}
