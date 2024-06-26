import { UserProgressTable } from "./models/UserProgress";
import { ChoiceTable } from "./models/Choice";
import { PointsTable } from "./models/Points";
import { CorpusImageTable } from "./models/CorpusImage";
import { SuggestionTable } from "./models/Suggestion";
import { ChallengeUpdate } from "./models/Challenge";
import { NewsTable } from "./models/News";
import { CorpusTable } from "./models/Corpus";
import { UsersTable } from "./models/Users";
import { QuizTable } from "./models/Quiz";
import { NewsTypeTable } from "./models/NewsType";
import { Request } from "express";

export interface Database {
  users: UsersTable;
  corpus: CorpusTable;
  corpusImage: CorpusImageTable;
  quiz: QuizTable;
  choice: ChoiceTable;
  news: NewsTable;
  newsType: NewsTypeTable;
  challenge: ChallengeUpdate;
  suggestion: SuggestionTable;
  points: PointsTable;
  userProgress: UserProgressTable;
}

export interface CustomError {
  message: string;
  status: number;
}

import * as core from "express-serve-static-core";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

export interface Query extends core.Query {}

export interface URLParams extends core.ParamsDictionary {}

export interface TRequest<
  ReqBody = unknown,
  ReqQuery = Query,
  Params extends URLParams = core.ParamsDictionary
> extends Request<Params, unknown, ReqBody, ReqQuery> {
  user?: DecodedIdToken;
}

export interface TResponse<T = undefined> {
  message: string;
  data?: T;
}

export interface ListResponse<T = undefined> {
  message: string;
  data: T[];
  pagination: {
    page?: number;
    perPage?: number;
    total?: number;
    pageCount?: number;
  };
}

export interface ErrorResponse {
  message: string;
}
