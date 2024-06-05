import {
	Generated,
	ColumnType,
	Selectable,
	Insertable,
	Updateable,
} from "kysely";
import { Suggestion } from "./Suggestion";

export interface PointsTable {
	id: Generated<number>;
	name: string;
	userId: string;
	source: "quiz" | "learning" | "challenge";
	quizId: null | "";
	suggestionId: null | Suggestion["uid"];
	points: number;

	createdAt: ColumnType<Date>;
	updatedAt: ColumnType<Date>;
}

export type Points = Selectable<PointsTable>;
export type NewPoints = Insertable<PointsTable>;
export type PointsUpdate = Updateable<PointsTable>;
