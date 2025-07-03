"use client"

import { useRouter } from "next/navigation"
import { Zap, Shield, Smartphone } from "lucide-react"

const features = [
    {
        icon: Zap,
        title: "Rápido",
        description: "Velocidad extrema en cada acción",
    },
    {
        icon: Shield,
        title: "Seguro",
        description: "Protección total de tus datos",
    },
    {
        icon: Smartphone,
        title: "Simple",
        description: "Fácil de usar en cualquier dispositivo",
    },
]

export default function Features() {
    const router = useRouter()

    const goToLogin = () => {
        router.push("/login")
    }
    return (
        <section id="features" className="ladico-section bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        ¿Por qué <span className="text-indigo-600">Ladico</span>?
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="ladico-card p-8 text-center hover:scale-105 transition-transform">
                            <div className="w-20 h-20 bg-indigo-100 rounded-2xl border-2 border-indigo-200 flex items-center justify-center mx-auto mb-6">
                                <feature.icon className="h-10 w-10 text-indigo-600" />
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                            <p className="text-gray-600 text-lg">{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* Simple CTA */}
                <div className="text-center mt-16">
                    <div className="ladico-card p-12 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-100">
                        <h3 className="text-3xl font-bold text-gray-900 mb-6">Listo para comenzar</h3>
                        <button
                            onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
                            className="ladico-button text-xl px-12 py-5"
                        >
                            Empezar ahora
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
