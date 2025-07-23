export interface Question {
  id: number;
  text: string;
  subject: string;
  alternatives: string[];
  correctAnswer: number;
}

export interface UserAnswer {
  questionId: number;
  selectedAnswer: number | null;
}

export interface QuizState {
  userName: string;
  currentQuestion: number;
  answers: UserAnswer[];
  timeRemaining: number;
  isQuizStarted: boolean;
  isQuizEnded: boolean;
  showResults: boolean;
  score: number;
  isApproved: boolean;
  correctAnswers?: number;
}
