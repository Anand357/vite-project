// src/admin/Analytics.js  — Admin analytics dashboard
import { S } from '../store.js'
import { getAvgRating } from '../utils/actions.js'

export function renderAnalytics() {
  const v = S.content.filter(c => !c.hidden)
  if (!v.length) return `<div class="page p-pad"><p class="empty-txt" style="text-align:center;padding:48px 0">No content yet. Add dramas in the Content tab.</p></div>`

  // Compute stats
  const totalViews  = v.reduce((s, c) => s + (c.views  || 0), 0)
  const totalLikes  = v.reduce((s, c) => s + (c.likes  || 0), 0)
  const totalRatings= v.reduce((s, c) => s + (c.ratingCount || 0), 0)
  const totalUsers  = S.allUsers.length

  // Sorted lists
  const byViews  = [...v].sort((a, b) => (b.views  || 0) - (a.views  || 0))
  const byLikes  = [...v].sort((a, b) => (b.likes  || 0) - (a.likes  || 0))
  const byRating = [...v].filter(c => c.ratingCount > 0).sort((a, b) => getAvgRating(b) - getAvgRating(a))

  const maxViews = byViews[0]?.views || 1

  function barRow(c, value, max, color) {
    const pct  = Math.round((value / max) * 100)
    const avg  = getAvgRating(c)
    return `<div class="an-row" onclick="A.openDetail('${c.id}')">
      <img src="${c.thumbnail}" class="an-thumb" alt="${c.title}" loading="lazy">
      <div class="an-info">
        <div class="an-title">${c.title}</div>
        <div class="an-sub">${c.genre}${avg ? ' · ' + avg.toFixed(1) + ' ★' : ''}</div>
        <div class="an-bar-wrap">
          <div class="an-bar-fill" style="width:${pct}%;background:${color}"></div>
        </div>
      </div>
      <div class="an-val">${value.toLocaleString()}</div>
    </div>`
  }

  // Genre breakdown
  const genreMap = {}
  v.forEach(c => {
    genreMap[c.genre] = (genreMap[c.genre] || 0) + (c.views || 0)
  })
  const genres = Object.entries(genreMap).sort((a,b) => b[1] - a[1])
  const maxGenreViews = genres[0]?.[1] || 1

  // Plan breakdown from users
  const planCounts = { free: 0, standard: 0, premium: 0 }
  S.allUsers.forEach(u => { planCounts[u.subscription || 'free']++ })

  return `<div class="apanel analytics-page${S.aTab === 'analytics' ? ' vis' : ''}">

    <div class="p-title">Analytics</div>
    <div class="p-sub">Overview of content performance and user metrics</div>

    <!-- ── Overview stats ── -->
    <div class="an-stats-grid">
      <div class="an-stat">
        <div class="an-stat-n">${totalViews.toLocaleString()}</div>
        <div class="an-stat-l">Total Views</div>
      </div>
      <div class="an-stat">
        <div class="an-stat-n">${totalLikes.toLocaleString()}</div>
        <div class="an-stat-l">Total Likes</div>
      </div>
      <div class="an-stat">
        <div class="an-stat-n">${totalRatings.toLocaleString()}</div>
        <div class="an-stat-l">Ratings Given</div>
      </div>
      <div class="an-stat">
        <div class="an-stat-n">${v.length}</div>
        <div class="an-stat-l">Total Dramas</div>
      </div>
    </div>

    <!-- ── Two column layout ── -->
    <div class="an-cols">

      <!-- Most Watched -->
      <div class="an-card">
        <div class="an-card-title">Most Watched</div>
        ${byViews.slice(0, 5).map(c => barRow(c, c.views || 0, maxViews, 'var(--red)')).join('')}
      </div>

      <!-- Most Liked -->
      <div class="an-card">
        <div class="an-card-title">Most Liked</div>
        ${byLikes.slice(0, 5).map(c => barRow(c, c.likes || 0, byLikes[0]?.likes || 1, 'var(--jade)')).join('')}
      </div>

      <!-- Top Rated -->
      <div class="an-card">
        <div class="an-card-title">Top Rated</div>
        ${byRating.length
          ? byRating.slice(0, 5).map(c => {
              const avg = getAvgRating(c)
              return barRow(c, avg, 5, 'var(--amber)')
            }).join('')
          : '<p class="empty-txt" style="padding:20px 0 8px;text-align:center;font-size:.82rem">No ratings yet</p>'}
      </div>

      <!-- Genre views breakdown -->
      <div class="an-card">
        <div class="an-card-title">Views by Genre</div>
        ${genres.slice(0, 6).map(([genre, views]) => `
        <div class="an-genre-row">
          <div class="an-genre-label">${genre}</div>
          <div class="an-genre-bar-wrap">
            <div class="an-bar-fill" style="width:${Math.round(views/maxGenreViews*100)}%;background:var(--blue)"></div>
          </div>
          <div class="an-val">${views.toLocaleString()}</div>
        </div>`).join('')}
      </div>

    </div>

    <!-- ── User plan breakdown ── -->
    ${totalUsers > 0 ? `
    <div class="an-card" style="margin-top:0">
      <div class="an-card-title">User Plans</div>
      <div class="an-plan-grid">
        ${[
          { key: 'free',     label: 'Free',     color: 'var(--txt3)' },
          { key: 'standard', label: 'Standard', color: 'var(--red)'  },
          { key: 'premium',  label: 'Premium',  color: 'var(--amber)'},
        ].map(({ key, label, color }) => {
          const n   = planCounts[key] || 0
          const pct = totalUsers ? Math.round(n / totalUsers * 100) : 0
          return `<div class="an-plan-item">
            <div class="an-plan-n" style="color:${color}">${n}</div>
            <div class="an-plan-label">${label}</div>
            <div class="an-plan-pct">${pct}%</div>
          </div>`
        }).join('')}
        <div class="an-plan-item">
          <div class="an-plan-n">${totalUsers}</div>
          <div class="an-plan-label">Total</div>
          <div class="an-plan-pct">100%</div>
        </div>
      </div>
    </div>` : `<div class="an-card" style="margin-top:0">
      <div class="an-card-title">User Plans</div>
      <p class="empty-txt" style="padding:16px 0 8px;text-align:center;font-size:.82rem">
        Load users in the Users tab first to see plan breakdown.
      </p>
      <button class="btn btn-outline btn-sm" onclick="A.adminTab('users')">Load Users</button>
    </div>`}

    <div class="an-refresh-row">
      <button class="btn btn-outline btn-sm" onclick="A.nav('admin');A.adminTab('analytics')">Refresh</button>
      <span class="an-refresh-note">Data reflects current Firestore state</span>
    </div>

  </div>` // end apanel
}
