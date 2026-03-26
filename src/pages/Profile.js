// src/pages/Profile.js
import { S } from '../store.js'

// ── Icons ─────────────────────────────────────────────────
const I = {
  plan:     `<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  bookmark: `<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>`,
  heart:    `<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
  play:     `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`,
  eye:      `<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  fire:     `<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/><path stroke-linecap="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"/></svg>`,
  star:     `<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>`,
  credits:  `<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" d="M12 8v8M8 12h8"/></svg>`,
  calendar: `<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`,
  email:    `<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>`,
  shield:   `<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`,
  moon:     `<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`,
  sun:      `<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path stroke-linecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`,
  monitor:  `<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path stroke-linecap="round" d="M8 21h8M12 17v4"/></svg>`,
  settings: `<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path stroke-linecap="round" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
  signout:  `<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>`,
  crown:    `<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M5 19l2-7 5 4 5-4 2 7H5zM3 11l4 2 5-8 5 8 4-2"/></svg>`,
  google:   `<svg viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>`,
  chevron:  `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M9 5l7 7-7 7"/></svg>`,
  trophy:   `<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M8 21h8m-4-4v4M5 3h14M6 3c0 5.523 2.686 10 6 10s6-4.477 6-10M3 5h2M19 5h2M3 5c0 2.761 1.343 5 3 5M21 5c0 2.761-1.343 5-3 5"/></svg>`,
  bell:     `<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>`,
  share:    `<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.632 4.684a3 3 0 11-2.684-2.684M12 6a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
  chart:    `<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>`,
  tag:      `<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>`,
  edit:     `<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>`,
  notification: `<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>`,
}

// ── Logged-out ─────────────────────────────────────────────
function renderLoggedOut() {
  return `<div class="page prof-guest">
    <div class="prof-guest-inner">
      <div class="prof-guest-icon">
        <svg width="52" height="52" fill="none" stroke="currentColor" stroke-width="1.2" viewBox="0 0 24 24">
          <path stroke-linecap="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
      </div>
      <h2 class="prof-guest-title">Your Profile</h2>
      <p class="prof-guest-sub">Sign in to track your watch history, earn credits, and manage your account.</p>
      <div class="prof-guest-btns">
        <button class="btn btn-outline" onclick="A.openAuth('login')">Sign In</button>
        <button class="btn btn-red"     onclick="A.openAuth('signup')">Create Account</button>
      </div>
    </div>
  </div>`
}

// ── Helper: row ────────────────────────────────────────────
function prow({ icon, iconBg, label, sub, onclick, chevron = true, variant = '', right = '' }) {
  return `<div class="prow${variant ? ' prow-' + variant : ''}"${onclick ? ` onclick="${onclick}"` : ' style="cursor:default"'}>
    <div class="prow-l">
      <div class="prow-ic${iconBg ? ' prow-ic--' + iconBg : ''}">${icon}</div>
      <div class="prow-txt">
        <div class="prow-name">${label}</div>
        ${sub ? `<div class="prow-sub">${sub}</div>` : ''}
      </div>
    </div>
    <div class="prow-r">
      ${right}
      ${chevron && onclick ? `<span class="prow-chevron">${I.chevron}</span>` : ''}
    </div>
  </div>`
}

// ── Main ───────────────────────────────────────────────────
export function renderProfile() {
  if (!S.user) return renderLoggedOut()

  const { user, sub, myList, watchHistory, liked, isAdmin, isSuperAdmin, adminLevel } = S
  const credits    = S.adCredits || 0
  const streak     = S.loginStreak || 0
  const total      = S.totalCreditsEarned || 0
  const allContent = S.content.filter(c => !c.hidden)
  const cwKeys     = Object.keys(watchHistory)
  const letter     = (user.displayName || user.email || 'U')[0].toUpperCase()
  const isGoogle   = user.providerData?.[0]?.providerId === 'google.com'
  const planLabel  = sub.charAt(0).toUpperCase() + sub.slice(1)
  const currentTheme = localStorage.getItem('dfTheme') || 'system'

  const joinDate = user.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
    : '—'

  // ── Continue watching ────────────────────────────────────
  const recentlyWatched = cwKeys
    .map(id => allContent.find(c => c.id === id))
    .filter(Boolean).slice(0, 12)

  // ── Liked dramas ─────────────────────────────────────────
  const likedContent = liked
    .map(id => allContent.find(c => c.id === id))
    .filter(Boolean).slice(0, 12)

  // ── Genre taste breakdown ─────────────────────────────────
  const genreCount = {}
  cwKeys.forEach(id => {
    const c = allContent.find(x => x.id === id)
    if (c?.genre) genreCount[c.genre] = (genreCount[c.genre] || 0) + 1
  })
  const topGenres = Object.entries(genreCount).sort((a,b) => b[1]-a[1]).slice(0, 5)
  const maxG = topGenres[0]?.[1] || 1

  // ── Achievements / badges ─────────────────────────────────
  const achievements = []
  if (cwKeys.length >= 1)  achievements.push({ icon: '▶', label: 'First Watch',    desc: 'Watched your first drama' })
  if (cwKeys.length >= 10) achievements.push({ icon: '📺', label: 'Binge Watcher',  desc: 'Watched 10+ dramas' })
  if (cwKeys.length >= 25) achievements.push({ icon: '🎬', label: 'Drama Addict',   desc: 'Watched 25+ dramas' })
  if (liked.length >= 5)   achievements.push({ icon: '❤️', label: 'Fan Favourite',  desc: 'Liked 5+ dramas' })
  if (streak >= 3)         achievements.push({ icon: '🔥', label: 'On Fire',        desc: '3+ day login streak' })
  if (streak >= 7)         achievements.push({ icon: '⚡', label: 'Unstoppable',    desc: '7-day streak complete' })
  if (total >= 10)         achievements.push({ icon: '💰', label: 'Credit Earner',  desc: 'Earned 10+ credits' })
  if (myList.length >= 5)  achievements.push({ icon: '🔖', label: 'Collector',      desc: 'Saved 5+ to My List' })
  if (sub === 'premium')   achievements.push({ icon: '👑', label: 'VIP Member',     desc: 'Premium subscriber' })
  if (isAdmin)             achievements.push({ icon: '🛡️', label: 'Team DramaFlow', desc: 'Admin team member' })

  // ── Admin ─────────────────────────────────────────────────
  const adminBadge = isSuperAdmin ? { label: 'Super Admin', cls: 'prof-admin-badge-super' }
    : adminLevel >= 4 ? { label: 'L4 Admin',   cls: 'prof-admin-badge-super' }
    : adminLevel === 3 ? { label: 'L3 Admin',   cls: 'prof-admin-badge-l3' }
    : adminLevel === 2 ? { label: 'L2 Admin',   cls: 'prof-admin-badge-l2' }
    : adminLevel === 1 ? { label: 'L1 Admin',   cls: 'prof-admin-badge-l1' }
    : null

  const adminSub = isSuperAdmin ? 'Full access to all panels'
    : adminLevel >= 3 ? 'Content, Users, Credits & more'
    : adminLevel === 2 ? 'Content, Trending, Promo & Notifications'
    : 'Content & Banner management'

  // ── Inline horizontal card scroller ──────────────────────
  function hScroll(items, cardFn) {
    if (!items.length) return ''
    return `<div class="prof-hscroll">${items.map(cardFn).join('')}</div>`
  }

  // ── Theme toggle label ────────────────────────────────────
  const themeIcon  = currentTheme === 'dark' ? I.moon : currentTheme === 'light' ? I.sun : I.monitor
  const themeLabel = currentTheme === 'dark' ? 'Dark mode' : currentTheme === 'light' ? 'Light mode' : 'System default'

  return `<div class="page prof-page">

    <!-- ═══ HERO COVER ═══ -->
    <div class="prof-cover">
      <div class="prof-cover-mesh"></div>
    </div>

    <!-- ═══ AVATAR ═══ -->
    <div class="prof-av-block">
      <div class="prof-av-wrap">
        <div class="prof-av">${letter}</div>
        <div class="prof-av-provider" title="${isGoogle ? 'Google' : 'Email'}">
          ${isGoogle ? I.google : I.shield}
        </div>
      </div>
    </div>

    <!-- ═══ IDENTITY ═══ -->
    <div class="prof-identity">
      <h1 class="prof-dname">${user.displayName || 'DramaFlow User'}</h1>
      <p  class="prof-email">${user.email}</p>
      <div class="prof-id-badges">
        <span class="prof-plan-badge prof-plan-${sub}">${planLabel}</span>
        ${adminBadge ? `<span class="prof-admin-badge ${adminBadge.cls}">${adminBadge.label}</span>` : ''}
        ${streak > 0 ? `<span class="prof-streak-badge">🔥 ${streak}d streak</span>` : ''}
      </div>
    </div>

    <!-- ═══ STATS ROW ═══ -->
    <div class="prof-stats-wrap">
      <div class="prof-stat" onclick="A.nav('library')">
        <div class="prof-stat-n">${cwKeys.length}</div>
        <div class="prof-stat-l">Watched</div>
      </div>
      <div class="prof-stat-div"></div>
      <div class="prof-stat" onclick="A.nav('mylist')">
        <div class="prof-stat-n">${myList.length}</div>
        <div class="prof-stat-l">Saved</div>
      </div>
      <div class="prof-stat-div"></div>
      <div class="prof-stat">
        <div class="prof-stat-n">${liked.length}</div>
        <div class="prof-stat-l">Liked</div>
      </div>
      <div class="prof-stat-div"></div>
      <div class="prof-stat" onclick="A.nav('credits')">
        <div class="prof-stat-n" style="color:var(--jade)">${credits}</div>
        <div class="prof-stat-l">Credits</div>
      </div>
    </div>

    <!-- ═══ QUICK ACTIONS ═══ -->
    <div class="prof-section prof-quick-actions">
      <button class="prof-qa" onclick="A.nav('credits')">
        <div class="prof-qa-ic">${I.credits}</div>
        <span>Earn Credits</span>
      </button>
      <button class="prof-qa" onclick="A.nav('search')">
        <div class="prof-qa-ic">${I.eye}</div>
        <span>Discover</span>
      </button>
      <button class="prof-qa" onclick="A.nav('mylist')">
        <div class="prof-qa-ic">${I.bookmark}</div>
        <span>My List</span>
      </button>
      <button class="prof-qa" onclick="A.nav('subscribe')">
        <div class="prof-qa-ic">${I.crown}</div>
        <span>Plans</span>
      </button>
    </div>

    <!-- ═══ CREDITS CARD (free/standard) ═══ -->
    ${sub !== 'premium' ? `
    <div class="prof-section">
      <div class="prof-credits-banner" onclick="A.nav('credits')">
        <div class="prof-credits-banner-left">
          <div class="prof-credits-num">${credits}</div>
          <div class="prof-credits-label">Episode Credits</div>
          <div class="prof-credits-desc">${
            credits > 0
              ? `Use ${credits} credit${credits !== 1 ? 's' : ''} to unlock episodes`
              : 'Complete tasks to earn free credits'
          }</div>
        </div>
        <div class="prof-credits-banner-right">
          <div class="prof-credits-earned">
            <span class="prof-credits-earned-n">${total}</span>
            <span class="prof-credits-earned-l">total earned</span>
          </div>
          <div class="prof-credits-streak">
            <span class="prof-credits-streak-n">${streak}</span>
            <span class="prof-credits-streak-l">day streak</span>
          </div>
        </div>
        <div class="prof-credits-cta">Earn More ${I.chevron}</div>
      </div>
    </div>` : ''}

    <!-- ═══ CONTINUE WATCHING ═══ -->
    ${recentlyWatched.length ? `
    <div class="prof-section">
      <div class="prof-section-head">
        <span class="prof-section-title">Continue Watching</span>
        <button class="prof-section-more" onclick="A.nav('library')">See all</button>
      </div>
      ${hScroll(recentlyWatched, c => `
        <div class="prof-cw-card" onclick="A.play('${c.id}',${watchHistory[c.id] ?? 0})">
          <div class="prof-cw-img-wrap">
            <img src="${c.thumbnail}" class="prof-cw-img" loading="lazy">
            <div class="prof-cw-overlay">
              <div class="prof-cw-play">${I.play}</div>
            </div>
            <div class="prof-cw-prog-bar">
              <div class="prof-cw-prog-fill" style="width:${Math.round(((watchHistory[c.id]??0)+1)/c.episodes*100)}%"></div>
            </div>
          </div>
          <div class="prof-cw-name">${c.title}</div>
          <div class="prof-cw-ep">EP ${(watchHistory[c.id]??0)+1} / ${c.episodes}</div>
        </div>`)}
    </div>` : ''}

    <!-- ═══ LIKED DRAMAS ═══ -->
    ${likedContent.length ? `
    <div class="prof-section">
      <div class="prof-section-head">
        <span class="prof-section-title">❤ Liked Dramas</span>
        <span class="prof-section-count">${likedContent.length}</span>
      </div>
      ${hScroll(likedContent, c => `
        <div class="prof-liked-card" onclick="A.openDetail('${c.id}')">
          <img src="${c.thumbnail}" class="prof-liked-img" loading="lazy">
          <div class="prof-liked-name">${c.title}</div>
        </div>`)}
    </div>` : ''}

    <!-- ═══ GENRE TASTE ═══ -->
    ${topGenres.length >= 2 ? `
    <div class="prof-section">
      <div class="prof-section-head">
        <span class="prof-section-title">Your Taste</span>
        <span class="prof-section-sub">${cwKeys.length} dramas watched</span>
      </div>
      <div class="prof-genres">
        ${topGenres.map(([genre, count], i) => `
          <div class="prof-genre-row">
            <div class="prof-genre-name">${genre}</div>
            <div class="prof-genre-bar-wrap">
              <div class="prof-genre-bar" style="width:${Math.round(count/maxG*100)}%;opacity:${1 - i*0.15}"></div>
            </div>
            <div class="prof-genre-count">${count}</div>
          </div>`).join('')}
      </div>
    </div>` : ''}

    <!-- ═══ ACHIEVEMENTS ═══ -->
    ${achievements.length ? `
    <div class="prof-section">
      <div class="prof-section-head">
        <span class="prof-section-title">Achievements</span>
        <span class="prof-section-count">${achievements.length}</span>
      </div>
      <div class="prof-achievements">
        ${achievements.map(a => `
          <div class="prof-achievement">
            <div class="prof-ach-icon">${a.icon}</div>
            <div class="prof-ach-label">${a.label}</div>
            <div class="prof-ach-desc">${a.desc}</div>
          </div>`).join('')}
      </div>
    </div>` : ''}

    <!-- ═══ ADMIN ═══ -->
    ${isAdmin ? `
    <div class="prof-section">
      <div class="prof-section-title">Administration</div>
      ${prow({ icon: I.settings, iconBg: 'amber', label: isSuperAdmin ? 'Super Admin Panel' : 'Admin Panel', sub: adminSub, onclick: "A.nav('admin')", variant: 'admin' })}
    </div>` : ''}

    <!-- ═══ APPEARANCE ═══ -->
    <div class="prof-section">
      <div class="prof-section-title">Appearance</div>
      <div class="prof-theme-row">
        <div class="prof-theme-info">
          <div class="prof-theme-icon">${themeIcon}</div>
          <div>
            <div class="prof-theme-title">Theme</div>
            <div class="prof-theme-sub">${themeLabel}</div>
          </div>
        </div>
        <div class="prof-theme-btns">
          <button class="prof-theme-btn${currentTheme==='system'?' act':''}" onclick="A.setTheme('system')" title="System">${I.monitor}<span>System</span></button>
          <button class="prof-theme-btn${currentTheme==='light' ?' act':''}" onclick="A.setTheme('light')"  title="Light">${I.sun}<span>Light</span></button>
          <button class="prof-theme-btn${currentTheme==='dark'  ?' act':''}" onclick="A.setTheme('dark')"   title="Dark">${I.moon}<span>Dark</span></button>
        </div>
      </div>
    </div>

    <!-- ═══ SUBSCRIPTION ═══ -->
    <div class="prof-section">
      <div class="prof-section-title">Subscription</div>
      ${sub === 'free'
        ? prow({ icon: I.crown, iconBg: 'amber', label: 'Upgrade to Premium', sub: 'Ad-free, HD quality & exclusive dramas', onclick: "A.nav('subscribe')", variant: 'upgrade' })
        : prow({ icon: I.plan, iconBg: 'amber', label: planLabel + ' Plan', sub: 'Tap to manage or change plan', onclick: "A.nav('subscribe')" })}
      ${prow({ icon: I.credits, label: 'Earn Credits', sub: `${credits} available · Watch videos & complete tasks`, onclick: "A.nav('credits')" })}
    </div>

    <!-- ═══ SUPPORT ═══ -->
    <div class="prof-section">
      <div class="prof-section-title">Support</div>
      ${prow({
        icon: `<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>`,
        iconBg: 'jade',
        label: 'Contact Support',
        sub: S.userChatMessages.length ? 'Continue conversation with admin' : 'Send a message to the DramaFlow team',
        onclick: 'A.openUserChat()',
        right: S.userChatUnread ? '<span class="prof-unread-dot" aria-label="Unread message"></span>' : ''
      })}
    </div>

    <!-- ═══ LIBRARY ═══ -->
    <div class="prof-section">
      <div class="prof-section-title">My Library</div>
      ${prow({ icon: I.bookmark, label: 'My List', sub: `${myList.length} drama${myList.length !== 1 ? 's' : ''} saved`, onclick: "A.nav('mylist')" })}
      ${prow({ icon: I.heart, label: 'Liked Dramas', sub: `${liked.length} liked`, onclick: "A.nav('library')" })}
      ${prow({ icon: I.eye, label: 'Watch History', sub: `${cwKeys.length} dramas watched`, onclick: "A.nav('library')" })}
    </div>

    <!-- ═══ ACCOUNT INFO ═══ -->
    <div class="prof-section">
      <div class="prof-section-title">Account</div>
      ${prow({ icon: I.edit,     label: 'Display Name',   sub: user.displayName || 'Not set', onclick: 'A.openEditName()' })}
      ${prow({ icon: I.calendar, label: 'Member Since',   sub: joinDate, chevron: false })}
      ${prow({ icon: I.email,    label: 'Email',          sub: user.email, chevron: false })}
      ${prow({ icon: isGoogle ? I.google : I.shield, label: 'Sign-in', sub: isGoogle ? 'Google Account' : 'Email & Password', chevron: false })}
      ${prow({ icon: I.bell,     label: 'Notifications',  sub: 'App updates & new episodes', onclick: "A.nav('home')" })}
      ${S.userChatUnread || S.userChatMessages.length
        ? prow({
            icon: `<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>`,
            iconBg: S.userChatUnread ? 'red' : 'jade',
            label: 'Messages from Admin',
            sub: S.userChatUnread ? 'New message — tap to read' : `${S.userChatMessages.length} message${S.userChatMessages.length !== 1 ? 's' : ''}`,
            onclick: 'A.openUserChat()',
            right: S.userChatUnread ? '<span class="prof-unread-dot"></span>' : ''
          })
        : ''
      }
    </div>
    ${S.showUserChat ? renderUserChatPanel() : ''}

    <!-- ═══ DANGER ZONE ═══ -->
    <div class="prof-section">
      <div class="prof-section-title">Danger Zone</div>
      ${cwKeys.length ? prow({ icon: I.eye, label: 'Clear Watch History', sub: `Remove all ${cwKeys.length} watched titles`, onclick: 'A.clearHistory()', variant: 'danger' }) : ''}
      ${prow({ icon: I.signout, label: 'Sign Out', sub: 'You will need to log in again', onclick: 'A.doLogout()', variant: 'danger' })}
    </div>

  </div>`
}


// ── User-side admin chat panel ────────────────────────────
function renderUserChatPanel() {
  const msgs = S.userChatMessages || []

  function timeStr(ts) {
    if (!ts) return ''
    const d = ts.seconds ? new Date(ts.seconds * 1000) : new Date(ts)
    const diff = Date.now() - d
    if (diff < 60000) return 'just now'
    if (diff < 3600000) return Math.floor(diff/60000) + 'm ago'
    if (diff < 86400000) return d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})
    return d.toLocaleDateString([], {month:'short',day:'numeric'})
  }

  const bubbles = msgs.length
    ? msgs.map(m => {
        const isAdmin = m.from === 'admin'
        return `<div class="uchat-msg ${isAdmin ? 'uchat-msg-admin' : 'uchat-msg-user'}">
          <div class="uchat-bubble">${m.text.replace(/</g,'&lt;')}</div>
          <div class="uchat-time">${isAdmin ? (m.fromName||'Admin') + ' · ' : ''}${timeStr(m.at)}</div>
        </div>`
      }).join('')
    : '<div class="uchat-empty">No messages yet. The admin will reply here.</div>'

  return `<div class="uchat-overlay" onclick="event.target.classList.contains('uchat-overlay')&&A.closeUserChat()">
    <div class="uchat-panel">
      <div class="uchat-header">
        <div class="uchat-header-info">
          <div class="uchat-av">A</div>
          <div>
            <div class="uchat-header-title">Admin Support</div>
            <div class="uchat-header-sub">Messages from the DramaFlow team</div>
          </div>
        </div>
        <button class="icon-btn" onclick="A.closeUserChat()">
          <span class="icon icon-close icon-txt2"></span>
        </button>
      </div>
      <div class="uchat-messages" id="userChatMessages">${bubbles}</div>
      <div class="uchat-input-row">
        <input class="inp uchat-inp" id="userChatInputField"
          placeholder="Reply to admin…"
          oninput="A.setUserChatInput(this.value)"
          onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();A.sendUserChat()}">
        <button class="btn btn-red uchat-send" onclick="A.sendUserChat()">Send</button>
      </div>
    </div>
  </div>`
}
