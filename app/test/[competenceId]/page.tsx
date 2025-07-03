"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import type { Question, TestSession } from "@/types"
import TestInterface from "@/components/TestInterface"
import { useToast } from "@/hooks/use-toast"

// Importa la nueva utilidad al inicio del archivo
import { saveUserResult } from "@/utils/results-manager"

export default function TestPage() {
  const params = useParams()
  const router = useRouter()
  const { user, userData } = useAuth()
  const { toast } = useToast()

  const [questions, setQuestions] = useState<Question[]>([])
  const [testSession, setTestSession] = useState<TestSession | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user || !userData) {
      router.push("/")
      return
    }

    loadQuestions()
  }, [user, userData, params.competenceId])

  const loadQuestions = async () => {
    try {
      const competenceId = params.competenceId as string

      // Cargar preguntas de nivel básico para la competencia
      const q = query(
        collection(db, "questions"),
        where("competence", "==", competenceId),
        where("level", "in", ["Básico 1", "Básico 2"]),
      )

      const querySnapshot = await getDocs(q)
      const loadedQuestions: Question[] = []

      querySnapshot.forEach((doc) => {
        loadedQuestions.push({ id: doc.id, ...doc.data() } as Question)
      })

      if (loadedQuestions.length < 3) {
        // Si no hay suficientes preguntas, crear preguntas de ejemplo
        const sampleQuestions = createSampleQuestions(competenceId)
        setQuestions(sampleQuestions)
      } else {
        // Seleccionar 3 preguntas aleatorias
        const selectedQuestions = loadedQuestions.sort(() => 0.5 - Math.random()).slice(0, 3)
        setQuestions(selectedQuestions)
      }

      // Crear sesión de test
      const session: TestSession = {
        id: "",
        userId: user!.uid,
        competence: competenceId,
        level: "basico",
        questions: questions.length > 0 ? questions : createSampleQuestions(competenceId),
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
        title: "Error",
        description: "No se pudieron cargar las preguntas",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const createSampleQuestions = (competenceId: string): Question[] => {
    const sampleQuestions: { [key: string]: Question[] } = {
      "1.1": [
        {
          id: "sample-1.1-1",
          type: "multiple-choice",
          dimension: 1,
          competence: "1.1",
          level: "Básico 2",
          title: "Búsqueda de información oficial",
          scenario:
            "En Colombia necesitas información sobre el subsidio familiar. ¿Cuál es la mejor estrategia de búsqueda?",
          options: [
            "Buscar 'subsidio familiar Colombia sitio:gov.co' en Google",
            "Preguntar en grupos de Facebook sobre subsidios",
            "Buscar videos en YouTube sobre el tema",
            "Consultar blogs personales de experiencias",
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "✅ Excelente: Usar dominios oficiales garantiza información confiable.",
            incorrect: "❌ Cuidado: Fuentes no oficiales pueden tener información desactualizada o incorrecta.",
          },
        },
      ],
      "1.2": [
        {
          id: "sample-1.2-1",
          type: "multiple-choice",
          dimension: 1,
          competence: "1.2",
          level: "Avanzado",
          title: "Credibilidad de fuentes",
          scenario:
            "En México, encuentras dos portales sobre pensiones: uno en .gob.mx y otro en .org con datos similares. ¿Cómo evalúas?",
          options: [
            "Verificar fechas de actualización y contrastar con documentos oficiales",
            "Elegir el sitio con mejor diseño gráfico",
            "Confiar en ambos por tener información coincidente",
            "Preferir el .org por ser organización sin fines de lucro",
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "✅ Excelente: La verificación cruzada con fuentes primarias es esencial.",
            incorrect: "❌ Error: Sitios .org pueden tener sesgos aunque parezcan confiables.",
          },
        },
      ],
      "1.3": [
        {
          id: "sample-1.3-1",
          type: "multiple-choice",
          dimension: 1,
          competence: "1.3",
          level: "Básico 2",
          title: "Almacenamiento de documentos",
          scenario: "En Argentina, recibes digitalmente tu CUIL. ¿Dónde debes guardarlo para acceso futuro seguro?",
          options: [
            "En una carpeta encriptada de tu dispositivo personal",
            "Impreso en varios papeles guardados en casa",
            "En un email enviado a ti mismo",
            "En la memoria USB que siempre llevas contigo",
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "✅ Correcto: El almacenamiento encriptado protege documentos sensibles.",
            incorrect: "❌ Riesgo: Papeles y USBs pueden perderse; emails pueden hackearse.",
          },
        },
      ],
      "4.1": [
        {
          id: "sample-4.1-1",
          type: "multiple-choice",
          dimension: 4,
          competence: "4.1",
          level: "Intermedio",
          title: "Actualización de seguridad",
          scenario:
            "En Chile, tu computadora muestra alertas para actualizar el sistema operativo mientras realizas un trámite bancario. ¿Qué haces?",
          options: [
            "Posponer el trámite, actualizar inmediatamente y luego continuar",
            "Ignorar las alertas hasta terminar el trámite",
            "Actualizar solo el navegador para no interrumpir",
            "Realizar el trámite desde el celular mientras se actualiza",
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "✅ Óptimo: Actualizaciones corrigen vulnerabilidades críticas.",
            incorrect: "❌ Peligro: Retrasar actualizaciones expone a ataques durante transacciones.",
          },
        },
      ],
      "4.2": [
        {
          id: "sample-4.2-1",
          type: "multiple-choice",
          dimension: 4,
          competence: "4.2",
          level: "Básico 2",
          title: "Protección de identidad",
          scenario:
            "En Perú, al crear una cuenta para trámites municipales, te piden copia de tu DNI. ¿Qué medida tomas?",
          options: [
            "Añadir marca de agua 'PARA TRÁMITE X' sobre la imagen",
            "Enviar el escaneo sin modificaciones",
            "Nublar los dígitos del documento",
            "Compartir solo el anverso del DNI",
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "✅ Correcto: La marca de agua limita uso fraudulento.",
            incorrect: "❌ Peligro: Documentos completos sin protección pueden ser mal utilizados.",
          },
        },
      ],
      "4.3": [
        {
          id: "sample-4.3-1",
          type: "multiple-choice",
          dimension: 4,
          competence: "4.3",
          level: "Intermedio",
          title: "Bienestar digital",
          scenario:
            "En Ecuador, pasas 6 horas diarias realizando trámites digitales. ¿Qué práctica implementas para tu bienestar?",
          options: [
            "Hacer pausas cada 30 minutos y ejercicios oculares",
            "Completar todos los trámites de una vez para terminar rápido",
            "Usar múltiples pantallas simultáneamente",
            "Trabajar en horarios nocturnos para mayor concentración",
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "✅ Perfecto: Las pausas regulares previenen fatiga digital y problemas de salud.",
            incorrect: "❌ Riesgo: El uso intensivo sin pausas puede causar fatiga visual y estrés.",
          },
        },
      ],
    }

    return sampleQuestions[competenceId] || sampleQuestions["1.1"]
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
      finalSession.questions.forEach((question, index) => {
        if (finalSession.answers[index] === question.correctAnswerIndex) {
          correctAnswers++
        }
      })

      const score = Math.round((correctAnswers / finalSession.questions.length) * 100)
      const passed = correctAnswers >= 2 // Necesita 2 de 3 correctas

      const completedSession = {
        ...finalSession,
        endTime: new Date(),
        score,
        passed,
      }

      // Guardar sesión en Firestore (formato original)
      await addDoc(collection(db, "testSessions"), completedSession)

      // Guardar resultado en formato JSON especificado
      await saveUserResult(completedSession)

      // Actualizar progreso del usuario si pasó
      if (passed && userData) {
        const updatedCompetences = [...userData.completedCompetences]
        if (!updatedCompetences.includes(finalSession.competence)) {
          updatedCompetences.push(finalSession.competence)
        }

        await updateDoc(doc(db, "users", user!.uid), {
          completedCompetences: updatedCompetences,
          LadicoScore: userData.LadicoScore + (passed ? 10 : 0),
        })
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error al cargar el test</h2>
          <button onClick={() => router.push("/dashboard")} className="Ladico-button-primary">
            Volver al dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <TestInterface testSession={testSession} onAnswerSubmit={handleAnswerSubmit} onTestComplete={handleTestComplete} />
  )
}
