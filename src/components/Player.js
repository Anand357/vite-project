// src/components/Player.js
import { S, notify } from '../store.js'
import { renderCreditPlayer, startCreditTimer, stopCreditTimer } from './CreditPlayer.js'
import { renderPaywall } from './Paywall.js'
import {
  canPlayEpisode, FREE_EP_LIMIT,
  actChangeEp, actToggleLike, actToggleList, actComment, loadComments,
  actRateContent, getUserRating, getAvgRating, actShare, showToast,
} from '../utils/actions.js'

// ─── Render ────────────────────────────────────────────────────────────────
export function renderPlayer() {
  const { pc: c, pEp, pComments, pShowLib, pShowComments, pMuted, pSpeed, pAutoplay } = S
  if (!c) return ''
  const total  = c.episodes || 1
  const liked  = S.liked.includes(c.id)
  const saved  = S.myList.includes(c.id)
  const avgRating = getAvgRating(c)
  const myRating  = getUserRating(c.id)

  const slides = Array.from({ length: total }, (_, i) => {
    const url     = (c.episodeUrls || [])[i] || ''
    const srcAttr = i === pEp ? ` src="${url}"` : ''
    return (
      '<div class="ep-slide" id="epSlide' + i + '">'
      + '<div class="ep-vid-wrap" id="epVidWrap' + i + '">'
      + '<video class="ep-vid" id="vid' + i + '"' + srcAttr
      + ' playsinline preload="none"'
      + ' onwaiting="document.getElementById(\'epLoad' + i + '\').classList.add(\'show\')"'
      + ' oncanplay="document.getElementById(\'epLoad' + i + '\').classList.remove(\'show\')"'
      + ' ontimeupdate="_DF.updateProgress(' + i + ')"'
      + ' onended="_DF.onEnded(' + i + ')"'
      + '></video>'

      // Loading spinner
      + '<div class="ep-loading" id="epLoad' + i + '"><div class="ring" style="width:44px;height:44px"></div></div>'

      // Swipe seek feedback
      + '<div class="ep-seek-toast" id="seekToast' + i + '"></div>'

      // ── Custom Controls ──
      + '<div class="ep-ctrl-bar" id="epCtrl' + i + '">'

      // Scrubber
      + '<div class="ep-scrubber-wrap" onmousedown="_DF.scrubStart(event,' + i + ')" ontouchstart="_DF.scrubTouchStart(event,' + i + ')">'
      + '<div class="ep-scrubber-bg"><div class="ep-scrubber-fill" id="epFill' + i + '"></div><div class="ep-scrubber-thumb" id="epThumb' + i + '"></div></div>'
      + '</div>'

      // Bottom row: time | spacer | speed | mute | fullscreen
      + '<div class="ep-ctrl-row">'
      + '<span class="ep-time" id="epTime' + i + '">0:00 / 0:00</span>'
      + '<span style="flex:1"></span>'

      // Speed picker
      + '<div class="ep-speed-wrap">'
      + '<button class="ep-ctrl-btn" onclick="_DF.cycleSpeed(' + i + ')" id="epSpeedBtn' + i + '">' + pSpeed + 'x</button>'
      + '</div>'

      // Mute
      + '<button class="ep-ctrl-btn ep-ctrl-icon" id="epMuteBtn' + i + '" onclick="_DF.toggleMute(' + i + ')" title="' + (pMuted ? 'Unmute' : 'Mute') + '"><span class="icon ' + (pMuted ? 'icon-mute' : 'icon-volume') + ' icon-white" style="width:16px;height:16px"></span></button>'

      // Fullscreen
      + '<button class="ep-ctrl-btn ep-ctrl-icon" onclick="_DF.toggleFullscreen(' + i + ')" title="Fullscreen"><span class="icon icon-expand icon-white" style="width:16px;height:16px"></span></button>'
      + '</div>'
      + '</div>' // ep-ctrl-bar

      // Progress (thin bottom bar shown when controls are hidden)
      + '<div class="ep-progress"><div class="ep-progress-fill" id="epProg' + i + '"></div></div>'

      + '</div>' // ep-vid-wrap

      // Info
      + '<div class="ep-info">'
      + '<div class="ep-info-show">' + c.title + '</div>'
      + '<div class="ep-info-num">Episode ' + (i + 1) + ' of ' + total + '</div>'
      + '<p class="ep-info-desc">' + c.description + '</p>'
      + (i < total - 1
        ? '<div class="ep-next-hint"><span class="ep-next-hint-arr">↓</span> Scroll for Episode ' + (i + 2) + '</div>'
        : '<div class="ep-next-hint ep-last">Last episode</div>')
      + '</div>'

      // Side actions
      + '<div class="ep-side">'
      + '<div class="ep-act' + (liked ? ' liked' : '') + '" onclick="A.toggleLike(\'' + c.id + '\')">'
      + '<div class="ep-act-ic"><span class="icon icon-heart' + (liked ? '-fill' : '') + '" style="width:22px;height:22px;--icon-color:currentColor"></span></div><span class="ep-act-lbl">' + (c.likes || 0) + '</span></div>'
      + '<div class="ep-act" onclick="A.openComments()">'
      + '<div class="ep-act-ic"><span class="icon icon-comment" style="width:22px;height:22px;--icon-color:currentColor"></span></div><span class="ep-act-lbl">' + pComments.length + '</span></div>'
      + '<div class="ep-act' + (saved ? ' saved' : '') + '" onclick="A.toggleList(\'' + c.id + '\')">'
      + '<div class="ep-act-ic"><span class="icon ' + (saved ? 'icon-check icon-jade' : 'icon-plus') + '" style="width:20px;height:20px;--icon-color:currentColor"></span></div><span class="ep-act-lbl">List</span></div>'
      + '<div class="ep-act" onclick="A.openLib()">'
      + '<div class="ep-act-ic"><span class="icon icon-episodes" style="width:20px;height:20px;--icon-color:currentColor"></span></div><span class="ep-act-lbl">EPs</span></div>'
      + '<div class="ep-act" onclick="_DF.share(\'' + c.id + '\')">'
      + '<div class="ep-act-ic"><span class="icon icon-share" style="width:20px;height:20px;--icon-color:currentColor"></span></div><span class="ep-act-lbl">Share</span></div>'
      // Star rating in side bar
      + '<div class="ep-act ep-rating-act" onclick="_DF.openRating(\'' + c.id + '\')">'
      + '<div class="ep-act-ic"><span class="icon icon-star icon-amber" style="width:22px;height:22px"></span></div>'
      + '<span class="ep-act-lbl">' + (avgRating ? avgRating.toFixed(1) : '—') + '</span></div>'
      + '</div>'

      + '</div>' // ep-slide
    )
  }).join('')

  // Auto-play countdown overlay
  const countdownHTML = S.pCountdownActive
    ? '<div class="ep-countdown" id="epCountdown">'
      + '<div class="ep-countdown-box">'
      + '<div class="ep-countdown-label">Next Episode in</div>'
      + '<div class="ep-countdown-num" id="epCountdownNum">' + S.pCountdownSec + '</div>'
      + '<div style="display:flex;gap:10px;margin-top:12px">'
      + '<button class="btn btn-red btn-sm" onclick="_DF.skipCountdown()">Play Now</button>'
      + '<button class="btn btn-outline btn-sm" onclick="_DF.cancelCountdown()">Cancel</button>'
      + '</div></div></div>'
    : ''

  // Rating modal
  const ratingHTML = S.pShowRating
    ? renderRatingModal(c, myRating, avgRating)
    : ''

  const paywallHTML = S.pPaywall ? renderPaywall(S.pPaywall) : ''

  if (S.adPlaying) return renderCreditPlayer()

  return '<div id="player">'
    + '<div class="player-header">'
    + '<button class="player-back" onclick="A.closePlayer()"><span class="icon icon-back icon-txt2" style="width:18px;height:18px"></span> Back</button>'
    + '<div class="player-show">' + c.title + '</div>'
    + '<button class="player-autoplay-btn' + (pAutoplay ? ' active' : '') + '" onclick="_DF.toggleAutoplay()" title="' + (pAutoplay ? 'Autoplay on' : 'Autoplay off') + '">⟳</button>'
    + '<div class="player-ep-tag" id="epTag">EP ' + (pEp + 1) + '/' + total + '</div>'
    + '</div>'
    + '<div class="ep-feed" id="epFeed">' + slides + '</div>'
    + countdownHTML
    + ratingHTML
    + (pShowLib ? renderEpLib(c) : '')
    + (pShowComments ? renderComments(c, pComments) : '')
    + paywallHTML
    + '</div>'
}

// ─── Rating modal ──────────────────────────────────────────────────────────
function renderRatingModal(c, myRating, avgRating) {
  const stars = [1,2,3,4,5]
  return '<div class="rating-modal-overlay" onclick="event.target.classList.contains(\'rating-modal-overlay\')&&_DF.closeRating()">'
    + '<div class="rating-modal">'
    + '<div class="rating-modal-title">Rate this Drama</div>'
    + '<div class="rating-modal-show">' + c.title + '</div>'
    + (avgRating ? '<div class="rating-avg">Community: ★ ' + avgRating.toFixed(1) + ' (' + (c.ratingCount || 0) + ' ratings)</div>' : '')
    + '<div class="rating-stars" id="ratingStars">'
    + stars.map(s =>
        '<button class="rating-star' + (myRating >= s ? ' lit' : '') + '" '
        + 'onmouseover="_DF.hoverStar(' + s + ')" '
        + 'onmouseout="_DF.unhoverStar()" '
        + 'onclick="_DF.submitRating(\'' + c.id + '\',' + s + ')">'
        + '★</button>'
      ).join('')
    + '</div>'
    + '<div class="rating-label" id="ratingLabel">' + (myRating ? 'Your rating: ' + myRating + ' ★' : 'Tap a star to rate') + '</div>'
    + '<button class="btn btn-outline btn-sm" style="margin-top:14px" onclick="_DF.closeRating()">Close</button>'
    + '</div></div>'
}

// ─── EP Library ───────────────────────────────────────────────────────────
export function renderEpLib(c) {
  const total = c.episodes || 1
  const btns = Array.from({ length: total }, (_, i) => {
    const done   = S.watchHistory[c.id] != null && S.watchHistory[c.id] >= i
    const cur    = i === S.pEp
    const access = canPlayEpisode(c, i, S.sub)
    const locked = !access.allowed
    const lockIcon = access.reason === 'exclusive' ? '' : '🔒'
    return '<button class="ep-btn'
      + (cur ? ' cur' : '') + (done ? ' done' : '') + (locked ? ' ep-locked' : '')
      + '" onclick="A.jumpEp(' + i + ')">'
      + (done ? '<span class="ep-done-dot"></span>' : '')
      + (locked ? '<span class="ep-lock-icon">' + lockIcon + '</span>' : '')
      + '<span class="ep-btn-n">EP ' + (i + 1) + '</span>'
      + '<span class="ep-btn-lbl">'
      + (locked ? (access.reason === 'exclusive' ? 'Premium' : 'Upgrade') : (done ? 'Watched' : '—'))
      + '</span>'
      + '</button>'
  }).join('')
  return '<div class="sheet-overlay" onclick="event.target.classList.contains(\'sheet-overlay\')&&A.closeLib()">'
    + '<div class="sheet"><div class="sheet-head">'
    + '<div class="sheet-title">' + c.title + ' — Episodes</div>'
    + '<button class="sheet-x" onclick="A.closeLib()">✕</button></div>'
    + '<div class="ep-grid">' + btns + '</div>'
    + '</div></div>'
}

// ─── Comments ──────────────────────────────────────────────────────────────
// Avatar colour — deterministic from username first char
const _AV_COLORS = ['ci-av-red', 'ci-av-amber', 'ci-av-jade', 'ci-av-blue', 'ci-av-purple']
function _avColor(name) {
  return _AV_COLORS[(name || 'U').charCodeAt(0) % _AV_COLORS.length]
}
// Relative timestamp for comments
function _fmtRelTime(seconds) {
  const diff = Math.floor(Date.now() / 1000) - seconds
  if (diff < 60)    return 'just now'
  if (diff < 3600)  return Math.floor(diff / 60) + 'm ago'
  if (diff < 86400) return Math.floor(diff / 3600) + 'h ago'
  return Math.floor(diff / 86400) + 'd ago'
}

export function renderComments(c, comments) {
  const uid = S.user?.uid || null

  const items = comments.length
    ? comments.map(cm => {
        const isOwn   = uid && cm.userId === uid
        const initial = (cm.userName || 'U')[0].toUpperCase()
        const color   = _avColor(cm.userName)
        const ts      = cm.createdAt?.seconds ? _fmtRelTime(cm.createdAt.seconds) : ''
        return '<div class="ci' + (isOwn ? ' ci-own' : '') + '">'
          + '<div class="ci-av ' + color + '">' + initial + '</div>'
          + '<div class="ci-body">'
          + '<div class="ci-meta">'
          + '<span class="ci-name">' + (cm.userName || 'Anonymous') + '</span>'
          + (ts ? '<span class="ci-ts">' + ts + '</span>' : '')
          + '</div>'
          + '<div class="ci-text">' + cm.text + '</div>'
          + '</div>'
          + (isOwn ? '<button class="ci-del" onclick="A.deleteComment(\'' + cm.id + '\')" title="Delete">✕</button>' : '')
          + '</div>'
      }).join('')
    : '<div class="ci-empty"><div class="empty-ic">💬</div><p class="ci-empty-txt">Be the first to comment!</p></div>'

  const inputRow = S.user
    ? '<div class="ci-inp-row">'
      + '<div class="ci-inp-av">' + (S.user.displayName || S.user.email || 'U')[0].toUpperCase() + '</div>'
      + '<input class="inp" id="cInp" placeholder="Write a comment…" onkeydown="if(event.key===\'Enter\'&&!event.shiftKey){event.preventDefault();A.postComment(\'' + c.id + '\')}">'
      + '<button class="btn btn-red btn-sm" id="cSubmitBtn" onclick="A.postComment(\'' + c.id + '\')">Post</button>'
      + '</div>'
    : '<div class="ci-login-prompt">'
      + '<button class="btn btn-outline btn-sm fw" onclick="A.openAuth(\'login\')">Sign in to comment</button>'
      + '</div>'

  return '<div class="sheet-overlay" onclick="event.target.classList.contains(\'sheet-overlay\')&&A.closeComments()">'
    + '<div class="sheet" style="max-height:80vh">'
    + '<div class="sheet-head">'
    + '<div class="sheet-title">Comments' + (comments.length ? ' <span class="ci-count">' + comments.length + '</span>' : '') + '</div>'
    + '<button class="sheet-x" onclick="A.closeComments()">✕</button></div>'
    + '<div class="comments-list" id="commentsList">' + items + '</div>'
    + inputRow
    + '</div></div>'
}

// ─── Bind ──────────────────────────────────────────────────────────────────
export function bindPlayer() {
  const feed = document.getElementById('epFeed')
  if (!feed) return

  // Guard: if already bound, clean up old listeners first (prevents accumulation)
  feed?._cleanupFeed?.()

  // ── Scroll between episodes ──────────────────────────────
  let _scrollT
  const _onScrollHandler = () => {
    clearTimeout(_scrollT)
    _scrollT = setTimeout(() => {
      const h   = feed.clientHeight
      const idx = Math.round(feed.scrollTop / h)
      if (idx !== S.pEp) {
        const oldVid = document.getElementById('vid' + S.pEp)
        if (oldVid) { oldVid.pause(); oldVid.currentTime = 0 }
        S.pEp = idx
        const tag = document.getElementById('epTag')
        if (tag) tag.textContent = 'EP ' + (idx + 1) + '/' + S.pc.episodes
        // Check access before playing — triggers paywall re-render if locked
        actChangeEp(idx).then(result => {
          if (result === 'paywall') { notify(); return }
          const nVid = document.getElementById('vid' + idx)
          if (nVid && !nVid.src) nVid.src = (S.pc.episodeUrls || [])[idx] || ''
          if (nVid) { nVid.playbackRate = S.pSpeed; nVid.muted = S.pMuted; nVid.play().catch(() => {}) }
        })
      }
    }, 120)
  }
  feed._scrollHandler = _onScrollHandler
  feed.addEventListener('scroll', _onScrollHandler, { passive: true })

  // ── Tap to play/pause ────────────────────────────────────
  const _onClickHandler = e => {
    if (e.target.closest('.ep-side, .ep-ctrl-bar, .ep-scrubber-wrap, .sheet-overlay, .ep-countdown, .rating-modal-overlay')) return
    const vid = document.getElementById('vid' + S.pEp)
    if (!vid) return
    if (vid.paused) { vid.play().catch(() => {}); _flashCtrl('Play') }
    else            { vid.pause();                _flashCtrl('Pause') }
  }
  feed._clickHandler = _onClickHandler
  feed.addEventListener('click', _onClickHandler)

  // ── Initial scroll + load ────────────────────────────────
  requestAnimationFrame(() => {
    feed.scrollTop = S.pEp * feed.clientHeight
    const vid = document.getElementById('vid' + S.pEp)
    if (vid) {
      if (!vid.src) vid.src = (S.pc?.episodeUrls || [])[S.pEp] || ''
      vid.playbackRate = S.pSpeed
      vid.muted = S.pMuted
      vid.play().catch(() => {})
    }
  })

  // ── Swipe (horizontal) + Double-tap ─────────────────────
  let _tx0, _ty0, _lastTap = 0, _tapTimer = null
  const _skipGuard = '.ep-side, .ep-ctrl-bar, .sheet-overlay, .ep-countdown, .rating-modal-overlay'

  const _onTouchStart = e => {
    if (e.target.closest(_skipGuard)) return
    _tx0 = e.touches[0].clientX
    _ty0 = e.touches[0].clientY
  }

  const _onTouchEnd = e => {
    if (e.target.closest(_skipGuard)) return
    const touch = e.changedTouches[0]
    const now   = Date.now()

    // Double-tap detection (takes priority over swipe)
    if (now - _lastTap < 300) {
      clearTimeout(_tapTimer)
      _lastTap = 0
      const vid = document.getElementById('vid' + S.pEp)
      if (!vid || !vid.duration) return
      if (touch.clientX < window.innerWidth / 2) {
        vid.currentTime = Math.max(0, vid.currentTime - 10)
        _showSeekToast(S.pEp, '−10s')
      } else {
        vid.currentTime = Math.min(vid.duration, vid.currentTime + 10)
        _showSeekToast(S.pEp, '+10s')
      }
      return
    }
    _lastTap = now
    _tapTimer = setTimeout(() => { _lastTap = 0 }, 310)

    // Horizontal swipe seek (only if _tx0 was set)
    if (_tx0 == null) return
    const dx = touch.clientX - _tx0
    const dy = touch.clientY - _ty0
    _tx0 = null
    if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return
    const vid = document.getElementById('vid' + S.pEp)
    if (!vid || !vid.duration) return
    if (dx > 0) {
      vid.currentTime = Math.min(vid.duration, vid.currentTime + 10)
      _showSeekToast(S.pEp, '+10s')
    } else {
      vid.currentTime = Math.max(0, vid.currentTime - 10)
      _showSeekToast(S.pEp, '−10s')
    }
  }

  feed._touchStartHandler = _onTouchStart
  feed._touchEndHandler   = _onTouchEnd
  feed.addEventListener('touchstart', _onTouchStart, { passive: true })
  feed.addEventListener('touchend',   _onTouchEnd,   { passive: true })

  // ── Keyboard shortcuts ───────────────────────────────────
  const _onKey = e => {
    if (!S.pc) return
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
    const vid = document.getElementById('vid' + S.pEp)
    if (!vid) return
    switch (e.code) {
      case 'Space': case 'KeyK':
        e.preventDefault()
        if (vid.paused) { vid.play().catch(() => {}); _flashCtrl('Play') }
        else            { vid.pause();                _flashCtrl('Pause') }
        break
      case 'ArrowLeft':
        e.preventDefault()
        vid.currentTime = Math.max(0, vid.currentTime - 10)
        _showSeekToast(S.pEp, '−10s')
        _scheduleHideControls()
        break
      case 'ArrowRight':
        e.preventDefault()
        vid.currentTime = Math.min(vid.duration || 0, vid.currentTime + 10)
        _showSeekToast(S.pEp, '+10s')
        _scheduleHideControls()
        break
      case 'KeyF':
        e.preventDefault()
        window._DF.toggleFullscreen(S.pEp)
        break
      case 'KeyM':
        e.preventDefault()
        window._DF.toggleMute(S.pEp)
        break
      case 'Escape':
        // eslint-disable-next-line no-undef
        A.closePlayer()
        break
    }
  }
  document.addEventListener('keydown', _onKey)
  feed._cleanupKey = () => document.removeEventListener('keydown', _onKey)

  // ── Controls auto-hide ───────────────────────────────────
  _scheduleHideControls()
  feed.addEventListener('touchstart', _scheduleHideControls, { passive: true })
  feed.addEventListener('mousemove',  _scheduleHideControls)

  // Store cleanup for all feed listeners so re-binding is safe
  const _onScroll   = feed._scrollHandler
  const _onClick    = feed._clickHandler
  const _onTStart   = feed._touchStartHandler
  const _onTEnd     = feed._touchEndHandler
  const _onHideTap  = _scheduleHideControls
  feed._cleanupFeed = () => {
    feed.removeEventListener('scroll',     feed._scrollHandler)
    feed.removeEventListener('click',      feed._clickHandler)
    feed.removeEventListener('touchstart', feed._touchStartHandler)
    feed.removeEventListener('touchend',   feed._touchEndHandler)
    feed.removeEventListener('touchstart', _scheduleHideControls)
    feed.removeEventListener('mousemove',  _scheduleHideControls)
    feed._cleanupFeed = null
  }
}

let _hideCtrlTimer
function _scheduleHideControls() {
  clearTimeout(_hideCtrlTimer)
  document.querySelectorAll('.ep-ctrl-bar').forEach(b => b.classList.add('visible'))
  _hideCtrlTimer = setTimeout(() => {
    document.querySelectorAll('.ep-ctrl-bar').forEach(b => b.classList.remove('visible'))
  }, 3000)
}

function _flashCtrl(icon) {
  // Remove existing flash
  document.querySelector('.ep-flash-ctrl')?.remove()
  const el = document.createElement('div')
  el.className = 'ep-flash-ctrl'
  el.textContent = icon
  document.getElementById('epFeed')?.appendChild(el)
  setTimeout(() => el.remove(), 700)
}

// Clean up all player listeners when player closes or re-renders
export function unbindPlayer() {
  const feed = document.getElementById('epFeed')
  feed?._cleanupKey?.()
  feed?._cleanupFeed?.()
}

function _showSeekToast(i, text) {
  const el = document.getElementById('seekToast' + i)
  if (el) {
    el.textContent = text
    el.classList.add('show')
    clearTimeout(el._t)
    el._t = setTimeout(() => el.classList.remove('show'), 900)
    return
  }
  // Fallback: floating toast for double-tap when seekToast el not found
  const fb = document.createElement('div')
  fb.className = 'ep-seek-toast-fb'
  fb.textContent = text
  document.getElementById('epFeed')?.appendChild(fb)
  setTimeout(() => fb.remove(), 900)
}

// ─── Global _DF API (called from inline HTML) ───────────────────────────────
window._DF = {

  // ── Progress update ──────────────────────────────────────
  updateProgress(i) {
    const vid   = document.getElementById('vid' + i)
    const fill  = document.getElementById('epFill' + i)
    const thumb = document.getElementById('epThumb' + i)
    const prog  = document.getElementById('epProg' + i)
    const time  = document.getElementById('epTime' + i)
    if (!vid || !vid.duration) return
    const pct = vid.currentTime / vid.duration * 100
    if (fill)  fill.style.width  = pct + '%'
    if (thumb) thumb.style.left  = pct + '%'
    if (prog)  prog.style.width  = pct + '%'   // thin bottom bar
    if (time)  time.textContent  = _fmtTime(vid.currentTime) + ' / ' + _fmtTime(vid.duration)
  },

  // ── Episode ended → auto-play countdown ─────────────────
  onEnded(i) {
    const feed  = document.getElementById('epFeed')
    const total = S.pc?.episodes || 1
    const next  = i + 1
    if (!feed || next >= total) return   // last episode — nothing to do

    if (!S.pAutoplay) {
      feed.scrollTo({ top: next * feed.clientHeight, behavior: 'smooth' })
      return
    }

    // Start 5-second countdown
    S.pCountdownActive = true
    S.pCountdownSec    = 5
    notify()

    const tick = setInterval(() => {
      S.pCountdownSec -= 1
      const el = document.getElementById('epCountdownNum')
      if (el) el.textContent = S.pCountdownSec
      if (S.pCountdownSec <= 0) {
        clearInterval(tick)
        window._DF._playNext(next)
      }
    }, 1000)
    S._countdownInterval = tick
  },

  _playNext(next) {
    S.pCountdownActive = false
    S.pCountdownSec    = 5
    notify()
    setTimeout(() => {
      const feed = document.getElementById('epFeed')
      if (feed) feed.scrollTo({ top: next * feed.clientHeight, behavior: 'smooth' })
    }, 50)
  },

  skipCountdown() {
    clearInterval(S._countdownInterval)
    window._DF._playNext(S.pEp + 1)
  },

  cancelCountdown() {
    clearInterval(S._countdownInterval)
    S.pCountdownActive = false
    S.pCountdownSec    = 5
    notify()
  },

  // ── Autoplay toggle ───────────────────────────────────────
  toggleAutoplay() {
    S.pAutoplay = !S.pAutoplay
    const btn = document.querySelector('.player-autoplay-btn')
    if (btn) {
      btn.classList.toggle('active', S.pAutoplay)
      btn.title = S.pAutoplay ? 'Autoplay on' : 'Autoplay off'
    }
    showToast('Autoplay ' + (S.pAutoplay ? 'on' : 'off'), 1200)
  },

  // ── Mute ─────────────────────────────────────────────────
  toggleMute(i) {
    const vid = document.getElementById('vid' + i)
    if (!vid) return
    S.pMuted = !S.pMuted
    vid.muted = S.pMuted
    const btn = document.getElementById('epMuteBtn' + i)
    if (btn) btn.innerHTML = '<span class="icon ' + (S.pMuted ? 'icon-mute' : 'icon-volume') + ' icon-white" style="width:16px;height:16px"></span>'
  },

  // ── Speed ─────────────────────────────────────────────────
  cycleSpeed(i) {
    const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2]
    const idx = speeds.indexOf(S.pSpeed)
    // If current speed not in list (e.g. stale state), snap to 1×
    S.pSpeed = speeds[idx === -1 ? 2 : (idx + 1) % speeds.length]
    const vid = document.getElementById('vid' + i)
    if (vid) vid.playbackRate = S.pSpeed
    const btn = document.getElementById('epSpeedBtn' + i)
    if (btn) btn.textContent = S.pSpeed + 'x'
    showToast('Speed: ' + S.pSpeed + 'x', 1200)
  },

  // ── Fullscreen ────────────────────────────────────────────
  toggleFullscreen(i) {
    const wrap = document.getElementById('epVidWrap' + i)
    if (!wrap) return
    if (!document.fullscreenElement) {
      wrap.requestFullscreen?.() || wrap.webkitRequestFullscreen?.()
    } else {
      document.exitFullscreen?.() || document.webkitExitFullscreen?.()
    }
  },

  // ── Scrubber — mouse ──────────────────────────────────────
  scrubStart(e, i) {
    e.preventDefault()
    _scrub(e, i)
    const move = ev => _scrub(ev, i)
    const up   = ()  => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up) }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
  },

  // ── Scrubber — touch ──────────────────────────────────────
  scrubTouchStart(e, i) {
    const move = ev => { ev.preventDefault(); _scrub(ev.touches[0], i) }
    const end  = ()  => { window.removeEventListener('touchmove', move); window.removeEventListener('touchend', end) }
    window.addEventListener('touchmove', move, { passive: false })
    window.addEventListener('touchend', end)
    _scrub(e.touches[0], i)
  },

  // ── Share ────────────────────────────────────────────────
  share(contentId) { actShare(contentId) },

  // ── Rating modal ─────────────────────────────────────────
  openRating(contentId)  { S.pShowRating = true; notify() },
  closeRating()          { S.pShowRating = false; notify() },
  submitRating(id, stars){ actRateContent(id, stars); S.pShowRating = false; notify() },
  hoverStar(n) {
    document.querySelectorAll('.rating-star').forEach((el, i) => {
      el.classList.toggle('lit', i < n)
    })
    const lbl = document.getElementById('ratingLabel')
    if (lbl) lbl.textContent = ['','Terrible 😞','Bad 😕','OK 😐','Good 😊','Amazing 🤩'][n]
  },
  unhoverStar() {
    const my = getUserRating(S.pc?.id)
    document.querySelectorAll('.rating-star').forEach((el, i) => {
      el.classList.toggle('lit', i < my)
    })
    const lbl = document.getElementById('ratingLabel')
    if (lbl) lbl.textContent = my ? 'Your rating: ' + my + ' ★' : 'Tap a star to rate'
  },
}

// ── Helpers ─────────────────────────────────────────────────────────────────
function _fmtTime(s) {
  if (!isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return m + ':' + (sec < 10 ? '0' : '') + sec
}

function _scrub(e, i) {
  const vid  = document.getElementById('vid' + i)
  const wrap = document.querySelector('#epVidWrap' + i + ' .ep-scrubber-bg')
  if (!vid || !wrap || !vid.duration) return
  const rect = wrap.getBoundingClientRect()
  const pct  = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
  vid.currentTime = pct * vid.duration
  window._DF.updateProgress(i)
}
