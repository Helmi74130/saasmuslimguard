import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Shield, ArrowRight, CheckCircle } from 'lucide-react'

export default function CallToAction() {
    return (
        <section className="py-16 md:py-24">
            <div className="mx-auto max-w-5xl px-6">
                <div className="relative overflow-hidden rounded-3xl bg-[#003463] px-6 py-16 md:px-16 md:py-20">
                    {/* Background decorative elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
                        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-white/[0.02]" />
                        {/* Grid pattern */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
                    </div>

                    <div className="relative z-10">
                        {/* Icon */}
                        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                            <Shield className="h-8 w-8 text-white" />
                        </div>

                        {/* Content */}
                        <div className="text-center">
                            <h2 className="text-balance text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                                Protégez vos enfants dès aujourd'hui
                            </h2>
                            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
                                Activez MuslimGuard et offrez un environnement numérique sain,
                                aligné avec vos valeurs islamiques.
                            </p>

                            {/* Features mini list */}
                            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/70">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-white/90" />
                                    <span>Installation en 2 min</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-white/90" />
                                    <span>Gratuit pour commencer</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-white/90" />
                                    <span>Sans carte bancaire</span>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                                <Button
                                    asChild
                                    size="lg"
                                    className="rounded-full bg-white text-[#003463] hover:bg-white/90 px-8 py-6 text-base font-semibold shadow-lg shadow-black/20"
                                >
                                    <Link href="/install">
                                        <span>Installer MuslimGuard</span>
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="ghost"
                                    size="lg"
                                    className="rounded-full border border-white/20 text-white hover:bg-white/10 hover:text-white px-8 py-6 text-base"
                                >
                                    <Link href="/pricing">
                                        <span>Voir les tarifs</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
