import { Clock, MapPin } from 'lucide-react'
import Image from 'next/image'

export default function ContentSection() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                {/* Titre */}
                <h2 className="relative z-10 max-w-xl text-4xl font-medium lg:text-5xl">
                    La navigation s’adapte automatiquement aux heures de prière
                </h2>

                <div className="relative">
                    {/* Texte */}
                    <div className="relative z-10 space-y-4 md:w-1/2">
                        <p>
                            MuslimGuard met automatiquement Internet en pause pendant les heures de prière,
                            afin de préserver la concentration et les priorités essentielles.
                        </p>

                        <p>
                            Les horaires sont calculés en temps réel selon votre ville,
                            avec une mise à jour quotidienne pour une protection toujours alignée.
                        </p>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-3 pt-6 sm:gap-4">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Clock className="size-4" />
                                    <h3 className="text-sm font-medium">
                                        Blocage pendant les prières
                                    </h3>
                                </div>
                                <p className="text-muted-foreground text-sm">
                                    La navigation est automatiquement suspendue avant,
                                    pendant et après chaque prière.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <MapPin className="size-4" />
                                    <h3 className="text-sm font-medium">
                                        Horaires selon votre ville
                                    </h3>
                                </div>
                                <p className="text-muted-foreground text-sm">
                                    Les temps de prière sont calculés automatiquement
                                    en fonction de votre localisation.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="md:mask-l-from-35% md:mask-l-to-55% mt-12 h-fit md:absolute md:-inset-y-12 md:inset-x-0 md:mt-0">
                        <div className="border-border/50 relative rounded-2xl border border-dotted p-2">
                            <Image
                                src="/images/prayer-time-dashboard.png"
                                className="hidden rounded-[12px] dark:block"
                                alt="Blocage automatique pendant les heures de prière"
                                width={1007}
                                height={929}
                                priority
                            />
                            <Image
                                src="/images/prayer-time-dashboard.png"
                                className="rounded-[12px] shadow dark:hidden"
                                alt="Blocage automatique pendant les heures de prière"
                                width={1007}
                                height={929}
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
