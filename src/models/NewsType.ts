import {
  Generated,
  ColumnType,
  Selectable,
  Insertable,
  Updateable
} from "kysely";

export interface NewsTypeTable {
  id: Generated<number>;
  name: string;

  createdAt?: ColumnType<Date>;
  updatedAt?: ColumnType<Date>;
}

export type NewsType = Selectable<NewsTypeTable>;
export type NewNewsType = Insertable<NewsTypeTable>;
export type NewsTypeUpdate = Updateable<NewsTypeTable>;
