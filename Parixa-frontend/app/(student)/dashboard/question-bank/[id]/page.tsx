'use client'

import Link from "next/link"
import { ArrowLeft, Facebook, Twitter } from "lucide-react"
// import { questionBanks } from "@/lib/data"
import QuestionSetGrid from "@/components/shared/dashboard/question-set-grid"
import { use, useEffect, useState } from "react"

type QuestionSet = {
  id: string;
  title: string;
  isCompleted: boolean;
};

type ExamDetails = {
  time: string;
  fullMarks: string;
  passMarks: string;
  validityTime: string;
  negativeMarking: string;
  numberOfQuestions: string;
};

type QuestionBank = {
  id: string;
  shortName: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  sets: QuestionSet[];
  glowColor: string;
  bgColor: string;
  lastUpdated: string;
  language: string;
  purchases: number;
  price: number;
  originalPrice: number;
  examDetails: ExamDetails;
  // Remove: [key: string]: unknown;
};

export default function QuestionBankPage({ params }: { params: Promise<{ id: string } >}) {
const { id } = use(params)
  // Find the question bank by ID
  // const questionBank = questionBanks.find((qb) => qb.id === id) || questionBanks[0]
   const [questionBank, setQuestionBank] = useState<QuestionBank | null>(null);
  
   useEffect(() => {
  const fetchQuestionBank = async () => {
    const data = await fetch('http://localhost:5001/api/mcq/sets');
    const questionbanks = await data.json();
    const filtered = questionbanks.find((qb: QuestionBank) => qb.id === id);
    setQuestionBank(filtered || null);
  };
  fetchQuestionBank();
}, [id]);
  
 if(questionBank){
   return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-teal-600 font-medium hover:text-teal-700 mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden mb-8">
              {/* Header with gradient background */}
              <div className="bg-gradient-to-r from-purple-50 via-white to-blue-50 p-6">
                <div className="flex items-center mb-6">
                  <div className="relative">
                    {/* Glow effect */}
                    <div
                      className={`absolute -inset-0.5 ${questionBank.glowColor} rounded-full blur-sm opacity-70`}
                    ></div>
                    <div
                      className={`relative w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md ${questionBank.bgColor}`}
                    >
                      {questionBank.shortName}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h1 className="text-2xl font-bold text-gray-900">{questionBank.title}</h1>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {questionBank.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">{questionBank.description}</p>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="mr-1">Last Updated:</span>
                    <span className="font-medium">{questionBank.lastUpdated}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                      />
                    </svg>
                    <span className="mr-1">Language:</span>
                    <span className="font-medium">{questionBank.language}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2">Share with:</span>
                    <div className="flex space-x-2">
                      <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-sm hover:shadow transition-shadow duration-200">
                        <Facebook className="h-4 w-4" />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded-full bg-sky-500 text-white shadow-sm hover:shadow transition-shadow duration-200">
                        <Twitter className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="font-medium">{questionBank.purchases} Total Purchases</span>
                  </div>
                </div>
              </div>

              {/* Stats bar */}
              <div className="grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-100">
                <div className="p-4 text-center">
                  <div className="text-sm text-gray-500">Questions</div>
                  <div className="font-semibold text-gray-900">{questionBank.examDetails.numberOfQuestions}</div>
                </div>
                <div className="p-4 text-center">
                  <div className="text-sm text-gray-500">Time</div>
                  <div className="font-semibold text-gray-900">{questionBank.examDetails.time}</div>
                </div>
                <div className="p-4 text-center">
                  <div className="text-sm text-gray-500">Full Marks</div>
                  <div className="font-semibold text-gray-900">{questionBank.examDetails.fullMarks}</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-teal-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                MCQ Sets ({questionBank.sets.length} sets)
              </h2>
              <QuestionSetGrid sets={questionBank.sets} bankId ={id} />
            </div>
          </div>

          {/* //left side  */}

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden sticky top-6">
              {/* Price header with gradient */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm opacity-90 mb-1">Price:</div>
                    <div className="flex items-center">
                      <span className="text-white opacity-70 line-through text-lg">
                        Rs. {questionBank.originalPrice}
                      </span>
                      <span className="ml-2 text-3xl font-bold">Rs. {questionBank.price}</span>
                    </div>
                  </div>
                  <div className="bg-white text-purple-700 text-xs font-bold px-2.5 py-1.5 rounded-full">
                    {Math.round((1 - questionBank.price / questionBank.originalPrice) * 100)}% OFF
                  </div>
                </div>
              </div>

              <div className="p-6">
                <button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center mb-6 transition-all shadow-sm hover:shadow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Buy Question Bank
                </button>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-3 text-gray-700">Fully Syllabus Based</span>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-3 text-gray-700">With Tips and Explanations</span>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-3 text-gray-700">{questionBank.sets.length} MCQ Model Sets</span>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-3 text-gray-700">Instant Result</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Exam Details
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Time:</div>
                        <div className="font-medium text-gray-900">{questionBank.examDetails.time}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Full Marks:</div>
                        <div className="font-medium text-gray-900">{questionBank.examDetails.fullMarks}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Pass Marks:</div>
                        <div className="font-medium text-gray-900">{questionBank.examDetails.passMarks}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Validity Time:</div>
                        <div className="font-medium text-gray-900">{questionBank.examDetails.validityTime}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Negative Marking:</div>
                        <div className="font-medium text-gray-900">{questionBank.examDetails.negativeMarking}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Number of Questions:</div>
                        <div className="font-medium text-gray-900">{questionBank.examDetails.numberOfQuestions}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
 }
}
