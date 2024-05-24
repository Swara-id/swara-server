import { Request } from "express";
import { db } from "../../../database";

export const getAllUser = async (req:Request) => {
	const result = await db.selectFrom("users").selectAll().execute();
	return result;
};
