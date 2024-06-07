import {
    Generated,
    Selectable,
    Insertable,
    Updateable,
} from "kysely";

export interface ChoiceTable {
    id: Generated<number>;
    quizId: number;  // Foreign key to the Quiz table
    value: string;
    imageUrl: string;
    isCorrect: boolean;
}

export type Choice = Selectable<ChoiceTable>;
export type NewChoice = Insertable<ChoiceTable>;
export type ChoiceUpdate = Updateable<ChoiceTable>;