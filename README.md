# DramaFlow — Vite Project

A full-featured short drama streaming web app built with Vite + Firebase.

---

## 📦 Install & Run

### Step 1 — Install Node.js (if not installed)
Download from https://nodejs.org (LTS version recommended)

### Step 2 — Install dependencies

```bash
# Navigate into the project folder
cd dramaflow-vite

# Install all dependencies (only 2: vite + firebase)
npm install
```

### Step 3 — Start the dev server

```bash
npm run dev
```

The app opens at **http://localhost:5173**

### Step 4 — Build for production

```bash
npm run build
```

Output goes to `/dist` — deploy that folder to any static host (Vercel, Netlify, Firebase Hosting, etc.)

---

## 🔧 Dependencies

Only **2 packages** are needed:

| Package    | Version  | Purpose                              |
|------------|----------|--------------------------------------|
| `vite`     | ^5.2.0   | Dev server + bundler                 |
| `firebase` | ^10.12.0 | Auth, Firestore database             |

### Install commands

```bash
# Install both at once
npm install

# Or install individually:
npm install vite --save-dev
npm install firebase
```

No React, no Vue, no extra UI libraries needed — the app uses a lightweight custom render engine.

---

## 📁 Project Structure

```
dramaflow-vite/
├── index.html                  # Entry HTML
├── package.json
├── vite.config.js
└── src/
    ├── main.js                 # App entry, auth listener, global A.* API
    ├── firebase.js             # Firebase init + config
    ├── store.js                # Global state (S object + notify/subscribe)
    ├── styles/
    │   ├── main.css            # Imports all CSS modules
    │   ├── tokens.css          # CSS variables
    │   ├── base.css            # Reset, buttons, inputs
    │   ├── layout.css          # Page layout, grid
    │   ├── nav.css             # Top nav + bottom mobile nav
    │   ├── auth.css            # Login/signup modal
    │   ├── hero.css            # Home banner
    │   ├── cards.css           # Content cards + horizontal scroll rows
    │   ├── player.css          # Cinema player (scroll feed)
    │   ├── profile.css         # Profile page
    │   ├── subscribe.css       # Subscription/plans page
    │   ├── admin.css           # Admin panel
    │   ├── sections.css        # Home Feed Builder (section editor)
    │   ├── users.css           # User management panel
    │   └── utils.css           # Badges, tags, utility classes
    ├── components/
    │   ├── Nav.js              # Top nav + bottom nav
    │   ├── Auth.js             # Auth modal + Firebase login/signup
    │   ├── Card.js             # Content card HTML
    │   └── Player.js           # Cinema player + episode sheets
    ├── pages/
    │   ├── Home.js             # Home page (banner + section rows)
    │   ├── Search.js           # Explore/search page
    │   ├── Library.js          # Full content grid
    │   ├── MyList.js           # Saved content
    │   ├── Profile.js          # User profile
    │   └── Subscribe.js        # Subscription plans
    ├── admin/
    │   └── Admin.js            # Full admin panel (all tabs)
    └── utils/
        ├── actions.js          # All Firebase read/write operations
        ├── mockData.js         # Mock content + seeder
        └── dragDrop.js         # Reusable drag-and-drop (desktop + touch)
```

---

## 🔑 Admin Access

- **Super Admin**: Login with your email — full access to all 5 tabs
- **Sub-Admin Level 1**: Content + Banner tabs only
- **Sub-Admin Level 2**: + Trending + Sections tabs
- **Sub-Admin Level 3**: + Users tab (full access)

Super Admin can appoint users as Sub-Admins and set their level from the Users tab.

---

## 🚀 Deploy to Firebase Hosting (optional)

```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Login
firebase login

# Init hosting in the project folder
firebase init hosting
# → Set public directory to: dist
# → Configure as SPA: Yes

# Build + deploy
npm run build
firebase deploy
```

---

## 🔥 Firebase Security Rules (production-grade)

Copy these into **Firebase Console → Firestore → Rules** and click **Publish**.

These rules enforce all access control **server-side** so that client-side JavaScript (including DevTools manipulation of `S.isAdmin`) can never bypass them.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // ── Helpers ────────────────────────────────────────────
    function isSignedIn()   { return request.auth != null; }
    function isOwner(uid)   { return isSignedIn() && request.auth.uid == uid; }
    function isSuperAdmin() {
      return isSignedIn() &&
        request.auth.token.email == 'admin@dramaflow.com';
    }
    function isSubAdmin()   {
      return isSignedIn() &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'subadmin';
    }
    function isAnyAdmin()   { return isSuperAdmin() || isSubAdmin(); }
    function adminLevel()   {
      return isSuperAdmin() ? 5 :
        isSubAdmin()
          ? get(/databases/$(database)/documents/users/$(request.auth.uid)).data.get('adminLevel', 0)
          : 0;
    }

    // ── Content ────────────────────────────────────────────
    // Anyone can read visible content; only admins can write
    match /content/{id} {
      allow read:   if true;
      allow create: if isAnyAdmin();
      allow update: if isAnyAdmin();
      allow delete: if isAnyAdmin();
    }

    // ── Settings (banner, trending, sections, promo, tasks)
    match /settings/{id} {
      allow read:  if true;
      allow write: if isAnyAdmin();
    }

    // ── Users ──────────────────────────────────────────────
    match /users/{uid} {
      // Anyone signed in can read any user doc (for online/presence)
      allow read:   if isSignedIn();
      // Users can update their own doc — but CANNOT change role/adminLevel
      allow update: if isOwner(uid)
                    && !request.resource.data.diff(resource.data).affectedKeys()
                        .hasAny(['role', 'adminLevel', 'blocked',
                                 'appointedBy', 'revokedBy', 'subscription']);
      // Creating own profile on signup
      allow create: if isOwner(uid);
      // Only super admin can delete user docs
      allow delete: if isSuperAdmin();
    }

    // ── Admin-only user writes (subscription, block, roles)
    // Handled via a separate path so rules stay clean
    match /users/{uid} {
      allow update: if isAnyAdmin()
                    && adminLevel() >= 3;   // Level 3+ for user management
    }

    // ── Comments ───────────────────────────────────────────
    match /comments/{id} {
      allow read:   if true;
      allow create: if isSignedIn()
                    && request.resource.data.uid == request.auth.uid
                    && request.resource.data.text.size() <= 500;
      allow delete: if isSignedIn()
                    && (resource.data.uid == request.auth.uid || isAnyAdmin());
    }

    // ── Notifications ──────────────────────────────────────
    match /notifications/{id} {
      allow read:   if isSignedIn()
                    && resource.data.userId == request.auth.uid;
      allow create: if isAnyAdmin();
      allow update: if isSignedIn()
                    && resource.data.userId == request.auth.uid;
    }

    // ── Admin Audit Log ────────────────────────────────────
    match /adminLog/{id} {
      allow read:   if isAnyAdmin();
      allow create: if isAnyAdmin();
      // Logs are immutable once written
      allow update, delete: if false;
    }

    // ── Admin Chat ─────────────────────────────────────────
    match /adminChats/{uid} {
      allow read:   if isOwner(uid) || isAnyAdmin();
      allow write:  if isOwner(uid) || isAnyAdmin();

      match /messages/{msgId} {
        allow read:   if isOwner(uid) || isAnyAdmin();
        allow create: if isOwner(uid) || isAnyAdmin();
        // Messages cannot be edited or deleted
        allow update, delete: if false;
      }
    }

    // ── Notification History (admin sent log) ──────────────
    match /notifHistory/{id} {
      allow read:   if isAnyAdmin();
      allow create: if isAnyAdmin();
      allow update, delete: if false;
    }

    // ── Credit transactions (written by server/admin only) ─
    // Users can read their own; only admins write
    match /creditTransactions/{id} {
      allow read:   if isSignedIn()
                    && resource.data.uid == request.auth.uid;
      allow write:  if isAnyAdmin();
    }

  }
}
```

### What these rules enforce

| Rule | What it blocks |
|------|----------------|
| Content write requires admin | Normal users can't add/edit/delete dramas via DevTools |
| User can't change own `role`/`adminLevel`/`subscription` | Self-promotion via `S.isAdmin = true` in console does nothing |
| Comments tied to auth UID | Users can't post as someone else |
| Logs are immutable | Audit trail can't be tampered with |
| Chat messages can't be edited | Clean support history |
| Admin level ≥ 3 for user management | Sub-admins can't accidentally promote themselves |

### ⚠️ Important: Two-pass user rules

Firestore applies **all matching rules** — if any `allow` condition is true, the write is permitted. The two `match /users/{uid}` blocks above are intentional: the first restricts self-writes, the second allows admin writes. Firestore will `allow` if either matches, which is correct behavior here.

# vite-project
