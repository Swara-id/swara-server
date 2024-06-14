import { Users } from "./Users";
import { Corpus } from "./Corpus";
import {
  ColumnType,
  Selectable,
  Insertable,
  Updateable,
  Generated
} from "kysely";

export interface UserProgressTable {
  id: Generated<number>;
  corpusId: Corpus["id"];
  userUid: Users["uid"];
  createdAt: ColumnType<Date, undefined, never>;
}

export type UserProgress = Selectable<UserProgressTable>;
export type NewUserProgress = Insertable<UserProgressTable>;
export type UserProgressUpdate = Updateable<UserProgressTable>;
