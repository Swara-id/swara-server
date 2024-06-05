import {
	getAllChallenge,
	createChallenge,
	getOneChallenge,
	deleteOneChallenge,
	updateOneChallenge,
} from "./service";
import { NextFunction, Request, Response } from "express";

export const indexAllChallenge = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const result = await getAllChallenge(req);

		res.status(200).json({ data: result, pagination: {} });
	} catch (error) {
		next(error);
	}
};

export const indexOneChallenge = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { result, status } = await getOneChallenge(req);
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

export const postChallenge = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const result = await createChallenge(req);
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
};

export const deleteChallenge = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const result = await deleteOneChallenge(req);
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

export const putChallenge = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { message, status } = await updateOneChallenge(req);
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