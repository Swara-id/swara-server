	import {
		Generated,
		ColumnType,
		Selectable,
		Insertable,
		Updateable,
	} from "kysely";

	export interface CorpusTable {
		id: Generated<number>;
		uid: string;
		imageURL: string | undefined;
		videoURL: string | undefined;
		type: "word" | "letter";
		value: string;
		createdAt: ColumnType<Date>;
		updatedAt: ColumnType<Date>;
	}

	

	export type Corpus = Selectable<CorpusTable>;
	export type NewCorpus = Insertable<CorpusTable>;
	export type CorpusUpdate = Updateable<CorpusTable>;
