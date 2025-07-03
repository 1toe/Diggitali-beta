"use client"

import { Target, Heart, Lightbulb } from "lucide-react"

export default function About() {
    return (
        <section id="acerca" className="ladico-section">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Content */}
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                            Sobre{" "}
                            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Ladico
                            </span>
                        </h2>

                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Somos un equipo apasionado por crear soluciones tecnológicas que realmente importen. Nuestra misión es
                            simplificar lo complejo y hacer que la tecnología sea accesible para todos.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Target className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Nuestra Misión</h3>
                                    <p className="text-gray-600">
                                        Democratizar el acceso a herramientas tecnológicas avanzadas, haciendo que cada usuario pueda
                                        alcanzar su máximo potencial.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Heart className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Nuestros Valores</h3>
                                    <p className="text-gray-600">
                                        Innovación, transparencia y compromiso con la excelencia. Cada decisión la tomamos pensando en
                                        nuestros usuarios.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Lightbulb className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Nuestra Visión</h3>
                                    <p className="text-gray-600">
                                        Ser la plataforma líder que conecte personas con tecnología, creando un futuro más eficiente y
                                        colaborativo.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Visual */}
                    <div className="relative">
                        {/* Generated about image */}
                        <div className="w-full h-96 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl flex items-center justify-center shadow-xl">
                            <div className="relative">
                                {/* Team representation */}
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl"></div>
                                    <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl"></div>
                                    <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl"></div>
                                    <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl"></div>
                                </div>

                                {/* Connection lines */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-24 h-24 border-4 border-gradient-to-r from-indigo-200 to-purple-200 rounded-full"></div>
                                </div>

                                {/* Center element */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl shadow-lg"></div>
                                </div>
                            </div>
                        </div>

                        {/* Floating stats */}
                        <div className="absolute -top-4 -right-4 ladico-card p-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-indigo-600">5+</div>
                                <div className="text-xs text-gray-600">Años de experiencia</div>
                            </div>
                        </div>

                        <div className="absolute -bottom-4 -left-4 ladico-card p-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600">50+</div>
                                <div className="text-xs text-gray-600">Proyectos completados</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
