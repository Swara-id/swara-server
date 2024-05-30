import { Request } from "express";
import {db} from "../../../database";
import { QuizTable, NewQuiz, Choice } from "../../../models/Quiz";

export const getAllQuiz = async (req: Request) =>{
    const result = await db.selectFrom("quiz").selectAll().execute();
    return result;
};

export const getOneQuiz = async (req: Request) => {
    const {id}= req.params;
    const numericId = Number(id);
    if (isNaN(numericId)) {
        throw new Error('Invalid ID parameter')
    }
    const result = await db
        .selectFrom("quiz")
        .selectAll()
        .where("id", "=", numericId)
        .executeTakeFirst()
    return result;
};
export const createQuiz = async(req: Request<any, any, NewQuiz>) =>{
    const{body}=req;
    const result = await db.insertInto('quiz').values({
        ...body,
    }).returningAll().executeTakeFirst();
    return result;
}
