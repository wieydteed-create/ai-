
export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface Flashcard {
  term: string;
  definition: string;
}

export type Tab = 'summary' | 'quiz' | 'flashcards';
   