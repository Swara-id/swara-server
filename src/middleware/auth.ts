import { NextFunction, Request, Response } from "express";
import admin from "../config/firebase-config";

export const decodeToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.headers.authorization) {
		const token = req.headers.authorization.split(" ")[1];
		try {
			const decodeValue = await admin.auth().verifyIdToken(token);
			if (decodeValue) {
				console.log(decodeValue);
				return next();
			}
			return res.json({ message: "Unauthorized" });
		} catch (e) {
			return res.json({ message: "Internal Error" });
		}
	}
};
