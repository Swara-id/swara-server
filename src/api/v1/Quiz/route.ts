import multerMid from "../../../middleware/multer";
import { indexAllQuiz, postQuiz, indexOneQuiz } from "./controller";
import { Router } from "express";

const router = Router();

router.get("/", indexAllQuiz);

router.get("/:id", indexOneQuiz);

router.post("/", multerMid.array("file"), postQuiz);

export default router;
