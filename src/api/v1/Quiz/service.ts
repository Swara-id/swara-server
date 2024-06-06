import { Request } from "express";
import { db } from "../../../database";
import {  NewQuiz } from "../../../models/Quiz";
import { NewChoice } from "../../../models/Choice";
import path from "path";
import { v4 as uuid } from "uuid";
import { uploadImage } from "../../../helper/helper";
// Function to get all quizzes
export const getAllQuiz = async (req: Request) => {
        const result = await db.selectFrom("quiz").selectAll().execute();
        return { result};
};

// Function to get one quiz by ID with its choices
export const getOneQuiz = async (req: Request) => {
    const { id } = req.params;
    const numericId = Number(id);

    if (isNaN(numericId)) {
        throw { message: "Invalid ID parameter", status: 400 };
    }
        // Get the quiz
        const quizResult = await db
            .selectFrom("quiz")
            .selectAll()
            .where("id", "=", numericId)
            .executeTakeFirst();
        console.log('Quiz result:', quizResult); // Debugging line
        
        if (!quizResult) {
            throw { message: `No quiz found with ID ${numericId}`, status: 404 };
        }

        // Get the choices associated with the quiz
        const choicesResult = await db
            .selectFrom("choice")
            .selectAll()
            .where("quizId", "=", numericId)
            .execute();

        // Combine the quiz with its choices
        const result = {
            quizResult,
            choices: choicesResult
        };

        return { result, status: 200 };
};

// Function to create a new quiz with choices
export const createQuiz = async (req: Request<any, any, NewQuiz>) => {
    try {
        const { body } = req;
        const myfile = req.files as Express.Multer.File[];

        if (!myfile || myfile.length === 0) {
            throw { message: "No file uploaded", status: 400 };
        }

        const transaction = await db.transaction().execute(async (trx) => {
            const quizResult = await trx
                .insertInto("quiz")
                .values({
                    uid: body.uid,
                    question: body.question,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })
                .returningAll()
                .executeTakeFirstOrThrow();

            const imageUploadPromises = myfile.map(async (element, index) => {
                const fileExtension = path.extname(element.originalname);
                const fileName = `image-${index.toString()}${fileExtension}`;

                const imageUrl = await uploadImage(
                    element,
                    fileName,
                    `choice/${quizResult.id}`
                );

                // Insert the choice along with the image URL
                const choiceResult = await trx
                .insertInto("choice")
                .values({
                    quizId: quizResult.id!,
                    value: "Example Value", // Provide a value for the "value" property
                    picture: imageUrl,
                    isCorrect: true // Provide a value for the "isCorrect" property
                })
                .returningAll()
                .executeTakeFirstOrThrow();
            });

            // Wait for all choice inserts to complete
            const choices = await Promise.all(imageUploadPromises);

            return {
                quizResult,
                choices,
            };
        });

        return { result: transaction, status: 201 }; // Return the transaction result with status 201 (Created)
    } catch (error) {
        console.error(error);

        if (error instanceof Error) {
            throw { message: error.message, status: 500 };
        } else if (typeof error === "object" && error !== null && "message" in error) {
            throw error;
        } else {
            throw { message: "Internal server error", status: 500 };
        }
    }
};

