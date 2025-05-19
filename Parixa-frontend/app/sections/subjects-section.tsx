"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

const subjects = [
  {
    name: "Mathematics",
    icon: "📐",
    topics: ["Algebra", "Calculus", "Geometry", "Trigonometry", "Statistics"],
    questions: 2500,
    color: "from-blue-500 to-cyan-400",
  },
  {
    name: "Physics",
    icon: "⚛️",
    topics: ["Mechanics", "Thermodynamics", "Electromagnetism", "Optics", "Modern Physics"],
    questions: 2100,
    color: "from-purple-500 to-indigo-500",
  },
  {
    name: "Chemistry",
    icon: "🧪",
    topics: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry", "Biochemistry"],
    questions: 1800,
    color: "from-green-500 to-emerald-400",
  },
  {
    name: "Biology",
    icon: "🧬",
    topics: ["Cell Biology", "Genetics", "Ecology", "Human Physiology", "Botany", "Zoology"],
    questions: 2300,
    color: "from-red-500 to-pink-500",
  },
  {
    name: "Computer Science",
    icon: "💻",
    topics: ["Programming", "Data Structures", "Algorithms", "Database Systems", "Operating Systems"],
    questions: 1500,
    color: "from-yellow-500 to-amber-400",
  },
  {
    name: "General Knowledge",
    icon: "🌍",
    topics: ["Current Affairs", "History", "Geography", "Politics", "Economics", "Sports"],
    questions: 3000,
    color: "from-teal-500 to-cyan-400",
  },
]

export function SubjectsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Subjects</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our extensive collection of subjects and start practicing with thousands of MCQs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <Link href={`/subjects/${subject.name.toLowerCase()}`}>
                <div className="relative bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-r ${subject.color} flex items-center justify-center text-white text-2xl`}
                      >
                        {subject.icon}
                      </div>
                      <h3 className="text-xl font-bold">{subject.name}</h3>
                    </div>
                    <span className="text-sm font-medium text-gray-500">{subject.questions} MCQs</span>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Popular Topics:</h4>
                    <div className="flex flex-wrap gap-2">
                      {subject.topics.slice(0, 4).map((topic, i) => (
                        <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          {topic}
                        </span>
                      ))}
                      {subject.topics.length > 4 && (
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          +{subject.topics.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-auto flex items-center text-purple-600 font-medium">
                    <span>Explore Subject</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-5 h-5 ml-1 transition-transform ${hoveredIndex === index ? "translate-x-1" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/subjects"
            className="inline-flex items-center text-purple-600 font-medium hover:text-purple-700 transition-colors"
          >
            View All Subjects
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
