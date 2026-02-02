'use client';

import { useActionState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { sendContactEmail, type ContactFormState } from './actions';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import FooterSection from '@/components/footer';

const initialState: ContactFormState = {};

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(
    sendContactEmail,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <main className="relative min-h-screen dark:bg-background">
      {/* Background decorative elements avec Muslim Guard blue (#003463) */}
      <div
        aria-hidden
        className="absolute inset-0 isolate overflow-hidden pointer-events-none"
      >
        {/* Large gradient orb - top left */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,52,99,0.15)_0%,rgba(0,52,99,0.05)_40%,transparent_70%)] blur-3xl" />
        {/* Medium gradient orb - top right */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,52,99,0.12)_0%,rgba(0,52,99,0.03)_50%,transparent_70%)] blur-2xl" />
        {/* Small accent orb - center */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[radial-gradient(ellipse,rgba(0,52,99,0.08)_0%,transparent_60%)] blur-3xl" />
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,52,99,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,52,99,0.08)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black_40%,transparent_100%)]" />
      </div>

      <section className="relative z-10 mx-auto max-w-4xl px-6 py-16 md:py-24">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#003463]/10 backdrop-blur-sm">
            <Mail className="h-8 w-8 text-[#003463]" />
          </div>
          <h1 className="text-balance text-4xl font-semibold md:text-5xl bg-gradient-to-r from-[#0C3E6A] via-blue-500 to-emerald-500 bg-clip-text text-transparent mb-4">
            Contactez-nous
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Une question ? N'hésitez pas à nous contacter.
            Nous vous répondrons dans les plus brefs délais.
          </p>
        </motion.div>

        {/* Contact Info & Form Container */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Email Info Card */}
          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="rounded-2xl border bg-card p-6 shadow-sm h-full flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#003463]/10">
                  <Mail className="h-5 w-5 text-[#003463]" />
                </div>
                <h3 className="font-semibold text-lg">Email</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-3">
                Vous préférez nous écrire directement ?
              </p>
              <Link
                href="mailto:contact@muslim-guard.com"
                className="text-[#003463] hover:underline font-medium break-all"
              >
                contact@muslim-guard.com
              </Link>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          >
            <form
              ref={formRef}
              action={formAction}
              className="rounded-2xl border bg-card p-6 md:p-8 shadow-sm"
            >
              <div className="space-y-6">
                {/* Success Message */}
                {state.success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 p-4"
                  >
                    <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-emerald-900 dark:text-emerald-100">
                        Message envoyé avec succès !
                      </p>
                      <p className="text-sm text-emerald-700 dark:text-emerald-300 mt-1">
                        Nous vous répondrons dans les plus brefs délais.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Error Message */}
                {state.error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 p-4"
                  >
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700 dark:text-red-300">
                      {state.error}
                    </p>
                  </motion.div>
                )}

                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Nom complet <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Votre nom"
                    required
                    disabled={isPending}
                    aria-invalid={!!state.fieldErrors?.name}
                  />
                  {state.fieldErrors?.name && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {state.fieldErrors.name[0]}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="votre@email.com"
                    required
                    disabled={isPending}
                    aria-invalid={!!state.fieldErrors?.email}
                  />
                  {state.fieldErrors?.email && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {state.fieldErrors.email[0]}
                    </p>
                  )}
                </div>

                {/* Subject Field */}
                <div className="space-y-2">
                  <Label htmlFor="subject">
                    Sujet <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="L'objet de votre message"
                    required
                    disabled={isPending}
                    aria-invalid={!!state.fieldErrors?.subject}
                  />
                  {state.fieldErrors?.subject && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {state.fieldErrors.subject[0]}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <Label htmlFor="message">
                    Message <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Votre message..."
                    required
                    disabled={isPending}
                    rows={6}
                    aria-invalid={!!state.fieldErrors?.message}
                  />
                  {state.fieldErrors?.message && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {state.fieldErrors.message[0]}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isPending}
                  className="w-full"
                >
                  {isPending ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Envoyer le message
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Back to Home */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link
            href="/"
            className="text-[#003463] hover:underline font-medium inline-flex items-center gap-2"
          >
            ← Retour à l'accueil
          </Link>
        </motion.div>
      </section>

      <FooterSection />
    </main>
  );
}
