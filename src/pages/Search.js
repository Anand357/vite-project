// src/pages/Search.js
import { S } from '../store.js'
import { cardHTML } from '../components/Card.js'
import { getAvgRating } from '../utils/actions.js'

export function renderSearch() {
  const all    = S.content.filter(c => !c.hidden)
  const genres = [...new Set(all.map(c => c.genre).filter(Boolean))].sort()

  // Filter
  let v = [...all]
  if (S.sGenres?.length) v = v.filter(c => S.sGenres.includes(c.genre))
  if (S.sq) {
    const q = S.sq.toLowerCase()
    v = v.filter(c =>
      c.title.toLowerCase().includes(q) ||
      (c.genre || '').toLowerCase().includes(q) ||
      (c.description || '').toLowerCase().includes(q)
    )
  }

  // Sort
  const sort = S.sSort || 'popular'
  if      (sort === 'popular') v.sort((a,b) => (b.views||0)  - (a.views||0))
  else if (sort === 'newest')  v.sort((a,b) => (b.createdAt?.seconds||0) - (a.createdAt?.seconds||0))
  else if (sort === 'liked')   v.sort((a,b) => (b.likes||0)  - (a.likes||0))
  else if (sort === 'rated')   v.sort((a,b) => getAvgRating(b) - getAvgRating(a))

  const sorts = [
    { id: 'popular', lbl: 'Popular' },
    { id: 'newest',  lbl: 'Newest'  },
    { id: 'liked',   lbl: 'Most Liked' },
    { id: 'rated',   lbl: 'Top Rated'  },
  ]

  // Genre pills — use data-genre attribute to avoid string injection in onclick
  const genrePills = genres.map(g => {
    const on = S.sGenres?.includes(g)
    return `<button class="gpill${on ? ' act' : ''}" data-genre="${g.replace(/"/g,'&quot;')}" onclick="A.toggleGenre(this.dataset.genre)">${g}</button>`
  }).join('')

  const sortPills = sorts.map(s =>
    `<button class="sort-pill${sort === s.id ? ' act' : ''}" onclick="A.setSort('${s.id}')">${s.lbl}</button>`
  ).join('')

  const gridHTML = v.length
    ? v.map(c => cardHTML(c)).join('')
    : `<div class="empty">
        <p class="empty-txt">No results found</p>
        <button class="btn btn-outline btn-sm gap-t" onclick="A.clearGenres()">Clear filters</button>
       </div>`

  return `<div class="page p-pad">
    <div class="p-title">Explore</div>
    <div class="p-sub">${all.length} titles · Find your next obsession</div>

    <!-- Search bar — oninput does NOT full re-render, updates grid in place -->
    <div class="search-bar" style="margin-bottom:12px">
      <svg width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
      <input class="inp" id="sq" placeholder="Search titles, genres, descriptions…"
        value="${S.sq || ''}"
        oninput="A.search(this.value)"
        autocomplete="off" autocorrect="off" spellcheck="false"
        style="border-radius:50px;padding-left:44px;${S.sq ? 'padding-right:36px' : ''}">
      ${S.sq ? `<button class="search-clear" onclick="A.clearGenres()">
        <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" d="M18 6L6 18M6 6l12 12"/></svg>
      </button>` : ''}
    </div>

    <!-- Genre chips — IDs so _updateSearchResults can update them without re-render -->
    <div class="genre-bar" id="genreBar" style="margin-bottom:10px">
      <button class="gpill${!S.sGenres?.length ? ' act' : ''}" onclick="A.clearGenres()">All</button>
      ${genrePills}
    </div>

    <!-- Sort -->
    <div class="sort-row" id="sortRow">${sortPills}</div>

    <!-- Result count -->
    <div class="search-results-count" id="searchCount">
      ${v.length} result${v.length !== 1 ? 's' : ''}
      ${S.sq ? ` for "<strong>${S.sq}</strong>"` : ''}
      ${S.sGenres?.length ? ` in <strong>${S.sGenres.join(', ')}</strong>` : ''}
    </div>

    <!-- Results grid — updated in-place by _updateSearchResults -->
    <div id="searchGrid" class="grid">${gridHTML}</div>
  </div>`
}
