import { EventTable } from './models/Event';
import { CorpusTable } from './models/corpus';
import { UsersTable } from './models/Users';
import { QuizTable } from './models/Quiz';


export interface Database {
  users: UsersTable 
  corpus: CorpusTable
  Event:EventTable
  quiz:QuizTable
}