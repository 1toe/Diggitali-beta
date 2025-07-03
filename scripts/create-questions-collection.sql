-- Este script es para referencia de la estructura de datos en Firestore
-- Las preguntas se almacenarán en la colección 'questions' con la siguiente estructura:

-- Documento de ejemplo para competencia 1.1:
{
  "id": "question_1_1_basic_001",
  "type": "multiple-choice",
  "competence": "1.1",
  "level": "Básico 2",
  "dimension": "Información y alfabetización informacional",
  "title": "Búsqueda efectiva de información gubernamental",
  "scenario": "María necesita renovar su pasaporte y busca información oficial sobre requisitos y procedimientos en línea.",
  "options": [
    "Buscar 'renovación pasaporte requisitos 2024' en el sitio web oficial del gobierno",
    "Preguntar en redes sociales sobre el proceso",
    "Buscar solo 'pasaporte' en cualquier buscador",
    "Esperar a que alguien le explique personalmente"
  ],
  "correctAnswerIndex": 0,
  "feedback": {
    "correct": "¡Correcto! Usar términos específicos en sitios oficiales es la estrategia más efectiva.",
    "incorrect": "Recuerda usar palabras clave específicas y buscar en fuentes oficiales confiables."
  },
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}

-- Estructura para usuarios en la colección 'users':
{
  "uid": "user_unique_id",
  "name": "Nombre Usuario",
  "email": "usuario@email.com",
  "age": 25,
  "country": "Chile",
  "LadicoScore": 0,
  "completedCompetences": [],
  "currentLevel": "basico",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}

-- Estructura para sesiones de test en la colección 'testSessions':
{
  "id": "session_unique_id",
  "userId": "user_unique_id",
  "competence": "1.1",
  "level": "basico",
  "questions": [], -- Array de preguntas utilizadas
  "answers": [0, 1, null], -- Respuestas del usuario (null = no respondida)
  "currentQuestionIndex": 0,
  "startTime": "2024-01-01T10:00:00Z",
  "endTime": "2024-01-01T10:15:00Z",
  "score": 67,
  "passed": true,
  "createdAt": "2024-01-01T10:00:00Z"
}
