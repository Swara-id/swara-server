import {
  Generated,
  ColumnType,
  Selectable,
  Insertable,
  Updateable
} from "kysely";
import { Suggestion } from "./Suggestion";
import { Quiz } from "./Quiz";
import { Users } from "./Users";

export interface PointsTable {
  id: Generated<number>;
  desc: string;
  userId: Users["id"];
  source: "quiz" | "suggestion" | "challenge";
  quizId: null | Quiz["id"];
  suggestionId: Suggestion["id"] | null;
  points: number;

  createdAt: ColumnType<Date, undefined, never>;
  updatedAt: ColumnType<Date, undefined, undefined>;
}

export type Points = Selectable<PointsTable>;
export type NewPoints = Insertable<PointsTable>;
export type PointsUpdate = Updateable<PointsTable>;
