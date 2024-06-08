import { db } from "@/database";
import { News, NewNews } from "@models/News";
import { deleteFile, uploadImage } from "@/helper/helper";
import path from "path";
import { v4 as uuid } from "uuid";

export const getAllNews = async () => {
  const result = await db.selectFrom("news").selectAll().execute();
  return result;
};

export const getOneNews = async (id: number | string) => {
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
    throw { message: `No news found with ID ${numericId}`, status: 404 };
  }
  return result;
};

export const createNews = async (body: NewNews, file?: Express.Multer.File) => {
  if (!file) {
    throw { message: "No file uploaded", status: 400 };
  }

  const randomUUID = uuid();
  const fileExtension = path.extname(file.originalname);
  const fileName = `${randomUUID}${fileExtension}`;
  const imageUrl = await uploadImage(file, fileName, "news");

  const result = await db
    .insertInto("news")
    .values({
      uid: randomUUID,
      title: body.title,
      description: body.description,
      userUid: body.userUid,
      newsTypeId: body.newsTypeId,
      dateOfEvent: new Date(),
      thumbnailUrl: imageUrl
    })
    .returningAll()
    .executeTakeFirst();

  return result;
};

export const deleteOneNews = async (id: number | string) => {
  const numericId = Number(id);
  if (isNaN(numericId)) {
    throw { message: "Invalid ID parameter", status: 400 };
  }

  const result = await db
    .deleteFrom("news")
    .where("id", "=", numericId)
    .returningAll()
    .executeTakeFirst();

  if (!result) {
    throw { message: `No news found with ID ${numericId}`, status: 404 };
  }

  if (result.thumbnailUrl) {
    try {
      const fileName = path.basename(result.thumbnailUrl);
      const filePath = `news/${fileName}`;
      await deleteFile(filePath);
    } catch (error) {
      console.error(`Failed to delete image from storage: ${error}`);
    }
  }

  return result;
};

export const updateOneNews = async (
  id: number | string,
  body: Partial<News>
) => {
  const numericId = Number(id);
  if (isNaN(numericId)) {
    throw { message: "Invalid ID parameter", status: 400 };
  }

  const result = await db
    .updateTable("news")
    .set({
      description: body.description,
      userUid: body.userUid,
      newsTypeId: body.newsTypeId,
      dateOfEvent: body.dateOfEvent
    })
    .where("id", "=", numericId)
    .returningAll()
    .executeTakeFirst();

  if (!result) {
    throw { message: `No news found with ID ${numericId}`, status: 404 };
  }

  return result;
};
