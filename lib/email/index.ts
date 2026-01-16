import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.EMAIL_FROM || 'noreply@resend.dev';

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.BASE_URL}/reset-password?token=${token}`;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'Réinitialisation de votre mot de passe',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #003463; margin: 0;">Réinitialisation du mot de passe</h1>
          </div>

          <p>Bonjour,</p>

          <p>Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe :</p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #003463; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold;">
              Réinitialiser mon mot de passe
            </a>
          </div>

          <p>Ou copiez ce lien dans votre navigateur :</p>
          <p style="word-break: break-all; color: #666; font-size: 14px;">${resetUrl}</p>

          <p><strong>Ce lien expire dans 1 heure.</strong></p>

          <p>Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet email en toute sécurité.</p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

          <p style="color: #999; font-size: 12px; text-align: center;">
            Cet email a été envoyé automatiquement. Merci de ne pas y répondre.
          </p>
        </body>
      </html>
    `,
    text: `
Réinitialisation du mot de passe

Bonjour,

Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le lien ci-dessous pour créer un nouveau mot de passe :

${resetUrl}

Ce lien expire dans 1 heure.

Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet email en toute sécurité.
    `.trim(),
  });
}
