'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import { HelpCircle, MessageCircle, ArrowRight } from 'lucide-react'
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
            answer: "Non, et il ne le prétend pas. MuslimGuard est un outil d'aide, pas un substitut à l'éducation, au dialogue et à l'accompagnement parental.",
        },
        {
            id: 'item-2',
            icon: 'heart',
            question: "Puis-je autoriser certains sites malgré le blocage ?",
            answer: "Oui. Vous pouvez : autoriser des sites éducatifs ou islamiques, créer des exceptions temporaires, ajuster le niveau de protection selon l'âge de l'enfant. Vous gardez toujours le contrôle.",
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
            answer: "MuslimGuard est actuellement disponible comme extension de navigateur, ce qui signifie qu'il fonctionne sur les appareils où vous pouvez installer cette extension. Concrètement, cela inclut : Ordinateurs de bureau et laptops (Windows, macOS, Linux) via Google Chrome et navigateurs basés sur Chromium (Edge, Brave, Opera…)",
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
            answer: "Vous pouvez choisir de bloquer certaines applications (TikTok, Snapchat, etc.). Pour les enfants plus âgés, Muslim Guard peut détecter les contenus préoccupants directement dans la page.",
        },
        {
            id: 'item-8',
            icon: 'database-zap',
            question: "Mes données et celles de mes enfants sont-elles en sécurité ?",
            answer: "Oui. Toutes les données restent localement sur l'appareil. MuslimGuard ne collecte, ne vend et ne partage aucune donnée personnelle. Aucun compte obligatoire, aucun serveur externe.",
        },
    ]

    return (
        <section className="relative py-20 md:py-28 overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#003463]/5 blur-3xl -translate-y-1/2 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#003463]/5 blur-3xl translate-y-1/2 -translate-x-1/4" />
            </div>

            <div className="relative mx-auto max-w-5xl px-4 md:px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#003463]/10 px-4 py-2 text-sm font-medium text-[#003463] mb-6">
                        <HelpCircle className="h-4 w-4" />
                        <span>FAQ</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#003463]">
                        Questions Fréquentes
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Tout ce que vous devez savoir sur MuslimGuard pour protéger votre famille en ligne
                    </p>
                </div>

                {/* FAQ Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                    {faqItems.map((item) => (
                        <Accordion
                            key={item.id}
                            type="single"
                            collapsible
                            className="w-full">
                            <AccordionItem
                                value={item.id}
                                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 px-6 shadow-sm hover:shadow-md transition-shadow duration-300 data-[state=open]:shadow-lg data-[state=open]:border-[#003463]/20">
                                <AccordionTrigger className="cursor-pointer py-5 hover:no-underline group">
                                    <div className="flex items-center gap-4 text-left">
                                        <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-[#003463]/10 text-[#003463] group-data-[state=open]:bg-[#003463] group-data-[state=open]:text-white transition-colors duration-300">
                                            <DynamicIcon
                                                name={item.icon}
                                                className="h-5 w-5"
                                            />
                                        </div>
                                        <span className="text-base font-medium text-gray-900 dark:text-white pr-4">
                                            {item.question}
                                        </span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pb-5">
                                    <div className="pl-14 pr-4">
                                        <p className="text-muted-foreground leading-relaxed">
                                            {item.answer}
                                        </p>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="mt-16 text-center">
                    <div className="inline-flex flex-col sm:flex-row items-center gap-4 rounded-2xl bg-[#003463]/5 border border-[#003463]/10 p-6 sm:p-8">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#003463] text-white">
                            <MessageCircle className="h-6 w-6" />
                        </div>
                        <div className="text-center sm:text-left">
                            <p className="font-semibold text-gray-900 dark:text-white">
                                Vous avez d'autres questions ?
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Notre équipe est là pour vous aider
                            </p>
                        </div>
                        <Link
                            href="mailto:contact@muslimguard.com"
                            className="inline-flex items-center gap-2 rounded-full bg-[#003463] px-6 py-3 text-sm font-medium text-white hover:bg-[#003463]/90 transition-colors"
                        >
                            <span>Nous contacter</span>
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
