// Loaded on demand (dynamic import) so the app stays small when sync is not configured.
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as fbSignOut, onAuthStateChanged } from 'firebase/auth'
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager, doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore'

const env = import.meta.env
const app = initializeApp({
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || `${env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  appId: env.VITE_FIREBASE_APP_ID,
})
const auth = getAuth(app)
// Offline-first: writes made without a connection are sent when the phone is back online.
const db = initializeFirestore(app, { localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }) })

export const watchAuth = cb => onAuthStateChanged(auth, u => cb(u ? { uid: u.uid, name: u.displayName, email: u.email, photo: u.photoURL } : null))
export const signIn = () => signInWithPopup(auth, new GoogleAuthProvider())
export const signOut = () => fbSignOut(auth)

/** Listen to this user's progress document. `cb` gets the progress object, or null if none exists yet. */
export const watchProgress = (uid, cb, onError) =>
  onSnapshot(doc(db, 'users', uid), snap => cb(snap.exists() ? snap.data().progress || null : null), onError)

export const saveProgress = (uid, progress) =>
  setDoc(doc(db, 'users', uid), { progress, updatedAt: serverTimestamp() })
