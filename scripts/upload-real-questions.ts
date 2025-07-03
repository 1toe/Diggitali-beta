// Script para subir las preguntas reales con tu formato JSON
import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc } from "firebase/firestore"

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

const realQuestions = [
  // Dimensión 1 - Competencia 1.1
  {
    type: "multiple-choice",
    dimension: 1,
    competence: "1.1",
    level: "Básico 2",
    title: "Renovación de pasaporte",
    scenario:
      "Eres un ciudadano mexicano de 28 años que necesita renovar su pasaporte para un viaje urgente. ¿Cómo buscarías la información oficial?",
    options: [
      "Buscar en Google: 'renovación pasaporte México sitio:.gob.mx'",
      "Preguntar en un grupo de WhatsApp de amigos",
      "Buscar videos en TikTok sobre trámites",
      "Visitar directamente la embajada sin consultar",
    ],
    correctAnswerIndex: 0,
    feedback: {
      correct: "Correcto: Usar palabras clave y dominio .gob.mx garantiza encontrar información oficial.",
      incorrect: "Incorrecto: Para trámites oficiales siempre debes buscar en fuentes gubernamentales confiables.",
    },
    pais: "México",
    fechaCreacion: "2025-07-03",
    autor: "EquipoDigComp",
    vecesUtilizada: 0,
    tasaAcierto: 0,
  },
  {
    type: "multiple-choice",
    dimension: 1,
    competence: "1.1",
    level: "Básico 2",
    title: "Búsqueda de becas universitarias",
    scenario:
      "Eres estudiante en Colombia y necesitas encontrar información sobre becas del gobierno para estudios superiores. ¿Cuál es la mejor estrategia?",
    options: [
      "Buscar 'becas universitarias Colombia 2024 sitio:gov.co'",
      "Revisar publicaciones en Instagram de influencers",
      "Preguntar en foros de internet no oficiales",
      "Esperar que te llegue información por correo",
    ],
    correctAnswerIndex: 0,
    feedback: {
      correct: "Excelente: Usar filtros específicos y dominios oficiales mejora la búsqueda.",
      incorrect: "Recuerda usar fuentes oficiales y palabras clave específicas para encontrar información confiable.",
    },
    pais: "Colombia",
    fechaCreacion: "2025-07-03",
    autor: "EquipoDigComp",
    vecesUtilizada: 0,
    tasaAcierto: 0,
  },
  {
    type: "multiple-choice",
    dimension: 1,
    competence: "1.1",
    level: "Básico 2",
    title: "Trámite de cédula de identidad",
    scenario:
      "En Chile necesitas renovar tu cédula de identidad y quieres conocer los requisitos actualizados. ¿Dónde buscarías?",
    options: [
      "En el sitio web oficial del Registro Civil de Chile",
      "En grupos de Facebook sobre trámites",
      "En blogs personales de experiencias",
      "Llamar directamente sin consultar información previa",
    ],
    correctAnswerIndex: 0,
    feedback: {
      correct: "Perfecto: El sitio oficial del Registro Civil tiene la información más actualizada y confiable.",
      incorrect: "Siempre consulta primero las fuentes oficiales para obtener información precisa y actualizada.",
    },
    pais: "Chile",
    fechaCreacion: "2025-07-03",
    autor: "EquipoDigComp",
    vecesUtilizada: 0,
    tasaAcierto: 0,
  },

  // Dimensión 1 - Competencia 1.2
  {
    type: "multiple-choice",
    dimension: 1,
    competence: "1.2",
    level: "Intermedio",
    title: "Identificar estafas en trámites",
    scenario:
      "En Colombia, recibes un correo para actualizar tu cédula con un enlace a un sitio que parece oficial. ¿Cómo verificas su autenticidad?",
    options: [
      "Comparar el dominio con el sitio oficial de la Registraduría",
      "Llamar al número de teléfono proporcionado en el correo",
      "Verificar los likes en redes sociales del sitio",
      "Consultar con un vecino si recibió el mismo correo",
    ],
    correctAnswerIndex: 0,
    feedback: {
      correct: "Excelente: Siempre compara dominios con fuentes oficiales para evitar phishing.",
      incorrect: "Cuidado: Los estafadores suelen replicar sitios oficiales. Verifica directamente con la institución.",
    },
    pais: "Colombia",
    fechaCreacion: "2025-07-03",
    autor: "EquipoDigComp",
    vecesUtilizada: 0,
    tasaAcierto: 0,
  },

  // Dimensión 4 - Competencia 4.1
  {
    type: "multiple-choice",
    dimension: 4,
    competence: "4.1",
    level: "Básico 2",
    title: "Protección en redes WiFi públicas",
    scenario:
      "Estás en un café en Argentina y necesitas acceder a tu banca en línea para realizar un pago urgente. ¿Qué medida de seguridad es prioritaria?",
    options: [
      "Usar datos móviles en lugar de WiFi público y verificar que la URL sea https://",
      "Conectarse al WiFi público más rápido disponible",
      "Guardar las contraseñas en el navegador para mayor comodidad",
      "Realizar la transacción rápidamente para minimizar exposición",
    ],
    correctAnswerIndex: 0,
    feedback: {
      correct: "Correcto: Los datos móviles y conexiones HTTPS protegen tu información financiera.",
      incorrect: "Nunca uses WiFi público para transacciones bancarias. Siempre verifica conexiones seguras.",
    },
    pais: "Argentina",
    fechaCreacion: "2025-07-03",
    autor: "EquipoDigComp",
    vecesUtilizada: 0,
    tasaAcierto: 0,
  },

  // Dimensión 4 - Competencia 4.2
  {
    type: "multiple-choice",
    dimension: 4,
    competence: "4.2",
    level: "Básico 2",
    title: "Seguridad en trámites bancarios",
    scenario:
      "En Argentina, debes realizar una transferencia bancaria desde tu computadora personal. ¿Qué medida de seguridad priorizas?",
    options: [
      "Verificar que la URL comience con https:// y tenga el candado verde",
      "Utilizar la red WiFi pública del café para mayor velocidad",
      "Guardar tus credenciales en el navegador para agilizar",
      "Compartir pantalla con un familiar para que te ayude",
    ],
    correctAnswerIndex: 0,
    feedback: {
      correct: "Bien hecho: HTTPS garantiza conexión encriptada y segura.",
      incorrect: "Peligroso: Nunca realices transacciones en redes públicas o guardando contraseñas.",
    },
    pais: "Argentina",
    fechaCreacion: "2025-07-03",
    autor: "EquipoDigComp",
    vecesUtilizada: 0,
    tasaAcierto: 0,
  },

  // Dimensión 4 - Competencia 4.4
  {
    type: "multiple-choice",
    dimension: 4,
    competence: "4.4",
    level: "Avanzado",
    title: "Sostenibilidad digital",
    scenario:
      "En Chile, debes enviar documentos a múltiples instituciones gubernamentales. ¿Qué práctica sostenible implementarías?",
    options: [
      "Comprimir archivos y eliminar metadatos antes de enviar",
      "Imprimir todos los documentos como respaldo físico",
      "Enviar copias idénticas a cada institución por separado",
      "Grabar los documentos en un DVD y enviar por correo",
    ],
    correctAnswerIndex: 0,
    feedback: {
      correct: "Correcto: Reducir tamaño de archivos disminuye energía en transmisión y almacenamiento.",
      incorrect: "Recuerda: Las prácticas digitales sostenibles minimizan huella de carbono y residuos electrónicos.",
    },
    pais: "Chile",
    fechaCreacion: "2025-07-03",
    autor: "EquipoDigComp",
    vecesUtilizada: 0,
    tasaAcierto: 0,
  },
]

async function uploadRealQuestions() {
  try {
    console.log("Iniciando carga de preguntas reales...")

    for (const question of realQuestions) {
      const docRef = await addDoc(collection(db, "questions"), {
        ...question,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      console.log(`Pregunta agregada con ID: ${docRef.id} - ${question.title}`)
    }

    console.log("✅ Todas las preguntas reales han sido cargadas exitosamente!")
    console.log(`📊 Total de preguntas cargadas: ${realQuestions.length}`)

    // Mostrar resumen por competencia
    const competenceCount = realQuestions.reduce(
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
  } catch (error) {
    console.error("❌ Error al cargar preguntas:", error)
  }
}

// Ejecutar la función
uploadRealQuestions()
