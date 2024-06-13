import { NewsBody, NewsQuery } from "./types";
import path from "path";
import { v4 as uuid } from "uuid";
import { db } from "../../../database";
import { uploadImage, deleteFile } from "../../../helper/helper";
import { NotFoundError } from "../../../error/not-found";
import { BadRequestError } from "../../../error/bad-request";

export const getAllNews = async (query: NewsQuery) => {
  const countQueryBuilder = db
    .selectFrom("news")
    .select(db.fn.count("id").as("count"));

  if (query.search) {
    countQueryBuilder.where("title", "like", `%${query.search}%`);
  }
  if (query.newsTypeId) {
    countQueryBuilder.where("newsTypeId", "=", query.newsTypeId);
  }
  if (query.dateOfEvent) {
    countQueryBuilder.where("dateOfEvent", "=", query.dateOfEvent);
  }

  const total = await countQueryBuilder.execute();
  const totalData = total[0]?.count;

  if (!totalData) {
    return {
      data: [],
      pagination: {
        page: Number(query.page),
        pageSize: Number(query.pageSize),
        totalData,
        totalPage: 0
      }
    };
  }

  const queryBuilder = db.selectFrom("news").selectAll();
  if (query.search) {
    queryBuilder.where("title", "like", `%${query.search}%`);
  }
  if (query.newsTypeId) {
    queryBuilder.where("newsTypeId", "=", query.newsTypeId);
  }
  if (query.dateOfEvent) {
    queryBuilder.where("dateOfEvent", "=", query.dateOfEvent);
  }

  const result = await queryBuilder
    .orderBy("dateOfEvent", query.order)
    .limit(query.pageSize)
    .offset((query.page - 1) * query.pageSize)
    .execute();

  return {
    data: result,
    pagination: {
      page: Number(query.page),
      pageSize: Number(query.pageSize),
      totalData: total.length,
      totalPage: Math.ceil(total.length / query.pageSize)
    }
  };
};

export const getOneNews = async (id: number | string) => {
  const numericId = Number(id);
  if (isNaN(numericId)) {
    throw new BadRequestError("Invalid ID parameter");
  }

  const result = await db
    .selectFrom("news")
    .selectAll()
    .where("id", "=", numericId)
    .executeTakeFirst();

  if (!result) {
    throw new NotFoundError(`No news found with ID ${numericId}`);
  }

  return result;
};

export const createNews = async (
  body: NewsBody,
  file?: Express.Multer.File
) => {
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
      newsTypeId: body.newsTypeId,
      dateOfEvent: body.dateOfEvent,
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
  body: Partial<NewsBody>
) => {
  const numericId = Number(id);
  if (isNaN(numericId)) {
    throw { message: "Invalid ID parameter", status: 400 };
  }

  const result = await db
    .updateTable("news")
    .set({
      description: body.description,
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
