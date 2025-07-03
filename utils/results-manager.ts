// Utilidad para manejar los resultados según tu formato JSON
import { collection, addDoc, query, where, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import type { UserResult, TestSession } from "@/types"

export async function saveUserResult(testSession: TestSession): Promise<void> {
  try {
    const userResult: UserResult = {
      userId: testSession.userId,
      fecha: new Date().toISOString(),
      respuestas: testSession.questions.map((question, index) => ({
        preguntaId: question.id,
        competence: question.competence,
        respuestaUsuario: testSession.answers[index] ?? -1,
        correcta: testSession.answers[index] === question.correctAnswerIndex,
        tiempoSegundos: 30, // Placeholder - podrías implementar tracking de tiempo real
      })),
      puntajeTotal: testSession.score,
      nivelDigComp: determineDigCompLevel(testSession.score),
    }

    await addDoc(collection(db, "userResults"), userResult)
    console.log("Resultado guardado exitosamente")
  } catch (error) {
    console.error("Error al guardar resultado:", error)
    throw error
  }
}

export async function getUserResults(userId: string): Promise<UserResult[]> {
  try {
    const q = query(collection(db, "userResults"), where("userId", "==", userId))

    const querySnapshot = await getDocs(q)
    const results: UserResult[] = []

    querySnapshot.forEach((doc) => {
      results.push({ ...doc.data() } as UserResult)
    })

    return results.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
  } catch (error) {
    console.error("Error al obtener resultados:", error)
    return []
  }
}

function determineDigCompLevel(score: number): string {
  if (score >= 80) return "Avanzado"
  if (score >= 60) return "Intermedio"
  return "Básico"
}

export async function updateQuestionStats(questionId: string, wasCorrect: boolean): Promise<void> {
  try {
    // Aquí podrías implementar la lógica para actualizar vecesUtilizada y tasaAcierto
    // de las preguntas en Firestore
    console.log(`Actualizando estadísticas para pregunta ${questionId}: ${wasCorrect ? "correcta" : "incorrecta"}`)
  } catch (error) {
    console.error("Error al actualizar estadísticas:", error)
  }
}
