"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import AuthForm from "@/components/AuthForm"

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !loading && user) {
      router.push("/dashboard")
    }
  }, [user, loading, router, mounted])

  // Show loading while mounting or while auth is loading
  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center Ladico-gradient">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Cargando plataforma...</p>
        </div>
      </div>
    )
  }

  // If user is logged in, show loading while redirecting
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center Ladico-gradient">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Redirigiendo al dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen Ladico-gradient flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Ladico</h1>
          <p className="text-white/80">Desarrolla tus competencias digitales</p>
        </div>
        <AuthForm />
      </div>
    </div>
  )
}
