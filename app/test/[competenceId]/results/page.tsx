"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, Trophy, RotateCcw } from "lucide-react"

export default function TestResults() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const score = Number.parseInt(searchParams.get("score") || "0")
  const passed = searchParams.get("passed") === "true"
  const correctAnswers = Number.parseInt(searchParams.get("correct") || "0")
  const totalQuestions = 3 // Siempre 3 preguntas

  const handleReturnToDashboard = () => {
    router.push("/dashboard")
  }

  const handleRetakeTest = () => {
    router.back()
  }

  return (
    <div className="min-h-screen Ladico-gradient flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            {passed ? (
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <Trophy className="w-10 h-10 text-green-600" />
              </div>
            ) : (
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="w-10 h-10 text-red-600" />
              </div>
            )}
          </div>

          <CardTitle className="text-2xl mb-2">{passed ? "¡Felicitaciones!" : "Sigue practicando"}</CardTitle>

          <p className="text-gray-600">
            {passed
              ? "Has completado exitosamente esta competencia"
              : "Necesitas al menos 2 respuestas correctas para avanzar"}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Resumen de resultados */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{totalQuestions}</div>
              <div className="text-sm text-gray-600">Preguntas</div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
              <div className="text-sm text-gray-600">Correctas</div>
            </div>

            <div className="p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{totalQuestions - correctAnswers}</div>
              <div className="text-sm text-gray-600">Incorrectas</div>
            </div>
          </div>

          {/* Puntuación */}
          <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
            <div className="text-4xl font-bold text-purple-600 mb-2">{score}%</div>
            <div className="text-gray-600">Puntuación obtenida</div>
            {passed && <div className="mt-2 text-green-600 font-medium">+10 Ladico ganados</div>}
          </div>

          {/* Desglose de respuestas */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Resumen de respuestas:</h3>
            {Array.from({ length: totalQuestions }, (_, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Pregunta {index + 1}</span>
                {index < correctAnswers ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
            ))}
          </div>

          {/* Mensaje de progreso */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              {passed
                ? "Has desbloqueado el siguiente nivel en esta competencia. ¡Continúa desarrollando tus habilidades digitales!"
                : "No te desanimes. Puedes volver a intentarlo cuando te sientas preparado. Recuerda revisar los recursos de apoyo."}
            </p>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={handleReturnToDashboard} className="flex-1 Ladico-button-primary">
              Volver al Dashboard
            </Button>

            {!passed && (
              <Button onClick={handleRetakeTest} variant="outline" className="flex-1 bg-transparent">
                <RotateCcw className="w-4 h-4 mr-2" />
                Intentar de nuevo
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
