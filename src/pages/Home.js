// src/pages/Home.js
import { S } from '../store.js'
import { cardHTML } from '../components/Card.js'
import { getRecommendations, getLastWatchedTitle } from '../utils/actions.js'

export function renderHome() {
  const v       = S.content.filter(c => !c.hidden)
  const banner  = v.find(c => c.id === S.bannerContentId) || v[0]
  const cwIds   = Object.keys(S.watchHistory).filter(id => v.find(c => c.id === id))
  const trending = S.trendingIds.map(id => v.find(c => c.id === id)).filter(Boolean)
  const recs     = getRecommendations()
  const lastTitle = getLastWatchedTitle()

  const configs = S.sectionConfigs
  let sections = []
  if (configs && configs.length) {
    sections = configs
  } else {
    const names = (S.sections.length ? S.sections : [...new Set(v.map(c => c.section))]).filter(Boolean)
    sections = [
      { name: 'Top 10 Trending', type: 'trending', pinnedIds: [] },
      { name: 'Continue Watching', type: 'continue', pinnedIds: [] },
      ...names.map(n => ({ name: n, type: 'content', pinnedIds: [] })),
    ]
  }

  function secRow(sec) {
    if (sec.hidden) return ''   // ← admin toggled this section off
    if (sec.type === 'trending') {
      if (!trending.length) return ''
      return `<div class="sec">
        <div class="sec-head">
          <div class="sec-title-txt"> Top 10 <span class="sec-count">Trending</span></div>
        </div>
        <div class="hscroll">${trending.map((c,i) => cardHTML(c,{rank:i+1})).join('')}</div>
      </div>`
    }
    if (sec.type === 'continue') {
      if (!cwIds.length) return ''
      return `<div class="sec">
        <div class="sec-head">
          <div class="sec-title-txt">▶ Continue Watching</div>
        </div>
        <div class="hscroll">${cwIds.map(id => cardHTML(v.find(c=>c.id===id))).join('')}</div>
      </div>`
    }
    const items = (sec.pinnedIds?.length)
      ? sec.pinnedIds.map(id => v.find(c => c.id === id)).filter(Boolean)
      : v.filter(c => c.section === sec.name)
    if (!items.length) return ''
    return `<div class="sec">
      <div class="sec-head">
        <div class="sec-title-txt">${sec.name} <span class="sec-count">${items.length}</span></div>
        <span class="sec-all" onclick="A.nav('library')">See all ›</span>
      </div>
      <div class="hscroll">${items.map(c => cardHTML(c)).join('')}</div>
    </div>`
  }

  // Recommendations row
  const recsRow = (recs.length && lastTitle) ? `
    <div class="sec">
      <div class="sec-head">
        <div class="sec-title-txt">
          Because you watched
          <span class="rec-title-pill">${lastTitle}</span>
        </div>
      </div>
      <div class="hscroll">${recs.map(c => cardHTML(c)).join('')}</div>
    </div>` : ''

  return `<div class="page">
    ${banner ? `<div class="hero">
      <div class="hero-bg" style="background-image:url('${banner.thumbnail}')"></div>
      <div class="hero-vignette"></div>
      <div class="hero-body">
        <div class="hero-genre">${banner.genre}</div>
        <div class="hero-title">${banner.title}</div>
        <div class="hero-meta">
          <span class="hero-meta-pill">${banner.episodes} Episodes</span>
          <span class="hero-meta-pill">${banner.genre}</span>
          ${S.watchHistory[banner.id] != null
            ? `<span class="hero-meta-pill" style="color:var(--red)">▶ EP ${S.watchHistory[banner.id]+1}</span>`
            : ''}
        </div>
        <p class="hero-desc">${banner.description}</p>
        <div class="hero-acts">
          <button class="btn btn-red" onclick="A.play('${banner.id}',${S.watchHistory[banner.id]??0})">Play Now</button>
          <button class="btn btn-outline" onclick="A.openDetail('${banner.id}','home')">More Info</button>
          <button class="btn btn-outline" onclick="A.toggleList('${banner.id}')">${S.myList.includes(banner.id)?'Saved':'+ My List'}</button>
          <button class="btn btn-ghost" onclick="_DF.share('${banner.id}')" style="font-size:1.1rem" title="Share">↗</button>
        </div>
      </div>
    </div>` : ''}
    <div class="secs">
      ${sections.map(secRow).join('')}
      ${recsRow}
    </div>
  </div>`
}
