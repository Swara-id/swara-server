import { ColumnType, Selectable, Insertable, Updateable } from "kysely";
import { Corpus } from "./Corpus";

export interface CorpusImageTable {
  imageUrl: string;
  corpusId: Corpus["id"];

  createdAt: ColumnType<Date, undefined, never>;
}

export type CorpusImage = Selectable<CorpusImageTable>;
export type NewCorpusImage = Insertable<CorpusImageTable>;
export type CorpusImageUpdate = Updateable<CorpusImageTable>;
