// src/components/PromoPopup.js
// Full-screen promo/offer popup shown on app open
import { S } from '../store.js'

export function renderPromoPopup() {
  if (!S.showPromo) return ''
  const cfg = S.promoConfig || {}

  const {
    title        = 'Unlock Unlimited Drama',
    subtitle     = 'Start your Premium trial today',
    body         = 'Get all episodes, exclusive content and HD quality — ad-free.',
    badge        = 'Limited Offer',
    ctaLabel     = 'Get Premium',
    ctaAction    = 'subscribe',
    ctaUrl       = '',
    secondaryLabel = 'Maybe later',
    style        = 'gradient',
    accentColor  = '#e5253f',
    imageUrl     = '',
  } = cfg

  // CTA onclick
  let onclickCta
  if (ctaAction === 'subscribe') {
    onclickCta = "A.closePromo();A.nav('subscribe')"
  } else if (ctaAction === 'credits') {
    onclickCta = "A.closePromo();A.nav('credits')"
  } else if (ctaAction === 'url' && ctaUrl) {
    onclickCta = "A.closePromo();window.open('" + ctaUrl + "','_blank','noopener')"
  } else {
    onclickCta = "A.closePromo();A.nav('subscribe')"
  }

  // Style variants
  const isGradient = style === 'gradient'
  const isMinimal  = style === 'minimal'
  const isBanner   = style === 'banner'

  const accentRgb = _hexToRgb(accentColor) || '229,37,63'

  const bgStyle = imageUrl
    ? 'background-image:url(' + imageUrl + ');background-size:cover;background-position:center'
    : isGradient
    ? 'background:linear-gradient(145deg,rgba(' + accentRgb + ',.18) 0%,rgba(10,10,18,1) 60%)'
    : 'background:var(--deep)'

  return '<div class="promo-overlay" onclick="event.target.classList.contains(\'promo-overlay\')&&A.closePromo()">'
    + '<div class="promo-box promo-' + style + '" style="' + bgStyle + '">'

    // Decorative glow blob for gradient style
    + (isGradient ? '<div class="promo-glow" style="background:radial-gradient(circle,rgba(' + accentRgb + ',.35) 0%,transparent 70%)"></div>' : '')

    // Background image overlay if present
    + (imageUrl ? '<div class="promo-img-overlay"></div>' : '')

    // Close button
    + '<button class="promo-close icon-btn" onclick="A.closePromo()" aria-label="Close">'
    + '<span class="icon icon-close icon-txt2"></span>'
    + '</button>'

    // Content
    + '<div class="promo-body">'

    // Badge
    + (badge ? '<div class="promo-badge" style="background:rgba(' + accentRgb + ',.2);border-color:rgba(' + accentRgb + ',.4);color:' + accentColor + '">' + badge + '</div>' : '')

    // Title
    + '<h2 class="promo-title">' + title + '</h2>'

    // Subtitle
    + (subtitle ? '<p class="promo-subtitle">' + subtitle + '</p>' : '')

    // Body
    + (body ? '<p class="promo-body-txt">' + body + '</p>' : '')

    // Feature pills (gradient style only)
    + (isGradient ? '<div class="promo-pills">'
        + '<span class="promo-pill">All episodes</span>'
        + '<span class="promo-pill">HD quality</span>'
        + '<span class="promo-pill">Exclusive content</span>'
        + '<span class="promo-pill">Ad-free</span>'
        + '</div>' : '')

    // CTA button
    + '<button class="promo-cta" style="background:' + accentColor + '" onclick="' + onclickCta + '">'
    + ctaLabel
    + '</button>'

    // Secondary action
    + '<button class="promo-secondary" onclick="A.closePromo()">'
    + secondaryLabel
    + '</button>'

    + '</div>' // promo-body
    + '</div>' // promo-box
    + '</div>' // promo-overlay
}

function _hexToRgb(hex) {
  if (!hex || !hex.startsWith('#')) return null
  const r = parseInt(hex.slice(1,3), 16)
  const g = parseInt(hex.slice(3,5), 16)
  const b = parseInt(hex.slice(5,7), 16)
  return isNaN(r) ? null : r + ',' + g + ',' + b
}
