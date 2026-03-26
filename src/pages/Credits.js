// src/pages/Credits.js
import { S } from '../store.js'
import { getTasksConfig, getTaskStatus, AD_DURATION, AD_SKIP_AFTER } from '../utils/actions.js'

export function renderCredits() {
  if (!S.user) {
    return `<div class="page p-pad">
      <div class="p-title">Earn Credits</div>
      <div class="empty" style="min-height:50vh">
        <h3 style="font-family:var(--font-d);font-size:1.6rem;letter-spacing:.04em">Sign in to Earn Credits</h3>
        <p class="empty-txt">Watch videos, complete tasks and keep your streak going to earn free episode credits.</p>
        <div style="display:flex;gap:10px;margin-top:8px;justify-content:center">
          <button class="btn btn-outline" onclick="A.openAuth('login')">Sign In</button>
          <button class="btn btn-red"    onclick="A.openAuth('signup')">Create Account</button>
        </div>
      </div>
    </div>`
  }

  // ── Config ──────────────────────────────────────────────
  const tasks      = getTasksConfig()
  const streakTask = tasks.find(t => t.id === 'daily_login') || {}
  const perDay     = streakTask.creditsPerDay      != null ? streakTask.creditsPerDay      : 1
  const maxStreak  = streakTask.maxStreak          != null ? streakTask.maxStreak          : 7
  const bonusDay   = streakTask.streakBonusDay     != null ? streakTask.streakBonusDay     : 7
  const bonusAmt   = streakTask.streakBonusCredits != null ? streakTask.streakBonusCredits : 2

  const credits      = S.adCredits || 0
  const streak       = S.loginStreak || 0
  const total        = S.totalCreditsEarned || 0
  const todayStr     = new Date().toISOString().slice(0, 10)
  const claimedToday = S.lastLoginDate === todayStr
  const cycleComplete = streak === 0 && claimedToday

  // ── Streak circles ──────────────────────────────────────
  const streakDays = Array.from({ length: maxStreak }, (_, i) => {
    const day     = i + 1
    const isBonus = day === bonusDay
    const active  = streak >= day
    const isToday = claimedToday && streak === day
    const reward  = isBonus
      ? '+' + perDay + '+' + bonusAmt + ' ★'
      : '+' + perDay
    return '<div class="streak-day'
      + (active  ? ' active'    : '')
      + (isToday ? ' today'     : '')
      + (isBonus ? ' bonus-day' : '') + '">'
      + '<div class="streak-day-circle">' + (active ? '&#10003;' : day) + '</div>'
      + '<div class="streak-day-label">Day ' + day + '</div>'
      + '<div class="streak-day-credit">' + reward + '</div>'
      + '</div>'
  }).join('')

  // Footer status line (plain strings — no template literals here to avoid quote issues)
  let statusLine
  if (cycleComplete) {
    statusLine = '<span class="streak-claimed">Cycle complete! Resets to Day 1 tomorrow</span>'
  } else if (claimedToday) {
    statusLine = '<span class="streak-claimed">&#10003; Today\'s credit claimed</span>'
  } else {
    statusLine = '<span class="streak-pending">Log in tomorrow to continue your streak</span>'
  }

  const streakHeading = cycleComplete
    ? '<span style="color:var(--jade)">Cycle Complete!</span>'
    : 'Day <span style="color:var(--amber)">' + streak + '</span>'

  // ── Task cards ──────────────────────────────────────────
  const taskCards = tasks
    .filter(t => t.enabled && t.id !== 'daily_login')
    .map(t => {
      const status      = getTaskStatus(t.id)
      const isDone      = status === 'done'
      const isCooldown  = status.startsWith('cooldown:')
      const cooldownStr = isCooldown ? _fmtCooldown(parseInt(status.split(':')[1])) : ''
      const isWatchAd   = t.type === 'watch_ad'
      const reward      = t.creditsEarned || 1

      let btnHTML
      if (isDone) {
        btnHTML = '<div class="task-done-badge">&#10003; Completed</div>'
      } else if (isCooldown) {
        btnHTML = '<div class="task-cooldown-badge">&#8987; ' + cooldownStr + '</div>'
      } else if (isWatchAd) {
        btnHTML = '<button class="task-btn task-btn-ad" onclick="A.startPageAd()">'
          + '<span>Watch Video</span>'
          + '<span class="task-btn-reward">+' + reward + ' credit</span>'
          + '</button>'
      } else if (t.type === 'social') {
        btnHTML = '<button class="task-btn task-btn-social" onclick="A.completeTask(\'' + t.id + '\',\'' + (t.url || '') + '\')">'
          + '<span>Open &amp; Verify</span>'
          + '<span class="task-btn-reward">+' + reward + ' credit' + (reward !== 1 ? 's' : '') + '</span>'
          + '</button>'
      } else {
        btnHTML = '<button class="task-btn" onclick="A.completeTask(\'' + t.id + '\')">'
          + '<span>Complete</span>'
          + '<span class="task-btn-reward">+' + reward + ' credit' + (reward !== 1 ? 's' : '') + '</span>'
          + '</button>'
      }

      return '<div class="task-card' + (isDone ? ' task-done' : '') + (isCooldown ? ' task-cooldown' : '') + '">'
        + '<div class="task-icon">' + t.icon + '</div>'
        + '<div class="task-info">'
        + '<div class="task-title">' + t.title + '</div>'
        + '<div class="task-desc">' + t.desc + '</div>'
        + (t.oneTime ? '<div class="task-one-time">One-time only</div>' : '')
        + '</div>'
        + '<div class="task-action">' + btnHTML + '</div>'
        + '</div>'
    }).join('')

  // ── Inline ad player ────────────────────────────────────
  const inlineAd = (S.adPlaying && S.adSource === 'credits_page')
    ? renderInlineAd()
    : ''

  // ── Render ──────────────────────────────────────────────
  return `<div class="page p-pad">

    <div class="credits-header">
      <div>
        <div class="p-title">Earn Credits</div>
        <div class="p-sub">Complete tasks to unlock more episodes for free</div>
      </div>
      <div class="credits-balance-big">
        <div class="credits-balance-num">${credits}</div>
        <div class="credits-balance-lbl">credits</div>
      </div>
    </div>

    <div class="credits-stats">
      <div class="cstat"><div class="cstat-n" style="color:var(--jade)">${credits}</div><div class="cstat-l">Available</div></div>
      <div class="cstat"><div class="cstat-n" style="color:var(--amber)">${streak}</div><div class="cstat-l">Streak</div></div>
      <div class="cstat"><div class="cstat-n" style="color:var(--red)">${total}</div><div class="cstat-l">Total Earned</div></div>
    </div>

    <div class="credits-section-title">Daily Login Streak</div>
    <div class="streak-card">
      <div class="streak-info">
        <div class="streak-current">${streakHeading}</div>
        <div class="streak-sub">Log in every day. Day ${bonusDay} earns a bonus reward — then resets to Day 1.</div>
      </div>
      <div class="streak-row">${streakDays}</div>
      <div class="streak-footer">
        ${statusLine}
        <span class="streak-bonus-note">Day ${bonusDay} = +${perDay} daily + ${bonusAmt} bonus = ${perDay + bonusAmt} total credits</span>
      </div>
    </div>

    <div class="credits-section-title">Watch Videos</div>
    ${inlineAd || `<div class="watch-ad-card" onclick="A.startPageAd()">
      <div class="watch-ad-left">
        <div class="watch-ad-icon">&#9654;</div>
        <div>
          <div class="watch-ad-title">Watch a 30-second video</div>
          <div class="watch-ad-sub">Earn 1 credit &middot; Skip after ${AD_SKIP_AFTER}s &middot; Watch unlimited times</div>
        </div>
      </div>
      <div class="watch-ad-earn">
        <div class="watch-ad-earn-n">+1</div>
        <div class="watch-ad-earn-l">credit</div>
      </div>
    </div>`}

    <div class="credits-section-title" style="margin-top:24px">Tasks</div>
    <div class="tasks-list">${taskCards}</div>

    <div class="credits-how">
      <div class="credits-how-title">How it works</div>
      <div class="credits-how-row"><span class="icon icon-check icon-jade icon-sm"></span><span>1 credit unlocks 1 locked episode</span></div>
      <div class="credits-how-row"><span class="icon icon-check icon-jade icon-sm"></span><span>Credits never expire — use them anytime</span></div>
      <div class="credits-how-row"><span class="icon icon-check icon-jade icon-sm"></span><span>Exclusive content requires a Premium plan</span></div>
      <div class="credits-how-row"><span class="icon icon-check icon-jade icon-sm"></span><span>Complete Day ${bonusDay} streak for a +${bonusAmt} credit bonus</span></div>
    </div>

  </div>`
}

// ── Inline Ad Player ────────────────────────────────────────────────────────
function renderInlineAd() {
  if (S.adCompleted) return renderInlineReward()

  const progress = ((AD_DURATION - S.adTimeLeft) / AD_DURATION) * 100
  const skipWait = AD_SKIP_AFTER - (AD_DURATION - S.adTimeLeft)
  const pool     = _getAdPool()
  const ad       = pool[Math.abs(Math.floor((Date.now() / 1000) % pool.length))]

  return `<div class="inline-ad-wrap" id="inlineAdWrap">
    <div class="inline-ad-visual" style="background:${ad.bg}">
      <div class="ad-brand-logo" style="position:relative;top:auto;left:auto;margin-bottom:12px">${ad.logo}</div>
      <div style="font-size:3rem;margin-bottom:8px">${ad.icon}</div>
      <div class="ad-visual-headline" style="font-size:1.1rem">${ad.headline}</div>
      <div class="ad-visual-sub">${ad.sub}</div>
      <div class="ad-label">Advertisement</div>
    </div>
    <div class="inline-ad-controls">
      <div class="inline-ad-progress">
        <div class="ad-progress-bar" style="flex:1">
          <div class="ad-progress-fill" id="inlineFill" style="width:${progress}%"></div>
        </div>
        <div class="ad-timer" id="inlineTimer">${S.adTimeLeft}s</div>
        ${S.adCanSkip
          ? '<button class="ad-skip-btn" onclick="A.skipAd()">Skip &rsaquo;</button>'
          : '<div class="ad-skip-soon">Skip in ' + (skipWait > 0 ? skipWait : 1) + 's</div>'}
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-top:8px">
        <div class="ad-earning-badge">Earning 1 episode credit&hellip;</div>
        <button class="ad-cancel-btn" onclick="A.cancelPageAd()">Cancel</button>
      </div>
    </div>
  </div>`
}

function renderInlineReward() {
  return `<div class="inline-ad-reward" id="inlineAdWrap">
    <span class="icon icon-check icon-jade" style="width:48px;height:48px"></span>
    <div class="inline-reward-title">+1 Credit Earned!</div>
    <div class="inline-reward-desc">Balance: <strong style="color:var(--jade)">${S.adCredits}</strong> credits</div>
    <div style="display:flex;gap:10px;margin-top:14px;flex-wrap:wrap;justify-content:center">
      <button class="btn btn-outline btn-sm" onclick="A.watchAnotherAd()">Watch Another (+1)</button>
      <button class="btn btn-red btn-sm"     onclick="A.dismissPageAd()">Done</button>
    </div>
  </div>`
}

function _fmtCooldown(mins) {
  if (mins >= 1440) return Math.ceil(mins / 1440) + 'd'
  if (mins >= 60)   return Math.ceil(mins / 60) + 'h'
  return mins + 'm'
}

function _getAdPool() {
  return [
    { logo: '&#128722; ShopEasy',  bg: 'linear-gradient(135deg,#1a1a2e,#16213e)', icon: '&#128717;', headline: 'Shop Smarter',        sub: '20% off your first order'  },
    { logo: '&#127925; BeatStream',bg: 'linear-gradient(135deg,#0f0c29,#302b63)', icon: '&#127911;', headline: 'Unlimited Music',       sub: 'Free for 3 months'        },
    { logo: '&#127829; FoodRush',  bg: 'linear-gradient(135deg,#200122,#6f0000)', icon: '&#127828;', headline: 'Deliver in 20 Min',     sub: 'Code DRAMA50 = &#8377;50 off' },
    { logo: '&#128241; TechMart',  bg: 'linear-gradient(135deg,#005c97,#363795)', icon: '&#128187;', headline: 'Best Gadget Prices',    sub: 'EMI from &#8377;999/mo'    },
    { logo: '&#128170; FitLife',   bg: 'linear-gradient(135deg,#134e5e,#71b280)', icon: '&#127947;', headline: '30-Day Transform',      sub: '2M+ users on FitLife'      },
  ]
}
