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
  }, [user, userData, params.competenceId])

  const loadQuestions = async () => {
    try {
      const competenceId = params.competenceId as string
      let finalQuestions: Question[] = []

      // Verificar que db está disponible
      if (!db) {
        console.error("Firebase no está inicializado")
        finalQuestions = createSampleQuestions(competenceId)
        setQuestions(finalQuestions)
        
        const session: TestSession = {
          id: "",
          userId: user!.uid,
          competence: competenceId,
          level: "basico",
          questions: finalQuestions,
          answers: new Array(3).fill(null),
          currentQuestionIndex: 0,
          startTime: new Date(),
          score: 0,
          passed: false,
        }

        setTestSession(session)
        setLoading(false)
        return
      }
      
      // Primero intentamos cargar las preguntas desde Firestore utilizando el servicio
      console.log(`Cargando preguntas para competencia: ${competenceId}`)
      
      const loadedQuestions = await loadQuestionsByCompetence(competenceId, "Básico", 3)

      if (loadedQuestions.length < 3) {
        // Si no hay suficientes preguntas, crear preguntas de ejemplo
        finalQuestions = createSampleQuestions(competenceId)
        console.log("Usando preguntas de ejemplo para competencia:", competenceId)
      } else {
        // Usar las preguntas cargadas de Firestore
        finalQuestions = loadedQuestions
        console.log("Usando preguntas de Firestore para competencia:", competenceId)
      }

      // Asegurar que siempre tenemos exactamente 3 preguntas
      if (finalQuestions.length !== 3) {
        finalQuestions = createSampleQuestions(competenceId)
      }

      setQuestions(finalQuestions)

      // Crear sesión de test
      const session: TestSession = {
        id: "",
        userId: user!.uid,
        competence: competenceId,
        level: "basico",
        questions: finalQuestions,
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
        {
          id: "sample-1.1-2",
          type: "multiple-choice",
          dimension: 1,
          competence: "1.1",
          level: "Básico 2",
          title: "Filtrado de resultados de búsqueda",
          scenario:
            "Al buscar información sobre trámites en México, obtienes miles de resultados. ¿Cómo filtras la información?",
          options: [
            "Usar filtros de fecha para obtener información reciente",
            "Seleccionar solo los primeros tres resultados",
            "Elegir sitios con más publicidad",
            "Buscar solo en redes sociales",
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "✅ Correcto: La información reciente es más confiable para trámites.",
            incorrect: "❌ Error: Los primeros resultados no siempre son los más actualizados.",
          },
        },
        {
          id: "sample-1.1-3",
          type: "multiple-choice",
          dimension: 1,
          competence: "1.1",
          level: "Básico 2",
          title: "Navegación en portales oficiales",
          scenario:
            "En el portal oficial de tu país, no encuentras la información que buscas. ¿Cuál es tu próximo paso?",
          options: [
            "Usar el buscador interno del portal con palabras clave específicas",
            "Abandonar el sitio y buscar en otro lugar",
            "Contactar por teléfono únicamente",
            "Esperar a que alguien más te ayude",
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "✅ Perfecto: Los buscadores internos están optimizados para el contenido del sitio.",
            incorrect: "❌ Mal: Abandonar el sitio oficial puede llevarte a información incorrecta.",
          },
        },
      ],
      "1.2": [
        {
          id: "sample-1.2-1",
          type: "multiple-choice",
          dimension: 1,
          competence: "1.2",
          level: "Básico 2",
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
        {
          id: "sample-1.2-2",
          type: "multiple-choice",
          dimension: 1,
          competence: "1.2",
          level: "Básico 2",
          title: "Verificación de información",
          scenario:
            "Encuentras información contradictoria sobre un nuevo trámite digital. ¿Cómo verificas qué es correcto?",
          options: [
            "Consultar múltiples fuentes oficiales y comparar",
            "Creer en la información más reciente",
            "Preguntaar en foros online",
            "Elegir la que suena más lógica",
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "✅ Correcto: La triangulación de fuentes es clave para la verificación.",
            incorrect: "❌ Error: Una sola fuente no es suficiente para verificar información importante.",
          },
        },
        {
          id: "sample-1.2-3",
          type: "multiple-choice",
          dimension: 1,
          competence: "1.2",
          level: "Básico 2",
          title: "Evaluación de autoría",
          scenario:
            "En un blog encuentras información sobre trámites fiscales. ¿Qué verificas primero sobre el autor?",
          options: [
            "Su experiencia profesional y credenciales en temas fiscales",
            "La popularidad del blog",
            "El número de seguidores en redes sociales",
            "El diseño atractivo del sitio web",
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "✅ Perfecto: Las credenciales del autor son fundamentales para evaluar la confiabilidad.",
            incorrect: "❌ Error: La popularidad no garantiza la exactitud de la información.",
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
        {
          id: "sample-1.3-2",
          type: "multiple-choice",
          dimension: 1,
          competence: "1.3",
          level: "Básico 2",
          title: "Organización de archivos digitales",
          scenario: "Tienes múltiples certificados digitales de diferentes trámites. ¿Cómo los organizas?",
          options: [
            "Crear carpetas por tipo de trámite con nombres descriptivos",
            "Guardar todo en una sola carpeta 'Documentos'",
            "Usar nombres de archivo aleatorios",
            "Depender solo de la función de búsqueda",
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "✅ Excelente: La organización sistemática facilita el acceso posterior.",
            incorrect: "❌ Error: La falta de organización puede causar pérdida de tiempo y documentos.",
          },
        },
        {
          id: "sample-1.3-3",
          type: "multiple-choice",
          dimension: 1,
          competence: "1.3",
          level: "Básico 2",
          title: "Respaldo de información",
          scenario: "Descargas documentos importantes para un trámite. ¿Qué haces para asegurar no perderlos?",
          options: [
            "Crear copias de seguridad en múltiples ubicaciones",
            "Confiar en que el sitio web siempre estará disponible",
            "Guardar solo en el escritorio",
            "Imprimir todo para tener copias físicas",
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "✅ Perfecto: Las copias de seguridad múltiples protegen contra pérdida de datos.",
            incorrect: "❌ Riesgo: Depender de una sola ubicación puede resultar en pérdida permanente.",
          },
        },
      ],
      "4.1": [
        {
          id: "sample-4.1-1",
          type: "multiple-choice",
          dimension: 4,
          competence: "4.1",
          level: "Básico 2",
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
        {
          id: "sample-4.1-2",
          type: "multiple-choice",
          dimension: 4,
          competence: "4.1",
          level: "Básico 2",
          title: "Protección antivirus",
          scenario: "Tu antivirus detecta una amenaza mientras navegas en sitios gubernamentales. ¿Cuál es tu acción?",
          options: [
            "Ejecutar un escaneo completo inmediatamente",
            "Ignorar la alerta si el sitio parece oficial",
            "Continuar navegando pero con precaución",
            "Desinstalar el antivirus por dar falsas alarmas",
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "✅ Correcto: Las amenazas deben tomarse en serio sin importar el sitio.",
            incorrect: "❌ Error: Los sitios oficiales también pueden estar comprometidos.",
          },
        },
        {
          id: "sample-4.1-3",
          type: "multiple-choice",
          dimension: 4,
          competence: "4.1",
          level: "Básico 2",
          title: "Conexión segura",
          scenario: "Vas a realizar un trámite desde una red WiFi pública. ¿Qué medida de seguridad aplicas?",
          options: [
            "Usar una VPN antes de acceder a sitios sensibles",
            "Confiar en la red si tiene contraseña",
            "Verificar solo que el sitio tenga https",
            "Usar el modo incógnito del navegador",
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "✅ Excelente: Una VPN protege tu tráfico en redes públicas.",
            incorrect: "❌ Riesgo: Las redes públicas pueden ser interceptadas fácilmente.",
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
        {
          id: "sample-4.2-2",
          type: "multiple-choice",
          dimension: 4,
          competence: "4.2",
          level: "Básico 2",
          title: "Gestión de contraseñas",
          scenario: "Necesitas crear una cuenta en múltiples sitios gubernamentales. ¿Cómo gestionas las contraseñas?",
          options: [
            "Usar un gestor de contraseñas con contraseñas únicas para cada sitio",
            "Usar la misma contraseña fuerte en todos los sitios",
            "Crear contraseñas similares con pequeñas variaciones",
            "Escribir todas las contraseñas en una libreta",
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "✅ Perfecto: Los gestores de contraseñas garantizan seguridad y conveniencia.",
            incorrect: "❌ Error: Reutilizar contraseñas amplifica el riesgo de compromiso múltiple.",
          },
        },
        {
          id: "sample-4.2-3",
          type: "multiple-choice",
          dimension: 4,
          competence: "4.2",
          level: "Básico 2",
          title: "Configuración de privacidad",
          scenario: "En un portal gubernamental, puedes configurar qué datos personales son visibles. ¿Qué haces?",
          options: [
            "Configurar la mínima visibilidad necesaria para el trámite",
            "Dejar la configuración por defecto",
            "Hacer toda la información pública para transparencia",
            "Ocultar toda la información posible",
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "✅ Excelente: El principio de minimización de datos es fundamental.",
            incorrect: "❌ Error: La configuración por defecto no siempre protege tu privacidad.",
          },
        },
      ],
      "4.3": [
        {
          id: "sample-4.3-1",
          type: "multiple-choice",
          dimension: 4,
          competence: "4.3",
          level: "Básico 2",
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
        {
          id: "sample-4.3-2",
          type: "multiple-choice",
          dimension: 4,
          competence: "4.3",
          level: "Básico 2",
          title: "Ergonomía digital",
          scenario: "Realizas trámites desde tu computadora personal. ¿Cómo configuras tu espacio de trabajo?",
          options: [
            "Ajustar la altura de la pantalla al nivel de los ojos",
            "Usar la computadora desde la cama para comodidad",
            "Configurar el brillo al máximo para ver mejor",
            "Trabajar en una habitación oscura para concentrarse",
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "✅ Correcto: La ergonomía adecuada previene lesiones y mejora la productividad.",
            incorrect: "❌ Error: Malas posturas pueden causar problemas de salud a largo plazo.",
          },
        },
        {
          id: "sample-4.3-3",
          type: "multiple-choice",
          dimension: 4,
          competence: "4.3",
          level: "Básico 2",
          title: "Gestión del tiempo digital",
          scenario: "Tienes múltiples trámites pendientes y te sientes abrumado. ¿Cómo organizas tu tiempo?",
          options: [
            "Priorizar por fechas límite y dividir en sesiones cortas",
            "Intentar completar todo en una sola sesión intensiva",
            "Procrastinar hasta el último momento",
            "Delegar todos los trámites a un tercero",
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "✅ Excelente: La planificación y división reduce el estrés y mejora la efectividad.",
            incorrect: "❌ Error: La sobrecarga puede llevar a errores y mayor estrés.",
          },
        },
      ],
      "4.4": [
        {
          id: "sample-4.4-1",
          type: "multiple-choice",
          dimension: 4,
          competence: "4.4",
          level: "Básico 2",
          title: "Impacto ambiental digital",
          scenario: "Debes enviar múltiples documentos por email para un trámite. ¿Qué consideras?",
          options: [
            "Optimizar el tamaño de los archivos para reducir el consumo de energía",
            "Enviar todos los documentos en máxima resolución",
            "Crear múltiples emails con un documento cada uno",
            "Imprimir todo y enviarlo por correo físico",
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "✅ Correcto: Los archivos optimizados reducen el consumo energético del procesamiento.",
            incorrect: "❌ Error: Los archivos grandes consumen más recursos y energía innecesariamente.",
          },
        },
        {
          id: "sample-4.4-2",
          type: "multiple-choice",
          dimension: 4,
          competence: "4.4",
          level: "Básico 2",
          title: "Consumo energético",
          scenario: "Tu computadora se calienta mucho durante trámites largos. ¿Qué medida tomas?",
          options: [
            "Configurar el sistema para un uso más eficiente de la energía",
            "Usar un ventilador externo para enfriar",
            "Continuar sin hacer cambios",
            "Aumentar la velocidad del procesador",
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "✅ Perfecto: La configuración eficiente reduce el consumo y el calor generado.",
            incorrect: "❌ Error: El sobrecalentamiento indica ineficiencia energética.",
          },
        },
        {
          id: "sample-4.4-3",
          type: "multiple-choice",
          dimension: 4,
          competence: "4.4",
          level: "Básico 2",
          title: "Huella digital sostenible",
          scenario: "Completaste todos tus trámites digitales. ¿Cómo minimizas tu huella ambiental?",
          options: [
            "Cerrar aplicaciones innecesarias y apagar el equipo",
            "Dejar todo abierto para futuros trámites",
            "Mantener el equipo en modo de espera",
            "Ejecutar una limpieza profunda del sistema",
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "✅ Excelente: Apagar equipos reduce significativamente el consumo energético.",
            incorrect: "❌ Error: Mantener equipos encendidos innecesariamente aumenta la huella de carbono.",
          },
        },
      ],
    }

    // Devolver exactamente 3 preguntas para la competencia solicitada
    const questionsForCompetence = sampleQuestions[competenceId] || sampleQuestions["1.1"]
    return questionsForCompetence.slice(0, 3)
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
