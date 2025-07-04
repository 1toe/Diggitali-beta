"use client"

import { useState, useEffect } from "react"
import { Menu, X, Zap, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import Image from "next/image"

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const { user, userData } = useAuth()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
        setIsMenuOpen(false)
    }
    const router = useRouter()

    const goToLogin = () => {
        router.push("/login")
    }

    const goToDashboard = () => {
        router.push("/dashboard")
    }

    // Determinar el texto a mostrar en el botón de usuario
    const userDisplayName = userData?.name || user?.displayName || user?.email || "Usuario"

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-indigo-800/95 backdrop-blur-md shadow-lg border-b-2 border-indigo-700 text-white" : "bg-indigo-700/90 backdrop-blur-sm border-b border-indigo-600 text-white"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div 
                        className="flex items-center space-x-3 bg-white/20 px-6 py-3 rounded-2xl border-2 border-indigo-300/50 shadow-md hover:bg-white/30 transition-all"
                        onClick={() => scrollTo('inicio')}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="w-9 h-9 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-inner">
                            <Zap className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white">Ladico</span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-3">
                        {["Inicio", "Características"].map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollTo(item.toLowerCase().replace("í", "i"))}
                                className="px-5 py-2.5 rounded-xl hover:bg-indigo-900/40 text-white hover:shadow-sm transition-all font-medium"
                            >
                                {item}
                            </button>
                        ))}
                        {user && (
                            <button
                                onClick={goToDashboard}
                                className="px-5 py-2.5 rounded-xl bg-white/20 text-white font-medium border border-white/30 hover:bg-white/30 transition-all"
                            >
                                Dashboard
                            </button>
                        )}
                    </nav>


                    {/* CTA o Usuario */}
                    {user ? (
                        <div onClick={goToDashboard} className="hidden md:flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white cursor-pointer hover:shadow-md hover:from-indigo-600 hover:to-purple-600 transition-all">
                            <User className="h-5 w-5 text-white" />
                            <span className="font-medium">{userDisplayName}</span>
                        </div>
                    ) : (
                        <button onClick={goToLogin} className="hidden md:block px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:shadow-md hover:from-indigo-600 hover:to-purple-600 transition-all">
                            Comenzar
                        </button>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-3 rounded-xl border-2 border-indigo-300/50 bg-white/20 hover:bg-white/30 transition-all"
                    >
                        {isMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden pb-6">
                        <div className="bg-indigo-800 rounded-2xl border-2 border-indigo-600 p-6 space-y-3 shadow-lg">
                            {["Inicio", "Características"].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => scrollTo(item.toLowerCase().replace("í", "i"))}
                                    className="block w-full text-left px-4 py-3 rounded-xl text-white hover:bg-indigo-700 border-2 border-transparent hover:border-indigo-600 transition-all"
                                >
                                    {item}
                                </button>
                            ))}
                            {user ? (
                                <>
                                    <button
                                        onClick={goToDashboard}
                                        className="block w-full text-left px-4 py-3 rounded-xl bg-white/20 text-white font-medium border-2 border-indigo-500/50 hover:bg-white/30 transition-all"
                                    >
                                        Dashboard
                                    </button>
                                    <div onClick={goToDashboard} className="flex items-center space-x-2 px-4 py-3 mt-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white border-2 border-transparent cursor-pointer hover:shadow-md transition-all">
                                        <User className="h-5 w-5 text-white" />
                                        <span className="font-medium">{userDisplayName}</span>
                                    </div>
                                </>
                            ) : (
                                <button onClick={goToLogin} className="w-full px-6 py-3 mt-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:shadow-md hover:from-indigo-600 hover:to-purple-600 transition-all">
                                    Comenzar gratis
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}
