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
  value: string;
  verificationStatus: "approved" | "rejected" | "waiting";
  attachmentUrl: string;
  challengeId: null | Challenge["id"];
  userUid: Users["uid"];
  userLocation: string | null;
  createdAt: ColumnType<Date, undefined, never>;
  updatedAt: ColumnType<Date, undefined, undefined>;
}

export type Suggestion = Selectable<SuggestionTable>;
export type NewSuggestion = Insertable<SuggestionTable>;
export type SuggestionUpdate = Updateable<SuggestionTable>;
