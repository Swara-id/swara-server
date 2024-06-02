import { NewsTable } from "./models/News";
import { CorpusTable } from "./models/corpus";
import { UsersTable } from "./models/Users";
import { QuizTable } from "./models/Quiz";
import { NewsTypeTable } from "./models/NewsType";

export interface Database {
	users: UsersTable;
	corpus: CorpusTable;
	quiz: QuizTable;
	news: NewsTable;
	newsType: NewsTypeTable;
}
