import {
  Generated,
  ColumnType,
  Selectable,
  Insertable,
  Updateable
} from "kysely";

export interface UsersTable {
  id: Generated<number>;
  uid: string;
  fullName: string;
  userName: string;
  gender: "male" | "female";
  about: string;
  profilePicURL: string | null;

  createdAt: ColumnType<Date, undefined, never>;
  updatedAt: ColumnType<Date, undefined, undefined>;
}

export type Users = Selectable<UsersTable>;
export type NewUsers = Insertable<UsersTable>;
export type UsersUpdate = Updateable<UsersTable>;
