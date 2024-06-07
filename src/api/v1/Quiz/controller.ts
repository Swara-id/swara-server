import { getAllQuiz, createQuiz, getOneQuiz } from "./service";
import { NextFunction, Request, Response } from "express";

export const indexAllQuiz = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const result = await getAllQuiz(req);
		res.status(200).json({ data: result, pagination: {} });
	} catch (error) {
		next(error);
	}
};

    export const indexOneQuiz = async (
        req: Request,
        res: Response,    ) => {
        try {
            const result = await getOneQuiz(req);
            res.status(200).json({ data: result });
        } catch (error: any) {
            if (error && typeof error === "object" && "status" in error) {
                const { message, status } = error;
                res.status(status).json({ status, error: message });
            } else {
                res.status(500).json({ status: 500, error: "Unknown error occurred" });
            }
        }
    };


    export const postQuiz = async (
        req: Request,
        res: Response,    ) => {
        try {
            const result = await createQuiz (req);
            res.status(200).json({ data: result });
        } catch (error: any) {
            if (error && typeof error === "object" && "status" in error) {
                const { message, status } = error;
                res.status(status).json({ status, error: message });
            } else {
                res.status(500).json({ status: 500, error: "Unknown error occurred" });
            }
        }
    };