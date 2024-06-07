import { Request } from "express";
import { db } from "../../../database";
import path from "path";
import { uploadImage } from "../../../helper/helper";
import { TRequest } from "../../../types";
import { QuizBody } from "./types";

export const getAllQuiz = async (_req: Request) => {
	const result = await db.selectFrom("quiz").selectAll().execute();
	return result;
};

// Function to get one quiz by ID with its choices
export const getOneQuiz = async (req: Request) => {
	const { id } = req.params;
	const numericId = Number(id);
	if (isNaN(numericId)) {
		throw { message: "Invalid ID parameter", status: 400 };
	}

	const quizResult = await db
		.selectFrom("quiz")
		.selectAll()
		.where("id", "=", numericId)
		.executeTakeFirst();
	if (!quizResult) {
		throw { message: `No quiz found with ID ${numericId}`, status: 404 };
	}

	const choices = await db
		.selectFrom("choice")
		.selectAll()
		.where("quizId", "=", numericId)
		.executeTakeFirst();

	const result = {
		quizResult,
		choices,
	};

	return { result, status: 200 };
};

export const createQuiz = async (req: TRequest<QuizBody>) => {
	try {
		const { body } = req;
		console.log(body);
		const myFiles = req.files as Express.Multer.File[];

		if (!myFiles || myFiles.length === 0) {
				throw { message: "No file uploaded", status: 400 };
		} else if (myFiles.length !== body.choices.length) {
				throw { message: "Invalid File Amount", status: 400 };
		}

		const transaction = await db.transaction().execute(async (trx) => {
			const quizResult = await trx
				.insertInto("quiz")
				.values({
					question: body.question,
					createdAt: new Date(),
					updatedAt: new Date(),
				})
				.returningAll()
				.executeTakeFirstOrThrow();


			const imageUploadPromises = myFiles.map(async (file, index) => {
				const fileExtension = path.extname(file.originalname);
				console.log("File extension:", fileExtension);

				const fileName = `choice-${index.toString()}${fileExtension}`;
				console.log(fileName);

				const imageUrl = await uploadImage(
					file,
					fileName,
					`quiz/${quizResult.id}`
				);

				const imageResult = await trx
					.insertInto("choice")
					.values({
						value: body.choices[index].value,
						quizId: quizResult.id,
						isCorrect: JSON.parse(body.choices[index].isCorrect),
						imageUrl: imageUrl,
						updatedAt: new Date(),
						createdAt: new Date(),
					})
					.returningAll()
					.execute();


				return imageResult;
			});

			const corpusImages = await Promise.all(imageUploadPromises);

			return {
				quizResult,
				corpusImages,
			};
		});

		return transaction;
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

// export const deleteOneQuiz = async (req: Request) => {
// 	const { id } = req.params;
// 	const numericId = Number(id);
// 	if (isNaN(numericId)) {
// 		throw { message: "Invalid ID parameter", status: 400 };
// 	}

// 	const images = await db
// 		.selectFrom("choice")
// 		.select("imageUrl")
// 		.where("quizId", "=", numericId)
// 		.execute();

// 	if (!images || images.length === 0) {
// 		throw {
// 			message: `No images found for quiz with ID ${numericId}`,
// 			status: 404,
// 		};
// 	}

// 	const transaction = await db.transaction().execute(async (trx) => {
// 		await trx.deleteFrom("quiz").where("id", "=", numericId).execute();

// 		return images;
// 	});

// 	const deletePromises = transaction.map((image) => deleteFile(image.imageUrl));

// 	try {
// 		await Promise.all(deletePromises);
// 		return {
// 			message: `Quiz with ID ${numericId} and associated files deleted successfully`,
// 			status: 200,
// 		};
// 	} catch (err) {
// 		console.error(err);
// 		throw { message: `Failed to delete some files: ${err}`, status: 500 };
// 	}
// };

// export const updateOneQuiz = async (req: Request) => {
// 	const { id } = req.params;
// 	const numericId = Number(id);
// 	if (isNaN(numericId)) {
// 		throw { message: "Invalid ID parameter", status: 400 };
// 	}
// 	const { body } = req;
// 	const result = await db
// 		.updateTable("quiz")
// 		.set({
// 			type: body.type,
// 			value: body.value,
// 			updatedAt: new Date(),
// 		})
// 		.where("id", "=", numericId)
// 		.returningAll()
// 		.executeTakeFirst();
// 	if (!result) {
// 		throw { message: `No quiz found with ID ${numericId}`, status: 404 };
// 	}
// 	return {
// 		message: `Successfully updated quiz with ID ${numericId}`,
// 		status: 200,
// 	};
// };
