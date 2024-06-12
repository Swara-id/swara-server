import { Generated, ColumnType, Selectable, Updateable } from "kysely";

export interface NewsTypeTable {
  id: Generated<number>;
  name: string;

  createdAt: ColumnType<Date, undefined, never>;
  updatedAt: ColumnType<Date, undefined, undefined>;
}

export type NewsType = Selectable<NewsTypeTable>;
export type NewNewsType = { name: string };
export type NewsTypeUpdate = Updateable<NewsTypeTable>;
