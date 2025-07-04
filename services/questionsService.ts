import { db } from "@/lib/firebase"
import type { Question } from "@/types"
import { collection, query, where, getDocs, updateDoc, doc, increment, getDoc, orderBy, limit } from "firebase/firestore"

/**
 * Carga preguntas de una competencia específica desde Firestore
 */
export async function loadQuestionsByCompetence(competenceId: string, level: string = "Básico", count: number = 3): Promise<Question[]> {
  if (!db) {
    console.error("Firestore no está inicializado")
    return []
  }

  try {
    // Primero intentamos cargar preguntas del nivel básico
    const q = query(
      collection(db, "questions"),
      where("competence", "==", competenceId),
      where("level", "in", [`${level} 1`, `${level} 2`]),
      orderBy("vecesUtilizada", "asc"), // Priorizar las menos utilizadas
      limit(count * 2) // Cargamos el doble para tener variedad
    )

    const querySnapshot = await getDocs(q)
    const loadedQuestions: Question[] = []

    querySnapshot.forEach((doc) => {
      loadedQuestions.push({ 
        id: doc.id, 
        ...doc.data() as Omit<Question, 'id'> 
      } as Question)
    })

    // Si encontramos suficientes preguntas, las devolvemos aleatorizadas
    if (loadedQuestions.length >= count) {
      return loadedQuestions
        .sort(() => 0.5 - Math.random()) // Aleatorizamos
        .slice(0, count) // Tomamos solo las que necesitamos
    }
    
    // Si no hay suficientes preguntas, intentamos cargar de todos los niveles
    const fallbackQuery = query(
      collection(db, "questions"),
      where("competence", "==", competenceId),
      limit(count)
    )
    
    const fallbackSnapshot = await getDocs(fallbackQuery)
    const fallbackQuestions: Question[] = []
    
    fallbackSnapshot.forEach((doc) => {
      fallbackQuestions.push({ 
        id: doc.id, 
        ...doc.data() as Omit<Question, 'id'>
      } as Question)
    })
    
    if (fallbackQuestions.length >= count) {
      return fallbackQuestions
        .sort(() => 0.5 - Math.random())
        .slice(0, count)
    }
    
    // Si aún no tenemos suficientes, devolvemos lo que hayamos encontrado
    return fallbackQuestions
  } catch (error) {
    console.error("Error al cargar preguntas:", error)
    return []
  }
}

/**
 * Actualiza las estadísticas de una pregunta después de ser contestada
 */
export async function updateQuestionStats(questionId: string, wasCorrect: boolean): Promise<void> {
  if (!db) {
    console.error("Firestore no está inicializado")
    return
  }
  
  try {
    const questionRef = doc(db, "questions", questionId)
    
    // Verificar que la pregunta existe
    const questionSnap = await getDoc(questionRef)
    if (!questionSnap.exists()) {
      console.error(`La pregunta con ID ${questionId} no existe`)
      return
    }
    
    // Actualizar contadores de uso y tasa de acierto
    await updateDoc(questionRef, {
      vecesUtilizada: increment(1),
      ...(wasCorrect && { respuestasCorrectas: increment(1) }),
    })
    
    console.log(`Estadísticas actualizadas para pregunta ${questionId}: ${wasCorrect ? "correcta" : "incorrecta"}`)
  } catch (error) {
    console.error("Error al actualizar estadísticas de la pregunta:", error)
  }
}
