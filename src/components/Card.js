// src/components/Card.js
import { S } from '../store.js'
import { getPlanLimits, getAvgRating } from '../utils/actions.js'

const playIcon   = '<span class="icon icon-play icon-white"></span>'
const plusIcon   = '<span class="icon icon-plus"></span>'
const checkIcon  = '<span class="icon icon-check"></span>'
const lockIcon   = '<span class="icon icon-lock"></span>'
const starIcon   = '<span class="icon icon-star icon-amber" style="width:11px;height:11px"></span>'

export function cardHTML(c, { rank } = {}) {
  if (!c) return ''
  const saved   = S.myList.includes(c.id)
  const cwEp    = S.watchHistory[c.id]
  const limits  = getPlanLimits(S.sub)
  const avg     = getAvgRating(c)

  const isExclusive     = c.exclusive === true
  const exclusiveLocked = isExclusive && !limits.canExclusive
  const freeLocked      = !limits.canWatchAll && !isExclusive

  const exclusiveBadge = exclusiveLocked
    ? '<div class="card-exclusive-badge">Premium</div>'
    : isExclusive
    ? '<div class="card-exclusive-badge card-exclusive-owned">Exclusive</div>'
    : ''
  const freeBadge = freeLocked
    ? '<div class="card-free-badge">Free: EP 1–2</div>'
    : ''

  const fallbackSvg = encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" stroke="%23888" stroke-width="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>')
  const imgStyle = c.thumbnail
    ? `background-image:url('${c.thumbnail}')`
    : `background-color:var(--raised)`

  return '<div class="card' + (rank ? ' card-ranked' : '') + (exclusiveLocked ? ' card-locked' : '')
    + '" onclick="A.openDetail(\'' + c.id + '\')" role="article" aria-label="' + c.title.replace(/"/g,'&quot;') + '">'
    + (rank ? '<div class="rank-n" aria-hidden="true">' + rank + '</div>' : '')
    + '<div class="card-img" style="' + imgStyle + '">'
    + (c.thumbnail ? `<img src="${c.thumbnail}" alt="" loading="lazy" decoding="async" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0" onerror="this.parentElement.style.backgroundImage=\'none\';this.style.display=\'none\'">` : '')
    + '<div class="card-ep" aria-label="' + c.episodes + ' episodes">' + c.episodes + ' EP</div>'
    + exclusiveBadge + freeBadge
    + '<div class="card-over">'
    + (exclusiveLocked
        ? '<div class="card-lock" aria-label="Locked">' + lockIcon + '</div>'
        : '<button class="card-play" aria-label="Play ' + c.title.replace(/"/g,'&quot;') + '" onclick="event.stopPropagation();A.play(\'' + c.id + '\',' + (cwEp ?? 0) + ')">' + playIcon + '</button>')
    + '<button class="card-add' + (saved ? ' saved' : '')
    + '" aria-label="' + (saved ? 'Remove from My List' : 'Add to My List') + '" onclick="event.stopPropagation();A.toggleList(\'' + c.id + '\')">'
    + (saved ? checkIcon : plusIcon) + '</button>'
    + '</div>'
    + (cwEp != null ? '<div class="cw-bar" aria-label="Episode ' + (cwEp+1) + ' of ' + c.episodes + '">EP ' + (cwEp + 1) + ' / ' + c.episodes + '</div>' : '')
    + '</div>'
    + '<div class="card-body">'
    + '<div class="card-name">' + c.title + '</div>'
    + '<div class="card-meta-row">'
    + '<span class="card-sub">' + c.genre + '</span>'
    + (avg ? '<span class="card-rating" aria-label="Rating ' + avg.toFixed(1) + ' out of 5">' + starIcon + ' ' + avg.toFixed(1) + '</span>' : '')
    + '</div>'
    + '</div>'
    + '</div>'
}
