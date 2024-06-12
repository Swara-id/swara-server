import {
  Generated,
  ColumnType,
  Selectable,
  Insertable,
  Updateable
} from "kysely";

export interface ChallengeTable {
  id: Generated<number>;
  uid: string;
  type: "word" | "letter";
  value: string;
  point: number;
  status: "ongoing" | "completed";

  createdAt: ColumnType<Date, undefined, never>;
  updatedAt: ColumnType<Date, undefined, undefined>;
}

export type Challenge = Selectable<ChallengeTable>;
export type NewChallenge = Insertable<ChallengeTable>;
export type ChallengeUpdate = Updateable<ChallengeTable>;
