// src/pages/Subscribe.js
import { S } from '../store.js'
import { FREE_EP_LIMIT } from '../utils/actions.js'

export function renderSubscribe() {
  const currentPlan = S.sub || 'free'

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '₹0',
      period: 'forever',
      badge: null,
      featured: false,
      feats: [
        { y: 1, t: 'Browse all content' },
        { y: 1, t: `Watch first ${FREE_EP_LIMIT} episodes free` },
        { y: 0, t: 'Full episode access' },
        { y: 0, t: 'Exclusive content' },
        { y: 0, t: 'Ad-free' },
        { y: 0, t: 'HD quality' },
      ],
    },
    {
      id: 'standard',
      name: 'Standard',
      price: '₹99',
      period: '/month',
      badge: 'Most Popular',
      featured: true,
      feats: [
        { y: 1, t: 'Browse all content' },
        { y: 1, t: 'All episodes, all titles' },
        { y: 0, t: 'Exclusive content' },
        { y: 1, t: 'Ad-free watching' },
        { y: 1, t: 'HD quality' },
        { y: 0, t: '4K + Early access' },
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '₹199',
      period: '/month',
      badge: null,
      featured: false,
      feats: [
        { y: 1, t: 'Everything in Standard' },
        { y: 1, t: 'Exclusive content' },
        { y: 1, t: '4K Ultra HD' },
        { y: 1, t: 'Early access to new dramas' },
        { y: 1, t: 'Ad-free watching' },
        { y: 1, t: 'Priority support' },
      ],
    },
  ]

  const planCards = plans.map(p => {
    const isCurrent = p.id === currentPlan
    const feats = p.feats.map(f =>
      '<li class="plan-feat"><span class="' + (f.y ? 'pfc' : 'pfx') + '">' + (f.y ? 'Done' : '—') + '</span>' + f.t + '</li>'
    ).join('')

    let btnLabel, btnClass, btnOnclick
    if (isCurrent) {
      btnLabel   = 'Current Plan'
      btnClass   = 'btn-current-plan'
      btnOnclick = ''
    } else if (p.id === 'free') {
      btnLabel   = 'Downgrade to Free'
      btnClass   = 'btn-ghost'
      btnOnclick = 'onclick="A.showPlanContact(\'free\')"'
    } else {
      btnLabel   = 'Get ' + p.name
      btnClass   = p.featured ? 'btn-red' : 'btn-outline'
      btnOnclick = 'onclick="A.showPlanContact(\'' + p.id + '\')"'
    }

    return '<div class="plan' + (p.featured ? ' featured' : '') + (isCurrent ? ' plan-current' : '') + '">'
      + (isCurrent ? '<div class="plan-current-badge">Your Plan</div>' : '')
      + (p.badge && !isCurrent ? '<div class="plan-badge">' + p.badge + '</div>' : '')
      + '<div class="plan-name">' + p.name + '</div>'
      + '<div class="plan-price"><span class="plan-price-n">' + p.price + '</span><span class="plan-price-p">' + p.period + '</span></div>'
      + '<ul class="plan-feats">' + feats + '</ul>'
      + '<button class="btn ' + btnClass + ' fw" ' + btnOnclick + '>' + btnLabel + '</button>'
      + '</div>'
  }).join('')

  // Comparison table note
  const compTable = `
  <div class="sub-compare">
    <div class="sub-compare-title">What can I watch?</div>
    <table class="sub-table">
      <thead>
        <tr>
          <th>Content Type</th>
          <th class="${currentPlan === 'free' ? 'sub-col-current' : ''}">Free</th>
          <th class="${currentPlan === 'standard' ? 'sub-col-current' : ''}">Standard</th>
          <th class="${currentPlan === 'premium' ? 'sub-col-current' : ''}">Premium</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Regular dramas</td>
          <td>EP 1–${FREE_EP_LIMIT} only</td>
          <td class="sub-check">All EPs ✓</td>
          <td class="sub-check">All EPs ✓</td>
        </tr>
        <tr>
          <td>Exclusive dramas</td>
          <td class="sub-cross">Locked</td>
          <td class="sub-cross">Locked</td>
          <td class="sub-check">Full access ✓</td>
        </tr>
        <tr>
          <td>Ad-free</td>
          <td class="sub-cross">✕</td>
          <td class="sub-check">✓</td>
          <td class="sub-check">✓</td>
        </tr>
        <tr>
          <td>Video quality</td>
          <td>SD</td>
          <td class="sub-check">HD ✓</td>
          <td class="sub-check">4K ✓</td>
        </tr>
      </tbody>
    </table>
  </div>`

  return `<div class="page p-pad">
    <div style="text-align:center;margin-bottom:8px">
      <div class="p-title">Choose Your Plan</div>
      <div class="p-sub">
        ${currentPlan === 'free'
          ? 'You\'re on the Free plan. Upgrade to watch everything.'
          : 'You\'re on the <strong style="color:var(--amber)">' + currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1) + '</strong> plan.'
        }
      </div>
    </div>
    <div class="sub-admin-note">
      <strong>How to upgrade:</strong> Ask an admin to change your plan — it's free during our beta!
      <br>Contact us at <span style="color:var(--jade)">admin@dramaflow.com</span>
    </div>
    <div class="plans">${planCards}</div>
    ${compTable}
    ${S.showPlanModal ? renderPlanModal(S.showPlanModal) : ''}
  </div>`
}

function renderPlanModal(planId) {
  const names = { free: 'Free', standard: 'Standard', premium: 'Premium' }
  const name  = names[planId] || planId
  const isDowngrade = planId === 'free'
  return `<div class="award-modal-overlay" onclick="event.target.classList.contains('award-modal-overlay')&&A.closePlanModal()">
    <div class="award-modal">
      <div class="award-modal-header">
        <div class="award-modal-title">${isDowngrade ? 'Downgrade to Free' : 'Upgrade to ' + name}</div>
        <button class="icon-btn" onclick="A.closePlanModal()"><span class="icon icon-close icon-txt2"></span></button>
      </div>
      <div class="award-modal-body" style="text-align:center;padding:8px 0 4px">
        <div style="font-size:2.2rem;margin-bottom:12px">${isDowngrade ? '⬇' : '⭐'}</div>
        <div style="font-size:.95rem;color:var(--txt);margin-bottom:8px;font-weight:500">
          ${isDowngrade ? 'Want to switch back to Free?' : 'Ready to go ' + name + '?'}
        </div>
        <p style="font-size:.83rem;color:var(--txt3);line-height:1.6;margin-bottom:16px">
          Plan changes are handled by our admins — it's completely <strong style="color:var(--jade)">free</strong> during our beta.<br><br>
          Send a message or email us and we'll update your plan within 24 hours.
        </p>
        <div style="background:var(--raised);border-radius:var(--r-md);padding:12px;margin-bottom:4px">
          <div style="font-size:.75rem;color:var(--txt3);margin-bottom:4px">Contact admin</div>
          <div style="font-size:.9rem;color:var(--jade);font-weight:500">admin@dramaflow.com</div>
          <div style="font-size:.75rem;color:var(--txt4);margin-top:4px">Quote: "${name} plan request — ${S.user?.email || ''}"</div>
        </div>
      </div>
      <div class="award-modal-footer">
        <button class="btn btn-outline" onclick="A.closePlanModal()">Close</button>
        <button class="btn btn-red" onclick="A.copyPlanEmail('${planId}')">Copy Email Request</button>
      </div>
    </div>
  </div>`
}
