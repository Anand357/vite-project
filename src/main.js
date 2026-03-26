// src/main.js  — Application entry point
import { auth, db, ADMIN_EMAIL } from './firebase.js'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { S, setState, subscribe, notify } from './store.js'
import {
  loadData, loadUserData, actLogout, actPlay, actToggleList, actToggleLike,
  actComment, loadComments, buildSectionConfigs,
  aAddContent, aEditContent, aDeleteContent, aSetBanner,
  aSaveTrending, aSaveSectionConfigs, aSetUserSub,
  aBlockUser, aUnblockUser, aDeleteUser,
  aAppointAdmin, aChangeAdminLevel, aRevokeAdmin, loadAllUsers,
  aAwardCredits,
  aToggleHide, checkGoogleRedirectResult,
  actShare, loadNotifications, markNotificationsRead, adminSendNotification, showToast,
  actStartAd, actAdCompleted, actSkipAd, actAdDismiss, actCancelAd,
  actStartPageAd, actCompleteTask, checkLoginStreak, loadStreakData, loadTasksConfig,
  aSaveTasksConfig, DEFAULT_TASKS, getTasksConfig,
  loadPromoConfig, aSavePromoConfig, DEFAULT_PROMO, schedulePromo, shouldShowPromo, forceShowPromo,
  adminBroadcastNotification, loadNotifHistory,
  canPlayEpisode, findContent, actRateContent,
  adminSendChat, loadAdminChat,
  loadActivityLog,
  actClearAllHistory,
  loadUserChat, markUserChatRead, userSendChat,
  sendGlobalAdminChat, loadGlobalAdminChat,
  sanitizeText, checkRateLimit, assertAdminAccess,
} from './utils/actions.js'
import { renderTopNav, renderBotNav, renderNotifPanel } from './components/Nav.js'
import { renderAuthOverlay, openAuth, bindAuth }        from './components/Auth.js'
import { renderPlayer, bindPlayer, unbindPlayer }       from './components/Player.js'
import { renderHome }                                   from './pages/Home.js'
import { renderSearch }                                 from './pages/Search.js'
import { renderLibrary }                                from './pages/Library.js'
import { renderMyList }                                 from './pages/MyList.js'
import { renderProfile }                                from './pages/Profile.js'
import { renderSubscribe }                              from './pages/Subscribe.js'
import { renderCredits }                                from './pages/Credits.js'
import { renderDetail }                                from './pages/Detail.js'
import { renderAdmin, bindAdminDrag }                   from './admin/Admin.js'
import { renderCreditPlayer, startCreditTimer, stopCreditTimer }    from './components/CreditPlayer.js'
import { renderPromoPopup }                             from './components/PromoPopup.js'

// ── Theme system ─────────────────────────────────────────
function applyTheme(pref) {
  const root = document.documentElement
  const isDark = pref === 'dark' || (pref === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  root.setAttribute('data-theme', pref || 'system')
  root.classList.toggle('theme-light', !isDark)
  localStorage.setItem('dfTheme', pref || 'system')
}
// Apply on load (already done inline in index.html, but keep in sync)
applyTheme(localStorage.getItem('dfTheme') || 'system')
// Watch OS preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if ((localStorage.getItem('dfTheme') || 'system') === 'system') applyTheme('system')
})

// ── Auth listener ──────────────────────────────────────────
onAuthStateChanged(auth, async user => {
  if (user) {
    S.user = user
    await setDoc(doc(db,'users',user.uid),{
      email: user.email, displayName: user.displayName||'',
      online: true, lastSeen: serverTimestamp(),
    },{ merge: true })
    await loadUserData(user.uid)
    const uDoc = await getDoc(doc(db,'users',user.uid))
    const uData = uDoc.exists() ? uDoc.data() : {}
    const role  = uData.role || 'user'
    const level = uData.adminLevel || 0
    S.isAdmin      = user.email === ADMIN_EMAIL || role === 'subadmin'
    S.isSuperAdmin = user.email === ADMIN_EMAIL || level >= 4
    S.userRole     = role
    S.adminLevel   = user.email === ADMIN_EMAIL ? 5 : level
    // Load notifications, streak data, tasks config
    loadNotifications()
    await loadStreakData(user.uid)
    loadTasksConfig()
    // Load admin chat messages for this user
    loadUserChat()
    // Check/award daily login streak credit
    checkLoginStreak()
    // Load promo config then schedule popup
    await loadPromoConfig()
    schedulePromo()
  } else {
    if (S.user) {
      setDoc(doc(db,'users',S.user.uid),{ online:false, lastSeen:serverTimestamp() },{ merge:true }).catch(()=>{})
    }
    Object.assign(S,{
      user:null, isAdmin:false, isSuperAdmin:false, userRole:'user', adminLevel:0,
      userBlocked:false, myList:[], watchHistory:{}, liked:[], sub:'free', ratings:{},
      notifications:[], page:'home', pc:null, pEp:0, pPaywall:null,
      pShowLib:false, pShowComments:false, pComments:[], showPromo:false,
      userChatMessages:[], userChatUnread:false, showUserChat:false, userChatInput:'',
    })
    // Load promo config for logged-out visitors and schedule if applicable
    loadPromoConfig().then(schedulePromo)
  }
  render()
})

window.addEventListener('beforeunload', () => {
  if (S.user) setDoc(doc(db,'users',S.user.uid),{ online:false, lastSeen:serverTimestamp() },{ merge:true }).catch(()=>{})
})

// Refresh notifications every 2 mins when logged in
setInterval(() => { if (S.user) loadNotifications() }, 30_000)

// ── Render ─────────────────────────────────────────────────
function renderSkeleton() {
  return `<div class="skel-page">
    <div class="skel-hero"></div>
    <div class="skel-section">
      <div class="skel-title"></div>
      <div class="skel-row">
        ${Array(5).fill('<div class="skel-card"></div>').join('')}
      </div>
    </div>
    <div class="skel-section">
      <div class="skel-title"></div>
      <div class="skel-row">
        ${Array(5).fill('<div class="skel-card"></div>').join('')}
      </div>
    </div>
  </div>`
}

function renderErrorBanner() {
  if (!S.appError) return ''
  return `<div class="app-error-banner" role="alert">
    <span class="app-error-msg">${S.appError}</span>
    <button class="app-error-retry" onclick="A.retryLoad()">Retry</button>
    <button class="app-error-close" onclick="A.dismissError()" aria-label="Dismiss">✕</button>
  </div>`
}

function renderOfflineBadge() {
  return S.isOffline
    ? '<div class="offline-badge" role="status" aria-live="polite">Offline</div>'
    : ''
}

function render() {
  // ── Form lock: if admin content form is open, skip full re-render ──────────
  // reloadContent() calls notify() → render() while user is typing in the form.
  // We detect this and bail early — the form stays intact, content updates silently.
  if (S.page === 'admin' && S.aTab === 'content' && (S.aShowForm || S._formSaving) && document.getElementById('cForm')) {
    // Only update the content table rows in-place, leave the form untouched
    _updateContentTableOnly()
    return
  }

  // Hide preloader on first render
  const pre = document.getElementById('preloader')
  if (pre && !pre.classList.contains('hidden')) {
    pre.classList.add('hidden')
  }
  const root = document.getElementById('app')
  if (!root) return

  // Show skeleton while initial data loads
  if (S.appLoading && !S.content.length) {
    root.innerHTML = `
      ${renderAuthOverlay()}
      <nav id="nav">${renderTopNav()}</nav>
      <main id="wrap">${renderSkeleton()}</main>
      <nav id="bnav">${renderBotNav()}</nav>
    `
    bindAuth()
    return
  }

  // Ad player — fullscreen, takes over everything
  if (S.adPlaying) {
    root.innerHTML = renderCreditPlayer()
    // Start timer if not already running
    startCreditTimer()
    return
  } else {
    stopCreditTimer()
  }

  if (S.pc) {
    root.innerHTML = renderPlayer()
    bindPlayer()
    return
  }

  const blockedBanner = S.userBlocked
    ? '<div class="blocked-banner">Your account is blocked. Contact support.</div>'
    : ''

  let pageHTML = ''
  switch (S.page) {
    case 'home':      pageHTML = blockedBanner + renderHome();      break
    case 'search':    pageHTML = blockedBanner + renderSearch();    break
    case 'library':   pageHTML = blockedBanner + renderLibrary();   break
    case 'mylist':    pageHTML = blockedBanner + renderMyList();    break
    case 'profile':   pageHTML = renderProfile();                   break
    case 'subscribe': pageHTML = renderSubscribe();                 break
    case 'credits':   pageHTML = renderCredits();                   break
    case 'detail':    pageHTML = renderDetail();                    break
    case 'admin':     pageHTML = S.isAdmin ? renderAdmin() : renderHome(); break
    default:          pageHTML = blockedBanner + renderHome()
  }

  root.innerHTML = `
    ${renderErrorBanner()}
    ${renderOfflineBadge()}
    ${renderAuthOverlay()}
    <nav id="nav" role="navigation" aria-label="Main navigation">${renderTopNav()}</nav>
    <main id="wrap" role="main" tabindex="-1">${pageHTML}</main>
    <nav id="bnav" role="navigation" aria-label="Bottom navigation">${renderBotNav()}</nav>
    ${renderNotifPanel()}
    ${renderPromoPopup()}
  `

  bindAuth()
  if (S.page === 'admin') setTimeout(bindAdminDrag, 60)
}

// ── Public A.* API ─────────────────────────────────────────
// ── Search: debounced, paginated, 40-per-page ───────────────
const SEARCH_PAGE_SIZE = 40

function _updateSearchResults(append = false) {
  const gbar = document.getElementById('genreBar')
  const srow = document.getElementById('sortRow')
  const grid = document.getElementById('searchGrid')
  const cnt  = document.getElementById('searchCount')
  if (!grid && !gbar) { render(); return }

  const all    = S.content.filter(c => !c.hidden)
  const genres = [...new Set(all.map(c => c.genre).filter(Boolean))].sort()

  if (gbar) {
    const allBtn = document.createElement('button')
    allBtn.className = 'gpill' + (!S.sGenres?.length ? ' act' : '')
    allBtn.setAttribute('aria-pressed', (!S.sGenres?.length).toString())
    allBtn.textContent = 'All'
    allBtn.onclick = () => A.clearGenres()
    gbar.innerHTML = ''
    gbar.appendChild(allBtn)
    genres.forEach(g => {
      const btn = document.createElement('button')
      btn.className = 'gpill' + (S.sGenres?.includes(g) ? ' act' : '')
      btn.setAttribute('aria-pressed', (!!S.sGenres?.includes(g)).toString())
      btn.textContent = g
      btn.onclick = () => A.toggleGenre(g)
      gbar.appendChild(btn)
    })
  }

  if (srow) {
    const sorts = [{id:'popular',lbl:'Popular'},{id:'newest',lbl:'Newest'},{id:'liked',lbl:'Most Liked'},{id:'rated',lbl:'Top Rated'}]
    const sort = S.sSort || 'popular'
    srow.innerHTML = ''
    sorts.forEach(s => {
      const btn = document.createElement('button')
      btn.className = 'sort-pill' + (sort === s.id ? ' act' : '')
      btn.setAttribute('aria-pressed', (sort === s.id).toString())
      btn.textContent = s.lbl
      btn.onclick = () => A.setSort(s.id)
      srow.appendChild(btn)
    })
  }

  let v = all
  if (S.sGenres?.length) v = v.filter(c => S.sGenres.includes(c.genre))
  if (S.sq) {
    const q = S.sq.toLowerCase()
    v = v.filter(c =>
      c.title.toLowerCase().includes(q) ||
      (c.genre||'').toLowerCase().includes(q) ||
      (c.description || '').toLowerCase().includes(q)
    )
  }
  const sort = S.sSort || 'popular'
  if      (sort === 'popular') v.sort((a,b) => (b.views||0) - (a.views||0))
  else if (sort === 'newest')  v.sort((a,b) => (b.createdAt?.seconds||0) - (a.createdAt?.seconds||0))
  else if (sort === 'liked')   v.sort((a,b) => (b.likes||0) - (a.likes||0))
  else if (sort === 'rated')   v.sort((a,b) => (b.ratingSum&&b.ratingCount?b.ratingSum/b.ratingCount:0)-(a.ratingSum&&a.ratingCount?a.ratingSum/a.ratingCount:0))

  const page    = S.searchPage || 0
  const total   = v.length
  const visible = v.slice(0, (page + 1) * SEARCH_PAGE_SIZE)
  const hasMore = visible.length < total

  if (cnt) {
    cnt.innerHTML = total + ' result' + (total !== 1 ? 's' : '')
      + (S.sq ? ' for <strong>' + S.sq + '</strong>' : '')
      + (S.sGenres?.length ? ' in <strong>' + S.sGenres.join(', ') + '</strong>' : '')
      + (total > SEARCH_PAGE_SIZE ? ' <span style="color:var(--txt4);font-size:.75rem">(showing ' + visible.length + ')</span>' : '')
    cnt.setAttribute('aria-live', 'polite')
  }

  if (grid) {
    if (visible.length) {
      import('./components/Card.js').then(({ cardHTML }) => {
        if (append) {
          const newSlice = v.slice(page * SEARCH_PAGE_SIZE, (page + 1) * SEARCH_PAGE_SIZE)
          grid.insertAdjacentHTML('beforeend', newSlice.map(c => cardHTML(c)).join(''))
        } else {
          grid.innerHTML = visible.map(c => cardHTML(c)).join('')
        }
        let moreBtn = document.getElementById('searchLoadMore')
        if (!moreBtn) {
          moreBtn = document.createElement('div')
          moreBtn.id = 'searchLoadMore'
          moreBtn.style.cssText = 'text-align:center;padding:20px 0 8px;grid-column:1/-1'
          grid.after(moreBtn)
        }
        moreBtn.innerHTML = hasMore
          ? '<button class="btn btn-outline" onclick="A.loadMoreSearch()">Load ' + Math.min(SEARCH_PAGE_SIZE, total - visible.length) + ' more (' + (total - visible.length) + ' remaining)</button>'
          : ''
      })
    } else {
      grid.innerHTML = '<div class="empty" role="status"><p class="empty-txt">No results found</p>'
        + '<button class="btn btn-outline btn-sm gap-t" onclick="A.clearGenres()">Clear filters</button></div>'
      const moreBtn = document.getElementById('searchLoadMore')
      if (moreBtn) moreBtn.innerHTML = ''
    }
  }
}

// ── Update content table rows without touching the open form ─────────────────
function _updateContentTableOnly() {
  const tbody = document.querySelector('.tbl-wrap tbody')
  if (!tbody) return
  const rows = S.content.map(c => `<tr>
    <td><img src="${c.thumbnail}" class="tthumb"></td>
    <td style="font-weight:700">${c.title}</td>
    <td>${c.genre}</td><td>${c.episodes}</td>
    <td style="color:var(--txt2)">${c.section || '—'}</td>
    <td style="color:var(--txt3)">${c.views || 0}</td>
    <td><span class="badge ${c.hidden ? 'b-hid' : 'b-vis'}">${c.hidden ? 'Hidden' : 'Visible'}</span></td>
    <td><div class="tact">
      <button class="tbtn" onclick="A.editContent('${c.id}')">Edit</button>
      <button class="tbtn tbtn-vis" onclick="A.toggleHide('${c.id}',${!c.hidden})">${c.hidden ? 'Show' : 'Hide'}</button>
      <button class="tbtn tbtn-del" onclick="A.deleteContent('${c.id}')">🗑</button>
      <button class="tbtn tbtn-notif" onclick="A.sendNotif('${c.id}','')" title="Notify users who saved this"></button>
    </div></td>
  </tr>`).join('')
  tbody.innerHTML = rows
}

// ── In-place users search update (no full re-render, keeps input focus) ──────
function _updateUsersResults() {
  const listEl   = document.getElementById('uc2ListWrap')
  const countEl  = document.getElementById('usersSearchCount')
  const clearBtn = document.getElementById('usersSearchClear')
  if (!listEl) { render(); return }

  const q = (S.usersSearch || '').toLowerCase()
  let users = [...S.allUsers]
  if (q) users = users.filter(u =>
    (u.displayName||'').toLowerCase().includes(q) ||
    (u.email||'').toLowerCase().includes(q)
  )
  if (S.userFilter === 'online')   users = users.filter(u => u.online)
  if (S.userFilter === 'blocked')  users = users.filter(u => u.blocked)
  if (S.userFilter === 'admin')    users = users.filter(u => u.role === 'subadmin')
  if (S.userFilter === 'premium')  users = users.filter(u => u.subscription === 'premium')
  if (S.userFilter === 'standard') users = users.filter(u => u.subscription === 'standard')
  if (S.userFilter === 'free')     users = users.filter(u => !u.subscription || u.subscription === 'free')

  if (countEl) countEl.textContent = users.length + ' of ' + S.allUsers.length
  if (clearBtn) {
    clearBtn.style.display = q ? 'flex' : 'none'
    clearBtn.style.alignItems = 'center'
  }

  if (!users.length) {
    listEl.innerHTML = '<div class="empty" style="padding:40px 0"><p class="empty-txt">' +
      (S.allUsers.length === 0 ? 'Click Refresh to load users' : 'No users match this search') + '</p></div>'
    return
  }

  // Render lightweight user rows (not full accordion — those only expand on click = full render)
  listEl.innerHTML = users.map(u => {
    const sub        = u.subscription || 'free'
    const isBlocked  = !!u.blocked
    const isAdmin    = u.role === 'subadmin'
    const isSA       = u.email === (window.__dfAdminEmail || '')
    const letter     = (u.displayName || u.email || 'U')[0].toUpperCase()
    const isExp      = S.expandedUserId === u.id
    const onlineDot  = u.online
      ? '<span class="uc2-dot uc2-dot-on"></span>'
      : '<span class="uc2-dot uc2-dot-off"></span>'
    const roleBadge  = isSA
      ? '<span class="uc2-role uc2-role-sa">Super Admin</span>'
      : isAdmin
      ? '<span class="uc2-role uc2-role-l' + (u.adminLevel||1) + '">L' + (u.adminLevel||1) + ' Admin</span>'
      : '<span class="uc2-role uc2-role-user">User</span>'
    const planBadge  = '<span class="uc2-plan uc2-plan-' + sub + '">' + sub + '</span>'
    const blockedBadge = isBlocked ? '<span class="uc2-role uc2-role-blocked">Blocked</span>' : ''

    return '<div class="uc2' + (isBlocked?' uc2-blocked':'') + (isSA?' uc2-sa':isAdmin?' uc2-admin':'') + '">'
      + '<div class="uc2-header" data-uid="' + u.id + '" onclick="A.toggleUserExpand(this.dataset.uid)">'
      + '<div class="uc2-av' + (isSA?' uc2-av-sa':isAdmin?' uc2-av-admin':'') + (isBlocked?' uc2-av-blocked':'') + '">' + letter
      + '<span class="uc2-dot-wrap">' + onlineDot + '</span></div>'
      + '<div class="uc2-info">'
      + '<div class="uc2-name">' + (u.displayName || '(no name)') + '</div>'
      + '<div class="uc2-email">' + (u.email || '') + '</div>'
      + '<div class="uc2-tags">' + roleBadge + planBadge + blockedBadge + '</div>'
      + '</div>'
      + '<div class="uc2-chevron' + (isExp?' open':'') + '"><svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" d="M6 9l6 6 6-6"/></svg></div>'
      + '</div>'
      + (isExp ? '<div class="uc2-expand open"><div class="uc2-note" style="padding:8px 0">Expand requires page refresh — click the expand button again after searching.</div></div>' : '')
      + '</div>'
  }).join('')
}

// ── In-place chat user list update (no full re-render, keeps input focus) ────
function _updateChatUserList() {
  const listEl   = document.getElementById('chatUserListInner')
  const clearBtn = document.getElementById('chatSearchClear')
  if (!listEl) { render(); return }

  const q = (S.chatSearch || '').toLowerCase()
  let users = [...S.allUsers].filter(u => u.email !== window.__dfAdminEmail)
  if (q) users = users.filter(u =>
    (u.displayName||'').toLowerCase().includes(q) ||
    (u.email||'').toLowerCase().includes(q)
  )

  if (clearBtn) {
    clearBtn.style.display = q ? 'flex' : 'none'
    clearBtn.style.alignItems = 'center'
  }

  if (!users.length) {
    listEl.innerHTML = '<div class="chat-empty-list">No users found</div>'
    return
  }

  const openUid = S.chatUid
  listEl.innerHTML = users.map(u => {
    const isOpen = u.id === openUid
    const av  = (u.displayName || u.email || '?')[0].toUpperCase()
    const dot = u.online ? '<span class="chat-online-dot"></span>' : ''
    return `<div class="chat-user-row${isOpen ? ' act' : ''}" onclick="A.openChat('${u.id}')">`
      + `<div class="chat-av">${av}${dot}</div>`
      + `<div class="chat-user-info">`
      + `<div class="chat-user-name">${u.displayName || u.email || u.id}</div>`
      + `<div class="chat-user-email">${u.email || ''}</div>`
      + `</div></div>`
  }).join('')
}

window.A = {
  nav: p => {
    S.page = p
    S.detailId = null
    S.pShowNotifs = false
    if (p === 'admin' && S.aTab === 'users') loadAllUsers()
    _pushUrl({})
    render()
  },

  openAuth:  tab => openAuth(tab || 'login'),
  doLogout:  ()  => actLogout(),

  // Player
  play: (id, ep) => actPlay(id, ep ?? 0).then(r => { if (r === 'auth') openAuth() }),
  closePlayer: () => {
    unbindPlayer()
    if (S._countdownInterval) { clearInterval(S._countdownInterval); S._countdownInterval = null }
    stopCreditTimer()
    setState({ pc:null, pEp:0, pPaywall:null, pCountdownActive:false, pShowLib:false, pShowComments:false, pComments:[], pShowRating:false, adPlaying:false, adContext:null, adCompleted:false })
  },

  // Ad system
  watchAd: (contentId, epIndex) => {
    if (!S.user) { openAuth(); return }
    actStartAd(contentId, epIndex)
  },
  skipAd:     ()  => actSkipAd(),
  cancelAd:   ()  => actCancelAd(),
  dismissAd:  ()  => actAdDismiss(),

  // Credits page
  startPageAd: () => {
    if (!S.user) { openAuth(); return }
    const r = actStartPageAd()
    if (r === 'auth') openAuth()
    // startCreditTimer is handled in render
  },
  cancelPageAd: () => {
    stopCreditTimer()
    setState({ adPlaying: false, adContext: null, adCompleted: false, adTimeLeft: 30, adCanSkip: false })
  },
  dismissPageAd: () => {
    stopCreditTimer()
    setState({ adPlaying: false, adContext: null, adCompleted: false, adTimeLeft: 30, adCanSkip: false })
  },
  watchAnotherAd: () => {
    stopCreditTimer()
    setState({ adCompleted: false, adTimeLeft: 30, adCanSkip: false })
    // Re-start
    actStartPageAd()
  },
  completeTask: async (taskId, url) => {
    if (!S.user) { openAuth(); return }
    // For social tasks — open URL first then award credit
    if (url) {
      window.open(url, '_blank', 'noopener')
      // Small delay so the tab opens, then confirm
      setTimeout(async () => {
        const r = await actCompleteTask(taskId)
        if (r === 'success') render()
      }, 1500)
      return
    }
    const r = await actCompleteTask(taskId)
    if (r === 'success' || r === 'already_done') render()
  },

  // Admin tasks config
  saveTasksConfig: async () => {
    const btns = [document.getElementById('saveTasksBtnTop'), ...document.querySelectorAll('.tasks-save-bar .btn-red')]
    btns.forEach(b => { if(b){ b.textContent = 'Saving…'; b.disabled = true } })

    const tasks = getTasksConfig().map((t, i) => {
      const icon         = document.getElementById('tIcon'         + i)?.value?.trim() || t.icon
      const titleEl      = document.getElementById('tTitle'        + i)?.value?.trim() || t.title
      const descEl       = document.getElementById('tDesc'         + i)?.value?.trim() || t.desc
      const urlEl        = document.getElementById('tUrl'          + i)?.value?.trim()
      const cooldown     = parseInt(document.getElementById('tCooldown'     + i)?.value)
      const maxStreak    = parseInt(document.getElementById('tMaxStreak'    + i)?.value)
      const bonusDay     = parseInt(document.getElementById('tBonusDay'     + i)?.value)
      const bonusCredits = parseInt(document.getElementById('tBonusCredits' + i)?.value)
      const updated = { ...t, icon, title: titleEl, desc: descEl }
      if (t.type === 'streak') {
        const cpd = parseInt(document.getElementById('tCredits' + i)?.value)
        if (!isNaN(cpd))         updated.creditsPerDay      = cpd
        if (!isNaN(maxStreak))   updated.maxStreak          = maxStreak
        if (!isNaN(bonusDay))    updated.streakBonusDay     = bonusDay
        if (!isNaN(bonusCredits))updated.streakBonusCredits = bonusCredits
      } else {
        const ce = parseInt(document.getElementById('tCredits' + i)?.value)
        if (!isNaN(ce)) updated.creditsEarned = ce
      }
      if (urlEl !== undefined && t.type === 'social') updated.url = urlEl
      if (!isNaN(cooldown)) updated.cooldownMinutes = cooldown
      return updated
    })
    await aSaveTasksConfig(tasks)
    // Restore buttons + hide dirty indicator
    btns.forEach(b => { if(b){ b.textContent = 'Save Changes'; b.disabled = false } })
    _hideTasksSaveBar()
    render()
  },
  resetTasksConfig: async () => {
    if (!confirm('Reset all tasks to default settings?')) return
    await aSaveTasksConfig(DEFAULT_TASKS)
    render()
  },
  toggleTask: i => {
    const tasks = getTasksConfig().map(t => ({ ...t }))
    tasks[i].enabled = !tasks[i].enabled
    S.tasksConfig = tasks
    // Update toggle track without full re-render
    const track = document.getElementById('taskTrack' + i)
    if (track) track.classList.toggle('excl-on', tasks[i].enabled)
    // Update status label
    const row = document.getElementById('taskRow' + i)
    const lbl = row?.querySelector('.task-status-lbl')
    if (lbl) lbl.textContent = tasks[i].enabled ? 'Enabled' : 'Disabled'
    // Show save bar (mark dirty)
    _showTasksSaveBar()
  },

  // Use an existing credit directly (no ad needed)
  useCredit: async (contentId, epIndex) => {
    if (!S.user) { openAuth(); return }
    if ((S.adCredits || 0) <= 0) { showToast('No credits left — watch an ad first!'); return }

    // Spend one credit on this episode
    const { updateDoc, doc: fbDoc, increment: fbInc, arrayUnion } = await import('firebase/firestore')
    const { db: fdb } = await import('./firebase.js')

    const newCredits = Math.max(0, (S.adCredits || 0) - 1)
    const prevUsed   = S.adCreditsUsed?.[contentId] || []
    const newUsed    = prevUsed.includes(epIndex) ? prevUsed : [...prevUsed, epIndex]
    const newUsedMap = { ...S.adCreditsUsed, [contentId]: newUsed }

    setState({ adCredits: newCredits, adCreditsUsed: newUsedMap, pPaywall: null })

    updateDoc(fbDoc(fdb, 'users', S.user.uid), {
      adCredits: newCredits,
      [`adCreditsUsed.${contentId}`]: newUsed,
    }).catch(() => {})

    showToast('✓ Credit used! Playing EP ' + (epIndex + 1), 2000)

    // Small delay so toast shows, then play
    setTimeout(() => actPlay(contentId, epIndex), 500)
  },
  // Detail page
  openDetail: (id, from) => {
    setState({ detailId: id, detailFrom: from || S.page, page: 'detail' })
    // Update URL for deep linking without navigation
    const url = new URL(window.location)
    url.searchParams.set('watch', id)
    window.history.pushState({}, '', url)
  },
  navBack: () => {
    // Clear deep link param
    const url = new URL(window.location)
    url.searchParams.delete('watch')
    window.history.pushState({}, '', url)
    setState({ page: S.detailFrom || 'home', detailId: null })
  },
  rateDrama: async (id, stars) => {
    const { actRateContent } = await import('./utils/actions.js')
    await actRateContent(id, stars)
    render()
  },
  rateFromDetail: async (id, stars) => {
    await actRateContent(id, stars)
    render()
  },

  toggleList: id => actToggleList(id).then(r => { if (r==='auth') openAuth() }),
  toggleLike: id => actToggleLike(id).then(r => { if (r==='auth') openAuth() }),

  openLib:       () => { S.pShowLib=true;      render(); bindPlayer() },
  closeLib:      () => { S.pShowLib=false;     render(); bindPlayer() },
  openComments:  () => { S.pShowComments=true; render(); bindPlayer() },
  closeComments: () => { S.pShowComments=false;render(); bindPlayer() },

  jumpEp: i => {
    S.pShowLib = false; render(); bindPlayer()
    requestAnimationFrame(() => {
      const feed = document.getElementById('epFeed')
      if (feed) feed.scrollTo({ top: i * feed.clientHeight, behavior: 'smooth' })
    })
  },
  postComment: cid => {
    const el  = document.getElementById('cInp')
    const btn = document.getElementById('cSubmitBtn')
    const txt = el?.value?.trim()
    if (!txt) return
    // Optimistic loading state
    if (btn) { btn.textContent = '…'; btn.disabled = true }
    if (el)  el.disabled = true
    actComment(cid, txt).then(() => {
      if (el)  { el.value = ''; el.disabled = false; el.focus() }
      if (btn) { btn.textContent = 'Post'; btn.disabled = false }
      render()
      bindPlayer()
      // Auto-scroll comments list to top (newest first)
      requestAnimationFrame(() => {
        const list = document.getElementById('commentsList')
        if (list) list.scrollTop = 0
      })
    })
  },
  deleteComment: async cid => {
    const { actDeleteComment } = await import('./utils/actions.js')
    await actDeleteComment(cid)
    render(); bindPlayer()
  },

  // Search — debounced to avoid re-rendering on every keystroke
  search: q => {
    S.sq = q
    S.searchPage = 0   // reset pagination on new query
    clearTimeout(window._searchDebounce)
    window._searchDebounce = setTimeout(() => _updateSearchResults(), 180)
  },
  loadMoreSearch: () => {
    S.searchPage = (S.searchPage || 0) + 1
    _updateSearchResults(true)  // append mode
  },
  genre:  g => { S.sg = g; render() },   // legacy single-genre (kept for compat)
  toggleGenre: g => {
    const arr = S.sGenres || []
    S.sGenres = arr.includes(g) ? arr.filter(x=>x!==g) : [...arr, g]
    S.searchPage = 0
    _updateSearchResults()
  },
  clearGenres: () => {
    S.sGenres = []; S.sq = ''; S.searchPage = 0
    const inp = document.getElementById('sq')
    if (inp) inp.value = ''
    _updateSearchResults()
  },
  setSort: s => { S.sSort = s; S.searchPage = 0; _updateSearchResults() },

  // Notifications
  openNotifs: async () => {
    // Show panel immediately with cached data, then refresh
    S.pShowNotifs = true
    render()
    // Fetch fresh notifications from Firestore
    await loadNotifications()
    render()
    // Mark all as read after showing
    markNotificationsRead()
  },
  closeNotifs: () => { S.pShowNotifs=false; render() },
  markNotifsRead: () => markNotificationsRead(),
  notifClick: id => {
    S.pShowNotifs = false
    actPlay(id, 0).then(r => { if (r==='auth') openAuth() })
  },
  sendNotif: (cid, msg) => adminSendNotification(cid, msg),

  // Promo popup
  closePromo: () => setState({ showPromo: false }),

  // Theme
  setTheme: pref => { applyTheme(pref); render() },
  getTheme: ()   => localStorage.getItem('dfTheme') || 'system',
  previewPromo: () => {
    // Force-show regardless of targeting / frequency / cooldown
    forceShowPromo()
  },
  savePromoConfig: async () => {
    const btn = document.getElementById('savePromoBtnTop')
    if (btn) { btn.textContent = 'Saving…'; btn.disabled = true }
    const cfg = {
      enabled:        S.promoConfig?.enabled ?? true,
      title:          document.getElementById('promoTitle')?.value?.trim()        || DEFAULT_PROMO.title,
      subtitle:       document.getElementById('promoSubtitle')?.value?.trim()     || '',
      body:           document.getElementById('promoBody')?.value?.trim()         || '',
      badge:          document.getElementById('promoBadge')?.value?.trim()        || '',
      ctaLabel:       document.getElementById('promoCtaLabel')?.value?.trim()     || DEFAULT_PROMO.ctaLabel,
      ctaAction:      document.getElementById('promoCtaAction')?.value            || 'subscribe',
      ctaUrl:         document.getElementById('promoCtaUrl')?.value?.trim()       || '',
      secondaryLabel: document.getElementById('promoSecondary')?.value?.trim()    || DEFAULT_PROMO.secondaryLabel,
      showTo:         document.getElementById('promoShowTo')?.value               || 'free',
      delaySeconds:   parseInt(document.getElementById('promoDelay')?.value)      || 3,
      frequencyHours: (() => { const v = document.getElementById('promoFrequency')?.value; const n = parseInt(v); return isNaN(n) ? 24 : n })(),
      style:          document.getElementById('promoStyle')?.value                || 'gradient',
      accentColor:    document.getElementById('promoAccent')?.value               || DEFAULT_PROMO.accentColor,
      imageUrl:       document.getElementById('promoImageUrl')?.value?.trim()     || '',
    }
    await aSavePromoConfig(cfg)
    if (btn) { btn.textContent = 'Save Changes'; btn.disabled = false }
    // Clear localStorage so the popup can show again with new settings
    const lsKey = 'dfPromoShown_' + (S.user?.uid || 'guest')
    localStorage.removeItem(lsKey)
    showToast('Promo saved. Preview it with the Preview button.')
    render()
  },
  resetPromoConfig: async () => {
    if (!confirm('Reset promo to default settings?')) return
    await aSavePromoConfig(DEFAULT_PROMO)
    const lsKey = 'dfPromoShown_' + (S.user?.uid || 'guest')
    localStorage.removeItem(lsKey)
    render()
  },
  setPromoFreq: (hours) => {
    // Update hidden input and highlight active button
    const inp = document.getElementById('promoFrequency')
    if (inp) inp.value = String(hours)
    document.querySelectorAll('.freq-btn').forEach(b => b.classList.remove('act'))
    const active = document.getElementById('fq' + hours)
    if (active) active.classList.add('act')
  },
  togglePromoEnabled: () => {
    const current = S.promoConfig?.enabled ?? true
    S.promoConfig = { ...(S.promoConfig || DEFAULT_PROMO), enabled: !current }
    const track = document.getElementById('promoEnabledTrack')
    if (track) track.classList.toggle('excl-on', !current)
    notify()
  },

  // Notifications admin
  notifAudienceChange: v => {
    S.notifAudience = v
    render()
  },
  sendNotification: async () => {
    const title     = document.getElementById('notifTitle')?.value?.trim()
    const message   = document.getElementById('notifMessage')?.value?.trim()
    const thumbnail = document.getElementById('notifThumb')?.value?.trim() || ''
    const audience  = document.getElementById('notifAudience')?.value || 'all'
    const dramaId   = document.getElementById('notifDrama')?.value   || ''
    if (!title || !message) { showToast('Title and message are required'); return }
    const btn = document.getElementById('notifSendBtn')
    if (btn) { btn.textContent = 'Sending…'; btn.disabled = true }
    const sent = await adminBroadcastNotification({ title, message, thumbnail, audience, dramaId })
    if (btn) { btn.textContent = 'Send Notification'; btn.disabled = false }
    if (sent > 0) {
      // Clear form
      const t = document.getElementById('notifTitle');    if(t) t.value=''
      const m = document.getElementById('notifMessage');  if(m) m.value=''
      const th= document.getElementById('notifThumb');    if(th)th.value=''
      loadNotifHistory()
    }
  },
  quickNotify: async (contentId) => {
    const c = S.content.find(x => x.id === contentId)
    if (!c) return
    const msg = 'New update for "' + c.title + '"!'
    await adminBroadcastNotification({ title: c.title, message: msg, thumbnail: c.thumbnail, audience: 'saved_drama', dramaId: contentId })
    loadNotifHistory()
  },
  loadNotifHistory: () => loadNotifHistory(),
  updateNotifPreview: () => {
    const title = document.getElementById('notifTitle')?.value  || 'Notification title'
    const msg   = document.getElementById('notifMessage')?.value || 'Your message will appear here…'
    const pt = document.getElementById('notifPreviewTitle'); if(pt) pt.textContent = title
    const pm = document.getElementById('notifPreviewMsg');   if(pm) pm.textContent = msg
    const cc = document.getElementById('notifCharCount');    if(cc) cc.textContent = msg.length + ' / 300'
  },

  // Admin
  adminTab: t => {
    S.aTab = t
    if (t==='users') loadAllUsers()
    if (t==='tasks') loadTasksConfig()
    if (t==='analytics') loadAllUsers()
    if (t==='chat') { S.userSearch = ''; S.globalChatTab = S.globalChatTab || 'direct'; loadAllUsers(); if (S.chatUid) loadAdminChat(S.chatUid); loadGlobalAdminChat() }
    if (t==='activity') loadActivityLog()
    render()
    setTimeout(bindAdminDrag, 60)
  },
  toggleForm:  () => { S.aShowForm=!S.aShowForm; S.aEditId=null; render() },
  cancelForm:  () => { S.aShowForm=false; S.aEditId=null; render() },
  editContent: id => {
    S.aEditId=id; S.aShowForm=true; render()
    setTimeout(() => document.getElementById('cForm')?.scrollIntoView({ behavior:'smooth' }), 60)
  },
  toggleHide:  (id,h) => aToggleHide(id,h),
  deleteContent: id => aDeleteContent(id),
  setBanner:    id => aSetBanner(id),
  addTrend:    id => {
    if (S.tmpTrending.length>=10){ alert('Max 10'); return }
    S.tmpTrending=[...S.tmpTrending,id]; render(); setTimeout(bindAdminDrag,60)
  },
  rmTrend:  id => { S.tmpTrending=S.tmpTrending.filter(x=>x!==id); render(); setTimeout(bindAdminDrag,60) },
  saveTrending: () => aSaveTrending(),
  toggleSecExpand: i => {
    const inp = document.getElementById('secName'+S.expandedSection)
    if (inp&&S.tmpSectionConfigs[S.expandedSection]) S.tmpSectionConfigs[S.expandedSection].name=inp.value
    S.expandedSection = S.expandedSection===i ? -1 : i
    render(); setTimeout(bindAdminDrag,10)
  },
  toggleSectionHidden: i => {
    const inp = document.getElementById('secName'+i)
    if (inp&&S.tmpSectionConfigs[i]) S.tmpSectionConfigs[i].name = inp.value
    S.tmpSectionConfigs[i].hidden = !S.tmpSectionConfigs[i].hidden
    render(); setTimeout(bindAdminDrag,10)
  },
  secTypeChange: (i,val) => {
    const inp=document.getElementById('secName'+i)
    if(inp) S.tmpSectionConfigs[i].name=inp.value
    S.tmpSectionConfigs[i].type=val; S.expandedSection=i; render(); setTimeout(bindAdminDrag,10)
  },
  pinCard:   (si,cid) => {
    const inp=document.getElementById('secName'+si); if(inp) S.tmpSectionConfigs[si].name=inp.value
    if(!S.tmpSectionConfigs[si].pinnedIds) S.tmpSectionConfigs[si].pinnedIds=[]
    if(!S.tmpSectionConfigs[si].pinnedIds.includes(cid)) S.tmpSectionConfigs[si].pinnedIds.push(cid)
    S.expandedSection=si; render(); setTimeout(bindAdminDrag,10)
  },
  unpinCard: (si,cid) => {
    S.tmpSectionConfigs[si].pinnedIds=S.tmpSectionConfigs[si].pinnedIds.filter(x=>x!==cid)
    S.expandedSection=si; render(); setTimeout(bindAdminDrag,10)
  },
  clearPinned:    si => { S.tmpSectionConfigs[si].pinnedIds=[]; S.expandedSection=si; render(); setTimeout(bindAdminDrag,10) },
  addSecConfig:   () => {
    S.tmpSectionConfigs=[...S.tmpSectionConfigs,{name:'New Section',type:'content',pinnedIds:[]}]
    S.expandedSection=S.tmpSectionConfigs.length-1; render(); setTimeout(bindAdminDrag,10)
  },
  removeSecConfig: i => { S.tmpSectionConfigs.splice(i,1); S.expandedSection=-1; render(); setTimeout(bindAdminDrag,10) },
  saveSecConfigs: async () => {
    S.tmpSectionConfigs.forEach((sec,i)=>{ const inp=document.getElementById('secName'+i); if(inp) sec.name=inp.value||sec.name })
    await aSaveSectionConfigs(S.tmpSectionConfigs)
  },
  updateEpFields: existId => {
    const n  = parseInt(document.getElementById('fE')?.value)||1
    const ex = existId ? S.content.find(c=>c.id===existId) : null
    const box = document.getElementById('epUrls'); if(!box) return
    box.innerHTML = Array.from({length:n},(_,i)=>
      `<div class="ep-url-row"><span class="ep-url-lbl">EP ${i+1}</span><input class="inp" id="eu${i}" placeholder="Video URL" value="${(ex?.episodeUrls||[])[i]||''}"></div>`
    ).join('')
  },
  toggleExclusive: () => {
    const inp=document.getElementById('fExcl'); const track=document.getElementById('exclusiveTrack')
    if(!inp) return
    const cur=inp.value==='true'; inp.value=cur?'false':'true'
    if(track) track.classList.toggle('excl-on',!cur)
  },
  submitNew: async () => {
    const t   = document.getElementById('fT')?.value?.trim()
    const g   = document.getElementById('fG')?.value?.trim()
    const th  = document.getElementById('fTh')?.value?.trim()
    const d   = document.getElementById('fD')?.value?.trim()
    const s   = document.getElementById('fS')?.value?.trim()
    const eps = parseInt(document.getElementById('fE')?.value)||1
    const urls= Array.from({length:eps},(_,i)=>document.getElementById('eu'+i)?.value?.trim()||'')
    const excl= document.getElementById('fExcl')?.value==='true'
    if(!t||!g){ alert('Title and genre are required.'); return }

    // Show loading state on button — form stays open
    const btn = document.querySelector('#cForm .btn-red')
    if (btn) { btn.textContent = 'Saving…'; btn.disabled = true }

    try {
      // Temporarily suppress global re-renders while saving
      S._formSaving = true
      await aAddContent({title:t,genre:g,thumbnail:th,description:d,section:s,episodes:eps,episodeUrls:urls,exclusive:excl})
      S._formSaving = false
      S.aShowForm = false
      render()
    } catch(e) {
      S._formSaving = false
      if (btn) { btn.textContent = 'Add Content'; btn.disabled = false }
    }
  },
  saveEdit: async id => {
    const t   = document.getElementById('fT')?.value?.trim()
    const g   = document.getElementById('fG')?.value?.trim()
    const th  = document.getElementById('fTh')?.value?.trim()
    const d   = document.getElementById('fD')?.value?.trim()
    const s   = document.getElementById('fS')?.value?.trim()
    const eps = parseInt(document.getElementById('fE')?.value)||1
    const urls= Array.from({length:eps},(_,i)=>document.getElementById('eu'+i)?.value?.trim()||'')
    const excl= document.getElementById('fExcl')?.value==='true'
    if(!t||!g){ alert('Title and genre are required.'); return }

    const btn = document.querySelector('#cForm .btn-red')
    if (btn) { btn.textContent = 'Saving…'; btn.disabled = true }

    try {
      S._formSaving = true
      await aEditContent(id,{title:t,genre:g,thumbnail:th,description:d,section:s,episodes:eps,episodeUrls:urls,exclusive:excl})
      S._formSaving = false
      S.aShowForm = false; S.aEditId = null
      render()
    } catch(e) {
      S._formSaving = false
      if (btn) { btn.textContent = 'Save Changes'; btn.disabled = false }
    }
  },
  loadUsers:    ()        => loadAllUsers(),
  toggleUserExpand: uid  => { S.expandedUserId = S.expandedUserId === uid ? null : uid; render() },
  setUserSub:   (uid,sub) => aSetUserSub(uid,sub),
  blockUser:    uid       => aBlockUser(uid),
  unblockUser:  uid       => aUnblockUser(uid),
  deleteUser:   (uid,n)   => aDeleteUser(uid,n),

  // Award Credits modal
  openAwardModal: (uid, name, currentCredits) => {
    setState({ awardModal: { uid, name, currentCredits } })
  },
  closeAwardModal: () => {
    setState({ awardModal: null })
  },
  confirmAward: async () => { const uid = S.awardModal?.uid; const name = S.awardModal?.name; if (!uid) return;
    const amtEl    = document.getElementById('awardAmt')
    const reasonEl = document.getElementById('awardReason')
    const amount   = parseInt(amtEl?.value)
    const reason   = reasonEl?.value?.trim()
    if (!amount || isNaN(amount)) { amtEl?.focus(); return }
    const btn = document.getElementById('awardConfirmBtn')
    if (btn) { btn.textContent = 'Awarding…'; btn.disabled = true }
    await aAwardCredits(uid, name, amount, reason)
    setState({ awardModal: null })
  },
  appointAdmin: (uid,n,l) => aAppointAdmin(uid,n,l||1),
  revokeAdmin:  (uid,n)   => aRevokeAdmin(uid,n),
  changeLevel:  (uid,n,l) => aChangeAdminLevel(uid,n,l),
  userSearch:   q         => { S.userSearch=q; render() },
  usersSearch:  q => {
    S.usersSearch = q
    // Update in-place without full re-render so the input keeps focus
    _updateUsersResults()
  },
  setChatSearch: q => {
    S.chatSearch = q
    // Update in-place without full re-render so the input keeps focus
    _updateChatUserList()
  },
  userFilter:   f         => { S.userFilter=f; render() },

  // Chat
  setChatInput: v => { S.chatInput = v },
  setChatTab: tab => { S.globalChatTab = tab; if (tab === 'global') loadGlobalAdminChat(); render() },
  openChat: async uid => {
    S.chatUid = uid
    S.chatInput = ''
    S.globalChatTab = 'direct'
    render()
    await loadAdminChat(uid)
    render()
    setTimeout(() => {
      const el = document.getElementById('chatMessages')
      if (el) el.scrollTop = el.scrollHeight
    }, 60)
  },
  closeChat: () => { S.chatUid = null; S.chatMessages = []; render() },
  sendChat: async () => {
    const uid = S.chatUid
    if (!uid) return
    const field = document.getElementById('chatInputField')
    const text = (field?.value || S.chatInput || '').trim()
    if (!text) return
    if (field) field.value = ''
    S.chatInput = ''
    await adminSendChat(uid, text)
    await loadAdminChat(uid)
    render()
    setTimeout(() => {
      const el = document.getElementById('chatMessages')
      if (el) el.scrollTop = el.scrollHeight
    }, 60)
  },

  // Global admin group chat
  setGlobalChatInput: v => { S.globalChatInput = v },
  sendGlobalChat: async () => {
    const field = document.getElementById('globalChatField')
    const text = (field?.value || S.globalChatInput || '').trim()
    if (!text) return
    if (field) field.value = ''
    S.globalChatInput = ''
    await sendGlobalAdminChat(text)
    await loadGlobalAdminChat()
    render()
    setTimeout(() => {
      const el = document.getElementById('globalChatMessages')
      if (el) el.scrollTop = el.scrollHeight
    }, 60)
  },
  refreshGlobalChat: async () => {
    await loadGlobalAdminChat()
    render()
    setTimeout(() => {
      const el = document.getElementById('globalChatMessages')
      if (el) el.scrollTop = el.scrollHeight
    }, 60)
  },

  // Activity log
  loadActivityLog: () => loadActivityLog().then(render),
  actLogFilter: f => { S.actLogFilter = f; render() },

  retryLoad:    () => loadData(),
  dismissError: () => { S.appError = null; render() },

  // Library filters
  setLibSearch:   q => { S.libSearch = q; render() },
  setLibGenre:    g => { S.libGenre  = g; render() },
  setLibSort:     s => { S.libSort   = s; render() },
  clearLibFilters: () => { S.libSearch = ''; S.libGenre = ''; S.libSort = 'default'; render() },

  // Profile — edit display name
  openEditName: async () => {
    const cur = S.user?.displayName || ''
    const name = prompt('Enter your display name:', cur)
    if (name === null) return
    const trimmed = name.trim()
    if (!trimmed) { showToast('Name cannot be empty'); return }
    const { updateProfile } = await import('firebase/auth')
    const { doc, updateDoc } = await import('firebase/firestore')
    const { db } = await import('./firebase.js')
    await updateProfile(S.user, { displayName: trimmed })
    await updateDoc(doc(db, 'users', S.user.uid), { displayName: trimmed })
    showToast('Display name updated ✓')
    render()
  },

  // Profile — clear watch history
  clearHistory: () => {
    if (!confirm('Clear all watch history? This cannot be undone.')) return
    actClearAllHistory()
  },

  // Subscribe — plan contact modal
  showPlanContact: planId => { S.showPlanModal = planId; render() },
  closePlanModal:  ()     => { S.showPlanModal = null;   render() },
  copyPlanEmail:   planId => {
    const names = { free: 'Free', standard: 'Standard', premium: 'Premium' }
    const txt = `Hi, I'd like to switch to the ${names[planId] || planId} plan.\nMy account email: ${S.user?.email || '(not logged in)'}`
    if (navigator.clipboard) {
      navigator.clipboard.writeText(txt).then(() => showToast('Copied to clipboard ✓'))
    } else {
      prompt('Copy this and email admin@dramaflow.com:', txt)
    }
  },

  // User-side admin chat
  openUserChat: async () => {
    S.showUserChat = true
    render()
    await loadUserChat()
    await markUserChatRead()
    render()
    setTimeout(() => {
      const el = document.getElementById('userChatMessages')
      if (el) el.scrollTop = el.scrollHeight
    }, 60)
  },
  closeUserChat: () => { S.showUserChat = false; render() },
  setUserChatInput: v => { S.userChatInput = v },
  sendUserChat: async () => {
    const field = document.getElementById('userChatInputField')
    const text = (field?.value || S.userChatInput || '').trim()
    if (!text) return
    if (field) field.value = ''
    S.userChatInput = ''
    await userSendChat(text)
    await loadUserChat()
    render()
    setTimeout(() => {
      const el = document.getElementById('userChatMessages')
      if (el) el.scrollTop = el.scrollHeight
    }, 60)
  },
}

// ── Task dirty-state helpers ──────────────────────────────
function _showTasksSaveBar() {
  const bar = document.getElementById('tasksSaveBar')
  if (bar) bar.classList.add('visible')
}
function _hideTasksSaveBar() {
  const bar = document.getElementById('tasksSaveBar')
  if (bar) bar.classList.remove('visible')
}
// Attach input listeners to detect changes in task fields
function _bindTaskInputs() {
  document.querySelectorAll('.task-admin-row input').forEach(inp => {
    inp.addEventListener('input', _showTasksSaveBar, { once: true })
  })
}

// Subscribe & boot
subscribe(() => {
  // Re-bind task inputs whenever admin tasks tab is rendered
  if (S.page === 'admin' && S.aTab === 'tasks') {
    setTimeout(_bindTaskInputs, 60)
  }
})
subscribe(render)

// ── Deep link on boot ────────────────────────────────────
;(function bootDeepLink() {
  const params = new URLSearchParams(window.location.search)
  const watchId = params.get('watch')
  if (watchId) {
    S.detailId   = watchId
    S.detailFrom = 'home'
    S.page       = 'detail'
  }
})()

checkGoogleRedirectResult().catch(err =>
  console.warn('[DramaFlow] Redirect result check failed:', err.message)
)

// Expose admin email so in-place DOM updaters can filter it out
window.__dfAdminEmail = ADMIN_EMAIL

// ── Offline / online monitor ───────────────────────────────
function _updateOnlineState() {
  const offline = !navigator.onLine
  if (S.isOffline !== offline) {
    S.isOffline = offline
    if (!offline && S.appError) {
      // Came back online — auto-retry load
      
// ── Mobile keyboard: keep chat input above keyboard ─────────
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', () => {
    const panel = document.querySelector('.uchat-panel')
    if (!panel) return
    const vv = window.visualViewport
    // When keyboard opens, shrink the panel max-height
    const available = vv.height - 16
    panel.style.maxHeight = available + 'px'
  })
}

loadData()
    } else {
      notify()
    }
    if (offline) showToast('You\'re offline — showing cached content', 5000)
    else showToast('Back online ✓', 2500)
  }
}
window.addEventListener('online',  _updateOnlineState)
window.addEventListener('offline', _updateOnlineState)

// Update URL when navigation changes
function _pushUrl(params) {
  const u = new URL(window.location.href)
  u.search = ''
  Object.entries(params).forEach(([k,v]) => v && u.searchParams.set(k, v))
  window.history.replaceState({}, '', u.toString())
}

loadData()
