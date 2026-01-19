# 📧 Configuration Resend pour Muslim Guard

Ce guide vous explique comment configurer Resend pour envoyer des emails depuis votre application Muslim Guard.

## Pourquoi Resend ?

Resend est un service d'envoi d'emails moderne qui offre :
- ✅ Gratuit jusqu'à 3000 emails/mois (100 emails/jour)
- ✅ Excellente délivrabilité (vos emails n'iront pas en spam)
- ✅ Configuration simple en quelques minutes
- ✅ Support de votre domaine personnalisé (muslim-guard.com)

## Étape 1 : Créer un compte Resend

1. Allez sur [resend.com](https://resend.com)
2. Cliquez sur **Sign Up**
3. Créez votre compte (gratuit)

## Étape 2 : Vérifier votre domaine muslim-guard.com

### 2.1 Ajouter votre domaine dans Resend

1. Connectez-vous à votre tableau de bord Resend
2. Allez dans **Domains** (menu latéral)
3. Cliquez sur **Add Domain**
4. Entrez : `muslim-guard.com`
5. Cliquez sur **Add**

### 2.2 Configurer les enregistrements DNS

Resend va vous afficher **3 enregistrements DNS** à ajouter. Vous devez les ajouter dans votre panneau Hostinger.

#### Comment ajouter les enregistrements DNS dans Hostinger :

1. Connectez-vous à votre compte Hostinger
2. Allez dans **Domains** → Sélectionnez `muslim-guard.com`
3. Cliquez sur **DNS / Name Servers** ou **Gérer les DNS**
4. Ajoutez les 3 enregistrements fournis par Resend :

**Exemple d'enregistrements (les vôtres seront différents) :**

| Type | Name | Value |
|------|------|-------|
| TXT | @ | resend-domain-verification=abc123... |
| MX | @ | feedback-smtp.us-east-1.amazonses.com (Priority: 10) |
| TXT | resend._domainkey | v=DKIM1; k=rsa; p=MIGfMA0GCSq... |

5. Cliquez sur **Save** ou **Enregistrer**
6. Attendez quelques minutes (propagation DNS : 5-30 minutes)
7. Retournez sur Resend et cliquez sur **Verify** pour vérifier votre domaine

✅ Votre domaine devrait afficher **"Verified"** avec une coche verte

## Étape 3 : Obtenir votre clé API

1. Dans Resend, allez dans **API Keys** (menu latéral)
2. Cliquez sur **Create API Key**
3. Donnez un nom : `Muslim Guard Production`
4. Permissions : Sélectionnez **Sending access**
5. Cliquez sur **Add**
6. **IMPORTANT** : Copiez immédiatement la clé (elle commence par `re_...`)
   - Elle ne sera plus visible après !

## Étape 4 : Configurer votre fichier .env

1. Ouvrez votre fichier `.env` à la racine de votre projet
2. Ajoutez ou modifiez ces lignes :

```env
# Email (Resend)
RESEND_API_KEY=re_VotreCléAPIIci123456789
EMAIL_FROM=contact@muslim-guard.com
```

**Remplacez** :
- `re_VotreCléAPIIci123456789` par votre vraie clé API Resend
- `contact@muslim-guard.com` peut rester tel quel (c'est votre email)

## Étape 5 : Tester l'envoi d'emails

### Test simple en local :

1. Assurez-vous que votre serveur de développement tourne :
```bash
pnpm dev
```

2. Créez un nouveau compte sur votre application locale (http://localhost:3000/sign-up)

3. Vérifiez votre boîte email `contact@muslim-guard.com` ou l'email de test utilisé

✅ Vous devriez recevoir un email de bienvenue !

### En cas de problème :

1. **L'email n'arrive pas :**
   - Vérifiez les logs de votre console
   - Vérifiez que votre domaine est bien "Verified" dans Resend
   - Attendez 2-3 minutes (parfois les emails prennent du temps)
   - Vérifiez vos spams

2. **Erreur "Domain not verified" :**
   - Retournez sur Resend → Domains
   - Vérifiez que les 3 enregistrements DNS sont bien configurés dans Hostinger
   - Attendez que la propagation DNS soit complète (jusqu'à 24h max)

3. **Erreur "Invalid API key" :**
   - Vérifiez que vous avez bien copié toute la clé API (commence par `re_`)
   - Pas d'espaces avant/après dans le fichier .env
   - Redémarrez votre serveur après avoir modifié .env

## Emails configurés dans votre SaaS

Votre application envoie maintenant automatiquement :

1. ✅ **Email de bienvenue** - Envoyé lors de la création de compte
2. ✅ **Email de réinitialisation de mot de passe** - Envoyé lors de la demande de reset

## Monitoring et statistiques

Dans votre tableau de bord Resend, vous pouvez :
- Voir tous les emails envoyés
- Consulter le taux de délivrabilité
- Vérifier les erreurs
- Suivre votre quota mensuel

## Limites du plan gratuit

- **3000 emails/mois** (largement suffisant pour démarrer)
- **100 emails/jour**
- Si vous dépassez, vous pouvez upgrader vers un plan payant

## Support

Si vous avez des problèmes :
- Documentation Resend : https://resend.com/docs
- Support Resend : https://resend.com/support

---

**Configuration effectuée le :** {{ DATE }}

**Status :**
- [ ] Compte Resend créé
- [ ] Domaine muslim-guard.com ajouté
- [ ] Enregistrements DNS configurés dans Hostinger
- [ ] Domaine vérifié dans Resend
- [ ] Clé API obtenue
- [ ] Fichier .env configuré
- [ ] Email de test envoyé avec succès

🎉 Une fois toutes les cases cochées, votre système d'email est opérationnel !
