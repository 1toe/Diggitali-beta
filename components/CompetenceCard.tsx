"use client"

import type { Competence } from "@/types"
import { useRouter } from "next/navigation"

interface CompetenceCardProps {
  competence: Competence
  userProgress: number
  questionCount?: number
}

export default function CompetenceCard({ competence, userProgress, questionCount = 0 }: CompetenceCardProps) {
  const router = useRouter()

  const handleStartTest = () => {
    router.push(`/test/${competence.id}`)
  }
  
  // Determinar el nivel basado en el progreso
  const getProgressLevel = () => {
    if (userProgress === 100) return "Completado"
    if (userProgress >= 66) return "Avanzado"
    if (userProgress >= 33) return "Intermedio"
    if (userProgress > 0) return "Básico"
    return "Sin iniciar"
  }
  
  // Color basado en el nivel de progreso
  const getProgressColor = () => {
    if (userProgress === 100) return "#10b981" // Verde para completado
    if (userProgress >= 66) return "#6366f1" // Púrpura para avanzado
    if (userProgress >= 33) return "#f59e0b" // Naranja para intermedio
    return "#6366f1" // Púrpura predeterminado
  }

  return (
    <div className="Ladico-card p-6 cursor-pointer hover:scale-105 transition-transform" onClick={handleStartTest}>
      <div className="mb-4 flex justify-between items-center">
        <div
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${competence.color}`}
        >
          {competence.dimension.toUpperCase()}
        </div>
        
        {userProgress > 0 && (
          <div className="text-xs font-medium text-gray-600">
            {getProgressLevel()}
          </div>
        )}
      </div>

      <div className={`h-32 rounded-lg bg-gradient-to-br ${competence.color} mb-4 flex items-center justify-center`}>
        <h3 className="text-white font-bold text-center px-4 leading-tight">{competence.name}</h3>
      </div>

      <div className="flex items-center justify-center mb-4">
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="2"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={getProgressColor()}
              strokeWidth="2"
              strokeDasharray={`${userProgress}, 100`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-semibold text-gray-600">
              {userProgress > 0 ? `${userProgress}%` : "NIVEL"}
            </span>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600 text-center leading-relaxed">{competence.description}</p>
      
      {questionCount > 0 && (
        <div className="mt-3 text-xs text-center text-gray-500">
          <span className="bg-gray-100 px-2 py-1 rounded-full">
            {questionCount} preguntas disponibles
          </span>
        </div>
      )}
    </div>
  )
}
