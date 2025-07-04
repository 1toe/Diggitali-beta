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
                            Transformando la manera en que interactúas con la tecnología. Una experiencia única, intuitiva y poderosa
                            para profesionales y equipos de todo el mundo.
                        </p>
                        <div className="flex space-x-4">
                            {[
                                { icon: Github, href: "#" },
                                { icon: Twitter, href: "#" },
                                { icon: Linkedin, href: "#" },
                                { icon: Mail, href: "#" },
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="w-12 h-12 bg-gray-800 rounded-2xl border-2 border-gray-700 flex items-center justify-center hover:bg-indigo-600 hover:border-indigo-500 transition-all"
                                >
                                    <social.icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="font-bold mb-6 text-lg">Producto</h4>
                        <ul className="space-y-3">
                            {["Características", "Integraciones", "API", "Seguridad", "Precios"].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white transition-colors py-2 px-3 rounded-xl hover:bg-gray-800 block border-2 border-transparent hover:border-gray-700"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-bold mb-6 text-lg">Empresa</h4>
                        <ul className="space-y-3">
                            {["Acerca de", "Blog", "Carreras", "Prensa", "Contacto"].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white transition-colors py-2 px-3 rounded-xl hover:bg-gray-800 block border-2 border-transparent hover:border-gray-700"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="border-t-2 border-gray-800 pt-12 mb-12">
                    <div className="max-w-2xl mx-auto text-center">
                        <h3 className="text-2xl font-bold mb-4">Mantente actualizado</h3>
                        <p className="text-gray-400 mb-8">
                            Recibe las últimas noticias, actualizaciones y consejos directamente en tu bandeja de entrada.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="tu@email.com"
                                className="flex-1 px-6 py-4 bg-gray-800 border-2 border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none"
                            />
                            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-4 px-8 rounded-2xl transition-all border-2 border-transparent">
                                Suscribirse
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t-2 border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-gray-400">© {currentYear} Ladico. Todos los derechos reservados.</p>
                    <div className="flex space-x-6">
                        {["Privacidad", "Términos", "Cookies"].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors py-2 px-4 rounded-xl border-2 border-transparent hover:border-gray-700"
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
