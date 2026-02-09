# Muslim Guard - API Mobile

## Vue d'ensemble

L'API mobile permet aux utilisateurs de Muslim Guard de se connecter depuis l'application React Native, de vérifier leur statut d'abonnement premium, et de gérer leurs appareils mobiles connectés.

## Architecture

### Nouvelle table `mobile_devices`

| Colonne | Type | Description |
|---|---|---|
| `id` | serial PK | Identifiant auto-incrémenté |
| `token` | varchar(255), UNIQUE, NOT NULL | Token unique préfixé `mob_` |
| `team_id` | integer FK → teams.id (CASCADE) | Équipe liée |
| `user_id` | integer FK → users.id (SET NULL) | Utilisateur lié |
| `device_name` | varchar(100) | Nom de l'appareil (ex: "Samsung Galaxy S21") |
| `device_id` | varchar(255) | ID unique Android/iOS de l'appareil |
| `platform` | varchar(20), default 'android' | Plateforme (android/ios) |
| `app_version` | varchar(20) | Version de l'app installée |
| `created_at` | timestamp | Date de création |
| `last_used_at` | timestamp | Dernière utilisation |
| `revoked_at` | timestamp | Soft delete (null = actif, date = révoqué) |

### Colonnes Google Play ajoutées à `teams`

| Colonne | Type | Description |
|---|---|---|
| `google_play_purchase_token` | text | Token d'achat Google Play |
| `google_play_product_id` | text | ID produit (`muslimguard_monthly` / `muslimguard_annual`) |
| `google_play_expires_at` | timestamp | Date d'expiration de l'abonnement Google Play |
| `subscription_source` | varchar(20) | Source de l'abonnement : `stripe`, `google_play`, ou null |

### Relations

```
users → mobile_devices  (one-to-many)
teams → mobile_devices  (one-to-many)
```

### Nouvelles actions ActivityLog

- `MOBILE_LOGIN` : Connexion depuis l'app mobile
- `MOBILE_LOGOUT` : Déconnexion depuis l'app mobile
- `MOBILE_DEVICE_REVOKED` : Révocation d'un appareil depuis le dashboard web
- `GOOGLE_PLAY_PURCHASE` : Achat validé via Google Play Billing

---

## Routes API

### 1. `POST /api/mobile/login`

Connexion depuis l'app mobile. Crée un device token et retourne un JWT valide 30 jours.

**Input (JSON body):**

```json
{
  "email": "user@example.com",
  "password": "monmotdepasse",
  "deviceName": "Samsung Galaxy S21",
  "deviceId": "android-unique-id-123",
  "platform": "android",
  "appVersion": "1.0.0"
}
```

| Champ | Requis | Description |
|---|---|---|
| `email` | Oui | Email de l'utilisateur |
| `password` | Oui | Mot de passe |
| `deviceName` | Non | Nom de l'appareil |
| `deviceId` | Non | ID unique Android/iOS |
| `platform` | Non | "android" ou "ios" (défaut: "android") |
| `appVersion` | Non | Version de l'app |

**Réponse succès (200):**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com"
  },
  "subscription": {
    "isPremium": true,
    "planName": "Base",
    "status": "active"
  }
}
```

**Réponses erreur:**

| Code | Body | Description |
|---|---|---|
| 400 | `{ "error": "Email and password are required" }` | Champs manquants |
| 401 | `{ "error": "Invalid credentials" }` | Email/mot de passe incorrect |
| 403 | `{ "error": "Account deleted" }` | Compte soft-deleted |

---

### 2. `GET /api/mobile/verify`

Vérifie la validité du JWT et retourne le statut d'abonnement actuel (peut avoir changé depuis le login).

**Headers:**

```
Authorization: Bearer <jwt>
```

**Réponse succès (200):**

```json
{
  "valid": true,
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com"
  },
  "subscription": {
    "isPremium": true,
    "planName": "Base",
    "status": "active",
    "source": "stripe",
    "expiresAt": null,
    "willRenew": true
  }
}
```

**Réponses erreur:**

| Code | Body | Description |
|---|---|---|
| 401 | `{ "error": "No token" }` | Pas de header Authorization |
| 401 | `{ "error": "Invalid token" }` | JWT expiré ou invalide |
| 403 | `{ "error": "Device revoked" }` | Appareil révoqué depuis le dashboard |

**Comportement:**
- Met à jour `last_used_at` du device à chaque appel
- Récupère le statut d'abonnement en temps réel (pas celui du JWT)
- Vérifie que l'utilisateur n'est pas soft-deleted
- Retourne la `source` de l'abonnement (`stripe`, `google_play`, ou `none`)
- Retourne `expiresAt` (timestamp) pour les abonnements Google Play

---

### 3. `POST /api/mobile/validate-purchase`

Valide un achat Google Play et active l'abonnement premium pour la team de l'utilisateur.

**Headers:**

```
Authorization: Bearer <jwt>
```

**Input (JSON body):**

```json
{
  "platform": "android",
  "purchaseToken": "google-play-purchase-token-string",
  "productId": "muslimguard_monthly"
}
```

| Champ | Requis | Description |
|---|---|---|
| `platform` | Oui | Doit être `"android"` |
| `purchaseToken` | Oui | Token de l'achat Google Play |
| `productId` | Oui | `"muslimguard_monthly"` ou `"muslimguard_annual"` |

**Réponse succès (200):**

```json
{
  "success": true,
  "subscription": {
    "isPremium": true,
    "status": "active",
    "planName": "Premium Monthly",
    "source": "google_play",
    "expiresAt": 1739107200000,
    "willRenew": true
  }
}
```

**Réponses erreur:**

| Code | Body | Description |
|---|---|---|
| 400 | `{ "success": false, "error": "Invalid request" }` | Champs manquants ou platform != android |
| 400 | `{ "success": false, "error": "No team associated" }` | Utilisateur sans team |
| 400 | `{ "success": false, "error": "Invalid product" }` | productId non reconnu |
| 401 | `{ "success": false, "error": "No token" }` | Pas de header Authorization |
| 401 | `{ "success": false, "error": "Invalid token" }` | JWT invalide |

**Comportement:**
- Valide le JWT mobile
- Vérifie que le `productId` est dans la liste autorisée
- Met à jour la table `teams` avec les infos Google Play
- Calcule une date d'expiration approximative (30 jours ou 1 an)
- Logge l'activité `GOOGLE_PLAY_PURCHASE`
- **Note MVP** : La validation du `purchaseToken` avec l'API Google Play Developer n'est pas implémentée. Pour la production, ajouter un Service Account Google.

---

### 5. `DELETE /api/mobile/logout`

Déconnecte l'appareil mobile (révoque le device token).

**Headers:**

```
Authorization: Bearer <jwt>
```

**Réponse succès (200):**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

**Réponses erreur:**

| Code | Body | Description |
|---|---|---|
| 401 | `{ "error": "No token" }` | Pas de header Authorization |
| 401 | `{ "error": "Invalid token" }` | JWT invalide |

---

### 6. `GET /api/user/mobile-devices`

Liste les appareils mobiles actifs de l'utilisateur connecté. Accessible depuis le **dashboard web** (authentification par cookie session).

**Auth:** Cookie session web (même auth que le dashboard)

**Réponse succès (200):**

```json
{
  "devices": [
    {
      "id": 1,
      "deviceName": "Samsung Galaxy S21",
      "platform": "android",
      "appVersion": "1.0.0",
      "lastUsedAt": "2026-02-09T10:30:00.000Z",
      "createdAt": "2026-02-01T08:00:00.000Z"
    },
    {
      "id": 2,
      "deviceName": "iPhone 15 Pro",
      "platform": "ios",
      "appVersion": "1.0.0",
      "lastUsedAt": "2026-02-08T18:00:00.000Z",
      "createdAt": "2026-02-05T12:00:00.000Z"
    }
  ]
}
```

---

### 7. `DELETE /api/user/mobile-devices/[id]`

Révoque un appareil mobile spécifique depuis le dashboard web.

**Auth:** Cookie session web

**Paramètre URL:** `id` - L'ID du device à révoquer

**Réponse succès (200):**

```json
{
  "success": true,
  "message": "Mobile device revoked successfully"
}
```

**Réponses erreur:**

| Code | Body | Description |
|---|---|---|
| 400 | `{ "error": "Invalid device ID" }` | ID non numérique |
| 401 | `{ "error": "User not authenticated" }` | Pas de session |
| 404 | `{ "error": "Mobile device not found or does not belong to you" }` | Device inexistant ou pas le sien |

---

## Flux d'authentification mobile

```
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│   App Mobile │         │   API Next   │         │  PostgreSQL  │
└──────┬───────┘         └──────┬───────┘         └──────┬───────┘
       │                        │                        │
       │  POST /api/mobile/login│                        │
       │  {email, password,     │                        │
       │   deviceName, ...}     │                        │
       │───────────────────────>│                        │
       │                        │  Vérifier credentials  │
       │                        │───────────────────────>│
       │                        │  Créer mobile_devices  │
       │                        │───────────────────────>│
       │                        │  Créer activity_logs   │
       │                        │───────────────────────>│
       │   {token (JWT 30j),    │                        │
       │    user, subscription} │                        │
       │<───────────────────────│                        │
       │                        │                        │
       │  Stocker le JWT        │                        │
       │  (AsyncStorage)        │                        │
       │                        │                        │
       │  GET /api/mobile/verify│                        │
       │  Authorization: Bearer │                        │
       │───────────────────────>│                        │
       │                        │  Vérifier JWT          │
       │                        │  Vérifier device actif │
       │                        │  MAJ last_used_at      │
       │                        │───────────────────────>│
       │   {valid, user,        │                        │
       │    subscription}       │                        │
       │<───────────────────────│                        │
       │                        │                        │
       │ DELETE /api/mobile/    │                        │
       │  logout                │                        │
       │───────────────────────>│                        │
       │                        │  Révoquer device       │
       │                        │───────────────────────>│
       │   {success: true}      │                        │
       │<───────────────────────│                        │
```

## Utilisation côté React Native

### Login

```typescript
const login = async (email: string, password: string) => {
  const response = await fetch('https://votre-domaine.com/api/mobile/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
      deviceName: DeviceInfo.getDeviceName(),
      deviceId: DeviceInfo.getUniqueId(),
      platform: Platform.OS, // 'android' ou 'ios'
      appVersion: DeviceInfo.getVersion(),
    }),
  });

  const data = await response.json();

  if (data.success) {
    // Stocker le JWT
    await AsyncStorage.setItem('auth_token', data.token);
    // Utiliser data.user et data.subscription
  }
};
```

### Vérifier l'abonnement

```typescript
const checkSubscription = async () => {
  const token = await AsyncStorage.getItem('auth_token');

  const response = await fetch('https://votre-domaine.com/api/mobile/verify', {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (data.valid) {
    // data.subscription.isPremium → true/false
    // data.subscription.planName → "Base", "Plus", "free"
    // data.subscription.status → "active", "trialing", "canceled", "none"
  } else if (response.status === 403) {
    // Device révoqué → forcer la déconnexion
    await AsyncStorage.removeItem('auth_token');
  }
};
```

### Valider un achat Google Play

```typescript
import { purchaseUpdatedListener } from 'react-native-iap';

const validatePurchase = async (purchase: Purchase) => {
  const token = await AsyncStorage.getItem('auth_token');

  const response = await fetch('https://votre-domaine.com/api/mobile/validate-purchase', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      platform: 'android',
      purchaseToken: purchase.purchaseToken,
      productId: purchase.productId, // 'muslimguard_monthly' ou 'muslimguard_annual'
    }),
  });

  const data = await response.json();

  if (data.success) {
    // data.subscription.isPremium → true
    // data.subscription.planName → "Premium Monthly" ou "Premium Annual"
    // data.subscription.source → "google_play"
    // data.subscription.expiresAt → timestamp d'expiration
  }
};
```

### Logout

```typescript
const logout = async () => {
  const token = await AsyncStorage.getItem('auth_token');

  await fetch('https://votre-domaine.com/api/mobile/logout', {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  await AsyncStorage.removeItem('auth_token');
};
```

## Fichiers créés/modifiés

| Fichier | Action | Description |
|---|---|---|
| `lib/db/schema.ts` | Modifié | Table `mobileDevices`, colonnes Google Play sur `teams`, relations, types, ActivityType |
| `lib/db/migrations/0003_fat_randall_flagg.sql` | Créé | Migration table `mobile_devices` |
| `lib/db/migrations/0004_grey_fenris.sql` | Créé | Migration colonnes Google Play sur `teams` |
| `app/api/mobile/login/route.ts` | Créé | Endpoint login mobile |
| `app/api/mobile/verify/route.ts` | Créé | Endpoint vérification JWT (inclut source abonnement) |
| `app/api/mobile/logout/route.ts` | Créé | Endpoint logout mobile |
| `app/api/mobile/validate-purchase/route.ts` | Créé | Validation achat Google Play |
| `app/api/user/mobile-devices/route.ts` | Créé | Liste des devices (dashboard) |
| `app/api/user/mobile-devices/[id]/route.ts` | Créé | Révoquer un device (dashboard) |

## Commandes post-implémentation

```bash
# Appliquer la migration à la base de données
npx drizzle-kit push
# ou
npx drizzle-kit migrate
```

## Notes techniques

- **JWT mobile** : Expire dans **30 jours** (vs 1 jour pour le web) pour éviter les déconnexions fréquentes sur mobile
- **Device token** : Préfixé `mob_` (similaire à `ext_` pour les extensions)
- **Soft delete** : Les devices révoqués ne sont pas supprimés, `revoked_at` est mis à la date courante
- **Sécurité** : Le même `AUTH_SECRET` est utilisé pour signer les JWT mobile et web
- **Statut premium** : Vérifié en temps réel via `/api/mobile/verify` (le statut peut changer entre les appels si l'abonnement Stripe change)
- **ON DELETE CASCADE** : Si une team est supprimée, tous ses devices mobiles sont supprimés
- **ON DELETE SET NULL** : Si un user est supprimé, le `user_id` des devices passe à null
- **Google Play (MVP)** : La validation du `purchaseToken` est simplifiée (pas d'appel API Google). L'expiration est calculée approximativement (30j ou 365j)
- **Google Play (Production)** : Implémenter la validation via l'API Google Play Developer avec un Service Account + les webhooks RTDN (Real-Time Developer Notifications)
- **Source abonnement** : Le champ `subscription_source` sur `teams` distingue les abonnements Stripe des abonnements Google Play
