import { Challenge } from "./Challenge";
import { Users } from "./Users";

import {
  Generated,
  Selectable,
  Insertable,
  Updateable,
  ColumnType
} from "kysely";

export interface SuggestionTable {
  id: Generated<number>;
  uid: string;
  type: "word" | "letter";
  value: string;
  verificationStatus: "approved" | "rejected" | "waiting";
  attachmentUrl: string;
  challengeId: null | Challenge["id"];
  userId: Users["id"];
  userLocation: string | null;
  createdAt?: ColumnType<Date>;
  updatedAt?: ColumnType<Date>;
}

export type Suggestion = Selectable<SuggestionTable>;
export type NewSuggestion = Insertable<SuggestionTable>;
export type SuggestionUpdate = Updateable<SuggestionTable>;
