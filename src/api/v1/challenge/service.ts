import { db } from "../../../database";
import { ChallengePatchBody, ChallengePostBody } from "./types";

export const getAllChallenge = async () => {
  const result = await db.selectFrom("challenge").selectAll().execute();
  return result;
};

export const getOneChallenge = async (id: number | string) => {
  const numericId = Number(id);
  if (isNaN(numericId)) {
    throw { message: "Invalid ID parameter", status: 400 };
  }

  const result = await db
    .selectFrom("challenge")
    .selectAll()
    .where("id", "=", numericId)
    .executeTakeFirst();

  return result;
};

export const createChallenge = async (body: ChallengePostBody) => {
  const result = await db
    .insertInto("challenge")
    .values({
      uid: "string",
      type: body.type,
      value: body.value,
      status: "ongoing",
      point: body.point
    })
    .returningAll()
    .executeTakeFirst();

  return result;
};

export const deleteOneChallenge = async (id: number | string) => {
  const numericId = Number(id);
  if (isNaN(numericId)) {
    throw { message: "Invalid ID parameter", status: 400 };
  }
  const result = await db
    .deleteFrom("challenge")
    .where("id", "=", numericId)
    .returningAll()
    .executeTakeFirst();
  if (!result) {
    throw { message: `No Challenge found with ID ${numericId}`, status: 404 };
  }
  return result;
};

export const updateOneChallenge = async (
  id: number | string,
  body: ChallengePatchBody
) => {
  const numericId = Number(id);
  if (isNaN(numericId)) {
    throw { message: "Invalid ID parameter", status: 400 };
  }
  const result = await db
    .updateTable("challenge")
    .set({
      type: body.type,
      value: body.value,
      status: body.status,
      point: body.point
    })
    .where("id", "=", numericId)
    .returningAll()
    .executeTakeFirst();
  if (!result) {
    throw { message: `No Challenge found with ID ${numericId}`, status: 404 };
  }
  return result;
};
