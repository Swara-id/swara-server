import { Request } from "express";
import { db } from "../../../database";

export const getAllUser = async (req: Request) => {
	const result = await db.selectFrom("users").selectAll().execute();
	return result;
};

export const getOneUser = async (req: Request) => {
	const { id } = req.params;
	const numericId = Number(id);
	if (isNaN(numericId)) {
		throw { message: "Invalid ID parameter", status: 400 };
	}

	const result = await db
		.selectFrom("users")
		.selectAll()
		.where("id", "=", numericId)
		.executeTakeFirst();
	if (!result) {
		throw { message: `No corpus found with ID ${numericId}`, status: 404 };
	}
	return { result, status: 200 };
};

export const createUser = async (req: Request) => {
	const { body } = req;
	const result = await db
		.insertInto("users")
		.values({
			uid: body.uid,
			fullName: body.fullName,
			userName: body.userName,
			gender: body.gender,
			about: body.about,
			profilePicURL: body.profilePicURL,

			createdAt: new Date(),
			updatedAt: new Date(),
		})
		.returningAll()
		.executeTakeFirst();

	return result;
};

export const deleteOneUser = async (req: Request) => {
	const { id } = req.params;
	const numericId = Number(id);
	if (isNaN(numericId)) {
		throw { message: "Invalid ID parameter", status: 400 };
	}
	const result = await db
		.deleteFrom("users")
		.where("id", "=", numericId)
		.returningAll()
		.executeTakeFirst();
	if (!result) {
		throw { message: `No user found with ID ${numericId}`, status: 404 };
	}
	return { result, status: 200 };
};

export const updateOneUser = async (req: Request) => {
	const { id } = req.params;
	const numericId = Number(id);
	if (isNaN(numericId)) {
		throw new Error("Invalid ID parameter");
	}
	const { body } = req;
	const result = await db
		.updateTable("users")
		.set({
			uid: body.uid,
			fullName: body.fullName,
			userName: body.userName,
			gender: body.gender,
			about: body.about,
			profilePicURL: body.profilePicURL,

			updatedAt: new Date(),
		})
		.where("id", "=", numericId)
		.returningAll()
		.executeTakeFirst();
	if (!result) {
		throw new Error(`No User found with ID ${numericId}`);
	}
	return result;
};
