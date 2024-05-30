import { deleteUser, indexAllUser, indexOneUser, postUser, putUser } from "./controller";
import { Router, Request, Response } from "express";

const router = Router();

router.get("/", indexAllUser);

router.get("/:id", indexOneUser)

router.post("/", postUser)

router.delete("/:id", deleteUser)

router.put("/:id", putUser)
export default router;
