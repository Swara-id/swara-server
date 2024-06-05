import { multerMid } from "./../../../middleware/multer";
import {
	indexAllSuggestion,
	postSuggestion,
	indexOneSuggestion,
	deleteSuggestion,
	putSuggestion,
} from "./controller";
import { Router, Request, Response } from "express";

const router = Router();

router.get("/", indexAllSuggestion);

router.get("/:id", indexOneSuggestion);

router.post("/", multerMid.single("file"), postSuggestion);

router.delete("/:id", deleteSuggestion);

router.put("/:id", putSuggestion);

export default router;
