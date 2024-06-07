import { PointsTable } from './models/Points';
import { CorpusImageTable } from './models/CorpusImage';
import { SuggestionTable } from "./models/Suggestion";
import { ChallengeUpdate } from "./models/Challenge";
import { NewsTable } from "./models/News";
import { CorpusTable } from "./models/corpus";
import { UsersTable } from "./models/Users";
import { QuizTable } from "./models/Quiz";
import { NewsTypeTable } from "./models/NewsType";
import { Request } from "express";
import { ChoiceTable } from './models/Choice';

export interface Database {
	users: UsersTable;
	corpus: CorpusTable;
	corpusImage: CorpusImageTable;
	quiz: QuizTable;
	choice:ChoiceTable
	news: NewsTable;
	newsType: NewsTypeTable;
	challenge: ChallengeUpdate;
	suggestion: SuggestionTable;
	points:PointsTable;
	
}

export interface TRequest<T = any>
	extends Request {
	body: T;
}
