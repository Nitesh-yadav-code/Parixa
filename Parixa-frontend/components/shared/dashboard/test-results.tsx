"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle2, XCircle, AlertTriangle, ArrowRight, RefreshCw } from "lucide-react"

interface  Question{
    id: string
    question: string
    options: string[]
    correctOption: number
    explanation: string
}
interface TestResultProps{
questions: Question []
selectedOptions: (number | null) []
bankId : string
isTimeUp : boolean
}
const TestResults = ({questions, selectedOptions, bankId, isTimeUp}: TestResultProps ) => {
     const [showExplanations, setShowExplanations] = useState<boolean[]>(new Array(questions.length).fill(false))
    //calculate score
    const correctAnswers = questions.filter((question, index)=> selectedOptions[index] === question.correctOption).length;
    const unansweredQuestions = selectedOptions.filter((option)=> option === null).length;
    const incorrectAnswers = questions.length - correctAnswers - unansweredQuestions;
    const scorePercentage = Math.round((correctAnswers / questions.length) * 100)

    //// Determine if passed (assuming 40% is passing)
    const isPassed = scorePercentage >= 40;

    const toggleExplanation = (index: number) => {
            const newShowExplainations = [...showExplanations];
            newShowExplainations[index] = !newShowExplainations[index]
            setShowExplanations(newShowExplainations)
  }

  return (
     <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Results summary card */}
          <motion.div
            className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
              <h1 className="text-2xl font-bold mb-2">Test Results</h1>
              {isTimeUp ? (
                <p className="flex items-center text-yellow-200">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Time is up! Your test was automatically submitted.
                </p>
              ) : (
                <p>You have completed the test. Here is how you did:</p>
              )}
            </div>

            <div className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                <div className="text-center md:text-left mb-4 md:mb-0">
                  <h2 className="text-3xl font-bold text-gray-900">{scorePercentage}%</h2>
                  <p className="text-gray-500">Your Score</p>
                  <div className={`mt-2 text-sm font-medium ${isPassed ? "text-green-600" : "text-red-600"}`}>
                    {isPassed ? "PASSED" : "FAILED"}
                  </div>
                </div>

                <div className="flex space-x-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
                    <p className="text-sm text-gray-500">Correct</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{incorrectAnswers}</div>
                    <p className="text-sm text-gray-500">Incorrect</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-500">{unansweredQuestions}</div>
                    <p className="text-sm text-gray-500">Unanswered</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href={`/dashboard/question-bank/${bankId}`}
                  className="px-6 py-3 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  Back to Question Bank
                </Link>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </button>
              </div>
            </div>
          </motion.div>

          {/* Questions review */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Review Questions</h2>

            {questions.map((question, index) => (
              <motion.div
                key={question.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="p-6">
                  <div className="flex items-start">
                    <div
                      className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center mr-3 ${
                        selectedOptions[index] === null
                          ? "bg-yellow-100 text-yellow-600"
                          : selectedOptions[index] === question.correctOption
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                      }`}
                    >
                      {selectedOptions[index] === null ? (
                        <AlertTriangle className="h-3 w-3" />
                      ) : selectedOptions[index] === question.correctOption ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : (
                        <XCircle className="h-3 w-3" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Question {index + 1}</h3>
                      <p className="text-gray-800 mb-4">{question.question}</p>

                      <div className="space-y-2 mb-4">
                        {question.options.map((option:string, optionIndex: number) => (
                          <div
                            key={optionIndex}
                            className={`p-3 rounded-lg border ${
                              optionIndex === question.correctOption ? "border border-green-500 bg-green-50" : selectedOptions[index] === optionIndex ? "border-red-500 bg-red-500" : "border-gray-300"
                            }`}
                          >
                            <div className="flex items-start">
                              <div
                                className={`flex-shrink-0 h-5 w-5 rounded-full border flex items-center justify-center mr-3 ${
                                  optionIndex === question.correctOption
                                    ? "border-green-500 bg-green-500"
                                    : selectedOptions[index] === optionIndex
                                      ? "border-red-500 bg-red-500"
                                      : "border-gray-300"
                                }`}
                              >
                                {(optionIndex === question.correctOption || selectedOptions[index] === optionIndex) && (
                                  <div className="h-2 w-2 rounded-full bg-white"></div>
                                )}
                              </div>
                              <span
                                className={`${
                                  optionIndex === question.correctOption
                                    ? "text-green-800"
                                    : selectedOptions[index] === optionIndex
                                      ? "text-red-800"
                                      : "text-gray-800"
                                }`}
                              >
                                {option}
                                {optionIndex === question.correctOption && (
                                  <span className="ml-2 text-green-600 text-sm font-medium">(Correct Answer)</span>
                                )}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => toggleExplanation(index)}
                        className="text-sm text-purple-600 hover:text-purple-800 font-medium flex items-center"
                      >
                        {showExplanations[index] ? "Hide Explanation" : "Show Explanation"}
                        <ArrowRight
                          className={`h-3 w-3 ml-1 transition-transform ${showExplanations[index] ? "rotate-90" : ""}`}
                        />
                      </button>

                      {showExplanations[index] && (
                        <div className="mt-3 p-3 bg-purple-50 border border-purple-100 rounded-lg">
                          <p className="text-sm text-gray-800">{question.explanation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestResults