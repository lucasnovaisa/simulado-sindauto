import React from "react";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  CheckSquare,
  AlertTriangle,
} from "lucide-react";
import { Question, UserAnswer } from "../types/quiz";

interface QuizProps {
  questions: Question[];
  currentQuestion: number;
  answers: UserAnswer[];
  timeRemaining: number;
  formatTime: string;
  timeColor: string;
  userName: string;
  onAnswerSelect: (questionId: number, answer: number) => void;
  onPreviousQuestion: () => void;
  onNextQuestion: () => void;
  onEndQuiz: () => void;
}

export const Quiz: React.FC<QuizProps> = ({
  questions,
  currentQuestion,
  answers,
  formatTime,
  timeColor,
  userName,
  onAnswerSelect,
  onPreviousQuestion,
  onNextQuestion,
  onEndQuiz,
}) => {
  const question = questions[currentQuestion];
  const currentAnswer = answers.find(
    (a) => a.questionId === question.id
  )?.selectedAnswer;
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const answeredQuestions = answers.filter(
    (a) => a.selectedAnswer !== null
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col gap-2 items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-800">
                Simulado Sindauto BA - {userName}
              </h1>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>
                  Questão {currentQuestion + 1} de {questions.length}
                </span>
                <span>•</span>
                <span>{answeredQuestions} respondidas</span>
              </div>
            </div>

            <div className="flex justify-around items-center space-x-4">
              <div
                className={`flex items-center space-x-2 font-mono text-lg font-semibold ${timeColor}`}
              >
                <Clock className="w-5 h-5" />
                <span>{formatTime}</span>
              </div>

              <button
                onClick={onEndQuiz}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Encerrar</span>
              </button>
            </div>
          </div>

          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="mb-8">
            <div className="flex items-start space-x-3 mb-6">
              <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 font-semibold text-sm">
                  {currentQuestion + 1}
                </span>
              </div>
              <div className="flex-1">
                <div className="mb-2">
                  <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full">
                    {question.subject}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 leading-relaxed">
                  {question.text}
                </h2>
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-8">
            {question.alternatives.map((alternative, index) => {
              const isSelected = currentAnswer === index;
              const letter = String.fromCharCode(65 + index);

              return (
                <button
                  key={index}
                  onClick={() => onAnswerSelect(question.id, index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                    isSelected
                      ? "border-red-500 bg-red-50 shadow-md"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold ${
                        isSelected
                          ? "border-red-500 bg-red-500 text-white"
                          : "border-gray-300 text-gray-600"
                      }`}
                    >
                      {isSelected ? (
                        <CheckSquare className="w-4 h-4" />
                      ) : (
                        letter
                      )}
                    </div>
                    <span
                      className={`text-base ${
                        isSelected
                          ? "text-red-800 font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      {alternative}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <button
              onClick={onPreviousQuestion}
              disabled={currentQuestion === 0}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                currentQuestion === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Progresso</div>
              <div className="text-lg font-semibold text-gray-800">
                {currentQuestion + 1} / {questions.length}
              </div>
            </div>

            <button
              onClick={onNextQuestion}
              disabled={currentQuestion === questions.length - 1}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                currentQuestion === questions.length - 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-red-600 text-white hover:bg-red-700 hover:shadow-md"
              }`}
            >
              <span>Próxima</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="hidden md:block mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Navegação das Questões
          </h3>
          <div className="grid grid-cols-8 md:grid-cols-10 gap-2">
            {questions.map((_, index) => {
              const isAnswered =
                answers.find((a) => a.questionId === index + 1)
                  ?.selectedAnswer !== null;
              const isCurrent = index === currentQuestion;
              const userAnswer = answers.find(
                (a) => a.questionId === index + 1
              )?.selectedAnswer;
              const correctAnswer = questions[index].correctAnswer;
              const isCorrect = isAnswered && userAnswer === correctAnswer;
              const isIncorrect = isAnswered && userAnswer !== correctAnswer;

              return (
                <button
                  key={index}
                  onClick={() => {}}
                  className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all duration-200 ${
                    isCurrent
                      ? "bg-yellow-500 text-white shadow-lg"
                      : isCorrect
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : isIncorrect
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : isAnswered
                      ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
          <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-gray-600">Atual</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-gray-600">Correta</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-gray-600">Incorreta</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
              <span className="text-gray-600">Não respondida</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
