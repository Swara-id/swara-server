import { SuggestionBody } from "./types";
import path from "path";
import { v4 as uuid } from "uuid";
import { db } from "../../../database";
import { uploadImage, deleteFile } from "../../../helper/helper";
import { BadRequestError } from "../../../error/bad-request";

export const getAllSuggestion = async () => {
  const result = await db.selectFrom("suggestion").selectAll().execute();
  return result;
};

export const getOneSuggestion = async (id: number | string) => {
  const numericId = Number(id);
  if (isNaN(numericId)) {
    throw { message: "Invalid ID parameter", status: 400 };
  }

  const result = await db
    .selectFrom("suggestion")
    .selectAll()
    .where("id", "=", numericId)
    .executeTakeFirst();

  if (!result) {
    throw {
      message: `No suggestion found with ID ${numericId}`,
      status: 404
    };
  }

  return result;
};

export const createSuggestion = async (
  body: SuggestionBody,
  file?: Express.Multer.File
) => {
  if (!file) {
    throw new BadRequestError("No file found");
  }

  const bucketName = process.env.BUCKET_NAME;
  const randomUUID = uuid();
  const fileExtension = path.extname(file.originalname);
  const fileName = `${randomUUID}${fileExtension}`;
  const predictedUrl = `https://storage.googleapis.com/${bucketName}/suggestion/${fileName}`;

  const result = await db
    .insertInto("suggestion")
    .values({
      uid: randomUUID,
      attachmentUrl: predictedUrl,
      value: body.value,
      verificationStatus: "waiting",
      userUid: body.userUid,
      userLocation: body.userLocation,
      challengeId: body.challengeId || undefined
    })
    .returningAll()
    .executeTakeFirst();

  await uploadImage(file, fileName, "suggestion");

  return result;
};

export const deleteOneSuggestion = async (id: number | string) => {
  const numericId = Number(id);
  if (isNaN(numericId)) {
    throw { message: "Invalid ID parameter", status: 400 };
  }

  const itemFile = await db
    .selectFrom("suggestion")
    .select(["attachmentUrl"])
    .where("id", "=", numericId)
    .executeTakeFirst();

  if (!itemFile) {
    throw {
      message: `No suggestion found with ID ${numericId}`,
      status: 404
    };
  }

  const result = await db
    .deleteFrom("suggestion")
    .where("id", "=", numericId)
    .returningAll()
    .executeTakeFirst();

  if (!result) {
    throw {
      message: `No suggestion found with ID ${numericId}`,
      status: 404
    };
  }

  if (itemFile.attachmentUrl) {
    const fileName = path.basename(itemFile.attachmentUrl);
    const filePath = `suggestion/${fileName}`;
    await deleteFile(filePath);
  }

  return result;
};

export const updateOneSuggestion = async (
  id: number | string,
  body: Partial<SuggestionBody>
) => {
  const numericId = Number(id);
  if (isNaN(numericId)) {
    throw { message: "Invalid ID parameter", status: 400 };
  }

  const result = await db
    .updateTable("suggestion")
    .set({
      value: body.value,
      verificationStatus: "waiting",
      challengeId: body.challengeId
    })
    .where("id", "=", numericId)
    .returningAll()
    .executeTakeFirst();

  if (!result) {
    throw {
      message: `No suggestion found with ID ${numericId}`,
      status: 404
    };
  }

  return result;
};

export const verifyOneSuggestion = async (
  id: number | string,
  point: number
) => {
  const numericId = Number(id);
  if (isNaN(numericId)) {
    throw { message: "Invalid ID parameter", status: 400 };
  }

  await db.transaction().execute(async (trx) => {
    const suggestionResult = await trx
      .updateTable("suggestion")
      .set({
        verificationStatus: "approved"
      })
      .where("id", "=", numericId)
      .returningAll()
      .executeTakeFirstOrThrow();

    await trx
      .insertInto("points")
      .values({
        desc: "Suggestion approved",
        userUid: suggestionResult.userUid,
        source: suggestionResult.challengeId ? "challenge" : "suggestion",
        suggestionId: suggestionResult.id,
        points: point
      })
      .returningAll()
      .executeTakeFirst();

    await trx
      .updateTable("users")
      .set((eb) => ({
        points: eb("points", "+", point)
      }))
      .where("uid", "=", suggestionResult.userUid)
      .returningAll()
      .executeTakeFirst();
  });

  return {
    message: `Successfully verified suggestion with ID ${numericId}`
  };
};
