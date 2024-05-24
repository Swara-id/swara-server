import { indexAllUser } from "./controller";
import { Router, Request, Response } from "express";

const router = Router();

router.get("/", indexAllUser);

router.post("/",)

export default router;
