import {
	getAllSuggestion,
	createSuggestion,
	getOneSuggestion,
	deleteOneSuggestion,
	updateOneSuggestion,
} from "./service";
import { NewCorpus } from "../../../models/corpus";
import { db } from "../../../database";
import { NextFunction, Request, Response } from "express";

export const indexAllSuggestion = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const result = await getAllSuggestion(req);

		res.status(200).json({ data: result, pagination: {} });
	} catch (error) {
		next(error);
	}
};

export const indexOneSuggestion = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { result, status } = await getOneSuggestion(req);
		res.status(status).json({ data: result });
	} catch (error: any) {
		if (error && typeof error === "object" && "status" in error) {
			const { message, status } = error;
			res.status(status).json({ status, error: message });
		} else {
			res.status(500).json({ status: 500, error: "Unknown error occurred" });
		}
	}
};

export const postSuggestion = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const result = await createSuggestion(req);
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
};

export const deleteSuggestion = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const result = await deleteOneSuggestion(req);
		res.status(result.status).json(result);
	} catch (error: any) {
		if (error && typeof error === 'object' && 'status' in error) {
			const { message, status } = error;
			res.status(status).json({ status, error: message });
		} else {
			res.status(500).json({ status: 500, error: 'Unknown error occurred' });
		}
	}
};

export const putSuggestion = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { message, status } = await updateOneSuggestion(req);
		res.status(status).json({ message });
	} catch (error: any) {
		if (error && typeof error === 'object' && 'status' in error) {
			const { message, status } = error;
			res.status(status).json({ status, error: message });
		} else {
			res.status(500).json({ status: 500, error: 'Unknown error occurred' });
		}
	}
};