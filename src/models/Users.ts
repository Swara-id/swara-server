import { ColumnType, Selectable, Insertable, Updateable } from "kysely";

export interface UsersTable {
  uid: string;
  fullName: string;
  userName: string;
  email: string;
  gender: "male" | "female" | "not-set";
  about: string;
  profilePicURL: string;
  points: ColumnType<number, undefined, number>;

  createdAt: ColumnType<Date, undefined, never>;
  updatedAt: ColumnType<Date, undefined, undefined>;
}

export type Users = Selectable<UsersTable>;
export type NewUsers = Insertable<UsersTable>;
export type UsersUpdate = Updateable<UsersTable>;
