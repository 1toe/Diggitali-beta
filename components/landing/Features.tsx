"use client"

import { Zap, Shield, Smartphone, Users, BarChart3, Sparkles, Trophy } from "lucide-react"

const features = [
    {
        icon: Trophy,
        title: "Marco Europeo DigComp 2.1",
        description: "Basado en el marco oficial de la Comisión Europea para competencias digitales de ciudadanos",
        color: "from-yellow-400 to-orange-500",
        borderColor: "border-yellow-200",
        bgColor: "bg-yellow-50",
    },
    {
        icon: Zap,
        title: "Resultados Inmediatos",
        description: "Optimiza tu tiempo con respuestas rápidas y precisas. Eficiencia en cada interacción.",
        color: "from-yellow-400 to-orange-500",
        borderColor: "border-yellow-200",
        bgColor: "bg-yellow-50",
    },
    {
        icon: Shield,
        title: "Seguridad Avanzada",
        description: "Protección para tus datos. Tu privacidad es nuestra prioridad.",
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
            </div>
        </section>
    )
}
