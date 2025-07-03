"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { collection, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function AdminPanel() {
  const { user } = useAuth()
  const { toast } = useToast()

  const [questionData, setQuestionData] = useState({
    competence: "",
    level: "Básico 2",
    dimension: "",
    title: "",
    scenario: "",
    options: ["", "", "", ""],
    correctAnswerIndex: 0,
    correctFeedback: "",
    incorrectFeedback: "",
  })

  const competences = [
    { id: "1.1", name: "Navegar, buscar y filtrar", dimension: "Información y alfabetización informacional" },
    { id: "1.2", name: "Evaluar datos e información", dimension: "Información y alfabetización informacional" },
    { id: "1.3", name: "Gestión de datos", dimension: "Información y alfabetización informacional" },
    { id: "4.1", name: "Proteger dispositivos", dimension: "Seguridad" },
    { id: "4.2", name: "Proteger datos personales", dimension: "Seguridad" },
    { id: "4.3", name: "Proteger salud y bienestar", dimension: "Seguridad" },
    { id: "4.4", name: "Proteger medio ambiente", dimension: "Seguridad" },
  ]

  const handleCompetenceChange = (competenceId: string) => {
    const competence = competences.find((c) => c.id === competenceId)
    setQuestionData({
      ...questionData,
      competence: competenceId,
      dimension: competence?.dimension || "",
    })
  }

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...questionData.options]
    newOptions[index] = value
    setQuestionData({ ...questionData, options: newOptions })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const question = {
        type: "multiple-choice",
        competence: questionData.competence,
        level: questionData.level,
        dimension: questionData.dimension,
        title: questionData.title,
        scenario: questionData.scenario,
        options: questionData.options,
        correctAnswerIndex: questionData.correctAnswerIndex,
        feedback: {
          correct: questionData.correctFeedback,
          incorrect: questionData.incorrectFeedback,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      await addDoc(collection(db, "questions"), question)

      toast({
        title: "Pregunta agregada",
        description: "La pregunta ha sido guardada exitosamente en la base de datos.",
      })

      // Reset form
      setQuestionData({
        competence: "",
        level: "Básico 2",
        dimension: "",
        title: "",
        scenario: "",
        options: ["", "", "", ""],
        correctAnswerIndex: 0,
        correctFeedback: "",
        incorrectFeedback: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo guardar la pregunta. Intenta nuevamente.",
        variant: "destructive",
      })
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Acceso no autorizado</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Panel de Administración - Agregar Pregunta</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="competence">Competencia</Label>
                  <Select onValueChange={handleCompetenceChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona competencia" />
                    </SelectTrigger>
                    <SelectContent>
                      {competences.map((comp) => (
                        <SelectItem key={comp.id} value={comp.id}>
                          {comp.id} - {comp.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level">Nivel</Label>
                  <Select onValueChange={(value) => setQuestionData({ ...questionData, level: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona nivel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Básico 1">Básico 1</SelectItem>
                      <SelectItem value="Básico 2">Básico 2</SelectItem>
                      <SelectItem value="Intermedio 1">Intermedio 1</SelectItem>
                      <SelectItem value="Intermedio 2">Intermedio 2</SelectItem>
                      <SelectItem value="Avanzado 1">Avanzado 1</SelectItem>
                      <SelectItem value="Avanzado 2">Avanzado 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Título de la pregunta</Label>
                <Input
                  id="title"
                  value={questionData.title}
                  onChange={(e) => setQuestionData({ ...questionData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="scenario">Escenario</Label>
                <Textarea
                  id="scenario"
                  value={questionData.scenario}
                  onChange={(e) => setQuestionData({ ...questionData, scenario: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-4">
                <Label>Opciones de respuesta</Label>
                {questionData.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="correct"
                      checked={questionData.correctAnswerIndex === index}
                      onChange={() => setQuestionData({ ...questionData, correctAnswerIndex: index })}
                    />
                    <Input
                      placeholder={`Opción ${index + 1}`}
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      required
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="correctFeedback">Feedback para respuesta correcta</Label>
                  <Textarea
                    id="correctFeedback"
                    value={questionData.correctFeedback}
                    onChange={(e) => setQuestionData({ ...questionData, correctFeedback: e.target.value })}
                    rows={2}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="incorrectFeedback">Feedback para respuesta incorrecta</Label>
                  <Textarea
                    id="incorrectFeedback"
                    value={questionData.incorrectFeedback}
                    onChange={(e) => setQuestionData({ ...questionData, incorrectFeedback: e.target.value })}
                    rows={2}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full Ladico-button-primary">
                Agregar Pregunta
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
