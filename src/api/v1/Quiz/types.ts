export interface QuizResult {
  id: number;
  question: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Choice {
  imageUrl: string;
  value: string;
  isCorrect: string;
  createdAt: Date;
}

export interface QuizGet extends QuizResult {
  choices: Choice[];
}

export interface QuizBody {
  question: string;
  choices: ChoiceBody[];
}

export interface ChoiceBody {
  value: string;
  isCorrect: string;
}
