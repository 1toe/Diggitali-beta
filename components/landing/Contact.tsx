"use client"

import type React from "react"
import { useState } from "react"
import { Send } from "lucide-react"

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        alert("¡Mensaje enviado! Te contactaremos pronto.")
        setFormData({ name: "", email: "", message: "" })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <section id="contacto" className="ladico-section bg-gray-50">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        <span className="text-indigo-600">Contacto</span>
                    </h2>
                    <p className="text-xl text-gray-600">Envíanos un mensaje</p>
                </div>

                <div className="ladico-card p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Tu nombre"
                                required
                                className="ladico-input"
                            />
                        </div>

                        <div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="tu@email.com"
                                required
                                className="ladico-input"
                            />
                        </div>

                        <div>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tu mensaje..."
                                required
                                rows={4}
                                className="ladico-input resize-none"
                            />
                        </div>

                        <button type="submit" className="w-full ladico-button flex items-center justify-center">
                            <Send className="mr-2 h-5 w-5" />
                            Enviar mensaje
                        </button>
                    </form>
                </div>

                {/* Contact Info */}
                <div className="mt-8 text-center">
                    <div className="ladico-card p-6">
                        <div className="space-y-4">
                            <div className="bg-indigo-50 rounded-2xl border-2 border-indigo-100 p-4">
                                <p className="text-indigo-600 font-medium">contacto@ladico.com</p>
                            </div>
                            <div className="bg-purple-50 rounded-2xl border-2 border-purple-100 p-4">
                                <p className="text-purple-600 font-medium">+1 (555) 123-4567</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
