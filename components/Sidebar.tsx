"use client"

import { useAuth } from "@/contexts/AuthContext"
import { Home, Award, BookOpen, HelpCircle, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Competencias", href: "/dashboard", icon: Award },
]

export default function Sidebar() {
  const { logout, userData } = useAuth()
  const pathname = usePathname()

  return (
    <div className="fixed inset-y-0 left-0 w-64 Ladico-sidebar">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 px-4">
          <h1 className="text-2xl font-bold text-white">Ladico</h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive ? "bg-white/20 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/20">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-semibold">
              {userData?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">{userData?.name}</p>
              <p className="text-xs text-white/70">{userData?.email}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Cerrar sesión
          </button>

        </div>
      </div>
    </div>
  )
}
