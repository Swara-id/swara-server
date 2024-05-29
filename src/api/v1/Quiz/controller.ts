import { getAllQuiz, createQuiz, getOneQuiz} from "./service";
import { NewQuiz } from "../../../models/Quiz";
import { db } from "../../../database";
import{NextFunction, Request, Response} from "express";


export const indexAllQuiz = async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    try {
        const result = await getAllQuiz(req)
        res.status(200).json({data: result, pagination:{}});
    } catch (error) {
        next(error);
    }
};

export const indexOneQuiz = async (
    req: Request,
	res: Response,
	next: NextFunction
)=>{
    try {
        const result = await getOneQuiz(req);
		res.status(200).json({ data: result });
    } catch (error) {
        next(error)
    }
};

export const postQuiz = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const result = await createQuiz(req);
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
};

