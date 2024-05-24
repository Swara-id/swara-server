import {
	Generated,
	ColumnType,
	JSONColumnType,
	Selectable,
	Insertable,
	Updateable,
} from "kysely";

export interface UsersTable {
	id: Generated<number>;
	uid: string;
	fullName: string;
	userName: string;
	gender: "male" | "female";
	about: string;
	profilePicURL: string;

	createdAt: ColumnType<Date, string | undefined, never>;
	updatedAt: ColumnType<Date, string | undefined>;
}

export type Users = Selectable<UsersTable>;
export type NewUsers = Insertable<UsersTable>;
export type UsersUpdate = Updateable<UsersTable>;
