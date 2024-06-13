import { QuizBody } from "./types";
import { db } from "../../../database";
import path from "path";
import { deleteFile, uploadImage } from "../../../helper/helper";

export const getAllQuiz = async () => {
  const result = await db.selectFrom("quiz").selectAll().execute();
  return result;
};

export const getOneQuiz = async (id: number | string) => {
  const numericId = Number(id);
  if (isNaN(numericId)) {
    throw { message: "Invalid ID parameter", status: 400 };
  }

  const quizResult = await db
    .selectFrom("quiz")
    .selectAll()
    .where("id", "=", numericId)
    .executeTakeFirst();

  if (!quizResult) {
    throw { message: `No quiz found with ID ${numericId}`, status: 404 };
  }

  const choices = await db
    .selectFrom("choice")
    .selectAll()
    .where("quizId", "=", numericId)
    .execute();

  return {
    ...quizResult,
    choices
  };
};

export const createQuiz = async (
  body: QuizBody,
  files: Express.Multer.File[]
) => {
  if (!files || files.length === 0) {
    throw { message: "No file uploaded", status: 400 };
  }

  const transaction = await db.transaction().execute(async (trx) => {
    const quizResult = await trx
      .insertInto("quiz")
      .values({
        question: body.question
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    const imageUploadPromises = files.map(async (file, index) => {
      const fileExtension = path.extname(file.originalname);
      const fileName = `choice-${index.toString()}${fileExtension}`;
      const imageUrl = await uploadImage(
        file,
        fileName,
        `quiz/${quizResult.id}`
      );

      const choiceResult = await trx
        .insertInto("choice")
        .values({
          value: body.choices[index].value,
          quizId: quizResult.id,
          isCorrect: body.choices[index].isCorrect,
          imageUrl: imageUrl
        })
        .returningAll()
        .executeTakeFirstOrThrow();

      return choiceResult;
    });

    const choicesResult = await Promise.all(imageUploadPromises);

    return {
      ...quizResult,
      choices: choicesResult
    };
  });

  return transaction;
};

export const deleteOneQuiz = async (id: number | string) => {
  const numericId = Number(id);
  if (isNaN(numericId)) {
    throw { message: "Invalid ID parameter", status: 400 };
  }

  const images = await db
    .selectFrom("choice")
    .select("imageUrl")
    .where("quizId", "=", numericId)
    .execute();

  if (!images || images.length === 0) {
    throw {
      message: `No images found for quiz with ID ${numericId}`,
      status: 404
    };
  }

  const deletePromises = images.map((map) => {
    return deleteFile(map.imageUrl).catch((error) => {
      console.log(error);
    });
  });

  const quizData = await db.transaction().execute(async (trx) => {
    await trx
      .deleteFrom("quiz")
      .where("id", "=", numericId)
      .returningAll()
      .execute();
  });

  await Promise.all(deletePromises);

  return {
    message: `Quiz with ID ${numericId} and associated files deleted successfully`,
    data: quizData,
    status: 200
  };
};
