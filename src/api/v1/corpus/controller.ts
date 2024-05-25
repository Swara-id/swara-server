import { getAllCorpus, createCorpus, getOneCorpus } from "./service";
import { NewCorpus } from "../../../models/corpus";
import { db } from "../../../database";
import { NextFunction, Request, Response } from "express";

export const indexAllCorpus = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const result = await getAllCorpus(req);

		res.status(200).json({ data: result, pagination:{}});
	} catch (error) {
		next(error);
	}
};

export const indexOneCorpus = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const result = await getOneCorpus(req);
		res.status(200).json({ data: result });
	} catch (error) {
		next(error);
	}
};

export const postCorpus = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const result = await createCorpus(req);
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
};
