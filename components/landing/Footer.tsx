"use client"

import { Github, Twitter, Linkedin, Mail, Zap } from "lucide-react"

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center border-2 border-indigo-400">
                                <Zap className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-3xl font-bold">Ladico</span>
                        </div>
                        <p className="text-gray-400 mb-8 max-w-md leading-relaxed">
                            Transformando la manera en que interactúas con la tecnología.
                        </p>
                        <p className="text-gray-400 mb-8 max-w-md leading-relaxed">
                            {currentYear} Ladico. Todos los derechos reservados.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
