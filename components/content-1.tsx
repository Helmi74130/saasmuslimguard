'use client'

import Image from 'next/image'
import { BarChart3, Shield, Eye, Clock, TrendingUp, Activity } from 'lucide-react'
import { motion } from 'framer-motion'

const stats = [
    {
        icon: Shield,
        value: '1,247',
        label: 'Sites bloqués ce mois',
        trend: '+12%',
        color: 'emerald',
        bgColor: 'bg-emerald-100 dark:bg-emerald-900/20',
        textColor: 'text-emerald-600 dark:text-emerald-400',
        borderColor: 'border-emerald-200/50 dark:border-emerald-800/50',
    },
    {
        icon: Eye,
        value: '89',
        label: 'Tentatives aujourd\'hui',
        trend: '-5%',
        color: 'purple',
        bgColor: 'bg-purple-100 dark:bg-purple-900/20',
        textColor: 'text-purple-600 dark:text-purple-400',
        borderColor: 'border-purple-200/50 dark:border-purple-800/50',
    },
    {
        icon: Clock,
        value: '2h 34m',
        label: 'Temps d\'écran moyen',
        trend: '-18%',
        color: 'amber',
        bgColor: 'bg-amber-100 dark:bg-amber-900/20',
        textColor: 'text-amber-600 dark:text-amber-400',
        borderColor: 'border-amber-200/50 dark:border-amber-800/50',
    },
]

const features = [
    {
        icon: BarChart3,
        title: 'Statistiques détaillées',
        description: 'Visualisez les sites bloqués par catégorie, par jour et par enfant.',
        color: 'blue',
        bgColor: 'bg-blue-100 dark:bg-blue-900/20',
        textColor: 'text-blue-600 dark:text-blue-400',
        borderColor: 'border-blue-200/50 dark:border-blue-800/50',
    },
    {
        icon: TrendingUp,
        title: 'Évolution du comportement',
        description: 'Suivez les tendances et adaptez la protection selon les besoins.',
        color: 'rose',
        bgColor: 'bg-rose-100 dark:bg-rose-900/20',
        textColor: 'text-rose-600 dark:text-rose-400',
        borderColor: 'border-rose-200/50 dark:border-rose-800/50',
    },
    {
        icon: Activity,
        title: 'Activité en temps réel',
        description: 'Recevez des alertes instantanées sur les tentatives d\'accès.',
        color: 'teal',
        bgColor: 'bg-teal-100 dark:bg-teal-900/20',
        textColor: 'text-teal-600 dark:text-teal-400',
        borderColor: 'border-teal-200/50 dark:border-teal-800/50',
    },
]

export default function ContentSectionOne() {
    return (
        <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-[#003463]/10 blur-3xl translate-x-1/2 -translate-y-1/2" />
                <div className="absolute left-1/4 top-20 h-[400px] w-[400px] rounded-full bg-purple-200/20 blur-3xl" />
                <div className="absolute right-1/3 bottom-20 h-[300px] w-[300px] rounded-full bg-blue-200/20 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-6xl px-6">
                {/* Header */}
                <motion.div
                    className="max-w-2xl mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#003463]/10 to-purple-500/10 px-4 py-2 text-sm font-medium text-[#003463] dark:text-blue-400 mb-6 border border-[#003463]/20"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <BarChart3 className="h-4 w-4" />
                        <span>Dashboard</span>
                    </motion.div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#003463] to-purple-600 bg-clip-text text-transparent">
                        Gardez le contrôle avec des statistiques claires
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Votre tableau de bord vous offre une vue complète de l'activité de navigation de vos enfants et de l'efficacité de la protection.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Dashboard Image */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800"
                            whileHover={{ scale: 1.02, rotate: 0.5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            {/* Browser bar mockup */}
                            <div className="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 px-4 py-3 flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <motion.div
                                        className="w-3 h-3 rounded-full bg-red-400"
                                        whileHover={{ scale: 1.3 }}
                                    ></motion.div>
                                    <motion.div
                                        className="w-3 h-3 rounded-full bg-yellow-400"
                                        whileHover={{ scale: 1.3 }}
                                    ></motion.div>
                                    <motion.div
                                        className="w-3 h-3 rounded-full bg-green-400"
                                        whileHover={{ scale: 1.3 }}
                                    ></motion.div>
                                </div>
                                <div className="flex-1 mx-4">
                                    <div className="bg-white dark:bg-gray-700 rounded-md px-3 py-1 text-xs text-gray-500 dark:text-gray-400">
                                        dashboard.muslimguard.com
                                    </div>
                                </div>
                            </div>
                            <Image
                                src="/images/dashboardstats.png"
                                className="w-full"
                                alt="Dashboard MuslimGuard - Statistiques de protection"
                                width={1207}
                                height={929}
                            />
                        </motion.div>

                        {/* Floating stats cards */}
                        <motion.div
                            className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-900 rounded-xl shadow-xl p-4 border border-emerald-100 dark:border-emerald-800 hidden md:block"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            animate={{ y: [0, -10, 0] }}
                            transition={{
                                opacity: { duration: 0.5, delay: 0.3 },
                                y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                            }}
                            whileHover={{ scale: 1.1, rotate: -2 }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                                    <Shield className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">98.7%</p>
                                    <p className="text-xs text-muted-foreground">Menaces bloquées</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="absolute -top-4 -right-4 bg-white dark:bg-gray-900 rounded-xl shadow-xl p-4 border border-blue-100 dark:border-blue-800 hidden md:block"
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            animate={{ y: [0, 10, 0] }}
                            transition={{
                                opacity: { duration: 0.5, delay: 0.4 },
                                y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                            }}
                            whileHover={{ scale: 1.1, rotate: 2 }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#003463]/10 text-[#003463]">
                                    <Activity className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold bg-gradient-to-r from-[#003463] to-blue-400 bg-clip-text text-transparent">24/7</p>
                                    <p className="text-xs text-muted-foreground">Protection active</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        className="space-y-8"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Mini stats */}
                        <div className="grid grid-cols-3 gap-4">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    className={`bg-white dark:bg-gray-900 rounded-xl p-4 border ${stat.borderColor} shadow-sm hover:shadow-lg transition-shadow`}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                >
                                    <stat.icon className={`h-5 w-5 ${stat.textColor} mb-2`} />
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                                    <motion.span
                                        className={`text-xs font-medium ${stat.trend.startsWith('+') ? 'text-red-500' : 'text-green-500'}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        {stat.trend}
                                    </motion.span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Features list */}
                        <div className="space-y-4">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className={`flex gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border ${feature.borderColor} hover:bg-gradient-to-r hover:from-${feature.color}-50/50 hover:to-transparent transition-all`}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                                    whileHover={{ scale: 1.02, x: 5 }}
                                >
                                    <motion.div
                                        className={`flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-xl ${feature.bgColor} ${feature.textColor}`}
                                        whileHover={{ rotate: 360, scale: 1.1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <feature.icon className="h-6 w-6" />
                                    </motion.div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
