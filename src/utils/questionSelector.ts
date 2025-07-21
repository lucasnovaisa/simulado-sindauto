import { Question } from '../types/quiz';

export const selectRandomQuestions = (questions: Question[], count: number = 40): Question[] => {
  // Criar uma cópia do array para não modificar o original
  const shuffled = [...questions];
  
  // Algoritmo Fisher-Yates para embaralhar o array
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // Retornar apenas as primeiras 'count' questões
  return shuffled.slice(0, count).map((question, index) => ({
    ...question,
    id: index + 1 // Renumerar as questões de 1 a 40
  }));
};