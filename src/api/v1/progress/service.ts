import { db } from "./../../../database";
import { ProgressBody } from "./types";

export const getUserProgress = async (uid: string) => {
  // Query to get the results
  const results = await db
    .selectFrom("userProgress")
    .selectAll()
    .where("userUid", "=", uid)
    .execute();

  // Query to get the count of records
  const countResult = await db
    .selectFrom("userProgress")
    .select(db.fn.count("id").as("count")) // Assuming 'id' is the primary key
    .where("userUid", "=", uid)
    .execute();

  // Extract the count from the query result
  const count = Number(countResult[0].count);

  return {
    results,
    count
  };
};

export const isCorpusCompleted = async (uid: string, corpusId: number) => {
  const result = await db
    .selectFrom("userProgress")
    .selectAll()
    .where("userUid", "=", uid)
    .where("corpusId", "=", corpusId)
    .execute();

  return result ? true : false;
};

export const createProgress = async (body: ProgressBody) => {
  const result = await db
    .insertInto("userProgress")
    .values({
      userUid: body.userUid,
      corpusId: body.corpusId
    })
    .returningAll()
    .executeTakeFirst();
  return result;
};
