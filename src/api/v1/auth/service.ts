// export const createChallenge = async (body: NewChallenge) => {
//   const result = await db
//     .insertInto("challenge")
//     .values({
//       uid: "string",
//       type: body.type,
//       value: body.value,
//       status: "ongoing",
//       point: body.point,

//       updatedAt: new Date(),
//       createdAt: new Date()
//     })
//     .returningAll()
//     .executeTakeFirst();

//   return;
