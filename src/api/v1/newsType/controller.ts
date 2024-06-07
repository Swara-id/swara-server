import {
	getAllNewsType,
	createNewsType,
	getOneNewsType,
	deleteOneNewsType,
	updateOneNewsType,
} from "./service";
import { NextFunction, Request, Response } from "express";

export const indexAllNewsType = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const result = await getAllNewsType(req);

		res.status(200).json({ data: result, pagination: {} });
	} catch (error) {
		next(error);
	}
};

export const indexOneNewsType = async (
	req: Request,
	res: Response,
) => {
	try {
		const { result, status } = await getOneNewsType(req);
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

export const postNewsType = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const result = await createNewsType(req);
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
};

export const deleteNewsType = async (
	req: Request,
	res: Response,
) => {
	try {
		const result = await deleteOneNewsType(req);
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

export const putNewsType = async (
	req: Request,
	res: Response,
) => {
	try {
		const { message, status } = await updateOneNewsType(req);
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