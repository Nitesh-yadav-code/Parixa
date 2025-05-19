export default function ExamDetailsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">Exam Details</h1>
        <p className="mt-4 text-center text-gray-600">View the details of the selected exam.</p>
        <div className="mt-8 p-4 bg-white rounded shadow-md">
          <h2 className="text-xl font-bold text-gray-800">Exam Title</h2>
          <p className="mt-2 text-sm text-gray-600">Detailed description of the exam.</p>
          <button className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Start Exam
          </button>
        </div>
      </div>
    </div>
  );
}