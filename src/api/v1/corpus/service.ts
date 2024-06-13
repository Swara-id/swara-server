import { db } from "../../../database";
import { CorpusBody, CorpusGet } from "./types";
import path from "path";
import { deleteFile, uploadImage } from "../../../helper/helper";

export const getAllCorpus = async () => {
  console.log("masuk");
  const result = await db.selectFrom("corpus").selectAll().execute();
  return result;
};

export const getOneCorpus = async (id: number | string) => {
  const numericId = Number(id);

  if (isNaN(numericId)) {
    throw { message: "Invalid ID parameter", status: 400 };
  }

  const result = await db
    .selectFrom("corpusImage")
    .innerJoin("corpus", "corpusImage.corpusId", "corpus.id")
    .select([
      "corpus.id",
      "corpus.value",
      "corpus.type",
      "corpus.createdAt as corpusCreatedAt",
      "corpus.updatedAt as corpusUpdatedAt",
      "corpusImage.imageUrl",
      "corpusImage.createdAt as imageCreatedAt"
    ])
    .where("corpus.id", "=", numericId)
    .execute();

  if (result.length === 0) {
    throw { message: `No corpus found with ID ${numericId}`, status: 404 };
  }

  const formattedResult = result.reduce<CorpusGet>((acc, curr, index) => {
    if (index === 0) {
      acc = {
        id: curr.id,
        value: curr.value,
        type: curr.type,
        images: [],
        createdAt: curr.corpusCreatedAt,
        updatedAt: curr.corpusUpdatedAt
      };
    }
    acc.images.push({
      imageUrl: curr.imageUrl,
      corpusId: curr.id,
      createdAt: curr.imageCreatedAt
    });
    return acc;
  }, {} as CorpusGet);

  return { result: formattedResult, status: 200 };
};

export const createCorpus = async (
  body: CorpusBody,
  files: Express.Multer.File[]
) => {
  if (!files || files.length === 0) {
    throw { message: "No file uploaded", status: 400 };
  }

  const transaction = await db.transaction().execute(async (trx) => {
    const corpusResult = await trx
      .insertInto("corpus")
      .values({
        type: body.type,
        value: body.value
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    const imageUploadPromises = files.map(async (element, index) => {
      const fileExtension = path.extname(element.originalname);
      const fileName = `image-${index.toString()}${fileExtension}`;
      const imageUrl = await uploadImage(
        element,
        fileName,
        `corpus/${corpusResult.id}`
      );

      const imageResult = await trx
        .insertInto("corpusImage")
        .values({
          corpusId: corpusResult.id,
          imageUrl: imageUrl
        })
        .returningAll()
        .executeTakeFirstOrThrow();

      return imageResult;
    });

    const corpusImages = await Promise.all(imageUploadPromises);

    return {
      ...corpusResult,
      corpusImages
    };
  });

  return transaction;
};

export const deleteOneCorpus = async (id: number | string) => {
  const numericId = Number(id);
  if (isNaN(numericId)) {
    throw { message: "Invalid ID parameter", status: 400 };
  }

  const images = await db
    .selectFrom("corpusImage")
    .select("imageUrl")
    .where("corpusId", "=", numericId)
    .execute();

  if (!images || images.length === 0) {
    throw {
      message: `No images found for corpus with ID ${numericId}`,
      status: 404
    };
  }

  const deletePromises = images.map((map) => {
    return deleteFile(map.imageUrl).catch((error) => {
      console.log(error);
    });
  });

  const corpusData = await db.transaction().execute(async (trx) => {
    await trx
      .deleteFrom("corpus")
      .where("id", "=", numericId)
      .returningAll()
      .execute();
  });

  await Promise.all(deletePromises);

  return {
    message: `Corpus with ID ${numericId} and associated files deleted successfully`,
    data: corpusData,
    status: 200 // Change status to 200 OK
  };
};
