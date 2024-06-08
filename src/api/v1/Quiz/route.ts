import multerMid from "../../../middleware/multer";
import { indexAllQuiz, postQuiz, indexOneQuiz, deleteQuiz } from "./controller";
import { Router } from "express";

const router = Router();

router.get("/", indexAllQuiz);

router.get("/:id", indexOneQuiz);

router.post("/", multerMid.array("file"), postQuiz);

router.delete("/:id", deleteQuiz);

export default router;
