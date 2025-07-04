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
                                Explorar características
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button onClick={() => scrollTo("acerca")} className="ladico-button-secondary group">
                                <Play className="mr-2 h-5 w-5" />
                                Ver demo
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
                                    <div className="text-center">
                                        <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg border-2 border-indigo-200">
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center">
                                                <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg"></div>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="h-4 bg-indigo-200 rounded-2xl w-48 mx-auto border border-indigo-300"></div>
                                            <div className="h-3 bg-purple-200 rounded-2xl w-32 mx-auto border border-purple-300"></div>
                                            <div className="h-3 bg-blue-200 rounded-2xl w-40 mx-auto border border-blue-300"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating elements */}
                                <div
                                    className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl shadow-lg animate-float border-2 border-yellow-300"
                                    style={{ animationDelay: "1s" }}
                                ></div>
                                <div
                                    className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl shadow-lg animate-float border-2 border-green-300"
                                    style={{ animationDelay: "2s" }}
                                ></div>
                                <div
                                    className="absolute top-1/2 -left-8 w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-2xl shadow-lg animate-float border-2 border-pink-300"
                                    style={{ animationDelay: "3s" }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
