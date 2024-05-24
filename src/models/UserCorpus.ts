import { UsersTable } from './Users';

import {
	Generated,
	ColumnType,
	JSONColumnType,
	Selectable,
	Insertable,
	Updateable,
} from "kysely";

export interface UserCorpusTable {
	id: Generated<number>;
	uid: string;
	imageURL: string | undefined;
	videoURL: string | undefined;
	type: "word" | "letter";
	value: string;
	status: "waiting" | "approved" | "rejected";
	userUid: UsersTable['uid']; // referencing the uid type from UserTable

	createdAt: ColumnType<Date, string | undefined, never>;
	updatedAt: ColumnType<Date, string | undefined>;
}


export type UserCorpus = Selectable<UserCorpusTable>;
export type NewUserCorpus = Insertable<UserCorpusTable>;
export type UserCorpusUpdate = Updateable<UserCorpusTable>;
