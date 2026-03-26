// src/components/Paywall.js
// Shown inside the player when a user tries to watch a gated episode.

import { S } from '../store.js'
import { FREE_EP_LIMIT } from '../utils/actions.js'

export function renderPaywall(reason) {
  const c = S.pc
  if (!c) return ''

  const isExclusive    = reason === 'exclusive'
  const isEpisodeLimit = reason === 'episode_limit'
  const epIndex        = S.pEp
  const credits        = S.adCredits || 0

  const heading = isExclusive ? 'Premium Exclusive' : 'Free Preview Ended'
  const body    = isExclusive
    ? `<em>${c.title}</em> is exclusive to Premium members.`
    : `You've watched the first ${FREE_EP_LIMIT} free episodes of <em>${c.title}</em>.`

  const planCards = `
    <div class="paywall-plans">
      <div class="paywall-plan">
        <div class="paywall-plan-name">Standard</div>
        <div class="paywall-plan-price">₹99/mo</div>
        <div class="paywall-plan-perks">
          <span class="paywall-perk">All episodes</span>
          <span class="paywall-perk">Ad-free</span>
          <span class="paywall-perk">HD quality</span>
        </div>
        <button class="btn btn-outline-amber fw" onclick="A.nav('subscribe');A.closePlayer()">Get Standard</button>
      </div>
      <div class="paywall-plan">
        <div class="paywall-plan-name">Premium</div>
        <div class="paywall-plan-price">₹199/mo</div>
        <div class="paywall-plan-perks">
          <span class="paywall-perk">All episodes</span>
          <span class="paywall-perk">Exclusive content 👑</span>
          <span class="paywall-perk">4K Ultra HD</span>
        </div>
        <button class="btn btn-red fw" onclick="A.nav('subscribe');A.closePlayer()">Get Premium</button>
      </div>
    </div>`

  // ── Watch Ad option (only for episode_limit, not exclusive) ──
  const adSection = isEpisodeLimit ? `
    <div class="paywall-ad-divider">
      <span>or</span>
    </div>
    <div class="paywall-ad-box">
      <div class="paywall-ad-top">
        <div class="paywall-ad-icon">📺</div>
        <div class="paywall-ad-info">
          <div class="paywall-ad-title">Watch a short ad instead</div>
          <div class="paywall-ad-desc">
            Watch a 30-second ad and earn <strong>1 episode credit</strong>
            to unlock EP ${epIndex + 1} right now — completely free.
          </div>
        </div>
      </div>

      ${credits > 0 ? `
      <div class="paywall-credits-banner">
        🎬 You have <strong>${credits} credit${credits !== 1 ? 's' : ''}</strong> — use one to watch instantly!
        <button class="btn btn-jade btn-sm" style="margin-top:8px;width:100%" onclick="A.useCredit('${c.id}',${epIndex})">
          Use Credit — Watch EP ${epIndex + 1} Now
        </button>
      </div>` : ''}

      <button class="btn-watch-ad" onclick="A.watchAd('${c.id}',${epIndex})">
        <span class="btn-watch-ad-icon">▶</span>
        <span>Watch 30s Ad → Unlock EP ${epIndex + 1}</span>
        <span class="btn-watch-ad-badge">FREE</span>
      </button>

      <div class="paywall-ad-fine">
        No account needed · Skip after 5 seconds · 1 credit = 1 episode
      </div>
    </div>` : ''

  return `<div class="paywall-overlay" id="paywallOverlay">
    <div class="paywall-box">
      <div class="paywall-bg" style="background-image:url('${c.thumbnail}')"></div>
      <div class="paywall-bg-grad"></div>
      <div class="paywall-body">
        <div class="paywall-icon">
        ${isExclusive
          ? '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.662 1.736a.75.75 0 011.336.365l1.388 5.537 3.26-2.905a.75.75 0 011.11.98l-3.36 5.594 4.284.857a.75.75 0 01.18 1.407L12 16.403l-7.86-2.832a.75.75 0 01.18-1.407l4.284-.857-3.36-5.594a.75.75 0 011.11-.98l3.26 2.905 1.048-5.537a.75.75 0 01.3-.365z"/></svg>'
          : '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path stroke-linecap="round" d="M7 11V7a5 5 0 0110 0v4"/></svg>'}
      </div>
        <div class="paywall-heading">${heading}</div>
        <p class="paywall-text">${body}</p>

        ${planCards}
        ${adSection}

        <button class="paywall-back" onclick="A.closePlayer()">← Go Back</button>

        ${isEpisodeLimit ? `<p class="paywall-hint">
          You can still rewatch the first ${FREE_EP_LIMIT} episodes anytime for free.
        </p>` : ''}
      </div>
    </div>
  </div>`
}
