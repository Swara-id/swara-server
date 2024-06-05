import { Request } from "express";
import { db } from "../../../database";
import path from "path";
import { deleteFile, uploadImage } from "../../../helper/helper";
import { v4 as uuid } from "uuid";
import { NewSuggestion, SuggestionUpdate } from "../../../models/Suggestion";
import { TRequest } from "../../../types";

export const getAllSuggestion = async (req: Request) => {
	const result = await db.selectFrom("suggestion").selectAll().execute();
	return result;
};

export const getOneSuggestion = async (req: Request) => {
	const { id } = req.params;
	const numericId = Number(id);
	if (isNaN(numericId)) {
		throw { message: "Invalid ID parameter", status: 400 };
	}

	const result = await db
		.selectFrom("suggestion")
		.selectAll()
		.where("id", "=", numericId)
		.executeTakeFirst();
	if (!result) {
		throw { message: `No suggestion found with ID ${numericId}`, status: 404 };
	}
	return { result, status: 200 };
};

//Report
export const createSuggestion = async (
	req: TRequest<NewSuggestion>
) => {
	try {
		const { body } = req;
		const myFile = req.file;

		const randomUUID = uuid();

		console.log(myFile);

		if (!myFile) {
			throw { message: "No file uploaded", status: 400 };
		}

		const fileExtension = path.extname(myFile.originalname);
		console.log("File extension:", fileExtension); // Debugging log

		const fileName = `${randomUUID}${fileExtension}`;

		const imageUrl = await uploadImage(myFile, fileName, "suggestion");

		const result = await db
			.insertInto("suggestion")
			.values({
				uid: randomUUID,
				attachmentUrl: imageUrl,
				type: body.type,
				value: body.value,
				verificationStatus: "waiting",
				userId:body.userId,
				userLocation:body.userLocation,
				challengeId:body.challengeId,

				createdAt: new Date(),
				updatedAt: new Date(),
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

export const deleteOneSuggestion = async (req: Request) => {
	const { id } = req.params;
	const numericId = Number(id);
	if (isNaN(numericId)) {
		throw { message: "Invalid ID parameter", status: 400 };
	}

	const itemFile = await db
		.selectFrom("suggestion")
		.select(["attachmentUrl"])
		.where("id", "=", numericId)
		.executeTakeFirst();

	if (!itemFile) {
		throw { message: `No suggestion found with ID ${numericId}`, status: 404 };
	}

	const result = await db
		.deleteFrom("suggestion")
		.where("id", "=", numericId)
		.returningAll()
		.executeTakeFirst();

	if (!result) {
		throw { message: `No suggestion found with ID ${numericId}`, status: 404 };
	}

	if (itemFile.attachmentUrl) {
		try {
			const fileName = path.basename(itemFile.attachmentUrl);
			if (fileName) {
				const filePath = `suggestion/${fileName}`;
				console.log(filePath);
				await deleteFile(filePath);
			} else {
				console.error("Failed:", itemFile.attachmentUrl);
			}
		} catch (error) {
			console.error(`Failed to delete image from storage: ${error}`);
		}
	}

	return {
		message: `Successfully deleted suggestion with ID ${numericId}`,
		status: 200,
	};
};

export const updateOneSuggestion = async (
	req: Request<any, any, SuggestionUpdate>
) => {
	const { id } = req.params;
	const numericId = Number(id);
	if (isNaN(numericId)) {
		throw { message: "Invalid ID parameter", status: 400 };
	}
	const { body } = req;
	const result = await db
		.updateTable("suggestion")
		.set({
			attachmentUrl: body.attachmentUrl,
			type: body.type,
			value: body.value,
			verificationStatus: "waiting",
			challengeId: body.challengeId,

			updatedAt: new Date(),
		})
		.where("id", "=", numericId)
		.returningAll()
		.executeTakeFirst();
	if (!result) {
		throw { message: `No suggestion found with ID ${numericId}`, status: 404 };
	}
	return {
		message: `Successfully updated suggestion with ID ${numericId}`,
		status: 200,
	};
};
