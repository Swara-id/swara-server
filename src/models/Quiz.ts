import {
    Generated,
    ColumnType,
    Selectable,
    Insertable,
    Updateable,
} from "kysely";

export interface QuizTable {
	id: Generated<number>;
    question: string;
    

    createdAt: Date;
    updatedAt: Date;
}


export type Quiz = Selectable<QuizTable>;
export type NewQuiz = Insertable<QuizTable>;
export type QuizUpdate = Updateable<QuizTable>;