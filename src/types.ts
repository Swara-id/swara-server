import { SuggestionTable } from "./models/Suggestion";
import { ChallengeUpdate } from "./models/Challenge";
import { NewsTable } from "./models/News";
import { CorpusTable } from "./models/corpus";
import { UsersTable } from "./models/Users";
import { QuizTable } from "./models/Quiz";
import { NewsTypeTable } from "./models/NewsType";
import { Request } from "express";

export interface Database {
	users: UsersTable;
	corpus: CorpusTable;
	quiz: QuizTable;
	news: NewsTable;
	newsType: NewsTypeTable;
	challenge: ChallengeUpdate;
	suggestion: SuggestionTable;
}

export interface TRequest<T>
	extends Request {
	body: T;
}
