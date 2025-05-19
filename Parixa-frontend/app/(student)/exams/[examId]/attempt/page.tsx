export default function AttemptExamPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">Attempt Exam</h1>
        <p className="mt-4 text-center text-gray-600">Start your exam and keep an eye on the timer.</p>
        <div className="mt-8 p-4 bg-white rounded shadow-md">
          <h2 className="text-xl font-bold text-gray-800">Question 1</h2>
          <p className="mt-2 text-sm text-gray-600">This is the question text.</p>
          <div className="mt-4 space-y-2">
            <button className="w-full px-4 py-2 text-left bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Option 1
            </button>
            <button className="w-full px-4 py-2 text-left bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Option 2
            </button>
            <button className="w-full px-4 py-2 text-left bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Option 3
            </button>
            <button className="w-full px-4 py-2 text-left bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Option 4
            </button>
          </div>
          <button className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Submit Answer
          </button>
        </div>
      </div>
    </div>
  );
}