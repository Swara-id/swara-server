import { UsersTable } from "./Users";

import {
	Generated,
	ColumnType,
	JSONColumnType,
	Selectable,
	Insertable,
	Updateable,
} from "kysely";

export interface ChallengeTable {
	id: Generated<number>;
	uid: string;
	type: "word" | "letter";
	value: string;
	point: number;
	status: "ongoing" | "completed";

	createdAt: ColumnType<Date>;
	updatedAt: ColumnType<Date>;
}

export type Challenge = Selectable<ChallengeTable>;
export type NewChallenge = Insertable<ChallengeTable>;
export type ChallengeUpdate = Updateable<ChallengeTable>;
