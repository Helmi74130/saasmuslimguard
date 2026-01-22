'use client'
import { Logo } from '@/components/logo'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'motion/react'


export default function HeroSection() {
    const [menuState, setMenuState] = useState(false)
    return (
        <>

            <main>
                {/* Background decorative elements with Muslim Guard blue (#003463) */}
                <div
                    aria-hidden
                    className="absolute inset-0 isolate overflow-hidden pointer-events-none">
                    {/* Large gradient orb - top left */}
                    <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,52,99,0.15)_0%,rgba(0,52,99,0.05)_40%,transparent_70%)] blur-3xl" />
                    {/* Medium gradient orb - top right */}
                    <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,52,99,0.12)_0%,rgba(0,52,99,0.03)_50%,transparent_70%)] blur-2xl" />
                    {/* Small accent orb - center */}
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[radial-gradient(ellipse,rgba(0,52,99,0.08)_0%,transparent_60%)] blur-3xl" />
                    {/* Bottom gradient fade */}
                    <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-[rgba(0,52,99,0.05)] to-transparent" />
                    {/* Subtle grid pattern overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,52,99,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,52,99,0.08)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black_40%,transparent_100%)]" />
                </div>

                <section className="relative dark:bg-background overflow-hidden">
                    <div className="relative mx-auto max-w-5xl px-6 pt-28 lg:pt-24">
                        <div className="relative z-10 mx-auto max-w-3xl text-center">
                            <motion.h1
                                className="text-balance text-4xl font-semibold md:text-5xl lg:text-6xl bg-gradient-to-r from-[#0C3E6A] via-blue-500 to-emerald-500 bg-clip-text text-transparent"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            >
                                Le 1er contrôle parental conçu pour les familles musulmanes
                            </motion.h1>
                            <motion.p
                                className="text-muted-foreground mx-auto my-8 max-w-2xl text-xl"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                            >
                                Protégez vos enfants des contenus haram, des distractions et des dangers du web — tout en respectant nos valeurs et les horaires de prière.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                            >
                                <Button
                                    asChild
                                    size="lg">
                                    <Link href="/pricing">
                                        <span className="btn-label">Installer gratuitement maintenant</span>
                                    </Link>
                                </Button>

                                <motion.div
                                    className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.6 }}
                                >
                                    <span className="flex items-center gap-1.5">
                                        <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Fonctionne sur PC & Mac
                                    </span>
                                    <span className="text-gray-300 dark:text-gray-600">•</span>
                                    <span className="flex items-center gap-1.5">
                                        <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Installation en 2 minutes
                                    </span>
                                    <span className="text-gray-300 dark:text-gray-600">•</span>
                                    <span className="flex items-center gap-1.5">
                                        <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Sans compétence technique
                                    </span>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>

                    <div className="mx-auto 2xl:max-w-7xl">
                        <div className="perspective-distant pl-8 lg:pl-44">
                            <div className="lg:h-176 rotate-x-20 mask-b-from-55% mask-b-to-100% mask-r-from-75% skew-x-12 pl-6 pt-6">
                                <Image
                                    className="rounded-(--radius) border shadow-xl dark:hidden"
                                    src="/images/dashboardmg.png"
                                    alt="Dashboard Image"
                                    width={2880}
                                    height={2074}
                                />
                                <Image
                                    className="rounded-(--radius) hidden border shadow-xl dark:block"
                                    src="/images/dashboardmg.png"
                                    alt="Dashboard Image"
                                    width={2880}
                                    height={2074}
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="dark:bg-background relative z-10 py-16">
                    <div className="m-auto max-w-5xl px-6">
                        <motion.h2
                            className="text-center text-lg font-medium"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5 }}
                        >
                            Compatible avec les navigateurs les plus utilisés
                        </motion.h2>
                        <motion.div
                            className="mx-auto mt-20 max-w-4xl space-y-16"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            {/* Première rangée */}
                            <div className="grid grid-cols-3 gap-8 items-center">
                                <div className="flex justify-center">
                                    <img
                                        className="h-10 w-auto sm:h-12"
                                        src="/images/Chrome.png"
                                        alt="Chrome Logo"
                                        height="48"
                                        width="auto"
                                    />
                                </div>
                                <div className="flex justify-center">
                                    <img
                                        className="h-10 w-auto sm:h-12"
                                        src="/images/microsoft.png"
                                        alt="Microsoft Logo"
                                        height="48"
                                        width="auto"
                                    />
                                </div>
                                <div className="flex justify-center">
                                    <img
                                        className="h-10 w-auto sm:h-12"
                                        src="/images/google.png"
                                        alt="Google Logo"
                                        height="48"
                                        width="auto"
                                    />
                                </div>
                            </div>
                            {/* Deuxième rangée */}
                            <div className="grid grid-cols-3 gap-8 items-center">
                                <div className="flex justify-center">
                                    <img
                                        className="h-10 w-auto sm:h-12"
                                        src="/images/edge.png"
                                        alt="Edge Logo"
                                        height="48"
                                        width="auto"
                                    />
                                </div>
                                <div className="flex justify-center">
                                    <img
                                        className="h-10 w-auto sm:h-12"
                                        src="/images/opera.png"
                                        alt="Opera Logo"
                                        height="48"
                                        width="auto"
                                    />
                                </div>
                                <div className="flex justify-center">
                                    <img
                                        className="h-10 w-auto sm:h-12"
                                        src="/images/Brave.png"
                                        alt="Brave Logo"
                                        height="48"
                                        width="auto"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>
        </>
    )
}
