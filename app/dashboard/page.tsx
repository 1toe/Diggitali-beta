"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Sidebar from "@/components/Sidebar"
import CompetenceCard from "@/components/CompetenceCard"
import type { Competence } from "@/types"

const competences: Competence[] = [
  {
    id: "1.1",
    code: "1.1",
    name: "Navegar, buscar y filtrar datos, información y contenidos digitales",
    dimension: "Información y alfabetización informacional",
    description:
      "Articular las necesidades de información, buscar datos, información y contenidos en entornos digitales.",
    color: "from-orange-400 to-red-500",
  },
  {
    id: "1.2",
    code: "1.2",
    name: "Evaluar datos, información y contenidos digitales",
    dimension: "Información y alfabetización informacional",
    description: "Analizar, comparar y evaluar de manera crítica la credibilidad y fiabilidad de las fuentes.",
    color: "from-orange-500 to-red-600",
  },
  {
    id: "1.3",
    code: "1.3",
    name: "Gestión de datos, información y contenidos digitales",
    dimension: "Información y alfabetización informacional",
    description: "Gestionar, almacenar y recuperar datos, información y contenidos en entornos digitales.",
    color: "from-red-400 to-pink-500",
  },
  {
    id: "4.1",
    code: "4.1",
    name: "Proteger los dispositivos",
    dimension: "Seguridad",
    description: "Proteger los dispositivos y contenidos digitales, comprender los riesgos y amenazas.",
    color: "from-blue-400 to-purple-500",
  },
  {
    id: "4.2",
    code: "4.2",
    name: "Proteger los datos personales y privacidad",
    dimension: "Seguridad",
    description: "Proteger los datos personales y la privacidad en entornos digitales.",
    color: "from-blue-500 to-purple-600",
  },
  {
    id: "4.3",
    code: "4.3",
    name: "Proteger la salud y el bienestar",
    dimension: "Seguridad",
    description: "Evitar riesgos para la salud y amenazas al bienestar físico y psicológico.",
    color: "from-purple-400 to-indigo-500",
  },
  {
    id: "4.4",
    code: "4.4",
    name: "Proteger el medio ambiente",
    dimension: "Seguridad",
    description: "Tener en cuenta el impacto de las tecnologías digitales sobre el medio ambiente.",
    color: "from-green-400 to-teal-500",
  },
]

export default function Dashboard() {
  const { user, userData, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!user || !userData) return null

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Competencias</h1>
                <p className="text-gray-600">
                  Evalúate a tu propio ritmo en las competencias digitales. Elige una competencia y comienza a ganar
                  Ladico.
                </p>
              </div>

              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white mb-2">
                  <div>
                    <div className="text-2xl font-bold">{userData.LadicoScore}</div>
                    <div className="text-xs">Ladico</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {competences.map((competence) => (
              <CompetenceCard
                key={competence.id}
                competence={competence}
                userProgress={userData.completedCompetences.includes(competence.id) ? 100 : 0}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
