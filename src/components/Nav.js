// src/components/Nav.js
import { S } from '../store.js'

// ── SVG icon helpers ───────────────────────────────────────
const IC = {
  home:     '<span class="icon icon-home"></span>',
  search:   '<span class="icon icon-search"></span>',
  library:  '<span class="icon icon-library"></span>',
  bookmark: '<span class="icon icon-bookmark"></span>',
  profile:  '<span class="icon icon-profile"></span>',
  credits:  '<span class="icon icon-credits"></span>',
  bell:     '<span class="icon icon-bell"></span>',
  settings: '<span class="icon icon-settings"></span>',
}

export function renderTopNav() {
  const { user, isAdmin, page } = S
  const unread = S.notifications.filter(n => !n.read).length
  const credits = S.adCredits || 0

  const links = [
    { id: 'home',    label: 'Home'         },
    { id: 'search',  label: 'Explore'      },
    { id: 'library', label: 'Library'      },
    { id: 'mylist',  label: 'My List'      },
    { id: 'credits', label: 'Earn Credits', highlight: true },
  ]

  const linkHTML = links.map(l => {
    let cls = 'nl'
    if (page === l.id) cls += ' act'
    if (l.highlight)   cls += ' nl-credits'
    return '<a class="' + cls + '" role="link" aria-current="' + (page === l.id ? 'page' : 'false') + '" onclick="A.nav(\'' + l.id + '\')">' + l.label + '</a>'
  }).join('')

  const adminLink = isAdmin
    ? '<a class="nl admin-nl' + (page === 'admin' ? ' act' : '') + '" onclick="A.nav(\'admin\')">'
      + IC.settings + ' Admin</a>'
    : ''

  const bellBadge = unread
    ? '<span class="notif-dot">' + (unread > 9 ? '9+' : unread) + '</span>'
    : ''

  const userHTML = user
    ? '<button class="notif-bell" onclick="A.openNotifs()" title="Notifications" aria-label="Notifications">'
        + IC.bell + bellBadge
      + '</button>'
      + '<div class="upill' + (S.userChatUnread ? ' upill-unread' : '') + '" onclick="A.nav(\'profile\')">'
      + '<div class="uav">' + (user.displayName || user.email || 'U')[0].toUpperCase() + '</div>'
      + (S.userChatUnread ? '<span class="upill-chat-dot"></span>' : '')
      + '<span class="uname">' + (user.displayName || user.email) + '</span>'
      + '</div>'
    : '<button class="btn btn-outline btn-sm" onclick="A.openAuth(\'login\')">Login</button>'
      + '<button class="btn btn-red btn-sm" onclick="A.openAuth(\'signup\')">Sign Up</button>'

  return '<div class="logo" onclick="A.nav(\'home\')">Drama<em>Flow</em></div>'
    + '<div class="nav-links">' + linkHTML + adminLink + '</div>'
    + '<div class="nav-r">' + userHTML + '</div>'
}

export function renderBotNav() {
  const p       = S.page
  const credits = S.adCredits || 0

  const items = [
    { id: 'home',    icon: IC.home,     lbl: 'Home'                           },
    { id: 'search',  icon: IC.search,   lbl: 'Explore'                        },
    { id: 'credits', icon: IC.credits,  lbl: credits ? credits + ' cr' : 'Earn', highlight: true },
    { id: 'mylist',  icon: IC.bookmark, lbl: 'My List'                        },
    { id: 'profile', icon: IC.profile,  lbl: 'Profile'                        },
  ]

  return items.map(x => {
    let cls = 'bni'
    if (p === x.id)   cls += ' act'
    if (x.highlight)  cls += ' bni-highlight'
    const chatDot = x.id === 'profile' && S.userChatUnread
      ? '<span class="bni-chat-dot" aria-label="Unread message"></span>'
      : ''
    return '<button class="' + cls + '" onclick="A.nav(\'' + x.id + '\')" aria-label="' + x.lbl + '" aria-current="' + (p === x.id ? 'page' : 'false') + '">'
      + '<span class="bni-ic" aria-hidden="true">' + x.icon + chatDot + '</span>'
      + '<span class="bni-lbl">' + x.lbl + '</span>'
      + '</button>'
  }).join('')
}

// ── Notifications panel ────────────────────────────────────
export function renderNotifPanel() {
  if (!S.pShowNotifs) return ''
  const notifs = S.notifications

  const items = notifs.length
    ? notifs.map(n => {
        const ts = n.createdAt?.seconds ? _relTime(n.createdAt.seconds) : ''
        return '<div class="notif-item' + (n.read ? '' : ' unread') + '" onclick="A.notifClick(\'' + n.contentId + '\')">'
          + '<img src="' + n.thumbnail + '" class="notif-thumb" alt="" onerror="this.style.display=\'none\'">'
          + '<div class="notif-body">'
          + '<div class="notif-title">' + n.title + '</div>'
          + '<div class="notif-msg">' + n.message + '</div>'
          + (ts ? '<div class="notif-ts">' + ts + '</div>' : '')
          + '</div>'
          + (!n.read ? '<div class="notif-unread-dot"></div>' : '')
          + '</div>'
      }).join('')
    : '<div class="empty" style="padding:40px 20px"><p class="empty-txt" style="text-align:center">No notifications yet</p></div>'

  const markAllBtn = notifs.some(n => !n.read)
    ? '<button class="tbtn" onclick="A.markNotifsRead()">Mark all read</button>'
    : ''

  return '<div class="notif-overlay" onclick="event.target.classList.contains(\'notif-overlay\')&&A.closeNotifs()">'
    + '<div class="notif-panel">'
    + '<div class="notif-panel-head">'
    + '<div class="sheet-title">Notifications</div>'
    + '<div style="display:flex;gap:8px;align-items:center">' + markAllBtn
    + '<button class="sheet-x icon-btn" onclick="A.closeNotifs()" aria-label="Close">'
    + '<span class="icon icon-close icon-txt2"></span></button></div>'
    + '</div>'
    + '<div class="notif-list">' + items + '</div>'
    + '</div></div>'
}

function _relTime(sec) {
  const d = Math.floor(Date.now() / 1000) - sec
  if (d < 60)    return 'Just now'
  if (d < 3600)  return Math.floor(d / 60)   + 'm ago'
  if (d < 86400) return Math.floor(d / 3600)  + 'h ago'
  return               Math.floor(d / 86400) + 'd ago'
}
