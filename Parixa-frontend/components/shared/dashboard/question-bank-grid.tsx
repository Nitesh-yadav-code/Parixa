'use client'
import Link from "next/link";
// import { questionBanks } from "@/lib/data";
import { useEffect, useState } from "react";

type QuestionBank = {
  id: string;
  shortName: string;
  title: string;
  subtitle: string;
  tags: string[];
  sets: { id: string; title: string; isCompleted: boolean }[];
  bgColor: string,
  purchases: string
};

const QuestionBankGrid = () => {
  const [questionBanks, setquestionBanks] = useState<QuestionBank[]>([]);

  useEffect(()=>{
     const fetchQuestionBank = async()=>{
      const data = await fetch('http://localhost:5001/api/mcq')
      const questionbank = await data.json();
      setquestionBanks(questionbank)
     }
     fetchQuestionBank();
  },[])

  

   return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {questionBanks.map((bank) => (
        <Link
          key={bank.id}
          href={`/dashboard/question-bank/${bank.id}`}
          className="group relative bg-white rounded-xl border border-gray-100 hover:border-transparent shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
        >
          {/* Gradient background effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="relative p-6 flex flex-col items-center text-center">
              <div className="relative">
                <div
                  className={`relative w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-5 shadow-md ${bank.bgColor} group-hover:scale-105 transition-transform duration-300`}
                >
                  {bank.shortName}
                </div>
              </div>

            <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors duration-300">
              {bank.title}
            </h3>
            <p className="text-sm text-gray-500 mb-4">{bank.subtitle}</p>

            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-1 mb-4">
              {bank.tags.slice(0, 2).map((tag, index) => (
                <span key={index} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto relative">
            {/* Gradient border top */}
            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-purple-200 to-transparent"></div>

            <div className="p-4 text-center">
              <div className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">
                {bank.sets.length} Sets
              </div>
              <div className="text-xs text-gray-500 mt-1">{bank.purchases} Students Enrolled</div>
            </div>
          </div>

          {/* Hover indicator */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </Link>
      ))}
    </div>
  )
}

export default QuestionBankGrid