import { Request } from "express";
import { db } from "../../../database";
import { NewChallenge } from "../../../models/Challenge";

export const getAllChallenge = async (_req: Request) => {
	const result = await db.selectFrom("challenge").selectAll().execute();
	return result;
};

export const getOneChallenge = async (req: Request) => {
	const { id } = req.params;
	const numericId = Number(id);
	if (isNaN(numericId)) {
		throw { message: "Invalid ID parameter", status: 400 };
	}

	const result = await db
		.selectFrom("challenge")
		.selectAll()
		.where("id", "=", numericId)
		.executeTakeFirst();
	if (!result) {
		throw { message: `No Challenge found with ID ${numericId}`, status: 404 };
	}
	return { result, status: 200 };
};

export const createChallenge = async (req: Request<any, any, NewChallenge>) => {
	try {
		const { body } = req;

		const result = await db
			.insertInto("challenge")
			.values({
				uid: "string",
				type: body.type,
				value: body.value,
				status: "ongoing",
				point: body.point,

				updatedAt: new Date(),
				createdAt: new Date(),
			})
			.returningAll()
			.executeTakeFirst();

		return result;
	} catch (error) {
		console.error(error);

		if (error instanceof Error) {
			throw { message: error.message, status: 500 };
		} else if (
			typeof error === "object" &&
			error !== null &&
			"message" in error
		) {
			throw error;
		} else {
			throw { message: "Internal server error", status: 500 };
		}
	}
};

export const deleteOneChallenge = async (req: Request) => {
	const { id } = req.params;
	const numericId = Number(id);
	if (isNaN(numericId)) {
		throw { message: "Invalid ID parameter", status: 400 };
	}
	const result = await db
		.deleteFrom("challenge")
		.where("id", "=", numericId)
		.returningAll()
		.executeTakeFirst();
	if (!result) {
		throw { message: `No Challenge found with ID ${numericId}`, status: 404 };
	}
	return {
		message: `Success delete Challenge with ID ${numericId}`,
		status: 200,
	};
};

export const updateOneChallenge = async (req: Request) => {
	const { id } = req.params;
	const numericId = Number(id);
	if (isNaN(numericId)) {
		throw { message: "Invalid ID parameter", status: 400 };
	}
	const { body } = req;
	const result = await db
		.updateTable("challenge")
		.set({
			uid: "string",
			type: body.type,
			value: body.value,
			status: body.status,
			point: body.point,

			updatedAt: new Date(),
		})
		.where("id", "=", numericId)
		.returningAll()
		.executeTakeFirst();
	if (!result) {
		throw { message: `No Challenge found with ID ${numericId}`, status: 404 };
	}
	return {
		message: `Successfully updated Challenge with ID ${numericId}`,
		status: 200,
	};
};
