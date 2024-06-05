import { multerMid } from "./../../../middleware/multer";
import {
	indexAllChallenge,
	postChallenge,
	indexOneChallenge,
	deleteChallenge,
	putChallenge,
} from "./controller";
import { Router, Request, Response } from "express";

const router = Router();

router.get("/", indexAllChallenge);

router.get("/:id", indexOneChallenge);

router.post("/", multerMid.single("file"), postChallenge);

router.delete("/:id", deleteChallenge);

router.put("/:id", putChallenge);

export default router;
