"use client";
import React, { useEffect, useState } from "react";
import TestTimer from "@/components/shared/dashboard/test-timer";
import Link from "next/link";
import { ArrowLeft, Clock, AlertCircle } from "lucide-react";
import TestResults from "./test-results";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctOption: number;
  explanation: string;
}

const MCQQuestion = ({ bankId }: { bankId: string }) => {
  const [questions, setquestionBanks] = useState<Question[]>([]);

  useEffect(() => {
    const fetchQuestionBank = async () => {
      const data = await fetch("http://localhost:5001/api/mcq/questions");
      const questionbank = await data.json();
      setquestionBanks(questionbank);
    };
    fetchQuestionBank();
  }, []);

  console.log(questions);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<(number | null)[]>([]);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes in seconds
  const [isTimeUp, setIsTimeUp] = useState(false);
  console.log(timeRemaining);

  useEffect(() => {
    setIsTimeUp(false);
  }, []);
  // Initialize selected options array with nulls
  useEffect(() => {
    setSelectedOptions(new Array(questions.length).fill(null));
  }, [questions.length]);

  const handleOptionSelect = (optionIndex: number) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = optionIndex;
    setSelectedOptions(newSelectedOptions);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  const handleSubmitTest = () => {
    setIsTestCompleted(true);
  };

  const currentQuestion = questions[currentQuestionIndex];

  // Calculate if all questions are answered
  const allQuestionsAnswered = selectedOptions.every(
    (option) => option !== null
  );

  if (isTestCompleted) {
    return (
      <TestResults
        questions={questions}
        selectedOptions={selectedOptions}
        bankId={bankId}
        isTimeUp={isTimeUp}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link
              href={`/dashboard/question-bank/${bankId}`}
              className="inline-flex items-center text-gray-500 hover:text-gray-700 font-medium transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Exit Test
            </Link>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-700">
                <Clock className="h-4 w-4 mr-1" />
                <TestTimer initialTime={600} onTimeUpdate={setTimeRemaining} />
              </div>
              <div className="text-sm font-medium">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Question navigation */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {questions.map((_, index) => (
                <button
                  key={index}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    index === currentQuestionIndex
                      ? "bg-purple-600 text-white"
                      : selectedOptions[index] !== null
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setCurrentQuestionIndex(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Question card */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-6">
            {currentQuestion ? (
              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-2">
                  Question {currentQuestionIndex + 1}
                </h2>
                <p className="text-gray-800">{currentQuestion.question}</p>
              </div>
            ) : (
              <div>No question available.</div>
            )}

            {currentQuestion && Array.isArray(currentQuestion.options) ? (
              <div className="space-y-3">
                {currentQuestion.options.map(
                  (option: string, index: number) => (
                    <button
                      key={index}
                      className={`w-full cursor-pointer text-left p-4 rounded-lg border transition-all ${
                        selectedOptions[currentQuestionIndex] === index
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-purple-200 hover:bg-purple-50/50"
                      }`}
                      onClick={() => handleOptionSelect(index)}
                    >
                      <div className="flex items-start">
                        <div
                          className={`flex-shrink-0 h-5 w-5 rounded-full border flex items-center justify-center mr-3 mt-0.5 ${
                            selectedOptions[currentQuestionIndex] === index
                              ? "border-purple-500 bg-purple-500"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedOptions[currentQuestionIndex] === index && (
                            <div className="h-2 w-2 rounded-full bg-white"></div>
                          )}
                        </div>
                        <span>{option}</span>
                      </div>
                    </button>
                  )
                )}
              </div>
            ) : (
              <div>No question available.</div>
            )}
          </div>
          {/* Navigation buttons */}
          <div className="flex justify-between">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className={`px-4 py-2 rounded-lg font-medium ${
                currentQuestionIndex === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>

            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={handleNextQuestion}
                className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
              >
                Next Question
              </button>
            ) : (
              <button
                onClick={handleSubmitTest}
                className={`px-6 py-2 font-medium rounded-lg transition-colors ${
                  allQuestionsAnswered
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-yellow-500 hover:bg-yellow-600 text-white"
                }`}
              >
                {allQuestionsAnswered ? (
                  "Submit Test"
                ) : (
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span>Submit Anyway</span>
                  </div>
                )}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MCQQuestion;
