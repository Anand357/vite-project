// src/store.js
export const S = {
  user: null,
  isAdmin: false,
  isSuperAdmin: false,
  userRole: 'user',
  adminLevel: 0,
  userBlocked: false,
  page: 'home',

  // app-level state
  appLoading: true,       // true until first loadData() completes
  appError: null,         // string | null — shown in error banner
  isOffline: false,       // true when navigator.onLine is false

  // content
  content: [],
  sections: [],
  sectionConfigs: null,
  trendingIds: [],
  bannerContentId: null,

  // user data
  myList: [],
  watchHistory: {},
  liked: [],
  sub: 'free',
  ratings: {},
  adCredits: 0,
  adCreditsUsed: {},

  // streak & tasks
  loginStreak: 0,           // consecutive days logged in
  lastLoginDate: null,      // 'YYYY-MM-DD' string
  completedTasks: {},       // { [taskId]: 'YYYY-MM-DD' } — when task was last completed
  totalCreditsEarned: 0,    // lifetime total

  // notifications
  notifications: [],

  // admin
  awardModal: null,    // { uid, name, currentCredits } | null
  allUsers: [],
  userFilter: 'all',
  userSearch: '',
  usersSearch: '',
  chatSearch: '',
  aTab: 'content',
  expandedUserId: null,   // which user row is expanded in users panel
  aEditId: null,
  aShowForm: false,
  tmpTrending: [],
  tmpSections: [],
  tmpSectionConfigs: [],
  expandedSection: -1,

  // admin tasks config (loaded from Firestore settings/tasks)
  tasksConfig: null,        // null = use defaults

  // player
  pc: null,
  pEp: 0,
  pPaywall: null,
  pShowLib: false,
  pShowComments: false,
  pComments: [],
  pMuted: false,
  pSpeed: 1,
  pAutoplay: true,
  pShowRating: false,
  pCountdownActive: false,
  pCountdownSec: 5,

  // credit player (inline on Credits page)
  adPlaying: false,
  adContext: null,
  adTimeLeft: 30,
  adCanSkip: false,
  adCompleted: false,
  adSource: 'paywall',      // 'paywall' | 'credits_page'

  // detail page
  detailId: null,   // content id for the detail page
  detailFrom: 'home', // which page to go back to

  // admin notifications
  notifHistory: [],       // sent notification history
  notifAudience: 'all',   // selected audience in compose form

  // admin chat
  chatMessages: [],       // messages for open chat thread
  chatUid: null,          // uid of user whose chat is open
  chatInput: '',          // draft message

  // admin global group chat
  globalChatMessages: [], // messages in the admin group channel
  globalChatInput: '',    // draft for global chat
  globalChatTab: 'direct', // 'direct' | 'global'

  // activity / audit log
  activityLog: [],        // loaded admin actions log
  actLogFilter: 'all',    // filter: all | sub | credits | block | admin

  // promo popup
  promoConfig: null,     // loaded from Firestore settings/promo
  showPromo: false,      // is popup currently visible

  // search
  sq: '',
  sg: '',
  sSort: 'popular',
  sGenres: [],
  searchPage: 0,    // current page index for search pagination

  // library filters
  libSearch: '',
  libGenre:  '',
  libSort:   'default',

  // subscribe plan modal
  showPlanModal: null,   // null | 'free' | 'standard' | 'premium'

  // user-side admin chat inbox
  userChatMessages: [],
  userChatUnread: false,
  showUserChat: false,   // is user chat panel open
  userChatInput: '',
}

const listeners = new Set()
export function subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn) }
export function notify() { listeners.forEach(fn => fn()) }
export function setState(patch) { Object.assign(S, patch); notify() }
