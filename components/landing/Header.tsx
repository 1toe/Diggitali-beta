"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
        setIsMenuOpen(false)
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b-2 border-gray-100">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="text-3xl font-bold text-indigo-600 bg-white px-6 py-2 rounded-2xl border-2 border-indigo-100">
                        Ladico
                    </div>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex space-x-2">
                        <button
                            onClick={() => scrollTo("inicio")}
                            className="px-6 py-3 rounded-xl hover:bg-gray-100 transition-all"
                        >
                            Inicio
                        </button>
                        <button
                            onClick={() => scrollTo("features")}
                            className="px-6 py-3 rounded-xl hover:bg-gray-100 transition-all"
                        >
                            Features
                        </button>
                        <button
                            onClick={() => scrollTo("contacto")}
                            className="px-6 py-3 rounded-xl hover:bg-gray-100 transition-all"
                        >
                            Contacto
                        </button>
                    </nav>

                    {/* CTA */}
                    <button onClick={() => scrollTo("contacto")} className="hidden md:block ladico-button">
                        Comenzar
                    </button>

                    {/* Mobile Menu */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-3 rounded-xl border-2 border-gray-200 bg-white"
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div className="md:hidden pb-6">
                        <div className="bg-white rounded-2xl border-2 border-gray-100 p-4 space-y-2">
                            <button
                                onClick={() => scrollTo("inicio")}
                                className="block w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50"
                            >
                                Inicio
                            </button>
                            <button
                                onClick={() => scrollTo("features")}
                                className="block w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50"
                            >
                                Features
                            </button>
                            <button
                                onClick={() => scrollTo("contacto")}
                                className="block w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50"
                            >
                                Contacto
                            </button>
                            <button onClick={() => scrollTo("contacto")} className="w-full ladico-button mt-4">
                                Comenzar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}
