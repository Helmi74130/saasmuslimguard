'use client'

import { Clock, MapPin, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function ContentSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const featuresRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const titleInView = useInView(titleRef, { once: true, margin: "-100px" })
    const featuresInView = useInView(featuresRef, { once: true, margin: "-50px" })

    // Parallax effects
    const y = useTransform(scrollYProgress, [0, 1], [100, -100])
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.95])
    const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5])

    return (
        <section ref={containerRef} className="relative overflow-hidden py-16 md:py-32">
            {/* Animated Background Gradient Orbs */}
            <motion.div
                className="absolute left-0 top-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-transparent blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute right-0 top-1/2 h-[500px] w-[500px] rounded-full bg-gradient-to-bl from-blue-500/20 via-cyan-500/20 to-transparent blur-3xl"
                animate={{
                    scale: [1.2, 1, 1.2],
                    x: [0, -50, 0],
                    y: [0, 30, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <div className="relative mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                {/* Titre avec animation d'apparition */}
                <motion.h2
                    ref={titleRef}
                    initial={{ opacity: 0, y: 50 }}
                    animate={titleInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 max-w-xl text-4xl font-medium lg:text-5xl"
                >
                    <motion.span
                        className="inline-block bg-gradient-to-r from-foreground via-purple-600 to-foreground bg-clip-text text-transparent"
                        animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{
                            backgroundSize: "200% auto",
                        }}
                    >
                        La navigation s'adapte automatiquement aux heures de prière
                    </motion.span>
                    <motion.span
                        className="absolute -right-8 -top-6 text-purple-500"
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Sparkles className="size-6" />
                    </motion.span>
                </motion.h2>

                <div className="relative">
                    {/* Texte avec animation */}
                    <div className="relative z-10 space-y-4 md:w-1/2">
                        <motion.p
                            initial={{ opacity: 0, x: -30 }}
                            animate={titleInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg leading-relaxed"
                        >
                            MuslimGuard met automatiquement Internet en pause pendant les heures de prière,
                            afin de préserver la concentration et les priorités essentielles.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, x: -30 }}
                            animate={titleInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-lg leading-relaxed text-muted-foreground"
                        >
                            Les horaires sont calculés en temps réel selon votre ville,
                            avec une mise à jour quotidienne pour une protection toujours alignée.
                        </motion.p>

                        {/* Features avec glassmorphism et stagger animation */}
                        <motion.div
                            ref={featuresRef}
                            className="grid grid-cols-1 gap-4 pt-6 sm:grid-cols-2"
                        >
                            {[
                                {
                                    icon: Clock,
                                    title: "Blocage pendant les prières",
                                    description: "La navigation est automatiquement suspendue avant, pendant et après chaque prière.",
                                    gradient: "from-purple-500/10 to-pink-500/10",
                                    iconColor: "text-purple-500",
                                    delay: 0.6
                                },
                                {
                                    icon: MapPin,
                                    title: "Horaires selon votre ville",
                                    description: "Les temps de prière sont calculés automatiquement en fonction de votre localisation.",
                                    gradient: "from-blue-500/10 to-cyan-500/10",
                                    iconColor: "text-blue-500",
                                    delay: 0.8
                                }
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                    animate={featuresInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                                    transition={{
                                        duration: 0.6,
                                        delay: feature.delay,
                                        ease: [0.22, 1, 0.36, 1]
                                    }}
                                    whileHover={{
                                        scale: 1.05,
                                        y: -5,
                                        transition: { duration: 0.2 }
                                    }}
                                    className="group relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-background/80 to-background/40 p-5 backdrop-blur-sm"
                                >
                                    {/* Animated gradient background */}
                                    <motion.div
                                        className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                                    />

                                    {/* Shimmer effect on hover */}
                                    <motion.div
                                        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full"
                                        transition={{ duration: 0.6 }}
                                    />

                                    <div className="relative space-y-3">
                                        <motion.div
                                            className="flex items-center gap-2"
                                            whileHover={{ x: 5 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <motion.div
                                                whileHover={{ rotate: 360, scale: 1.2 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <feature.icon className={`size-5 ${feature.iconColor}`} />
                                            </motion.div>
                                            <h3 className="text-sm font-semibold">
                                                {feature.title}
                                            </h3>
                                        </motion.div>
                                        <p className="text-sm leading-relaxed text-muted-foreground">
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Image avec 3D transform et parallax - Hidden on mobile */}
                    <motion.div
                        style={{ y, opacity }}
                        className="md:mask-l-from-35% md:mask-l-to-55% hidden md:block h-fit md:absolute md:-inset-y-12 md:inset-x-0"
                    >
                        <motion.div
                            style={{ scale, rotate }}
                            whileHover={{
                                scale: 1.02,
                                rotate: 0,
                                transition: { duration: 0.3 }
                            }}
                            className="group relative overflow-hidden rounded-2xl border border-border/50 p-2"
                        >
                            {/* Glow effect */}
                            <motion.div
                                className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
                            />

                            {/* Floating particles effect */}
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute size-2 rounded-full bg-purple-500/30"
                                    style={{
                                        left: `${20 + i * 30}%`,
                                        top: `${10 + i * 20}%`,
                                    }}
                                    animate={{
                                        y: [0, -20, 0],
                                        opacity: [0.3, 0.7, 0.3],
                                        scale: [1, 1.5, 1],
                                    }}
                                    transition={{
                                        duration: 3 + i,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: i * 0.5,
                                    }}
                                />
                            ))}

                            <motion.div
                                className="relative overflow-hidden rounded-[12px]"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
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
                                    className="rounded-[12px] shadow-2xl dark:hidden"
                                    alt="Blocage automatique pendant les heures de prière"
                                    width={1007}
                                    height={929}
                                    priority
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
