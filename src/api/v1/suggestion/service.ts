import path from "path";
import { v4 as uuid } from "uuid";
import { db } from "../../../database";
import { uploadImage, deleteFile } from "../../../helper/helper";
import { NewSuggestion, SuggestionUpdate } from "../../../models/Suggestion";

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
  body: NewSuggestion,
  file?: Express.Multer.File
) => {
  if (!file) {
    throw { message: "No file uploaded", status: 400 };
  }

  const randomUUID = uuid();
  const fileExtension = path.extname(file.originalname);
  const fileName = `${randomUUID}${fileExtension}`;
  const imageUrl = await uploadImage(file, fileName, "suggestion");

  const result = await db
    .insertInto("suggestion")
    .values({
      uid: randomUUID,
      attachmentUrl: imageUrl,
      type: body.type,
      value: body.value,
      verificationStatus: "waiting",
      userId: body.userId,
      userLocation: body.userLocation,
      challengeId: body.challengeId
    })
    .returningAll()
    .executeTakeFirst();

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
  body: SuggestionUpdate
) => {
  const numericId = Number(id);
  if (isNaN(numericId)) {
    throw { message: "Invalid ID parameter", status: 400 };
  }

  const result = await db
    .updateTable("suggestion")
    .set({
      attachmentUrl: body.attachmentUrl,
      type: body.type,
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

export const verificateOneSuggestion = async (
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
        userId: suggestionResult.userId,
        source: "suggestion",
        suggestionId: suggestionResult.id,
        points: point
      })
      .returningAll()
      .executeTakeFirst();
  });

  return {
    message: `Successfully verified suggestion with ID ${numericId}`
  };
};
