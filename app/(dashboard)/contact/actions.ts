'use server';

import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactFormSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  subject: z.string().min(3, 'Le sujet doit contenir au moins 3 caractères'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
});

export type ContactFormState = {
  error?: string;
  success?: boolean;
  fieldErrors?: {
    name?: string[];
    email?: string[];
    subject?: string[];
    message?: string[];
  };
};

export async function sendContactEmail(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  try {
    const validatedFields = contactFormSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    });

    if (!validatedFields.success) {
      return {
        error: 'Veuillez vérifier les champs du formulaire',
        fieldErrors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { name, email, subject, message } = validatedFields.data;

    const { error } = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.EMAIL_FROM!,
      replyTo: email,
      subject: `[Contact MuslimGuard] ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #003463; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">Nouveau message de contact</h1>
            </div>

            <div style="background-color: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
              <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">De :</p>
                <p style="margin: 0; font-size: 16px; font-weight: 600;">${name}</p>
                <p style="margin: 5px 0 0 0; color: #003463; font-size: 14px;">${email}</p>
              </div>

              <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">Sujet :</p>
                <p style="margin: 0; font-size: 16px; font-weight: 600;">${subject}</p>
              </div>

              <div style="background-color: white; padding: 20px; border-radius: 8px;">
                <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">Message :</p>
                <p style="margin: 0; font-size: 15px; white-space: pre-wrap;">${message}</p>
              </div>
            </div>

            <div style="text-align: center; margin-top: 20px; padding: 20px; color: #666; font-size: 12px;">
              <p style="margin: 0;">Cet email a été envoyé depuis le formulaire de contact de MuslimGuard</p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return {
        error: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.",
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Contact form error:', error);
    return {
      error: "Une erreur est survenue. Veuillez réessayer plus tard.",
    };
  }
}
