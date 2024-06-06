import {
    Generated,
    ColumnType,
    Selectable,
    Insertable,
    Updateable,
} from "kysely";
import { NewChoice } from "./Choice"; // Import NewChoice type

export interface QuizTable {
    id?: number;
    uid: string;
    question: string;
    createdAt: Date;
    updatedAt: Date;
}


export type Quiz = Selectable<QuizTable>;
export type NewQuiz = Insertable<QuizTable>;
export type QuizUpdate = Updateable<QuizTable>;