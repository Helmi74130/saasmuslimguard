import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star, Quote, Users } from 'lucide-react'

const testimonials = [
    {
        id: 1,
        content: "MuslimGuard a complètement changé notre quotidien. Nous savons que nos enfants sont protégés en ligne, et surtout que les temps de prière sont respectés sans avoir besoin d'intervenir constamment.",
        author: "Ahmed H.",
        role: "Père de 3 enfants",
        location: "Paris",
        avatar: "/avatars/parent-1.png",
        initials: "AH",
        rating: 5,
    },
    {
        id: 2,
        content: "Enfin un outil qui comprend nos valeurs ! L'installation était simple et mes enfants ne peuvent pas le désactiver. Je recommande à toutes les familles musulmanes.",
        author: "Fatima K.",
        role: "Mère de 2 enfants",
        location: "Lyon",
        avatar: "/avatars/parent-2.png",
        initials: "FK",
        rating: 5,
    },
    {
        id: 3,
        content: "Le blocage intelligent est impressionnant. Il détecte même les contenus inappropriés sur les réseaux sociaux. Mes adolescents sont protégés sans se sentir surveillés.",
        author: "Youssef M.",
        role: "Père de 2 adolescents",
        location: "Marseille",
        avatar: "/avatars/parent-3.png",
        initials: "YM",
        rating: 5,
    },
    {
        id: 4,
        content: "Je cherchais une solution depuis longtemps. MuslimGuard est exactement ce qu'il nous fallait. Le fait que les données restent locales me rassure beaucoup.",
        author: "Amina B.",
        role: "Mère de 4 enfants",
        location: "Toulouse",
        avatar: "/avatars/parent-4.png",
        initials: "AB",
        rating: 5,
    },
]

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
                />
            ))}
        </div>
    )
}

export default function TestimonialsSection() {
    return (
        <section className="relative py-20 md:py-28 overflow-hidden bg-[#003463]">
            {/* Background decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl -translate-y-1/2" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl translate-y-1/2" />
                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
            </div>

            <div className="relative mx-auto max-w-6xl px-4 md:px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 mb-6">
                        <Users className="h-4 w-4" />
                        <span>Témoignages</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                        Ce que disent nos familles
                    </h2>
                    <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
                        Des milliers de familles musulmanes font confiance à MuslimGuard pour protéger leurs enfants
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="group relative bg-white rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Quote icon */}
                            <div className="absolute -top-4 -left-2 md:-left-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#003463] text-white shadow-lg">
                                    <Quote className="h-5 w-5" />
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="mb-4 pt-2">
                                <StarRating rating={testimonial.rating} />
                            </div>

                            {/* Content */}
                            <blockquote className="mb-6">
                                <p className="text-gray-700 leading-relaxed">
                                    "{testimonial.content}"
                                </p>
                            </blockquote>

                            {/* Author */}
                            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                                <Avatar className="h-12 w-12 ring-2 ring-[#003463]/10">
                                    <AvatarImage
                                        src={testimonial.avatar}
                                        alt={testimonial.author}
                                    />
                                    <AvatarFallback className="bg-[#003463]/10 text-[#003463] font-semibold">
                                        {testimonial.initials}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <cite className="not-italic font-semibold text-gray-900">
                                        {testimonial.author}
                                    </cite>
                                    <p className="text-sm text-muted-foreground">
                                        {testimonial.role} · {testimonial.location}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <p className="text-4xl md:text-5xl font-bold text-white">5000+</p>
                        <p className="mt-2 text-white/70">Familles protégées</p>
                    </div>
                    <div className="text-center">
                        <p className="text-4xl md:text-5xl font-bold text-white">4.9/5</p>
                        <p className="mt-2 text-white/70">Note moyenne</p>
                    </div>
                    <div className="text-center">
                        <p className="text-4xl md:text-5xl font-bold text-white">1M+</p>
                        <p className="mt-2 text-white/70">Contenus bloqués</p>
                    </div>
                    <div className="text-center">
                        <p className="text-4xl md:text-5xl font-bold text-white">24/7</p>
                        <p className="mt-2 text-white/70">Protection active</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
