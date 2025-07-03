"use client"

import { useRouter } from "next/navigation"

export default function Hero() {
    const router = useRouter()
    
    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    }

    const goToLogin = () => {
        router.push("/login")
    }

    return (
        <section id="inicio" className="min-h-screen flex items-center justify-center ladico-section pt-32">
            <div className="max-w-4xl mx-auto text-center">
                {/* Main Content */}
                <div className="ladico-card p-12 mb-8">
                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8">
                        <span className="text-indigo-600">Ladico</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                        La plataforma más simple para transformar tu experiencia digital
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button onClick={() => scrollTo("features")} className="ladico-button">
                            Ver características
                        </button>
                        <button onClick={goToLogin} className="ladico-button-outline">
                            Comenzar
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
