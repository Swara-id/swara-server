import {
	Generated,
	ColumnType,
	JSONColumnType,
	Selectable,
	Insertable,
	Updateable,
} from "kysely";

export interface QuizTable {
	id: Generated<number>;
	uid: string;
	character: string;
	about: string;
	profilePicURL: string;

	createdAt: ColumnType<Date, string | undefined, never>;
	updatedAt: ColumnType<Date, string | undefined>;
}

export type Quiz = Selectable<QuizTable>;
export type NewQuiz = Insertable<QuizTable>;
export type QuizUpdate = Updateable<QuizTable>;
