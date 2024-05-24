import { Request } from "express";
import { db } from "../../../database";

export const getAllCorpus = async (req:Request) => {
	const result = await db.selectFrom("corpus").selectAll().execute();
	return result;
};
