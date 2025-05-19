export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOption: number;
}

export interface Attempt {
  id: string;
  examId: string;
  userId: string;
  score: number;
  completedAt: Date;
}