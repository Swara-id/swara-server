import { EventTable } from './models/Event';
import { UserCorpusTable } from './models/UserCorpus';
import { CorpusTable } from './models/corpus';
import { UsersTable } from './models/Users';

export interface Database {
  users: UsersTable 
  corpus: CorpusTable
  userCorpus: UserCorpusTable
  Event:EventTable
}