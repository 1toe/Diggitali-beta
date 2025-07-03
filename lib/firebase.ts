import { initializeApp, getApps, type FirebaseApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, type Auth } from "firebase/auth"
import { getFirestore, type Firestore } from "firebase/firestore"
import { getAnalytics, type Analytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyADgCJZhie5XzhovxDVVQ6oySlmO7ADDgA",
  authDomain: "ludicocos-e4bcc.firebaseapp.com",
  projectId: "ludicocos-e4bcc",
  storageBucket: "ludicocos-e4bcc.firebasestorage.app",
  messagingSenderId: "251212234614",
  appId: "1:251212234614:web:f52d46396a1374b66cc457",
  measurementId: "G-RT3XB7QGP0",
}

// Initialize Firebase only if it hasn't been initialized
let app: FirebaseApp | undefined
try {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig)
  } else {
    app = getApps()[0]
  }
} catch (error) {
  console.error("Error initializing Firebase app:", error)
}

// Initialize Firebase services with error handling
let auth: Auth | undefined
let db: Firestore | undefined
let analytics: Analytics | null = null
let provider: GoogleAuthProvider | undefined

try {
  if (app) {
    auth = getAuth(app)
    db = getFirestore(app)

    // Initialize Analytics only in browser environment
    if (typeof window !== "undefined") {
      analytics = getAnalytics(app)
    }

    // Configure Google provider
    provider = new GoogleAuthProvider()
    provider.setCustomParameters({
      prompt: "select_account",
    })
  }
} catch (error) {
  console.error("Error initializing Firebase services:", error)
}

export { auth, db, analytics, provider }
export default app
