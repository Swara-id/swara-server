import { Request } from "express";
import { db } from "../../../database";
import path from "path";
import { NewNews } from "../../../models/News";
import { deleteFile, uploadImage } from "../../../helper/helper";
import { v4 as uuid } from "uuid";
import { TRequest } from "@/types";

export const getAllNews = async (req: Request) => {
  console.log(req);
  const result = await db.selectFrom("news").selectAll().execute();
  return result;
};

export const getOneNews = async (req: Request) => {
  const { id } = req.params;
  const numericId = Number(id);
  if (isNaN(numericId)) {
    throw { message: "Invalid ID parameter", status: 400 };
  }

  const result = await db
    .selectFrom("news")
    .selectAll()
    .where("id", "=", numericId)
    .executeTakeFirst();
  if (!result) {
    throw { message: `No event found with ID ${numericId}`, status: 404 };
  }
  return { result, status: 200 };
};

export const createNews = async (req: TRequest<NewNews>) => {
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

    const imageUrl = await uploadImage(myFile, fileName, "news");

    const result = await db
      .insertInto("news")
      .values({
        uid: randomUUID,
        description: body.description,
        userUid: body.userUid,
        newsTypeId: body.newsTypeId,
        dateOfEvent: new Date(),

        createdAt: new Date(),
        updatedAt: new Date(),
        thumbnailUrl: imageUrl,
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

export const deleteOneNews = async (req: Request) => {
  const { id } = req.params;
  const numericId = Number(id);
  if (isNaN(numericId)) {
    throw { message: "Invalid ID parameter", status: 400 };
  }

  const itemFile = await db
    .selectFrom("news")
    .select(["thumbnailUrl"])
    .where("id", "=", numericId)
    .executeTakeFirst();

  if (!itemFile) {
    throw { message: `No corpus found with ID ${numericId}`, status: 404 };
  }

  const result = await db
    .deleteFrom("news")
    .where("id", "=", numericId)
    .returningAll()
    .executeTakeFirst();

  if (!result) {
    throw { message: `No news found with ID ${numericId}`, status: 404 };
  }

  if (itemFile.thumbnailUrl) {
    try {
      const fileName = path.basename(itemFile.thumbnailUrl);
      if (fileName) {
        const filePath = `news/${fileName}`;
        console.log(filePath);
        await deleteFile(filePath);
      } else {
        console.error(
          "Failed to extract UID from thumbnail URL:",
          itemFile.thumbnailUrl,
        );
      }
    } catch (error) {
      console.error(`Failed to delete image from storage: ${error}`);
    }
  }

  return {
    message: `Successfully deleted news with ID ${numericId}`,
    status: 200,
  };
};

export const updateOneNews = async (req: Request) => {
  const { uid } = req.params;

  const { body } = req;
  const result = await db
    .updateTable("news")
    .set({
      description: body.description,
      userUid: body.userUid,
      newsTypeId: body.newsTypeId,
      dateOfEvent: new Date(),

      updatedAt: new Date(),
    })
    .where("uid", "==", uid)
    .returningAll()
    .executeTakeFirst();
  if (!result) {
    throw { message: `No events found with UID ${uid}`, status: 404 };
  }
  return {
    message: `Successfully updated events with UID ${uid}`,
    status: 200,
  };
};
