"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import {
  type User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

interface UserData {
  uid: string
  name: string
  email: string
  age: number
  country: string
  LadicoScore: number
  completedCompetences: string[]
  currentLevel: "basico" | "intermedio" | "avanzado"
}

interface AuthContextType {
  user: User | null
  userData: UserData | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string, age: number, country: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let unsubscribe: (() => void) | undefined

    const initAuth = async () => {
      try {
        // Check if auth is available
        if (!auth) {
          console.error("Firebase Auth not initialized")
          setLoading(false)
          return
        }

        unsubscribe = onAuthStateChanged(auth, async (user) => {
          try {
            if (user) {
              setUser(user)
              // Obtener datos adicionales del usuario
              if (db) {
                const userDoc = await getDoc(doc(db, "users", user.uid))
                if (userDoc.exists()) {
                  setUserData(userDoc.data() as UserData)
                }
              }
            } else {
              setUser(null)
              setUserData(null)
            }
          } catch (error) {
            console.error("Error in auth state change:", error)
          } finally {
            setLoading(false)
          }
        })
      } catch (error) {
        console.error("Error initializing auth:", error)
        setLoading(false)
      }
    }

    // Small delay to ensure Firebase is ready
    const timer = setTimeout(initAuth, 100)

    return () => {
      clearTimeout(timer)
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [])

  const register = async (email: string, password: string, name: string, age: number, country: string) => {
    if (!auth || !db) {
      throw new Error("Firebase services not initialized")
    }

    try {
      // Validar datos de entrada
      if (!email || !password || !name || !age || !country) {
        throw new Error("Todos los campos son requeridos")
      }

      if (password.length < 6) {
        throw new Error("La contraseña debe tener al menos 6 caracteres")
      }

      const { user } = await createUserWithEmailAndPassword(auth, email.trim(), password)

      await updateProfile(user, { displayName: name })

      const userData: UserData = {
        uid: user.uid,
        name,
        email: email.trim(),
        age,
        country,
        LadicoScore: 0,
        completedCompetences: [],
        currentLevel: "basico",
      }

      await setDoc(doc(db, "users", user.uid), userData)
      setUserData(userData)
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    }
  }

  const login = async (email: string, password: string) => {
    if (!auth) {
      throw new Error("Firebase Auth not initialized")
    }

    try {
      // Validar que el email y password no estén vacíos
      if (!email || !password) {
        throw new Error("Email y contraseña son requeridos")
      }

      await signInWithEmailAndPassword(auth, email.trim(), password)
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const logout = async () => {
    if (!auth) {
      throw new Error("Firebase Auth not initialized")
    }

    try {
      await signOut(auth)
    } catch (error) {
      console.error("Logout error:", error)
      throw error
    }
  }

  const value = {
    user,
    userData,
    loading,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
