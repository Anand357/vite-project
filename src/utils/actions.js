// src/utils/actions.js
// ─────────────────────────────────────────────────────────────────────────────
// Every Firebase operation the app needs.
// All functions are exported so any module can import exactly what it needs.
// Functions that require authentication return 'auth' when the user is not
// logged in — the caller (main.js) catches this and opens the auth modal.
// ─────────────────────────────────────────────────────────────────────────────

import { auth, db, ADMIN_EMAIL, googleProvider } from '../firebase.js'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  OAuthProvider,
} from 'firebase/auth'
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  increment,
  writeBatch,
  Timestamp,
} from 'firebase/firestore'
import { S, setState, notify } from '../store.js'

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/** Number of free preview episodes a Free user can watch per title. */
export const FREE_EP_LIMIT = 2

/**
 * Returns the access rules for the current user's subscription plan.
 *
 * freeEpLimit  — max episodes Free users can watch (0-indexed, so 2 = EPs 1 & 2)
 * canWatchAll  — can watch all episodes of standard content
 * canExclusive — can watch exclusive-tagged content
 */
export function getPlanLimits(sub) {
  const plan = sub || S.sub || 'free'
  return {
    plan,
    freeEpLimit:  FREE_EP_LIMIT,
    canWatchAll:  plan === 'standard' || plan === 'premium',
    canExclusive: plan === 'premium',
  }
}

/**
 * Check whether a user with the given plan can play a specific episode.
 * Returns { allowed: bool, reason: string|null }
 */
export function canPlayEpisode(content, epIndex, sub) {
  const limits = getPlanLimits(sub)

  // Blocked users can't play anything
  if (S.userBlocked) return { allowed: false, reason: 'blocked' }

  // Exclusive content — Premium only (ads cannot unlock exclusive)
  if (content.exclusive === true && !limits.canExclusive) {
    return { allowed: false, reason: 'exclusive' }
  }

  // Paid users — always allowed
  if (limits.canWatchAll) return { allowed: true, reason: null }

  // Free users within the free preview window
  if (epIndex < FREE_EP_LIMIT) return { allowed: true, reason: null }

  // Check if the user spent an ad credit on this episode
  const usedCredits = S.adCreditsUsed?.[content.id] || []
  if (usedCredits.includes(epIndex)) return { allowed: true, reason: null }

  // Episode locked — but credits available to watch via ad
  return { allowed: false, reason: 'episode_limit' }
}

/**
 * Safe fire-and-forget write — logs the error but never crashes the UI.
 * Use for background syncs (view counts, presence, watch history).
 */
function safeWrite(promise) {
  return promise.catch(err =>
    console.warn('[DramaFlow] Background write failed:', err.message)
  )
}

/**
 * Returns all non-hidden content items from state.
 */
export function visibleContent() {
  return S.content.filter(c => !c.hidden)
}

/**
 * Find a single content item by id from state.
 */
export function findContent(id) {
  return S.content.find(c => c.id === id) || null
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTH — LOGIN / SIGNUP / LOGOUT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Sign in with email and password.
 * Throws a Firebase error on bad credentials — caller displays the message.
 */
export async function actLogin(email, pass) {
  if (!email?.trim()) throw new Error('Email is required')
  if (!pass) throw new Error('Password is required')
  await signInWithEmailAndPassword(auth, email.trim(), pass)
}

/**
 * Create a new user account.
 * - Validates name, email, and password (min 6 chars)
 * - Creates the Firebase Auth account
 * - Sets displayName on the Auth profile
 * - Creates the Firestore /users/{uid} document with all default fields
 */
export async function actSignup(email, pass, fullName) {
  if (!fullName?.trim()) throw new Error('Full name is required')
  if (!email?.trim()) throw new Error('Email is required')
  if (!pass || pass.length < 6) throw new Error('Password must be at least 6 characters')

  const cred = await createUserWithEmailAndPassword(auth, email.trim(), pass)

  // Set display name on the Auth profile so it's available immediately
  await updateProfile(cred.user, { displayName: fullName.trim() })

  // Create the Firestore user document with all default fields
  await setDoc(doc(db, 'users', cred.user.uid), {
    email: email.trim(),
    displayName: fullName.trim(),
    subscription: 'free',
    role: 'user',
    adminLevel: 0,
    online: true,
    blocked: false,
    myList: [],
    watchHistory: {},
    liked: [],
    createdAt: serverTimestamp(),
    lastSeen: serverTimestamp(),
  })
}

/**
 * Sign out the current user.
 * Marks the user offline in Firestore first, then signs out and
 * resets all user-specific fields in the local state.
 */
export async function actLogout() {
  if (S.user) {
    safeWrite(
      setDoc(
        doc(db, 'users', S.user.uid),
        { online: false, lastSeen: serverTimestamp() },
        { merge: true }
      )
    )
  }

  await signOut(auth)

  setState({
    user: null,
    isAdmin: false,
    isSuperAdmin: false,
    userRole: 'user',
    adminLevel: 0,
    userBlocked: false,
    myList: [],
    watchHistory: {},
    liked: [],
    sub: 'free',
    page: 'home',
    pc: null,
    pEp: 0,
    pShowLib: false,
    pShowComments: false,
    pComments: [],
    allUsers: [],
  })
}

/**
 * Mark the user as online in Firestore.
 * Called by the onAuthStateChanged listener after login.
 */
export function markOnline(uid, email, displayName) {
  safeWrite(
    setDoc(
      doc(db, 'users', uid),
      { email, displayName: displayName || '', online: true, lastSeen: serverTimestamp() },
      { merge: true }
    )
  )
}

/**
 * Mark the user as offline (called on beforeunload and sign-out).
 */
export function markOffline(uid) {
  safeWrite(
    setDoc(
      doc(db, 'users', uid),
      { online: false, lastSeen: serverTimestamp() },
      { merge: true }
    )
  )
}

/**
 * Refresh the user's online presence timestamp.
 * Call this periodically (every 5 mins) to keep the Users panel accurate.
 */
export function refreshPresence() {
  if (!S.user) return
  safeWrite(
    updateDoc(doc(db, 'users', S.user.uid), {
      online: true,
      lastSeen: serverTimestamp(),
    })
  )
}


// ─────────────────────────────────────────────────────────────────────────────
// AUTH — GOOGLE SIGN IN
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Sign in (or sign up) with Google using a popup window.
 *
 * Flow:
 *  1. Opens Google's OAuth popup
 *  2. On success, checks if a Firestore user document already exists
 *  3. If NEW user  → creates the full /users/{uid} document (like actSignup)
 *  4. If RETURNING user → merges latest Google profile data (name, email)
 *
 * The onAuthStateChanged listener in main.js handles updating state after
 * this resolves, so we don't need to call setState here.
 *
 * Returns 'cancelled' if the user closes the popup without signing in.
 * Throws on unexpected errors (network, config, etc.).
 */
export async function actGoogleSignIn() {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    const user = result.user

    // Check if a Firestore document already exists for this user
    const userRef = doc(db, 'users', user.uid)
    const snap = await getDoc(userRef)

    if (!snap.exists()) {
      // NEW user via Google — create full user document
      await setDoc(userRef, {
        email:        user.email,
        displayName:  user.displayName || user.email.split('@')[0],
        photoURL:     user.photoURL || null,
        subscription: 'free',
        role:         'user',
        adminLevel:   0,
        online:       true,
        blocked:      false,
        myList:       [],
        watchHistory: {},
        liked:        [],
        provider:     'google',
        createdAt:    serverTimestamp(),
        lastSeen:     serverTimestamp(),
      })
    } else {
      // RETURNING user — merge latest Google profile data
      safeWrite(
        setDoc(userRef, {
          email:       user.email,
          displayName: user.displayName || snap.data().displayName || '',
          photoURL:    user.photoURL || snap.data().photoURL || null,
          online:      true,
          lastSeen:    serverTimestamp(),
        }, { merge: true })
      )
    }

    return result.user
  } catch (err) {
    // User closed the popup — not a real error, just return silently
    if (
      err.code === 'auth/popup-closed-by-user' ||
      err.code === 'auth/cancelled-popup-request'
    ) {
      return 'cancelled'
    }
    // Popup blocked by browser — fall back to redirect
    if (err.code === 'auth/popup-blocked') {
      return actGoogleSignInRedirect()
    }
    throw err
  }
}

/**
 * Sign in with Google using a full-page redirect.
 * Use this as a fallback when popups are blocked (mobile browsers, some
 * desktop browsers with strict settings).
 *
 * After the redirect completes, call checkGoogleRedirectResult() on page load.
 */
export async function actGoogleSignInRedirect() {
  await signInWithRedirect(auth, googleProvider)
  // Page will redirect — execution stops here until the user comes back
}

/**
 * Check if the page loaded as a result of a Google redirect sign-in.
 * Call this ONCE on app start (in main.js before loadData).
 *
 * If a redirect just completed:
 *   - Creates/updates the Firestore user document (same logic as actGoogleSignIn)
 *   - Returns the Firebase User object
 *
 * If no redirect happened, returns null silently.
 */
export async function checkGoogleRedirectResult() {
  try {
    const result = await getRedirectResult(auth)
    if (!result) return null  // no redirect in progress

    const user = result.user
    const userRef = doc(db, 'users', user.uid)
    const snap = await getDoc(userRef)

    if (!snap.exists()) {
      await setDoc(userRef, {
        email:        user.email,
        displayName:  user.displayName || user.email.split('@')[0],
        photoURL:     user.photoURL || null,
        subscription: 'free',
        role:         'user',
        adminLevel:   0,
        online:       true,
        blocked:      false,
        myList:       [],
        watchHistory: {},
        liked:        [],
        provider:     'google',
        createdAt:    serverTimestamp(),
        lastSeen:     serverTimestamp(),
      })
    } else {
      safeWrite(
        setDoc(userRef, {
          email:       user.email,
          displayName: user.displayName || snap.data().displayName || '',
          photoURL:    user.photoURL || snap.data().photoURL || null,
          online:      true,
          lastSeen:    serverTimestamp(),
        }, { merge: true })
      )
    }

    return user
  } catch (err) {
    // Redirect result errors are non-fatal — log and continue
    console.warn('[DramaFlow] Google redirect result error:', err.message)
    return null
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// USER DATA — Load from Firestore into state
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Load the logged-in user's personal data from Firestore into state.
 * Populates: myList, watchHistory, liked, sub, userBlocked, userRole, adminLevel.
 */
export async function loadUserData(uid) {
  const snap = await getDoc(doc(db, 'users', uid))
  if (!snap.exists()) return

  const d = snap.data()
  setState({
    myList:        Array.isArray(d.myList) ? d.myList : [],
    watchHistory:  (d.watchHistory && typeof d.watchHistory === 'object') ? d.watchHistory : {},
    liked:         Array.isArray(d.liked) ? d.liked : [],
    sub:           d.subscription || 'free',
    userBlocked:   d.blocked === true,
    userRole:      d.role || 'user',
    adminLevel:    d.adminLevel || 0,
    ratings:       (d.ratings && typeof d.ratings === 'object') ? d.ratings : {},
    adCredits:     typeof d.adCredits === 'number' ? d.adCredits : 0,
    adCreditsUsed: (d.adCreditsUsed && typeof d.adCreditsUsed === 'object') ? d.adCreditsUsed : {},
  })
}

/**
 * Read admin role + level for a user from Firestore.
 * Returns { role, adminLevel, isAdmin, isSuperAdmin }.
 * Called by the auth listener after every login.
 */
export async function loadAdminRole(uid, email) {
  const snap = await getDoc(doc(db, 'users', uid))
  const d = snap.exists() ? snap.data() : {}
  const role = d.role || 'user'
  const adminLevel = d.adminLevel || 0
  const isSuperAdmin = email === ADMIN_EMAIL
  const isAdmin = isSuperAdmin || role === 'subadmin'
  return {
    role,
    adminLevel: isSuperAdmin ? 4 : adminLevel,
    isAdmin,
    isSuperAdmin,
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT + SETTINGS — Initial load
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Load all content and app settings from Firestore.
 * Seeds 10 mock dramas on first run if the content collection is empty.
 * Runs all Firestore reads in parallel for speed.
 */
export async function loadData() {
  setState({ appLoading: true, appError: null })
  try {
    const { seedIfEmpty } = await import('./mockData.js')
    await seedIfEmpty()

    const [contentSnap, sectionsSnap, trendingSnap, bannerSnap, secConfigsSnap] = await Promise.all([
      getDocs(collection(db, 'content')),
      getDoc(doc(db, 'settings', 'sections')),
      getDoc(doc(db, 'settings', 'trending')),
      getDoc(doc(db, 'settings', 'banner')),
      getDoc(doc(db, 'settings', 'sectionConfigs')),
    ])

    const content         = contentSnap.docs.map(d => ({ id: d.id, ...d.data() }))
    const sections        = sectionsSnap.exists()    ? (sectionsSnap.data().order    || []) : []
    const trendingIds     = trendingSnap.exists()    ? (trendingSnap.data().top10    || []) : []
    const bannerContentId = bannerSnap.exists()      ?  bannerSnap.data().contentId  : null
    const sectionConfigs  = secConfigsSnap.exists()  ?  secConfigsSnap.data().configs : null

    setState({ content, sections, trendingIds, bannerContentId, sectionConfigs, appLoading: false, appError: null })

    // Sync admin working copies
    S.tmpTrending = [...trendingIds]
    S.tmpSections = [...sections]
    S.tmpSectionConfigs = buildSectionConfigs()

    notify()
  } catch (err) {
    console.error('[DramaFlow] loadData failed:', err)
    const msg = navigator.onLine
      ? 'Failed to load content. Check your connection and try again.'
      : 'You appear to be offline. Showing cached content.'
    setState({ appLoading: false, appError: msg })
    notify()
  }
}

/**
 * Reload only the content collection.
 * Faster than a full loadData() — used after add/edit/delete operations.
 */
export async function reloadContent() {
  const snap = await getDocs(collection(db, 'content'))
  setState({ content: snap.docs.map(d => ({ id: d.id, ...d.data() })) })
}

/**
 * Build the ordered section config array for the Home Feed Builder.
 *
 * Always prepends the two special system rows:
 *   1. 🔥 Top 10 Trending
 *   2. ▶ Continue Watching
 *
 * Then appends content rows either from saved DB configs (preserving
 * pinnedIds) or defaults built from the current section name list.
 */
export function buildSectionConfigs() {
  const specials = [
    { name: 'Top 10 Trending', type: 'trending', pinnedIds: [] },
    { name: 'Continue Watching', type: 'continue', pinnedIds: [] },
  ]

  const dbConfigs = S.sectionConfigs

  if (dbConfigs && Array.isArray(dbConfigs)) {
    // Merge: keep saved config data for existing sections,
    // add default config for any new section names not yet saved
    const contentRows = S.tmpSections.map(name => {
      const saved = dbConfigs.find(c => c.name === name && c.type === 'content')
      return saved || { name, type: 'content', pinnedIds: [] }
    })
    return [...specials, ...contentRows]
  }

  // No saved config yet — build defaults from section names
  return [
    ...specials,
    ...S.tmpSections.map(name => ({ name, type: 'content', pinnedIds: [] })),
  ]
}

// ─────────────────────────────────────────────────────────────────────────────
// PLAYBACK
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Open the cinema player for a content item at a given episode.
 *
 * What happens:
 *  1. Opens the player immediately (optimistic — no loading wait)
 *  2. Auto-saves to My List if not already saved
 *  3. Records episode progress in watchHistory
 *  4. Increments the view counter on the content document
 *  5. Loads comments in the background
 *
 * Returns 'auth' if the user is not logged in.
 */
export async function actPlay(id, ep = 0) {
  if (!S.user) return 'auth'

  if (S.userBlocked) {
    alert('Your account has been blocked. Please contact support to appeal.')
    return
  }

  const c = findContent(id)
  if (!c) {
    console.warn('[DramaFlow] actPlay: content not found:', id)
    return
  }

  // Clamp episode index to a valid range
  const totalEps = c.episodes || 1
  const safeEp = Math.max(0, Math.min(ep, totalEps - 1))

  // ── Plan gate ────────────────────────────────────────────
  const access = canPlayEpisode(c, safeEp, S.sub)
  if (!access.allowed) {
    // Open the player in paywall mode — shows the content but blocks playback
    setState({ pc: c, pEp: safeEp, pShowLib: false, pShowComments: false, pComments: [], pPaywall: access.reason })
    notify()
    return 'paywall'
  }

  // Clear any previous paywall state
  S.pPaywall = null

  // Open the player immediately for snappy UX
  setState({ pc: c, pEp: safeEp, pShowLib: false, pShowComments: false, pComments: [], pPaywall: null })

  // Add to My List if not already there
  if (!S.myList.includes(id)) {
    S.myList = [...S.myList, id]
    safeWrite(updateDoc(doc(db, 'users', S.user.uid), { myList: arrayUnion(id) }))
  }

  // Save watch progress
  S.watchHistory = { ...S.watchHistory, [id]: safeEp }
  safeWrite(updateDoc(doc(db, 'users', S.user.uid), { [`watchHistory.${id}`]: safeEp }))

  // Increment view count
  safeWrite(updateDoc(doc(db, 'content', id), { views: increment(1) }))

  // Load comments (re-renders when ready)
  loadComments(id)

  notify()
}

/**
 * Switch to a different episode while the player is open.
 * Updates state immediately and syncs progress to Firestore in the background.
 */
export async function actChangeEp(ep) {
  if (!S.pc) return

  const totalEps = S.pc.episodes || 1
  const safeEp = Math.max(0, Math.min(ep, totalEps - 1))

  // Check plan gate for the requested episode
  const access = canPlayEpisode(S.pc, safeEp, S.sub)
  if (!access.allowed) {
    S.pEp = safeEp
    S.pPaywall = access.reason
    notify()
    return 'paywall'
  }

  S.pPaywall = null
  S.pEp = safeEp
  S.watchHistory = { ...S.watchHistory, [S.pc.id]: safeEp }

  if (S.user) {
    safeWrite(
      updateDoc(doc(db, 'users', S.user.uid), {
        [`watchHistory.${S.pc.id}`]: safeEp,
      })
    )
  }
}

/**
 * Close the player and return to the previous page.
 */
export function actClosePlayer() {
  setState({
    pc: null,
    pEp: 0,
    pShowLib: false,
    pShowComments: false,
    pComments: [],
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// MY LIST
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Toggle a content item in/out of the user's My List.
 * Optimistic update — state changes first, Firestore write follows.
 * Returns 'auth' if not logged in.
 */
export async function actToggleList(id) {
  if (!S.user) return 'auth'

  const c   = findContent(id)
  const isIn = S.myList.includes(id)
  if (isIn) {
    S.myList = S.myList.filter(x => x !== id)
    safeWrite(updateDoc(doc(db, 'users', S.user.uid), { myList: arrayRemove(id) }))
    showToast('Removed from My List')
  } else {
    S.myList = [...S.myList, id]
    safeWrite(updateDoc(doc(db, 'users', S.user.uid), { myList: arrayUnion(id) }))
    showToast((c?.title || 'Drama') + ' added to My List')
  }

  notify()
}

/**
 * Forcefully add an item to My List (no-op if already saved).
 */
export async function actAddToList(id) {
  if (!S.user) return 'auth'
  if (S.myList.includes(id)) return
  S.myList = [...S.myList, id]
  safeWrite(updateDoc(doc(db, 'users', S.user.uid), { myList: arrayUnion(id) }))
  notify()
}

/**
 * Forcefully remove an item from My List (no-op if not saved).
 */
export async function actRemoveFromList(id) {
  if (!S.user) return 'auth'
  if (!S.myList.includes(id)) return
  S.myList = S.myList.filter(x => x !== id)
  safeWrite(updateDoc(doc(db, 'users', S.user.uid), { myList: arrayRemove(id) }))
  notify()
}

// ─────────────────────────────────────────────────────────────────────────────
// LIKES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Toggle like on a content item.
 * Updates the local like count immediately so the UI feels instant.
 * Returns 'auth' if not logged in.
 */
export async function actToggleLike(id) {
  if (!S.user) return 'auth'

  const isLiked = S.liked.includes(id)
  const c = findContent(id)

  if (isLiked) {
    S.liked = S.liked.filter(x => x !== id)
    if (c) c.likes = Math.max(0, (c.likes || 0) - 1)
    safeWrite(updateDoc(doc(db, 'users', S.user.uid), { liked: arrayRemove(id) }))
    safeWrite(updateDoc(doc(db, 'content', id), { likes: increment(-1) }))
  } else {
    S.liked = [...S.liked, id]
    if (c) c.likes = (c.likes || 0) + 1
    safeWrite(updateDoc(doc(db, 'users', S.user.uid), { liked: arrayUnion(id) }))
    safeWrite(updateDoc(doc(db, 'content', id), { likes: increment(1) }))
  }

  notify()
}

// ─────────────────────────────────────────────────────────────────────────────
// COMMENTS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Post a new comment on a content item.
 * Refreshes the comment list after posting so the new comment appears.
 * Returns 'auth' if not logged in.
 */
export async function actComment(contentId, text) {
  if (!S.user) return 'auth'
  if (S.userBlocked) { showToast('Your account is blocked'); return 'blocked' }
  if (!text?.trim()) return
  if (!checkRateLimit('comment_' + S.user.uid, 5)) {
    showToast('Slow down — you are posting too fast')
    return 'rate_limit'
  }
  const clean = sanitizeText(text, 500)
  if (!clean) return

  await addDoc(collection(db, 'comments'), {
    contentId,
    userId: S.user.uid,
    userName: sanitizeText(S.user.displayName || S.user.email, 80),
    userEmail: S.user.email,
    text: clean,
    createdAt: serverTimestamp(),
  })

  await loadComments(contentId)
}

/**
 * Load all comments for a content item (newest first, max 100).
 * Updates state.pComments. Fails silently — returns empty array on error.
 */
export async function loadComments(contentId) {
  try {
    // Simple query without orderBy avoids needing a Firestore composite index
    const q = query(
      collection(db, 'comments'),
      where('contentId', '==', contentId),
      limit(100)
    )
    const snap = await getDocs(q)
    const comments = snap.docs
      .map(d => ({ id: d.id, ...d.data() }))
      // Sort newest-first client-side
      .sort((a, b) => {
        const ta = a.createdAt?.seconds || 0
        const tb = b.createdAt?.seconds || 0
        return tb - ta
      })
    setState({ pComments: comments })
  } catch (err) {
    console.warn('[DramaFlow] loadComments failed:', err.message)
    setState({ pComments: [] })
  }
}

/**
 * Delete a specific comment by its Firestore document ID.
 * Reloads comments for the current content after deletion.
 */
export async function actDeleteComment(commentId) {
  if (!S.user) return 'auth'
  await deleteDoc(doc(db, 'comments', commentId))
  if (S.pc) await loadComments(S.pc.id)
}

// ─────────────────────────────────────────────────────────────────────────────
// WATCH HISTORY
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Remove a single content item from the user's watch history.
 */
export async function actClearWatchItem(contentId) {
  if (!S.user) return 'auth'
  const newHistory = { ...S.watchHistory }
  delete newHistory[contentId]
  S.watchHistory = newHistory
  safeWrite(updateDoc(doc(db, 'users', S.user.uid), { [`watchHistory.${contentId}`]: null }))
  notify()
}

/**
 * Clear the entire watch history for the current user.
 */
export async function actClearAllHistory() {
  if (!S.user) return 'auth'
  if (!confirm('Clear all watch history? This cannot be undone.')) return
  S.watchHistory = {}
  safeWrite(updateDoc(doc(db, 'users', S.user.uid), { watchHistory: {} }))
  notify()
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN — CONTENT MANAGEMENT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Add a new content item to Firestore.
 * Validates required fields. Reloads content after success.
 */
export async function aAddContent(data) {
  try {
    assertAdminAccess(1)
    if (!data.title?.trim()) throw new Error('Title is required')
    if (!data.genre?.trim()) throw new Error('Genre is required')
    const epCount = Math.min(500, Math.max(1, parseInt(data.episodes) || 1))

    await addDoc(collection(db, 'content'), {
      title:       sanitizeText(data.title, 200),
      genre:       sanitizeText(data.genre, 80),
      thumbnail:   data.thumbnail?.trim()   || '',
      description: sanitizeText(data.description || '', 2000),
      section:     sanitizeText(data.section || '', 100),
      episodes:    epCount,
      episodeUrls: Array.isArray(data.episodeUrls) ? data.episodeUrls.slice(0, epCount) : [],
      exclusive:   data.exclusive === true,
      hidden:      false,
      likes:       0,
      views:       0,
      trending:    false,
      trendRank:   99,
      createdAt:   serverTimestamp(),
    })

    await reloadContent()
    notify()
    showToast('Content added ✓')
  } catch (err) {
    showToast('Failed to add content: ' + err.message, 4000)
    throw err
  }
}

/**
 * Edit an existing content item.
 * Only updates the fields that are provided in the data object.
 * Reloads content after success.
 */
export async function aEditContent(id, data) {
  assertAdminAccess(1)
  if (!id) throw new Error('Content ID is required')

  const allowed = [
    'title', 'genre', 'thumbnail', 'description',
    'section', 'episodes', 'episodeUrls', 'hidden',
    'exclusive', 'trending', 'trendRank',
  ]

  const update = {}
  for (const key of allowed) {
    if (data[key] !== undefined) update[key] = data[key]
  }

  // Sanitize and trim string fields
  for (const key of ['title', 'genre', 'description', 'section']) {
    if (typeof update[key] === 'string') update[key] = sanitizeText(update[key], key === 'description' ? 2000 : 200)
  }
  if (typeof update.thumbnail === 'string') update.thumbnail = update.thumbnail.trim().slice(0, 500)
  if (update.title?.length === 0) throw new Error('Title cannot be empty')
  if (update.episodes) update.episodes = Math.min(500, Math.max(1, parseInt(update.episodes) || 1))

  update.updatedAt = serverTimestamp()

  await updateDoc(doc(db, 'content', id), update)
  await reloadContent()
  notify()
}

/**
 * Permanently delete a content item from Firestore.
 * Uses a batch write to also:
 *   - Remove the item from the trending list if present
 *   - Reset the banner to a fallback item if this was the banner
 */
export async function aDeleteContent(id) {
  assertAdminAccess(1)
  const c = findContent(id)
  const name = c?.title || 'this item'
  if (!confirm(`Permanently delete "${name}"?\nThis cannot be undone.`)) return

  const batch = writeBatch(db)

  // Delete the content document
  batch.delete(doc(db, 'content', id))

  // Remove from trending list if present
  if (S.trendingIds.includes(id)) {
    const newTrending = S.trendingIds.filter(x => x !== id)
    batch.set(doc(db, 'settings', 'trending'), { top10: newTrending })
    S.tmpTrending = newTrending
    S.trendingIds = newTrending
  }

  // Reset banner if this was the active banner
  if (S.bannerContentId === id) {
    const fallback = visibleContent().find(x => x.id !== id)?.id || null
    batch.set(doc(db, 'settings', 'banner'), { contentId: fallback })
    S.bannerContentId = fallback
  }

  await batch.commit()
  await reloadContent()
  notify()
}

/**
 * Toggle the hidden flag on a content item.
 * Updates state immediately (optimistic). Writes to Firestore in background.
 */
export function aToggleHide(id, hidden) {
  const c = S.content.find(x => x.id === id)
  if (c) c.hidden = hidden
  safeWrite(updateDoc(doc(db, 'content', id), { hidden }))
  notify()
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN — BANNER
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Set the home page hero banner to a specific content item.
 */
export async function aSetBanner(id) {
  await setDoc(doc(db, 'settings', 'banner'), { contentId: id })
  setState({ bannerContentId: id })
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN — TRENDING
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Persist the current tmpTrending list to Firestore.
 * Enforces a maximum of 10 items.
 */
export async function aSaveTrending() {
  const ids = S.tmpTrending.slice(0, 10)
  await setDoc(doc(db, 'settings', 'trending'), { top10: ids })
  S.trendingIds = [...ids]
  S.tmpTrending = [...ids]
  notify()
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN — SECTION CONFIGS (Home Feed Builder)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Persist the full section config array to Firestore.
 *
 * Writes two documents atomically via batch:
 *   settings/sections        — ordered list of content section names (legacy)
 *   settings/sectionConfigs  — full config objects including type + pinnedIds
 */
export async function aSaveSectionConfigs(configs) {
  if (!Array.isArray(configs) || configs.length === 0) return

  const order = configs
    .filter(c => c.type === 'content')
    .map(c => c.name)
    .filter(Boolean)

  const batch = writeBatch(db)
  batch.set(doc(db, 'settings', 'sections'), { order })
  batch.set(doc(db, 'settings', 'sectionConfigs'), { configs })
  await batch.commit()

  const cloned = configs.map(c => ({ ...c, pinnedIds: [...(c.pinnedIds || [])] }))
  setState({
    sections: order,
    sectionConfigs: cloned,
    tmpSections: [...order],
    tmpSectionConfigs: cloned,
  })
  notify()
}

/**
 * Save just the section order (names array) without touching pinned card configs.
 */
export async function aSaveSections(order) {
  await setDoc(doc(db, 'settings', 'sections'), { order })
  setState({ sections: order, tmpSections: [...order] })
  S.tmpSectionConfigs = buildSectionConfigs()
  notify()
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN — USER MANAGEMENT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Load all registered users from Firestore.
 * Populates state.allUsers. Called when the Users tab opens or refreshes.
 */
export async function loadAllUsers() {
  const snap = await getDocs(collection(db, 'users'))
  setState({ allUsers: snap.docs.map(d => ({ id: d.id, ...d.data() })) })
}

/**
 * Change a user's subscription plan.
 * Valid values: 'free', 'standard', 'premium'.
 */
export async function aSetUserSub(uid, sub) {
  const valid = ['free', 'standard', 'premium']
  if (!valid.includes(sub)) return
  const u = S.allUsers.find(x => x.id === uid)
  const prevSub = u?.subscription || 'free'
  await updateDoc(doc(db, 'users', uid), { subscription: sub })
  setState({ allUsers: S.allUsers.map(u => u.id === uid ? { ...u, subscription: sub } : u) })
  writeAuditLog({ type: 'subscription', action: `Changed subscription`, targetUid: uid, targetName: u?.displayName || u?.email || uid, from: prevSub, to: sub })
}

/**
 * Block a user. Blocked users can browse but cannot watch content.
 * Records who blocked them and when.
 */
export async function aBlockUser(uid) {
  try { assertAdminAccess(3) } catch(e) { showToast('Access denied: ' + e.message); return }
  const u = S.allUsers.find(x => x.id === uid)
  const name = u?.displayName || u?.email || 'this user'
  if (!confirm(`Block ${name}?\nThey will be unable to watch content until unblocked.`)) return

  await updateDoc(doc(db, 'users', uid), {
    blocked: true,
    blockedAt: serverTimestamp(),
    blockedBy: S.user?.uid || 'admin',
  })

  setState({ allUsers: S.allUsers.map(u => u.id === uid ? { ...u, blocked: true } : u) })
  writeAuditLog({ type: 'block', action: 'Blocked user', targetUid: uid, targetName: name })
}

/**
 * Unblock a previously blocked user. Clears the blocked fields.
 */
export async function aUnblockUser(uid) {
  const u = S.allUsers.find(x => x.id === uid)
  await updateDoc(doc(db, 'users', uid), {
    blocked: false,
    blockedAt: null,
    blockedBy: null,
  })
  setState({ allUsers: S.allUsers.map(u => u.id === uid ? { ...u, blocked: false } : u) })
  writeAuditLog({ type: 'unblock', action: 'Unblocked user', targetUid: uid, targetName: u?.displayName || u?.email || uid })
}

/**
 * Permanently delete a user's Firestore document.
 *
 * ⚠️  This only deletes the /users/{uid} Firestore record.
 * The Firebase Auth account persists. To fully delete the account
 * you need Firebase Admin SDK on the server side.
 */
export async function aDeleteUser(uid, name) {
  try { assertAdminAccess(4) } catch(e) { showToast('Access denied: ' + e.message); return }
  const displayName = name || 'this user'
  if (!confirm(
    `Permanently delete ${displayName}?\n\n` +
    `This removes all their data from the database.\n` +
    `Note: Their login account may still exist in Firebase Auth.`
  )) return

  const batch = writeBatch(db)
  batch.delete(doc(db, 'users', uid))
  await batch.commit()

  setState({ allUsers: S.allUsers.filter(u => u.id !== uid) })
}

/**
 * Appoint a regular user as a Sub-Admin at a specific access level.
 *
 *  Level 1 — Content + Banner tabs only
 *  Level 2 — + Trending + Sections
 *  Level 3 — + Users (full sub-admin access)
 *
 * Records who appointed them and when for audit purposes.
 */
export async function aAppointAdmin(uid, name, level = 1) {
  const safeLevel = Math.max(1, Math.min(4, parseInt(level) || 1))
  const labels = {
    1: 'Level 1 — Content & Banner',
    2: 'Level 2 — + Trending, Sections, Promo & Notifications',
    3: 'Level 3 — Full Admin Access (Users & Credits)',
    4: 'Level 4 — Full access, same as Super Admin',
  }
  const displayName = name || 'this user'

  if (!confirm(
    `Appoint ${displayName} as Sub-Admin?\n\n` +
    `${labels[safeLevel]}\n\n` +
    `Level 1: Content + Banner\n` +
    `Level 2: + Trending, Sections, Promo, Notifications\n` +
    `Level 3: + Users, Credits panels\n` +
    `Level 4: Full access — same as Super Admin`
  )) return

  await updateDoc(doc(db, 'users', uid), {
    role: 'subadmin',
    adminLevel: safeLevel,
    appointedBy: S.user?.uid || 'superadmin',
    appointedAt: serverTimestamp(),
  })

  setState({
    allUsers: S.allUsers.map(u =>
      u.id === uid ? { ...u, role: 'subadmin', adminLevel: safeLevel } : u
    ),
  })
  writeAuditLog({ type: 'admin', action: 'Appointed sub-admin (Level ' + safeLevel + ')', targetUid: uid, targetName: name || uid })
}

/**
 * Change the access level of an existing Sub-Admin.
 * No confirmation needed — quick update via the level picker UI.
 */
export async function aChangeAdminLevel(uid, name, newLevel) {
  const safeLevel = Math.max(1, Math.min(4, parseInt(newLevel) || 1))
  const displayName = name || uid
  // Always set role to 'subadmin' — this promotes plain users too
  await updateDoc(doc(db, 'users', uid), {
    role:       'subadmin',
    adminLevel: safeLevel,
    appointedBy: S.user?.uid || 'admin',
    appointedAt: serverTimestamp(),
  })
  setState({
    allUsers: S.allUsers.map(u =>
      u.id === uid ? { ...u, role: 'subadmin', adminLevel: safeLevel } : u
    ),
  })
  showToast(displayName + ' is now Level ' + safeLevel + ' Admin', 2500)
  writeAuditLog({ type: 'admin', action: 'Changed admin level to ' + safeLevel, targetUid: uid, targetName: displayName })
}

/**
 * Revoke all admin access from a Sub-Admin.
 * Resets role to 'user' and adminLevel to 0.
 * Records who revoked and when.
 */
export async function aRevokeAdmin(uid, name) {
  const displayName = name || 'this user'
  if (!confirm(`Revoke all admin access from ${displayName}?\nThey will become a regular user.`)) return

  await updateDoc(doc(db, 'users', uid), {
    role: 'user',
    adminLevel: 0,
    revokedAt: serverTimestamp(),
    revokedBy: S.user?.uid || 'superadmin',
  })

  setState({
    allUsers: S.allUsers.map(u =>
      u.id === uid ? { ...u, role: 'user', adminLevel: 0 } : u
    ),
  })
  writeAuditLog({ type: 'admin', action: 'Revoked admin access', targetUid: uid, targetName: displayName })
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN — BULK OPERATIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Show or hide multiple content items in one batched Firestore write.
 * @param {string[]} ids    — Array of content document IDs
 * @param {boolean}  hidden — true = hide, false = show
 */
export async function aBulkSetHidden(ids, hidden) {
  if (!ids?.length) return
  const batch = writeBatch(db)
  for (const id of ids) {
    batch.update(doc(db, 'content', id), { hidden })
  }
  await batch.commit()
  setState({
    content: S.content.map(c => ids.includes(c.id) ? { ...c, hidden } : c),
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// PURE HELPERS — No Firestore calls, work on state only
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Filter visible content by search query and/or genre.
 * Case-insensitive. Searches title, genre, and description.
 */
export function filterContent(searchQuery = '', genre = '') {
  let items = visibleContent()
  if (genre) {
    items = items.filter(c => c.genre === genre)
  }
  if (searchQuery.trim()) {
    const q = searchQuery.trim().toLowerCase()
    items = items.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.genre.toLowerCase().includes(q) ||
      (c.description || '').toLowerCase().includes(q)
    )
  }
  return items
}

/**
 * Get the unique sorted list of genres from visible content.
 */
export function getGenres() {
  return [...new Set(visibleContent().map(c => c.genre).filter(Boolean))].sort()
}

/**
 * Get the top-N trending content items in their configured order.
 */
export function getTrending(n = 10) {
  const v = visibleContent()
  return S.trendingIds
    .slice(0, n)
    .map(id => v.find(c => c.id === id))
    .filter(Boolean)
}

/**
 * Get content the user has started watching (Continue Watching).
 * Returns visible items in watchHistory order.
 */
export function getContinueWatching() {
  const v = visibleContent()
  return Object.keys(S.watchHistory)
    .map(id => v.find(c => c.id === id))
    .filter(Boolean)
}

/**
 * Check whether a content item is saved in My List.
 */
export function isInMyList(id) {
  return S.myList.includes(id)
}

/**
 * Check whether a content item is liked by the current user.
 */
export function isLiked(id) {
  return S.liked.includes(id)
}

/**
 * Get the last-watched episode number for a content item.
 * Returns null if never watched.
 */
export function getWatchedEp(id) {
  const ep = S.watchHistory[id]
  return ep != null ? ep : null
}

// ─────────────────────────────────────────────────────────────────────────────
// RATINGS  (1–5 stars per content per user)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Rate a content item 1–5 stars.
 * Stores in /users/{uid}/ratings map and also updates aggregate
 * ratingSum + ratingCount on the content doc for calculating averages.
 */
export async function actRateContent(contentId, stars) {
  if (!S.user) return 'auth'
  stars = Math.max(1, Math.min(5, parseInt(stars) || 0))
  if (!stars) return

  const prev = S.ratings[contentId] || 0
  S.ratings = { ...S.ratings, [contentId]: stars }
  notify()

  const userRef = doc(db, 'users', S.user.uid)
  const contentRef = doc(db, 'content', contentId)

  safeWrite(updateDoc(userRef, { [`ratings.${contentId}`]: stars }))

  // Update aggregate: remove old rating, add new
  if (prev > 0) {
    safeWrite(updateDoc(contentRef, {
      ratingSum: increment(stars - prev),
      // ratingCount stays the same — we're replacing not adding
    }))
  } else {
    safeWrite(updateDoc(contentRef, {
      ratingSum: increment(stars),
      ratingCount: increment(1),
    }))
  }

  // Update local content cache
  const c = findContent(contentId)
  if (c) {
    if (prev === 0) {
      c.ratingCount = (c.ratingCount || 0) + 1
      c.ratingSum   = (c.ratingSum   || 0) + stars
    } else {
      c.ratingSum = (c.ratingSum || 0) + (stars - prev)
    }
  }
  notify()
}

/**
 * Get the average star rating for a content item (returns 0 if none).
 */
export function getAvgRating(c) {
  if (!c || !c.ratingCount || !c.ratingSum) return 0
  return Math.round((c.ratingSum / c.ratingCount) * 10) / 10
}

/**
 * Get the current user's personal rating for a content item (0 = not rated).
 */
export function getUserRating(contentId) {
  return S.ratings[contentId] || 0
}

// Load user ratings into state (called in loadUserData)
export function loadRatingsFromData(ratingsMap) {
  if (ratingsMap && typeof ratingsMap === 'object') {
    setState({ ratings: ratingsMap })
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARE
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Share a content item using the native Web Share API.
 * Falls back to copying a link to clipboard on unsupported browsers.
 */
export async function actShare(contentId) {
  const c = findContent(contentId)
  if (!c) return

  const url = `${window.location.origin}/?watch=${contentId}`
  const shareData = {
    title: c.title,
    text: `Watch "${c.title}" on DramaFlow — ${c.episodes} episodes of ${c.genre}`,
    url,
  }

  if (navigator.share) {
    try {
      await navigator.share(shareData)
    } catch (err) {
      if (err.name !== 'AbortError') fallbackCopyLink(url, c.title)
    }
  } else {
    fallbackCopyLink(url, c.title)
  }
}

function fallbackCopyLink(url, title) {
  navigator.clipboard?.writeText(url).then(() => {
    showToast(`Link copied! Share "${title}" anywhere.`)
  }).catch(() => {
    // Last resort: prompt
    window.prompt('Copy this link:', url)
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// NOTIFICATIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Load notifications for the current user.
 * Avoids orderBy+where composite index by sorting client-side.
 */
export async function loadNotifications() {
  if (!S.user) return
  try {
    // Simple where query — no orderBy, avoids needing a composite Firestore index
    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', S.user.uid),
      limit(50)
    )
    const snap = await getDocs(q)
    const notifs = snap.docs
      .map(d => ({ id: d.id, ...d.data() }))
      // Sort newest first client-side
      .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
      .slice(0, 20)
    setState({ notifications: notifs })
  } catch (err) {
    console.warn('[DramaFlow] loadNotifications failed:', err.message)
    // If even the simple query fails, set empty so UI shows correctly
    setState({ notifications: [] })
  }
}

/**
 * Mark all notifications as read for the current user.
 */
export async function markNotificationsRead() {
  if (!S.user || !S.notifications.length) return
  const unread = S.notifications.filter(n => !n.read)
  if (!unread.length) return

  const batch = writeBatch(db)
  unread.forEach(n => batch.update(doc(db, 'notifications', n.id), { read: true }))
  await batch.commit()

  setState({ notifications: S.notifications.map(n => ({ ...n, read: true })) })
}

/**
 * [Admin] Send a notification to all users who have a content item in their list.
 * Call this after adding a new episode or new content.
 * @param {string} contentId - The content to notify about
 * @param {string} message   - Custom message (optional)
 */
export async function adminSendNotification(contentId, message) {
  const c = findContent(contentId)
  if (!c) return

  const msg = message?.trim() || `New update for "${c.title}"!`

  // Find all users who have this content in their myList
  const usersSnap = await getDocs(collection(db, 'users'))
  const targets = usersSnap.docs
    .map(d => ({ uid: d.id, ...d.data() }))
    .filter(u => Array.isArray(u.myList) && u.myList.includes(contentId))

  if (!targets.length) {
    showToast('No users have this in their list yet.')
    return
  }

  const batch = writeBatch(db)
  targets.forEach(u => {
    const nRef = doc(collection(db, 'notifications'))
    batch.set(nRef, {
      userId:    u.uid,
      contentId,
      title:     c.title,
      thumbnail: c.thumbnail || '',
      message:   msg,
      read:      false,
      createdAt: serverTimestamp(),
    })
  })
  await batch.commit()
  showToast(`Notification sent to ${targets.length} user${targets.length !== 1 ? 's' : ''} who saved "${c.title}".`)
}

// ─────────────────────────────────────────────────────────────────────────────
// TOAST  (lightweight in-app flash messages)
// ─────────────────────────────────────────────────────────────────────────────

export function showToast(msg, duration = 3000) {
  // Remove existing toast
  document.getElementById('dfToast')?.remove()

  const el = document.createElement('div')
  el.id = 'dfToast'
  el.className = 'df-toast df-toast-in'
  el.textContent = msg
  document.body.appendChild(el)

  setTimeout(() => {
    el.classList.remove('df-toast-in')
    el.classList.add('df-toast-out')
    setTimeout(() => el.remove(), 400)
  }, duration)
}

// ─────────────────────────────────────────────────────────────────────────────
// RECOMMENDATIONS  ("Because you watched X")
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get recommended content based on the last-watched item.
 * Finds other titles in the same genre, excluding already-watched items.
 * Returns up to 8 items.
 */
export function getRecommendations() {
  const cwIds = Object.keys(S.watchHistory)
  if (!cwIds.length) return []

  // Last watched content item
  const lastId = cwIds[cwIds.length - 1]
  const last = findContent(lastId)
  if (!last) return []

  const v = visibleContent()

  // Same genre, not already watched, not the item itself
  const sameGenre = v
    .filter(c => c.genre === last.genre && c.id !== lastId && !S.watchHistory[c.id])
    .slice(0, 8)

  // Fill remaining slots with other genres if needed
  if (sameGenre.length < 4) {
    const others = v
      .filter(c => c.id !== lastId && !S.watchHistory[c.id] && !sameGenre.find(x => x.id === c.id))
      .slice(0, 8 - sameGenre.length)
    return [...sameGenre, ...others]
  }

  return sameGenre
}

/**
 * Get the title of the last-watched content for the section heading.
 */
export function getLastWatchedTitle() {
  const cwIds = Object.keys(S.watchHistory)
  if (!cwIds.length) return null
  return findContent(cwIds[cwIds.length - 1])?.title || null
}

// ─────────────────────────────────────────────────────────────────────────────
// AD CREDITS  — Watch an ad, earn 1 episode credit
// ─────────────────────────────────────────────────────────────────────────────

/** How many ad credits equal one episode unlock */
export const CREDITS_PER_AD = 1
/** Ad duration in seconds */
export const AD_DURATION = 30
/** Seconds before user can skip */
export const AD_SKIP_AFTER = 5

/**
 * Start watching an ad to earn a credit for a specific episode.
 * Sets adPlaying=true and adContext so the CreditPlayer knows what to unlock.
 * @param {string} contentId
 * @param {number} epIndex
 */
export function actStartAd(contentId, epIndex) {
  if (!S.user) return 'auth'
  setState({
    adPlaying:    true,
    adContext:    { contentId, epIndex },
    adTimeLeft:   AD_DURATION,
    adCanSkip:    false,
    adCompleted:  false,
    pPaywall:     null,  // close paywall while ad plays
  })
}

/**
 * Called when an ad completes (timer hits 0 OR user clicks skip after 5s).
 * Awards 1 credit, marks the episode as unlocked, saves to Firestore.
 */
export async function actAdCompleted() {
  if (!S.user) return

  // Credits page ad — no episode context, just award a credit
  if (!S.adContext) {
    const newCredits = (S.adCredits || 0) + CREDITS_PER_AD
    setState({ adCredits: newCredits, adCompleted: true, totalCreditsEarned: (S.totalCreditsEarned||0) + CREDITS_PER_AD })
    safeWrite(updateDoc(doc(db,'users',S.user.uid),{ adCredits: newCredits, totalCreditsEarned: increment(CREDITS_PER_AD), totalAdsWatched: increment(1) }))
    return
  }

  const { contentId, epIndex } = S.adContext

  // Award credit in state
  const newCredits    = (S.adCredits || 0) + CREDITS_PER_AD
  const prevUsed      = S.adCreditsUsed?.[contentId] || []
  const newUsed       = prevUsed.includes(epIndex) ? prevUsed : [...prevUsed, epIndex]
  const newUsedMap    = { ...S.adCreditsUsed, [contentId]: newUsed }

  setState({
    adCredits:     newCredits,
    adCreditsUsed: newUsedMap,
    adCompleted:   true,
  })

  // Save to Firestore
  safeWrite(
    updateDoc(doc(db, 'users', S.user.uid), {
      adCredits:                          newCredits,
      [`adCreditsUsed.${contentId}`]:     newUsed,
      totalAdsWatched:                    increment(1),
    })
  )

  showToast('Episode unlocked! Enjoy EP ' + (epIndex + 1), 3000)
}

/**
 * Called after the reward screen is dismissed — actually opens the episode.
 */
export async function actAdDismiss() {
  if (!S.adContext) { setState({ adPlaying: false, adContext: null, adCompleted: false }); return }

  const { contentId, epIndex } = S.adContext
  const c = findContent(contentId)

  setState({ adPlaying: false, adContext: null, adCompleted: false })

  if (c) {
    // Now play the unlocked episode
    await actPlay(contentId, epIndex)
  }
}

/**
 * Skip an ad (only allowed after AD_SKIP_AFTER seconds).
 * Skipping still awards the credit — fair exchange.
 */
export async function actSkipAd() {
  if (!S.adCanSkip) return
  await actAdCompleted()
}

/**
 * Called every second by the CreditPlayer countdown timer.
 */
export function adTick() {
  if (!S.adPlaying || S.adCompleted) return
  const next = S.adTimeLeft - 1
  if (next <= 0) {
    setState({ adTimeLeft: 0, adCanSkip: true })
    actAdCompleted()
  } else {
    setState({
      adTimeLeft: next,
      adCanSkip:  next <= AD_DURATION - AD_SKIP_AFTER,
    })
  }
}

/**
 * Cancel the ad (close without watching / without earning credit).
 */
export function actCancelAd() {
  setState({
    adPlaying:   false,
    adContext:   null,
    adCompleted: false,
    adTimeLeft:  AD_DURATION,
    adCanSkip:   false,
    pPaywall:    'episode_limit',  // re-show paywall
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// DEFAULT TASKS CONFIG
// Admin can override these via Firestore settings/tasks
// ─────────────────────────────────────────────────────────────────────────────

export const DEFAULT_TASKS = [
  {
    id: 'daily_login',
    type: 'streak',
    icon: 'calendar',
    title: 'Daily Login Streak',
    desc: 'Log in every day to earn credits. Complete 7 days for a bonus!',
    creditsPerDay: 1,        // credits earned each day
    maxStreak: 7,            // full cycle length
    streakBonusDay: 7,       // which day triggers the bonus
    streakBonusCredits: 2,   // extra credits awarded on that day
    enabled: true,
  },
  {
    id: 'watch_ad_page',
    type: 'watch_ad',
    icon: 'video',
    title: 'Watch a Short Video',
    desc: 'Watch a 30-second video and earn 1 credit. No limit.',
    creditsEarned: 1,
    cooldownMinutes: 0,      // 0 = no cooldown, watch unlimited times
    enabled: true,
  },
  {
    id: 'follow_instagram',
    type: 'social',
    icon: 'instagram',
    title: 'Follow on Instagram',
    desc: 'Follow @DramaFlow on Instagram and earn 2 credits.',
    creditsEarned: 2,
    platform: 'instagram',
    url: 'https://instagram.com/dramaflow',
    oneTime: true,           // can only complete once
    enabled: true,
  },
  {
    id: 'follow_youtube',
    type: 'social',
    icon: 'youtube',
    title: 'Subscribe on YouTube',
    desc: 'Subscribe to our YouTube channel and earn 2 credits.',
    creditsEarned: 2,
    platform: 'youtube',
    url: 'https://youtube.com/@dramaflow',
    oneTime: true,
    enabled: true,
  },
  {
    id: 'follow_twitter',
    type: 'social',
    icon: 'twitter',
    title: 'Follow on X (Twitter)',
    desc: 'Follow @DramaFlow on X and earn 1 credit.',
    creditsEarned: 1,
    platform: 'twitter',
    url: 'https://twitter.com/dramaflow',
    oneTime: true,
    enabled: true,
  },
  {
    id: 'share_app',
    type: 'action',
    icon: 'share',
    title: 'Share DramaFlow',
    desc: 'Share DramaFlow with a friend and earn 1 credit. (Once per day)',
    creditsEarned: 1,
    cooldownMinutes: 1440,   // once per day
    enabled: true,
  },
  {
    id: 'rate_content',
    type: 'action',
    icon: 'star',
    title: 'Rate a Drama',
    desc: 'Rate any drama you\'ve watched and earn 1 credit. (Once per day)',
    creditsEarned: 1,
    cooldownMinutes: 1440,
    enabled: true,
  },
]

/**
 * Get tasks config — uses admin-customised config if available, else defaults.
 */
export function getTasksConfig() {
  return S.tasksConfig || DEFAULT_TASKS
}

// ─────────────────────────────────────────────────────────────────────────────
// LOGIN STREAK
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Check and update login streak on every login / app open.
 * Awards credits for the streak bonus.
 * Called from the auth listener in main.js.
 */
export async function checkLoginStreak() {
  if (!S.user) return

  const today     = _todayStr()
  const last      = S.lastLoginDate
  const streak    = S.loginStreak || 0

  // Already credited today
  if (last === today) return

  // Get streak config
  const tasks      = getTasksConfig()
  const streakTask = tasks.find(t => t.id === 'daily_login') || {}
  const perDay     = streakTask.creditsPerDay     ?? 1
  const maxStreak  = streakTask.maxStreak         ?? 7
  const bonusDay   = streakTask.streakBonusDay    ?? 7
  const bonusAmt   = streakTask.streakBonusCredits ?? 2

  // Determine new streak
  const yesterday = _dateOffset(-1)
  let newStreak = 1
  if (last === yesterday) {
    newStreak = streak + 1    // continuing
  }
  // Missed a day → resets to 1 automatically

  // Check if this is the bonus day (completed full cycle)
  const isBonus   = newStreak === bonusDay
  const dayCredits = perDay + (isBonus ? bonusAmt : 0)

  // After completing the full cycle, reset streak to 0
  // so tomorrow starts at Day 1 again
  const savedStreak = newStreak >= maxStreak ? 0 : newStreak

  const newBalance = (S.adCredits || 0) + dayCredits

  setState({
    loginStreak:        savedStreak,
    lastLoginDate:      today,
    adCredits:          newBalance,
    totalCreditsEarned: (S.totalCreditsEarned || 0) + dayCredits,
  })

  safeWrite(
    updateDoc(doc(db, 'users', S.user.uid), {
      loginStreak:        savedStreak,
      lastLoginDate:      today,
      adCredits:          newBalance,
      totalCreditsEarned: increment(dayCredits),
    })
  )

  // Toast
  if (isBonus) {
    showToast(
      'Day ' + newStreak + ' complete! +' + perDay + ' + ' + bonusAmt + ' bonus = ' + dayCredits + ' credits. Streak resets tomorrow!',
      4500
    )
  } else {
    showToast(
      'Day ' + newStreak + ' streak! +' + dayCredits + ' credit' + (dayCredits !== 1 ? 's' : ''),
      3200
    )
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// TASK COMPLETION
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Complete a task and award credits.
 * Handles cooldown, one-time, and cooldown logic.
 * Returns 'auth' if not logged in.
 */
export async function actCompleteTask(taskId) {
  if (!S.user) return 'auth'

  const tasks = getTasksConfig()
  const task  = tasks.find(t => t.id === taskId)
  if (!task || !task.enabled) return

  const now          = Date.now()
  const todayStr     = _todayStr()
  const completed    = S.completedTasks || {}
  const lastDone     = completed[taskId]   // ISO string or null

  // ── One-time task check ──────────────────────────────────
  if (task.oneTime && lastDone) {
    showToast('✓ Already completed — you earned this credit!')
    return 'already_done'
  }

  // ── Cooldown check ───────────────────────────────────────
  if (task.cooldownMinutes > 0 && lastDone) {
    const lastMs  = new Date(lastDone).getTime()
    const elapsed = (now - lastMs) / 60000   // minutes elapsed
    if (elapsed < task.cooldownMinutes) {
      const remaining = Math.ceil(task.cooldownMinutes - elapsed)
      const label = remaining >= 1440
        ? Math.ceil(remaining / 1440) + 'd'
        : remaining >= 60
        ? Math.ceil(remaining / 60) + 'h'
        : remaining + 'm'
      showToast('Come back in ' + label + ' to do this again')
      return 'cooldown'
    }
  }

  // ── Award credits ────────────────────────────────────────
  const credits  = task.creditsEarned || 1
  const newTotal = (S.adCredits || 0) + credits
  const newCompleted = { ...completed, [taskId]: new Date().toISOString() }

  setState({
    adCredits:          newTotal,
    completedTasks:     newCompleted,
    totalCreditsEarned: (S.totalCreditsEarned || 0) + credits,
  })

  safeWrite(
    updateDoc(doc(db, 'users', S.user.uid), {
      adCredits:             newTotal,
      [`completedTasks.${taskId}`]: new Date().toISOString(),
      totalCreditsEarned:    increment(credits),
    })
  )

  showToast('+' + credits + ' credit' + (credits !== 1 ? 's' : '') + ' earned! Balance: ' + newTotal, 3000)
  return 'success'
}

/**
 * Check if a task is available for the current user right now.
 * Returns: 'available' | 'cooldown:{remaining}' | 'done' | 'disabled'
 */
export function getTaskStatus(taskId) {
  const tasks    = getTasksConfig()
  const task     = tasks.find(t => t.id === taskId)
  if (!task || !task.enabled) return 'disabled'

  const completed = S.completedTasks || {}
  const lastDone  = completed[taskId]

  if (task.oneTime && lastDone) return 'done'

  if (task.cooldownMinutes > 0 && lastDone) {
    const elapsed  = (Date.now() - new Date(lastDone).getTime()) / 60000
    if (elapsed < task.cooldownMinutes) {
      const remaining = Math.ceil(task.cooldownMinutes - elapsed)
      return 'cooldown:' + remaining
    }
  }

  return 'available'
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN — TASKS CONFIG
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Load admin-customised tasks config from Firestore.
 * Falls back to DEFAULT_TASKS if nothing saved.
 */
export async function loadTasksConfig() {
  try {
    const snap = await getDoc(doc(db, 'settings', 'tasks'))
    if (snap.exists()) {
      setState({ tasksConfig: snap.data().tasks })
    }
  } catch (e) {
    console.warn('[DramaFlow] loadTasksConfig failed:', e.message)
  }
}

/**
 * Save admin-customised tasks config to Firestore.
 */
export async function aSaveTasksConfig(tasks) {
  await setDoc(doc(db, 'settings', 'tasks'), { tasks })
  setState({ tasksConfig: tasks })
  showToast('✓ Tasks config saved!')
}

// ─────────────────────────────────────────────────────────────────────────────
// USER DATA — extend loadUserData to load streak + tasks
// (patch the function by exporting a complementary loader)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Load streak & task completion data into state.
 * Call this after loadUserData() in the auth listener.
 */
export async function loadStreakData(uid) {
  const snap = await getDoc(doc(db, 'users', uid))
  if (!snap.exists()) return
  const d = snap.data()
  setState({
    loginStreak:        d.loginStreak        || 0,
    lastLoginDate:      d.lastLoginDate       || null,
    completedTasks:     d.completedTasks      || {},
    totalCreditsEarned: d.totalCreditsEarned  || 0,
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// CREDITS PAGE — Watch ad from the dedicated page (not paywall)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Start watching an ad from the Credits page (not tied to any episode unlock).
 * After completion, just adds a credit to the balance.
 */
export function actStartPageAd() {
  if (!S.user) return 'auth'
  setState({
    adPlaying:    true,
    adContext:    null,      // no episode context — just earning a credit
    adSource:     'credits_page',
    adTimeLeft:   AD_DURATION,
    adCanSkip:    false,
    adCompleted:  false,
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function _todayStr() {
  return new Date().toISOString().slice(0, 10)   // 'YYYY-MM-DD'
}

function _dateOffset(days) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN — AWARD CREDITS TO A USER
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Admin awards a specific number of credits to any user.
 * Writes directly to that user's Firestore document.
 * @param {string} uid          - target user's UID
 * @param {string} displayName  - shown in confirmation
 * @param {number} amount       - credits to award (positive = add, negative = deduct)
 * @param {string} [reason]     - optional note stored in Firestore for audit
 */
export async function aAwardCredits(uid, displayName, amount, reason) {
  try { assertAdminAccess(3) } catch(e) { showToast('Access denied: ' + e.message); return }
  if (!uid || !amount) return
  const n = parseInt(amount)
  if (isNaN(n) || n === 0) { showToast('Enter a valid credit amount'); return }
  if (Math.abs(n) > 10000) { showToast('Amount too large (max ±10000)'); return }

  const userName = displayName || uid
  const verb     = n > 0 ? 'Award' : 'Deduct'
  const abs      = Math.abs(n)

  // Update the user's Firestore document atomically
  await updateDoc(doc(db, 'users', uid), {
    adCredits:          increment(n),
    totalCreditsEarned: n > 0 ? increment(n) : 0,   // only count additions
    [`creditLog.${Date.now()}`]: {
      amount:  n,
      reason:  reason?.trim() || (n > 0 ? 'Admin award' : 'Admin deduction'),
      by:      S.user?.uid || 'admin',
      at:      serverTimestamp(),
    },
  })

  // Refresh local allUsers list so the badge updates without a full reload
  setState({
    allUsers: S.allUsers.map(u =>
      u.id === uid
        ? { ...u, adCredits: Math.max(0, (u.adCredits || 0) + n) }
        : u
    ),
  })

  showToast(verb + 'ed ' + abs + ' credit' + (abs !== 1 ? 's' : '') + ' to ' + userName, 3000)
  writeAuditLog({ type: 'credits', action: (n > 0 ? 'Awarded' : 'Deducted') + ' ' + abs + ' credits', targetUid: uid, targetName: userName, amount: n, reason: reason?.trim() || '' })
}

// ─────────────────────────────────────────────────────────────────────────────
// PROMO POPUP
// ─────────────────────────────────────────────────────────────────────────────

/** Default promo config — shown to free users on first visit */
export const DEFAULT_PROMO = {
  enabled: true,
  title: 'Unlock Unlimited Drama',
  subtitle: 'Start your Premium trial today',
  body: 'Get access to all episodes, exclusive content, and HD quality — ad-free.',
  badge: 'Limited Offer',
  ctaLabel: 'Get Premium — ₹199/mo',
  ctaAction: 'subscribe',        // 'subscribe' | 'credits' | 'url'
  ctaUrl: '',                    // only used when ctaAction === 'url'
  secondaryLabel: 'Maybe later',
  showTo: 'always',              // 'all' | 'free' | 'loggedout' | 'always'
  delaySeconds: 3,               // seconds after page load before showing
  frequencyHours: 24,            // how often to show (per user, stored in localStorage)
  style: 'gradient',             // 'gradient' | 'minimal' | 'banner'
  accentColor: '#e5253f',        // hex color for accents
  imageUrl: '',                  // optional background image URL
}

/**
 * Load promo config from Firestore. Falls back to DEFAULT_PROMO.
 */
export async function loadPromoConfig() {
  try {
    const snap = await getDoc(doc(db, 'settings', 'promo'))
    const config = snap.exists() ? { ...DEFAULT_PROMO, ...snap.data() } : DEFAULT_PROMO
    setState({ promoConfig: config })
    return config
  } catch (e) {
    console.warn('[DramaFlow] loadPromoConfig failed:', e.message)
    setState({ promoConfig: DEFAULT_PROMO })
    return DEFAULT_PROMO
  }
}

/**
 * Save promo config to Firestore.
 */
export async function aSavePromoConfig(config) {
  await setDoc(doc(db, 'settings', 'promo'), config)
  setState({ promoConfig: config })
  showToast('Promo popup saved!')
}

/**
 * Check whether the promo should show for the current user.
 * Uses localStorage to track last-shown time per user.
 */
export function shouldShowPromo() {
  const cfg      = S.promoConfig || DEFAULT_PROMO
  if (!cfg.enabled) return false

  // Target audience check
  const sub      = S.sub || 'free'
  const loggedIn = !!S.user
  const isFree   = sub === 'free'

  if (cfg.showTo === 'free') {
    // Show to free users — both logged-in free users AND logged-out visitors
    if (loggedIn && !isFree) return false   // paid user — skip
  } else if (cfg.showTo === 'loggedout') {
    if (loggedIn) return false              // logged-in — skip
  } else if (cfg.showTo === 'all') {
    if (!loggedIn) return false             // not logged in — skip
  }
  // 'always' — show regardless

  // Frequency check — use 0 to mean "every visit" (no cooldown)
  const freqHours = cfg.frequencyHours != null ? Number(cfg.frequencyHours) : 24
  if (freqHours > 0) {
    const key        = 'dfPromoShown_' + (S.user?.uid || 'guest')
    const lastShown  = parseInt(localStorage.getItem(key) || '0')
    const hoursSince = (Date.now() - lastShown) / 3600000
    if (hoursSince < freqHours) return false
  }

  return true
}

/**
 * Mark promo as shown (saves timestamp to localStorage).
 */
export function markPromoShown() {
  const key = 'dfPromoShown_' + (S.user?.uid || 'guest')
  localStorage.setItem(key, String(Date.now()))
}

/**
 * Schedule the promo popup after a delay.
 * Call this after the app finishes loading.
 */
let _promoScheduled = false   // prevent double-scheduling in same session

export function schedulePromo() {
  if (_promoScheduled) return
  const cfg   = S.promoConfig || DEFAULT_PROMO
  if (!shouldShowPromo()) return
  _promoScheduled = true

  // delaySeconds = 0 means show immediately (next tick)
  const delaySec = cfg.delaySeconds != null ? Number(cfg.delaySeconds) : 3
  const delay    = Math.max(0, delaySec) * 1000

  setTimeout(() => {
    _promoScheduled = false   // allow re-schedule if config changes
    // Re-check conditions at fire time (user might have upgraded)
    if (shouldShowPromo() && !S.pc && !S.adPlaying && !S.showPromo) {
      setState({ showPromo: true })
      markPromoShown()
    }
  }, delay)
}

/** Force-show promo immediately (preview from admin) */
export function forceShowPromo() {
  _promoScheduled = false
  setState({ showPromo: true })
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN NOTIFICATIONS — Compose & broadcast
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Send a custom notification to a targeted audience.
 * Audience: 'all' | 'free' | 'standard' | 'premium' | 'saved_drama' | 'watched'
 */
export async function adminBroadcastNotification({ title, message, thumbnail, audience, dramaId }) {
  try { assertAdminAccess(2) } catch(e) { showToast('Access denied: ' + e.message); return 0 }
  const cleanTitle   = sanitizeText(title || '', 80)
  const cleanMessage = sanitizeText(message || '', 300)
  if (!cleanTitle || !cleanMessage) {
    showToast('Title and message are required')
    return 0
  }

  const usersSnap = await getDocs(collection(db, 'users'))
  let targets = usersSnap.docs.map(d => ({ uid: d.id, ...d.data() }))

  // Filter by audience
  if (audience === 'free')        targets = targets.filter(u => !u.subscription || u.subscription === 'free')
  else if (audience === 'standard') targets = targets.filter(u => u.subscription === 'standard')
  else if (audience === 'premium')  targets = targets.filter(u => u.subscription === 'premium')
  else if (audience === 'saved_drama' && dramaId) {
    targets = targets.filter(u => Array.isArray(u.myList) && u.myList.includes(dramaId))
  } else if (audience === 'watched' && dramaId) {
    targets = targets.filter(u => u.watchHistory && dramaId in u.watchHistory)
  }
  // 'all' — no filter

  if (!targets.length) {
    showToast('No users match this audience')
    return 0
  }

  // Firestore batch (max 500 per batch)
  const drama   = dramaId ? findContent(dramaId) : null
  const thumb   = thumbnail?.trim() || drama?.thumbnail || ''
  const BATCH_SIZE = 490

  let sent = 0
  for (let i = 0; i < targets.length; i += BATCH_SIZE) {
    const chunk = targets.slice(i, i + BATCH_SIZE)
    const batch = writeBatch(db)
    chunk.forEach(u => {
      const nRef = doc(collection(db, 'notifications'))
      batch.set(nRef, {
        userId:    u.uid,
        contentId: dramaId || null,
        title:     cleanTitle,
        thumbnail: thumb,
        message:   cleanMessage,
        read:      false,
        createdAt: serverTimestamp(),
      })
    })
    await batch.commit()
    sent += chunk.length
  }

  // Save to sent history
  await addDoc(collection(db, 'notifHistory'), {
    title:          cleanTitle,
    message:        cleanMessage,
    thumbnail:      thumb,
    audience,
    dramaId:        dramaId || null,
    recipientCount: sent,
    sentBy:         S.user?.uid || 'admin',
    sentAt:         serverTimestamp(),
  })

  showToast('Sent to ' + sent + ' user' + (sent !== 1 ? 's' : ''), 3000)
  return sent
}

/**
 * Load sent notification history for the admin panel.
 */
export async function loadNotifHistory() {
  try {
    const q = query(
      collection(db, 'notifHistory'),
      orderBy('sentAt', 'desc'),
      limit(20)
    )
    const snap = await getDocs(q)
    setState({ notifHistory: snap.docs.map(d => ({ id: d.id, ...d.data() })) })
  } catch (e) {
    console.warn('[DramaFlow] loadNotifHistory:', e.message)
    // Fallback without orderBy if index not ready
    try {
      const snap = await getDocs(collection(db, 'notifHistory'))
      const items = snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => (b.sentAt?.seconds || 0) - (a.sentAt?.seconds || 0))
        .slice(0, 20)
      setState({ notifHistory: items })
    } catch (e2) {
      setState({ notifHistory: [] })
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN CHAT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Send a chat message from admin to a specific user.
 * Messages stored in /adminChats/{uid}/messages/{msgId}
 */
export async function adminSendChat(uid, text) {
  try { assertAdminAccess(1) } catch(e) { showToast('Access denied: ' + e.message); return }
  if (!text?.trim()) return
  if (!checkRateLimit('adminChat_' + S.user.uid, 30)) { showToast('Sending too fast'); return }
  const clean = sanitizeText(text, 1000)
  if (!clean) return
  const msgRef = collection(db, 'adminChats', uid, 'messages')
  await addDoc(msgRef, {
    text:     clean,
    from:     'admin',
    fromName: sanitizeText(S.user?.displayName || S.user?.email || 'Admin', 80),
    fromUid:  S.user?.uid || 'admin',
    at:       serverTimestamp(),
    read:     false,
  })
  // Mark thread as having unread for user
  await setDoc(doc(db, 'adminChats', uid), {
    lastMsg:     text.trim(),
    lastAt:      serverTimestamp(),
    unreadUser:  true,
    unreadAdmin: false,
    userUid:     uid,
  }, { merge: true })
}

/**
 * Load chat messages for a specific user thread.
 */
export async function loadAdminChat(uid) {
  const q = query(
    collection(db, 'adminChats', uid, 'messages'),
    orderBy('at', 'asc'),
    limit(50)
  )
  const snap = await getDocs(q)
  const msgs = snap.docs.map(d => ({ id: d.id, ...d.data() }))
  setState({ chatMessages: msgs, chatUid: uid })
}

/**
 * Mark admin chat thread as read by admin side.
 */
export async function markAdminChatRead(uid) {
  await setDoc(doc(db, 'adminChats', uid), { unreadAdmin: false }, { merge: true })
}

// ─────────────────────────────────────────────────────────────────────────────
// ACTIVITY / AUDIT LOG
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Write an admin action to the audit log (Firestore: /adminLog/{docId}).
 * Called automatically by aSetUserSub, aAwardCredits, aAppointAdmin, etc.
 */
export async function writeAuditLog(action) {
  try {
    await addDoc(collection(db, 'adminLog'), {
      ...action,
      by:      S.user?.uid || 'admin',
      byName:  S.user?.displayName || S.user?.email || 'Admin',
      byEmail: S.user?.email || '',
      at:      serverTimestamp(),
    })
  } catch(e) {
    console.warn('[DramaFlow] auditLog write failed:', e.message)
  }
}

/**
 * Load recent admin activity log entries (last 100).
 */
export async function loadActivityLog() {
  try {
    const q = query(collection(db, 'adminLog'), orderBy('at', 'desc'), limit(100))
    const snap = await getDocs(q)
    setState({ activityLog: snap.docs.map(d => ({ id: d.id, ...d.data() })) })
  } catch (e) {
    // Try without orderBy if index missing
    try {
      const snap = await getDocs(collection(db, 'adminLog'))
      const items = snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => (b.at?.seconds || 0) - (a.at?.seconds || 0))
        .slice(0, 100)
      setState({ activityLog: items })
    } catch (e2) {
      setState({ activityLog: [] })
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// USER-SIDE CHAT (reading messages from admin)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Load messages sent to current user by admin.
 */
export async function loadUserChat() {
  if (!S.user) return
  try {
    const q = query(
      collection(db, 'adminChats', S.user.uid, 'messages'),
      orderBy('at', 'asc'),
      limit(50)
    )
    const snap = await getDocs(q)
    const msgs = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    setState({ userChatMessages: msgs })
    // Check unread
    const threadSnap = await getDoc(doc(db, 'adminChats', S.user.uid))
    const unread = threadSnap.exists() ? !!threadSnap.data().unreadUser : false
    setState({ userChatUnread: unread })
  } catch (e) {
    setState({ userChatMessages: [], userChatUnread: false })
  }
}

/**
 * Mark the user's chat thread as read on the user side.
 */
export async function markUserChatRead() {
  if (!S.user) return
  try {
    await setDoc(doc(db, 'adminChats', S.user.uid), { unreadUser: false }, { merge: true })
    setState({ userChatUnread: false })
  } catch (e) {}
}

/**
 * Send a reply message from user to admin.
 */
export async function userSendChat(text) {
  if (!S.user || !text?.trim()) return
  if (S.userBlocked) { showToast('Your account is blocked'); return }
  if (!checkRateLimit('uchat_' + S.user.uid, 15)) {
    showToast('Slow down — sending too many messages')
    return
  }
  const clean = sanitizeText(text, 1000)
  if (!clean) return
  const msgRef = collection(db, 'adminChats', S.user.uid, 'messages')
  await addDoc(msgRef, {
    text:     clean,
    from:     'user',
    fromName: sanitizeText(S.user.displayName || S.user.email || 'User', 80),
    fromUid:  S.user.uid,
    at:       serverTimestamp(),
    read:     false,
  })
  await setDoc(doc(db, 'adminChats', S.user.uid), {
    lastMsg:      clean,
    lastAt:       serverTimestamp(),
    unreadUser:   false,
    unreadAdmin:  true,
    userUid:      S.user.uid,
    userEmail:    S.user.email || '',
    userName:     sanitizeText(S.user.displayName || S.user.email || '', 80),
  }, { merge: true })
}

// ─────────────────────────────────────────────────────────────────────────────
// SECURITY UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Sanitize user-supplied text — strip HTML tags, limit length.
 * Use before writing any user input to Firestore or rendering in DOM.
 */
export function sanitizeText(str, maxLen = 2000) {
  if (typeof str !== 'string') return ''
  return str
    .replace(/[<>]/g, c => c === '<' ? '&lt;' : '&gt;')  // strip HTML
    .replace(/javascript:/gi, '')                          // strip JS URLs
    .replace(/on\w+\s*=/gi, '')                            // strip event attrs
    .slice(0, maxLen)
    .trim()
}

/**
 * Rate-limiting map: { key: [timestamps] }
 * Prevents rapid-fire writes (comments, chats, etc.)
 */
const _rateLimitMap = new Map()
export function checkRateLimit(key, maxPerMinute = 10) {
  const now = Date.now()
  const window = 60_000
  const times = (_rateLimitMap.get(key) || []).filter(t => now - t < window)
  if (times.length >= maxPerMinute) return false
  times.push(now)
  _rateLimitMap.set(key, times)
  return true
}

/**
 * Verify the current user is actually an admin/subadmin before any write.
 * Call at the start of every sensitive admin action.
 */
export function assertAdminAccess(minLevel = 1) {
  if (!S.user) throw new Error('Not authenticated')
  if (!S.isAdmin && !S.isSuperAdmin) throw new Error('Admin access required')
  if ((S.adminLevel || 0) < minLevel) throw new Error(`Level ${minLevel}+ required`)
  if (S.userBlocked) throw new Error('Account blocked')
}

/**
 * Validate content object before writing to Firestore.
 */
export function validateContentInput(data) {
  const errors = []
  if (!data.title?.trim())      errors.push('Title is required')
  if (data.title?.length > 200) errors.push('Title too long (max 200 chars)')
  if (!data.genre?.trim())      errors.push('Genre is required')
  if (data.genre?.length > 80)  errors.push('Genre too long')
  if (data.description?.length > 2000) errors.push('Description too long (max 2000 chars)')
  if (data.episodes < 1 || data.episodes > 500) errors.push('Episodes must be 1–500')
  if (errors.length) throw new Error(errors.join('. '))
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN GLOBAL GROUP CHAT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Send a message to the shared admin group channel.
 * Only accessible to admins/subadmins.
 */
export async function sendGlobalAdminChat(text) {
  try {
    assertAdminAccess(1)
  } catch (e) {
    showToast('Access denied: ' + e.message)
    return
  }
  const clean = sanitizeText(text, 1000)
  if (!clean) return
  if (!checkRateLimit('globalChat_' + S.user.uid, 20)) {
    showToast('Slow down — you are sending messages too fast')
    return
  }
  await addDoc(collection(db, 'adminGlobalChat'), {
    text:      clean,
    from:      S.user.uid,
    fromName:  S.user.displayName || S.user.email || 'Admin',
    fromEmail: S.user.email || '',
    level:     S.adminLevel || 1,
    at:        serverTimestamp(),
  })
}

/**
 * Load the last 80 messages from the admin global chat channel.
 */
export async function loadGlobalAdminChat() {
  try {
    assertAdminAccess(1)
  } catch (e) { return }
  const q = query(
    collection(db, 'adminGlobalChat'),
    orderBy('at', 'asc'),
    limit(80)
  )
  const snap = await getDocs(q)
  const msgs = snap.docs.map(d => ({ id: d.id, ...d.data() }))
  setState({ globalChatMessages: msgs })
}
