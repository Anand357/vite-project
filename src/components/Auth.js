// src/components/Auth.js
import { S } from '../store.js'
import { actLogin, actSignup, actGoogleSignIn } from '../utils/actions.js'

let _tab = 'login'

export function openAuth(tab = 'login') {
  _tab = tab
  const el = document.getElementById('authWrap')
  if (el) { el.classList.remove('hidden'); refreshForm() }
}

export function closeAuth() {
  document.getElementById('authWrap')?.classList.add('hidden')
}

// ── Render ────────────────────────────────────────────────
export function renderAuthOverlay() {
  return `<div id="authWrap" class="hidden">
    <div class="auth-card">
      <button class="auth-x" id="authX">×</button>
      <div class="auth-logo">Drama<em>Flow</em></div>
      <p class="auth-tagline">Your next obsession is one tap away.</p>

      <!-- Google sign-in button (works for both login and signup) -->
      <button class="btn-google" id="googleBtn">
        <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M43.611 20.083H42V20H24v8h11.303C33.65 33.093 29.268 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" fill="#FFC107"/>
          <path d="M6.306 14.691l6.571 4.819C14.655 15.108 19.001 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" fill="#FF3D00"/>
          <path d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" fill="#4CAF50"/>
          <path d="M43.611 20.083H42V20H24v8h11.303a11.966 11.966 0 01-4.087 5.571l6.19 5.238C39.9 36.76 44 30.859 44 24c0-1.341-.138-2.65-.389-3.917z" fill="#1976D2"/>
        </svg>
        Continue with Google
      </button>

      <div class="auth-divider"><span>or</span></div>

      <!-- Tab switcher -->
      <div class="auth-tabs">
        <button class="auth-tab${_tab === 'login' ? ' act' : ''}" id="aTabLogin">Login</button>
        <button class="auth-tab${_tab === 'signup' ? ' act' : ''}" id="aTabSignup">Sign Up</button>
      </div>

      <!-- Login form -->
      <div id="aLoginForm" ${_tab !== 'login' ? 'class="hidden"' : ''}>
        <div class="inp-group">
          <label class="inp-label">Email</label>
          <input class="inp" id="liE" type="email" placeholder="you@example.com" autocomplete="email">
        </div>
        <div class="inp-group">
          <label class="inp-label">Password</label>
          <input class="inp" id="liP" type="password" placeholder="Password" autocomplete="current-password">
        </div>
        <button class="btn btn-red fw" id="liBtn">Sign In</button>
        <p class="auth-err" id="liErr"></p>
      </div>

      <!-- Sign Up form -->
      <div id="aSignupForm" ${_tab !== 'signup' ? 'class="hidden"' : ''}>
        <div class="inp-group">
          <label class="inp-label">Full Name</label>
          <input class="inp" id="suN" type="text" placeholder="Your full name" autocomplete="name">
        </div>
        <div class="inp-group">
          <label class="inp-label">Email</label>
          <input class="inp" id="suE" type="email" placeholder="you@example.com" autocomplete="email">
        </div>
        <div class="inp-group">
          <label class="inp-label">Password</label>
          <input class="inp" id="suP" type="password" placeholder="Min. 6 characters" autocomplete="new-password">
        </div>
        <button class="btn btn-red fw" id="suBtn">Create Account</button>
        <p class="auth-err" id="suErr"></p>
      </div>

    </div>
  </div>`
}

// ── Refresh tabs without full re-render ────────────────────
export function refreshForm() {
  const lf = document.getElementById('aLoginForm')
  const sf = document.getElementById('aSignupForm')
  const tl = document.getElementById('aTabLogin')
  const ts = document.getElementById('aTabSignup')
  if (!lf) return
  lf.classList.toggle('hidden', _tab !== 'login')
  sf.classList.toggle('hidden', _tab !== 'signup')
  tl.classList.toggle('act', _tab === 'login')
  ts.classList.toggle('act', _tab === 'signup')
}

// ── Set loading state on a button ────────────────────────
function setLoading(btnId, loading, originalText) {
  const btn = document.getElementById(btnId)
  if (!btn) return
  btn.disabled = loading
  btn.textContent = loading ? 'Please wait…' : originalText
  btn.style.opacity = loading ? '0.7' : ''
}

// ── Bind all event listeners ──────────────────────────────
export function bindAuth() {
  // Close on X button
  document.getElementById('authX')?.addEventListener('click', closeAuth)

  // Close on backdrop click
  document.getElementById('authWrap')?.addEventListener('click', e => {
    if (e.target.id === 'authWrap') closeAuth()
  })

  // Tab switches
  document.getElementById('aTabLogin')?.addEventListener('click', () => {
    _tab = 'login'
    refreshForm()
  })
  document.getElementById('aTabSignup')?.addEventListener('click', () => {
    _tab = 'signup'
    refreshForm()
  })

  // ── Google sign-in ──────────────────────────────────────
  document.getElementById('googleBtn')?.addEventListener('click', async () => {
    const btn = document.getElementById('googleBtn')
    const originalText = btn?.innerHTML
    if (btn) {
      btn.disabled = true
      btn.innerHTML = '<span style="display:inline-block;width:16px;height:16px;border:2px solid rgba(0,0,0,.2);border-top-color:#555;border-radius:50%;animation:spin .6s linear infinite;vertical-align:middle;margin-right:8px"></span>Signing in…'
    }
    // Clear any existing errors
    ;['liErr', 'suErr'].forEach(id => {
      const el = document.getElementById(id)
      if (el) el.textContent = ''
    })
    try {
      const result = await actGoogleSignIn()
      if (result !== 'cancelled') {
        closeAuth()
      }
    } catch (err) {
      // Show error in whichever form is visible
      const errId = _tab === 'signup' ? 'suErr' : 'liErr'
      const errEl = document.getElementById(errId)
      if (errEl) errEl.textContent = _friendlyGoogleError(err)
    } finally {
      if (btn) {
        btn.disabled = false
        btn.innerHTML = originalText
      }
    }
  })

  // ── Email login ─────────────────────────────────────────
  document.getElementById('liBtn')?.addEventListener('click', async () => {
    const email  = document.getElementById('liE')?.value?.trim()
    const pass   = document.getElementById('liP')?.value
    const errEl  = document.getElementById('liErr')
    if (errEl) errEl.textContent = ''

    setLoading('liBtn', true, 'Sign In')
    try {
      await actLogin(email, pass)
      closeAuth()
    } catch (err) {
      if (errEl) errEl.textContent = _friendlyAuthError(err)
    } finally {
      setLoading('liBtn', false, 'Sign In')
    }
  })

  // Allow Enter key to submit login form
  document.getElementById('liP')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('liBtn')?.click()
  })

  // ── Email sign-up ───────────────────────────────────────
  document.getElementById('suBtn')?.addEventListener('click', async () => {
    const name   = document.getElementById('suN')?.value?.trim()
    const email  = document.getElementById('suE')?.value?.trim()
    const pass   = document.getElementById('suP')?.value
    const errEl  = document.getElementById('suErr')
    if (errEl) errEl.textContent = ''

    setLoading('suBtn', true, 'Create Account')
    try {
      await actSignup(email, pass, name)
      closeAuth()
    } catch (err) {
      if (errEl) errEl.textContent = _friendlyAuthError(err)
    } finally {
      setLoading('suBtn', false, 'Create Account')
    }
  })

  // Allow Enter key on last signup field
  document.getElementById('suP')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('suBtn')?.click()
  })
}

// ── Friendly error messages ───────────────────────────────
function _friendlyAuthError(err) {
  const map = {
    'auth/user-not-found':        'No account found with this email.',
    'auth/wrong-password':        'Incorrect password. Please try again.',
    'auth/invalid-credential':    'Incorrect email or password.',
    'auth/invalid-email':         'Please enter a valid email address.',
    'auth/email-already-in-use':  'An account with this email already exists.',
    'auth/weak-password':         'Password must be at least 6 characters.',
    'auth/too-many-requests':     'Too many attempts. Please wait a moment.',
    'auth/network-request-failed':'Network error. Check your connection.',
    'auth/user-disabled':         'This account has been disabled.',
  }
  return map[err.code] || err.message || 'Something went wrong. Please try again.'
}

function _friendlyGoogleError(err) {
  const map = {
    'auth/account-exists-with-different-credential':
      'An account already exists with this email using a different sign-in method. Try logging in with email/password.',
    'auth/popup-blocked':
      'Popup was blocked by your browser. Please allow popups for this site.',
    'auth/network-request-failed':
      'Network error. Check your connection and try again.',
    'auth/internal-error':
      'Google sign-in failed. Please try again.',
  }
  return map[err.code] || err.message || 'Google sign-in failed. Please try again.'
}
