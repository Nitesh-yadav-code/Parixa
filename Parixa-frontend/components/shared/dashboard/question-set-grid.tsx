'use client'
import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

interface QuestionSet {
  id: string
  title: string
  isCompleted: boolean
}

interface QuestionSetGridProps{
    sets: QuestionSet[]
    bankId: string
}


const QuestionSetGrid = ({sets, bankId}: QuestionSetGridProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sets.map((set) => (
        <motion.div
          key={set.id}
          className="relative bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          onMouseEnter={() => setHoveredId(set.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* Content */}
          <div className="relative">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-medium text-gray-900">{set.title}</h3>
              {set.isCompleted && (
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  Completed
                </span>
              )}
            </div>

            <p className="text-sm text-gray-500 mb-6">
              Click on START to begin the test. Each test contains 20 multiple choice questions.
            </p>

            <div className="mt-auto flex flex-col space-y-3">
              <Link
                href="#"
                className="text-sm text-gray-500 hover:text-teal-600 flex items-center transition-colors duration-200"
              >
                <span>View results</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ml-1 transition-transform duration-200 ${
                    hoveredId === set.id ? "translate-x-1" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

               {set.isCompleted ? (
                <button className="w-full py-2.5 rounded-lg font-medium text-gray-500 bg-gray-200" disabled>
                  COMPLETED
                </button>
              ) : (
                <Link
                  href={`/dashboard/question-bank/${bankId}/test/${set.id}`}
                  className="w-full py-2.5 rounded-lg font-medium text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 shadow-sm hover:shadow transition-all duration-300 text-center"
                >
                  START
                </Link>
              )}
            </div>
          </div>

          {/* Bottom indicator */}
          {!set.isCompleted && hoveredId === set.id && (
            <motion.div
              className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-teal-600 rounded-b-xl"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default QuestionSetGrid