// src/admin/AdminTasks.js
// Admin tab for managing Credits page tasks — accessible to Level 3+ admins
import { S } from '../store.js'
import { DEFAULT_TASKS } from '../utils/actions.js'

export function renderATasksTab() {
  const tasks = S.tasksConfig ? [...S.tasksConfig] : DEFAULT_TASKS.map(t => ({ ...t }))

  const taskRows = tasks.map((t, i) => {
    const isStreak  = t.type === 'streak'
    const isSocial  = t.type === 'social'
    const isWatchAd = t.type === 'watch_ad'
    const isAction  = t.type === 'action'

    return `<div class="task-admin-row" id="taskRow${i}">

      <!-- Row header: icon + title + type label + enable toggle -->
      <div class="task-admin-header">
        <div class="task-admin-icon-wrap">
          <input class="inp task-icon-inp" id="tIcon${i}" value="${t.icon}" maxlength="10"
            style="width:60px;text-align:center;padding:8px;font-size:.9rem">
        </div>
        <div class="task-admin-meta">
          <div class="task-admin-title">${t.title}</div>
          <div class="task-admin-type">${_typeLabel(t.type)}</div>
        </div>
        <div class="task-admin-toggle-wrap">
          <span class="task-status-lbl">${t.enabled ? 'Enabled' : 'Disabled'}</span>
          <label class="excl-toggle" onclick="A.toggleTask(${i})" style="cursor:pointer">
            <div class="excl-toggle-track${t.enabled ? ' excl-on' : ''}" id="taskTrack${i}">
              <div class="excl-toggle-thumb"></div>
            </div>
          </label>
        </div>
      </div>

      <!-- Editable fields -->
      <div class="task-admin-fields">
        <div class="inp-group">
          <label class="inp-label">Title</label>
          <input class="inp" id="tTitle${i}" value="${t.title}">
        </div>
        ${!isStreak ? `<div class="inp-group">
          <label class="inp-label">Credits earned</label>
          <input class="inp" id="tCredits${i}" type="number" min="1" max="100" value="${t.creditsEarned || 1}">
        </div>` : ''}
        <div class="inp-group">
          <label class="inp-label">Description (shown to users)</label>
          <input class="inp" id="tDesc${i}" value="${t.desc}">
        </div>
        ${isSocial ? `
        <div class="inp-group">
          <label class="inp-label">Social URL (opens when user taps task)</label>
          <input class="inp" id="tUrl${i}" value="${t.url || ''}" placeholder="https://…">
        </div>` : ''}
        ${(isAction || isWatchAd) && t.cooldownMinutes !== undefined ? `
        <div class="inp-group">
          <label class="inp-label">Cooldown in minutes (0 = unlimited, 1440 = once per day)</label>
          <input class="inp" id="tCooldown${i}" type="number" min="0"
            value="${t.cooldownMinutes}" placeholder="0">
        </div>` : ''}
        ${isStreak ? `
        <div class="fg2">
          <div class="inp-group">
            <label class="inp-label">Cycle length (days)</label>
            <input class="inp" id="tMaxStreak${i}" type="number" min="1" max="30" value="${t.maxStreak || 7}">
          </div>
          <div class="inp-group">
            <label class="inp-label">Bonus on day</label>
            <input class="inp" id="tBonusDay${i}" type="number" min="1" max="30" value="${t.streakBonusDay || 7}">
          </div>
        </div>
        <div class="fg2">
          <div class="inp-group">
            <label class="inp-label">Credits per day</label>
            <input class="inp" id="tCredits${i}" type="number" min="1" max="100" value="${t.creditsPerDay || 1}">
          </div>
          <div class="inp-group">
            <label class="inp-label">Bonus credits (extra on bonus day)</label>
            <input class="inp" id="tBonusCredits${i}" type="number" min="0" max="100" value="${t.streakBonusCredits ?? 2}">
          </div>
        </div>
        <div class="streak-preview-note">
          Example: Day 7 = +${t.creditsPerDay || 1} daily + ${t.streakBonusCredits ?? 2} bonus = ${(t.creditsPerDay || 1) + (t.streakBonusCredits ?? 2)} total credits. Streak resets to Day 1.
        </div>` : ''}
      </div>
    </div>`
  }).join('')

  return `<div class="apanel${S.aTab === 'tasks' ? ' vis' : ''}">

    <!-- ── Header ── -->
    <div class="tasks-admin-header">
      <div>
        <div class="p-title" style="font-size:1.2rem">Credits &amp; Tasks</div>
        <div class="p-sub">Control what tasks users can complete to earn episode credits</div>
      </div>
      <div class="tasks-header-btns">
        <button class="btn btn-outline btn-sm" onclick="A.resetTasksConfig()">
          Reset Defaults
        </button>
        <button class="btn btn-red btn-sm" onclick="A.saveTasksConfig()" id="saveTasksBtnTop">
          Save Changes
        </button>
      </div>
    </div>

    <!-- ── Task rows ── -->
    <div class="task-admin-list">${taskRows}</div>

    <!-- ── Tip ── -->
    <div class="task-admin-note">
      <strong>Tips:</strong>
      Toggle a task off to hide it from users without deleting it.
      Social tasks open the URL then award credits on user confirmation.
      Changes only apply after clicking <strong>Save Changes</strong>.
    </div>

    <!-- ── Sticky bottom save bar ── -->
    <div class="tasks-save-bar" id="tasksSaveBar">
      <div class="tasks-save-bar-inner">
        <div class="tasks-save-info">
          <span class="tasks-save-dot"></span>
          Unsaved changes
        </div>
        <div style="display:flex;gap:10px">
          <button class="btn btn-outline btn-sm" onclick="A.resetTasksConfig()">
            Discard
          </button>
          <button class="btn btn-red btn-sm" onclick="A.saveTasksConfig()">
            Save Changes
          </button>
        </div>
      </div>
    </div>

  </div>`
}

function _typeLabel(type) {
  const map = {
    streak:   'Daily Streak',
    watch_ad: 'Watch Video',
    social:   'Social Follow',
    action:   'Action Task',
  }
  return map[type] || type
}
