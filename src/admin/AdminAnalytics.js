// src/admin/AdminAnalytics.js
import { S } from '../store.js'
import { getAvgRating } from '../utils/actions.js'

export function renderAAnalyticsTab() {
  if (S.aTab !== 'analytics') return ''
  const v = S.content.filter(c => !c.hidden)
  if (!v.length) return `<div class="apanel vis"><p class="empty-txt" style="padding:40px 0;text-align:center">No content yet.</p></div>`

  // ── Aggregate stats ──────────────────────────────────────
  const totalViews  = v.reduce((s, c) => s + (c.views  || 0), 0)
  const totalLikes  = v.reduce((s, c) => s + (c.likes  || 0), 0)
  const totalRatings= v.reduce((s, c) => s + (c.ratingCount || 0), 0)
  const totalUsers  = S.allUsers.length

  // ── Top 5 lists ──────────────────────────────────────────
  const byViews  = [...v].sort((a,b) => (b.views ||0) - (a.views ||0)).slice(0,5)
  const byLikes  = [...v].sort((a,b) => (b.likes ||0) - (a.likes ||0)).slice(0,5)
  const byRating = [...v].filter(c => c.ratingCount > 0)
                         .sort((a,b) => getAvgRating(b) - getAvgRating(a)).slice(0,5)

  // Max values for bar widths
  const maxViews  = byViews[0]?.views  || 1
  const maxLikes  = byLikes[0]?.likes  || 1
  const maxRating = 5

  function statCard(label, value, color) {
    return `<div class="ana-stat-card">
      <div class="ana-stat-n" style="color:${color}">${_fmt(value)}</div>
      <div class="ana-stat-l">${label}</div>
    </div>`
  }

  function barRow(c, value, max, suffix, color) {
    const pct = max > 0 ? Math.round((value / max) * 100) : 0
    return `<div class="ana-bar-row">
      <div class="ana-bar-thumb" style="background-image:url('${c.thumbnail}')"></div>
      <div class="ana-bar-info">
        <div class="ana-bar-title">${c.title}</div>
        <div class="ana-bar-genre">${c.genre}</div>
        <div class="ana-bar-track">
          <div class="ana-bar-fill" style="width:${pct}%;background:${color}"></div>
        </div>
      </div>
      <div class="ana-bar-val" style="color:${color}">${_fmt(value)}${suffix}</div>
    </div>`
  }

  // Genre breakdown
  const genreMap = {}
  v.forEach(c => { genreMap[c.genre] = (genreMap[c.genre] || 0) + (c.views || 0) })
  const genres = Object.entries(genreMap).sort((a,b) => b[1]-a[1])
  const maxGV  = genres[0]?.[1] || 1

  return `<div class="apanel vis">
    <div style="margin-bottom:20px">
      <div class="p-title" style="font-size:1.2rem">Analytics</div>
      <div class="p-sub">Overview of your content performance</div>
    </div>

    <!-- ── Overview stats ── -->
    <div class="ana-stats-row">
      ${statCard('Total Views',   totalViews,   'var(--red)')}
      ${statCard('Total Likes',   totalLikes,   'var(--jade)')}
      ${statCard('Ratings Given', totalRatings, 'var(--amber)')}
      ${statCard('Content Items', v.length,     'var(--txt2)')}
    </div>

    <!-- ── Top by views ── -->
    <div class="ana-section-title">Top 5 Most Watched</div>
    <div class="ana-bar-list">
      ${byViews.map(c => barRow(c, c.views||0, maxViews, ' views', 'var(--red)')).join('')}
    </div>

    <!-- ── Top by likes ── -->
    <div class="ana-section-title">Top 5 Most Liked</div>
    <div class="ana-bar-list">
      ${byLikes.map(c => barRow(c, c.likes||0, maxLikes, ' likes', 'var(--jade)')).join('')}
    </div>

    <!-- ── Top by rating ── -->
    ${byRating.length ? `<div class="ana-section-title">Top 5 Highest Rated</div>
    <div class="ana-bar-list">
      ${byRating.map(c => barRow(c, getAvgRating(c), maxRating, ' / 5', 'var(--amber)')).join('')}
    </div>` : ''}

    <!-- ── Genre breakdown ── -->
    <div class="ana-section-title">Views by Genre</div>
    <div class="ana-genre-list">
      ${genres.slice(0,8).map(([genre, views]) => `
        <div class="ana-genre-row">
          <div class="ana-genre-name">${genre}</div>
          <div class="ana-genre-track">
            <div class="ana-genre-fill" style="width:${Math.round(views/maxGV*100)}%"></div>
          </div>
          <div class="ana-genre-val">${_fmt(views)}</div>
        </div>`).join('')}
    </div>

  </div>`
}

function _fmt(n) {
  if (n >= 1_000_000) return (n/1_000_000).toFixed(1) + 'M'
  if (n >= 1_000)     return (n/1_000).toFixed(1) + 'K'
  return String(n)
}
