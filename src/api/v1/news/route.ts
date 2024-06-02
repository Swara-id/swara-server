import { multerMid } from "./../../../middleware/multer";
import {
	indexAllNews,
	postNews,
	indexOneNews,
	deleteNews,
	putNews,
} from "./controller";
import { Router, Request, Response } from "express";

const router = Router();

router.get("/", indexAllNews);

router.get("/:id", indexOneNews);

router.post("/", multerMid.single("file"), postNews);

router.delete("/:id", deleteNews);

router.put("/:id", putNews);

export default router;
