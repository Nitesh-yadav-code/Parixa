'use client'

import { useState } from "react"

const DashboardTabs = () => {
    const [activeTab, setActiveTab] =  useState("all")
  return (
    <>
     <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
            <button onClick={()=>setActiveTab("all")} className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${activeTab === "all" ? "border-teal-600 text-teal-600": "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}>All Question Banks</button>

             <button
          onClick={() => setActiveTab("purchased")}
          className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
            activeTab === "purchased"
              ? "border-teal-500 text-teal-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Purchased Question Banks
        </button>
        </nav>
     </div>
    </>
  )
}

export default DashboardTabs