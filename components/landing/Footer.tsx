"use client"

export default function Footer() {
    return (
        <footer className="bg-white border-t-2 border-gray-100">
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="text-center">
                    <div className="ladico-card p-8 mb-8">
                        <h3 className="text-2xl font-bold text-indigo-600 mb-4">Ladico</h3>
                        <p className="text-gray-600 mb-6">Transformando la experiencia digital</p>

                        <div className="flex justify-center space-x-4">
                            <div className="w-12 h-12 bg-indigo-100 rounded-2xl border-2 border-indigo-200 flex items-center justify-center hover:bg-indigo-200 transition-colors cursor-pointer">
                                <span className="text-indigo-600 font-bold">T</span>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-2xl border-2 border-purple-200 flex items-center justify-center hover:bg-purple-200 transition-colors cursor-pointer">
                                <span className="text-purple-600 font-bold">L</span>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-2xl border-2 border-blue-200 flex items-center justify-center hover:bg-blue-200 transition-colors cursor-pointer">
                                <span className="text-blue-600 font-bold">G</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 text-gray-600">
                        <div className="bg-gray-100 rounded-2xl border-2 border-gray-200 px-6 py-3">© 2024 Ladico</div>
                        <div className="bg-gray-100 rounded-2xl border-2 border-gray-200 px-6 py-3">Privacidad</div>
                        <div className="bg-gray-100 rounded-2xl border-2 border-gray-200 px-6 py-3">Términos</div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
