// src/admin/AdminPromo.js
// Admin panel tab for configuring the promo popup — Level 2+
import { S } from '../store.js'
import { DEFAULT_PROMO } from '../utils/actions.js'

export function renderAPromoTab() {
  if (S.aTab !== 'promo') return ''

  const cfg = S.promoConfig || DEFAULT_PROMO
  const {
    enabled      = true,
    title        = DEFAULT_PROMO.title,
    subtitle     = DEFAULT_PROMO.subtitle,
    body         = DEFAULT_PROMO.body,
    badge        = DEFAULT_PROMO.badge,
    ctaLabel     = DEFAULT_PROMO.ctaLabel,
    ctaAction    = DEFAULT_PROMO.ctaAction,
    ctaUrl       = DEFAULT_PROMO.ctaUrl,
    secondaryLabel = DEFAULT_PROMO.secondaryLabel,
    showTo       = DEFAULT_PROMO.showTo,
    delaySeconds = DEFAULT_PROMO.delaySeconds,
    frequencyHours = DEFAULT_PROMO.frequencyHours,
    style        = DEFAULT_PROMO.style,
    accentColor  = DEFAULT_PROMO.accentColor,
    imageUrl     = DEFAULT_PROMO.imageUrl,
  } = cfg

  const showToOpts = [
    { value: 'free',      label: 'Free users only' },
    { value: 'loggedout', label: 'Logged-out visitors only' },
    { value: 'all',       label: 'All logged-in users' },
    { value: 'always',    label: 'Everyone (always)' },
  ]
  const styleOpts = [
    { value: 'gradient', label: 'Gradient (default)' },
    { value: 'minimal',  label: 'Minimal / clean' },
    { value: 'banner',   label: 'Bottom banner' },
  ]
  const actionOpts = [
    { value: 'subscribe', label: 'Open Subscribe page' },
    { value: 'credits',   label: 'Open Earn Credits page' },
    { value: 'url',       label: 'Open external URL' },
  ]

  function selHTML(id, opts, current) {
    return '<select class="inp" id="' + id + '">'
      + opts.map(o => '<option value="' + o.value + '"' + (current === o.value ? ' selected' : '') + '>' + o.label + '</option>').join('')
      + '</select>'
  }

  return `<div class="apanel vis" id="promoPanel">
    <div class="promo-admin-header">
      <div>
        <div class="p-title" style="font-size:1.2rem">Promo Popup</div>
        <div class="p-sub">Configure the offer popup shown to users when they open the app</div>
      </div>
      <div style="display:flex;gap:8px;align-items:center">
        <button class="btn btn-outline btn-sm" onclick="A.previewPromo()">Preview</button>
        <button class="btn btn-outline btn-sm" onclick="A.resetPromoConfig()">Reset</button>
        <button class="btn btn-red btn-sm" id="savePromoBtnTop" onclick="A.savePromoConfig()">Save Changes</button>
      </div>
    </div>

    <!-- ── Enable toggle ── -->
    <div class="form-box" style="margin-bottom:14px">
      <label class="excl-toggle" onclick="A.togglePromoEnabled()" style="cursor:pointer">
        <div class="excl-toggle-label">
          <div class="excl-toggle-title">Popup ${enabled ? 'Enabled' : 'Disabled'}</div>
          <div class="excl-toggle-sub">${enabled ? 'Popup will show to users matching the target audience' : 'Popup is off — no users will see it'}</div>
        </div>
        <div class="excl-toggle-track${enabled ? ' excl-on' : ''}" id="promoEnabledTrack">
          <div class="excl-toggle-thumb"></div>
        </div>
      </label>
    </div>

    <!-- ── Content ── -->
    <div class="form-box">
      <div class="form-title">Content</div>
      <div class="inp-group">
        <label class="inp-label">Badge text (leave blank to hide)</label>
        <input class="inp" id="promoBadge" value="${badge}" placeholder="e.g. Limited Offer, 50% Off">
      </div>
      <div class="inp-group">
        <label class="inp-label">Title</label>
        <input class="inp" id="promoTitle" value="${title}">
      </div>
      <div class="inp-group">
        <label class="inp-label">Subtitle</label>
        <input class="inp" id="promoSubtitle" value="${subtitle}">
      </div>
      <div class="inp-group">
        <label class="inp-label">Body text</label>
        <textarea class="inp" id="promoBody" rows="3">${body}</textarea>
      </div>
    </div>

    <!-- ── Call to action ── -->
    <div class="form-box">
      <div class="form-title">Call to Action</div>
      <div class="inp-group">
        <label class="inp-label">Button label</label>
        <input class="inp" id="promoCtaLabel" value="${ctaLabel}" placeholder="e.g. Get Premium — ₹199/mo">
      </div>
      <div class="fg2">
        <div class="inp-group">
          <label class="inp-label">Button action</label>
          ${selHTML('promoCtaAction', actionOpts, ctaAction)}
        </div>
        <div class="inp-group">
          <label class="inp-label">External URL (if action = URL)</label>
          <input class="inp" id="promoCtaUrl" value="${ctaUrl}" placeholder="https://…">
        </div>
      </div>
      <div class="inp-group">
        <label class="inp-label">Secondary link text (dismiss)</label>
        <input class="inp" id="promoSecondary" value="${secondaryLabel}" placeholder="e.g. Maybe later, No thanks">
      </div>
    </div>

    <!-- ── Targeting ── -->
    <div class="form-box">
      <div class="form-title">Targeting &amp; Timing</div>
      <div class="fg2">
        <div class="inp-group">
          <label class="inp-label">Show to</label>
          ${selHTML('promoShowTo', showToOpts, showTo)}
        </div>
        <div class="inp-group">
          <label class="inp-label">Delay before showing (seconds)</label>
          <input class="inp" id="promoDelay" type="number" min="0" max="60" value="${delaySeconds}">
        </div>
      </div>
      <div class="inp-group">
        <label class="inp-label">How often to show</label>
        <div class="freq-btn-group">
          <button class="freq-btn${frequencyHours === 0    ? ' act' : ''}" onclick="A.setPromoFreq(0)"    id="fq0">Every visit</button>
          <button class="freq-btn${frequencyHours === 1    ? ' act' : ''}" onclick="A.setPromoFreq(1)"    id="fq1">Every hour</button>
          <button class="freq-btn${frequencyHours === 24   ? ' act' : ''}" onclick="A.setPromoFreq(24)"   id="fq24">Once a day</button>
          <button class="freq-btn${frequencyHours === 168  ? ' act' : ''}" onclick="A.setPromoFreq(168)"  id="fq168">Once a week</button>
          <button class="freq-btn${frequencyHours === 720  ? ' act' : ''}" onclick="A.setPromoFreq(720)"  id="fq720">Once a month</button>
        </div>
        <input type="hidden" id="promoFrequency" value="${frequencyHours}">
      </div>
    </div>

    <!-- ── Appearance ── -->
    <div class="form-box">
      <div class="form-title">Appearance</div>
      <div class="fg2">
        <div class="inp-group">
          <label class="inp-label">Style</label>
          ${selHTML('promoStyle', styleOpts, style)}
        </div>
        <div class="inp-group">
          <label class="inp-label">Accent colour</label>
          <div style="display:flex;gap:8px;align-items:center">
            <input class="inp" id="promoAccent" value="${accentColor}" placeholder="#e5253f" style="flex:1">
            <input type="color" id="promoAccentPicker" value="${accentColor}"
              oninput="document.getElementById('promoAccent').value=this.value"
              style="width:40px;height:40px;border:1px solid var(--rim);border-radius:8px;cursor:pointer;background:none;padding:2px">
          </div>
        </div>
      </div>
      <div class="inp-group">
        <label class="inp-label">Background image URL (optional — overrides colour)</label>
        <input class="inp" id="promoImageUrl" value="${imageUrl}" placeholder="https://… or leave blank">
      </div>
    </div>

    <div style="display:flex;justify-content:flex-end;gap:8px;padding-bottom:32px">
      <button class="btn btn-outline" onclick="A.resetPromoConfig()">Reset to Default</button>
      <button class="btn btn-red" onclick="A.savePromoConfig()">Save Changes</button>
    </div>
  </div>`
}
