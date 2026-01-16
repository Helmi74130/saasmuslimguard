'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import { requestPasswordReset } from '../actions';
import { ActionState } from '@/lib/auth/middleware';

export default function ForgotPasswordPage() {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    requestPasswordReset,
    { error: '' }
  );

  return (
    <div className="min-h-[100dvh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Image
            src="/images/logo.png"
            alt="Muslim Guard"
            width={64}
            height={64}
            className="h-16 w-16"
          />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#003463]">
          Mot de passe oublié ?
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Entrez votre email et nous vous enverrons un lien pour réinitialiser
          votre mot de passe.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {state?.success ? (
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center">
              <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Email envoyé !
              </h3>
              <p className="mt-2 text-sm text-gray-600">{state.success}</p>
              <div className="mt-6">
                <Link
                  href="/sign-in"
                  className="w-full flex justify-center py-2 px-4 border border-[#003463] rounded-full shadow-sm text-sm font-medium text-[#003463] bg-white hover:bg-[#003463]/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003463]"
                >
                  Retour à la connexion
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <form className="space-y-6" action={formAction}>
            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </Label>
              <div className="mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={255}
                  className="appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#003463] focus:border-[#003463] focus:z-10 sm:text-sm"
                  placeholder="Entrez votre email"
                />
              </div>
            </div>

            {state?.error && (
              <div className="text-red-500 text-sm">{state.error}</div>
            )}

            <div>
              <Button
                type="submit"
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-[#003463] hover:bg-[#003463]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003463]"
                disabled={pending}
              >
                {pending ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Envoi en cours...
                  </>
                ) : (
                  'Envoyer le lien de réinitialisation'
                )}
              </Button>
            </div>
          </form>
        )}

        <div className="mt-6">
          <Link
            href="/sign-in"
            className="flex items-center justify-center text-sm text-[#003463] hover:text-[#003463]/80"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  );
}
