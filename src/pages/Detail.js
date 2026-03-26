// src/pages/Detail.js — Content detail / info page
import { S } from '../store.js'
import { getAvgRating, getUserRating, getPlanLimits } from '../utils/actions.js'
import { cardHTML } from '../components/Card.js'

// Inline SVGs — no external dep
const IC = {
  play:  `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`,
  back:  `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>`,
  bkm:   `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>`,
  bkmF:  `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>`,
  share: `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8m-4-6l-4-4m0 0L8 6m4-4v13"/></svg>`,
  star:  `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/></svg>`,
  lock:  `<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path stroke-linecap="round" d="M7 11V7a5 5 0 0110 0v4"/></svg>`,
  check: `<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>`,
  ep:    `<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>`,
  eye:   `<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  heart: `<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
}

export function renderDetail() {
  const c = S.content.find(x => x.id === S.detailId)
  if (!c) return '<div class="page p-pad"><p class="empty-txt" style="padding-top:80px;text-align:center">Content not found.</p></div>'

  const saved    = S.myList.includes(c.id)
  const cwEp     = S.watchHistory[c.id]
  const limits   = getPlanLimits(S.sub)
  const avg      = getAvgRating(c)
  const myRating = getUserRating(c.id)

  const isExclusive  = c.exclusive === true
  const excLocked    = isExclusive && !limits.canExclusive
  const freeLocked   = !limits.canWatchAll && !isExclusive

  // Primary CTA
  const cta = !S.user
    ? { label: 'Sign In to Watch', cls: 'btn-outline', fn: "A.openAuth()" }
    : excLocked
    ? { label: 'Upgrade to Premium', cls: 'btn-outline', fn: "A.nav('subscribe')" }
    : cwEp != null
    ? { label: 'Continue — EP ' + (cwEp + 1), cls: 'btn-red', fn: "A.play('" + c.id + "'," + cwEp + ")" }
    : { label: 'Play Now', cls: 'btn-red', fn: "A.play('" + c.id + "',0)" }

  // Episode rows
  const epRows = Array.from({ length: c.episodes || 1 }, (_, i) => {
    const done    = cwEp != null && cwEp >= i
    const isCur   = cwEp === i
    const locked  = (!limits.canWatchAll && i >= 2 && !S.adCreditsUsed?.[c.id]?.includes(i))
                    || (isExclusive && !limits.canExclusive)
    return '<div class="detail-ep' + (isCur ? ' cur' : '') + (done ? ' done' : '') + (locked ? ' locked' : '') + '" onclick="A.play(\'' + c.id + '\',' + i + ')">'
      + '<div class="detail-ep-left">'
      + '<div class="detail-ep-num">Episode ' + (i + 1) + '</div>'
      + '<div class="detail-ep-status">' + (isCur ? 'Continue here' : done ? 'Watched' : locked ? 'Locked' : 'Not started') + '</div>'
      + '</div>'
      + '<div class="detail-ep-right">'
      + (locked ? IC.lock : isCur ? IC.play : done ? IC.check : IC.play)
      + '</div>'
      + '</div>'
  }).join('')

  // Related titles (same genre)
  const related = S.content.filter(x => !x.hidden && x.id !== c.id && x.genre === c.genre).slice(0, 8)

  // Star rating row
  const stars = [1,2,3,4,5].map(n =>
    '<button class="detail-star' + (myRating >= n ? ' lit' : '') + '" onclick="A.rateFromDetail(\'' + c.id + '\',' + n + ')">' + IC.star + '</button>'
  ).join('')

  return `<div class="page detail-page">

    <!-- ── Hero ── -->
    <div class="detail-hero">
      <div class="detail-hero-bg" style="background-image:url('${c.thumbnail}')"></div>
      <div class="detail-hero-scrim"></div>
      <button class="detail-back-btn" onclick="A.navBack()" aria-label="Back">${IC.back}</button>
      ${isExclusive ? '<div class="detail-excl-pill">Premium Exclusive</div>' : ''}
    </div>

    <!-- ── Title + meta ── -->
    <div class="detail-head">
      <div class="detail-genre-pill">${c.genre}</div>
      <h1 class="detail-title">${c.title}</h1>
      <div class="detail-meta">
        <span class="dmeta">${IC.ep} ${c.episodes} Episodes</span>
        ${avg ? `<span class="dmeta">${IC.star} ${avg.toFixed(1)}</span>` : ''}
        <span class="dmeta">${IC.eye} ${(c.views || 0).toLocaleString()}</span>
        <span class="dmeta">${IC.heart} ${(c.likes || 0).toLocaleString()}</span>
      </div>
    </div>

    <!-- ── Action bar ── -->
    <div class="detail-action-bar">
      <button class="btn ${cta.cls} detail-cta-btn" onclick="${cta.fn}">
        ${cta.cls === 'btn-red' ? IC.play : ''} ${cta.label}
      </button>
      <button class="detail-icon-btn${saved ? ' saved' : ''}" onclick="A.toggleList('${c.id}')" title="${saved ? 'Remove from list' : 'Save to My List'}">
        ${saved ? IC.bkmF : IC.bkm}
        <span>${saved ? 'Saved' : 'My List'}</span>
      </button>
      <button class="detail-icon-btn" onclick="_DF.share('${c.id}')" title="Share">
        ${IC.share}
        <span>Share</span>
      </button>
    </div>

    <!-- ── Body ── -->
    <div class="detail-body">

      <!-- Description -->
      <p class="detail-desc">${c.description || 'No description available.'}</p>

      <!-- Plan notice -->
      ${freeLocked ? `<div class="detail-notice">
        ${IC.lock}
        <span>Free preview includes Episodes 1–2.
          <a class="detail-link" onclick="A.nav('credits')">Watch an ad</a> to unlock more or
          <a class="detail-link" onclick="A.nav('subscribe')">upgrade</a> for unlimited access.
        </span>
      </div>` : ''}
      ${excLocked ? `<div class="detail-notice detail-notice--premium">
        ${IC.lock}
        <span>Premium exclusive — <a class="detail-link" onclick="A.nav('subscribe')">upgrade to watch</a></span>
      </div>` : ''}

      <!-- Rating -->
      <div class="detail-rating-row">
        <div class="detail-rating-label">
          ${avg
            ? `<strong style="color:var(--amber)">${avg.toFixed(1)}</strong>
               <span style="color:var(--txt3);font-size:.76rem"> / 5 &nbsp;·&nbsp; ${c.ratingCount || 0} rating${(c.ratingCount||0) !== 1 ? 's' : ''}</span>`
            : '<span style="color:var(--txt3);font-size:.78rem">No ratings yet</span>'}
        </div>
        <div class="detail-stars">${stars}</div>
      </div>

      <!-- Episodes -->
      <div class="detail-section-title">Episodes</div>
      <div class="detail-ep-list">${epRows}</div>

      <!-- Related -->
      ${related.length ? `
        <div class="detail-section-title" style="margin-top:28px">More in ${c.genre}</div>
        <div class="hscroll">${related.map(x => cardHTML(x)).join('')}</div>` : ''}

    </div>
  </div>`
}
