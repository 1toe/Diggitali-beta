"use client"

import { useState } from "react"
import type { TestSession } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Volume2, HelpCircle } from "lucide-react"

interface TestInterfaceProps {
  testSession: TestSession
  onAnswerSubmit: (answerIndex: number) => void
  onTestComplete: (session: TestSession) => void
}

export default function TestInterface({ testSession, onAnswerSubmit, onTestComplete }: TestInterfaceProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(
    testSession.answers[testSession.currentQuestionIndex],
  )
  const [currentIndex, setCurrentIndex] = useState(testSession.currentQuestionIndex)

  const currentQuestion = testSession.questions[currentIndex]
  const progress = ((currentIndex + 1) / testSession.questions.length) * 100

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNext = () => {
    if (selectedAnswer !== null) {
      onAnswerSubmit(selectedAnswer)

      if (currentIndex < testSession.questions.length - 1) {
        const nextIndex = currentIndex + 1
        setCurrentIndex(nextIndex)
        setSelectedAnswer(testSession.answers[nextIndex])
      } else {
        // Test completado
        const finalSession = {
          ...testSession,
          answers: testSession.answers.map((answer, index) => (index === currentIndex ? selectedAnswer : answer)),
        }
        onTestComplete(finalSession)
      }
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1
      setCurrentIndex(prevIndex)
      setSelectedAnswer(testSession.answers[prevIndex])
    }
  }

  const handleSkip = () => {
    if (currentIndex < testSession.questions.length - 1) {
      const nextIndex = currentIndex + 1
      setCurrentIndex(nextIndex)
      setSelectedAnswer(testSession.answers[nextIndex])
    }
  }

  return (
    <div className="min-h-screen Ladico-gradient">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold">Ladico</h1>
              <span className="text-sm opacity-80">
                {currentQuestion.dimension} | {currentQuestion.competence}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Volume2 className="w-5 h-5 cursor-pointer hover:opacity-80" />
              <span className="text-sm">Salir</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between text-white mb-2">
          <span className="text-sm">
            Pregunta {currentIndex + 1} / {testSession.questions.length}
          </span>
        </div>
        <Progress value={progress} className="h-2 bg-white/20" />
      </div>

      {/* Question Content */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <Card className="bg-white shadow-xl">
          <CardContent className="p-8">
            {/* Question Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Volume2 className="w-5 h-5 text-gray-400" />
              </div>
              <HelpCircle className="w-8 h-8 text-yellow-500" />
            </div>

            {/* Scenario */}
            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">{currentQuestion.scenario}</p>
            </div>

            {/* Question */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">{currentQuestion.title}</h2>
              <p className="text-sm text-gray-600 mb-6">Selecciona sólo una respuesta</p>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <label
                    key={index}
                    className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedAnswer === index
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={index}
                      checked={selectedAnswer === index}
                      onChange={() => handleAnswerSelect(index)}
                      className="mt-1 w-4 h-4 text-purple-600"
                    />
                    <span className="text-gray-700 leading-relaxed">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex space-x-3">
                {currentIndex > 0 && (
                  <Button onClick={handlePrevious} variant="outline" className="px-6 bg-transparent">
                    Anterior
                  </Button>
                )}

                <Button onClick={handleSkip} variant="outline" className="px-6 bg-transparent">
                  yo paso
                </Button>
              </div>

              <Button onClick={handleNext} disabled={selectedAnswer === null} className="px-8 Ladico-button-primary">
                {currentIndex === testSession.questions.length - 1 ? "Finalizar" : "Tu valida →"}
              </Button>
            </div>

            {/* Warning Message */}
            {selectedAnswer === null && (
              <div className="mt-4 flex items-center space-x-2 text-blue-600">
                <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                </div>

              </div>
            )}

            {/* Report Problem */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1">
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
