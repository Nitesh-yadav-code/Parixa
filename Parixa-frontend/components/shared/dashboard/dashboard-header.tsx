"use client"

import Link from "next/link"
import { useState } from "react"
import { Bell, ChevronDown, Menu, Search, User } from "lucide-react"

export function DashboardHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-8 w-8">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg"></div>
                <div className="absolute inset-0.5 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                    P
                  </span>
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Parixa
              </span>
            </Link>

            <nav className="hidden md:ml-10 md:flex md:space-x-1">
              <Link
                href="/dashboard"
                className="text-gray-900 font-medium hover:text-purple-600 px-3 py-2 rounded-md transition-colors duration-200"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/my-courses"
                className="text-gray-500 hover:text-purple-600 px-3 py-2 rounded-md transition-colors duration-200"
              >
                My Courses
              </Link>
              <Link
                href="/dashboard/practice"
                className="text-gray-500 hover:text-purple-600 px-3 py-2 rounded-md transition-colors duration-200"
              >
                Practice
              </Link>
              <Link
                href="/dashboard/results"
                className="text-gray-500 hover:text-purple-600 px-3 py-2 rounded-md transition-colors duration-200"
              >
                Results
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 p-2.5 transition-all duration-200"
                placeholder="Search..."
              />
            </div>

            <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100 relative transition-colors duration-200">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="hidden md:flex items-center">
              <button className="flex items-center text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors duration-200">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 flex items-center justify-center text-purple-700 mr-2 border border-purple-200">
                  <User className="h-4 w-4" />
                </div>
                <span>John Doe</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>

            <button
              className="md:hidden p-2 text-gray-500 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-100">
            <div className="relative mb-3">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 p-2.5"
                placeholder="Search..."
              />
            </div>
            <nav className="flex flex-col space-y-1">
              <Link href="/dashboard" className="text-gray-900 font-medium hover:bg-gray-50 px-3 py-2 rounded-md">
                Dashboard
              </Link>
              <Link href="/dashboard/my-courses" className="text-gray-500 hover:bg-gray-50 px-3 py-2 rounded-md">
                My Courses
              </Link>
              <Link href="/dashboard/practice" className="text-gray-500 hover:bg-gray-50 px-3 py-2 rounded-md">
                Practice
              </Link>
              <Link href="/dashboard/results" className="text-gray-500 hover:bg-gray-50 px-3 py-2 rounded-md">
                Results
              </Link>
              <div className="border-t border-gray-100 my-2"></div>
              <button className="flex items-center text-gray-500 hover:bg-gray-50 px-3 py-2 rounded-md">
                <User className="h-4 w-4 mr-2" />
                <span>Profile</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
