import {
	createUser,
	deleteOneUser,
	getAllUser,
	getOneUser,
	updateOneUser,
} from "./service";
import { NextFunction, Request, Response } from "express";

export const indexAllUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const result = await getAllUser(req);

		res.status(200).json({ data: result, pagination: {} });
	} catch (error) {
		next(error);
	}
};

export const indexOneUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { result, status } = await getOneUser(req);
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

export const postUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const result = await createUser(req);
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
};

export const deleteUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { result, status } = await getOneUser(req);
		res.status(status).json({ status: result });
	} catch (error: any) {
		if (error && typeof error === "object" && "status" in error) {
			const { message, status } = error;
			res.status(status).json({ status, error: message });
		} else {
			res.status(500).json({ status: 500, error: "Unknown error occurred" });
		}
	}
};

export const putUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const result = await updateOneUser(req);
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};
