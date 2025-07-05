// Script para subir preguntas con el nuevo formato JSON
import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore"
import * as fs from 'fs'
import * as path from 'path'

const firebaseConfig = {
  apiKey: "AIzaSyADgCJZhie5XzhovxDVVQ6oySlmO7ADDgA",
  authDomain: "ludicocos-e4bcc.firebaseapp.com",
  projectId: "ludicocos-e4bcc",
  storageBucket: "ludicocos-e4bcc.firebasestorage.app",
  messagingSenderId: "251212234614",
  appId: "1:251212234614:web:f52d46396a1374b66cc457",
  measurementId: "G-RT3XB7QGP0",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function uploadJsonQuestions() {
  try {
    console.log("🚀 Iniciando verificación y carga de preguntas...")
    
    // Verificar si hay un archivo JSON de preguntas en el directorio
    const filePath = path.join(__dirname, 'questions-to-upload.json')
    
    if (!fs.existsSync(filePath)) {
      console.log("⚠️ No se encontró archivo para cargar.")
      console.log("Por favor, crea un archivo 'questions-to-upload.json' con el siguiente formato:")
      
      const exampleQuestion = {
        type: "multiple-choice",
        competence: "1.1",
        level: "Básico 2",
        title: "Título de la pregunta",
        scenario: "Escenario o contexto de la pregunta",
        options: [
          "Opción A: Primera opción",
          "Opción B: Segunda opción",
          "Opción C: Tercera opción",
          "Opción D: Cuarta opción"
        ],
        correctAnswerIndex: 0,
        feedback: {
          correct: "Retroalimentación para respuesta correcta",
          incorrect: "Retroalimentación para respuesta incorrecta"
        }
      }
      
      // Crear un archivo de ejemplo
      fs.writeFileSync(filePath, JSON.stringify([exampleQuestion], null, 2))
      console.log(`📄 Se ha creado un archivo de ejemplo en: ${filePath}`)
      console.log("Edita este archivo con tus preguntas y ejecuta el script nuevamente.")
      
      return
    }
    
    // Cargar las preguntas desde el archivo
    const questionsData = fs.readFileSync(filePath, 'utf8')
    let questions
    
    try {
      questions = JSON.parse(questionsData)
      // Convertir a array si es un objeto único
      if (!Array.isArray(questions)) {
        questions = [questions]
      }
    } catch (error) {
      console.error("❌ Error al parsear el archivo JSON:", error)
      return
    }
    
    console.log(`📋 Se encontraron ${questions.length} preguntas para cargar`)
    
    // Validar formato de las preguntas
    const validQuestions = questions.filter(q => 
      q.type === "multiple-choice" &&
      q.competence &&
      q.level &&
      q.title &&
      q.scenario &&
      Array.isArray(q.options) &&
      q.options.length >= 2 &&
      typeof q.correctAnswerIndex === "number" &&
      q.feedback &&
      q.feedback.correct &&
      q.feedback.incorrect
    )
    
    if (validQuestions.length !== questions.length) {
      console.warn(`⚠️ Advertencia: ${questions.length - validQuestions.length} preguntas tienen formato inválido y serán ignoradas`)
    }
    
    if (validQuestions.length === 0) {
      console.error("❌ No hay preguntas con formato válido para cargar")
      return
    }
    
    // Verificar cuántas preguntas hay por competencia (antes de cargar)
    console.log("\n🔍 Verificando preguntas existentes por competencia...")
    
    // Recopilar todas las competencias únicas del archivo
    const competenceCodes = [...new Set(validQuestions.map(q => q.competence))].sort()
    
    const existingCounts: Record<string, number> = {}
    
    // Verificar cuántas preguntas hay por cada competencia
    for (const code of competenceCodes) {
      const q = query(collection(db, "questions"), where("competence", "==", code))
      const snapshot = await getDocs(q)
      existingCounts[code] = snapshot.size
      
      console.log(`   ${code}: ${snapshot.size} preguntas existentes`)
    }
    
    // Cargar las preguntas validadas
    console.log("\n📤 Cargando preguntas a Firestore...")
    
    let addedCount = 0
    const newCounts: Record<string, number> = {}
    
    for (const question of validQuestions) {
      // Inicializar contador si es necesario
      if (!newCounts[question.competence]) {
        newCounts[question.competence] = 0
      }
      
      try {
        // Agregar la pregunta a Firestore
        await addDoc(collection(db, "questions"), {
          ...question,
          createdAt: new Date(),
          updatedAt: new Date(),
          vecesUtilizada: 0,
          tasaAcierto: 0,
        })
        
        addedCount++
        newCounts[question.competence]++
        console.log(`✅ Pregunta agregada: ${question.competence} - ${question.title}`)
      } catch (error) {
        console.error(`❌ Error al agregar pregunta "${question.title}":`, error)
      }
    }
    
    // Mostrar resumen final
    console.log("\n📊 Resumen de la operación:")
    console.log(`   Total de preguntas agregadas: ${addedCount}/${validQuestions.length}`)
    
    console.log("\n📋 Estado final por competencia:")
    
    for (const code of competenceCodes) {
      const totalCount = (existingCounts[code] || 0) + (newCounts[code] || 0)
      const status = totalCount >= 3 ? "✅" : "⚠️"
      
      console.log(
        `   ${status} ${code}: ${totalCount} preguntas total ` +
        `(${existingCounts[code] || 0} existentes + ${newCounts[code] || 0} nuevas)` +
        `${totalCount < 3 ? " - Se requieren al menos 3" : ""}`
      )
    }
    
    console.log("\n🎉 ¡Proceso completado!")
    
  } catch (error) {
    console.error("❌ Error general:", error)
  }
}

// Ejecutar la función
uploadJsonQuestions()
