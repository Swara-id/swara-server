import { Request } from "express";
import { db } from "../../../database";

export const getAllNewsType = async (_req: Request) => {
	const result = await db.selectFrom("newsType").selectAll().execute();
	return result;
};

export const getOneNewsType = async (req: Request) => {
	const { id } = req.params;
	const numericId = Number(id);
	if (isNaN(numericId)) {
		throw { message: "Invalid ID parameter", status: 400 };
	}
	const result = await db
		.selectFrom("newsType")
		.selectAll()
		.where("id", "=", numericId)
		.executeTakeFirst();
	if (!result) {
		throw { message: `No event found with ID ${numericId}`, status: 404 };
	}
	return { result, status: 200 };
};

export const createNewsType = async (req: Request) => {
	const { body } = req;
	const result = await db
		.insertInto("newsType")
		.values({
			name: body.name,

			createdAt: new Date(),
			updatedAt: new Date(),
		})
		.returningAll()
		.executeTakeFirst();

	return result;
};

export const deleteOneNewsType = async (req: Request) => {
	const { id } = req.params;
	const numericId = Number(id);

	if (isNaN(numericId)) {
		throw { message: "Invalid ID parameter", status: 400 };
	}

	const result = await db
		.deleteFrom("newsType")
		.where("id", "=", numericId)
		.returningAll()
		.executeTakeFirst();

	if (!result) {
		throw { message: `No events found with ID ${numericId}`, status: 404 };
	}

	return {
		message: `Successfully deleted event with ID ${numericId}`,
		status: 200,
	};
};
export const updateOneNewsType = async (req: Request) => {
	const { id } = req.params;
	const numericId = Number(id);
	if (isNaN(numericId)) {
		throw { message: "Invalid ID parameter", status: 400 };
	}
	const { body } = req;
	const result = await db
		.updateTable("newsType")
		.set({
			name: body.name,

			updatedAt: new Date(),
		})
		.where("id", "=", numericId)
		.returningAll()
		.executeTakeFirst();
	if (!result) {
		throw { message: `No events found with ID ${numericId}`, status: 404 };
	}
	return {
		message: `Successfully updated events with ID ${numericId}`,
		status: 200,
	};
};
