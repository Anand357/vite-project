// src/admin/AdminNotifications.js
// Admin tab for composing and sending push notifications — Level 2+
import { S } from '../store.js'

export function renderANotificationsTab() {
  if (S.aTab !== 'notifications') return ''

  const content = S.content.filter(c => !c.hidden)
  const sentHistory = S.notifHistory || []

  // Audience options
  const audienceOpts = [
    { value: 'all',         label: 'All registered users'        },
    { value: 'free',        label: 'Free plan users only'         },
    { value: 'standard',    label: 'Standard plan users only'     },
    { value: 'premium',     label: 'Premium plan users only'      },
    { value: 'saved_drama', label: 'Users who saved a specific drama' },
    { value: 'watched',     label: 'Users who watched a specific drama' },
  ]

  const selAudience = S.notifAudience || 'all'
  const needsDrama  = selAudience === 'saved_drama' || selAudience === 'watched'

  const audienceSelect = '<select class="inp" id="notifAudience" onchange="A.notifAudienceChange(this.value)">'
    + audienceOpts.map(o => '<option value="' + o.value + '"' + (selAudience === o.value ? ' selected' : '') + '>' + o.label + '</option>').join('')
    + '</select>'

  const dramaSelect = needsDrama
    ? '<div class="inp-group" id="notifDramaWrap">'
        + '<label class="inp-label">Select Drama</label>'
        + '<select class="inp" id="notifDrama">'
        + '<option value="">— Choose a drama —</option>'
        + content.map(c => '<option value="' + c.id + '">' + c.title + '</option>').join('')
        + '</select>'
        + '</div>'
    : ''

  // Sent history rows
  const historyRows = sentHistory.length
    ? sentHistory.map(n => {
        const ts    = n.sentAt?.seconds ? _relTime(n.sentAt.seconds) : n.sentAt || '—'
        const count = n.recipientCount || 0
        return '<div class="notif-hist-row">'
          + '<div class="notif-hist-meta">'
          + '<div class="notif-hist-title">' + _esc(n.title || '') + '</div>'
          + '<div class="notif-hist-body">' + _esc(n.message || '') + '</div>'
          + '</div>'
          + '<div class="notif-hist-right">'
          + '<div class="notif-hist-count">' + count + ' sent</div>'
          + '<div class="notif-hist-ts">' + ts + '</div>'
          + '<span class="tag tag-' + (n.audience || 'all') + '" style="font-size:.6rem">' + _audienceLabel(n.audience) + '</span>'
          + '</div>'
          + '</div>'
      }).join('')
    : '<p class="empty-txt" style="padding:20px 0;text-align:center;font-size:.8rem">No notifications sent yet</p>'

  return `<div class="apanel vis">
    <div style="margin-bottom:20px">
      <div class="p-title" style="font-size:1.2rem">Notifications</div>
      <div class="p-sub">Send in-app notifications directly to users</div>
    </div>

    <!-- ── Compose ── -->
    <div class="form-box" style="margin-bottom:14px">
      <div class="form-title">Compose Notification</div>

      <div class="inp-group">
        <label class="inp-label">Title (shown in bold)</label>
        <input class="inp" id="notifTitle" placeholder="e.g. New episode added, Special offer…" maxlength="80" oninput="A.updateNotifPreview()">
      </div>

      <div class="inp-group">
        <label class="inp-label">Message</label>
        <textarea class="inp" id="notifMessage" rows="3" placeholder="Write your notification message here…" maxlength="300" oninput="A.updateNotifPreview()"></textarea>
        <div style="text-align:right;font-size:.68rem;color:var(--txt3);margin-top:4px" id="notifCharCount">0 / 300</div>
      </div>

      <div class="inp-group">
        <label class="inp-label">Thumbnail image URL (optional)</label>
        <input class="inp" id="notifThumb" placeholder="https://… leave blank for no image">
      </div>

      <div class="inp-group">
        <label class="inp-label">Send to</label>
        ${audienceSelect}
      </div>

      ${dramaSelect}

      <div class="notif-send-row">
        <div class="notif-send-preview" id="notifPreview">
          <div class="notif-send-preview-label">Preview</div>
          <div class="notif-preview-item">
            <div class="notif-preview-dot"></div>
            <div>
              <div class="notif-preview-title" id="notifPreviewTitle">Notification title</div>
              <div class="notif-preview-msg"   id="notifPreviewMsg">Your message will appear here…</div>
            </div>
          </div>
        </div>
        <button class="btn btn-red" id="notifSendBtn" onclick="A.sendNotification()">
          Send Notification
        </button>
      </div>
    </div>

    <!-- ── Quick send buttons (content-linked) ── -->
    <div class="form-box" style="margin-bottom:14px">
      <div class="form-title">Quick Send — Content Update</div>
      <p class="p-sub" style="margin-bottom:14px">Instantly notify users who saved a drama that new content is available.</p>
      <div class="notif-quick-grid">
        ${content.slice(0, 12).map(c =>
          '<div class="notif-quick-card">'
          + '<img src="' + c.thumbnail + '" class="notif-quick-thumb" alt="' + _esc(c.title) + '" onerror="this.style.display=\'none\'">'
          + '<div class="notif-quick-name">' + _esc(c.title) + '</div>'
          + '<button class="notif-quick-btn" onclick="A.quickNotify(\'' + c.id + '\')">'
          + 'Notify Fans</button>'
          + '</div>'
        ).join('')}
      </div>
    </div>

    <!-- ── Sent history ── -->
    <div class="form-box">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
        <div class="form-title" style="margin:0">Sent History</div>
        <button class="btn btn-outline btn-sm" onclick="A.loadNotifHistory()">Refresh</button>
      </div>
      <div class="notif-hist-list">${historyRows}</div>
    </div>

  </div>`
}

function _esc(str) {
  return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')
}
function _relTime(sec) {
  const d = Math.floor(Date.now()/1000) - sec
  if (d < 60)    return 'Just now'
  if (d < 3600)  return Math.floor(d/60)   + 'm ago'
  if (d < 86400) return Math.floor(d/3600)  + 'h ago'
  return               Math.floor(d/86400) + 'd ago'
}
function _audienceLabel(a) {
  const map = { all:'All users', free:'Free', standard:'Standard', premium:'Premium', saved_drama:'Saved', watched:'Watched' }
  return map[a] || a || 'All'
}
