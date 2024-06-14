import { UserBody, UserPatchBody, UserQuery } from "./types";
import { db } from "./../../../database";
import { NotFoundError } from "../../../error/not-found";
import { uploadImage } from "../../../helper/helper";
import path from "path";
import { BadRequestError } from "../../../error/bad-request";

export const getAllUser = async () => {
  const result = await db.selectFrom("users").selectAll().execute();
  return result;
};

export const getAllUserFromLeaderBoard = async (query: UserQuery) => {
  // Count total records
  let countQb = db.selectFrom("users").select(db.fn.count("uid").as("count"));

  if (query.search) {
    const lowerSearch = query.search.toLowerCase();
    countQb = countQb.where(
      db.fn("lower", ["fullName"]),
      "like",
      `%${lowerSearch}%`
    );
  }

  const total = await countQb.execute();
  const totalData = Number(total[0]?.count ?? 0);

  if (totalData === 0) {
    return {
      data: [],
      pagination: {
        page: Number(query.page),
        pageSize: Number(query.pageSize),
        totalData,
        totalPage: 0
      }
    };
  }

  let qb = db.selectFrom("users").selectAll();
  if (query.search) {
    const lowerSearch = query.search.toLowerCase();
    qb = qb.where(db.fn("lower", ["fullName"]), "like", `%${lowerSearch}%`);
  }

  const result = await qb
    .orderBy("points", query.order ?? "desc")
    .limit(query.pageSize)
    .offset((query.page - 1) * query.pageSize)
    .execute();

  return {
    data: result,
    pagination: {
      page: Number(query.page),
      pageSize: Number(query.pageSize),
      totalData,
      totalPage: Math.ceil(totalData / query.pageSize)
    }
  };
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

export const createUser = async (user: UserBody) => {
  const result = await db
    .insertInto("users")
    .values({
      uid: user.uid,
      fullName: user.fullName || "",
      userName: user.userName || "",
      about: "",
      email: user.email || "",
      profilePicURL: user.profilePicURL || "",
      gender: "not-set"
    })
    .returningAll()
    .executeTakeFirst();

  return result;
};

// export const deleteOneUser = async (req: Request) => {
//   const { uid } = req.params;

//   const result = await db
//     .deleteFrom("users")
//     .where("uid", "=", uid)
//     .returningAll()
//     .executeTakeFirst();
//   if (!result) {
//     throw { message: `No user found with UID ${uid}`, status: 404 };
//   }
//   return { result, status: 200 };
// };

// export const updateOneUser = async (req: Request) => {
//   const { uid } = req.params;

//   const { body } = req;
//   const result = await db
//     .updateTable("users")
//     .set({
//       uid: body.uid,
//       fullName: body.fullName,
//       userName: body.userName,
//       gender: body.gender,
//       about: body.about,
//       profilePicURL: body.profilePicURL
//     })
//     .where("uid", "=", uid)
//     .returningAll()
//     .executeTakeFirst();
//   if (!result) {
//     throw new Error(`No User found with UID ${uid}`);
//   }
//   return result;
// };

export const updateUser = async (
  uid: string,
  body: UserPatchBody,
  file?: Express.Multer.File
) => {
  if (!file) {
    throw new BadRequestError("No file found");
  }

  const fileExtension = path.extname(file.originalname);
  const fileName = `${uid}${fileExtension}`;

  try {
    const imageUrl = await uploadImage(file, fileName, "users");

    // If the upload is successful, update the database
    const result = await db
      .updateTable("users")
      .set({
        fullName: body.fullName,
        userName: body.userName,
        about: body.about,
        gender: body.gender,
        profilePicURL: imageUrl
      })
      .where("uid", "=", uid) // Add this line to specify which user to update
      .returningAll()
      .executeTakeFirst();

    return result;
  } catch (error) {
    throw new BadRequestError("Failed to update user");
  }
};
