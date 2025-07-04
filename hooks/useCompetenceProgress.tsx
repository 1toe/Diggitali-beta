"use client"

import { useState, useEffect } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/contexts/AuthContext'
import type { UserResult } from '@/types'

interface CompetenceProgressData {
  progress: Record<string, number>
  loading: boolean
  error: Error | null
}

export function useCompetenceProgress(): CompetenceProgressData {
  const { user } = useAuth()
  const [progress, setProgress] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchUserResults = async () => {
      if (!user?.uid || !db) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        
        // Consulta los resultados del usuario desde Firestore
        const q = query(collection(db, "userResults"), where("userId", "==", user.uid))
        const querySnapshot = await getDocs(q)
        
        // Mapa para contar tests aprobados por competencia
        const competenceProgress: Record<string, { passed: number, total: number }> = {}
        
        querySnapshot.forEach((doc) => {
          const result = doc.data() as UserResult
          
          // Agrupar por competencia
          const competenceResults: Record<string, { correct: number, total: number }> = {}
          
          // Contar respuestas correctas por competencia
          result.respuestas.forEach(respuesta => {
            if (!competenceResults[respuesta.competence]) {
              competenceResults[respuesta.competence] = { correct: 0, total: 0 }
            }
            
            competenceResults[respuesta.competence].total++
            if (respuesta.correcta) {
              competenceResults[respuesta.competence].correct++
            }
          })
          
          // Determinar si pasó la competencia (al menos 2 de 3 correctas = 66%)
          Object.entries(competenceResults).forEach(([competence, data]) => {
            if (!competenceProgress[competence]) {
              competenceProgress[competence] = { passed: 0, total: 0 }
            }
            
            competenceProgress[competence].total++
            
            if (data.correct / data.total >= 0.66) {
              competenceProgress[competence].passed++
            }
          })
        })
        
        // Convertir recuentos a porcentajes
        const progressPercentages: Record<string, number> = {}
        
        Object.entries(competenceProgress).forEach(([competence, counts]) => {
          // Si ha hecho algún intento, mostrar el progreso basado en cuántos tests ha pasado
          if (counts.total > 0) {
            progressPercentages[competence] = Math.round((counts.passed / counts.total) * 100)
          } else {
            progressPercentages[competence] = 0
          }
        })
        
        setProgress(progressPercentages)
        setLoading(false)
      } catch (err) {
        console.error("Error al cargar el progreso de las competencias:", err)
        setError(err instanceof Error ? err : new Error('Error desconocido'))
        setLoading(false)
      }
    }
    
    fetchUserResults()
  }, [user?.uid])
  
  return { progress, loading, error }
}
