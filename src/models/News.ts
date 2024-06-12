import { NewsType } from "./NewsType";
import {
  Generated,
  ColumnType,
  Selectable,
  Insertable,
  Updateable
} from "kysely";

export interface NewsTable {
  id: Generated<number>;
  uid: string;
  title: string;
  description: string;
  userUid: string;
  newsTypeId: NewsType["id"];
  dateOfEvent: ColumnType<Date>;
  thumbnailUrl: string;
  createdAt: ColumnType<Date, undefined, never>;
  updatedAt: ColumnType<Date, undefined, undefined>;
}

export type News = Selectable<NewsTable>;
export type NewNews = Insertable<NewsTable>;
export type NewsUpdate = Updateable<NewsTable>;
