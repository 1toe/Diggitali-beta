"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import AuthForm from "@/components/AuthForm"

export default function LoginPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      // Si el usuario ya está autenticado, redirigir al dashboard
      router.push("/dashboard")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (user) {
    return null // Evitar mostrar el formulario mientras se redirige
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-indigo-600 mb-2">Ladico</h1>
          <h2 className="text-xl text-gray-900 mb-8">
            Desarrolla tus competencias digitales
          </h2>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <AuthForm />
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => router.push("/")}
          className="text-sm text-indigo-600 hover:text-indigo-500"
        >
          ← Volver al inicio
        </button>
      </div>
    </div>
  )
}
