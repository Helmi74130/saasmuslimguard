'use client'

import { Card, CardContent } from '@/components/ui/card'
import { ShieldBan, Moon, Lock } from 'lucide-react'
import { motion } from 'motion/react'

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
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl bg-gradient-to-r from-[#0C3E6A] via-blue-500 to-emerald-500 bg-clip-text text-transparent">Les pires influences, le haram et les contenus dangereux commencent en ligne</h2>
                    <p className="mt-4">Internet expose nos enfants à des influences dangereuses. MuslimGuard bloque ce qui va à l’encontre de nos valeurs, pour protéger leur innocence et leur foi.</p>
                </div>
                <div className="mx-auto mt-8 grid max-w-sm gap-6 md:mt-16 md:max-w-none md:grid-cols-2 lg:grid-cols-3">
                    <Card className="group overflow-hidden shadow-zinc-950/5 border border-[#0C3E6A]/10 hover:border-[#0C3E6A]/20 transition-colors">
                        <CardContent className="space-y-3">
                            {/* Mini browser simulation */}
                            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 min-h-[160px]">
                                {/* Browser header */}
                                <div className="bg-gray-200 dark:bg-gray-700 px-3 py-2 flex items-center gap-2 border-b border-gray-300 dark:border-gray-600">
                                    <div className="flex gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                        <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                    </div>
                                    <div className="flex-1 bg-white dark:bg-gray-600 rounded px-2 py-0.5">
                                        <p className="text-[9px] text-gray-500 dark:text-gray-300">haram-site.com</p>
                                    </div>
                                </div>

                                {/* Browser content */}
                                <div className="relative h-24 p-3">
                                    {/* Simulated website content */}
                                    <div className="space-y-1.5">
                                        <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                                        <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                                        <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
                                        <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
                                    </div>

                                    {/* Blocking overlay animation */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-b from-[#003461]/90 via-[#003461]/95 to-[#003461]/90 flex flex-col items-center justify-center"
                                        initial={{ top: '-100%' }}
                                        animate={{ top: 0 }}
                                        transition={{
                                            duration: 1,
                                            delay: 1.5,
                                            repeat: Infinity,
                                            repeatDelay: 2,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{
                                                duration: 0.4,
                                                delay: 2.5,
                                                repeat: Infinity,
                                                repeatDelay: 3
                                            }}
                                        >
                                            <ShieldBan className="h-8 w-8 text-white mb-1" />
                                        </motion.div>
                                        <motion.p
                                            className="text-white text-xs font-bold tracking-wider"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{
                                                duration: 0.3,
                                                delay: 2.7,
                                                repeat: Infinity,
                                                repeatDelay: 3
                                            }}
                                        >
                                            BLOQUÉ
                                        </motion.p>
                                    </motion.div>
                                </div>
                            </div>

                            <h3 className="font-semibold text-center">Bloquez ce que VOUS jugez inacceptable</h3>
                            <p className="text-sm text-center">Contrairement aux autres contrôles parentaux qui appliquent des listes prédéfinies, ici c'est vous qui choisissez les sites et contenus à bloquer, selon nos valeurs.</p>
                        </CardContent>
                    </Card>

                    <Card className="group overflow-hidden shadow-zinc-950/5 border border-purple-400/10 hover:border-purple-400/20 transition-colors">
                        <CardContent className="space-y-3">
                            {/* Mini webpage simulation */}
                            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700 overflow-hidden min-h-[160px]">
                                {/* Simulated webpage content */}
                                <div className="space-y-2 text-xs relative z-10">
                                    <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                                    <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                                    <div className="flex gap-1 items-center">
                                        <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
                                        <motion.span
                                            className="px-1.5 py-0.5 bg-red-500/20 text-red-600 dark:text-red-400 rounded text-[10px] font-medium border border-red-500/30"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: [0, 1, 1, 1], scale: [0.8, 1.1, 1, 1] }}
                                            transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                                        >
                                            mot détecté
                                        </motion.span>
                                        <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded flex-1"></div>
                                    </div>
                                    <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
                                </div>

                                {/* Scanning line animation */}
                                <motion.div
                                    className="absolute inset-x-0 h-8 bg-gradient-to-b from-[#003461]/30 via-[#003461]/50 to-[#003461]/30 blur-sm"
                                    initial={{ top: '-2rem' }}
                                    animate={{ top: '100%' }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "linear",
                                        repeatDelay: 1
                                    }}
                                />

                                {/* Scan line sharp edge */}
                                <motion.div
                                    className="absolute inset-x-0 h-0.5 bg-[#003461]"
                                    initial={{ top: '-0.5rem' }}
                                    animate={{ top: '100%' }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "linear",
                                        repeatDelay: 1
                                    }}
                                />
                            </div>

                            <h3 className="font-semibold text-center">Détection de mots-clés en temps réel</h3>
                            <p className="text-sm text-center">Entrez les mots que vous jugez inacceptables. MuslimGuard les détecte en temps réel et empêche automatiquement la navigation dès qu'ils apparaissent même sur des sites non listés.</p>
                        </CardContent>
                    </Card>

                    <Card className="group overflow-hidden shadow-zinc-950/5 border border-[#003461]/10 hover:border-[#003461]/20 transition-colors">
                        <CardContent className="space-y-3">
                            {/* Clock with prayer pause animation */}
                            <div className="relative bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-950/20 dark:to-sky-950/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800 overflow-hidden min-h-[160px]">
                                {/* Clock circle */}
                                <div className="relative mx-auto w-24 h-24 rounded-full border-4 border-[#003461]/30 dark:border-[#003461]/70 bg-white dark:bg-gray-800">
                                    {/* Clock center dot */}
                                    <div className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-[#003461] rounded-full z-10"></div>

                                    {/* Hour hand */}
                                    <motion.div
                                        className="absolute top-1/2 left-1/2 origin-bottom w-1 h-7 bg-[#003461] rounded-full"
                                        style={{ translateX: '-50%', translateY: '-100%' }}
                                        animate={{ rotate: 360 }}
                                        transition={{
                                            duration: 8,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                    />

                                    {/* Minute hand */}
                                    <motion.div
                                        className="absolute top-1/2 left-1/2 origin-bottom w-0.5 h-9 bg-[#003461]/80 rounded-full"
                                        style={{ translateX: '-50%', translateY: '-100%' }}
                                        animate={{ rotate: 360 }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                    />

                                    {/* Prayer time markers */}
                                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-2 bg-[#003461]/60 rounded"></div>
                                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-2 bg-[#003461]/60 rounded"></div>
                                    <div className="absolute left-1 top-1/2 -translate-y-1/2 w-2 h-1 bg-[#003461]/60 rounded"></div>
                                    <div className="absolute right-1 top-1/2 -translate-y-1/2 w-2 h-1 bg-[#003461]/60 rounded"></div>
                                </div>

                                {/* Prayer pause overlay */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-b from-[#003461]/80 via-[#003461]/90 to-[#003461]/80 backdrop-blur-sm flex flex-col items-center justify-center"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.8] }}
                                    transition={{
                                        duration: 4,
                                        delay: 2,
                                        repeat: Infinity,
                                        repeatDelay: 2,
                                        times: [0, 0.2, 0.8, 1]
                                    }}
                                >
                                    <motion.div
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{
                                            duration: 2,
                                            delay: 2.2,
                                            repeat: Infinity,
                                            repeatDelay: 4
                                        }}
                                    >
                                        <Moon className="h-10 w-10 text-white mb-2" />
                                    </motion.div>
                                    <p className="text-white text-xs font-bold tracking-wider">PAUSE PRIÈRE</p>
                                    <p className="text-white/90 text-[10px] mt-1">Internet en pause</p>
                                </motion.div>
                            </div>

                            <h3 className="font-semibold text-center">Pause automatique pendant les prières</h3>
                            <p className="text-sm text-center">MuslimGuard est le premier contrôle parental à mettre Internet en pause pendant les heures de prière, pour aider nos enfants à se concentrer pleinement sur leurs obligations religieuses.</p>
                        </CardContent>
                    </Card>

                    <Card className="group overflow-hidden shadow-zinc-950/5 border border-[#003461]/10 hover:border-[#003461]/20 transition-colors">
                        <CardContent className="space-y-3">
                            {/* Local Computer to Server Animation (Data stays local) */}
                            <div className="relative bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-950/20 dark:to-sky-950/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800 overflow-hidden min-h-[160px] flex items-center justify-center">
                                {/* Local Computer (left side) - stays secure with lock */}
                                <div className="absolute left-8">
                                    <motion.div
                                        className="relative"
                                        animate={{
                                            scale: [1, 1.05, 1],
                                        }}
                                        transition={{
                                            duration: 6,
                                            repeat: Infinity,
                                            times: [0, 0.1, 0.2]
                                        }}
                                    >
                                        {/* Computer/Laptop icon */}
                                        <svg className="w-14 h-14 text-[#003461] dark:text-[#003461]/80" fill="currentColor" viewBox="0 0 24 24">
                                            <rect x="3" y="4" width="18" height="12" rx="1" opacity="0.9"/>
                                            <rect x="5" y="6" width="14" height="8" fill="white" opacity="0.3"/>
                                            <path d="M2 18h20v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-1z"/>
                                            <rect x="10" y="17" width="4" height="1" opacity="0.6"/>
                                        </svg>

                                        {/* Lock icon on computer - always visible */}
                                        <motion.div
                                            className="absolute -top-2 -right-2"
                                            animate={{
                                                scale: [1, 1.1, 1],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                repeatDelay: 4
                                            }}
                                        >
                                            <div className="bg-green-500 rounded-full p-1">
                                                <Lock className="w-3 h-3 text-white" />
                                            </div>
                                        </motion.div>

                                        {/* Protective glow around computer */}
                                        <motion.div
                                            className="absolute inset-0 rounded-full blur-xl"
                                            style={{
                                                background: 'radial-gradient(circle, rgba(34, 197, 94, 0.4) 0%, transparent 70%)'
                                            }}
                                            animate={{
                                                opacity: [0.3, 0.5, 0.3],
                                                scale: [1, 1.2, 1]
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                            }}
                                        />
                                    </motion.div>
                                </div>

                                {/* Data particles attempting to travel from computer to cloud (but blocked) */}
                                {[...Array(6)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-1.5 h-1.5 bg-[#003461] rounded-full"
                                        initial={{
                                            left: '35%',
                                            top: '50%',
                                            opacity: 0,
                                            scale: 0
                                        }}
                                        animate={{
                                            left: ['35%', '50%', '50%'],
                                            top: ['50%', `${48 + i * 1}%`, `${48 + i * 1}%`],
                                            opacity: [0, 1, 0],
                                            scale: [0, 1, 0.3]
                                        }}
                                        transition={{
                                            duration: 2,
                                            delay: 0.5 + (i * 0.15),
                                            repeat: Infinity,
                                            repeatDelay: 3,
                                            ease: "easeOut"
                                        }}
                                    />
                                ))}

                                {/* Cloud Server (right side) - gets crossed out */}
                                <div className="absolute right-8">
                                    {/* Server cloud icon */}
                                    <motion.div
                                        className="relative"
                                        animate={{
                                            opacity: [1, 1, 0.3, 0.3],
                                            scale: [1, 1, 0.9, 0.9]
                                        }}
                                        transition={{
                                            duration: 6,
                                            repeat: Infinity,
                                            times: [0, 0.2, 0.3, 1]
                                        }}
                                    >
                                        {/* Cloud shape using Server icon */}
                                        <svg className="w-12 h-12 text-[#003461]/60 dark:text-[#003461]/70" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 18H5c-1.7 0-3-1.3-3-3s1.3-3 3-3c0-3.3 2.7-6 6-6 2.8 0 5.1 1.9 5.8 4.5.3-.1.6-.1 1-.1 1.7 0 3 1.3 3 3s-1.3 3-3 3z"/>
                                            <rect x="8" y="14" width="2" height="2" opacity="0.6"/>
                                            <rect x="12" y="14" width="2" height="2" opacity="0.6"/>
                                        </svg>
                                    </motion.div>

                                    {/* Red X crossing out the server */}
                                    <motion.div
                                        className="absolute inset-0 flex items-center justify-center"
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{
                                            opacity: [0, 0, 1, 1],
                                            scale: [0, 0, 1.2, 1]
                                        }}
                                        transition={{
                                            duration: 6,
                                            repeat: Infinity,
                                            times: [0, 0.2, 0.3, 0.35]
                                        }}
                                    >
                                        <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" strokeWidth="3">
                                            <line x1="2" y1="2" x2="22" y2="22" />
                                            <line x1="22" y1="2" x2="2" y2="22" />
                                        </svg>
                                    </motion.div>
                                </div>

                                {/* Arrow showing blocked direction (pointing right but fading) */}
                                <motion.div
                                    className="absolute left-1/2 -translate-x-1/2 text-[#003461]"
                                    animate={{
                                        opacity: [0, 1, 0, 0],
                                        x: [-5, 0, 5, 5]
                                    }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        times: [0, 0.15, 0.25, 1]
                                    }}
                                >
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M13 5l7 7-7 7"/>
                                    </svg>
                                </motion.div>

                                {/* "Blocked" shield appears in the middle */}
                                <motion.div
                                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{
                                        opacity: [0, 0, 1, 1, 0.7],
                                        scale: [0, 0, 1.2, 1, 1],
                                        rotate: [0, 0, 10, 0, 0]
                                    }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        times: [0, 0.25, 0.35, 0.4, 1]
                                    }}
                                >
                                    <div className="bg-red-500 rounded-full p-2 shadow-lg">
                                        <ShieldBan className="w-6 h-6 text-white" />
                                    </div>
                                </motion.div>
                            </div>

                            <h3 className="font-semibold text-center">Vos données restent chez vous</h3>
                            <p className="text-sm text-center">Vos paramètres, mots-clés et règles de navigation sont stockés uniquement sur votre ordinateur, sans serveur externe.
MuslimGuard fonctionne de manière simple et transparente, sans collecte cachée ni traitement de vos données ailleurs.</p>
                        </CardContent>
                    </Card>

                    <Card className="group overflow-hidden shadow-zinc-950/5 border border-[#003461]/10 hover:border-[#003461]/20 transition-colors">
                        <CardContent className="space-y-3">
                            {/* Traffic Light Time Control Animation */}
                            <div className="relative bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-950/20 dark:to-sky-950/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800 overflow-hidden min-h-[160px]">
                                <div className="flex items-center justify-center gap-8">
                                    {/* Clock with colored time zones */}
                                    <div className="relative">
                                        {/* Main clock circle */}
                                        <div className="relative w-24 h-24 rounded-full border-4 border-[#003461]/30 dark:border-[#003461]/70 bg-white dark:bg-gray-800">
                                            {/* Colored segments on clock (allowed vs blocked times) */}
                                            {/* Green segment (9h-17h allowed) */}
                                            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r="42"
                                                    fill="none"
                                                    stroke="rgba(34, 197, 94, 0.3)"
                                                    strokeWidth="8"
                                                    strokeDasharray="88 176"
                                                    strokeDashoffset="0"
                                                />
                                                {/* Red segment (17h-9h blocked) */}
                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r="42"
                                                    fill="none"
                                                    stroke="rgba(239, 68, 68, 0.3)"
                                                    strokeWidth="8"
                                                    strokeDasharray="176 88"
                                                    strokeDashoffset="-88"
                                                />
                                            </svg>

                                            {/* Clock center dot */}
                                            <div className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-[#003461] rounded-full z-20"></div>

                                            {/* Hour markers */}
                                            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-2 bg-[#003461]/60 rounded"></div>
                                            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-2 bg-[#003461]/60 rounded"></div>
                                            <div className="absolute left-1 top-1/2 -translate-y-1/2 w-2 h-1 bg-[#003461]/60 rounded"></div>
                                            <div className="absolute right-1 top-1/2 -translate-y-1/2 w-2 h-1 bg-[#003461]/60 rounded"></div>

                                            {/* Rotating clock hand */}
                                            <motion.div
                                                className="absolute top-1/2 left-1/2 origin-bottom w-1 h-9 bg-[#003461] rounded-full z-10"
                                                style={{ translateX: '-50%', translateY: '-100%' }}
                                                animate={{ rotate: 360 }}
                                                transition={{
                                                    duration: 8,
                                                    repeat: Infinity,
                                                    ease: "linear"
                                                }}
                                            />

                                            {/* Digital time display */}
                                            <motion.div
                                                className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold px-2 py-0.5 rounded whitespace-nowrap"
                                                animate={{
                                                    color: ['#22c55e', '#22c55e', '#ef4444', '#ef4444'],
                                                }}
                                                transition={{
                                                    duration: 8,
                                                    repeat: Infinity,
                                                    times: [0, 0.5, 0.5, 1]
                                                }}
                                            >
                                                <motion.span
                                                    animate={{
                                                        opacity: [1, 1, 0, 0],
                                                    }}
                                                    transition={{
                                                        duration: 8,
                                                        repeat: Infinity,
                                                        times: [0, 0.5, 0.5, 1]
                                                    }}
                                                >
                                                    12:00
                                                </motion.span>
                                                <motion.span
                                                    className="absolute left-2"
                                                    animate={{
                                                        opacity: [0, 0, 1, 1],
                                                    }}
                                                    transition={{
                                                        duration: 8,
                                                        repeat: Infinity,
                                                        times: [0, 0.5, 0.5, 1]
                                                    }}
                                                >
                                                    16:00
                                                </motion.span>
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Traffic Light */}
                                    <div className="relative">
                                        <div className="bg-gray-800 dark:bg-gray-900 rounded-lg p-2 w-12 shadow-lg border border-gray-700">
                                            {/* Red light (blocked) */}
                                            <motion.div
                                                className="w-8 h-8 rounded-full mb-2 border-2"
                                                animate={{
                                                    backgroundColor: [
                                                        'rgba(239, 68, 68, 0.2)',
                                                        'rgba(239, 68, 68, 0.2)',
                                                        'rgba(239, 68, 68, 1)',
                                                        'rgba(239, 68, 68, 1)'
                                                    ],
                                                    borderColor: [
                                                        'rgba(239, 68, 68, 0.3)',
                                                        'rgba(239, 68, 68, 0.3)',
                                                        'rgba(239, 68, 68, 1)',
                                                        'rgba(239, 68, 68, 1)'
                                                    ],
                                                    boxShadow: [
                                                        '0 0 0px rgba(239, 68, 68, 0)',
                                                        '0 0 0px rgba(239, 68, 68, 0)',
                                                        '0 0 15px rgba(239, 68, 68, 0.8)',
                                                        '0 0 15px rgba(239, 68, 68, 0.8)'
                                                    ]
                                                }}
                                                transition={{
                                                    duration: 8,
                                                    repeat: Infinity,
                                                    times: [0, 0.300, 0.5, 1],
                                                    ease: "linear"
                                                }}
                                            />

                                            {/* Green light (allowed) */}
                                            <motion.div
                                                className="w-8 h-8 rounded-full border-2"
                                                animate={{
                                                    backgroundColor: [
                                                        'rgba(34, 197, 94, 1)',
                                                        'rgba(34, 197, 94, 1)',
                                                        'rgba(34, 197, 94, 0.2)',
                                                        'rgba(34, 197, 94, 0.2)'
                                                    ],
                                                    borderColor: [
                                                        'rgba(34, 197, 94, 1)',
                                                        'rgba(34, 197, 94, 1)',
                                                        'rgba(34, 197, 94, 0.3)',
                                                        'rgba(34, 197, 94, 0.3)'
                                                    ],
                                                    boxShadow: [
                                                        '0 0 15px rgba(34, 197, 94, 0.8)',
                                                        '0 0 15px rgba(34, 197, 94, 0.8)',
                                                        '0 0 0px rgba(34, 197, 94, 0)',
                                                        '0 0 0px rgba(34, 197, 94, 0)'
                                                    ]
                                                }}
                                                transition={{
                                                    duration: 8,
                                                    repeat: Infinity,
                                                    times: [0, 0.3, 0.5, 1],
                                                    ease: "linear"
                                                }}
                                            />
                                        </div>

                                        {/* Status label */}
                                        <motion.div
                                            className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold px-2 py-0.5 rounded whitespace-nowrap"
                                        >
                                            <motion.span
                                                className="text-green-500"
                                                animate={{
                                                    opacity: [1, 1, 0, 0],
                                                }}
                                                transition={{
                                                    duration: 8,
                                                    repeat: Infinity,
                                                    times: [0, 0.3, 0.3, 1]
                                                }}
                                            >
                                                ✓ AUTORISÉ
                                            </motion.span>
                                            <motion.span
                                                className="absolute left-2 text-red-500"
                                                animate={{
                                                    opacity: [0, 0, 1, 1],
                                                }}
                                                transition={{
                                                    duration: 8,
                                                    repeat: Infinity,
                                                    times: [0, 0.3, 0.3, 1]
                                                }}
                                            >
                                                ✕ BLOQUÉ
                                            </motion.span>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Time range indicators */}
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-4 text-[9px]">
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                                        <span className="text-gray-600 dark:text-gray-400 whitespace-nowrap">12h-16h</span>
                                    </div>
                                    
                                </div>
                            </div>

                            <h3 className="font-semibold text-center">Définissez des plages horaires d'accès</h3>
                            <p className="text-sm text-center">Choisissez quand vos enfants peuvent utiliser Internet. MuslimGuard bloque automatiquement l'accès en dehors des horaires que vous avez définis.</p>
                        </CardContent>
                    </Card>

                    <Card className="group overflow-hidden shadow-zinc-950/5 border border-[#003461]/10 hover:border-[#003461]/20 transition-colors">
                        <CardContent className="space-y-3">
                            {/* Unlimited Devices Multiplication Animation */}
                            <div className="relative bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-950/20 dark:to-sky-950/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800 overflow-hidden min-h-[160px] flex items-center justify-center">

                                {/* Central Computer (always visible) */}
                                <div className="relative z-10">
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.1, 1],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            repeatDelay: 4
                                        }}
                                    >
                                        <svg className="w-16 h-16 text-[#003461] dark:text-[#003461]/80" fill="currentColor" viewBox="0 0 24 24">
                                            <rect x="3" y="4" width="18" height="12" rx="1" opacity="0.9"/>
                                            <rect x="5" y="6" width="14" height="8" fill="white" opacity="0.3"/>
                                            <path d="M2 18h20v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-1z"/>
                                            <rect x="10" y="17" width="4" height="1" opacity="0.6"/>
                                        </svg>
                                    </motion.div>

                                    {/* Pulse ring effect */}
                                    <motion.div
                                        className="absolute inset-0 rounded-full border-2 border-[#003461]/60"
                                        animate={{
                                            scale: [1, 2, 2],
                                            opacity: [0.6, 0.2, 0]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            repeatDelay: 4
                                        }}
                                    />
                                </div>

                                {/* Cloned computers appearing around - Top Left */}
                                <motion.div
                                    className="absolute"
                                    style={{ top: '15%', left: '15%' }}
                                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                                    animate={{
                                        opacity: [0, 0, 1, 1, 1],
                                        scale: [0, 0, 1, 1, 1],
                                        x: [0, 0, 0, 0, 0],
                                        y: [0, 0, 0, 0, 0]
                                    }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        times: [0, 0.15, 0.25, 0.85, 1]
                                    }}
                                >
                                    <svg className="w-10 h-10 text-[#003461]/70 dark:text-[#003461]/70" fill="currentColor" viewBox="0 0 24 24">
                                        <rect x="3" y="4" width="18" height="12" rx="1" opacity="0.9"/>
                                        <rect x="5" y="6" width="14" height="8" fill="white" opacity="0.3"/>
                                        <path d="M2 18h20v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-1z"/>
                                    </svg>
                                </motion.div>

                                {/* Cloned computers - Top Right */}
                                <motion.div
                                    className="absolute"
                                    style={{ top: '15%', right: '15%' }}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{
                                        opacity: [0, 0, 0, 1, 1, 1],
                                        scale: [0, 0, 0, 1, 1, 1]
                                    }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        times: [0, 0.25, 0.35, 0.45, 0.85, 1]
                                    }}
                                >
                                    <svg className="w-10 h-10 text-[#003461]/70 dark:text-[#003461]/70" fill="currentColor" viewBox="0 0 24 24">
                                        <rect x="3" y="4" width="18" height="12" rx="1" opacity="0.9"/>
                                        <rect x="5" y="6" width="14" height="8" fill="white" opacity="0.3"/>
                                        <path d="M2 18h20v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-1z"/>
                                    </svg>
                                </motion.div>

                                {/* Cloned computers - Bottom Left */}
                                <motion.div
                                    className="absolute"
                                    style={{ bottom: '15%', left: '15%' }}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{
                                        opacity: [0, 0, 0, 0, 1, 1, 1],
                                        scale: [0, 0, 0, 0, 1, 1, 1]
                                    }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        times: [0, 0.35, 0.45, 0.5, 0.6, 0.85, 1]
                                    }}
                                >
                                    <svg className="w-10 h-10 text-[#003461]/70 dark:text-[#003461]/70" fill="currentColor" viewBox="0 0 24 24">
                                        <rect x="3" y="4" width="18" height="12" rx="1" opacity="0.9"/>
                                        <rect x="5" y="6" width="14" height="8" fill="white" opacity="0.3"/>
                                        <path d="M2 18h20v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-1z"/>
                                    </svg>
                                </motion.div>

                                {/* Cloned computers - Bottom Right */}
                                <motion.div
                                    className="absolute"
                                    style={{ bottom: '15%', right: '15%' }}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{
                                        opacity: [0, 0, 0, 0, 0, 1, 1, 1],
                                        scale: [0, 0, 0, 0, 0, 1, 1, 1]
                                    }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        times: [0, 0.45, 0.5, 0.55, 0.6, 0.7, 0.85, 1]
                                    }}
                                >
                                    <svg className="w-10 h-10 text-[#003461]/70 dark:text-[#003461]/70" fill="currentColor" viewBox="0 0 24 24">
                                        <rect x="3" y="4" width="18" height="12" rx="1" opacity="0.9"/>
                                        <rect x="5" y="6" width="14" height="8" fill="white" opacity="0.3"/>
                                        <path d="M2 18h20v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-1z"/>
                                    </svg>
                                </motion.div>

                                {/* Connection lines between devices */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
                                    {/* Line to top-left */}
                                    <motion.line
                                        x1="50%" y1="50%"
                                        x2="25%" y2="25%"
                                        stroke="rgba(0, 52, 97, 0.3)"
                                        strokeWidth="2"
                                        strokeDasharray="4 4"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{
                                            pathLength: [0, 0, 1, 1],
                                            opacity: [0, 0, 0.5, 0.5]
                                        }}
                                        transition={{
                                            duration: 6,
                                            repeat: Infinity,
                                            times: [0, 0.15, 0.25, 1]
                                        }}
                                    />
                                    {/* Line to top-right */}
                                    <motion.line
                                        x1="50%" y1="50%"
                                        x2="75%" y2="25%"
                                        stroke="rgba(0, 52, 97, 0.3)"
                                        strokeWidth="2"
                                        strokeDasharray="4 4"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{
                                            pathLength: [0, 0, 0, 1, 1],
                                            opacity: [0, 0, 0, 0.5, 0.5]
                                        }}
                                        transition={{
                                            duration: 6,
                                            repeat: Infinity,
                                            times: [0, 0.25, 0.35, 0.45, 1]
                                        }}
                                    />
                                    {/* Line to bottom-left */}
                                    <motion.line
                                        x1="50%" y1="50%"
                                        x2="25%" y2="75%"
                                        stroke="rgba(0, 52, 97, 0.3)"
                                        strokeWidth="2"
                                        strokeDasharray="4 4"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{
                                            pathLength: [0, 0, 0, 0, 1, 1],
                                            opacity: [0, 0, 0, 0, 0.5, 0.5]
                                        }}
                                        transition={{
                                            duration: 6,
                                            repeat: Infinity,
                                            times: [0, 0.45, 0.5, 0.55, 0.65, 1]
                                        }}
                                    />
                                    {/* Line to bottom-right */}
                                    <motion.line
                                        x1="50%" y1="50%"
                                        x2="75%" y2="75%"
                                        stroke="rgba(0, 52, 97, 0.3)"
                                        strokeWidth="2"
                                        strokeDasharray="4 4"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{
                                            pathLength: [0, 0, 0, 0, 0, 1, 1],
                                            opacity: [0, 0, 0, 0, 0, 0.5, 0.5]
                                        }}
                                        transition={{
                                            duration: 6,
                                            repeat: Infinity,
                                            times: [0, 0.55, 0.6, 0.65, 0.7, 0.8, 1]
                                        }}
                                    />
                                </svg>

                                {/* Counter display */}
                                <div className="absolute top-2 right-2 bg-[#003461] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                    <motion.span
                                        key="counter"
                                        animate={{
                                            opacity: [1, 1, 1, 1, 1, 1, 1]
                                        }}
                                    >
                                        <motion.span
                                            animate={{
                                                opacity: [1, 1, 0, 0, 0, 0, 0]
                                            }}
                                            transition={{
                                                duration: 6,
                                                repeat: Infinity,
                                                times: [0, 0.15, 0.2, 0.3, 0.4, 0.5, 1]
                                            }}
                                        >
                                            1
                                        </motion.span>
                                        <motion.span
                                            className="absolute left-3"
                                            animate={{
                                                opacity: [0, 0, 1, 1, 0, 0, 0]
                                            }}
                                            transition={{
                                                duration: 6,
                                                repeat: Infinity,
                                                times: [0, 0.2, 0.25, 0.35, 0.4, 0.5, 1]
                                            }}
                                        >
                                            2
                                        </motion.span>
                                        <motion.span
                                            className="absolute left-3"
                                            animate={{
                                                opacity: [0, 0, 0, 0, 1, 1, 0, 0]
                                            }}
                                            transition={{
                                                duration: 6,
                                                repeat: Infinity,
                                                times: [0, 0.35, 0.4, 0.45, 0.5, 0.6, 0.65, 1]
                                            }}
                                        >
                                            3
                                        </motion.span>
                                        <motion.span
                                            className="absolute left-3"
                                            animate={{
                                                opacity: [0, 0, 0, 0, 0, 0, 1, 1, 0]
                                            }}
                                            transition={{
                                                duration: 6,
                                                repeat: Infinity,
                                                times: [0, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 1]
                                            }}
                                        >
                                            4
                                        </motion.span>
                                        <motion.span
                                            className="absolute left-3"
                                            animate={{
                                                opacity: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1]
                                            }}
                                            transition={{
                                                duration: 6,
                                                repeat: Infinity,
                                                times: [0, 0.75, 0.8, 0.82, 0.84, 0.86, 0.88, 0.9, 0.92, 1]
                                            }}
                                        >
                                            ∞
                                        </motion.span>
                                    </motion.span>
                                </div>

                                {/* "Illimité" badge */}
                                <motion.div
                                    className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#003461] to-[#003461] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{
                                        opacity: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                                        y: [10, 10, 10, 10, 10, 10, 10, 10, 0, 0],
                                        scale: [0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 1.1, 1]
                                    }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        times: [0, 0.75, 0.8, 0.82, 0.84, 0.86, 0.88, 0.9, 0.92, 0.95]
                                    }}
                                >
                                    ILLIMITÉ
                                </motion.div>
                            </div>

                            <h3 className="font-semibold text-center">Nombre d'appareils illimité</h3>
                            <p className="text-sm text-center">Un compte pour tous vos ordinateurs. MuslimGuard protège chaque PC, selon vos règles, sans limite d'appareils. (Non compatible avec les smartphones.)</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
