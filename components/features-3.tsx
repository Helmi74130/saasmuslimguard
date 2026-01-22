import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ShieldBan, Brain, Moon, Lock, BarChart3, Users } from 'lucide-react'
import { ReactNode } from 'react'

export default function Features() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-100/80 via-white to-blue-50/60 py-16 md:py-32 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            {/* Decorative background elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute left-1/4 top-20 h-[500px] w-[500px] rounded-full bg-[#0C3E6A]/15 blur-3xl" />
                <div className="absolute right-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-blue-200/25 blur-3xl" />
            </div>

            <div className="@container relative mx-auto max-w-7xl px-6">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl text-[#0C3E6A]">Une protection complète pour vos enfants</h2>
                    <p className="mt-4">MuslimGuard offre une protection intelligente et respectueuse des valeurs islamiques</p>
                </div>
                <div className="mx-auto mt-8 grid max-w-sm gap-6 md:mt-16 md:max-w-none md:grid-cols-2 lg:grid-cols-3">
                    <Card className="group overflow-hidden shadow-zinc-950/5 border border-[#0C3E6A]/10 hover:border-[#0C3E6A]/20 transition-colors">
                        <CardHeader className="pb-3 text-center">
                            <CardDecorator color="#0C3E6A">
                                <ShieldBan
                                    className="size-10 text-[#0C3E6A]"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-semibold">Blocage des contenus inappropriés</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="text-sm">Empêche l'accès aux sites et contenus contraires aux valeurs islamiques avant même qu'ils ne s'affichent.</p>
                        </CardContent>
                    </Card>

                    <Card className="group overflow-hidden shadow-zinc-950/5 border border-purple-400/10 hover:border-purple-400/20 transition-colors">
                        <CardHeader className="pb-3 text-center">
                            <CardDecorator color="#a855f7">
                                <Brain
                                    className="size-10 text-purple-500"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-semibold">Détection intelligente en temps réel</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="text-sm">Analyse les pages visitées et bloque automatiquement les contenus sensibles, même sur des sites non listés.</p>
                        </CardContent>
                    </Card>

                    <Card className="group overflow-hidden shadow-zinc-950/5 border border-amber-400/10 hover:border-amber-400/20 transition-colors">
                        <CardHeader className="pb-3 text-center">
                            <CardDecorator color="#f59e0b">
                                <Moon
                                    className="size-10 text-amber-500"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-semibold">Pause automatique pendant les prières</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="text-sm">Internet se met en pause pendant les heures de prière, selon votre ville, pour préserver la concentration et le respect des obligations religieuses.</p>
                        </CardContent>
                    </Card>

                    <Card className="group overflow-hidden shadow-zinc-950/5 border border-rose-400/10 hover:border-rose-400/20 transition-colors">
                        <CardHeader className="pb-3 text-center">
                            <CardDecorator color="#f43f5e">
                                <Lock
                                    className="size-10 text-rose-500"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-semibold">Protection impossible à désactiver</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="text-sm">Les paramètres sont sécurisés par un code parental. L'enfant ne peut ni désactiver ni contourner la protection.</p>
                        </CardContent>
                    </Card>

                    <Card className="group overflow-hidden shadow-zinc-950/5 border border-teal-400/10 hover:border-teal-400/20 transition-colors">
                        <CardHeader className="pb-3 text-center">
                            <CardDecorator color="#14b8a6">
                                <BarChart3
                                    className="size-10 text-teal-500"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-semibold">Suivi clair de l'activité</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="text-sm">Consultez les tentatives de blocage et l'activité de navigation depuis un tableau de bord simple et lisible.</p>
                        </CardContent>
                    </Card>

                    <Card className="group overflow-hidden shadow-zinc-950/5 border border-indigo-400/10 hover:border-indigo-400/20 transition-colors">
                        <CardHeader className="pb-3 text-center">
                            <CardDecorator color="#6366f1">
                                <Users
                                    className="size-10 text-indigo-500"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-semibold">Gestion adaptée aux familles</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="text-sm">Protégez plusieurs enfants et appareils avec un seul compte, sans configuration complexe.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

const CardDecorator = ({ children, color = '#0C3E6A' }: { children: ReactNode; color?: string }) => (
    <div className="mask-radial-from-40% mask-radial-to-60% relative mx-auto size-36 duration-200" style={{
        ['--color-border' as string]: `color-mix(in oklab, ${color} 10%, transparent)`,
        ['--color-border-hover' as string]: `color-mix(in oklab, ${color} 20%, transparent)`,
    }}>
        <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] group-hover:bg-[linear-gradient(to_right,var(--color-border-hover)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border-hover)_1px,transparent_1px)] transition-all"
        />

        <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">{children}</div>
    </div>
)
