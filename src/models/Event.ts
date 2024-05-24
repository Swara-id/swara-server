import {
  Generated,
  ColumnType,
  Selectable,
  Insertable,
  Updateable,
} from "kysely";

export interface EventTable {
  id: Generated<number>;
  uid: string;
  imageURL: string | undefined;
  videoURL: string | undefined;
  description:string;
  userUid:string;

  createdAt: ColumnType<Date, string | undefined, never>;
	updatedAt: ColumnType<Date, string | undefined>;

}

export type Event = Selectable<EventTable>;
export type NewEvent = Insertable<EventTable>;
export type EventUpdate = Updateable<EventTable>;
