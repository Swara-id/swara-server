import { ListResponse, TResponse } from "../../../types";

export interface QuizResult {
  id: number;
  question: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Choice {
  imageUrl: string;
  value: string;
  isCorrect: boolean;
  createdAt: Date;
}

export interface QuizGet extends QuizResult {
  choices: Choice[];
}

export interface QuizResponse extends TResponse<QuizGet> {}
export interface QuizListResponse extends ListResponse<QuizResult> {}

export interface QuizBody {
  question: string;
  choices: ChoiceBody[];
}

export interface ChoiceBody {
  value: string;
  isCorrect: string;
}
