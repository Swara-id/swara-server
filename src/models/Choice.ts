import {
    Generated,
    Selectable,
    Insertable,
    Updateable,
    ColumnType,
} from "kysely";

export interface ChoiceTable {
    id: Generated<number>;
    value: string;
    quizId: number;  // Foreign key to the Quiz table
    imageUrl: string;
    isCorrect: boolean;

    createdAt: ColumnType<Date>,
    updatedAt: ColumnType<Date>,
}

export type Choice = Selectable<ChoiceTable>;
export type NewChoice = Insertable<ChoiceTable>;
export type ChoiceUpdate = Updateable<ChoiceTable>;