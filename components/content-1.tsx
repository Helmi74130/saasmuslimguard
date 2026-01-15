import Image from 'next/image'
import { BarChart3, Shield, Eye, Clock, TrendingUp, Activity } from 'lucide-react'

const stats = [
    {
        icon: Shield,
        value: '1,247',
        label: 'Sites bloqués ce mois',
        trend: '+12%',
    },
    {
        icon: Eye,
        value: '89',
        label: 'Tentatives aujourd\'hui',
        trend: '-5%',
    },
    {
        icon: Clock,
        value: '2h 34m',
        label: 'Temps d\'écran moyen',
        trend: '-18%',
    },
]

const features = [
    {
        icon: BarChart3,
        title: 'Statistiques détaillées',
        description: 'Visualisez les sites bloqués par catégorie, par jour et par enfant.',
    },
    {
        icon: TrendingUp,
        title: 'Évolution du comportement',
        description: 'Suivez les tendances et adaptez la protection selon les besoins.',
    },
    {
        icon: Activity,
        title: 'Activité en temps réel',
        description: 'Recevez des alertes instantanées sur les tentatives d\'accès.',
    },
]

export default function ContentSectionOne() {
    return (
        <section className="relative py-20 md:py-28 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-[#003463]/5 blur-3xl translate-x-1/2 -translate-y-1/2" />
            </div>

            <div className="relative mx-auto max-w-6xl px-6">
                {/* Header */}
                <div className="max-w-2xl mb-16">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#003463]/10 px-4 py-2 text-sm font-medium text-[#003463] mb-6">
                        <BarChart3 className="h-4 w-4" />
                        <span>Dashboard</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#003463]">
                        Gardez le contrôle avec des statistiques claires
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Votre tableau de bord vous offre une vue complète de l'activité de navigation de vos enfants et de l'efficacité de la protection.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Dashboard Image */}
                    <div className="relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">
                            {/* Browser bar mockup */}
                            <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
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
                        </div>

                        {/* Floating stats cards */}
                        <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-900 rounded-xl shadow-xl p-4 border border-gray-100 dark:border-gray-800 hidden md:block">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
                                    <Shield className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">98.7%</p>
                                    <p className="text-xs text-muted-foreground">Menaces bloquées</p>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-900 rounded-xl shadow-xl p-4 border border-gray-100 dark:border-gray-800 hidden md:block">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#003463]/10 text-[#003463]">
                                    <Activity className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">24/7</p>
                                    <p className="text-xs text-muted-foreground">Protection active</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-8">
                        {/* Mini stats */}
                        <div className="grid grid-cols-3 gap-4">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm"
                                >
                                    <stat.icon className="h-5 w-5 text-[#003463] mb-2" />
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                                    <span className={`text-xs font-medium ${stat.trend.startsWith('+') ? 'text-red-500' : 'text-green-500'}`}>
                                        {stat.trend}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Features list */}
                        <div className="space-y-4">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 hover:bg-[#003463]/5 transition-colors"
                                >
                                    <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-[#003463]/10 text-[#003463]">
                                        <feature.icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
