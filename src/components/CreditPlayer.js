// src/components/CreditPlayer.js
// Full-screen credit earner shown when user opts to watch a short video to unlock an episode.

import { S, notify }                                           from '../store.js'
import { AD_DURATION, AD_SKIP_AFTER, actAdCompleted,
         actSkipAd, actAdDismiss, actCancelAd, adTick,
         actStartPageAd, showToast }                            from '../utils/actions.js'

// ── Render ─────────────────────────────────────────────────────────────────
export function renderCreditPlayer() {
  if (!S.adPlaying) return ''
  // Credits page ads are rendered inline in Credits.js
  if (S.adSource === 'credits_page') return ''

  const c       = S.adContext
  const content = S.pc  // the content being unlocked

  if (S.adCompleted) return renderAdReward(content, c)

  const progress  = ((AD_DURATION - S.adTimeLeft) / AD_DURATION) * 100
  const canSkip   = S.adCanSkip
  const skipWait  = AD_SKIP_AFTER - (AD_DURATION - S.adTimeLeft)

  // Pick a random ad from our mock ad pool
  const ad = AD_POOL[Math.abs(Math.floor((Date.now() / 1000) % AD_POOL.length))]

  return `<div class="ad-overlay" id="adOverlay">
    <div class="ad-player-wrap">

      <!-- Ad video / image area -->
      <div class="ad-media-area" style="background:${ad.bg}">
        <div class="ad-brand-logo">${ad.logo}</div>
        <div class="ad-visual">
          <div class="ad-visual-icon">${ad.icon}</div>
          <div class="ad-visual-headline">${ad.headline}</div>
          <div class="ad-visual-sub">${ad.sub}</div>
        </div>
        <div class="ad-label">Advertisement</div>
      </div>

      <!-- Top bar -->
      <div class="ad-top-bar">
        <div class="ad-top-left">
          <div class="ad-earning-badge">🎬 Earning episode credit…</div>
        </div>
        <div class="ad-top-right">
          ${!canSkip
            ? `<div class="ad-skip-soon">Skip in ${skipWait > 0 ? skipWait : 1}s</div>`
            : `<button class="ad-skip-btn" onclick="A.skipAd()">Skip Ad ›</button>`}
        </div>
      </div>

      <!-- Progress bar -->
      <div class="ad-progress-wrap">
        <div class="ad-progress-bar">
          <div class="ad-progress-fill" style="width:${progress}%"></div>
        </div>
        <div class="ad-timer">${S.adTimeLeft}s</div>
      </div>

      <!-- Bottom info -->
      <div class="ad-bottom">
        <div class="ad-unlock-info">
          <div class="ad-unlock-icon"></div>
          <div>
            <div class="ad-unlock-title">
              Unlocking: ${content ? content.title : ''} — EP ${c ? c.epIndex + 1 : ''}
            </div>
            <div class="ad-unlock-sub">Watch the full ad to earn 1 episode credit</div>
          </div>
        </div>
        <button class="ad-cancel-btn" onclick="A.cancelAd()">✕ Cancel</button>
      </div>

    </div>
  </div>`
}

// ── Reward screen (shown after ad completes) ────────────────────────────────
function renderAdReward(content, ctx) {
  return `<div class="ad-overlay" id="adOverlay">
    <div class="ad-reward-box">
      <div class="ad-reward-icon"></div>
      <div class="ad-reward-title">Episode Unlocked!</div>
      <div class="ad-reward-desc">
        You earned <strong>1 episode credit</strong> and unlocked<br>
        <strong>${content ? content.title : ''} — Episode ${ctx ? ctx.epIndex + 1 : ''}</strong>
      </div>

      <!-- Credit balance -->
      <div class="ad-credit-pill">
        🎬 Balance: ${S.adCredits} credit${S.adCredits !== 1 ? 's' : ''}
      </div>

      ${S.adSource === 'credits_page'
        ? `<div style="display:flex;gap:10px;margin-top:6px;flex-wrap:wrap;justify-content:center">
             <button class="btn btn-outline btn-sm" onclick="A.watchAnotherAd()">▶ Watch Another (+1)</button>
             <button class="btn btn-red btn-sm" onclick="A.dismissPageAd()">✓ Done</button>
           </div>`
        : `<button class="btn btn-red fw" style="max-width:280px;margin-top:6px" onclick="A.dismissAd()">
             ▶ Watch Episode ${ctx ? ctx.epIndex + 1 : ''}
           </button>`}

      <div class="ad-reward-hint">
        💡 You can earn more credits by watching more ads
      </div>
    </div>
  </div>`
}

// ── Ad countdown ticker — attach after render ───────────────────────────────
let _adInterval = null

export function startCreditTimer() {
  stopCreditTimer()
  _adInterval = setInterval(() => {
    if (!S.adPlaying || S.adCompleted) { stopCreditTimer(); return }
    adTick()
    // Update timer display without full re-render for smoothness
    const timerEl    = document.getElementById('adOverlay')?.querySelector('.ad-timer')
    const fillEl     = document.getElementById('adOverlay')?.querySelector('.ad-progress-fill')
    const skipEl     = document.getElementById('adOverlay')?.querySelector('.ad-skip-soon')
    const skipBtnEl  = document.getElementById('adOverlay')?.querySelector('.ad-skip-btn')
    const progress   = ((AD_DURATION - S.adTimeLeft) / AD_DURATION) * 100
    const skipWait   = AD_SKIP_AFTER - (AD_DURATION - S.adTimeLeft)

    if (timerEl) timerEl.textContent = S.adTimeLeft + 's'
    if (fillEl)  fillEl.style.width  = progress + '%'

    if (S.adCanSkip && skipEl) {
      // Replace "Skip in Xs" with the skip button
      skipEl.outerHTML = '<button class="ad-skip-btn" onclick="A.skipAd()">Skip Ad ›</button>'
    } else if (!S.adCanSkip && skipEl) {
      skipEl.textContent = 'Skip in ' + (skipWait > 0 ? skipWait : 1) + 's'
    }

    // Full re-render when complete (shows reward)
    if (S.adCompleted) { stopCreditTimer(); notify() }
  }, 1000)
}

export function stopCreditTimer() {
  if (_adInterval) { clearInterval(_adInterval); _adInterval = null }
}

// ── Mock Ad Pool ───────────────────────────────────────────────────────────
// In production, replace with your ad network SDK (Google AdMob, etc.)
const AD_POOL = [
  {
    logo: '🛒 ShopEasy',
    bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    icon: '🛍️',
    headline: 'Shop Smarter, Not Harder',
    sub: 'Get 20% off your first order on ShopEasy',
  },
  {
    logo: '🎵 BeatStream',
    bg: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
    icon: '🎧',
    headline: 'Unlimited Music Streaming',
    sub: 'Try BeatStream free for 3 months',
  },
  {
    logo: '🍕 FoodRush',
    bg: 'linear-gradient(135deg, #200122 0%, #6f0000 100%)',
    icon: '🍔',
    headline: 'Hungry? We Deliver in 20 Min',
    sub: 'Use code DRAMA50 for ₹50 off',
  },
  {
    logo: '📱 TechMart',
    bg: 'linear-gradient(135deg, #005c97 0%, #363795 100%)',
    icon: '💻',
    headline: 'Latest Gadgets, Best Prices',
    sub: 'EMI from ₹999/mo. Free delivery.',
  },
  {
    logo: '💪 FitLife',
    bg: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
    icon: '🏋️',
    headline: 'Transform Your Body in 30 Days',
    sub: 'Join 2 million users on FitLife',
  },
]
