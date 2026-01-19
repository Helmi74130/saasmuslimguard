import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.EMAIL_FROM || 'noreply@resend.dev';

export async function sendWelcomeEmail(email: string, userName?: string) {
  const pricingUrl = `${process.env.BASE_URL}/pricing`;
  const displayName = userName || email.split('@')[0];

  // Send welcome email to user
  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'Bienvenue sur Muslim Guard',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            }
          </style>
        </head>
        <body style="background-color: #f5f5f5; padding: 0; margin: 0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                  <!-- Header with brand color -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #003463 0%, #004d8c 100%); padding: 40px 40px 30px 40px; text-align: center;">
                      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">
                        Bienvenue sur Muslim Guard
                      </h1>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                        Salam aleykoum <strong>${displayName}</strong>,
                      </p>

                      <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                        Nous sommes ravis de vous accueillir sur <strong>Muslim Guard</strong>. Votre compte a été créé avec succès.
                      </p>

                      <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                        Pour profiter pleinement de toutes nos fonctionnalités, découvrez nos offres d'abonnement et choisissez celle qui vous convient le mieux.
                      </p>

                      <!-- CTA Button -->
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center" style="padding: 20px 0;">
                            <a href="${pricingUrl}" style="background-color: #003463; color: #ffffff; padding: 16px 40px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(0,52,99,0.2);">
                              Découvrir nos offres
                            </a>
                          </td>
                        </tr>
                      </table>

                      <!-- Benefits section -->
                      <div style="background-color: #f8f9fa; border-radius: 6px; padding: 25px; margin: 30px 0;">
                        <p style="color: #003463; font-size: 18px; font-weight: 600; margin: 0 0 15px 0;">
                          Pourquoi choisir Muslim Guard ?
                        </p>
                        <table width="100%" cellpadding="8" cellspacing="0">
                          <tr>
                            <td style="color: #555555; font-size: 15px; line-height: 1.6; padding: 5px 0;">
                              Protection complète de votre navigation
                            </td>
                          </tr>
                          <tr>
                            <td style="color: #555555; font-size: 15px; line-height: 1.6; padding: 5px 0;">
                              Filtrage adapté aux valeurs islamiques
                            </td>
                          </tr>
                          <tr>
                            <td style="color: #555555; font-size: 15px; line-height: 1.6; padding: 5px 0;">
                              Support dédié et réactif
                            </td>
                          </tr>
                        </table>
                      </div>

                      <p style="color: #666666; font-size: 15px; line-height: 1.6; margin: 30px 0 0 0;">
                        Si vous avez des questions, notre équipe est là pour vous accompagner.
                      </p>

                      <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 25px 0 0 0;">
                        Baraka Allahu fik,<br>
                        <strong>L'équipe Muslim Guard</strong>
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f8f9fa; padding: 30px 40px; text-align: center; border-top: 1px solid #e9ecef;">
                      <p style="color: #999999; font-size: 13px; line-height: 1.5; margin: 0;">
                        Cet email a été envoyé automatiquement suite à la création de votre compte.<br>
                        Merci de ne pas y répondre directement.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
    text: `
Bienvenue sur Muslim Guard

Salam aleykoum ${displayName},

Nous sommes ravis de vous accueillir sur Muslim Guard. Votre compte a été créé avec succès.

Pour profiter pleinement de toutes nos fonctionnalités, découvrez nos offres d'abonnement et choisissez celle qui vous convient le mieux.

Découvrir nos offres : ${pricingUrl}

Pourquoi choisir Muslim Guard ?
- Protection complète de votre navigation
- Filtrage adapté aux valeurs islamiques
- Support dédié et réactif

Si vous avez des questions, notre équipe est là pour vous accompagner.

Baraka Allahu fik,
L'équipe Muslim Guard
    `.trim(),
  });

  // Send notification email to admin
  await resend.emails.send({
    from: FROM_EMAIL,
    to: 'contact@muslim-guard.com',
    subject: 'Nouvelle inscription - Muslim Guard',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5; padding: 20px; margin: 0;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <h2 style="color: #003463; margin: 0 0 20px 0; font-size: 22px;">
              Nouvelle inscription
            </h2>

            <div style="background-color: #f8f9fa; border-left: 4px solid #003463; padding: 15px 20px; margin: 20px 0;">
              <p style="margin: 0 0 10px 0; color: #333333; font-size: 15px;">
                <strong>Email:</strong> ${email}
              </p>
              <p style="margin: 0; color: #333333; font-size: 15px;">
                <strong>Nom d'affichage:</strong> ${displayName}
              </p>
            </div>

            <p style="color: #666666; font-size: 14px; margin: 20px 0 0 0;">
              Date: ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}
            </p>
          </div>
        </body>
      </html>
    `,
    text: `
Nouvelle inscription sur Muslim Guard

Email: ${email}
Nom d'affichage: ${displayName}
Date: ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}
    `.trim(),
  });
}

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
