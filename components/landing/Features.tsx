"use client"

import { Zap, Shield, Smartphone, Users, BarChart3, Sparkles } from "lucide-react"

const features = [
    {
        icon: Zap,
        title: "Velocidad Extrema",
        description: "Rendimiento optimizado que supera expectativas. Cada acción es instantánea.",
        color: "from-yellow-400 to-orange-500",
        borderColor: "border-yellow-200",
        bgColor: "bg-yellow-50",
    },
    {
        icon: Shield,
        title: "Seguridad Avanzada",
        description: "Protección empresarial para tus datos. Tu privacidad es nuestra prioridad.",
        color: "from-green-400 to-emerald-500",
        borderColor: "border-green-200",
        bgColor: "bg-green-50",
    },
    {
        icon: Smartphone,
        title: "Diseño Responsivo",
        description: "Perfecta adaptación a cualquier dispositivo. Experiencia consistente siempre.",
        color: "from-blue-400 to-cyan-500",
        borderColor: "border-blue-200",
        bgColor: "bg-blue-50",
    },
    {
        icon: Users,
        title: "Colaboración Fluida",
        description: "Trabajo en equipo sin fricciones. Herramientas que potencian la productividad.",
        color: "from-purple-400 to-pink-500",
        borderColor: "border-purple-200",
        bgColor: "bg-purple-50",
    },
    {
        icon: BarChart3,
        title: "Analytics Inteligente",
        description: "Insights profundos sobre rendimiento. Decisiones basadas en datos reales.",
        color: "from-indigo-400 to-purple-500",
        borderColor: "border-indigo-200",
        bgColor: "bg-indigo-50",
    },
    {
        icon: Sparkles,
        title: "IA Integrada",
        description: "Inteligencia artificial que aprende. Automatización para tareas repetitivas.",
        color: "from-pink-400 to-rose-500",
        borderColor: "border-pink-200",
        bgColor: "bg-pink-50",
    },
]

export default function Features() {
    return (
        <section id="caracteristicas" className="ladico-section bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center space-x-2 bg-indigo-50 border-2 border-indigo-100 rounded-2xl px-6 py-3 mb-6">
                        <Sparkles className="h-5 w-5 text-indigo-600" />
                        <span className="text-indigo-600 font-medium">Características principales</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Todo lo que necesitas en <span className="text-indigo-600">una plataforma</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Descubre las funcionalidades que hacen de Ladico la elección perfecta para transformar tu flujo de trabajo
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="ladico-card p-8 group hover:scale-105 transition-all duration-300"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div
                                className={`ladico-feature-icon ${feature.bgColor} ${feature.borderColor} mb-6 group-hover:scale-110 transition-transform duration-300`}
                            >
                                <feature.icon className="h-8 w-8 text-gray-700" />
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* Integration Section */}
                <div className="ladico-card p-12 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-100">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-6">Integración perfecta</h3>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                Conecta Ladico con tus herramientas favoritas. Más de 100 integraciones disponibles para optimizar tu
                                flujo de trabajo.
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                {["API REST", "Webhooks", "SDK", "Plugins"].map((tech) => (
                                    <div
                                        key={tech}
                                        className="bg-white border-2 border-indigo-100 rounded-2xl px-4 py-3 text-center font-medium text-indigo-700 hover:border-indigo-200 transition-all"
                                    >
                                        {tech}
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
                                className="ladico-button-primary"
                            >
                                Ver todas las integraciones
                            </button>
                        </div>

                        <div className="relative">
                            <div className="w-full h-80 bg-white rounded-3xl border-2 border-indigo-100 flex items-center justify-center shadow-sm">
                                <div className="relative">
                                    {/* Central hub */}
                                    <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl flex items-center justify-center shadow-lg border-2 border-indigo-200">
                                        <span className="text-white font-bold text-lg">API</span>
                                    </div>

                                    {/* Connected services */}
                                    <div className="absolute -top-12 -left-20 w-16 h-16 bg-blue-100 rounded-2xl border-2 border-blue-200 flex items-center justify-center shadow-md">
                                        <div className="w-8 h-8 bg-blue-500 rounded-xl"></div>
                                    </div>
                                    <div className="absolute -top-12 -right-20 w-16 h-16 bg-green-100 rounded-2xl border-2 border-green-200 flex items-center justify-center shadow-md">
                                        <div className="w-8 h-8 bg-green-500 rounded-xl"></div>
                                    </div>
                                    <div className="absolute -bottom-12 -left-20 w-16 h-16 bg-yellow-100 rounded-2xl border-2 border-yellow-200 flex items-center justify-center shadow-md">
                                        <div className="w-8 h-8 bg-yellow-500 rounded-xl"></div>
                                    </div>
                                    <div className="absolute -bottom-12 -right-20 w-16 h-16 bg-pink-100 rounded-2xl border-2 border-pink-200 flex items-center justify-center shadow-md">
                                        <div className="w-8 h-8 bg-pink-500 rounded-xl"></div>
                                    </div>

                                    {/* Connection lines */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-32 h-32 border-2 border-dashed border-indigo-200 rounded-full animate-pulse-border"></div>
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
