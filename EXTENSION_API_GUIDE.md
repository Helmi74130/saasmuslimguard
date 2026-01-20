# Extension API Guide

Ce guide explique comment utiliser l'API d'authentification pour les extensions Chrome.

## Architecture

### Base de données
Une nouvelle table `extension_tokens` a été créée avec la structure suivante :
- `id` - Identifiant unique
- `token` - Token d'authentification unique (format: `ext_xxxxx`)
- `teamId` - Lien vers la team (nullable)
- `userId` - Lien vers l'utilisateur qui a installé l'extension (nullable)
- `deviceName` - Nom de l'appareil
- `extensionVersion` - Version de l'extension
- `createdAt` - Date de création
- `lastUsedAt` - Dernière utilisation (mis à jour automatiquement)
- `revokedAt` - Date de révocation (soft delete)

### Flow d'authentification

```
1. Extension installée
   ↓
2. POST /api/extension/register → Obtient un token
   ↓
3. Utilisateur se connecte via navigateur
   ↓
4. POST /api/extension/link-account → Lie le token à son compte
   ↓
5. GET /api/extension/verify → Vérifie le token et obtient les infos de subscription
```

## Endpoints API

### 1. POST /api/extension/register
**Enregistre une nouvelle extension et génère un token.**

**Request:**
```json
{
  "deviceName": "Chrome - Windows 10",
  "extensionVersion": "1.0.0"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "ext_a1b2c3d4e5f6...",
  "tokenId": 1,
  "message": "Extension registered successfully. Please link to your account."
}
```

**Erreurs:**
- `400` - Device name manquant
- `500` - Erreur serveur

---

### 2. GET /api/extension/verify
**Vérifie le token et retourne les informations de subscription.**

**Headers requis:**
```
X-Extension-Token: ext_a1b2c3d4e5f6...
```

**Response (200) - Token non lié:**
```json
{
  "valid": true,
  "linked": false,
  "message": "Token is valid but not linked to an account yet",
  "tokenData": {
    "id": 1,
    "deviceName": "Chrome - Windows 10",
    "extensionVersion": "1.0.0",
    "createdAt": "2025-01-20T10:00:00Z",
    "lastUsedAt": "2025-01-20T11:30:00Z"
  }
}
```

**Response (200) - Token lié:**
```json
{
  "valid": true,
  "linked": true,
  "tokenData": {
    "id": 1,
    "deviceName": "Chrome - Windows 10",
    "extensionVersion": "1.0.0",
    "createdAt": "2025-01-20T10:00:00Z",
    "lastUsedAt": "2025-01-20T11:30:00Z"
  },
  "team": {
    "id": 1,
    "name": "My Team",
    "subscriptionStatus": "active",
    "planName": "Premium"
  },
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Erreurs:**
- `401` - Token invalide ou révoqué
- `500` - Erreur serveur

---

### 3. POST /api/extension/link-account
**Lie un token d'extension au compte de l'utilisateur connecté.**

**Authentication:** Cookie JWT (session utilisateur standard)

**Request:**
```json
{
  "token": "ext_a1b2c3d4e5f6..."
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Extension linked to your account successfully",
  "team": {
    "id": 1,
    "name": "My Team",
    "subscriptionStatus": "active",
    "planName": "Premium"
  }
}
```

**Erreurs:**
- `401` - Utilisateur non authentifié
- `400` - Token invalide ou déjà lié à une autre team
- `500` - Erreur serveur

---

### 4. DELETE /api/extension/revoke
**Révoque un token d'extension.**

**Authentication:** Cookie JWT (session utilisateur standard)

**Query params OU Body:**
```json
{
  "tokenId": 1
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Extension token revoked successfully"
}
```

**Erreurs:**
- `401` - Utilisateur non authentifié
- `400` - Token ID manquant
- `404` - Token non trouvé ou n'appartient pas à la team
- `500` - Erreur serveur

---

### 5. GET /api/user/extensions
**Liste toutes les extensions de la team.**

**Authentication:** Cookie JWT (session utilisateur standard)

**Response (200):**
```json
{
  "success": true,
  "extensions": [
    {
      "id": 1,
      "deviceName": "Chrome - Windows 10",
      "extensionVersion": "1.0.0",
      "createdAt": "2025-01-20T10:00:00Z",
      "lastUsedAt": "2025-01-20T11:30:00Z",
      "revokedAt": null,
      "isActive": true,
      "installedBy": "You"
    },
    {
      "id": 2,
      "deviceName": "Chrome - MacOS",
      "extensionVersion": "1.0.0",
      "createdAt": "2025-01-19T10:00:00Z",
      "lastUsedAt": "2025-01-20T09:00:00Z",
      "revokedAt": "2025-01-20T10:00:00Z",
      "isActive": false,
      "installedBy": "Team member"
    }
  ],
  "summary": {
    "total": 2,
    "active": 1,
    "revoked": 1
  }
}
```

**Erreurs:**
- `401` - Utilisateur non authentifié
- `400` - Utilisateur sans team
- `500` - Erreur serveur

---

## Exemples d'utilisation dans l'extension Chrome

### 1. Installation de l'extension
```javascript
// background.js ou service worker
chrome.runtime.onInstalled.addListener(async () => {
  const response = await fetch('http://localhost:3000/api/extension/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      deviceName: `Chrome - ${navigator.platform}`,
      extensionVersion: chrome.runtime.getManifest().version
    })
  });

  const data = await response.json();

  // Stocker le token
  await chrome.storage.local.set({ extensionToken: data.token });

  // Afficher un badge pour demander à l'utilisateur de se connecter
  chrome.action.setBadgeText({ text: '!' });
  chrome.action.setBadgeBackgroundColor({ color: '#FF6600' });
});
```

### 2. Vérification du statut d'abonnement
```javascript
async function checkSubscriptionStatus() {
  const { extensionToken } = await chrome.storage.local.get('extensionToken');

  if (!extensionToken) {
    return { valid: false, error: 'No token found' };
  }

  const response = await fetch('http://localhost:3000/api/extension/verify', {
    headers: { 'X-Extension-Token': extensionToken }
  });

  const data = await response.json();

  if (data.linked && data.team?.subscriptionStatus === 'active') {
    // Débloquer les fonctionnalités premium
    return { valid: true, isPremium: true, team: data.team };
  } else if (!data.linked) {
    // Demander à l'utilisateur de lier son compte
    return { valid: true, linked: false };
  }

  return { valid: false };
}
```

### 3. Liaison du compte (depuis popup.html)
```javascript
// popup.js
document.getElementById('linkButton').addEventListener('click', async () => {
  const { extensionToken } = await chrome.storage.local.get('extensionToken');

  // Ouvrir une fenêtre de connexion
  chrome.tabs.create({
    url: 'http://localhost:3000/sign-in?linkExtension=true'
  });

  // Écouter la confirmation depuis la page web
  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'EXTENSION_LINKED') {
      chrome.action.setBadgeText({ text: '' });
      checkSubscriptionStatus();
    }
  });
});
```

### 4. Envoi du token depuis la page web (après connexion)
```javascript
// À ajouter sur la page /sign-in après authentification réussie
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('linkExtension') === 'true') {
  // Demander le token à l'extension
  chrome.runtime.sendMessage(
    EXTENSION_ID,
    { type: 'GET_TOKEN' },
    async (response) => {
      if (response?.token) {
        // Lier le token au compte
        await fetch('/api/extension/link-account', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include', // Important pour envoyer les cookies
          body: JSON.stringify({ token: response.token })
        });

        // Notifier l'extension
        chrome.runtime.sendMessage(EXTENSION_ID, {
          type: 'EXTENSION_LINKED'
        });
      }
    }
  );
}
```

---

## Sécurité

1. **Tokens sécurisés** : Les tokens sont générés avec `crypto.randomBytes(32)` (64 caractères hex)
2. **Soft delete** : Les tokens révoqués restent en base avec `revokedAt`
3. **Auto-update lastUsedAt** : Chaque vérification met à jour la dernière utilisation
4. **Team-scoped** : Un token ne peut être lié qu'à une seule team
5. **Activity logs** : Toutes les actions sont enregistrées dans `activity_logs`

---

## Logs d'activité

Les actions suivantes sont enregistrées :
- `EXTENSION_REGISTERED` - Enregistrement d'une nouvelle extension
- `EXTENSION_LINKED` - Liaison d'une extension à un compte
- `EXTENSION_REVOKED` - Révocation d'une extension

Ces logs sont visibles dans `/dashboard/activity`.

---

## Migration de la base de données

La migration a été générée et appliquée automatiquement :

```bash
pnpm db:generate  # Génère la migration
pnpm db:migrate   # Applique la migration
```

Fichier de migration : `lib/db/migrations/0002_chunky_randall_flagg.sql`

---

## Tests manuels

### Test avec curl

```bash
# 1. Enregistrer une extension
curl -X POST http://localhost:3000/api/extension/register \
  -H "Content-Type: application/json" \
  -d '{"deviceName": "Test Device", "extensionVersion": "1.0.0"}'

# Résultat : {"success":true,"token":"ext_xxxx","tokenId":1}

# 2. Vérifier le token (non lié)
curl http://localhost:3000/api/extension/verify \
  -H "X-Extension-Token: ext_xxxx"

# 3. Se connecter via navigateur et lier le token
# (nécessite d'être authentifié avec cookie JWT)
curl -X POST http://localhost:3000/api/extension/link-account \
  -H "Content-Type: application/json" \
  -H "Cookie: session=your_jwt_token" \
  -d '{"token": "ext_xxxx"}'

# 4. Vérifier le token (lié)
curl http://localhost:3000/api/extension/verify \
  -H "X-Extension-Token: ext_xxxx"

# 5. Lister les extensions
curl http://localhost:3000/api/user/extensions \
  -H "Cookie: session=your_jwt_token"

# 6. Révoquer l'extension
curl -X DELETE "http://localhost:3000/api/extension/revoke?tokenId=1" \
  -H "Cookie: session=your_jwt_token"
```

---

## Prochaines étapes

1. **Interface UI** : Créer une page `/dashboard/extensions` pour gérer les extensions
2. **Webhooks** : Notifier les extensions lors de changements d'abonnement
3. **Rate limiting** : Limiter le nombre de vérifications par token
4. **Analytics** : Suivre l'utilisation des extensions
