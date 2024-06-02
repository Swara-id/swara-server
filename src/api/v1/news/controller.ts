import {
	getAllNews,
	createNews,
	getOneNews,
	deleteOneNews,
	updateOneNews,
} from "./service";
import { NewNews } from "../../../models/News";
import { db } from "../../../database";
import { NextFunction, Request, Response } from "express";

export const indexAllNews = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const result = await getAllNews(req);

		res.status(200).json({ data: result, pagination: {} });
	} catch (error) {
		next(error);
	}
};

export const indexOneNews = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { result, status } = await getOneNews(req);
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

export const postNews = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const result = await createNews(req);
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
};

export const deleteNews = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const result = await deleteOneNews(req);
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

export const putNews = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { message, status } = await updateOneNews(req);
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