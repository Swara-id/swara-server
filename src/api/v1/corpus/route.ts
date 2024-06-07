import { multerMid } from "./../../../middleware/multer";
import {
	indexAllCorpus,
	postCorpus,
	indexOneCorpus,
	deleteCorpus,
	// putCorpus,
} from "./controller";
import { Router } from "express";

const router = Router();

router.get("/", indexAllCorpus);

router.get("/:id", indexOneCorpus);

router.post("/", multerMid.array("file"), postCorpus);

router.delete("/:id", deleteCorpus);

// router.put("/:id", putCorpus);

export default router;