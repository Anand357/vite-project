// src/pages/Library.js
import { S } from '../store.js'
import { cardHTML } from '../components/Card.js'

export function renderLibrary() {
  const all = S.content.filter(c => !c.hidden)
  const genres = [...new Set(all.map(c => c.genre).filter(Boolean))].sort()

  // Apply filters
  const q = (S.libSearch || '').toLowerCase()
  const activeGenre = S.libGenre || ''
  const activeSort  = S.libSort  || 'default'

  let v = [...all]
  if (q) v = v.filter(c =>
    c.title.toLowerCase().includes(q) ||
    (c.genre || '').toLowerCase().includes(q) ||
    (c.description || '').toLowerCase().includes(q)
  )
  if (activeGenre) v = v.filter(c => c.genre === activeGenre)
  if (activeSort === 'az')       v.sort((a,b) => a.title.localeCompare(b.title))
  else if (activeSort === 'za')  v.sort((a,b) => b.title.localeCompare(a.title))
  else if (activeSort === 'new') v.sort((a,b) => (b.createdAt?.seconds||0) - (a.createdAt?.seconds||0))
  else if (activeSort === 'pop') v.sort((a,b) => (b.views||0) - (a.views||0))

  const genrePills = ['', ...genres].map(g => {
    const on = g === activeGenre
    const lbl = g || 'All Genres'
    return `<button class="gpill${on ? ' act' : ''}" onclick="A.setLibGenre('${g.replace(/'/g,"\\'")}')"> ${lbl}</button>`
  }).join('')

  const sorts = [
    { id: 'default', lbl: 'Default' },
    { id: 'pop',     lbl: 'Popular' },
    { id: 'new',     lbl: 'Newest'  },
    { id: 'az',      lbl: 'A–Z'     },
    { id: 'za',      lbl: 'Z–A'     },
  ]
  const sortPills = sorts.map(s =>
    `<button class="sort-pill${activeSort === s.id ? ' act' : ''}" onclick="A.setLibSort('${s.id}')">${s.lbl}</button>`
  ).join('')

  const gridHTML = v.length
    ? v.map(c => cardHTML(c)).join('')
    : `<div class="empty">
        <p class="empty-txt">No titles match your filters.</p>
        <button class="btn btn-outline btn-sm" onclick="A.clearLibFilters()">Clear filters</button>
       </div>`

  return `<div class="page p-pad">
    <div class="p-title">Library</div>
    <div class="p-sub">${all.length} titles${v.length !== all.length ? ` · ${v.length} shown` : ''}</div>

    <div class="search-bar" style="margin-bottom:12px">
      <svg width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
      <input class="inp" placeholder="Search library…" value="${S.libSearch || ''}"
        oninput="A.setLibSearch(this.value)"
        autocomplete="off" style="border-radius:50px;padding-left:44px;${q ? 'padding-right:36px' : ''}">
      ${q ? `<button class="search-clear" onclick="A.clearLibFilters()">
        <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" d="M18 6L6 18M6 6l12 12"/></svg>
      </button>` : ''}
    </div>

    <div class="genre-bar" style="margin-bottom:10px">${genrePills}</div>
    <div class="sort-row" style="margin-bottom:14px">${sortPills}</div>

    <div class="grid">${gridHTML}</div>
  </div>`
}
