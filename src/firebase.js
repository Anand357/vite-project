// src/firebase.js
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import {
  getFirestore,
  enableMultiTabIndexedDbPersistence,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCeCGep-Hh8yY2mXSHc2IWLPEJIB1uQIaY',
  authDomain: 'drama3-d81d9.firebaseapp.com',
  projectId: 'drama3-d81d9',
  storageBucket: 'drama3-d81d9.firebasestorage.app',
  messagingSenderId: '807928634816',
  appId: '1:807928634916:web:bfaa56c93e0210c6d182b1',
  measurementId: 'G-FXY2R6W4XX',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const ADMIN_EMAIL = 'admin@dramaflow.com'

// Enable offline persistence (cached reads survive network loss)
enableMultiTabIndexedDbPersistence(db).catch(err => {
  if (err.code === 'failed-precondition') {
    // Multiple tabs open — persistence only in one tab at a time
    console.info('[DramaFlow] Offline persistence limited to one tab')
  } else if (err.code === 'unimplemented') {
    // Browser doesn't support it (rare)
    console.info('[DramaFlow] Offline persistence not supported')
  }
})

// Google provider — configured once, reused everywhere
export const googleProvider = new GoogleAuthProvider()
googleProvider.addScope('profile')
googleProvider.addScope('email')
// Always show account picker even if user is already signed in
googleProvider.setCustomParameters({ prompt: 'select_account' })
