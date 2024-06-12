import { BadRequestError } from "./../../../error/bad-request";
import { NotFoundError } from "./../../../error/not-found";
import { db } from "../../../database";
import { NewsTypeBody } from "./types";

export const getAllNewsTypes = async () => {
  const result = await db.selectFrom("newsType").selectAll().execute();

  return result;
};

export const getOneNewsType = async (id: number | string) => {
  const numericId = Number(id);
  if (isNaN(numericId)) {
    throw new BadRequestError("Invalid ID parameter");
  }

  const result = await db
    .selectFrom("newsType")
    .selectAll()
    .where("id", "=", numericId)
    .executeTakeFirst();

  if (!result) {
    throw new NotFoundError(`No news type found with ID ${numericId}`);
  }

  return result;
};

export const createNewsType = async (body: NewsTypeBody) => {
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
    throw new BadRequestError("Invalid ID parameter");
  }

  const result = await db
    .deleteFrom("newsType")
    .where("id", "=", numericId)
    .returningAll()
    .executeTakeFirst();

  if (!result) {
    throw new NotFoundError(`No news type found with ID ${numericId}`);
  }

  return result;
};

export const updateOneNewsType = async (
  id: number | string,
  body: Partial<NewsTypeBody>
) => {
  const numericId = Number(id);
  if (isNaN(numericId)) {
    throw new BadRequestError("Invalid ID parameter");
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
    throw new NotFoundError(`No news type found with ID ${numericId}`);
  }

  return result;
};
