import React, { useState, useCallback } from 'react';
import { NameForm } from './components/NameForm';
import { Quiz } from './components/Quiz';
import { EndModal } from './components/EndModal';
import { useTimer } from './hooks/useTimer';
import { questions as allQuestions } from './data/questions';
import { selectRandomQuestions } from './utils/questionSelector';
import { UserAnswer, QuizState } from './types/quiz';

const QUIZ_TIME_SECONDS = 50 * 60; // 50 minutes

function App() {
  const [selectedQuestions, setSelectedQuestions] = useState<typeof allQuestions>([]);
  const [quizState, setQuizState] = useState<QuizState>({
    userName: '',
    currentQuestion: 0,
    answers: [],
    timeRemaining: QUIZ_TIME_SECONDS,
    isQuizStarted: false,
    isQuizEnded: false,
    showResults: false,
    score: 0,
    isApproved: false
  });

  const [showEndModal, setShowEndModal] = useState(false);

  const handleTimeUp = useCallback(() => {
    calculateResults();
  }, []);

  const calculateResults = () => {
    const answeredQuestions = quizState.answers.filter(a => a.selectedAnswer !== null);
    let correctAnswers = 0;

    answeredQuestions.forEach(answer => {
      const question = selectedQuestions.find(q => q.id === answer.questionId);
      if (question && answer.selectedAnswer === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const score = answeredQuestions.length > 0 ? (correctAnswers / answeredQuestions.length) * 100 : 0;
    const isApproved = score >= 75;

    setQuizState(prev => ({
      ...prev,
      showResults: true,
      score,
      isApproved,
      isQuizEnded: true
    }));

    setShowEndModal(true);
  };
  const { 
    timeRemaining, 
    startTimer, 
    resetTimer, 
    formatTime, 
    timeColor 
  } = useTimer(QUIZ_TIME_SECONDS, handleTimeUp);

  const handleStartQuiz = (name: string) => {
    const randomQuestions = selectRandomQuestions(allQuestions, 40);
    setSelectedQuestions(randomQuestions);
    
    setQuizState(prev => ({
      ...prev,
      userName: name,
      isQuizStarted: true,
      answers: randomQuestions.map(q => ({ questionId: q.id, selectedAnswer: null }))
    }));
    startTimer();
  };

  const handleAnswerSelect = (questionId: number, answer: number) => {
    setQuizState(prev => ({
      ...prev,
      answers: prev.answers.map(a => 
        a.questionId === questionId 
          ? { ...a, selectedAnswer: answer }
          : a
      )
    }));
  };

  const handlePreviousQuestion = () => {
    setQuizState(prev => ({
      ...prev,
      currentQuestion: Math.max(0, prev.currentQuestion - 1)
    }));
  };

  const handleNextQuestion = () => {
    setQuizState(prev => ({
      ...prev,
      currentQuestion: Math.min(selectedQuestions.length - 1, prev.currentQuestion + 1)
    }));
  };

  const handleEndQuiz = () => {
    calculateResults();
  };

  const handleRestart = () => {
    const randomQuestions = selectRandomQuestions(allQuestions, 40);
    setSelectedQuestions(randomQuestions);
    
    setQuizState({
      userName: quizState.userName,
      currentQuestion: 0,
      answers: randomQuestions.map(q => ({ questionId: q.id, selectedAnswer: null })),
      timeRemaining: QUIZ_TIME_SECONDS,
      isQuizStarted: true,
      isQuizEnded: false,
      showResults: false,
      score: 0,
      isApproved: false
    });
    setShowEndModal(false);
    resetTimer();
    startTimer();
  };

  const handleExit = () => {
    setSelectedQuestions([]);
    setQuizState({
      userName: '',
      currentQuestion: 0,
      answers: [],
      timeRemaining: QUIZ_TIME_SECONDS,
      isQuizStarted: false,
      isQuizEnded: false,
      showResults: false,
      score: 0,
      isApproved: false
    });
    setShowEndModal(false);
    resetTimer();
  };

  const answeredQuestions = quizState.answers.filter(a => a.selectedAnswer !== null).length;

  // Se não há questões selecionadas ainda, mostrar tela de nome
  if (!quizState.isQuizStarted || selectedQuestions.length === 0) {
    return <NameForm onStart={handleStartQuiz} />;
  }

  return (
    <>
      <Quiz
        questions={selectedQuestions}
        currentQuestion={quizState.currentQuestion}
        answers={quizState.answers}
        timeRemaining={timeRemaining}
        formatTime={formatTime}
        timeColor={timeColor}
        userName={quizState.userName}
        onAnswerSelect={handleAnswerSelect}
        onPreviousQuestion={handlePreviousQuestion}
        onNextQuestion={handleNextQuestion}
        onEndQuiz={handleEndQuiz}
      />
      
      <EndModal
        isOpen={showEndModal}
        onRestart={handleRestart}
        onExit={handleExit}
        answeredQuestions={answeredQuestions}
        totalQuestions={selectedQuestions.length}
        showResults={quizState.showResults}
        score={quizState.score}
        isApproved={quizState.isApproved}
      />
    </>
  );
}

export default App;
