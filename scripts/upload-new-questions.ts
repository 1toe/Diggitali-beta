// Script para subir las nuevas preguntas del archivo JSON
import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc } from "firebase/firestore"

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

const newQuestions = [
  {
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
    pais: "Argentina",
    fechaCreacion: "2025-07-03",
    autor: "EquipoDigComp",
    vecesUtilizada: 0,
    tasaAcierto: 0,
  },
  {
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
    pais: "Chile",
    fechaCreacion: "2025-07-03",
    autor: "EquipoDigComp",
    vecesUtilizada: 0,
    tasaAcierto: 0,
  },
  {
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
    pais: "México",
    fechaCreacion: "2025-07-03",
    autor: "EquipoDigComp",
    vecesUtilizada: 0,
    tasaAcierto: 0,
  },
  {
    type: "multiple-choice",
    dimension: 4,
    competence: "4.2",
    level: "Básico 2",
    title: "Protección de identidad",
    scenario: "En Perú, al crear una cuenta para trámites municipales, te piden copia de tu DNI. ¿Qué medida tomas?",
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
    pais: "Perú",
    fechaCreacion: "2025-07-03",
    autor: "EquipoDigComp",
    vecesUtilizada: 0,
    tasaAcierto: 0,
  },
  // Preguntas adicionales para completar el banco
  {
    type: "multiple-choice",
    dimension: 1,
    competence: "1.1",
    level: "Básico 2",
    title: "Búsqueda de información oficial",
    scenario: "En Colombia necesitas información sobre el subsidio familiar. ¿Cuál es la mejor estrategia de búsqueda?",
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
    pais: "Colombia",
    fechaCreacion: "2025-07-03",
    autor: "EquipoDigComp",
    vecesUtilizada: 0,
    tasaAcierto: 0,
  },
  {
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
    pais: "Ecuador",
    fechaCreacion: "2025-07-03",
    autor: "EquipoDigComp",
    vecesUtilizada: 0,
    tasaAcierto: 0,
  },
]

async function uploadNewQuestions() {
  try {
    console.log("🚀 Iniciando carga de nuevas preguntas...")

    for (const question of newQuestions) {
      const docRef = await addDoc(collection(db, "questions"), {
        ...question,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      console.log(`✅ Pregunta agregada: ${docRef.id} - ${question.title}`)
    }

    console.log("🎉 ¡Todas las nuevas preguntas han sido cargadas exitosamente!")
    console.log(`📊 Total de preguntas cargadas: ${newQuestions.length}`)

    // Mostrar resumen por competencia
    const competenceCount = newQuestions.reduce(
      (acc, q) => {
        acc[q.competence] = (acc[q.competence] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    console.log("📋 Resumen por competencia:")
    Object.entries(competenceCount).forEach(([comp, count]) => {
      console.log(`   ${comp}: ${count} preguntas`)
    })

    // Mostrar resumen por país
    const countryCount = newQuestions.reduce(
      (acc, q) => {
        acc[q.pais] = (acc[q.pais] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    console.log("🌎 Resumen por país:")
    Object.entries(countryCount).forEach(([country, count]) => {
      console.log(`   ${country}: ${count} preguntas`)
    })
  } catch (error) {
    console.error("❌ Error al cargar preguntas:", error)
  }
}

// Ejecutar la función
uploadNewQuestions()
