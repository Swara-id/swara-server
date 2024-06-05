import { Users, UsersTable } from "./Users";

import {
	Generated,
	ColumnType,
	JSONColumnType,
	Selectable,
	Insertable,
	Updateable,
} from "kysely";

export interface SuggestionTable {
	id: Generated<number>;
	uid: string;
	type: "word" | "letter";
	value: string;
	verificationStatus: "approved" | "rejected" | "waiting";
	attachmentUrl: string;
	challengeId: null | string;
	userId: Users["id"] | null;
	userLocation: string | null;

	createdAt: ColumnType<Date>;
	updatedAt: ColumnType<Date>;
}

export type Suggestion = Selectable<SuggestionTable>;
export type NewSuggestion = Insertable<SuggestionTable>;
export type SuggestionUpdate = Updateable<SuggestionTable>;
