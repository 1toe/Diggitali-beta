// Script para verificar y contar preguntas por competencia
import { initializeApp } from "firebase/app"
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCOFq_3nQaLr84G9OdvH1TNZYexvrqfwhw",
  authDomain: "ludico-backend.firebaseapp.com",
  projectId: "ludico-backend",
  storageBucket: "ludico-backend.firebasestorage.app",
  messagingSenderId: "663116086194",
  appId: "1:663116086194:web:ebb51b7246f147a25d82ab",
  measurementId: "G-2WE2ZG3FF8",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const competenceCodes = ["1.1", "1.2", "1.3", "4.1", "4.2", "4.3", "4.4"]

async function checkQuestions() {
  try {
    console.log("🔍 Verificando preguntas en la base de datos...")
    
    // Obtener total de preguntas
    const allQuestionsSnapshot = await getDocs(collection(db, "questions"))
    const totalQuestions = allQuestionsSnapshot.size
    
    console.log(`📊 Total de preguntas en la base de datos: ${totalQuestions}`)
    console.log("\n📋 Desglose por competencia:")
    
    // Verificar cada competencia
    for (const code of competenceCodes) {
      const q = query(collection(db, "questions"), where("competence", "==", code))
      const snapshot = await getDocs(q)
      const count = snapshot.size
      
      // Determinar si hay suficientes preguntas (al menos 3 para los tests)
      const status = count >= 3 ? "✅" : "❌"
      
      console.log(`${status} Competencia ${code}: ${count} preguntas${count < 3 ? " (se requieren al menos 3)" : ""}`)
      
      // Si hay preguntas, mostrar detalles del nivel
      if (count > 0) {
        const basicQuery = query(
          collection(db, "questions"),
          where("competence", "==", code),
          where("level", "in", ["Básico", "Básico 1", "Básico 2"])
        )
        const basicSnapshot = await getDocs(basicQuery)
        
        const intermedioQuery = query(
          collection(db, "questions"),
          where("competence", "==", code),
          where("level", "in", ["Intermedio", "Intermedio 1", "Intermedio 2"])
        )
        const intermedioSnapshot = await getDocs(intermedioQuery)
        
        const avanzadoQuery = query(
          collection(db, "questions"),
          where("competence", "==", code),
          where("level", "in", ["Avanzado", "Avanzado 1", "Avanzado 2"])
        )
        const avanzadoSnapshot = await getDocs(avanzadoQuery)
        
        console.log(`   - Nivel Básico: ${basicSnapshot.size} preguntas`)
        console.log(`   - Nivel Intermedio: ${intermedioSnapshot.size} preguntas`)
        console.log(`   - Nivel Avanzado: ${avanzadoSnapshot.size} preguntas`)
      }
      
      console.log("") // Línea en blanco para separar competencias
    }
    
    console.log("\n🔎 Verificación completa!")
    
  } catch (error) {
    console.error("❌ Error al verificar preguntas:", error)
  }
}

// Ejecutar la función
checkQuestions()
