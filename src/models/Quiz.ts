import {
  Generated,
  Selectable,
  Insertable,
  Updateable,
  ColumnType
} from "kysely";

export interface QuizTable {
  id: Generated<number>;
  question: string;

  createdAt: ColumnType<Date, undefined, never>;
  updatedAt: ColumnType<Date, undefined, undefined>;
}

export type Quiz = Selectable<QuizTable>;
export type NewQuiz = Insertable<QuizTable>;
export type QuizUpdate = Updateable<QuizTable>;
