import {
	Generated,
	ColumnType,
	JSONColumnType,
	Selectable,
	Insertable,
	Updateable,
} from "kysely";
import { type } from "os";

// export interface QuizTable {
// 	id: Generated<number>;
// 	uid: string;
// 	character: string;
// 	about: string;
// 	profilePicURL: string;

// 	createdAt: ColumnType<Date, string | undefined, never>;
// 	updatedAt: ColumnType<Date, string | undefined>;
// }

interface Choices {
	value: string;
	picture: string;
	isCorrect: boolean;
  }
  
  export interface QuizTable {
	  id: Generated<number>;
	  uid: string;
	  question: string;
	choices: JSONColumnType<Choices[]>
  
	  createdAt: ColumnType<Date>;
	  updatedAt: ColumnType<Date>;
  }
  
  

export type Quiz = Selectable<QuizTable>;
export type NewQuiz = Insertable<QuizTable>;
export type QuizUpdate = Updateable<QuizTable>;
export type Choice = Selectable<Choices>;
