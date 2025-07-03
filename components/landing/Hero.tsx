"use client"

export default function Hero() {
    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
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
                        <button onClick={() => scrollTo("contacto")} className="ladico-button-outline">
                            Contactar
                        </button>
                    </div>
                </div>

                {/* Simple Visual */}
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                    <div className="h-20 bg-indigo-100 rounded-2xl border-2 border-indigo-200 animate-float"></div>
                    <div
                        className="h-20 bg-purple-100 rounded-2xl border-2 border-purple-200 animate-float"
                        style={{ animationDelay: "1s" }}
                    ></div>
                    <div
                        className="h-20 bg-blue-100 rounded-2xl border-2 border-blue-200 animate-float"
                        style={{ animationDelay: "2s" }}
                    ></div>
                </div>
            </div>
        </section>
    )
}
