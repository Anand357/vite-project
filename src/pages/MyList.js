// src/pages/MyList.js
import { S } from '../store.js'
import { cardHTML } from '../components/Card.js'
import { getRecommendations, getLastWatchedTitle } from '../utils/actions.js'

export function renderMyList() {
  if (!S.user) return `<div class="page p-pad">
    <div class="p-title">My List</div>
    <div class="empty-state">
      <div class="empty-state-icon">
        <svg width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.4" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
        </svg>
      </div>
      <h3 class="empty-state-title">Save dramas to watch later</h3>
      <p class="empty-state-sub">Sign in to build your personal list.</p>
      <div class="empty-state-btns">
        <button class="btn btn-outline" onclick="A.openAuth('login')">Sign In</button>
        <button class="btn btn-red" onclick="A.openAuth('signup')">Create Account</button>
      </div>
    </div>
  </div>`

  const items = S.content.filter(c => !c.hidden && S.myList.includes(c.id))

  if (items.length) {
    return `<div class="page p-pad">
      <div class="p-title">My List</div>
      <div class="p-sub">${items.length} drama${items.length !== 1 ? 's' : ''} saved</div>
      <div class="grid">${items.map(c => cardHTML(c)).join('')}</div>
    </div>`
  }

  // ── Empty state with recommendations ──────────────────────
  const recs       = getRecommendations()
  const lastTitle  = getLastWatchedTitle()
  const allVisible = S.content.filter(c => !c.hidden)
  const trending   = (S.trendingIds.map(id => allVisible.find(c => c.id === id)).filter(Boolean)).slice(0, 8)
  const suggest    = recs.length ? recs : trending.length ? trending : allVisible.slice(0, 8)
  const rowLabel   = recs.length && lastTitle
    ? 'Because you watched ' + lastTitle
    : 'Popular right now'

  return `<div class="page p-pad">
    <div class="p-title">My List</div>

    <div class="empty-state">
      <div class="empty-state-icon">
        <svg width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.4" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
        </svg>
      </div>
      <h3 class="empty-state-title">Your list is empty</h3>
      <p class="empty-state-sub">Tap the + button on any drama to save it here for later.</p>
    </div>

    ${suggest.length ? `
    <div class="mylist-suggest">
      <div class="mylist-suggest-title">${rowLabel}</div>
      <div class="hscroll">${suggest.map(c => cardHTML(c)).join('')}</div>
    </div>` : ''}

    <div class="mylist-explore">
      <button class="btn btn-outline fw" onclick="A.nav('search')">Browse All Dramas</button>
    </div>
  </div>`
}
