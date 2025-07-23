import { Question } from "../types/quiz";

export const selectRandomQuestions = (
  questions: Question[],
  count: number = 40
): Question[] => {
  const shuffled = [...questions];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count).map((question, index) => ({
    ...question,
    id: index + 1,
  }));
};
