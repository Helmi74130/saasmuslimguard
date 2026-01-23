'use client';

import { motion } from 'framer-motion';
import { Shield, ShieldBan, Eye, Moon, Lock, Clock, Users, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import CallToAction from '@/components/call-to-action';
import FooterSection from '@/components/footer';
import type { Metadata } from 'next';

export default function FeaturesPage() {
  return (
    <main className="relative min-h-screen dark:bg-background">
      {/* Background decorative elements */}
      <div
        aria-hidden
        className="absolute inset-0 isolate overflow-hidden pointer-events-none"
      >
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,52,99,0.15)_0%,rgba(0,52,99,0.05)_40%,transparent_70%)] blur-3xl" />
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,52,99,0.12)_0%,rgba(0,52,99,0.03)_50%,transparent_70%)] blur-2xl" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[radial-gradient(ellipse,rgba(0,52,99,0.08)_0%,transparent_60%)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,52,99,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,52,99,0.08)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black_40%,transparent_100%)]" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-16 md:py-24">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#003463]/10 backdrop-blur-sm">
            <Shield className="h-8 w-8 text-[#003463]" />
          </div>
          <h1 className="text-balance text-4xl font-semibold md:text-5xl bg-gradient-to-r from-[#0C3E6A] via-blue-500 to-emerald-500 bg-clip-text text-transparent mb-4">
            6 fonctionnalités puissantes pour protéger vos enfants
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Découvrez comment MuslimGuard combine protection intelligente et respect des valeurs islamiques pour créer un environnement numérique sain.
          </p>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-8 md:py-16">
        <div className="space-y-24">
          {/* Feature 1: Custom Blocking */}
          <motion.div
            className="grid md:grid-cols-2 gap-8 items-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="order-2 md:order-1">
              {/* Visual Animation */}
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden border-2 border-red-200/50 dark:border-red-800/50 min-h-[240px] shadow-lg">
                {/* Browser header */}
                <div className="bg-gray-200 dark:bg-gray-700 px-4 py-3 flex items-center gap-3 border-b border-gray-300 dark:border-gray-600">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-1 bg-white dark:bg-gray-600 rounded px-3 py-1">
                    <p className="text-xs text-gray-500 dark:text-gray-300">haram-site.com</p>
                  </div>
                </div>

                {/* Browser content */}
                <div className="relative h-40 p-4">
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
                  </div>

                  {/* Blocking overlay animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-red-500/90 via-red-600/95 to-red-700/90 flex flex-col items-center justify-center"
                    initial={{ top: '-100%' }}
                    animate={{ top: 0 }}
                    transition={{
                      duration: 1,
                      delay: 1.5,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: 'easeInOut',
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: 2.5,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                    >
                      <ShieldBan className="h-12 w-12 text-white mb-2" />
                    </motion.div>
                    <motion.p
                      className="text-white text-sm font-bold tracking-wider"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: 2.7,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                    >
                      BLOQUÉ
                    </motion.p>
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 dark:bg-red-950/30">
                  <ShieldBan className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold text-[#003463]">
                  Bloquez ce que VOUS jugez inacceptable
                </h2>
              </div>
              <p className="text-muted-foreground text-base mb-6">
                Contrairement aux contrôles parentaux traditionnels qui imposent des listes prédéfinies souvent mal adaptées à nos valeurs, MuslimGuard vous donne le pouvoir total. Choisissez précisément les sites et types de contenus à bloquer selon votre sensibilité et vos principes islamiques.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Blocage personnalisé selon vos valeurs, pas celles d'une entreprise</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Ajoutez ou retirez des sites en quelques clics</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Protégez contre le haram, les réseaux sociaux inappropriés, ou tout autre contenu</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Feature 2: Keyword Detection */}
          <motion.div
            className="grid md:grid-cols-2 gap-8 items-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="order-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950/30">
                  <Eye className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold text-[#003463]">
                  Détection de mots-clés en temps réel
                </h2>
              </div>
              <p className="text-muted-foreground text-base mb-6">
                La technologie de surveillance en temps réel de MuslimGuard analyse chaque page visitée. Dès qu'un mot-clé que vous avez défini apparaît, la navigation est instantanément bloquée, même sur des sites non listés. Une protection dynamique et proactive.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Surveillance active de tous les contenus, même sur sites autorisés</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Réponse instantanée dès la détection d'un mot interdit</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Configurez votre propre liste de mots sensibles</span>
                </li>
              </ul>
            </div>

            <div className="order-2">
              {/* Visual Animation */}
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border-2 border-purple-200/50 dark:border-purple-800/50 overflow-hidden min-h-[240px] shadow-lg">
                <div className="space-y-3 text-xs relative z-10">
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                  <div className="flex gap-2 items-center">
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
                    <motion.span
                      className="px-2 py-1 bg-red-500/20 text-red-600 dark:text-red-400 rounded text-xs font-medium border border-red-500/30"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: [0, 1, 1, 1], scale: [0.8, 1.1, 1, 1] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                    >
                      mot détecté
                    </motion.span>
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded flex-1"></div>
                  </div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
                </div>

                {/* Scanning line animation */}
                <motion.div
                  className="absolute inset-x-0 h-12 bg-gradient-to-b from-purple-500/30 via-purple-400/50 to-purple-500/30 blur-sm"
                  initial={{ top: '-3rem' }}
                  animate={{ top: '100%' }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                    repeatDelay: 1,
                  }}
                />
                <motion.div
                  className="absolute inset-x-0 h-0.5 bg-purple-500"
                  initial={{ top: '-0.5rem' }}
                  animate={{ top: '100%' }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                    repeatDelay: 1,
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Feature 3: Prayer Pause */}
          <motion.div
            className="grid md:grid-cols-2 gap-8 items-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="order-2 md:order-1">
              {/* Visual Animation */}
              <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-2xl p-8 border-2 border-amber-200/50 dark:border-amber-800/50 overflow-hidden min-h-[240px] shadow-lg">
                {/* Clock circle */}
                <div className="relative mx-auto w-32 h-32 rounded-full border-4 border-amber-300 dark:border-amber-700 bg-white dark:bg-gray-800">
                  <div className="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-amber-600 rounded-full z-10"></div>

                  {/* Hour hand */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 origin-bottom w-1.5 h-10 bg-amber-600 rounded-full"
                    style={{ translateX: '-50%', translateY: '-100%' }}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />

                  {/* Minute hand */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 origin-bottom w-1 h-12 bg-amber-500 rounded-full"
                    style={{ translateX: '-50%', translateY: '-100%' }}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />

                  {/* Prayer time markers */}
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-3 bg-amber-400 rounded"></div>
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-3 bg-amber-400 rounded"></div>
                  <div className="absolute left-1 top-1/2 -translate-y-1/2 w-3 h-1 bg-amber-400 rounded"></div>
                  <div className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-1 bg-amber-400 rounded"></div>
                </div>

                {/* Prayer pause overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-amber-600/80 via-amber-500/90 to-orange-600/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.8] }}
                  transition={{
                    duration: 4,
                    delay: 2,
                    repeat: Infinity,
                    repeatDelay: 2,
                    times: [0, 0.2, 0.8, 1],
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{
                      duration: 2,
                      delay: 2.2,
                      repeat: Infinity,
                      repeatDelay: 4,
                    }}
                  >
                    <Moon className="h-14 w-14 text-white mb-3" />
                  </motion.div>
                  <p className="text-white text-sm font-bold tracking-wider">PAUSE PRIÈRE</p>
                  <p className="text-white/90 text-xs mt-1">Internet en pause</p>
                </motion.div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-950/30">
                  <Moon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold text-[#003463]">
                  Pause automatique pendant les prières
                </h2>
              </div>
              <p className="text-muted-foreground text-base mb-6">
                MuslimGuard est le premier et seul contrôle parental à intégrer les horaires de prière. Internet est automatiquement mis en pause pendant les heures de prière selon votre ville, aidant vos enfants à prioriser leurs obligations religieuses sans distraction.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Configuration automatique selon votre ville et fuseau horaire</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Renforce la discipline spirituelle de vos enfants</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Aucune intervention manuelle nécessaire</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Feature 4: Local Data */}
          <motion.div
            className="grid md:grid-cols-2 gap-8 items-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="order-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 dark:bg-rose-950/30">
                  <Lock className="h-6 w-6 text-rose-600 dark:text-rose-400" />
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold text-[#003463]">
                  Vos données restent chez vous
                </h2>
              </div>
              <p className="text-muted-foreground text-base mb-6">
                Zéro serveur externe, zéro collecte cachée. Tous vos paramètres, règles de navigation et mots-clés sont stockés uniquement sur votre ordinateur local. MuslimGuard fonctionne de manière totalement transparente, respectant votre vie privée comme un principe fondamental.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Aucune donnée n'est envoyée à des serveurs tiers</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Protection locale 100% sécurisée</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Conformité totale avec le respect de la vie privée</span>
                </li>
              </ul>
            </div>

            <div className="order-2">
              {/* Visual Animation */}
              <div className="relative bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20 rounded-2xl p-8 border-2 border-rose-200/50 dark:border-rose-800/50 overflow-hidden min-h-[240px] shadow-lg flex items-center justify-center">
                {/* Local Computer (left side) */}
                <div className="absolute left-12">
                  <motion.div
                    className="relative"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      times: [0, 0.1, 0.2],
                    }}
                  >
                    <svg className="w-20 h-20 text-rose-600 dark:text-rose-400" fill="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="12" rx="1" opacity="0.9" />
                      <rect x="5" y="6" width="14" height="8" fill="white" opacity="0.3" />
                      <path d="M2 18h20v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-1z" />
                      <rect x="10" y="17" width="4" height="1" opacity="0.6" />
                    </svg>

                    <motion.div
                      className="absolute -top-2 -right-2"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 4,
                      }}
                    >
                      <div className="bg-green-500 rounded-full p-1.5">
                        <Lock className="w-4 h-4 text-white" />
                      </div>
                    </motion.div>

                    <motion.div
                      className="absolute inset-0 rounded-full blur-xl"
                      style={{
                        background: 'radial-gradient(circle, rgba(34, 197, 94, 0.4) 0%, transparent 70%)',
                      }}
                      animate={{
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                    />
                  </motion.div>
                </div>

                {/* Data particles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-rose-500 rounded-full"
                    initial={{
                      left: '35%',
                      top: '50%',
                      opacity: 0,
                      scale: 0,
                    }}
                    animate={{
                      left: ['35%', '50%', '50%'],
                      top: ['50%', `${48 + i * 1}%`, `${48 + i * 1}%`],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      delay: 0.5 + i * 0.15,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: 'easeOut',
                    }}
                  />
                ))}

                {/* Cloud Server (right side) */}
                <div className="absolute right-12">
                  <motion.div
                    className="relative"
                    animate={{
                      opacity: [1, 1, 0.3, 0.3],
                      scale: [1, 1, 0.9, 0.9],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      times: [0, 0.2, 0.3, 1],
                    }}
                  >
                    <svg className="w-16 h-16 text-rose-400 dark:text-rose-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 18H5c-1.7 0-3-1.3-3-3s1.3-3 3-3c0-3.3 2.7-6 6-6 2.8 0 5.1 1.9 5.8 4.5.3-.1.6-.1 1-.1 1.7 0 3 1.3 3 3s-1.3 3-3 3z" />
                      <rect x="8" y="14" width="2" height="2" opacity="0.6" />
                      <rect x="12" y="14" width="2" height="2" opacity="0.6" />
                    </svg>
                  </motion.div>

                  {/* Red X */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 0, 1, 1],
                      scale: [0, 0, 1.2, 1],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      times: [0, 0.2, 0.3, 0.35],
                    }}
                  >
                    <svg className="w-20 h-20 text-red-500" fill="none" stroke="currentColor" strokeWidth="3">
                      <line x1="2" y1="2" x2="22" y2="22" />
                      <line x1="22" y1="2" x2="2" y2="22" />
                    </svg>
                  </motion.div>
                </div>

                {/* Blocked shield */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 0, 1, 1, 0.7],
                    scale: [0, 0, 1.2, 1, 1],
                    rotate: [0, 0, 10, 0, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    times: [0, 0.25, 0.35, 0.4, 1],
                  }}
                >
                  <div className="bg-red-500 rounded-full p-3 shadow-lg">
                    <ShieldBan className="w-8 h-8 text-white" />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Feature 5: Time Controls */}
          <motion.div
            className="grid md:grid-cols-2 gap-8 items-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="order-2 md:order-1">
              {/* Visual Animation */}
              <div className="relative bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20 rounded-2xl p-8 border-2 border-teal-200/50 dark:border-teal-800/50 overflow-hidden min-h-[240px] shadow-lg">
                <div className="flex items-center justify-center gap-8">
                  {/* Clock with colored time zones */}
                  <div className="relative">
                    <div className="relative w-28 h-28 rounded-full border-4 border-teal-300 dark:border-teal-700 bg-white dark:bg-gray-800">
                      {/* Colored segments */}
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

                      <div className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-teal-600 rounded-full z-20"></div>

                      {/* Hour markers */}
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-2 bg-teal-400 rounded"></div>
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-2 bg-teal-400 rounded"></div>
                      <div className="absolute left-1 top-1/2 -translate-y-1/2 w-2 h-1 bg-teal-400 rounded"></div>
                      <div className="absolute right-1 top-1/2 -translate-y-1/2 w-2 h-1 bg-teal-400 rounded"></div>

                      {/* Rotating clock hand */}
                      <motion.div
                        className="absolute top-1/2 left-1/2 origin-bottom w-1 h-11 bg-teal-600 rounded-full z-10"
                        style={{ translateX: '-50%', translateY: '-100%' }}
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />

                      {/* Digital time */}
                      <motion.div
                        className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold"
                        animate={{
                          color: ['#22c55e', '#22c55e', '#ef4444', '#ef4444'],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          times: [0, 0.5, 0.5, 1],
                        }}
                      >
                        <motion.span
                          animate={{
                            opacity: [1, 1, 0, 0],
                          }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            times: [0, 0.5, 0.5, 1],
                          }}
                        >
                          12:00
                        </motion.span>
                        <motion.span
                          className="absolute left-0"
                          animate={{
                            opacity: [0, 0, 1, 1],
                          }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            times: [0, 0.5, 0.5, 1],
                          }}
                        >
                          16:00
                        </motion.span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Traffic Light */}
                  <div className="relative">
                    <div className="bg-gray-800 dark:bg-gray-900 rounded-lg p-2 w-14 shadow-lg border border-gray-700">
                      {/* Red light */}
                      <motion.div
                        className="w-10 h-10 rounded-full mb-2 border-2"
                        animate={{
                          backgroundColor: [
                            'rgba(239, 68, 68, 0.2)',
                            'rgba(239, 68, 68, 0.2)',
                            'rgba(239, 68, 68, 1)',
                            'rgba(239, 68, 68, 1)',
                          ],
                          borderColor: [
                            'rgba(239, 68, 68, 0.3)',
                            'rgba(239, 68, 68, 0.3)',
                            'rgba(239, 68, 68, 1)',
                            'rgba(239, 68, 68, 1)',
                          ],
                          boxShadow: [
                            '0 0 0px rgba(239, 68, 68, 0)',
                            '0 0 0px rgba(239, 68, 68, 0)',
                            '0 0 15px rgba(239, 68, 68, 0.8)',
                            '0 0 15px rgba(239, 68, 68, 0.8)',
                          ],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          times: [0, 0.3, 0.5, 1],
                          ease: 'linear',
                        }}
                      />

                      {/* Green light */}
                      <motion.div
                        className="w-10 h-10 rounded-full border-2"
                        animate={{
                          backgroundColor: [
                            'rgba(34, 197, 94, 1)',
                            'rgba(34, 197, 94, 1)',
                            'rgba(34, 197, 94, 0.2)',
                            'rgba(34, 197, 94, 0.2)',
                          ],
                          borderColor: [
                            'rgba(34, 197, 94, 1)',
                            'rgba(34, 197, 94, 1)',
                            'rgba(34, 197, 94, 0.3)',
                            'rgba(34, 197, 94, 0.3)',
                          ],
                          boxShadow: [
                            '0 0 15px rgba(34, 197, 94, 0.8)',
                            '0 0 15px rgba(34, 197, 94, 0.8)',
                            '0 0 0px rgba(34, 197, 94, 0)',
                            '0 0 0px rgba(34, 197, 94, 0)',
                          ],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          times: [0, 0.3, 0.5, 1],
                          ease: 'linear',
                        }}
                      />
                    </div>

                    {/* Status label */}
                    <motion.div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold whitespace-nowrap">
                      <motion.span
                        className="text-green-500"
                        animate={{
                          opacity: [1, 1, 0, 0],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          times: [0, 0.3, 0.3, 1],
                        }}
                      >
                        ✓ AUTORISÉ
                      </motion.span>
                      <motion.span
                        className="absolute left-0 text-red-500"
                        animate={{
                          opacity: [0, 0, 1, 1],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          times: [0, 0.3, 0.3, 1],
                        }}
                      >
                        ✕ BLOQUÉ
                      </motion.span>
                    </motion.div>
                  </div>
                </div>

                {/* Time range indicators */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-4 text-[10px]">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-600 dark:text-gray-400">12h-16h</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 dark:bg-teal-950/30">
                  <Clock className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold text-[#003463]">
                  Définissez des plages horaires d'accès
                </h2>
              </div>
              <p className="text-muted-foreground text-base mb-6">
                Prenez le contrôle du temps d'écran avec des plages horaires personnalisables. Définissez quand Internet est accessible et quand il doit être bloqué : après les devoirs, avant le coucher, pendant les repas. Un équilibre sain entre vie numérique et réalité.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Plages horaires flexibles par jour de la semaine</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Blocage automatique en dehors des heures autorisées</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Favorise la discipline et l'équilibre de vie</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Feature 6: Unlimited Devices */}
          <motion.div
            className="grid md:grid-cols-2 gap-8 items-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="order-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-950/30">
                  <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold text-[#003463]">
                  Nombre d'appareils illimité
                </h2>
              </div>
              <p className="text-muted-foreground text-base mb-6">
                Un seul compte MuslimGuard protège tous les ordinateurs de votre foyer. PC, Mac, portables de chaque enfant : appliquez vos règles partout, sans limite d'appareils et sans coût supplémentaire. (Note : non compatible avec les smartphones.)
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Protection cohérente sur tous les ordinateurs familiaux</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Aucune limite d'appareils, aucun surcoût</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Gestion centralisée depuis un seul tableau de bord</span>
                </li>
              </ul>
            </div>

            <div className="order-2">
              {/* Visual Animation */}
              <div className="relative bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/20 dark:to-violet-950/20 rounded-2xl p-8 border-2 border-indigo-200/50 dark:border-indigo-800/50 overflow-hidden min-h-[240px] shadow-lg flex items-center justify-center">
                {/* Central Computer */}
                <div className="relative z-10">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 4,
                    }}
                  >
                    <svg className="w-20 h-20 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="12" rx="1" opacity="0.9" />
                      <rect x="5" y="6" width="14" height="8" fill="white" opacity="0.3" />
                      <path d="M2 18h20v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-1z" />
                      <rect x="10" y="17" width="4" height="1" opacity="0.6" />
                    </svg>
                  </motion.div>

                  {/* Pulse ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-indigo-400"
                    animate={{
                      scale: [1, 2, 2],
                      opacity: [0.6, 0.2, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 4,
                    }}
                  />
                </div>

                {/* Cloned computers - Top Left */}
                <motion.div
                  className="absolute"
                  style={{ top: '15%', left: '15%' }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 0, 1, 1, 1],
                    scale: [0, 0, 1, 1, 1],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    times: [0, 0.15, 0.25, 0.85, 1],
                  }}
                >
                  <svg className="w-12 h-12 text-indigo-500 dark:text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="12" rx="1" opacity="0.9" />
                    <rect x="5" y="6" width="14" height="8" fill="white" opacity="0.3" />
                    <path d="M2 18h20v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-1z" />
                  </svg>
                </motion.div>

                {/* Cloned computers - Top Right */}
                <motion.div
                  className="absolute"
                  style={{ top: '15%', right: '15%' }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 0, 0, 1, 1, 1],
                    scale: [0, 0, 0, 1, 1, 1],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    times: [0, 0.25, 0.35, 0.45, 0.85, 1],
                  }}
                >
                  <svg className="w-12 h-12 text-indigo-500 dark:text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="12" rx="1" opacity="0.9" />
                    <rect x="5" y="6" width="14" height="8" fill="white" opacity="0.3" />
                    <path d="M2 18h20v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-1z" />
                  </svg>
                </motion.div>

                {/* Cloned computers - Bottom Left */}
                <motion.div
                  className="absolute"
                  style={{ bottom: '15%', left: '15%' }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 0, 0, 0, 1, 1, 1],
                    scale: [0, 0, 0, 0, 1, 1, 1],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    times: [0, 0.35, 0.45, 0.5, 0.6, 0.85, 1],
                  }}
                >
                  <svg className="w-12 h-12 text-indigo-500 dark:text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="12" rx="1" opacity="0.9" />
                    <rect x="5" y="6" width="14" height="8" fill="white" opacity="0.3" />
                    <path d="M2 18h20v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-1z" />
                  </svg>
                </motion.div>

                {/* Cloned computers - Bottom Right */}
                <motion.div
                  className="absolute"
                  style={{ bottom: '15%', right: '15%' }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 0, 0, 0, 0, 1, 1, 1],
                    scale: [0, 0, 0, 0, 0, 1, 1, 1],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    times: [0, 0.45, 0.5, 0.55, 0.6, 0.7, 0.85, 1],
                  }}
                >
                  <svg className="w-12 h-12 text-indigo-500 dark:text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="12" rx="1" opacity="0.9" />
                    <rect x="5" y="6" width="14" height="8" fill="white" opacity="0.3" />
                    <path d="M2 18h20v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-1z" />
                  </svg>
                </motion.div>

                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
                  <motion.line
                    x1="50%"
                    y1="50%"
                    x2="25%"
                    y2="25%"
                    stroke="rgba(99, 102, 241, 0.3)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: [0, 0, 1, 1],
                      opacity: [0, 0, 0.5, 0.5],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      times: [0, 0.15, 0.25, 1],
                    }}
                  />
                  <motion.line
                    x1="50%"
                    y1="50%"
                    x2="75%"
                    y2="25%"
                    stroke="rgba(99, 102, 241, 0.3)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: [0, 0, 0, 1, 1],
                      opacity: [0, 0, 0, 0.5, 0.5],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      times: [0, 0.25, 0.35, 0.45, 1],
                    }}
                  />
                  <motion.line
                    x1="50%"
                    y1="50%"
                    x2="25%"
                    y2="75%"
                    stroke="rgba(99, 102, 241, 0.3)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: [0, 0, 0, 0, 1, 1],
                      opacity: [0, 0, 0, 0, 0.5, 0.5],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      times: [0, 0.45, 0.5, 0.55, 0.65, 1],
                    }}
                  />
                  <motion.line
                    x1="50%"
                    y1="50%"
                    x2="75%"
                    y2="75%"
                    stroke="rgba(99, 102, 241, 0.3)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: [0, 0, 0, 0, 0, 1, 1],
                      opacity: [0, 0, 0, 0, 0, 0.5, 0.5],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      times: [0, 0.55, 0.6, 0.65, 0.7, 0.8, 1],
                    }}
                  />
                </svg>

                {/* Counter display */}
                <div className="absolute top-3 right-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  <motion.span>
                    <motion.span
                      animate={{
                        opacity: [1, 1, 0, 0, 0, 0, 0],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        times: [0, 0.15, 0.2, 0.3, 0.4, 0.5, 1],
                      }}
                    >
                      1
                    </motion.span>
                    <motion.span
                      className="absolute left-3"
                      animate={{
                        opacity: [0, 0, 1, 1, 0, 0, 0],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        times: [0, 0.2, 0.25, 0.35, 0.4, 0.5, 1],
                      }}
                    >
                      2
                    </motion.span>
                    <motion.span
                      className="absolute left-3"
                      animate={{
                        opacity: [0, 0, 0, 0, 1, 1, 0, 0],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        times: [0, 0.35, 0.4, 0.45, 0.5, 0.6, 0.65, 1],
                      }}
                    >
                      3
                    </motion.span>
                    <motion.span
                      className="absolute left-3"
                      animate={{
                        opacity: [0, 0, 0, 0, 0, 0, 1, 1, 0],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        times: [0, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 1],
                      }}
                    >
                      4
                    </motion.span>
                    <motion.span
                      className="absolute left-3"
                      animate={{
                        opacity: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        times: [0, 0.75, 0.8, 0.82, 0.84, 0.86, 0.88, 0.9, 0.92, 1],
                      }}
                    >
                      ∞
                    </motion.span>
                  </motion.span>
                </div>

                {/* "Illimité" badge */}
                <motion.div
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                    y: [10, 10, 10, 10, 10, 10, 10, 10, 0, 0],
                    scale: [0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 1.1, 1],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    times: [0, 0.75, 0.8, 0.82, 0.84, 0.86, 0.88, 0.9, 0.92, 0.95],
                  }}
                >
                  ILLIMITÉ
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="relative z-10">
        <CallToAction />
      </div>

      {/* Back to Home */}
      <div className="relative z-10 text-center py-12">
        <Link
          href="/"
          className="text-[#003463] hover:underline font-medium inline-flex items-center gap-2"
        >
          ← Retour à l'accueil
        </Link>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <FooterSection />
      </div>
    </main>
  );
}
