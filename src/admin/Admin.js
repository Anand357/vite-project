// src/admin/Admin.js
import { S, notify } from '../store.js'
import { renderATasksTab } from './AdminTasks.js'
import { renderAPromoTab } from './AdminPromo.js'
import { renderANotificationsTab } from './AdminNotifications.js'
import { renderAAnalyticsTab } from './AdminAnalytics.js'
import { ADMIN_EMAIL } from '../firebase.js'
import {
  aAddContent, aEditContent, aDeleteContent, aSetBanner,
  aSaveTrending, aSaveSectionConfigs, buildSectionConfigs,
  aSetUserSub, aBlockUser, aUnblockUser, aDeleteUser,
  aAppointAdmin, aChangeAdminLevel, aRevokeAdmin, loadAllUsers,
  aSaveTasksConfig, DEFAULT_TASKS, loadTasksConfig,
  aSavePromoConfig, DEFAULT_PROMO, loadPromoConfig,
  adminBroadcastNotification, loadNotifHistory,
  aAwardCredits,
  adminSendChat, loadAdminChat,
  loadActivityLog,
} from '../utils/actions.js'
import { attachDragDrop } from '../utils/dragDrop.js'

// ── Main render ────────────────────────────────────────────
export function renderAdmin() {
  const lvl = S.adminLevel

  const allTabs = [
    { id: 'analytics',     lbl: 'Analytics',     icon: 'M3 3h18v18H3zM3 9h18M9 21V9', minLevel: 1 },
    { id: 'content',       lbl: 'Content',       icon: 'M15 10l4.553-2.069A1 1 0 0121 8.847V18.153a1 1 0 01-1.447.894L15 17M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z', minLevel: 1 },
    { id: 'banner',        lbl: 'Banner',        icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1zm0 8a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1zm14 0a1 1 0 011 1v6a1 1 0 01-1 1h-6a1 1 0 01-1-1v-6a1 1 0 011-1z', minLevel: 1 },
    { id: 'trending',      lbl: 'Trending',      icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', minLevel: 2 },
    { id: 'sections',      lbl: 'Sections',      icon: 'M4 6h16M4 12h16M4 18h7', minLevel: 2 },
    { id: 'promo',         lbl: 'Promo',         icon: 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7', minLevel: 2 },
    { id: 'notifications', lbl: 'Notifications', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9', minLevel: 2 },
    { id: 'tasks',         lbl: 'Credits',       icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', minLevel: 3 },
    { id: 'users',         lbl: 'Users',         icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', minLevel: 3 },
    { id: 'chat',          lbl: 'Chat',          icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', minLevel: 3 },
    { id: 'activity',      lbl: 'Activity',      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01', minLevel: 3 },
  ]

  const tabs = allTabs.filter(t => lvl >= t.minLevel)

  const badgeClass = lvl >= 5 ? 'alb-super' : lvl === 4 ? 'alb-l4' : lvl === 3 ? 'alb-l3' : lvl === 2 ? 'alb-l2' : 'alb-l1'
  const badgeLbl   = lvl >= 5 ? 'Super Admin' : 'Level ' + lvl + (lvl >= 4 ? ' Admin' : ' Sub-Admin')
  const adminName  = S.user?.displayName || S.user?.email || 'Admin'

  const accessible = tabs.map(t => t.id)
  if (!accessible.includes(S.aTab) && accessible.length) S.aTab = accessible[0]

  let panels = renderAAnalyticsTab()
  panels += renderAContent()
  panels += renderABanner()
  if (lvl >= 2) panels += renderATrending()
  if (lvl >= 2) panels += renderASections()
  if (lvl >= 2) panels += renderAPromoTab()
  if (lvl >= 2) panels += renderANotificationsTab()
  if (lvl >= 3) panels += renderATasksTab()
  if (lvl >= 3) panels += renderAUsers()
  if (lvl >= 3) panels += renderAChat()
  if (lvl >= 3) panels += renderAActivity()

  const navItems = tabs.map(t => {
    const isAct = S.aTab === t.id
    return '<button class="admin-nav-item' + (isAct ? ' act' : '') + '" data-tab="' + t.id + '" onclick="A.adminTab(this.dataset.tab)">'
      + '<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="' + t.icon + '"/></svg>'
      + t.lbl + '</button>'
  }).join('')

  const mobileTabs = tabs.map(t =>
    '<button class="amt-btn' + (S.aTab === t.id ? ' act' : '') + '" data-tab="' + t.id + '" onclick="A.adminTab(this.dataset.tab)">' + t.lbl + '</button>'
  ).join('')

  return '<div class="page admin-page">'
    // Sidebar
    + '<aside class="admin-sidebar">'
    + '<div class="admin-identity">'
    + '<div class="admin-identity-logo">Drama<em>Flow</em></div>'
    + '<div class="admin-identity-name">' + adminName + '</div>'
    + '<div class="admin-identity-badge ' + badgeClass + '">' + badgeLbl + '</div>'
    + '</div>'
    + '<nav class="admin-nav">' + navItems + '</nav>'
    + '<div class="admin-nav-footer">'
    + '<button data-page="home" onclick="A.nav(this.dataset.page)">'
    + '<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>'
    + 'Back to App</button>'
    + '</div>'
    + '</aside>'
    // Mobile tab bar
    + '<div class="admin-mobile-tabs">' + mobileTabs + '</div>'
    // Content
    + '<main class="admin-content">' + panels + '</main>'
    + '</div>'
}
// ── Content tab ────────────────────────────────────────────
function renderAContent() {
  return `<div class="apanel${S.aTab === 'content' ? ' vis' : ''}">
    <button class="btn btn-red btn-sm gap-b" onclick="A.toggleForm()">${S.aShowForm ? '✕ Cancel' : '+ Add Content'}</button>
    ${S.aShowForm ? renderContentForm(S.aEditId ? S.content.find(c => c.id === S.aEditId) : null) : ''}
    <div class="tbl-wrap">
      <table>
        <thead><tr><th></th><th>Title</th><th>Genre</th><th>EPs</th><th>Section</th><th>Views</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          ${S.content.map(c => `<tr>
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
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`
}

export function renderContentForm(e) {
  const eps = parseInt(e?.episodes) || 1
  const eid = e ? e.id : null
  const updateCall = eid ? `A.updateEpFields('${eid}')` : 'A.updateEpFields(null)'
  const epUrlRows = Array.from({ length: eps }, (_, i) => {
    const val = (e && e.episodeUrls && e.episodeUrls[i]) || ''
    return `<div class="ep-url-row"><span class="ep-url-lbl">EP ${i + 1}</span><input class="inp" id="eu${i}" placeholder="Video URL" value="${val}"></div>`
  }).join('')
  const titleRow = e ? 'Edit: ' + e.title : 'Add New Content'
  const bottomBtns = e
    ? `<button class="btn btn-red btn-sm" onclick="A.saveEdit('${e.id}')">Save Changes</button> <button class="btn btn-outline btn-sm" onclick="A.cancelForm()">Cancel</button>`
    : `<button class="btn btn-red btn-sm" onclick="A.submitNew()">Add Content</button> <button class="btn btn-outline btn-sm" onclick="A.cancelForm()">Cancel</button>`
  return `<div class="form-box" id="cForm">
    <div class="form-title">${titleRow}</div>
    <div class="fg2">
      <div class="inp-group"><label class="inp-label">Title</label><input class="inp" id="fT" value="${e?.title || ''}" placeholder="Drama title"></div>
      <div class="inp-group"><label class="inp-label">Genre</label><input class="inp" id="fG" value="${e?.genre || ''}" placeholder="Romance, Thriller…"></div>
    </div>
    <div class="inp-group"><label class="inp-label">Thumbnail URL</label><input class="inp" id="fTh" value="${e?.thumbnail || ''}" placeholder="https://…"></div>
    <div class="inp-group"><label class="inp-label">Description</label><textarea class="inp" id="fD">${e?.description || ''}</textarea></div>
    <div class="fg2">
      <div class="inp-group"><label class="inp-label">Section</label><input class="inp" id="fS" value="${e?.section || ''}" placeholder="Featured, Trending…"></div>
      <div class="inp-group"><label class="inp-label">Episodes</label><input class="inp" id="fE" type="number" min="1" max="100" value="${eps}" oninput="${updateCall}"></div>
    </div>
    <label class="inp-label">Episode Video URLs</label>
    <div class="ep-urls-box" id="epUrls">${epUrlRows}</div>

    <!-- Exclusive toggle -->
    <div class="excl-toggle-row">
      <label class="excl-toggle" id="exclusiveToggle" onclick="A.toggleExclusive()">
        <div class="excl-toggle-track${e?.exclusive ? ' excl-on' : ''}" id="exclusiveTrack">
          <div class="excl-toggle-thumb"></div>
        </div>
        <div class="excl-toggle-info">
          <div class="excl-toggle-label">👑 Exclusive Content</div>
          <div class="excl-toggle-sub">Only visible to Premium subscribers</div>
        </div>
      </label>
      <input type="hidden" id="fExcl" value="${e?.exclusive ? 'true' : 'false'}">
    </div>

    <div class="row gap-t">${bottomBtns}</div>
  </div>`
}

// ── Banner tab ─────────────────────────────────────────────
function renderABanner() {
  const v = S.content.filter(c => !c.hidden)
  return `<div class="apanel${S.aTab === 'banner' ? ' vis' : ''}">
    <div class="p-sub gap-b">Select the content displayed on the home banner</div>
    <div class="ban-grid">
      ${v.map(c => `<div class="ban-opt${S.bannerContentId === c.id ? ' act' : ''}" onclick="A.setBanner('${c.id}')">
        <img src="${c.thumbnail}" alt="${c.title}">
        <div class="ban-opt-name">${c.title}</div>
        ${S.bannerContentId === c.id ? '<div class="ban-check">✓</div>' : ''}
      </div>`).join('')}
    </div>
  </div>`
}

// ── Trending tab ───────────────────────────────────────────
function renderATrending() {
  const v = S.content.filter(c => !c.hidden)
  const notIn = v.filter(c => !S.tmpTrending.includes(c.id))
  return `<div class="apanel${S.aTab === 'trending' ? ' vis' : ''}">
    <p class="note">Drag rows to reorder. ${S.tmpTrending.length}/10 selected.</p>
    <div class="trend-list" id="trendList">
      ${S.tmpTrending.map((id, i) => {
        const c = v.find(x => x.id === id)
        if (!c) return ''
        return `<div class="trend-item" draggable="true" data-id="${id}" data-i="${i}">
          <span class="trend-rank">#${i + 1}</span>
          <img src="${c.thumbnail}" class="trend-img">
          <span class="trend-name">${c.title}</span>
          <button class="trend-rm" onclick="event.stopPropagation();A.rmTrend('${id}')">✕</button>
        </div>`
      }).join('')}
    </div>
    ${notIn.length ? `<p class="note">Click to add to trending:</p>
    <div class="trend-add-grid">
      ${notIn.map(c => `<div class="trend-add-card" onclick="A.addTrend('${c.id}')">
        <img src="${c.thumbnail}" alt="${c.title}">
        <div class="trend-add-ic">+</div>
        <div class="trend-add-name">${c.title}</div>
      </div>`).join('')}
    </div>` : ''}
    <button class="btn btn-red btn-sm" onclick="A.saveTrending()">Save Trending</button>
  </div>`
}

// ── Sections tab ───────────────────────────────────────────
function renderASections() {
  const configs = S.tmpSectionConfigs.length ? S.tmpSectionConfigs : buildSectionConfigs()
  if (!S.tmpSectionConfigs.length) S.tmpSectionConfigs = configs
  const allContent = S.content.filter(c => !c.hidden)

  function secRowHTML(sec, i) {
    const typePillClass = sec.type === 'trending' ? 'stp-trending' : sec.type === 'continue' ? 'stp-continue' : 'stp-content'
    const typeLabel = sec.type === 'trending' ? 'Trending' : sec.type === 'continue' ? '▶ Continue' : '📋 Content'
    const typeIcon = sec.type === 'trending' ? '🔥' : sec.type === 'continue' ? '▶' : '📋'
    const isOpen = S.expandedSection === i
    const cardCount = sec.type === 'content' ? (sec.pinnedIds?.length || allContent.filter(c => c.section === sec.name).length) : 0
    const subtitle = sec.type === 'content'
      ? ('Content section · ' + cardCount + ' card' + (cardCount !== 1 ? 's' : ''))
      : (sec.type === 'trending' ? 'System section · Top 10' : 'System section · Watch history')

    let body = ''
    if (sec.type === 'content') {
      let pinnedHTML = ''
      if (sec.pinnedIds?.length) {
        const items = sec.pinnedIds.map((id, pi) => {
          const c = allContent.find(x => x.id === id)
          if (!c) return ''
          return `<div class="sec-picked-item" draggable="true" data-id="${id}" data-pi="${pi}" data-si="${i}">
            <div class="spi-handle"><span></span><span></span><span></span></div>
            <img src="${c.thumbnail}" class="spi-img"><span class="spi-name">${c.title}</span>
            <span class="spi-rm" onclick="A.unpinCard(${i},'${id}')">✕</span></div>`
        }).join('')
        pinnedHTML = `<div class="sec-picked-list" id="secPickedList${i}">${items}</div>`
      } else {
        pinnedHTML = `<p class="sec-card-note" style="color:var(--jade)">✓ Auto mode — showing all content tagged "${sec.name}"</p>`
      }
      const availCards = allContent.map(c => {
        const isPinned = (sec.pinnedIds || []).includes(c.id)
        return `<div class="sec-avail-card${isPinned ? ' picked' : ''}" ${isPinned ? '' : `onclick="A.pinCard(${i},'${c.id}')"`}>
          <img src="${c.thumbnail}"><div class="sec-avail-card-name">${c.title}</div>
          ${isPinned ? '<div class="sec-avail-check">✓</div>' : ''}</div>`
      }).join('')
      body = `<div class="sec-field-row"><span class="sec-field-lbl">Name</span><input class="inp sec-name-inp" id="secName${i}" value="${sec.name}"></div>
        <div class="sec-field-row"><span class="sec-field-lbl">Type</span>
        <select class="sec-type-sel" id="secType${i}" onchange="A.secTypeChange(${i},this.value)">
          <option value="content" selected>📋 Content Row</option>
          <option value="trending">🔥 Top 10 Trending</option>
          <option value="continue">▶ Continue Watching</option>
        </select></div>
        <div class="sec-card-note"><strong>Pinned Cards</strong> — Choose which content appears here. If nothing pinned, section name is used automatically.</div>
        ${pinnedHTML}
        <div style="font-size:.72rem;font-weight:700;color:var(--txt3);text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px">Click to pin:</div>
        <div class="sec-avail-grid">${availCards}</div>
        <div class="sec-row-actions">
          <button class="tbtn tbtn-del" onclick="A.removeSecConfig(${i})">Remove</button>
          <button class="tbtn" onclick="A.clearPinned(${i})">Clear Pins</button>
        </div>`
    } else {
      const desc = sec.type === 'trending'
        ? '<strong>🔥 Top 10 Trending</strong> — Shows your configured Top 10 list. Drag to reposition.'
        : '<strong>▶ Continue Watching</strong> — Shows personalised continue-watching per user. Drag to reposition.'
      body = `<div class="sec-special-note">${desc}</div>
        <div class="sec-field-row"><span class="sec-field-lbl">Name</span><input class="inp sec-name-inp" id="secName${i}" value="${sec.name}"></div>`
    }

    return `<div class="sec-editor-row${isOpen ? ' expanded' : ''}${sec.hidden ? ' sec-hidden' : ''}" id="secRow${i}" draggable="true" data-i="${i}">
      <div class="sec-row-header" onclick="A.toggleSecExpand(${i})">
        <div class="sec-drag-handle" onclick="event.stopPropagation()"><span></span><span></span><span></span></div>
        <div class="sec-row-icon">${typeIcon}</div>
        <div class="sec-row-name-wrap"><div class="sec-row-title">${sec.name}</div><div class="sec-row-subtitle">${subtitle}</div></div>
        <span class="sec-type-pill ${typePillClass}">${typeLabel}</span>
        <button class="sec-vis-btn${sec.hidden ? ' sec-vis-hidden' : ''}" title="${sec.hidden ? 'Section hidden — click to show' : 'Section visible — click to hide'}"
          onclick="event.stopPropagation();A.toggleSectionHidden(${i})" aria-label="${sec.hidden ? 'Show section' : 'Hide section'}">
          ${sec.hidden
            ? `<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22"/></svg>`
            : `<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`
          }
        </button>
        <span class="sec-expand-arrow${isOpen ? ' open' : ''}">▼</span>
      </div>
      <div class="sec-row-body${isOpen ? ' open' : ''}">${body}</div>
    </div>`
  }

  return `<div class="apanel${S.aTab === 'sections' ? ' vis' : ''}">
    <div style="margin-bottom:16px">
      <div class="p-title" style="font-size:1.2rem">Home Feed Builder</div>
      <div class="p-sub">Drag to reorder · Click to expand · Changes apply to home screen</div>
    </div>
    <div class="sec-editor-wrap" id="secEditorList">${configs.map(secRowHTML).join('')}</div>
    <div class="row gap-t" style="flex-wrap:wrap">
      <button class="btn btn-outline btn-sm" onclick="A.addSecConfig()">+ Add Section</button>
      <button class="btn btn-red btn-sm" onclick="A.saveSecConfigs()">Save Feed Order</button>
    </div>
  </div>`
}

// ── Users tab ──────────────────────────────────────────────
function renderAUsers() {
  if (S.aTab !== 'users') return '<div class="apanel"></div>'

  const total    = S.allUsers.length
  const online   = S.allUsers.filter(u => u.online).length
  const blocked  = S.allUsers.filter(u => u.blocked).length
  const admins   = S.allUsers.filter(u => u.role === 'subadmin' || u.email === ADMIN_EMAIL).length
  const premium  = S.allUsers.filter(u => u.subscription === 'premium').length
  const standard = S.allUsers.filter(u => u.subscription === 'standard').length

  let users = [...S.allUsers]
  const q = (S.usersSearch || '').toLowerCase()
  if (q) users = users.filter(u => (u.displayName||'').toLowerCase().includes(q) || (u.email||'').toLowerCase().includes(q))
  if (S.userFilter === 'online')   users = users.filter(u => u.online)
  if (S.userFilter === 'blocked')  users = users.filter(u => u.blocked)
  if (S.userFilter === 'admin')    users = users.filter(u => u.role === 'subadmin' || u.email === ADMIN_EMAIL)
  if (S.userFilter === 'premium')  users = users.filter(u => u.subscription === 'premium')
  if (S.userFilter === 'standard') users = users.filter(u => u.subscription === 'standard')
  if (S.userFilter === 'free')     users = users.filter(u => !u.subscription || u.subscription === 'free')

  const filters = [
    { id: 'all',      lbl: 'All (' + total + ')' },
    { id: 'online',   lbl: '● ' + online + ' Online' },
    { id: 'premium',  lbl: premium + ' Premium' },
    { id: 'standard', lbl: standard + ' Std' },
    { id: 'free',     lbl: 'Free' },
    { id: 'admin',    lbl: admins + ' Admins' },
    { id: 'blocked',  lbl: blocked + ' Blocked' },
  ]

  // Safe single-quoted string literal for onclick="..." attributes
  // Firestore UIDs are alphanumeric — no escaping needed. Names get apostrophe-escaped.
  const _s = v => "'" + String(v).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'"

  function userCardHTML(u) {
    const uid       = u.id
    const uEmail    = u.email || ''
    const uLevel    = u.adminLevel || 0
    const sub       = u.subscription || 'free'
    const isBlocked = !!u.blocked
    const isEmailSA = uEmail === ADMIN_EMAIL
    const isSubAdmin= u.role === 'subadmin'
    const myLevel   = S.adminLevel || 0
    const canManage = myLevel >= 4 && !isEmailSA
    const credits   = u.adCredits || 0
    const letter    = (u.displayName || uEmail || 'U')[0].toUpperCase()
    const isExp     = S.expandedUserId === uid

    // Safe arg: uid is alphanumeric, name needs escaping
    const sId   = _s(uid)
    const sName = _s(u.displayName || uEmail || uid)

    // ── Avatar ──────────────────────────────────────────
    const avCls = 'uc2-av'
      + (isEmailSA ? ' uc2-av-sa' : isSubAdmin ? ' uc2-av-admin' : '')
      + (isBlocked ? ' uc2-av-blocked' : '')

    // ── Role label ───────────────────────────────────────
    let roleLabel = ''
    if (isEmailSA)       roleLabel = '<span class="uc2-role uc2-role-sa">Super Admin</span>'
    else if (isSubAdmin) roleLabel = '<span class="uc2-role uc2-role-l' + uLevel + '">L' + uLevel + ' Admin</span>'
    else                 roleLabel = '<span class="uc2-role uc2-role-user">User</span>'

    // ── Status dot ───────────────────────────────────────
    const statusDot = u.online
      ? '<span class="uc2-dot uc2-dot-on"></span>'
      : '<span class="uc2-dot uc2-dot-off"></span>'

    // ── Plan badge ───────────────────────────────────────
    const planBadge = '<span class="uc2-plan uc2-plan-' + sub + '">' + sub + '</span>'

    // ── Level picker ─────────────────────────────────────
    // Shown to canManage for ALL users (plain or admin)
    const levelPerms = {
      1: 'Analytics, Content, Banner',
      2: 'Trending, Promo, Notif',
      3: 'Users, Credits',
      4: 'Full Access'
    }
    let levelPicker = ''
    if (canManage) {
      let lvCards = ''
      for (let lv = 1; lv <= 4; lv++) {
        const isAct = isSubAdmin && uLevel === lv
        lvCards += '<button class="uc2-lv-btn' + (isAct ? ' act' : '') + '"'
          + ' data-uid="' + uid + '" data-name="' + uEmail + '" data-lv="' + lv + '"'
          + ' onclick="A.changeLevel(this.dataset.uid,this.dataset.name,parseInt(this.dataset.lv))">'
          + '<div class="uc2-lv-n">L' + lv + '</div>'
          + '<div class="uc2-lv-p">' + levelPerms[lv] + '</div>'
          + '</button>'
      }
      const hint = isSubAdmin
        ? 'Current: L' + uLevel + ' — tap to change level'
        : 'Tap a level to make admin'
      levelPicker = '<div class="uc2-section-label">Admin Role</div>'
        + '<div class="uc2-level-grid">' + lvCards + '</div>'
        + '<div class="uc2-lv-hint">' + hint + '</div>'
        + (isSubAdmin
            ? '<button class="uc2-revoke-btn" data-uid="' + uid + '" data-name="' + uEmail + '"'
              + ' onclick="A.revokeAdmin(this.dataset.uid,this.dataset.name)">Remove Admin Role</button>'
            : '')
    }

    // ── Plan selector ─────────────────────────────────────
    const planSel = canManage
      ? '<div class="uc2-section-label">Subscription Plan</div>'
        + '<div class="uc2-plan-btns">'
        + ['free','standard','premium'].map(p =>
            '<button class="uc2-plan-btn' + (sub === p ? ' act-' + p : '') + '"'
            + ' data-uid="' + uid + '" data-plan="' + p + '"'
            + ' onclick="A.setUserSub(this.dataset.uid,this.dataset.plan)">'
            + p.charAt(0).toUpperCase() + p.slice(1) + '</button>'
          ).join('')
        + '</div>'
      : ''

    // ── Action buttons ─────────────────────────────────────
    let actions = '<div class="uc2-section-label">Actions</div><div class="uc2-actions">'
    if (canManage) {
      actions += '<button class="uc2-btn uc2-btn-credits"'
        + ' data-uid="' + uid + '" data-name="' + uEmail + '" data-cr="' + credits + '"'
        + ' onclick="A.openAwardModal(this.dataset.uid,this.dataset.name,parseInt(this.dataset.cr))">Award Credits</button>'
      if (isBlocked) {
        actions += '<button class="uc2-btn uc2-btn-unblock" data-uid="' + uid + '" onclick="A.unblockUser(this.dataset.uid)">Unblock User</button>'
      } else {
        actions += '<button class="uc2-btn uc2-btn-block" data-uid="' + uid + '" onclick="A.blockUser(this.dataset.uid)">Block User</button>'
      }
      actions += '<button class="uc2-btn uc2-btn-del"'
        + ' data-uid="' + uid + '" data-name="' + uEmail + '"'
        + ' onclick="A.deleteUser(this.dataset.uid,this.dataset.name)">Delete Account</button>'
    } else if (isEmailSA) {
      actions += '<span class="uc2-note-sa">Super Admin — cannot be modified</span>'
    } else {
      actions += '<span class="uc2-note">Requires L4+ admin to manage</span>'
    }
    actions += '</div>'

    // ── Stats ───────────────────────────────────────────────
    const watched = Object.keys(u.watchHistory || {}).length
    const saved   = (u.myList || []).length
    const streak  = u.loginStreak || 0

    const stats = '<div class="uc2-stats">'
      + '<div class="uc2-stat"><div class="uc2-stat-n">' + watched  + '</div><div class="uc2-stat-l">Watched</div></div>'
      + '<div class="uc2-stat"><div class="uc2-stat-n">' + saved    + '</div><div class="uc2-stat-l">Saved</div></div>'
      + '<div class="uc2-stat"><div class="uc2-stat-n">' + streak   + '</div><div class="uc2-stat-l">Streak</div></div>'
      + '<div class="uc2-stat"><div class="uc2-stat-n" style="color:var(--jade)">' + credits + '</div><div class="uc2-stat-l">Credits</div></div>'
      + '</div>'

    // ── Expanded body ──────────────────────────────────────
    const expandBody = '<div class="uc2-expand' + (isExp ? ' open' : '') + '">'
      + stats
      + planSel
      + levelPicker
      + actions
      + '</div>'

    // ── Card header (always visible) ───────────────────────
    const header = '<div class="uc2-header" data-uid="' + uid + '" onclick="A.toggleUserExpand(this.dataset.uid)">'
      + '<div class="' + avCls + '">' + letter
      + '<span class="uc2-dot-wrap">' + statusDot + '</span>'
      + '</div>'
      + '<div class="uc2-info">'
      + '<div class="uc2-name">' + (u.displayName || '(no name)') + '</div>'
      + '<div class="uc2-email">' + uEmail + '</div>'
      + '<div class="uc2-tags">' + roleLabel + planBadge + (isBlocked ? '<span class="uc2-role uc2-role-blocked">Blocked</span>' : '') + '</div>'
      + '</div>'
      + '<div class="uc2-chevron' + (isExp ? ' open' : '') + '">'
      + '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" d="M6 9l6 6 6-6"/></svg>'
      + '</div>'
      + '</div>'

    return '<div class="uc2' + (isBlocked ? ' uc2-blocked' : '') + (isEmailSA ? ' uc2-sa' : isSubAdmin ? ' uc2-admin' : '') + '">'
      + header + expandBody + '</div>'
  }

  const filterBtns = filters.map(f =>
    '<button class="uf-pill' + (S.userFilter === f.id ? ' act' : '') + '" data-filter="' + f.id + '" onclick="A.userFilter(this.dataset.filter)">' + f.lbl + '</button>'
  ).join('')

  const emptyMsg = total === 0 ? 'Click Refresh to load users' : 'No users match this filter'
  const cardsHTML = users.length
    ? users.map(userCardHTML).join('')
    : '<div class="empty" style="padding:40px 0"><p class="empty-txt">' + emptyMsg + '</p></div>'

  return '<div class="apanel vis">'
    + '<div class="ap-header">'
    + '<div><div class="ap-title">Users</div><div class="ap-sub">' + total + ' total &nbsp;·&nbsp; ' + online + ' online &nbsp;·&nbsp; ' + admins + ' admins</div></div>'
    + '<button class="btn btn-outline btn-sm" onclick="A.loadUsers()">Refresh</button>'
    + '</div>'
    // Stats row
    + '<div class="users-stats">'
    + '<div class="ustat"><div class="ustat-n" style="color:var(--txt)">' + total + '</div><div class="ustat-l">Total</div></div>'
    + '<div class="ustat"><div class="ustat-n" style="color:var(--jade)">' + online + '</div><div class="ustat-l">Online</div></div>'
    + '<div class="ustat"><div class="ustat-n" style="color:var(--amber)">' + admins + '</div><div class="ustat-l">Admins</div></div>'
    + '<div class="ustat"><div class="ustat-n" style="color:var(--red)">' + blocked + '</div><div class="ustat-l">Blocked</div></div>'
    + '</div>'
    // Search — uses scoped state S.usersSearch, in-place update keeps focus
    + '<div class="users-search-wrap" id="usersSearchWrap" style="margin-bottom:10px">'
    + '<svg class="search-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>'
    + '<input class="inp" id="usersSearchInput" placeholder="Search name or email…" value="' + (S.usersSearch||'') + '" oninput="A.usersSearch(this.value)" autocomplete="off" autocorrect="off" spellcheck="false">'
    + '<button class="users-search-clear" id="usersSearchClear" onclick="A.usersSearch(\'\')" title="Clear search" style="display:' + (S.usersSearch ? 'flex' : 'none') + ';align-items:center"><svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" d="M18 6L6 18M6 6l12 12"/></svg></button>'
    + '</div>'
    + '<div class="users-search-meta" style="font-size:.72rem;color:var(--txt3);margin-bottom:8px">'
    + '<span id="usersSearchCount">' + users.length + ' of ' + total + '</span>'
    + '</div>'
    + '<div class="users-filter-row" style="margin-bottom:14px">' + filterBtns + '</div>'
    + '<div class="uc2-list" id="uc2ListWrap">' + cardsHTML + '</div>'
    + (S.awardModal ? renderAwardModal() : '')
    + '</div>'
}


// ── Award Credits modal ────────────────────────────────────
function renderAwardModal() {
  const { uid, name, currentCredits } = S.awardModal
  return `<div class="award-modal-overlay" onclick="event.target.classList.contains('award-modal-overlay')&&A.closeAwardModal()">
    <div class="award-modal">
      <div class="award-modal-header">
        <div class="award-modal-title">Award Credits</div>
        <button class="icon-btn" onclick="A.closeAwardModal()" aria-label="Close">
          <span class="icon icon-close icon-txt2"></span>
        </button>
      </div>
      <div class="award-modal-body">
        <div class="award-modal-user">
          <div class="award-modal-av">${name[0].toUpperCase()}</div>
          <div>
            <div class="award-modal-username">${name}</div>
            <div class="award-modal-balance">Current balance: <strong style="color:var(--jade)">${currentCredits} credits</strong></div>
          </div>
        </div>
        <div class="inp-group" style="margin-top:18px">
          <label class="inp-label">Amount (use negative to deduct)</label>
          <input class="inp" id="awardAmt" type="number" placeholder="e.g. 5" autofocus
            style="font-size:1.1rem;text-align:center;letter-spacing:.05em">
        </div>
        <div class="award-quick-btns">
          ${[1,2,5,10].map(n => `<button class="award-quick-btn" onclick="document.getElementById('awardAmt').value=${n}">${n > 0 ? '+' : ''}${n}</button>`).join('')}
          ${[-1,-3,-5].map(n => `<button class="award-quick-btn award-quick-neg" onclick="document.getElementById('awardAmt').value=${n}">${n}</button>`).join('')}
        </div>
        <div class="inp-group">
          <label class="inp-label">Reason (optional — logged for audit)</label>
          <input class="inp" id="awardReason" placeholder="e.g. Contest winner, Support issue…">
        </div>
      </div>
      <div class="award-modal-footer">
        <button class="btn btn-outline" onclick="A.closeAwardModal()">Cancel</button>
        <button class="btn btn-red" onclick="A.confirmAward()" id="awardConfirmBtn">Award Credits</button>
      </div>
    </div>
  </div>`
}

// ── Chat tab ───────────────────────────────────────────────
function renderAChat() {
  if (S.aTab !== 'chat') return '<div class="apanel"></div>'

  const activeTab = S.globalChatTab || 'direct'

  function timeStr(ts) {
    if (!ts) return ''
    const d = ts.seconds ? new Date(ts.seconds * 1000) : new Date(ts)
    const now = new Date()
    const diff = now - d
    if (diff < 60000) return 'just now'
    if (diff < 3600000) return Math.floor(diff/60000) + 'm ago'
    if (diff < 86400000) return d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})
    return d.toLocaleDateString([], {month:'short',day:'numeric'})
  }

  // ── Tab bar ───────────────────────────────────────────────
  const tabBar = `<div class="chat-tab-bar">
    <button class="chat-tab-btn${activeTab === 'direct' ? ' act' : ''}" onclick="A.setChatTab('direct')">
      <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
      Direct Messages
    </button>
    <button class="chat-tab-btn${activeTab === 'global' ? ' act' : ''}" onclick="A.setChatTab('global')">
      <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
      Admin Group Chat
      <span class="chat-tab-badge">All Admins</span>
    </button>
  </div>`

  // ── Direct messages panel ──────────────────────────────────
  let directPanel = ''
  if (activeTab === 'direct') {
    const users = [...S.allUsers].filter(u => u.email !== ADMIN_EMAIL)
    const q = (S.chatSearch || '').toLowerCase()
    const filtered = q ? users.filter(u =>
      (u.displayName||'').toLowerCase().includes(q) ||
      (u.email||'').toLowerCase().includes(q)
    ) : users

    const openUid = S.chatUid
    const openUser = openUid ? S.allUsers.find(u => u.id === openUid) : null
    const msgs = S.chatMessages || []

    const userList = filtered.length
      ? filtered.map(u => {
          const isOpen = u.id === openUid
          const av = (u.displayName || u.email || '?')[0].toUpperCase()
          const onlineDot = u.online ? '<span class="chat-online-dot"></span>' : ''
          return `<div class="chat-user-row${isOpen ? ' act' : ''}" onclick="A.openChat('${u.id}')">`
            + `<div class="chat-av">${av}${onlineDot}</div>`
            + `<div class="chat-user-info"><div class="chat-user-name">${u.displayName || u.email || u.id}</div>`
            + `<div class="chat-user-email">${u.email || ''}</div></div>`
            + `</div>`
        }).join('')
      : '<div class="chat-empty-list">No users found</div>'

    const msgArea = openUser
      ? `<div class="chat-panel-header">
          <div class="chat-av" style="width:34px;height:34px;font-size:.85rem">${(openUser.displayName||openUser.email||'?')[0].toUpperCase()}</div>
          <div>
            <div style="font-size:.9rem;font-weight:500;color:var(--txt)">${openUser.displayName || openUser.email}</div>
            <div style="font-size:.75rem;color:var(--txt3)">${openUser.online ? '🟢 Online' : 'Offline'} · ${openUser.subscription||'free'} plan</div>
          </div>
          <button class="icon-btn" style="margin-left:auto" onclick="A.closeChat()" title="Close"><span class="icon icon-close icon-txt2"></span></button>
        </div>
        <div class="chat-messages" id="chatMessages">
          ${msgs.length
            ? msgs.map(m => {
                const isAdmin = m.from === 'admin'
                return `<div class="chat-msg${isAdmin ? ' chat-msg-admin' : ' chat-msg-user'}">
                  <div class="chat-bubble">${m.text.replace(/</g,'&lt;')}</div>
                  <div class="chat-msg-time">${isAdmin ? (m.fromName||'Admin') + ' · ' : ''}${timeStr(m.at)}</div>
                </div>`
              }).join('')
            : '<div class="chat-no-msgs">No messages yet. Start the conversation.</div>'
          }
        </div>
        <div class="chat-input-row">
          <input class="inp chat-inp" id="chatInputField" placeholder="Type a message…"
            value="${(S.chatInput||'').replace(/"/g,'&quot;')}"
            oninput="A.setChatInput(this.value)"
            onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();A.sendChat()}">
          <button class="btn btn-red chat-send-btn" onclick="A.sendChat()">Send</button>
        </div>`
      : `<div class="chat-select-prompt">
          <svg width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" style="color:var(--txt4);margin-bottom:10px"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
          <div style="color:var(--txt3);font-size:.9rem">Select a user to message</div>
        </div>`

    directPanel = `<div class="chat-layout">
      <div class="chat-user-list">
        <div class="users-search-wrap" style="margin-bottom:10px">
          <svg class="search-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input class="inp" id="chatSearchInput" placeholder="Search users…" value="${S.chatSearch||''}" oninput="A.setChatSearch(this.value)" autocomplete="off" autocorrect="off" spellcheck="false">
          <button class="users-search-clear" id="chatSearchClear" onclick="A.setChatSearch('')" title="Clear" style="display:${S.chatSearch ? 'flex' : 'none'};align-items:center"><svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" d="M18 6L6 18M6 6l12 12"/></svg></button>
        </div>
        <div class="chat-user-list-inner" id="chatUserListInner">${userList}</div>
      </div>
      <div class="chat-convo">${msgArea}</div>
    </div>`
  }

  // ── Global group chat panel ──────────────────────────────
  let globalPanel = ''
  if (activeTab === 'global') {
    const gMsgs = S.globalChatMessages || []
    const myUid  = S.user?.uid || ''

    const levelLabel = { 1:'L1', 2:'L2', 3:'L3', 4:'L4', 5:'Super' }

    const gMsgHTML = gMsgs.length
      ? gMsgs.map(m => {
          const isMine = m.from === myUid
          const lvl    = m.level || 1
          const badge  = `<span class="gchat-level-badge gchat-lvl-${lvl > 4 ? 5 : lvl}">${levelLabel[lvl] || 'L1'}</span>`
          return `<div class="gchat-msg${isMine ? ' gchat-mine' : ''}">
            <div class="gchat-meta">${badge} <span class="gchat-name">${m.fromName || 'Admin'}</span><span class="gchat-time">${timeStr(m.at)}</span></div>
            <div class="gchat-bubble">${m.text.replace(/</g,'&lt;')}</div>
          </div>`
        }).join('')
      : '<div class="gchat-empty"><div class="gchat-empty-icon">💬</div><div>No messages yet</div><div style="font-size:.75rem;margin-top:4px;opacity:.6">Be the first to say something to the team</div></div>'

    globalPanel = `<div class="gchat-layout">
      <div class="gchat-header">
        <div class="gchat-header-info">
          <div class="gchat-header-title">Admin Team Chat</div>
          <div class="gchat-header-sub">Visible to all admins &amp; sub-admins · ${S.allUsers.filter(u => u.role === 'subadmin' || u.email === ADMIN_EMAIL).length + 1} members</div>
        </div>
        <button class="btn btn-outline btn-sm" onclick="A.refreshGlobalChat()">Refresh</button>
      </div>
      <div class="gchat-messages" id="globalChatMessages">${gMsgHTML}</div>
      <div class="gchat-input-row">
        <div class="gchat-my-av">${(S.user?.displayName || S.user?.email || 'A')[0].toUpperCase()}</div>
        <input class="inp gchat-inp" id="globalChatField" placeholder="Message all admins…"
          value="${(S.globalChatInput||'').replace(/"/g,'&quot;')}"
          oninput="A.setGlobalChatInput(this.value)"
          onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();A.sendGlobalChat()}">
        <button class="btn btn-red gchat-send-btn" onclick="A.sendGlobalChat()">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
        </button>
      </div>
    </div>`
  }

  return `<div class="apanel vis">
    <div class="ap-header" style="margin-bottom:0">
      <div><div class="ap-title">Chat</div><div class="ap-sub">Message users or coordinate with your admin team</div></div>
    </div>
    ${tabBar}
    ${directPanel}${globalPanel}
  </div>`
}

// ── Activity Log tab ───────────────────────────────────────
function renderAActivity() {
  if (S.aTab !== 'activity') return '<div class="apanel"></div>'

  const log = S.activityLog || []
  const filter = S.actLogFilter || 'all'

  const filters = [
    { id: 'all',          lbl: 'All' },
    { id: 'subscription', lbl: 'Subscriptions' },
    { id: 'credits',      lbl: 'Credits' },
    { id: 'block',        lbl: 'Blocks' },
    { id: 'admin',        lbl: 'Admin roles' },
  ]

  const filtered = filter === 'all' ? log : log.filter(e => e.type === filter || (filter === 'block' && (e.type === 'block' || e.type === 'unblock')))

  function timeStr(ts) {
    if (!ts) return ''
    const d = ts.seconds ? new Date(ts.seconds * 1000) : new Date(ts)
    return d.toLocaleString([], {month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'})
  }

  function typeIcon(type) {
    if (type === 'subscription') return '<span style="color:#F2A623">★</span>'
    if (type === 'credits')      return '<span style="color:#1D9E75">◈</span>'
    if (type === 'block')        return '<span style="color:#E24B4A">⊘</span>'
    if (type === 'unblock')      return '<span style="color:#639922">✓</span>'
    if (type === 'admin')        return '<span style="color:#7F77DD">⬡</span>'
    return '<span style="color:var(--txt3)">•</span>'
  }

  function typeTag(type) {
    const map = {
      subscription: 'act-tag-sub',
      credits:      'act-tag-credits',
      block:        'act-tag-block',
      unblock:      'act-tag-unblock',
      admin:        'act-tag-admin',
    }
    const labels = {
      subscription: 'Sub',
      credits:      'Credits',
      block:        'Block',
      unblock:      'Unblock',
      admin:        'Admin',
    }
    return `<span class="act-tag ${map[type]||'act-tag-other'}">${labels[type]||type}</span>`
  }

  const filterBtns = filters.map(f =>
    `<button class="uf-pill${filter === f.id ? ' act' : ''}" onclick="A.actLogFilter('${f.id}')">${f.lbl}</button>`
  ).join('')

  const rows = filtered.length
    ? filtered.map(e => `
      <div class="act-row">
        <div class="act-icon">${typeIcon(e.type)}</div>
        <div class="act-body">
          <div class="act-action">${typeTag(e.type)} ${e.action || '—'}</div>
          <div class="act-meta">
            <span class="act-target" title="${e.targetUid||''}">
              <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"/></svg>
              ${e.targetName || e.targetUid || 'Unknown user'}
            </span>
            <span class="act-sep">·</span>
            <span class="act-by" title="${e.byEmail||''}">
              <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path stroke-linecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              by ${e.byName || e.byEmail || 'Admin'}
            </span>
            ${e.reason ? `<span class="act-sep">·</span><span class="act-reason">"${e.reason}"</span>` : ''}
            ${e.amount != null ? `<span class="act-sep">·</span><span class="act-amount" style="color:${e.amount>0?'var(--jade)':'var(--red)'}">${e.amount>0?'+':''}${e.amount} credits</span>` : ''}
            ${e.from && e.to ? `<span class="act-sep">·</span><span class="act-change">${e.from} → ${e.to}</span>` : ''}
          </div>
        </div>
        <div class="act-time">${timeStr(e.at)}</div>
      </div>`
    ).join('')
    : `<div class="empty" style="padding:48px 0">
        <p class="empty-txt">${log.length === 0 ? 'No activity yet. Actions like giving Premium or awarding credits will appear here.' : 'No entries match this filter.'}</p>
      </div>`

  return `<div class="apanel vis">
    <div class="ap-header">
      <div><div class="ap-title">Activity Log</div><div class="ap-sub">${log.length} total actions recorded</div></div>
      <button class="btn btn-outline btn-sm" onclick="A.loadActivityLog()">Refresh</button>
    </div>
    <div class="users-filter-row" style="margin-bottom:16px">${filterBtns}</div>
    <div class="act-list">${rows}</div>
  </div>`
}

// ── Bind drag-drop after render ────────────────────────────
export function bindAdminDrag() {
  if (S.aTab === 'trending') {
    attachDragDrop('trendList', '.trend-item', S.tmpTrending, arr => { S.tmpTrending = arr; notify() }, { idAttr: 'data-id', idxAttr: 'data-i' })
  }
  if (S.aTab === 'sections') {
    attachDragDrop('secEditorList', '.sec-editor-row', S.tmpSectionConfigs, arr => { S.tmpSectionConfigs = arr; S.expandedSection = -1; notify() }, { idxAttr: 'data-i' })
  }
}
