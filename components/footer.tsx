'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const links = [
    {
        title: 'Fonctionnalités',
        href: '#features',
    },
    {
        title: 'Tarifs',
        href: '/pricing',
    },
    {
        title: 'FAQ',
        href: '#faq',
    },
    {
        title: 'Contact',
        href: '#contact',
    },
    {
        title: 'Mentions légales',
        href: '#',
    },
    {
        title: 'Confidentialité',
        href: '#',
    },
]

const socialLinks = [
    {
        name: 'Facebook',
        href: '#',
        icon: (
            <svg className="size-6" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"></path>
            </svg>
        ),
        color: 'hover:text-blue-600 dark:hover:text-blue-400'
    },
    {
        name: 'Instagram',
        href: '#',
        icon: (
            <svg className="size-6" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"></path>
            </svg>
        ),
        color: 'hover:text-pink-600 dark:hover:text-pink-400'
    },
    {
        name: 'YouTube',
        href: '#',
        icon: (
            <svg className="size-6" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="currentColor" d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73"></path>
            </svg>
        ),
        color: 'hover:text-red-600 dark:hover:text-red-400'
    },
    {
        name: 'Email',
        href: 'mailto:contact@muslimguard.com',
        icon: (
            <svg className="size-6" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4l-8 5l-8-5V6l8 5l8-5z"></path>
            </svg>
        ),
        color: 'hover:text-green-600 dark:hover:text-green-400'
    }
]

export default function FooterSection() {
    return (
        <footer className="relative overflow-hidden border-t border-border/50 bg-gradient-to-b from-background via-[#003463]/5 to-background py-16 md:py-20">
            {/* Animated background gradients */}
            <motion.div
                className="absolute left-1/4 top-0 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-[#003463]/10 via-blue-500/10 to-transparent blur-3xl"
                animate={{
                    scale: [1, 1.3, 1],
                    x: [0, 30, 0],
                    y: [0, -20, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute right-1/4 top-1/3 h-[350px] w-[350px] rounded-full bg-gradient-to-bl from-purple-500/10 via-pink-500/10 to-transparent blur-3xl"
                animate={{
                    scale: [1.3, 1, 1.3],
                    x: [0, -30, 0],
                    y: [0, 20, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <div className="relative mx-auto max-w-5xl px-6">
                {/* Logo with hover animation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <Link
                        href="/"
                        aria-label="Accueil"
                        className="group mx-auto flex items-center justify-center gap-2"
                    >
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Image
                                src="/images/logo.png"
                                alt="Muslim Guard"
                                width={40}
                                height={40}
                                className="h-10 w-10"
                            />
                        </motion.div>
                        <motion.span
                            className="bg-gradient-to-r from-[#003463] via-blue-600 to-[#003463] bg-clip-text text-xl font-semibold text-transparent"
                            style={{ backgroundSize: "200% auto" }}
                            whileHover={{
                                backgroundPosition: ["0% 50%", "100% 50%"],
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            Muslim Guard
                        </motion.span>
                    </Link>
                </motion.div>

                {/* Tagline with gradient animation */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-4 text-center text-sm text-muted-foreground"
                >
                    Le contrôle parental conçu pour les familles musulmanes
                </motion.p>

                {/* Navigation links with stagger animation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="my-8 flex flex-wrap justify-center gap-6 text-sm"
                >
                    {links.map((link, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                            whileHover={{ y: -2 }}
                        >
                            <Link
                                href={link.href}
                                className="group relative block text-muted-foreground transition-colors duration-200 hover:text-[#003463]"
                            >
                                <span className="relative">
                                    {link.title}
                                    <motion.span
                                        className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-[#003463] to-blue-500 transition-all duration-300 group-hover:w-full"
                                    />
                                </span>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Social links with individual animations */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="my-8 flex flex-wrap justify-center gap-6 text-sm"
                >
                    {socialLinks.map((social, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.4,
                                delay: 0.6 + index * 0.1,
                                type: "spring",
                                stiffness: 200
                            }}
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Link
                                href={social.href}
                                target={social.name !== 'Email' ? "_blank" : undefined}
                                rel={social.name !== 'Email' ? "noopener noreferrer" : undefined}
                                aria-label={social.name}
                                className={`relative block text-muted-foreground transition-colors duration-200 ${social.color}`}
                            >
                                <motion.div
                                    className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#003463]/20 to-blue-500/20 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100"
                                />
                                <span className="relative">{social.icon}</span>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Divider with animation */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="mx-auto my-8 h-px w-full max-w-md bg-gradient-to-r from-transparent via-border to-transparent"
                />

                {/* Copyright with fade-in */}
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="block text-center text-sm text-muted-foreground"
                >
                    © {new Date().getFullYear()} Muslim Guard. Tous droits réservés.
                </motion.span>
            </div>
        </footer>
    )
}
