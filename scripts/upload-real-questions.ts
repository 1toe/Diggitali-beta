// Script para borrar y subir un conjunto de preguntas de ejemplo
import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc, getDocs, deleteDoc } from "firebase/firestore"
import * as fs from 'fs'
import * as path from 'path'

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

async function resetAndUploadQuestions() {
  try {
    console.log("🗑️ Eliminando todas las preguntas existentes...")
    const querySnapshot = await getDocs(collection(db, "questions"))
    const deletePromises = []
    let deletedCount = 0
    
    for (const doc of querySnapshot.docs) {
      deletePromises.push(deleteDoc(doc.ref))
      deletedCount++
    }
    
    await Promise.all(deletePromises)
    console.log(`✅ Se han eliminado ${deletedCount} preguntas existentes`)
    
    // Cargar el archivo de ejemplo
    console.log("📂 Cargando archivo de preguntas de ejemplo...")
    
    // Verificar si existe un archivo de ejemplo en el directorio
    const filePath = path.join(__dirname, 'example-questions.json')
    
    if (!fs.existsSync(filePath)) {
      console.log("⚠️ No se encontró el archivo de ejemplo. Creando uno...")
      
      // Crear preguntas de ejemplo para todas las competencias
      const exampleQuestions = [
        // Competencia 1.1
        {
          type: "multiple-choice",
          competence: "1.1",
          level: "Básico 2",
          title: "Búsqueda de información oficial",
          scenario: "Necesitas encontrar información sobre trámites de visado para viajar a España. ¿Cuál es la mejor estrategia de búsqueda?",
          options: [
            "Opción A: Buscar en el sitio oficial de la embajada española",
            "Opción B: Consultar en grupos de Facebook de viajeros",
            "Opción C: Revisar blogs de viaje no oficiales",
            "Opción D: Ver videos de YouTube sobre el tema"
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "Correcto. Los sitios oficiales gubernamentales proporcionan la información más precisa y actualizada para trámites.",
            incorrect: "Incorrecto. Para trámites oficiales, siempre es mejor consultar fuentes gubernamentales oficiales."
          }
        },
        {
          type: "multiple-choice",
          competence: "1.1",
          level: "Básico 2",
          title: "Filtros de búsqueda",
          scenario: "Estás buscando noticias recientes sobre una nueva ley de impuestos. ¿Cómo filtrarías tu búsqueda?",
          options: [
            "Opción A: Usar filtros de fecha para mostrar solo resultados del último mes",
            "Opción B: Revisar todas las páginas de resultados sin filtrar",
            "Opción C: Confiar en las primeras tres entradas que aparezcan",
            "Opción D: Buscar solo en redes sociales"
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "Correcto. Usar filtros de fecha ayuda a encontrar información actualizada y relevante.",
            incorrect: "Incorrecto. Para noticias recientes, es fundamental filtrar por fecha para evitar información desactualizada."
          }
        },
        {
          type: "multiple-choice",
          competence: "1.1",
          level: "Básico 2",
          title: "Búsqueda avanzada",
          scenario: "Necesitas encontrar un documento PDF específico sobre regulaciones sanitarias. ¿Qué técnica usarías?",
          options: [
            "Opción A: Incluir 'filetype:pdf' en tu búsqueda",
            "Opción B: Buscar imágenes en lugar de texto",
            "Opción C: Usar solo palabras clave generales",
            "Opción D: Limitar la búsqueda a redes sociales"
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "Correcto. Especificar el tipo de archivo ayuda a refinar los resultados cuando buscas documentos específicos.",
            incorrect: "Incorrecto. Usar operadores de búsqueda avanzada como 'filetype:' te permite encontrar tipos específicos de documentos."
          }
        },
        
        // Competencia 1.2
        {
          type: "multiple-choice",
          competence: "1.2",
          level: "Intermedio",
          title: "Evaluación de fuentes de noticias",
          scenario: "Encuentras un artículo alarmante sobre salud pública. ¿Qué aspecto deberías verificar primero?",
          options: [
            "Opción A: Quién es el autor y cuáles son sus credenciales",
            "Opción B: La cantidad de imágenes en el artículo",
            "Opción C: Si el título usa mayúsculas y signos de exclamación",
            "Opción D: El diseño del sitio web"
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "Correcto. La credibilidad del autor es fundamental para evaluar la fiabilidad de la información.",
            incorrect: "Incorrecto. Verificar la fuente y las credenciales del autor es esencial para determinar la fiabilidad."
          }
        },
        {
          type: "multiple-choice",
          competence: "1.2",
          level: "Intermedio",
          title: "Verificación de información",
          scenario: "Has leído una estadística sorprendente sobre economía. ¿Cómo verificarías su exactitud?",
          options: [
            "Opción A: Buscar la misma información en múltiples fuentes confiables",
            "Opción B: Compartirla inmediatamente en redes sociales",
            "Opción C: Aceptarla si coincide con tu opinión previa",
            "Opción D: Ignorar si contradice tus creencias"
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "Correcto. La verificación cruzada con múltiples fuentes confiables es una práctica esencial.",
            incorrect: "Incorrecto. Siempre debes contrastar información con múltiples fuentes confiables antes de aceptarla."
          }
        },
        {
          type: "multiple-choice",
          competence: "1.2",
          level: "Intermedio",
          title: "Identificación de sesgos",
          scenario: "Estás leyendo un artículo sobre una política gubernamental. ¿Qué indicio sugeriría un sesgo en la información?",
          options: [
            "Opción A: El uso de lenguaje emotivo y opiniones presentadas como hechos",
            "Opción B: La inclusión de tablas y gráficos con datos",
            "Opción C: La mención de fuentes específicas para las afirmaciones",
            "Opción D: La presentación de múltiples perspectivas"
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "Correcto. El lenguaje emotivo y la presentación de opiniones como hechos son indicadores de sesgo.",
            incorrect: "Incorrecto. El uso de lenguaje emotivo y la presentación de opiniones como hechos son señales de posible sesgo."
          }
        },
        
        // Competencia 1.3
        {
          type: "multiple-choice",
          competence: "1.3",
          level: "Básico 2",
          title: "Almacenamiento de documentos importantes",
          scenario: "Has recibido documentos digitales importantes como contratos y certificados. ¿Cuál es la mejor práctica para guardarlos?",
          options: [
            "Opción A: Crear copias de respaldo en múltiples ubicaciones y usar nombres descriptivos",
            "Opción B: Guardarlos solo en el escritorio de tu computadora",
            "Opción C: Mantenerlos únicamente en tu email",
            "Opción D: Imprimir y descartar las versiones digitales"
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "Correcto. Las copias de respaldo y la organización adecuada son fundamentales para la gestión de documentos importantes.",
            incorrect: "Incorrecto. Es fundamental tener múltiples copias de respaldo y una organización clara para documentos importantes."
          }
        },
        {
          type: "multiple-choice",
          competence: "1.3",
          level: "Básico 2",
          title: "Organización de archivos",
          scenario: "Tienes muchos archivos de trabajo acumulados. ¿Cuál es la mejor estrategia para organizarlos?",
          options: [
            "Opción A: Crear un sistema de carpetas jerárquico con nombres claros y etiquetas",
            "Opción B: Guardar todos los archivos en una sola carpeta",
            "Opción C: Depender solo de la función de búsqueda",
            "Opción D: Crear nuevas copias de los archivos cada vez que los uses"
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "Correcto. Un sistema jerárquico de carpetas con nombres descriptivos facilita la localización y gestión de archivos.",
            incorrect: "Incorrecto. La organización sistemática con carpetas y nombres descriptivos es esencial para una gestión eficiente."
          }
        },
        {
          type: "multiple-choice",
          competence: "1.3",
          level: "Básico 2",
          title: "Gestión de versiones",
          scenario: "Estás trabajando en un documento importante que sufre muchos cambios. ¿Cómo deberías gestionarlo?",
          options: [
            "Opción A: Usar un sistema de control de versiones o nomenclatura con fechas",
            "Opción B: Sobrescribir el archivo cada vez que hagas cambios",
            "Opción C: Crear copias sin ningún sistema de nombrado",
            "Opción D: Enviar cada versión por email a ti mismo"
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "Correcto. El control de versiones o un sistema de nomenclatura consistente permite rastrear cambios y recuperar versiones anteriores.",
            incorrect: "Incorrecto. Es importante mantener un sistema claro de versiones para documentos que sufren múltiples modificaciones."
          }
        },
        
        // Competencia 4.1
        {
          type: "multiple-choice",
          competence: "4.1",
          level: "Básico 2",
          title: "Seguridad de contraseñas",
          scenario: "Necesitas crear una contraseña para tu cuenta bancaria en línea. ¿Cuál es la mejor opción?",
          options: [
            "Opción A: Usar una contraseña larga con combinación de letras, números y símbolos",
            "Opción B: Usar tu fecha de nacimiento para recordarla fácilmente",
            "Opción C: Utilizar la misma contraseña que en otras cuentas",
            "Opción D: Usar el nombre de tu mascota o familiar"
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "Correcto. Las contraseñas largas con caracteres variados son mucho más seguras contra ataques.",
            incorrect: "Incorrecto. Las contraseñas deben ser complejas, con combinación de diferentes tipos de caracteres."
          }
        },
        {
          type: "multiple-choice",
          competence: "4.1",
          level: "Básico 2",
          title: "Protección contra malware",
          scenario: "Tu computadora está funcionando más lento de lo normal. ¿Qué medida deberías tomar?",
          options: [
            "Opción A: Ejecutar un análisis completo con un software antivirus actualizado",
            "Opción B: Ignorar el problema y seguir usándola normalmente",
            "Opción C: Descargar más aplicaciones para acelerar el sistema",
            "Opción D: Eliminar archivos al azar para liberar espacio"
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "Correcto. Un análisis antivirus es el primer paso para identificar posibles infecciones que afecten el rendimiento.",
            incorrect: "Incorrecto. Ante un comportamiento inusual del sistema, es importante verificar la presencia de malware."
          }
        },
        {
          type: "multiple-choice",
          competence: "4.1",
          level: "Básico 2",
          title: "Actualizaciones de seguridad",
          scenario: "Tu sistema operativo muestra una notificación de actualización de seguridad. ¿Qué deberías hacer?",
          options: [
            "Opción A: Instalar la actualización lo antes posible",
            "Opción B: Ignorar permanentemente todas las actualizaciones",
            "Opción C: Desactivar las notificaciones de actualización",
            "Opción D: Esperar varios meses para ver si la actualización es estable"
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "Correcto. Las actualizaciones de seguridad corrigen vulnerabilidades y deben instalarse prontamente.",
            incorrect: "Incorrecto. Las actualizaciones de seguridad son cruciales para proteger tu sistema y deben instalarse oportunamente."
          }
        },
        
        // Competencia 4.2
        {
          type: "multiple-choice",
          competence: "4.2",
          level: "Básico 2",
          title: "Configuración de privacidad",
          scenario: "Has instalado una nueva aplicación en tu teléfono. ¿Qué deberías hacer primero?",
          options: [
            "Opción A: Revisar y ajustar los permisos y configuraciones de privacidad",
            "Opción B: Otorgar todos los permisos que solicite sin revisar",
            "Opción C: Compartir la aplicación inmediatamente en redes sociales",
            "Opción D: Proporcionar toda tu información personal en el perfil"
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "Correcto. Revisar y limitar los permisos es esencial para proteger tu privacidad.",
            incorrect: "Incorrecto. Siempre debes revisar y configurar los permisos para proteger tus datos personales."
          }
        },
        {
          type: "multiple-choice",
          competence: "4.2",
          level: "Básico 2",
          title: "Protección de datos personales",
          scenario: "Un sitio web te pide información personal para registrarte. ¿Qué enfoque deberías adoptar?",
          options: [
            "Opción A: Proporcionar solo la información necesaria y verificar la política de privacidad",
            "Opción B: Compartir todos los datos personales que te pidan",
            "Opción C: Usar información real incluso si parece excesiva para el servicio",
            "Opción D: Ignorar completamente los términos y condiciones"
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "Correcto. Compartir solo lo necesario y revisar las políticas de privacidad es fundamental para proteger tus datos.",
            incorrect: "Incorrecto. Debes ser selectivo con la información personal que compartes y revisar las políticas de privacidad."
          }
        },
        {
          type: "multiple-choice",
          competence: "4.2",
          level: "Básico 2",
          title: "Seguridad en redes sociales",
          scenario: "Usas regularmente varias redes sociales. ¿Cuál es la mejor práctica de seguridad?",
          options: [
            "Opción A: Revisar periódicamente la configuración de privacidad y limitar quién puede ver tu contenido",
            "Opción B: Aceptar todas las solicitudes de amistad que recibas",
            "Opción C: Compartir detalles de tu ubicación en tiempo real con todos",
            "Opción D: Usar la misma contraseña en todas las redes para recordarla fácilmente"
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "Correcto. Revisar regularmente la configuración de privacidad es esencial para mantener el control de tu información.",
            incorrect: "Incorrecto. La revisión periódica de la configuración de privacidad es fundamental para proteger tu información."
          }
        },
        
        // Competencia 4.3
        {
          type: "multiple-choice",
          competence: "4.3",
          level: "Básico 2",
          title: "Equilibrio digital",
          scenario: "Pasas muchas horas seguidas frente a la pantalla. ¿Qué práctica es recomendable?",
          options: [
            "Opción A: Hacer pausas regulares y ejercicios para ojos y cuerpo",
            "Opción B: Aumentar el brillo de la pantalla al máximo",
            "Opción C: Consumir más cafeína para mantener la concentración",
            "Opción D: Ignorar los síntomas de fatiga visual o física"
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "Correcto. Las pausas regulares y los ejercicios son fundamentales para prevenir problemas de salud.",
            incorrect: "Incorrecto. Es importante hacer pausas y ejercicios para prevenir problemas físicos derivados del uso prolongado de dispositivos."
          }
        },
        {
          type: "multiple-choice",
          competence: "4.3",
          level: "Básico 2",
          title: "Uso saludable de dispositivos",
          scenario: "Utilizas tu smartphone antes de dormir y tienes problemas para conciliar el sueño. ¿Qué deberías considerar?",
          options: [
            "Opción A: Evitar las pantallas al menos una hora antes de dormir y usar modo nocturno",
            "Opción B: Aumentar el tiempo de uso del teléfono en la cama",
            "Opción C: Desactivar cualquier filtro de luz azul",
            "Opción D: Revisar notificaciones constantemente durante la noche"
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "Correcto. La luz azul de las pantallas puede interferir con el sueño, por lo que es mejor limitar su exposición.",
            incorrect: "Incorrecto. Es recomendable evitar las pantallas antes de dormir y utilizar filtros de luz azul para mejorar la calidad del sueño."
          }
        },
        {
          type: "multiple-choice",
          competence: "4.3",
          level: "Básico 2",
          title: "Gestión del estrés digital",
          scenario: "Te sientes abrumado por las constantes notificaciones en tu teléfono. ¿Qué medida sería más efectiva?",
          options: [
            "Opción A: Configurar tiempos de silencio y desactivar notificaciones no esenciales",
            "Opción B: Revisar inmediatamente cada notificación que aparezca",
            "Opción C: Mantener todas las notificaciones activas las 24 horas",
            "Opción D: Adquirir más dispositivos para distribuir las notificaciones"
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "Correcto. Gestionar las notificaciones ayuda a reducir la sobrecarga de información y el estrés digital.",
            incorrect: "Incorrecto. Es importante limitar y gestionar las notificaciones para reducir la ansiedad y la sobrecarga informativa."
          }
        },
        
        // Competencia 4.4
        {
          type: "multiple-choice",
          competence: "4.4",
          level: "Intermedio",
          title: "Consumo energético digital",
          scenario: "Utilizas múltiples dispositivos electrónicos. ¿Qué práctica contribuiría a reducir tu huella ambiental?",
          options: [
            "Opción A: Apagar completamente los dispositivos cuando no los uses, en lugar de dejarlos en espera",
            "Opción B: Mantener todos los dispositivos encendidos permanentemente",
            "Opción C: Comprar nuevos equipos cada año independientemente de su estado",
            "Opción D: Ignorar las opciones de ahorro de energía en los dispositivos"
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "Correcto. Apagar los dispositivos completamente reduce significativamente el consumo energético innecesario.",
            incorrect: "Incorrecto. Apagar los dispositivos cuando no se usan es una práctica importante para reducir el consumo energético."
          }
        },
        {
          type: "multiple-choice",
          competence: "4.4",
          level: "Intermedio",
          title: "Gestión de residuos electrónicos",
          scenario: "Tu teléfono móvil antiguo ya no funciona. ¿Cuál es la opción más responsable con el medio ambiente?",
          options: [
            "Opción A: Llevarlo a un punto de reciclaje específico para residuos electrónicos",
            "Opción B: Tirarlo a la basura común con el resto de desechos",
            "Opción C: Guardarlo indefinidamente en un cajón",
            "Opción D: Desecharlo en la naturaleza"
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "Correcto. Los residuos electrónicos contienen materiales tóxicos y valiosos que deben reciclarse adecuadamente.",
            incorrect: "Incorrecto. Los dispositivos electrónicos deben llevarse a puntos específicos de reciclaje para su correcto tratamiento."
          }
        },
        {
          type: "multiple-choice",
          competence: "4.4",
          level: "Intermedio",
          title: "Sostenibilidad en servicios digitales",
          scenario: "Utilizas servicios de almacenamiento en la nube. ¿Qué práctica es más sostenible?",
          options: [
            "Opción A: Gestionar regularmente tus archivos, eliminando duplicados y contenido innecesario",
            "Opción B: Almacenar múltiples copias del mismo archivo en diferentes servicios",
            "Opción C: Guardar todo indefinidamente sin ninguna gestión",
            "Opción D: Subir archivos en la máxima calidad posible aunque no sea necesario"
          ],
          correctAnswerIndex: 0,
          feedback: {
            correct: "Correcto. La gestión eficiente del almacenamiento reduce la demanda energética de los centros de datos.",
            incorrect: "Incorrecto. Eliminar contenido innecesario y evitar duplicados ayuda a reducir el impacto ambiental del almacenamiento digital."
          }
        }
      ]
      
      // Guardar en un archivo
      fs.writeFileSync(filePath, JSON.stringify(exampleQuestions, null, 2))
      console.log("✅ Se ha creado un archivo de ejemplo con preguntas para todas las competencias")
    }
    
    // Cargar las preguntas del archivo
    const questionsData = fs.readFileSync(filePath, 'utf8')
    const questions = JSON.parse(questionsData)
    
    console.log(`📤 Cargando ${questions.length} preguntas a Firestore...`)
    
    // Subir cada pregunta a Firestore
    let addedCount = 0
    for (const question of questions) {
      const docRef = await addDoc(collection(db, "questions"), {
        ...question,
        createdAt: new Date(),
        updatedAt: new Date(),
        vecesUtilizada: 0,
        tasaAcierto: 0,
      })
      addedCount++
      console.log(`✅ Pregunta agregada: ${addedCount}/${questions.length} - ${question.competence} - ${question.title}`)
    }
    
    // Mostrar resumen por competencia
    const competenceCount = questions.reduce(
      (acc, q) => {
        acc[q.competence] = (acc[q.competence] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    console.log("\n📊 Resumen de preguntas cargadas:")
    console.log(`   Total: ${questions.length} preguntas`)
    
    console.log("\n📋 Desglose por competencia:")
    Object.entries(competenceCount).sort().forEach(([comp, count]) => {
      const status = count >= 3 ? "✅" : "⚠️"
      console.log(`   ${status} ${comp}: ${count} preguntas${count < 3 ? " (se requieren al menos 3)" : ""}`)
    })
    
    console.log("\n🎉 ¡Proceso completado con éxito!")
    
  } catch (error) {
    console.error("❌ Error:", error)
  }
}

// Ejecutar la función
resetAndUploadQuestions()
