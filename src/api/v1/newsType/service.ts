import { db } from "@/database";
import { NewNewsType, NewsTypeUpdate } from "@models/NewsType";

export const getAllNewsTypes = async () => {
  const result = await db.selectFrom("newsType").selectAll().execute();
  return result;
};

export const getOneNewsType = async (id: number | string) => {
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
    throw { message: `No news type found with ID ${numericId}`, status: 404 };
  }
  return result;
};

export const createNewsType = async (body: NewNewsType) => {
  const result = await db
    .insertInto("newsType")
    .values({
      name: body.name
    })
    .returningAll()
    .executeTakeFirst();

  return result;
};

export const deleteOneNewsType = async (id: number | string) => {
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
    throw { message: `No news type found with ID ${numericId}`, status: 404 };
  }

  return result;
};

export const updateOneNewsType = async (
  id: number | string,
  body: NewsTypeUpdate
) => {
  const numericId = Number(id);
  if (isNaN(numericId)) {
    throw { message: "Invalid ID parameter", status: 400 };
  }

  const result = await db
    .updateTable("newsType")
    .set({
      name: body.name
    })
    .where("id", "=", numericId)
    .returningAll()
    .executeTakeFirst();

  if (!result) {
    throw { message: `No news type found with ID ${numericId}`, status: 404 };
  }

  return result;
};
