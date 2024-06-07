import { CorpusBody, CorpusGet, CorpusResult } from './types';
import { Request } from "express";
import { db } from "../../../database";
import path from "path";
import { CorpusTable, NewCorpus } from "../../../models/corpus";
import { deleteFile, uploadImage } from "../../../helper/helper";
import { v4 as uuid } from "uuid";
import { TRequest } from '../../../types';

export const getAllCorpus = async (req: Request) => {
	const result = await db.selectFrom("corpus").selectAll().execute();
	return result;
};


export const getOneCorpus = async (req: Request) => {
  const { id } = req.params;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    throw { message: "Invalid ID parameter", status: 400 };
  }

  try {
    const result = await db
      .selectFrom("corpusImage")
      .innerJoin("corpus", "corpusImage.corpusId", "corpus.id")
      .select([
        "corpus.id",
        "corpus.value",
        "corpus.type",
        "corpus.createdAt as corpusCreatedAt",
        "corpus.updatedAt as corpusUpdatedAt",
        "corpusImage.imageUrl",
        "corpusImage.createdAt as imageCreatedAt"
      ])
      .where("corpus.id", "=", numericId)
      .execute();

    if (result.length === 0) {
      throw { message: `No corpus found with ID ${numericId}`, status: 404 };
    }

    const formattedResult = result.reduce<CorpusGet>((acc, curr, index) => {
      if (index === 0) {
        acc.corpusResult = {
          id: curr.id,
          value: curr.value,
          type: curr.type,
          createdAt: curr.corpusCreatedAt,
          updatedAt: curr.corpusUpdatedAt,
        };
      }
      acc.images.push({
        imageUrl: curr.imageUrl,
        corpusId: curr.id,
        createdAt: curr.imageCreatedAt,
      });
      return acc;
    }, { corpusResult: null as unknown as CorpusResult, images: [] });

    return { result: formattedResult, status: 200 };
  } catch (error) {
    console.error(error);
    throw { message: "An error occurred while fetching the corpus", status: 500 };
  }
};

export const createCorpus = async (req: TRequest<CorpusBody>) => {
	try {
		const { body } = req;
		console.log(body);
		const myFile = req.files as Express.Multer.File[];

		console.log(myFile);

		if (!myFile || myFile.length === 0) {
			throw { message: "No file uploaded", status: 400 };
		}

		const transaction = await db.transaction().execute(async (trx) => {
			const corpusResult = await trx
				.insertInto("corpus")
				.values({
					type: body.type,
					value: body.value,
					createdAt: new Date(),
					updatedAt: new Date(),
				})
				.returningAll()
				.executeTakeFirstOrThrow();

			const imageUploadPromises = myFile.map(async (element, index) => {
				const fileExtension = path.extname(element.originalname);
				console.log("File extension:", fileExtension);

				const fileName = `image-${index.toString()}${fileExtension}`;
				console.log(fileName);

				const imageUrl = await uploadImage(
					element,
					fileName,
					`corpus/${corpusResult.id}`
				);

				const imageResult = await trx
					.insertInto("corpusImage")
					.values({
						corpusId: corpusResult.id,
						imageUrl: imageUrl,
						createdAt: new Date(),
					})
					.returningAll()
					.executeTakeFirstOrThrow();

				return imageResult;
			});

			const corpusImages = await Promise.all(imageUploadPromises);

			return {
				corpusResult,
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


export const deleteOneCorpus = async (req: Request) => {
	const { id } = req.params;
	const numericId = Number(id);
	if (isNaN(numericId)) {
		throw { message: "Invalid ID parameter", status: 400 };
	}

	const images = await db
		.selectFrom("corpusImage")
		.select("imageUrl")
		.where("corpusId", "=", numericId)
		.execute();

	if (!images || images.length === 0) {
		throw {
			message: `No images found for corpus with ID ${numericId}`,
			status: 404,
		};
	}

	const transaction = await db.transaction().execute(async (trx) => {
		await trx.deleteFrom("corpus").where("id", "=", numericId).execute();

		return images;
	});

	const deletePromises = transaction.map((image) => deleteFile(image.imageUrl));

	try {
		await Promise.all(deletePromises);
		return {
			message: `Corpus with ID ${numericId} and associated files deleted successfully`,
			status: 200,
		};
	} catch (err) {
		console.error(err);
		throw { message: `Failed to delete some files: ${err}`, status: 500 };
	}
};

// export const updateOneCorpus = async (req: Request) => {
// 	const { id } = req.params;
// 	const numericId = Number(id);
// 	if (isNaN(numericId)) {
// 		throw { message: "Invalid ID parameter", status: 400 };
// 	}
// 	const { body } = req;
// 	const result = await db
// 		.updateTable("corpus")
// 		.set({
// 			type: body.type,
// 			value: body.value,
// 			updatedAt: new Date(),
// 		})
// 		.where("id", "=", numericId)
// 		.returningAll()
// 		.executeTakeFirst();
// 	if (!result) {
// 		throw { message: `No corpus found with ID ${numericId}`, status: 404 };
// 	}
// 	return {
// 		message: `Successfully updated corpus with ID ${numericId}`,
// 		status: 200,
// 	};
// };
