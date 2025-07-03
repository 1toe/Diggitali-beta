"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { getUserResults } from "@/utils/results-manager"
import type { UserResult } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Sidebar from "@/components/Sidebar"

export default function ResultsPage() {
  const { user } = useAuth()
  const [results, setResults] = useState<UserResult[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadResults()
    }
  }, [user])

  const loadResults = async () => {
    try {
      const userResults = await getUserResults(user!.uid)
      setResults(userResults)
    } catch (error) {
      console.error("Error loading results:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mis Resultados</h1>
            <p className="text-gray-600">
              Historial completo de tus evaluaciones y progreso en competencias digitales.
            </p>
          </div>

          <div className="grid gap-6">
            {results.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">No tienes resultados aún. ¡Comienza tu primera evaluación!</p>
                </CardContent>
              </Card>
            ) : (
              results.map((result, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        Evaluación - {new Date(result.fecha).toLocaleDateString("es-ES")}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge variant={result.puntajeTotal >= 67 ? "default" : "secondary"}>
                          {result.puntajeTotal}%
                        </Badge>
                        <Badge variant="outline">{result.nivelDigComp}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">{result.respuestas.length}</div>
                        <div className="text-sm text-gray-600">Preguntas</div>
                      </div>

                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {result.respuestas.filter((r) => r.correcta).length}
                        </div>
                        <div className="text-sm text-gray-600">Correctas</div>
                      </div>

                      <div className="text-center p-4 bg-red-50 rounded-lg">
                        <div className="text-2xl font-bold text-red-600">
                          {result.respuestas.filter((r) => !r.correcta).length}
                        </div>
                        <div className="text-sm text-gray-600">Incorrectas</div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Competencias evaluadas:</h4>
                      <div className="flex flex-wrap gap-2">
                        {[...new Set(result.respuestas.map((r) => r.competence))].map((comp) => (
                          <Badge key={comp} variant="outline">
                            {comp}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
