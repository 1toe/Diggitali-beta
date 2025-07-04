"use client"

import { ArrowRight, Play, Star } from "lucide-react"

export default function Hero() {
    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <section id="inicio" className="min-h-screen flex items-center justify-center ladico-section pt-32">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Content */}
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8">
                            Transforma tu
                            <span className="block text-indigo-600">experiencia digital</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-2xl">
                            Ladico es la plataforma que simplifica lo complejo y potencia tu productividad con herramientas
                            inteligentes y diseño intuitivo.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <button onClick={() => scrollTo("caracteristicas")} className="ladico-button-primary group">
                                ¿Qué ofrecemos?
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6">
                            <div className="ladico-stat-card">
                                <div className="text-3xl font-bold text-indigo-600 mb-2">15K+</div>
                                <div className="text-gray-600">Usuarios activos</div>
                            </div>
                            <div className="ladico-stat-card">
                                <div className="text-3xl font-bold text-purple-600 mb-2">99.9%</div>
                                <div className="text-gray-600">Uptime</div>
                            </div>
                            <div className="ladico-stat-card">
                                <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                                <div className="text-gray-600">Soporte</div>
                            </div>
                        </div>
                    </div>

                    {/* Visual */}
                    <div className="relative">
                        <div className="ladico-card p-12 bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-100">
                            {/* Main visual */}
                            <div className="relative">
                                <div className="w-full h-80 bg-gradient-to-br from-white to-indigo-50 rounded-3xl border-2 border-indigo-100 flex items-center justify-center mb-8">
                                    <img
                                        src="/ladico.png"
                                        alt="Ladico Logo"
                                        className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg border-2 border-indigo-200"
                                    />
                                </div>

                                {/* Floating cards */}
                                {/* Card 1: Información */}
                                <div
                                    className="absolute -top-6 -right-6 w-28 h-[90px] bg-white rounded-xl shadow-lg animate-float border border-gray-200"
                                    style={{ animationDelay: "1.0s" }}
                                >
                                    <div className="flex flex-col items-center justify-center h-full">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                                            <span className="text-xl">🔍</span>
                                        </div>
                                        <span className="text-gray-700 text-sm">Información</span>
                                    </div>
                                </div>

                                {/* Card 2: Comunicación */}
                                <div
                                    className="absolute -bottom-6 -right-6 w-28 h-[90px] bg-white rounded-xl shadow-lg animate-float border border-gray-200"
                                    style={{ animationDelay: "1.5s" }}
                                >
                                    <div className="flex flex-col items-center justify-center h-full">
                                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                                            <span className="text-xl">💬</span>
                                        </div>
                                        <span className="text-gray-700 text-sm">Comunicación</span>
                                    </div>
                                </div>

                                {/* Card 3: Creación */}
                                <div
                                    className="absolute -bottom-6 -left-6 w-28 h-[90px] bg-white rounded-xl shadow-lg animate-float border border-gray-200"
                                    style={{ animationDelay: "2.0s" }}
                                >
                                    <div className="flex flex-col items-center justify-center h-full">
                                        <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mb-2">
                                            <span className="text-xl">🎨</span>
                                        </div>
                                        <span className="text-gray-700 text-sm">Creación</span>
                                    </div>
                                </div>

                                {/* Card 4: Seguridad */}
                                <div
                                    className="absolute top-1/2 -left-8 w-28 h-[90px] bg-white rounded-xl shadow-lg animate-float border border-gray-200"
                                    style={{ animationDelay: "2.5s" }}
                                >
                                    <div className="flex flex-col items-center justify-center h-full">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                                            <span className="text-xl">🛡️</span>
                                        </div>
                                        <span className="text-gray-700 text-sm">Seguridad</span>
                                    </div>
                                </div>

                                {/* Card 5: Resolución */}
                                <div
                                    className="absolute top-1/4 -right-8 w-28 h-[90px] bg-white rounded-xl shadow-lg animate-float border border-gray-200"
                                    style={{ animationDelay: "3.0s" }}
                                >
                                    <div className="flex flex-col items-center justify-center h-full">
                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                                            <span className="text-xl">⚙️</span>
                                        </div>
                                        <span className="text-gray-700 text-sm">Resolución</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
