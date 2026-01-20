# 🚀 Extension API - Quick Start

## TL;DR

Vous avez maintenant un système complet d'authentification pour extensions Chrome qui :

✅ N'interfère PAS avec votre système d'authentification existant
✅ Permet aux extensions de vérifier le statut d'abonnement Stripe
✅ Est sécurisé et scalable
✅ Log toutes les activités

---

## 🎯 Flow Utilisateur

### 1️⃣ L'utilisateur installe votre extension Chrome
```javascript
// Dans votre extension : background.js
const response = await fetch('https://yourapp.com/api/extension/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    deviceName: 'Chrome - Windows',
    extensionVersion: '1.0.0'
  })
});

const { token } = await response.json();
// Sauvegarder : ext_a1b2c3d4...
chrome.storage.local.set({ extensionToken: token });
```

### 2️⃣ L'extension affiche un badge demandant à l'utilisateur de se connecter
```javascript
chrome.action.setBadgeText({ text: '!' });
```

### 3️⃣ L'utilisateur clique et se connecte via votre site web
```javascript
// Ouvrir la page de login
chrome.tabs.create({ url: 'https://yourapp.com/sign-in' });
```

### 4️⃣ Après connexion, la page web lie le token au compte
```javascript
// Sur votre site web après login
const { extensionToken } = await chrome.storage.local.get('extensionToken');

await fetch('/api/extension/link-account', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include', // Important pour les cookies
  body: JSON.stringify({ token: extensionToken })
});
```

### 5️⃣ L'extension vérifie le statut d'abonnement
```javascript
const { extensionToken } = await chrome.storage.local.get('extensionToken');

const response = await fetch('https://yourapp.com/api/extension/verify', {
  headers: { 'X-Extension-Token': extensionToken }
});

const { team } = await response.json();

if (team?.subscriptionStatus === 'active') {
  // Débloquer les fonctionnalités premium
  enablePremiumFeatures();
}
```

---

## 🔑 Les 5 Endpoints

| Endpoint | Auth | Description |
|----------|------|-------------|
| `POST /api/extension/register` | Aucune | Génère un token pour une nouvelle extension |
| `GET /api/extension/verify` | Token extension | Vérifie le token et retourne les infos d'abonnement |
| `POST /api/extension/link-account` | Cookie JWT | Lie le token au compte utilisateur connecté |
| `DELETE /api/extension/revoke` | Cookie JWT | Révoque un token |
| `GET /api/user/extensions` | Cookie JWT | Liste toutes les extensions de la team |

---

## 📦 Structure des Données

### Token d'extension
```json
{
  "id": 1,
  "token": "ext_a1b2c3d4e5f6...",
  "teamId": 5,
  "userId": 12,
  "deviceName": "Chrome - Windows 10",
  "extensionVersion": "1.0.0",
  "createdAt": "2025-01-20T10:00:00Z",
  "lastUsedAt": "2025-01-20T11:30:00Z",
  "revokedAt": null
}
```

### Response de vérification (token lié)
```json
{
  "valid": true,
  "linked": true,
  "team": {
    "id": 5,
    "name": "My Team",
    "subscriptionStatus": "active",
    "planName": "Premium"
  },
  "user": {
    "id": 12,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

## 🧪 Test Rapide (avec curl)

```bash
# 1. Générer un token
TOKEN=$(curl -s -X POST http://localhost:3000/api/extension/register \
  -H "Content-Type: application/json" \
  -d '{"deviceName":"Test","extensionVersion":"1.0.0"}' | jq -r '.token')

echo "Token: $TOKEN"

# 2. Vérifier le token (pas encore lié)
curl http://localhost:3000/api/extension/verify \
  -H "X-Extension-Token: $TOKEN"

# 3. Se connecter sur http://localhost:3000/sign-in
#    puis copier le cookie 'session' depuis les DevTools

# 4. Lier le token (remplacer YOUR_SESSION_COOKIE)
curl -X POST http://localhost:3000/api/extension/link-account \
  -H "Content-Type: application/json" \
  -H "Cookie: session=YOUR_SESSION_COOKIE" \
  -d "{\"token\":\"$TOKEN\"}"

# 5. Vérifier le token (maintenant lié !)
curl http://localhost:3000/api/extension/verify \
  -H "X-Extension-Token: $TOKEN"
```

---

## 📋 Checklist pour votre Extension Chrome

### Dans votre extension :

- [ ] **background.js / service worker**
  - [ ] Appeler `/register` à l'installation
  - [ ] Sauvegarder le token dans `chrome.storage.local`
  - [ ] Afficher un badge si non lié

- [ ] **popup.html / popup.js**
  - [ ] Bouton "Se connecter" qui ouvre votre site web
  - [ ] Vérification du statut d'abonnement
  - [ ] Affichage des fonctionnalités selon le plan

- [ ] **content script (optionnel)**
  - [ ] Vérifier le token avant d'activer les features
  - [ ] Cache du statut d'abonnement (refresh toutes les 5 min)

### Sur votre site web :

- [ ] **Page de login**
  - [ ] Détecter si l'utilisateur vient de l'extension
  - [ ] Appeler `/link-account` après connexion
  - [ ] Notifier l'extension que le lien est fait

- [ ] **Dashboard (/dashboard/extensions)** (optionnel)
  - [ ] Liste des extensions liées
  - [ ] Bouton pour révoquer
  - [ ] Dernière utilisation

---

## 🛡️ Sécurité

✅ **Tokens uniques** : 64 caractères hexadécimaux
✅ **Soft delete** : Tokens révoqués gardés en historique
✅ **Team-scoped** : Un token ne peut être lié qu'à une seule team
✅ **Activity logs** : Toutes les actions sont enregistrées
✅ **Auto-expiration** : Via `lastUsedAt` (à implémenter si besoin)

---

## 📖 Documentation Complète

- **Guide API détaillé** : [EXTENSION_API_GUIDE.md](EXTENSION_API_GUIDE.md)
- **Résumé d'implémentation** : [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)
- **Tests REST Client** : [test-extension-api.http](test-extension-api.http)

---

## 💡 Exemples de Cas d'Usage

### Vérifier l'abonnement avant une action
```javascript
async function canUseFeature() {
  const { extensionToken } = await chrome.storage.local.get('extensionToken');

  const res = await fetch('https://yourapp.com/api/extension/verify', {
    headers: { 'X-Extension-Token': extensionToken }
  });

  const data = await res.json();

  return data.linked &&
         data.team?.subscriptionStatus === 'active';
}

// Usage
if (await canUseFeature()) {
  // Activer la fonctionnalité
} else {
  // Afficher un message de mise à niveau
}
```

### Cache intelligent
```javascript
let cachedStatus = null;
let lastCheck = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function getSubscriptionStatus() {
  const now = Date.now();

  if (cachedStatus && (now - lastCheck) < CACHE_DURATION) {
    return cachedStatus;
  }

  const { extensionToken } = await chrome.storage.local.get('extensionToken');

  const res = await fetch('https://yourapp.com/api/extension/verify', {
    headers: { 'X-Extension-Token': extensionToken }
  });

  cachedStatus = await res.json();
  lastCheck = now;

  return cachedStatus;
}
```

---

## 🎊 C'est Tout !

Votre système d'authentification d'extension est **prêt à l'emploi** !

Questions ? Consultez [EXTENSION_API_GUIDE.md](EXTENSION_API_GUIDE.md)
