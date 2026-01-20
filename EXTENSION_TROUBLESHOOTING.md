# 🔧 Extension API - Troubleshooting Guide

## 🐛 Problème RÉSOLU : HTTP 500 lors de /register

**Status :** ✅ **CORRIGÉ**

Si vous aviez une erreur HTTP 500 lors de l'enregistrement d'extension, ce problème a été résolu.

**Cause :** `teamId: 0` dans `activityLogs` (foreign key invalide)

**Solution :** Le log d'activité a été supprimé de `/register` et sera créé lors de `/link-account`

**Détails complets :** Voir [BUGFIX_REGISTER_500.md](BUGFIX_REGISTER_500.md)

---

## ❓ Problème : Plusieurs Tokens Créés

### 🎯 Réponse : C'est Normal ou Pas Normal ?

**✅ NORMAL dans ces cas :**
1. **Plusieurs appareils** - L'utilisateur installe l'extension sur plusieurs ordinateurs
2. **Réinstallation** - L'utilisateur désinstalle puis réinstalle l'extension
3. **Plusieurs navigateurs** - Chrome + Edge sur le même PC
4. **Storage vidé** - L'utilisateur vide le cache/cookies

**❌ PAS NORMAL dans ces cas :**
1. Plusieurs tokens créés **automatiquement** à chaque visite de page
2. Plusieurs tokens avec le **même deviceName** créés en **quelques secondes**
3. Tokens créés **sans action utilisateur**

---

## 🔍 Diagnostic en 3 Étapes

### 1️⃣ Vérifier les Tokens Existants

Utilisez l'endpoint de debug (authentifié via navigateur) :

```bash
curl http://localhost:3000/api/extension/debug \
  -H "Cookie: session=YOUR_SESSION_COOKIE"
```

**Exemple de réponse :**
```json
{
  "analysis": {
    "totalTokens": 5,
    "activeTokens": 3,
    "revokedTokens": 2,
    "byDevice": {
      "Chrome - Windows": [
        { "id": 1, "createdAt": "2025-01-20T10:00:00Z", "linked": true },
        { "id": 2, "createdAt": "2025-01-20T10:05:00Z", "linked": true }
      ],
      "Chrome - MacOS": [
        { "id": 3, "createdAt": "2025-01-19T15:00:00Z", "linked": true }
      ]
    },
    "suspiciousDuplicates": [
      {
        "device": "Chrome - Windows",
        "date": "2025-01-20",
        "count": 2,
        "tokens": [...]
      }
    ]
  }
}
```

**Interprétation :**
- Si `suspiciousDuplicates` est vide → ✅ Tout va bien
- Si plusieurs tokens **même device** et **même date** → ❌ Problème côté extension

---

### 2️⃣ Vérifier le Code de l'Extension

#### A. Vérifier `chrome.runtime.onInstalled`

**❌ MAUVAIS CODE (crée un token à chaque fois) :**
```javascript
chrome.runtime.onInstalled.addListener(async () => {
  // ❌ Appelle TOUJOURS registerExtension()
  const response = await fetch('https://yourapp.com/api/extension/register', {
    method: 'POST',
    body: JSON.stringify({ deviceName: 'Chrome', extensionVersion: '1.0' })
  });

  const { token } = await response.json();
  chrome.storage.local.set({ extensionToken: token });
});
```

**✅ BON CODE (vérifie d'abord si un token existe) :**
```javascript
chrome.runtime.onInstalled.addListener(async (details) => {
  // ✅ Vérifie si un token existe déjà
  const { extensionToken } = await chrome.storage.local.get('extensionToken');

  // ✅ Crée seulement si pas de token OU si vraiment installé pour la première fois
  if (!extensionToken && details.reason === 'install') {
    const response = await fetch('https://yourapp.com/api/extension/register', {
      method: 'POST',
      body: JSON.stringify({ deviceName: 'Chrome', extensionVersion: '1.0' })
    });

    const { token } = await response.json();
    chrome.storage.local.set({ extensionToken: token });
  }
});
```

#### B. Vérifier les Listeners de Navigation

**❌ MAUVAIS CODE (appelle link-account à chaque page) :**
```javascript
chrome.webNavigation.onCompleted.addListener(async (details) => {
  // ❌ Appelle TOUJOURS linkExtensionToAccount()
  await linkExtensionToAccount();
});
```

**✅ BON CODE (vérifie si déjà lié) :**
```javascript
chrome.webNavigation.onCompleted.addListener(async (details) => {
  const { isAuthenticated } = await chrome.storage.local.get('isAuthenticated');

  // ✅ Appelle seulement si pas encore authentifié
  if (!isAuthenticated) {
    await linkExtensionToAccount();
  }
});
```

---

### 3️⃣ Vérifier les Logs Backend

Ajoutez des logs temporaires dans votre backend :

```typescript
// Dans app/api/extension/register/route.ts
export async function POST(request: NextRequest) {
  const body = await request.json();

  // 🔍 LOG TEMPORAIRE
  console.log('[REGISTER] New token requested:', {
    deviceName: body.deviceName,
    ip: request.headers.get('x-forwarded-for'),
    timestamp: new Date().toISOString(),
  });

  // ... reste du code
}
```

```typescript
// Dans app/api/extension/link-account/route.ts
export async function POST(request: NextRequest) {
  const { token } = await request.json();

  // 🔍 LOG TEMPORAIRE
  console.log('[LINK] Link attempt:', {
    token: token.substring(0, 10) + '...',
    userId: user.id,
    timestamp: new Date().toISOString(),
  });

  // ... reste du code
}
```

**Lancer le serveur et observer :**
```bash
pnpm dev

# Vous verrez les logs dans la console
```

---

## 🛠️ Solutions aux Problèmes Courants

### Problème 1 : Token créé à chaque visite de page

**Cause :** `chrome.webNavigation.onCompleted` appelle `/register`

**Solution :**
```javascript
// ✅ Déplacer la création de token dans onInstalled SEULEMENT
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    await registerExtension();
  }
});

// ✅ Dans onCompleted, seulement sync
chrome.webNavigation.onCompleted.addListener(async (details) => {
  const { isAuthenticated } = await chrome.storage.local.get('isAuthenticated');

  if (isAuthenticated) {
    await syncUserSubscription(); // Pas de création de token
  }
});
```

---

### Problème 2 : Storage Chrome vidé automatiquement

**Cause :** Chrome vide le storage si l'extension est en mode "incognito" ou si l'utilisateur vide les données

**Solution :** Sauvegarder le token de manière persistante
```javascript
// ✅ Utiliser chrome.storage.sync au lieu de local (synchronisé avec le compte Google)
chrome.storage.sync.set({ extensionToken: token });

// OU

// ✅ Vérifier périodiquement si le token existe toujours
setInterval(async () => {
  const { extensionToken } = await chrome.storage.local.get('extensionToken');

  if (!extensionToken) {
    console.warn('Token lost! User may have cleared storage.');
    // Afficher un message à l'utilisateur
  }
}, 60000); // Vérifier toutes les minutes
```

---

### Problème 3 : Multiples appels à link-account

**Cause :** Le listener se déclenche plusieurs fois

**Solution :** Utiliser un flag de verrouillage
```javascript
let isLinking = false;

async function linkExtensionToAccount() {
  // ✅ Vérifier si déjà en cours
  if (isLinking) {
    console.log('Link already in progress...');
    return;
  }

  isLinking = true;

  try {
    const { extensionToken } = await chrome.storage.local.get('extensionToken');

    const response = await fetch('https://yourapp.com/api/extension/link-account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ token: extensionToken })
    });

    const result = await response.json();

    if (result.success) {
      chrome.storage.local.set({ isAuthenticated: true });
    }
  } finally {
    isLinking = false;
  }
}
```

---

## 📊 Checklist de Vérification

Avant de demander de l'aide, vérifiez ces points :

### Backend
- [ ] L'endpoint `/register` ne crée qu'UN seul token par appel
- [ ] L'endpoint `/link-account` fait un **UPDATE** et non un **INSERT**
- [ ] L'endpoint `/link-account` retourne `alreadyLinked: true` si déjà lié
- [ ] Les logs montrent le nombre d'appels à chaque endpoint

### Extension Chrome
- [ ] `onInstalled` vérifie si un token existe avant d'en créer un
- [ ] `onInstalled` vérifie `details.reason === 'install'`
- [ ] Les listeners ne créent PAS de nouveaux tokens
- [ ] Un flag de verrouillage empêche les appels multiples

### Données
- [ ] La base de données n'a pas de tokens dupliqués avec le même `deviceName` et la même date
- [ ] Endpoint `/api/extension/debug` montre des duplications suspects (ou pas)

---

## 🔍 Commandes de Debug Rapide

### Compter les tokens d'une team
```sql
SELECT
  device_name,
  COUNT(*) as count,
  DATE(created_at) as date
FROM extension_tokens
WHERE team_id = 1
GROUP BY device_name, DATE(created_at)
ORDER BY date DESC;
```

### Trouver les duplications suspectes
```sql
SELECT
  device_name,
  DATE(created_at) as date,
  COUNT(*) as duplicate_count
FROM extension_tokens
WHERE team_id = 1
GROUP BY device_name, DATE(created_at)
HAVING COUNT(*) > 1;
```

### Voir tous les tokens actifs
```bash
curl http://localhost:3000/api/user/extensions \
  -H "Cookie: session=YOUR_SESSION_COOKIE"
```

---

## ✅ Validation du Backend

Votre backend **est correct** si :

1. ✅ `/api/extension/link-account` utilise **UPDATE** (pas INSERT)
2. ✅ Il vérifie si le token existe déjà
3. ✅ Il retourne `alreadyLinked: true` si déjà lié
4. ✅ Il ne crée jamais de nouveau token

**Votre backend actuel répond à tous ces critères !** 🎉

---

## 🎯 Résumé

**Si vous voyez des tokens multiples, 90% du temps c'est dû à :**
1. L'extension qui appelle `/register` plusieurs fois
2. Le storage Chrome qui est vidé
3. Plusieurs appareils (c'est normal)

**Utilisez l'endpoint de debug pour diagnostiquer :**
```bash
curl http://localhost:3000/api/extension/debug \
  -H "Cookie: session=YOUR_SESSION"
```

**Votre backend est bon, c'est probablement l'extension qui doit être corrigée !** ✅
