interface ChoiceBody {
  value: string;
  isCorrect: string;
}

export interface QuizBody {
  question: string;
  file: File[];
  choices: ChoiceBody[];
}
