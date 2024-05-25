import { Request } from "express";
import { db } from "../../../database";
import { CorpusTable, NewCorpus } from "../../../models/corpus";

export const getAllCorpus = async (req: Request) => {
	const result = await db.selectFrom("corpus").selectAll().execute();
	
	return result;
};
export const getOneCorpus = async (req: Request) => {
	const { id } = req.params;
	const numericId = Number(id);
	if (isNaN(numericId)) {
		throw new Error('Invalid ID parameter');
	}
	const result = await db
		.selectFrom("corpus")
		.selectAll()
		.where("id", "=", numericId)
		.executeTakeFirst();
	return result;
};

export const createCorpus = async (req: Request<any, any, NewCorpus>) => {
  const { body } = req;
  const result = await db.insertInto('corpus').values({
    ...body,
  }).returningAll().executeTakeFirst();
  
  return result;
};

