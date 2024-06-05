import {
	Generated,
	ColumnType,
	Selectable,
	Insertable,
	Updateable,
} from "kysely";
import { Corpus } from "./corpus";

export interface CorpusImageTable {
	imageUrl:string;
	corpusId:Corpus["id"]

	createdAt: ColumnType<Date>;
}

export type CorpusImage = Selectable<CorpusImageTable>;
export type NewCorpusImage = Insertable<CorpusImageTable>;
export type CorpusImageUpdate = Updateable<CorpusImageTable>;
