import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CallToAction() {
    return (
        <section className="py-16">
            <div className="mx-auto max-w-5xl rounded-3xl border px-6 py-12 md:py-20 lg:py-32">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
                        Protégez vos enfants dès aujourd’hui
                    </h2>
                    <p className="mt-4 text-muted-foreground">
                        Activez MuslimGuard et offrez un environnement numérique sain,
                        aligné avec nos valeurs.
                    </p>

                    <div className="mt-12 flex justify-center">
                        <Button asChild size="lg">
                            <Link href="/install">
                                <span>Installer MuslimGuard</span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
