"use client"

import type { Competence } from "@/types"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface CompetenceCardProps {
  competence: Competence
  userProgress: number
  questionCount?: number
}

export default function CompetenceCard({ competence, userProgress, questionCount = 0 }: CompetenceCardProps) {
  const router = useRouter()
  const hasEnoughQuestions = questionCount >= 3

  const handleStartTest = () => {
    if (hasEnoughQuestions) {
      router.push(`/test/${competence.id}`)
    } 
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
    <Card className="overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
      {/* Cabecera coloreada */}
      <div className={`h-2 bg-gradient-to-r ${competence.color}`}></div>

      <CardContent className="pt-6 px-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{competence.name}</h3>
        <CardDescription className="text-sm text-gray-600 mb-4 line-clamp-3">
          {competence.description}
        </CardDescription>

        {/* Alerta si no hay suficientes preguntas */}
        {!hasEnoughQuestions && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              No hay suficientes preguntas para esta competencia (se requieren al menos 3).
            </AlertDescription>
          </Alert>
        )}

        <div className="mt-2">
          <div className="flex justify-between items-center text-sm mb-1">
            <span className="text-gray-500">Progreso</span>
            <span className="font-medium">{userProgress}%</span>
          </div>
          <Progress value={userProgress} className="h-2" />
        </div>
      </CardContent>

      <CardFooter className="bg-gray-50 px-6 py-4 border-t border-gray-100">
        <Button 
          onClick={handleStartTest} 
          className="w-full Ladico-button-primary" 
          disabled={!hasEnoughQuestions}
        >
          {userProgress === 100 ? "Evaluar nuevamente" : hasEnoughQuestions ? "Comenzar evaluación" : "No disponible"}
        </Button>
      </CardFooter>
    </Card>
  )
}
