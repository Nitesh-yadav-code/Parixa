import { DashboardHeader } from "@/components/shared/dashboard/dashboard-header";
import DashboardTabs from "@/components/shared/dashboard/dashboard-tabs";
import QuestionBankGrid from "@/components/shared/dashboard/question-bank-grid";

export default function StudentDashboard() {
  return (
    <>
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <main className="conatiner mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Question Bank</h1>
          <p className="text-gray-600">Access comprehensive question banks for various competitive exams</p>
        </div>
        <DashboardTabs />
        <QuestionBankGrid />
      </main>

    </div>
    
    </>
  );
}