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
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-sm border-b-2 border-gray-100" : "bg-transparent border-b border-indigo-100/30"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div 
                        className="flex items-center space-x-3 bg-white px-6 py-3 rounded-2xl border-2 border-indigo-100 shadow-sm"
                        onClick={() => scrollTo('inicio')}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                            <Zap className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-indigo-600">Ladico</span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-2">
                        {["Inicio", "Características"].map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollTo(item.toLowerCase().replace("í", "i"))}
                                className="px-6 py-3 rounded-xl hover:bg-white hover:border-2 hover:border-gray-100 transition-all font-medium"
                            >
                                {item}
                            </button>
                        ))}
                    </nav>


                    {/* CTA o Usuario */}
                    {user ? (
                        <div onClick={goToDashboard} className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-xl bg-white border-2 border-indigo-100 cursor-pointer hover:border-indigo-300 transition-all">
                            <User className="h-5 w-5 text-indigo-500" />
                            <span className="font-medium text-indigo-700">{userDisplayName}</span>
                        </div>
                    ) : (
                        <button onClick={goToLogin} className="hidden md:block ladico-button">
                            Comenzar
                        </button>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-3 rounded-xl border-2 border-gray-200 bg-white hover:border-indigo-200 transition-all"
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden pb-6">
                        <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 space-y-3 shadow-lg">
                            {["Inicio", "Características"].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => scrollTo(item.toLowerCase().replace("í", "i"))}
                                    className="block w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 border-2 border-transparent hover:border-gray-100 transition-all"
                                >
                                    {item}
                                </button>
                            ))}
                            {user ? (
                                <div onClick={goToDashboard} className="flex items-center space-x-2 px-4 py-3 mt-4 rounded-xl bg-gray-50 border-2 border-gray-100 cursor-pointer hover:border-indigo-300 transition-all">
                                    <User className="h-5 w-5 text-indigo-500" />
                                    <span className="font-medium text-indigo-700">{userDisplayName}</span>
                                </div>
                            ) : (
                                <button onClick={goToLogin} className="w-full ladico-button-primary mt-4">
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
