import { Request } from "express";
import { TUser } from "./types";
import { db } from "./../../../database";
import { NotFoundError } from "../../../error/not-found";

export const getAllUser = async () => {
  const result = await db.selectFrom("users").selectAll().execute();
  return result;
};

export const getOneUser = async (uid: string) => {
  const result = await db
    .selectFrom("users")
    .selectAll()
    .where("uid", "=", uid)
    .executeTakeFirst();

  if (!result) {
    throw new NotFoundError(`No news type found with UID ${uid}`);
  }

  return result;
};

export const createUser = async (user: TUser) => {
  const result = await db
    .insertInto("users")
    .values({
      uid: user.uid,
      fullName: user.displayName || "",
      userName: user.displayName || "",
      about: "",
      email: user.email || "",
      profilePicURL: user.photoURL ? user.photoURL : "",
      gender: "not-set"
    })
    .returningAll()
    .executeTakeFirst();

  return result;
};
export const deleteOneUser = async (req: Request) => {
  const { id } = req.params;
  const numericId = Number(id);
  if (isNaN(numericId)) {
    throw { message: "Invalid ID parameter", status: 400 };
  }
  const result = await db
    .deleteFrom("users")
    .where("id", "=", numericId)
    .returningAll()
    .executeTakeFirst();
  if (!result) {
    throw { message: `No user found with ID ${numericId}`, status: 404 };
  }
  return { result, status: 200 };
};

export const updateOneUser = async (req: Request) => {
  const { id } = req.params;
  const numericId = Number(id);
  if (isNaN(numericId)) {
    throw new Error("Invalid ID parameter");
  }
  const { body } = req;
  const result = await db
    .updateTable("users")
    .set({
      uid: body.uid,
      fullName: body.fullName,
      userName: body.userName,
      gender: body.gender,
      about: body.about,
      profilePicURL: body.profilePicURL
    })
    .where("id", "=", numericId)
    .returningAll()
    .executeTakeFirst();
  if (!result) {
    throw new Error(`No User found with ID ${numericId}`);
  }
  return result;
};
