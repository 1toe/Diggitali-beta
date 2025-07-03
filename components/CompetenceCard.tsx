"use client"

import type { Competence } from "@/types"
import { useRouter } from "next/navigation"

interface CompetenceCardProps {
  competence: Competence
  userProgress: number
}

export default function CompetenceCard({ competence, userProgress }: CompetenceCardProps) {
  const router = useRouter()

  const handleStartTest = () => {
    router.push(`/test/${competence.id}`)
  }

  return (
    <div className="Ladico-card p-6 cursor-pointer hover:scale-105 transition-transform" onClick={handleStartTest}>
      <div className="mb-4">
        <div
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${competence.color}`}
        >
          {competence.dimension.toUpperCase()}
        </div>
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
              stroke="#6366f1"
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
    </div>
  )
}
