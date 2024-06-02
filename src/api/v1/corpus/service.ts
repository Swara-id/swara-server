import { Request } from "express";
import { db } from "../../../database";
import path from "path";
import { CorpusTable, NewCorpus } from "../../../models/corpus";
import { uploadImage } from "../../../helper/helper";

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

	const result = await db
		.selectFrom("corpus")
		.selectAll()
		.where("id", "=", numericId)
		.executeTakeFirst();
	if (!result) {
		throw { message: `No corpus found with ID ${numericId}`, status: 404 };
	}
	return { result, status: 200 };
};

export const createCorpus = async (req: Request<any, any, NewCorpus>) => {
  try {
    const { body } = req;
    const myFile = req.file;
    
    console.log(myFile);

    if (!myFile) {
      throw { message: "No file uploaded", status: 400 };
    }

    const fileExtension = path.extname(myFile.originalname);
    console.log('File extension:', fileExtension); // Debugging log

    const fileName = `${body.value}${fileExtension}`;

    const imageUrl = await uploadImage(myFile, fileName, "corpus");

    const result = await db
      .insertInto("corpus")
      .values({
        uid: body.uid,
        imageURL: imageUrl,
        videoURL: body.videoURL,
        type: body.type,
        value: body.value,
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
    } else if (typeof error === 'object' && error !== null && 'message' in error) {
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
	const result = await db
		.deleteFrom("corpus")
		.where("id", "=", numericId)
		.returningAll()
		.executeTakeFirst();
	if (!result) {
		throw { message: `No corpus found with ID ${numericId}`, status: 404 };
	}
	return { message: `Success delete corpus with ID ${numericId}`, status: 200 };
};

export const updateOneCorpus = async (req: Request) => {
	const { id } = req.params;
	const numericId = Number(id);
	if (isNaN(numericId)) {
		throw { message: "Invalid ID parameter", status: 400 };
	}
	const { body } = req;
	const result = await db
		.updateTable("corpus")
		.set({
			uid: body.uid,
			imageURL: body.imageURL,
			videoURL: body.videoURL,
			type: body.type,
			value: body.value,
			updatedAt: new Date(),
		})
		.where("id", "=", numericId)
		.returningAll()
		.executeTakeFirst();
	if (!result) {
		throw { message: `No corpus found with ID ${numericId}`, status: 404 };
	}
	return {
		message: `Successfully updated corpus with ID ${numericId}`,
		status: 200,
	};
};
