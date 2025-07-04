// Script para subir preguntas de ejemplo a Firestore
// Ejecutar con: node scripts/upload-questions.js

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

const sampleQuestions = [
  // Competencia 1.1 - Navegar, buscar y filtrar
  {
    type: "multiple-choice",
    competence: "1.1",
    level: "Básico 2",
    dimension: "Información y alfabetización informacional",
    title: "Búsqueda de trámites gubernamentales",
    scenario:
      "Carlos necesita obtener un certificado de antecedentes penales para un trabajo. Quiere encontrar información oficial sobre cómo obtenerlo en línea.",
    options: [
      'Buscar "certificado antecedentes penales trámite online" en el sitio web del ministerio correspondiente',
      "Preguntar en grupos de Facebook sobre el proceso",
      'Buscar solo "antecedentes" en Google',
      "Ir directamente a la oficina sin buscar información previa",
    ],
    correctAnswerIndex: 0,
    feedback: {
      correct: "¡Correcto! Usar términos específicos en sitios oficiales garantiza información confiable.",
      incorrect: "Recuerda usar palabras clave específicas y buscar en fuentes oficiales.",
    },
  },
  {
    type: "multiple-choice",
    competence: "1.1",
    level: "Básico 2",
    dimension: "Información y alfabetización informacional",
    title: "Filtrado de información educativa",
    scenario:
      "Ana busca información sobre becas universitarias para el próximo año y encuentra muchos resultados desactualizados.",
    options: [
      'Usar filtros de fecha "último año" y buscar en sitios oficiales de educación',
      "Revisar todos los resultados sin filtrar",
      "Buscar solo en redes sociales",
      "Usar únicamente el primer resultado que aparezca",
    ],
    correctAnswerIndex: 0,
    feedback: {
      correct: "¡Excelente! Filtrar por fecha y usar fuentes oficiales mejora la calidad de la información.",
      incorrect: "Los filtros de fecha y las fuentes oficiales son clave para encontrar información actualizada.",
    },
  },
  {
    type: "multiple-choice",
    competence: "1.1",
    level: "Básico 2",
    dimension: "Información y alfabetización informacional",
    title: "Navegación en portales gubernamentales",
    scenario: "Luis está en el portal del servicio de impuestos buscando información sobre declaración de renta.",
    options: [
      "Usar el menú de navegación principal y la función de búsqueda del sitio",
      "Hacer clic aleatoriamente en todos los enlaces",
      "Abandonar el sitio y buscar en otros lugares",
      "Solo leer la página de inicio",
    ],
    correctAnswerIndex: 0,
    feedback: {
      correct: "¡Perfecto! La navegación estructurada es la forma más eficiente de encontrar información.",
      incorrect: "Usar el menú y la búsqueda interna del sitio es más efectivo que navegar aleatoriamente.",
    },
  },

  // Competencia 4.1 - Proteger dispositivos
  {
    type: "multiple-choice",
    competence: "4.1",
    level: "Básico 2",
    dimension: "Seguridad",
    title: "Seguridad en redes públicas",
    scenario:
      "María necesita acceder a su banca en línea desde un café con WiFi público para realizar un pago urgente.",
    options: [
      "Usar datos móviles o una VPN confiable, y verificar que la URL del banco comience con https",
      "Conectarse directamente al WiFi público y proceder normalmente",
      "Usar cualquier red WiFi disponible sin verificar su seguridad",
      "Compartir la contraseña del WiFi con otros usuarios",
    ],
    correctAnswerIndex: 0,
    feedback: {
      correct: "¡Correcto! Usar conexiones seguras y verificar URLs protegidas es fundamental.",
      incorrect: "Siempre usa conexiones seguras (VPN o datos móviles) para transacciones bancarias.",
    },
  },
  {
    type: "multiple-choice",
    competence: "4.1",
    level: "Básico 2",
    dimension: "Seguridad",
    title: "Actualizaciones de seguridad",
    scenario:
      "El smartphone de Pedro muestra una notificación de actualización del sistema operativo que incluye parches de seguridad.",
    options: [
      "Instalar la actualización inmediatamente para mantener el dispositivo protegido",
      "Ignorar permanentemente las actualizaciones",
      "Postponer la actualización indefinidamente",
      "Desactivar todas las notificaciones de actualización",
    ],
    correctAnswerIndex: 0,
    feedback: {
      correct: "¡Excelente! Las actualizaciones de seguridad son críticas para proteger tu dispositivo.",
      incorrect: "Las actualizaciones incluyen parches importantes que protegen contra vulnerabilidades.",
    },
  },
  {
    type: "multiple-choice",
    competence: "4.1",
    level: "Básico 2",
    dimension: "Seguridad",
    title: "Identificación de amenazas",
    scenario:
      'Carmen recibe un email que parece ser de su banco solicitando que descargue un archivo adjunto para "verificar su cuenta".',
    options: [
      "No descargar el archivo y contactar directamente al banco por teléfono para verificar",
      "Descargar y abrir el archivo inmediatamente",
      "Reenviar el email a familiares y amigos",
      "Hacer clic en todos los enlaces del email",
    ],
    correctAnswerIndex: 0,
    feedback: {
      correct: "¡Perfecto! Siempre verificar directamente con la institución es la práctica más segura.",
      incorrect: "Nunca descargues archivos de emails sospechosos. Siempre verifica directamente con la institución.",
    },
  },
]

async function uploadQuestions() {
  try {
    console.log("Iniciando carga de preguntas...")

    for (const question of sampleQuestions) {
      const docRef = await addDoc(collection(db, "questions"), {
        ...question,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      console.log("Pregunta agregada con ID:", docRef.id)
    }

    console.log("Todas las preguntas han sido cargadas exitosamente!")
  } catch (error) {
    console.error("Error al cargar preguntas:", error)
  }
}

// Ejecutar la función
uploadQuestions()
