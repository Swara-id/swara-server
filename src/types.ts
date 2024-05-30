import { EventTable } from './models/Event';
import { UserCorpusTable } from './models/UserCorpus';
import { CorpusTable } from './models/corpus';
import { UsersTable } from './models/Users';
import { QuizTable } from './models/Quiz';


export interface Database {
  users: UsersTable 
  corpus: CorpusTable
  userCorpus: UserCorpusTable
  Event:EventTable
  quiz:QuizTable
}