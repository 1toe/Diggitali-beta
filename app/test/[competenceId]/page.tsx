"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { collection, addDoc, updateDoc, doc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import type { Question, TestSession } from "@/types"
import TestInterface from "@/components/TestInterface"
import { useToast } from "@/hooks/use-toast"

// Importamos las utilidades
import { saveUserResult } from "@/utils/results-manager"
import { loadQuestionsByCompetence, updateQuestionStats } from "@/services/questionsService"

export default function TestPage() {
  const params = useParams()
  const router = useRouter()
  const { user, userData } = useAuth()
  const { toast } = useToast()

  const [questions, setQuestions] = useState<Question[]>([])
  const [testSession, setTestSession] = useState<TestSession | null>(null)
  const [loading, setLoading] = useState(true)

  // IMPORTANTE: Este test siempre muestra exactamente 3 preguntas por competencia
  // El usuario debe responder correctamente al menos 2 de 3 para avanzar al siguiente nivel

  useEffect(() => {
    if (!user || !userData) {
      router.push("/")
      return
    }

    loadQuestions()
  }, [user, userData, params.competenceId, router])

  const loadQuestions = async () => {
    try {
      const competenceId = params.competenceId as string

      // Verificar que db está disponible
      if (!db) {
        throw new Error("Firebase no está inicializado. Por favor, comprueba tu conexión a Internet.")
      }
      
      // Cargamos las preguntas desde Firestore utilizando el servicio
      console.log(`Cargando preguntas para competencia: ${competenceId}`)
      
      const loadedQuestions = await loadQuestionsByCompetence(competenceId, "Básico", 3)
      
      // Con la modificación del servicio, si no hay al menos 3 preguntas, se lanzará un error
      // El error será capturado por el catch más abajo
      
      setQuestions(loadedQuestions)
      
      // Crear sesión de test
      const session: TestSession = {
        id: "",
        userId: user!.uid,
        competence: competenceId,
        level: "basico",
        questions: loadedQuestions,
        answers: new Array(3).fill(null),
        currentQuestionIndex: 0,
        startTime: new Date(),
        score: 0,
        passed: false,
      }

      setTestSession(session)
    } catch (error) {
      console.error("Error loading questions:", error)
      toast({
        title: "Error al cargar preguntas",
        description: error instanceof Error ? error.message : "No se pudieron cargar las preguntas. Verifica que hay suficientes preguntas en la base de datos.",
        variant: "destructive",
      })
      // Redirigimos al dashboard para evitar una página de error
      router.push('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerSubmit = async (answerIndex: number) => {
    if (!testSession) return

    const updatedAnswers = [...testSession.answers]
    updatedAnswers[testSession.currentQuestionIndex] = answerIndex

    const updatedSession = {
      ...testSession,
      answers: updatedAnswers,
    }

    setTestSession(updatedSession)
  }

  const handleTestComplete = async (finalSession: TestSession) => {
    try {
      // Calcular puntuación
      let correctAnswers = 0
      
      // Para cada pregunta, actualizar sus estadísticas y contar las respuestas correctas
      await Promise.all(finalSession.questions.map(async (question, index) => {
        const wasCorrect = finalSession.answers[index] === question.correctAnswerIndex
        
        if (wasCorrect) {
          correctAnswers++
        }
        
        // Actualizar estadísticas de la pregunta en Firestore
        await updateQuestionStats(question.id, wasCorrect)
      }))

      const score = Math.round((correctAnswers / finalSession.questions.length) * 100)
      const passed = correctAnswers >= 2 // Necesita 2 de 3 correctas

      const completedSession = {
        ...finalSession,
        endTime: new Date(),
        score,
        passed,
      }

      // Guardar sesión en Firestore solo si db está disponible
      if (db) {
        try {
          await addDoc(collection(db, "testSessions"), completedSession)
        } catch (error) {
          console.error("Error saving test session:", error)
        }
      }

      // Guardar resultado en formato JSON especificado
      try {
        await saveUserResult(completedSession)
      } catch (error) {
        console.error("Error saving user result:", error)
      }

      // Actualizar progreso del usuario si pasó y db está disponible
      if (passed && userData && db) {
        try {
          const updatedCompetences = [...userData.completedCompetences]
          if (!updatedCompetences.includes(finalSession.competence)) {
            updatedCompetences.push(finalSession.competence)
          }

          await updateDoc(doc(db, "users", user!.uid), {
            completedCompetences: updatedCompetences,
            LadicoScore: userData.LadicoScore + (passed ? 10 : 0),
          })
        } catch (error) {
          console.error("Error updating user progress:", error)
        }
      }

      // Redirigir a resultados
      router.push(`/test/${params.competenceId}/results?score=${score}&passed=${passed}&correct=${correctAnswers}`)
    } catch (error) {
      console.error("Error saving test results:", error)
      toast({
        title: "Error",
        description: "No se pudieron guardar los resultados",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center Ladico-gradient">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    )
  }

  if (!testSession) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No se ha podido iniciar la prueba</h2>
          <p className="text-gray-600 mb-6">
            Hubo un problema al cargar las preguntas para esta competencia. Por favor intenta nuevamente.
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Volver al Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TestInterface
        testSession={testSession}
        onAnswerSubmit={handleAnswerSubmit}
        onTestComplete={handleTestComplete}
      />
    </div>
  )
}
